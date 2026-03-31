import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "crypto"
import {
  getSyncEnabledSources,
  updateChessSource,
  logSyncEvent,
  acquireSyncLock,
  releaseSyncLock,
  type ChessSource,
} from "@/lib/sync/supabase-service"
import { readRange } from "@/lib/sync/sheets-client"
import { parse } from "@/lib/sync/parsers/flat-table"
import {
  diff,
  hasBlockingAnomaly,
  normalizeSnapshot,
  normalizeName,
  type DiffResult,
} from "@/lib/sync/diff-engine"
import { computeColumnsHash, colLetterToIndex, indexToColLetter } from "@/lib/sync/parse-utils"
import { sendTelegram } from "@/lib/sync/telegram"
import { loadProjectUnits, applyChanges } from "@/lib/sync/prod-client"

// --- Env (read at runtime, not module level) ---

function getSyncSecret(): string {
  return process.env.SYNC_SECRET ?? ""
}

// --- Types ---

interface SyncDetail {
  project: string
  catalogId: number
  status: "no_changes" | "changes_applied" | "anomaly" | "error" | "debounced" | "locked"
  changesCount?: number
  anomalyType?: string
  error?: string
  dryRun?: boolean
  changeLines?: string[]
}

interface SyncSummary {
  ok: boolean
  mode: string
  synced: number
  noChanges: number
  debounced: number
  anomalies: number
  errors: number
  changesApplied: number
  details: SyncDetail[]
}

// --- Helpers ---

function verifySecret(authHeader: string, secret: string): boolean {
  if (!secret) return false
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
  if (!token) return false
  // Use simple comparison for now — timingSafeEqual can fail in some runtimes
  return token === secret
}

function extractSheetId(url: string): string | null {
  const match = url?.match(/spreadsheets\/d\/([^/]+)/)
  return match ? match[1] : null
}

function formatChangeLines(diffResult: DiffResult): string[] {
  return diffResult.changes.map((c) => {
    if (c.field === "price") {
      const oldPrice = typeof c.old === "number" ? `$${c.old.toLocaleString()}` : String(c.old)
      const newPrice = typeof c.new === "number" ? `$${c.new.toLocaleString()}` : String(c.new)
      return `💰 ${c.unit}: ${oldPrice} → ${newPrice}`
    }
    return `📋 ${c.unit}: ${c.old} → ${c.new}`
  })
}

function buildSummary(diffResult: DiffResult): string {
  const parts: string[] = []
  if (diffResult.stats.unitsSold > 0)
    parts.push(`${diffResult.stats.unitsSold} sold`)
  if (diffResult.stats.unitsBooked > 0)
    parts.push(`${diffResult.stats.unitsBooked} booked`)
  if (diffResult.stats.priceChanged > 0)
    parts.push(`${diffResult.stats.priceChanged} price changes`)
  return `${diffResult.changes.length} changes: ${parts.join(", ")}`
}

async function limitConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<PromiseSettledResult<T>[]> {
  const results: PromiseSettledResult<T>[] = new Array(tasks.length)
  let nextIndex = 0

  async function runNext(): Promise<void> {
    while (nextIndex < tasks.length) {
      const idx = nextIndex++
      try {
        const value = await tasks[idx]()
        results[idx] = { status: "fulfilled", value }
      } catch (reason) {
        results[idx] = { status: "rejected", reason }
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () =>
    runNext()
  )
  await Promise.all(workers)
  return results
}

// --- Per-project sync ---

async function syncProject(
  source: ChessSource,
  dryRun: boolean
): Promise<SyncDetail> {
  // Debounce: skip if synced less than 5 minutes ago
  const lastSync = source.last_successful_sync ? new Date(source.last_successful_sync) : null
  if (lastSync && (Date.now() - lastSync.getTime()) < 5 * 60 * 1000) {
    return { status: "debounced" as const, project: source.project_name, catalogId: source.catalog_id }
  }

  // Concurrency guard: acquire lock to prevent parallel syncs on the same project
  const locked = await acquireSyncLock(source.id)
  if (!locked) {
    return { status: "locked" as const, project: source.project_name, catalogId: source.catalog_id }
  }

  try {
    return await syncProjectInner(source, dryRun)
  } finally {
    await releaseSyncLock(source.id)
  }
}

async function syncProjectInner(
  source: ChessSource,
  dryRun: boolean
): Promise<SyncDetail> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const syncConfig = (source.sync_config || {}) as Record<string, any>
  const oldSnapshot = normalizeSnapshot(source.unit_snapshot)

  if (!syncConfig.unit_name_col || !syncConfig.price_col) {
    throw new Error("sync_config missing unit_name_col or price_col")
  }

  // ChessSource.sheets_url may be a full URL or a bare sheet ID
  const sheetId = extractSheetId(source.sheets_url) ?? source.sheets_url
  if (!sheetId) {
    throw new Error(`Cannot extract sheet ID from: ${source.sheets_url}`)
  }

  // Build range
  const sheetName = source.sheet_name || ""
  const endColNum =
    Math.max(
      colLetterToIndex(syncConfig.unit_name_col),
      colLetterToIndex(syncConfig.price_col),
      syncConfig.status_col ? colLetterToIndex(syncConfig.status_col) : 0
    ) + 3
  const endCol = indexToColLetter(endColNum)
  const startRow: number = syncConfig.header_row || 1
  const endRow: number = (syncConfig.data_end_row || 200) + 5
  const range = sheetName
    ? `'${sheetName}'!A${startRow}:${endCol}${endRow}`
    : `A${startRow}:${endCol}${endRow}`

  // Fetch sheet data
  const gridData = await readRange(sheetId, range)

  // Check header hash (structural change detection)
  const headerRowIdx = 0
  const headerRow = gridData.rows[headerRowIdx]
  if (!headerRow?.cells) {
    throw new Error("Header row missing or empty in fetched sheet data")
  }
  const currentHash = computeColumnsHash(headerRow)

  if (syncConfig.columns_hash && currentHash !== syncConfig.columns_hash) {
    const anomaly = {
      type: "columns_hash_mismatch",
      detected_at: new Date().toISOString(),
      details: `Header hash changed: ${syncConfig.columns_hash} → ${currentHash}`,
      resolved: false,
    }
    if (!dryRun) {
      await updateChessSource(source.id, {
        last_anomaly: anomaly,
        sync_error_count: (source.sync_error_count || 0) + 1,
      })
      await logSyncEvent(
        source.project_uuid,
        "sync_anomaly_escalation",
        `Header structure changed for ${source.project_name}`,
        { anomaly }
      )
    }
    return {
      project: source.project_name,
      catalogId: source.catalog_id,
      status: "anomaly",
      anomalyType: "columns_hash_mismatch",
    }
  }

  // Adjust row numbers relative to fetch range
  const adjustedConfig = {
    ...syncConfig,
    header_row: 1,
    data_start_row: (syncConfig.data_start_row || 2) - startRow + 1,
    data_end_row: syncConfig.data_end_row
      ? syncConfig.data_end_row - startRow + 1
      : undefined,
  }

  // Parse
  const parseResult = parse(gridData, adjustedConfig)

  if (
    parseResult.units.length > 0 &&
    parseResult.errors.length > parseResult.units.length * 0.1
  ) {
    return {
      project: source.project_name,
      catalogId: source.catalog_id,
      status: "anomaly",
      anomalyType: "parse_errors",
    }
  }

  // Diff
  const diffResult = diff(oldSnapshot, parseResult.units)

  // Blocking anomaly check
  if (hasBlockingAnomaly(diffResult.anomalies, diffResult.stats)) {
    if (!dryRun) {
      const anomaly = {
        type: diffResult.anomalies[0].type,
        detected_at: new Date().toISOString(),
        details: diffResult.anomalies.map((a) => a.details).join("; "),
        resolved: false,
      }
      await updateChessSource(source.id, { last_anomaly: anomaly })
      await logSyncEvent(
        source.project_uuid,
        "sync_anomaly_escalation",
        diffResult.anomalies.map((a) => a.details).join("; "),
        { anomalies: diffResult.anomalies, stats: diffResult.stats }
      )
    }
    return {
      project: source.project_name,
      catalogId: source.catalog_id,
      status: "anomaly",
      anomalyType: diffResult.anomalies[0].type,
    }
  }

  // No price/status changes
  if (diffResult.changes.length === 0) {
    // Notify about new units (added in sheet but not on prod)
    const newUnitLines: string[] = []
    if (diffResult.stats.added > 0) {
      newUnitLines.push(
        `🆕 <b>${source.project_name}</b> (#${source.catalog_id}): ${diffResult.stats.added} new unit(s) in sheet — not on prod yet. Manual fill needed.`
      )
    }
    if (newUnitLines.length > 0 && !dryRun) {
      await sendTelegram(newUnitLines.join("\n"))
    }

    if (!dryRun) {
      await updateChessSource(source.id, {
        last_successful_sync: true,
        unit_snapshot: diffResult.newSnapshot as unknown as Record<
          string,
          unknown
        >,
        last_anomaly: null,
        sync_error_count: 0,
      })
    }
    return {
      project: source.project_name,
      catalogId: source.catalog_id,
      status: "no_changes",
    }
  }

  // Apply changes
  if (!dryRun) {
    const unitMap = await loadProjectUnits(source.catalog_id)

    // Enrich snapshot with unitIds
    for (const snap of diffResult.newSnapshot) {
      const key = normalizeName(snap.name || "")
      const prodUnit = unitMap.get(key)
      if (prodUnit) snap.unitId = prodUnit.id
    }

    const applyResult = await applyChanges(diffResult.changes, unitMap)

    const summary = buildSummary(diffResult)
    await logSyncEvent(source.project_uuid, "sync_unit_updates", summary, {
      changes: diffResult.changes,
      stats: diffResult.stats,
      applyErrors: applyResult.errors.length > 0 ? applyResult.errors : undefined,
    })

    // Only update snapshot if all changes applied without errors.
    // If there were errors, leave snapshot unchanged so next sync retries.
    if (applyResult.errors.length === 0) {
      await updateChessSource(source.id, {
        unit_snapshot: diffResult.newSnapshot as unknown as Record<
          string,
          unknown
        >,
        last_successful_sync: true,
        last_anomaly: null,
        sync_error_count: 0,
        columns_hash: currentHash,
      })
    }

    return {
      project: source.project_name,
      catalogId: source.catalog_id,
      status: "changes_applied",
      changesCount: applyResult.applied,
      changeLines: formatChangeLines(diffResult),
    }
  }

  // Dry run
  return {
    project: source.project_name,
    catalogId: source.catalog_id,
    status: "changes_applied",
    changesCount: diffResult.changes.length,
    dryRun: true,
    changeLines: formatChangeLines(diffResult),
  }
}

// --- Core sync logic ---

async function handleSync(opts: {
  catalogIds?: number[]
  dryRun: boolean
}): Promise<NextResponse> {
  const { dryRun } = opts

  try {
    // Load sync-enabled sources
    let sources = await getSyncEnabledSources()

    if (opts.catalogIds && opts.catalogIds.length > 0) {
      const idSet = new Set(opts.catalogIds)
      sources = sources.filter((s) => idSet.has(s.catalog_id))
    }

    if (sources.length === 0) {
      return NextResponse.json({
        ok: true,
        mode: dryRun ? "dry-run" : "live",
        synced: 0,
        noChanges: 0,
        debounced: 0,
        anomalies: 0,
        errors: 0,
        changesApplied: 0,
        details: [],
      })
    }

    // Process with max 3 concurrent
    const tasks = sources.map(
      (source) => () => syncProject(source, dryRun)
    )
    const settled = await limitConcurrency(tasks, 3)

    // Build summary
    const summary: SyncSummary = {
      ok: true,
      mode: dryRun ? "dry-run" : "live",
      synced: 0,
      noChanges: 0,
      debounced: 0,
      anomalies: 0,
      errors: 0,
      changesApplied: 0,
      details: [],
    }

    for (let i = 0; i < settled.length; i++) {
      const result = settled[i]
      if (result.status === "fulfilled") {
        const detail = result.value
        summary.details.push(detail)
        if (detail.status === "debounced" || detail.status === "locked") summary.debounced++
        else if (detail.status === "no_changes") summary.noChanges++
        else if (detail.status === "changes_applied") {
          summary.synced++
          summary.changesApplied += detail.changesCount ?? 0
        } else if (detail.status === "anomaly") summary.anomalies++
        else if (detail.status === "error") summary.errors++
      } else {
        const source = sources[i]
        const errMsg =
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason)
        summary.errors++
        summary.details.push({
          project: source.project_name,
          catalogId: source.catalog_id,
          status: "error",
          error: errMsg,
        })

        // Log error
        try {
          await updateChessSource(source.id, {
            sync_error_count: (source.sync_error_count || 0) + 1,
          })
          await logSyncEvent(source.project_uuid, "sync_error", errMsg, {
            error: errMsg,
          })
        } catch {
          /* don't fail on logging failure */
        }
      }
    }

    // Send Telegram summary
    if (summary.changesApplied > 0 || summary.anomalies > 0) {
      const lines: string[] = []
      lines.push(
        `<b>Chess Sync ${dryRun ? "(DRY RUN)" : ""}</b>`
      )
      lines.push("")

      for (const d of summary.details) {
        if (d.status === "changes_applied") {
          lines.push(
            `${d.dryRun ? "🔍 " : "✅ "}<b>${d.project}</b> (#${d.catalogId})`
          )
          if (d.changeLines?.length) {
            for (const line of d.changeLines) {
              lines.push(`  ${line}`)
            }
          }
        } else if (d.status === "anomaly") {
          lines.push(
            `⚠️ <b>${d.project}</b> (#${d.catalogId}): аномалия (${d.anomalyType})`
          )
        } else if (d.status === "error") {
          lines.push(
            `❌ <b>${d.project}</b> (#${d.catalogId}): ошибка`
          )
        }
      }

      lines.push("")
      lines.push(
        `Synced: ${summary.synced} | No changes: ${summary.noChanges} | Anomalies: ${summary.anomalies} | Errors: ${summary.errors}`
      )

      await sendTelegram(lines.join("\n"))
    }

    return NextResponse.json(summary)
  } catch (err) {
    console.error("[chess-sync] Fatal error:", err instanceof Error ? err.message : String(err))
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    )
  }
}

// --- Route Handlers ---

export async function GET(request: NextRequest) {
  // Auth guard — supports both CRON_SECRET (Vercel cron) and getSyncSecret()
  const authHeader = request.headers.get("authorization") ?? ""
  const cronSecret = process.env.CRON_SECRET ?? ""
  if (!verifySecret(authHeader, cronSecret) && !verifySecret(authHeader, getSyncSecret())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  return handleSync({ dryRun: false })
}

export async function POST(request: NextRequest) {
  // Auth guard — FIRST check
  if (!verifySecret(request.headers.get("authorization") ?? "", getSyncSecret())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  let body: { catalogIds?: number[]; dryRun?: boolean }
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  return handleSync({
    catalogIds: body.catalogIds,
    dryRun: body.dryRun ?? false,
  })
}
