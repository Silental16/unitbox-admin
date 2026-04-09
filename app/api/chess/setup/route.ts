import { NextRequest, NextResponse } from "next/server"
import {
  getAllSourcesForDeveloper,
  saveAutoDetectedConfig,
  type ChessSource,
} from "@/lib/sync/supabase-service"
import { autoDetect, type DetectionResult } from "@/lib/sync/auto-detect"
import { sendTelegram } from "@/lib/sync/telegram"

export const maxDuration = 300

// --- Helpers ---

function verifySecret(authHeader: string, secret: string): boolean {
  if (!secret) return false
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
  if (!token) return false
  return token === secret
}

function extractSheetId(url: string): string | null {
  const match = url?.match(/spreadsheets\/d\/([^/]+)/)
  return match ? match[1] : null
}

function isUnconfigured(source: ChessSource): boolean {
  const config = source.sync_config as Record<string, unknown> | null
  if (!config) return true
  return !config.unit_name_col
}

// --- Route Handler ---

export async function GET(request: NextRequest) {
  // Auth: ONLY accept CRON_SECRET (admin-only endpoint)
  const cronSecret = process.env.CRON_SECRET ?? ""
  const authHeader = request.headers.get("authorization") ?? ""
  if (!verifySecret(authHeader, cronSecret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    // 1. Load all chess sources for developer 61
    const allSources = await getAllSourcesForDeveloper(61)

    // 2. Filter to unconfigured
    const unconfigured = allSources.filter(isUnconfigured)

    if (unconfigured.length === 0) {
      return NextResponse.json({
        ok: true,
        message: "All sources already configured",
        total: allSources.length,
        configured: [],
        skipped: [],
        failed: [],
      })
    }

    const configured: DetectionResult[] = []
    const lowConfidence: DetectionResult[] = []
    const failed: DetectionResult[] = []

    // 3. Process SEQUENTIALLY (rate limit protection)
    for (const source of unconfigured) {
      const sheetId = extractSheetId(source.sheets_url) ?? source.sheets_url
      if (!sheetId) {
        failed.push({
          sourceId: source.id,
          sheetName: source.sheet_name,
          detected: null,
          confidence: "failed",
          reason: `Cannot extract sheet ID from: ${source.sheets_url}`,
        })
        continue
      }

      try {
        const result = await autoDetect(sheetId, source.sheet_name || "", source.id)

        if (result.confidence === "high" && result.detected) {
          // Only save high-confidence detections (both name + price found)
          await saveAutoDetectedConfig(
            source.id,
            result.detected as unknown as Record<string, unknown>,
            {},
            result.detected.columns_hash
          )
          configured.push(result)
        } else if (result.confidence === "low") {
          // Low confidence — report but don't save (missing column would crash sync)
          lowConfidence.push(result)
        } else {
          failed.push(result)
        }
      } catch (err) {
        failed.push({
          sourceId: source.id,
          sheetName: source.sheet_name,
          detected: null,
          confidence: "failed",
          reason: err instanceof Error ? err.message : String(err),
        })
      }
    }

    // 4. Send Telegram summary
    const lines: string[] = []
    lines.push("<b>Chess Setup — Auto-detect</b>")
    lines.push("")
    lines.push(`Total sources: ${allSources.length} | Unconfigured: ${unconfigured.length}`)

    if (configured.length > 0) {
      lines.push("")
      lines.push(`<b>Configured (${configured.length}):</b>`)
      for (const r of configured) {
        const cols = r.detected
          ? `name=${r.detected.unit_name_col}, price=${r.detected.price_col}`
          : "partial"
        lines.push(`  ${r.confidence === "high" ? "✅" : "⚠️"} ${r.sheetName || r.sourceId}: ${cols}`)
      }
    }

    if (lowConfidence.length > 0) {
      lines.push("")
      lines.push(`<b>Low confidence (${lowConfidence.length}) — needs manual config:</b>`)
      for (const r of lowConfidence) {
        lines.push(`  ⚠️ ${r.sheetName || r.sourceId}: ${r.reason}`)
      }
    }

    if (failed.length > 0) {
      lines.push("")
      lines.push(`<b>Failed (${failed.length}):</b>`)
      for (const r of failed) {
        lines.push(`  ❌ ${r.sheetName || r.sourceId}: ${r.reason}`)
      }
    }

    await sendTelegram(lines.join("\n"))

    return NextResponse.json({
      ok: true,
      total: allSources.length,
      unconfigured: unconfigured.length,
      configured,
      lowConfidence,
      failed,
    })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    console.error("[chess-setup] Fatal error:", errMsg)
    return NextResponse.json(
      { ok: false, error: errMsg },
      { status: 500 }
    )
  }
}
