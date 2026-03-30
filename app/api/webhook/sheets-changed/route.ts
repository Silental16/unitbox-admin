import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_SYNC_BOT_TOKEN!
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_SYNC_CHAT_ID!

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
    // Parse catalog IDs from token
    // New format: "projects_406,414,420" (one watch per file, multiple projects)
    // Legacy format: "project_406" (one watch per project)
    let catalogIds: number[] = []
    if (token?.startsWith("projects_")) {
      catalogIds = token.replace("projects_", "").split(",").map(Number).filter(Boolean)
    } else if (token?.startsWith("project_")) {
      const id = Number(token.replace("project_", ""))
      if (id) catalogIds = [id]
    }

    if (catalogIds.length === 0) {
      return NextResponse.json({ ok: true, type: "ignored" })
    }

    console.log(`[sheets-webhook] Content changed for projects: ${catalogIds.join(", ")}`)

    try {
      const supabase = getSupabase()

      const { data: projects, error: projectError } = await supabase
        .from("catalog_projects")
        .select("id, name, catalog_id")
        .in("catalog_id", catalogIds)

      if (projectError || !projects?.length) {
        console.error(`[sheets-webhook] Projects not found: ${catalogIds}`)
        return NextResponse.json({ ok: true, type: "project_not_found", catalogIds })
      }

      // Log and mark each project
      for (const project of projects) {
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
      }

      // Send ONE Telegram notification for all projects on this file
      const projectList = projects
        .map((p) => `• ${p.name} (#${p.catalog_id})`)
        .join("\n")

      await sendTelegram(
        `🔔 <b>Шахматка изменилась</b>\n\n` +
        `${projectList}\n\n` +
        `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Makassar" })}\n\n` +
        `Зайди в Claude и скажи: <code>сверь шахматки</code>`
      )

      return NextResponse.json({
        ok: true,
        type: "content_changed",
        projects: projects.map((p) => ({ catalogId: p.catalog_id, name: p.name })),
      })
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
