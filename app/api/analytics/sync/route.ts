import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// --- Config ---

const AMPLITUDE_KEY = process.env.AMPLITUDE_API_KEY ?? ""
const AMPLITUDE_SECRET = process.env.AMPLITUDE_API_SECRET ?? ""
const AUTH = Buffer.from(`${AMPLITUDE_KEY}:${AMPLITUDE_SECRET}`).toString("base64")
const BASE = "https://amplitude.com/api/2"

// --- Supabase Admin Client ---
// Uses SUPABASE_SERVICE_ROLE_KEY for admin access (not the anon key).
// This route runs as a cron job without cookies/session.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// --- Amplitude helpers ---

interface SegmentationResult {
  data: {
    series: number[][]
    seriesCollapsed: { setId: string; value: number }[][]
    seriesLabels: (number | string | (number | string)[])[]
    xValues: string[]
  }
}

async function amplitudeFetch(url: string): Promise<SegmentationResult> {
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${AUTH}` },
  })
  if (!res.ok) {
    throw new Error(`Amplitude ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

function extractLabel(
  labels: (number | string | (number | string)[])[],
  index: number,
  position: number
): string {
  const label = labels[index]
  if (Array.isArray(label)) return String(label[position] ?? "")
  return String(label)
}

// --- Date helpers ---

function formatAmpDate(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "")
}

function formatISODate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

// --- Types ---

interface DailyRecord {
  date: string
  user_id: string
  developer_code: string | null
  session_duration: number
  collection_count: number
  preview_views: number
  page_views: number
  country: string | null
  city: string | null
}

// --- Core sync logic ---

async function syncDay(date: Date): Promise<DailyRecord[]> {
  const dateStr = formatISODate(date)
  const ampDate = formatAmpDate(date)

  // Build a map keyed by "userId::devCode" to accumulate metrics
  const recordMap = new Map<string, DailyRecord>()

  function getOrCreate(userId: string, devCode: string | null): DailyRecord {
    const key = `${userId}::${devCode ?? "__none__"}`
    let rec = recordMap.get(key)
    if (!rec) {
      rec = {
        date: dateStr,
        user_id: userId,
        developer_code: devCode,
        session_duration: 0,
        collection_count: 0,
        preview_views: 0,
        page_views: 0,
        country: null,
        city: null,
      }
      recordMap.set(key, rec)
    }
    return rec
  }

  // 1. Sessions by user + developerCode
  try {
    const sessionsData = await amplitudeFetch(
      `${BASE}/events/segmentation?e=${encodeURIComponent(
        JSON.stringify({
          event_type: "session_start",
          group_by: [
            { type: "user", value: "user_id" },
            { type: "event", value: "developerCode" },
          ],
        })
      )}&m=totals&start=${ampDate}&end=${ampDate}&limit=1000`
    )

    const labels = sessionsData.data?.seriesLabels ?? []
    const series = sessionsData.data?.series ?? []

    for (let i = 0; i < labels.length; i++) {
      const userId = extractLabel(labels, i, 1)
      const devCode = extractLabel(labels, i, 2)
      if (!userId || userId === "(none)") continue

      const sessions = (series[i] ?? []).reduce((a, b) => a + b, 0)
      const rec = getOrCreate(userId, devCode && devCode !== "(none)" ? devCode : null)
      // Approximate duration: ~3.5 min avg per session (210 seconds)
      rec.session_duration += Math.round(sessions * 210)
      rec.page_views += sessions
    }
  } catch (err) {
    console.error(`[sync] sessions query failed for ${dateStr}:`, err)
  }

  // 2. Collections by user + developerCode
  try {
    const collectionsData = await amplitudeFetch(
      `${BASE}/events/segmentation?e=${encodeURIComponent(
        JSON.stringify({
          event_type: "create_collection",
          group_by: [
            { type: "user", value: "user_id" },
            { type: "event", value: "developerCode" },
          ],
        })
      )}&m=totals&start=${ampDate}&end=${ampDate}&limit=1000`
    )

    const labels = collectionsData.data?.seriesLabels ?? []
    const series = collectionsData.data?.series ?? []

    for (let i = 0; i < labels.length; i++) {
      const userId = extractLabel(labels, i, 1)
      const devCode = extractLabel(labels, i, 2)
      if (!userId || userId === "(none)") continue

      const count = (series[i] ?? []).reduce((a, b) => a + b, 0)
      if (count === 0) continue

      const rec = getOrCreate(userId, devCode && devCode !== "(none)" ? devCode : null)
      rec.collection_count += count
    }
  } catch (err) {
    console.error(`[sync] collections query failed for ${dateStr}:`, err)
  }

  // 3. Preview views by user
  try {
    const previewData = await amplitudeFetch(
      `${BASE}/events/segmentation?e=${encodeURIComponent(
        JSON.stringify({
          event_type: "[Amplitude] Page Viewed",
          filters: [
            {
              subprop_type: "event",
              subprop_key: "[Amplitude] Page Path",
              subprop_op: "contains",
              subprop_value: ["preview"],
            },
          ],
          group_by: [{ type: "user", value: "user_id" }],
        })
      )}&m=totals&start=${ampDate}&end=${ampDate}&limit=1000`
    )

    const labels = previewData.data?.seriesLabels ?? []
    const series = previewData.data?.series ?? []

    for (let i = 0; i < labels.length; i++) {
      const userId = extractLabel(labels, i, 1)
      if (!userId || userId === "(none)") continue

      const views = (series[i] ?? []).reduce((a, b) => a + b, 0)
      if (views === 0) continue

      const rec = getOrCreate(userId, null)
      rec.preview_views += views
    }
  } catch (err) {
    console.error(`[sync] preview views query failed for ${dateStr}:`, err)
  }

  // 4. Geography by user (country + city)
  try {
    const geoData = await amplitudeFetch(
      `${BASE}/events/segmentation?e=${encodeURIComponent(
        JSON.stringify({
          event_type: "session_start",
          group_by: [
            { type: "user", value: "user_id" },
            { type: "user", value: "country" },
            { type: "user", value: "city" },
          ],
        })
      )}&m=totals&start=${ampDate}&end=${ampDate}&limit=1000`
    )

    const labels = geoData.data?.seriesLabels ?? []

    for (let i = 0; i < labels.length; i++) {
      const userId = extractLabel(labels, i, 1)
      const country = extractLabel(labels, i, 2)
      const city = extractLabel(labels, i, 3)
      if (!userId || userId === "(none)") continue

      // Update country/city on any matching record for this user
      for (const [key, rec] of recordMap) {
        if (key.startsWith(`${userId}::`)) {
          if (country && country !== "(none)") rec.country = country
          if (city && city !== "(none)") rec.city = city
        }
      }
    }
  } catch (err) {
    console.error(`[sync] geo query failed for ${dateStr}:`, err)
  }

  return Array.from(recordMap.values())
}

// --- API Route Handler ---

export async function GET(request: Request) {
  // Auth check
  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const dateParam = url.searchParams.get("date")
  const daysBack = parseInt(url.searchParams.get("days") ?? "1", 10)

  const supabase = getSupabase()
  let totalRecords = 0
  const errors: string[] = []

  for (let d = 0; d < daysBack; d++) {
    let targetDate: Date
    if (dateParam && daysBack === 1) {
      // Explicit date provided
      targetDate = new Date(`${dateParam}T00:00:00Z`)
    } else {
      // Default: yesterday minus d days
      targetDate = new Date()
      targetDate.setUTCDate(targetDate.getUTCDate() - 1 - d)
    }

    try {
      const records = await syncDay(targetDate)

      if (records.length > 0) {
        // Upsert in batches of 500 to avoid payload limits
        const BATCH_SIZE = 500
        for (let i = 0; i < records.length; i += BATCH_SIZE) {
          const batch = records.slice(i, i + BATCH_SIZE)
          const { error } = await supabase
            .from("analytics_daily")
            .upsert(batch, { onConflict: "date,user_id,developer_code" })

          if (error) {
            errors.push(`${formatISODate(targetDate)}: ${error.message}`)
          }
        }
      }

      totalRecords += records.length
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(`${formatISODate(targetDate)}: ${msg}`)
    }
  }

  if (errors.length > 0 && totalRecords === 0) {
    return NextResponse.json(
      { error: "All days failed", details: errors },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    days: daysBack,
    records: totalRecords,
    errors: errors.length > 0 ? errors : undefined,
  })
}
