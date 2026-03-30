import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Direct Supabase client for webhook (no cookies/auth context)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

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
      const supabase = getSupabase()

      // Find the project
      const { data: project, error: projectError } = await supabase
        .from("catalog_projects")
        .select("id, name")
        .eq("catalog_id", parseInt(catalogId))
        .single()

      if (projectError || !project) {
        console.error(`[sheets-webhook] Project #${catalogId} not found:`, projectError?.message)
        return NextResponse.json({ ok: true, type: "project_not_found", catalogId })
      }

      // Log webhook event
      const { error: logError } = await supabase.from("project_change_log").insert({
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

      if (logError) {
        console.error(`[sheets-webhook] Failed to log:`, logError.message)
      }

      // Mark chess source as needing sync
      const { error: updateError } = await supabase
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

      if (updateError) {
        console.error(`[sheets-webhook] Failed to update chess source:`, updateError.message)
      }

      console.log(`[sheets-webhook] Logged change for ${project.name} (#${catalogId})`)

      return NextResponse.json({ ok: true, type: "content_changed", catalogId, project: project.name })
    } catch (error) {
      console.error(`[sheets-webhook] Error:`, error)
      return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
    }
  }

  // Other state changes (permissions, properties, etc) — acknowledge but ignore
  console.log(`[sheets-webhook] Ignored: state=${state}, changed=${changed}, channel=${channelId}`)
  return NextResponse.json({ ok: true, type: "ignored" })
}

// Google also sends a GET to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ status: "sheets-webhook active" })
}
