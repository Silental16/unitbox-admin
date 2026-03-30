import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const TELEGRAM_BOT_TOKEN = "8508445422:AAE-3cWz3FQ8PECvU09Ie8cFS-LRgZRhDJ0"
const TELEGRAM_CHAT_ID = "325846422"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function sendTelegram(text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("[sheets-webhook] Telegram send failed:", error)
  }
}

/**
 * Google Drive Watch webhook — receives notifications when chess board spreadsheets change.
 */
export async function POST(request: NextRequest) {
  const state = request.headers.get("x-goog-resource-state")
  const channelId = request.headers.get("x-goog-channel-id")
  const token = request.headers.get("x-goog-channel-token")
  const changed = request.headers.get("x-goog-changed")

  if (state === "sync") {
    console.log(`[sheets-webhook] Sync confirmed for channel ${channelId}`)
    return NextResponse.json({ ok: true, type: "sync" })
  }

  if (state === "update" && changed?.includes("content")) {
    const catalogId = token?.replace("project_", "")

    if (!catalogId) {
      return NextResponse.json({ ok: true, type: "ignored" })
    }

    console.log(`[sheets-webhook] Content changed for project #${catalogId}`)

    try {
      const supabase = getSupabase()

      const { data: project, error: projectError } = await supabase
        .from("catalog_projects")
        .select("id, name")
        .eq("catalog_id", parseInt(catalogId))
        .single()

      if (projectError || !project) {
        console.error(`[sheets-webhook] Project #${catalogId} not found`)
        return NextResponse.json({ ok: true, type: "project_not_found", catalogId })
      }

      // Log to Supabase
      await supabase.from("project_change_log").insert({
        project_id: project.id,
        source: "cron",
        action: "webhook_sheet_changed",
        summary: `Chess board changed for ${project.name}. Sync pending.`,
        diff: {
          channel_id: channelId,
          resource_state: state,
          changed,
          received_at: new Date().toISOString(),
        },
      })

      // Mark chess source for sync
      await supabase
        .from("project_chess_sources")
        .update({
          last_anomaly: {
            type: "webhook_content_changed",
            detected_at: new Date().toISOString(),
            details: "Content changed notification from Google Drive Watch API",
            resolved: false,
          },
        })
        .eq("project_id", project.id)

      // Send Telegram notification
      await sendTelegram(
        `🔔 <b>Шахматка изменилась</b>\n\n` +
        `Проект: <b>${project.name}</b> (#${catalogId})\n` +
        `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Makassar" })}\n\n` +
        `Зайди в Claude и скажи: <code>сверь шахматки</code>`
      )

      return NextResponse.json({ ok: true, type: "content_changed", catalogId, project: project.name })
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
