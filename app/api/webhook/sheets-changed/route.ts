import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * Google Drive Watch webhook — receives notifications when chess board spreadsheets change.
 *
 * Google sends POST with headers:
 *   X-Goog-Channel-Id: "ramada-encore-sync-001"
 *   X-Goog-Resource-State: "sync" | "update" | "add" | "remove"
 *   X-Goog-Changed: "content" | "properties" | etc
 *   X-Goog-Channel-Token: "project_411" (our custom token with project catalog_id)
 */
export async function POST(request: NextRequest) {
  const state = request.headers.get("x-goog-resource-state")
  const channelId = request.headers.get("x-goog-channel-id")
  const token = request.headers.get("x-goog-channel-token")
  const changed = request.headers.get("x-goog-changed")

  // Sync message — Google confirming the watch is active. Just acknowledge.
  if (state === "sync") {
    console.log(`[sheets-webhook] Sync confirmed for channel ${channelId}`)
    return NextResponse.json({ ok: true, type: "sync" })
  }

  // Content update — something changed in the spreadsheet
  if (state === "update" && changed?.includes("content")) {
    const catalogId = token?.replace("project_", "")

    if (!catalogId) {
      console.log(`[sheets-webhook] Update received but no project token: ${channelId}`)
      return NextResponse.json({ ok: true, type: "ignored" })
    }

    console.log(`[sheets-webhook] Content changed for project #${catalogId} (channel: ${channelId})`)

    // Log the event to Supabase
    try {
      const supabase = await createClient()

      // Find the project
      const { data: project } = await supabase
        .from("catalog_projects")
        .select("id, name")
        .eq("catalog_id", parseInt(catalogId))
        .single()

      if (project) {
        // Log webhook event
        await supabase.from("project_change_log").insert({
          project_id: project.id,
          source: "cron",
          action: "webhook_sheet_changed",
          summary: `Google Sheets content changed for ${project.name}. Sync pending.`,
          diff: {
            channel_id: channelId,
            resource_state: state,
            changed,
            received_at: new Date().toISOString(),
          },
        })

        // Mark chess source as needing sync
        await supabase
          .from("project_chess_sources")
          .update({
            last_anomaly: {
              type: "webhook_content_changed",
              detected_at: new Date().toISOString(),
              details: `Content changed notification from Google Drive Watch API`,
              resolved: false,
            },
          })
          .eq("project_id", project.id)

        console.log(`[sheets-webhook] Logged change for ${project.name} (#${catalogId})`)
      }
    } catch (error) {
      console.error(`[sheets-webhook] Error logging:`, error)
    }

    return NextResponse.json({ ok: true, type: "content_changed", catalogId })
  }

  // Other state changes (permissions, properties, etc) — acknowledge but ignore
  console.log(`[sheets-webhook] Ignored: state=${state}, changed=${changed}, channel=${channelId}`)
  return NextResponse.json({ ok: true, type: "ignored" })
}

// Google also sends a GET to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ status: "sheets-webhook active" })
}
