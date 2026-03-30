import { NextRequest, NextResponse, after } from "next/server"
import { timingSafeEqual } from "crypto"
import { getProjectsByIds, logSyncEvent } from "@/lib/sync/supabase-service"
import { sendTelegram } from "@/lib/sync/telegram"

function verifyWebhookToken(tokenPart: string): boolean {
  const expected = process.env.WEBHOOK_VERIFY_TOKEN
  if (!expected || !tokenPart) return false
  try {
    const a = Buffer.from(tokenPart, "utf-8")
    const b = Buffer.from(expected, "utf-8")
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

/**
 * Google Drive Watch webhook — receives notifications when chess board spreadsheets change.
 * Token format: "projects_406,414,420|<WEBHOOK_VERIFY_TOKEN>"
 * Debounce is handled server-side in /api/chess/sync (skips if last_successful_sync < 5min ago).
 */
export async function POST(request: NextRequest) {
  const state = request.headers.get("x-goog-resource-state")
  const channelId = request.headers.get("x-goog-channel-id")
  const rawToken = request.headers.get("x-goog-channel-token")
  const changed = request.headers.get("x-goog-changed")

  if (state === "sync") {
    console.log(`[sheets-webhook] Sync confirmed for channel ${channelId}`)
    return NextResponse.json({ ok: true, type: "sync" })
  }

  if (state === "update" && changed?.includes("content")) {
    // Split token: "projects_406,414,420|<secret>" or "project_406|<secret>"
    const [tokenData, tokenSecret] = (rawToken ?? "").split("|")

    // Validate webhook secret (skip if WEBHOOK_VERIFY_TOKEN not configured yet)
    const webhookSecret = process.env.WEBHOOK_VERIFY_TOKEN
    if (webhookSecret) {
      if (!verifyWebhookToken(tokenSecret)) {
        console.warn(`[sheets-webhook] Token mismatch. Channel: ${channelId}, hasSecret: ${!!tokenSecret}, expectedLen: ${webhookSecret.length}`)
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
      }
    } else {
      console.warn(`[sheets-webhook] WEBHOOK_VERIFY_TOKEN not set, skipping verification`)
    }

    // Parse catalog IDs from the data part
    let catalogIds: number[] = []
    if (tokenData?.startsWith("projects_")) {
      catalogIds = tokenData.replace("projects_", "").split(",").map(Number).filter(Boolean)
    } else if (tokenData?.startsWith("project_")) {
      const id = Number(tokenData.replace("project_", ""))
      if (id) catalogIds = [id]
    }

    if (catalogIds.length === 0) {
      return NextResponse.json({ ok: true, type: "ignored" })
    }

    console.log(`[sheets-webhook] Content changed for projects: ${catalogIds.join(", ")}`)

    try {
      // Validate projects exist in Supabase
      const projects = await getProjectsByIds(catalogIds)

      if (!projects.length) {
        console.error(`[sheets-webhook] Projects not found: ${catalogIds}`)
        return NextResponse.json({ ok: true, type: "ignored" })
      }

      // Log and mark each project
      for (const project of projects) {
        await logSyncEvent(
          project.id,
          "webhook_sheet_changed",
          `Chess board changed for ${project.name}. Sync pending.`,
          {
            channel_id: channelId,
            resource_state: state,
            changed,
            received_at: new Date().toISOString(),
          }
        )
      }

      // Send ONE Telegram notification for all projects on this file
      const projectList = projects
        .map((p) => `• ${p.name} (#${p.catalog_id})`)
        .join("\n")

      await sendTelegram(
        `🔔 <b>Шахматка изменилась</b>\n\n` +
        `${projectList}\n\n` +
        `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Makassar" })}\n\n` +
        `Sync запущен автоматически.`
      )

      // Trigger sync in the background (non-blocking)
      // Debounce is handled server-side in /api/chess/sync
      after(async () => {
        try {
          const syncUrl = new URL("/api/chess/sync", request.url)
          await fetch(syncUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.SYNC_SECRET}`,
            },
            body: JSON.stringify({ catalogIds }),
          })
        } catch (error) {
          console.error("[sheets-webhook] Sync trigger failed:", error)
        }
      })

      return NextResponse.json({ ok: true, type: "content_changed" })
    } catch (error) {
      console.error(`[sheets-webhook] Error:`, error)
      return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true, type: "ignored" })
}

export async function GET() {
  return NextResponse.json({ status: "sheets-webhook active" })
}
