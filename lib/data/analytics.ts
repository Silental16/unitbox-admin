// Analytics data fetching from Amplitude Event Segmentation API
// Server-side only — uses API key/secret from env vars

export type Period = "7d" | "30d" | "90d" | "all"

// ── Types ──────────────────────────────────────────────

export interface KpiMetrics {
  dau: { value: number; delta: number }
  wau: { value: number; delta: number }
  mau: { value: number; delta: number }
  pageViews: { value: number; delta: number }
  collections: { value: number; delta: number }
}

export interface TrafficPoint {
  date: string
  dau: number
}

export interface SessionBucket {
  range: string
  count: number
  percentage: number
}

export interface ProjectActivity {
  name: string
  developer: string
  views: number
}

export interface DeveloperSummary {
  name: string
  projects: number
  totalViews: number
}

export interface DeveloperActivityData {
  topProjects: ProjectActivity[]
  topDevelopers: DeveloperSummary[]
}

export interface AgentMetrics {
  activeAgents: number
  collectionsPerAgent: number
  topAgents: { name: string; collections: number; sessions: number }[]
}

export interface RetentionData {
  d1: number
  d7: number
  d30: number
  cohorts: {
    week: string
    rates: number[] // retention % for week 0, 1, 2, 3...
  }[]
}

export interface GeoCountry {
  country: string
  users: number
  fill: string
}

export interface GeoCity {
  city: string
  country: string
  users: number
}

export interface GeographyData {
  countries: GeoCountry[]
  cities: GeoCity[]
}

// ── Amplitude API Client ─────────────────────────────────

const API_KEY = process.env.AMPLITUDE_API_KEY ?? ""
const API_SECRET = process.env.AMPLITUDE_API_SECRET ?? ""
const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")
const BASE = "https://amplitude.com/api/2"

function periodToDays(period: Period): number {
  switch (period) {
    case "7d": return 7
    case "30d": return 30
    case "90d": return 90
    case "all": return 365
  }
}

function dateRange(period: Period): { start: string; end: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - periodToDays(period))
  const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "")
  return { start: fmt(start), end: fmt(end) }
}

interface SegmentationResult {
  data: {
    series: number[][]
    seriesCollapsed: { setId: string; value: number }[][]
    seriesLabels: (number | string | (number | string)[])[]
    xValues: string[]
  }
}

async function amplitudeQuery(params: {
  event: string
  metric?: string
  period: Period
  groupBy?: { type: string; value: string }[]
}): Promise<SegmentationResult> {
  const { start, end } = dateRange(params.period)
  const eventObj: Record<string, unknown> = { event_type: params.event }
  if (params.groupBy) {
    eventObj.group_by = params.groupBy.map(g => ({ type: g.type, value: g.value }))
  }

  const url = new URL(`${BASE}/events/segmentation`)
  url.searchParams.set("e", JSON.stringify(eventObj))
  url.searchParams.set("m", params.metric ?? "uniques")
  url.searchParams.set("start", start)
  url.searchParams.set("end", end)

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${AUTH}` },
    next: { revalidate: 3600 }, // cache 1 hour
  })

  if (!res.ok) {
    console.error(`Amplitude API error: ${res.status} ${res.statusText}`)
    return { data: { series: [[]], seriesCollapsed: [[]], seriesLabels: [0], xValues: [] } }
  }

  return res.json()
}

function sumSeries(series: number[]): number {
  return series.reduce((a, b) => a + b, 0)
}

function lastN(series: number[], n: number): number[] {
  return series.slice(-n)
}

function calcDelta(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

// ── Fetch Functions ────────────────────────────────────

export async function getDashboardKpi(period: Period): Promise<KpiMetrics> {
  const days = periodToDays(period)

  // Fetch DAU, page views, and collections in parallel
  const [dauResult, pageViewsResult, collectionsResult] = await Promise.all([
    amplitudeQuery({ event: "session_start", metric: "uniques", period }),
    amplitudeQuery({ event: "[Amplitude] Page Viewed", metric: "totals", period }),
    amplitudeQuery({ event: "create_collection", metric: "totals", period }),
  ])

  const dauSeries = dauResult.data.series[0] ?? []
  const pvSeries = pageViewsResult.data.series[0] ?? []
  const collSeries = collectionsResult.data.series[0] ?? []

  // DAU = average of last period
  const halfDays = Math.floor(days / 2)
  const recentDau = lastN(dauSeries, halfDays)
  const prevDau = dauSeries.slice(-days, -halfDays)
  const avgRecentDau = recentDau.length ? Math.round(sumSeries(recentDau) / recentDau.length) : 0
  const avgPrevDau = prevDau.length ? Math.round(sumSeries(prevDau) / prevDau.length) : 0

  // WAU = unique users in last 7 days (latest value from weekly query)
  const wauDays = Math.min(days, 7)
  const wauRecent = sumSeries(lastN(dauSeries, wauDays))
  const wauPrev = sumSeries(dauSeries.slice(-(wauDays * 2), -wauDays))

  // MAU = total unique users for the period
  const mauValue = dauResult.data.seriesCollapsed[0]?.[0]?.value ?? 0

  // Page Views
  const recentPv = sumSeries(lastN(pvSeries, halfDays))
  const prevPv = sumSeries(pvSeries.slice(-days, -halfDays))

  // Collections
  const recentColl = sumSeries(lastN(collSeries, halfDays))
  const prevColl = sumSeries(collSeries.slice(-days, -halfDays))

  return {
    dau: { value: avgRecentDau, delta: Math.round(calcDelta(avgRecentDau, avgPrevDau) * 10) / 10 },
    wau: { value: wauRecent, delta: Math.round(calcDelta(wauRecent, wauPrev) * 10) / 10 },
    mau: { value: mauValue, delta: 0 }, // no previous period for MAU comparison
    pageViews: { value: recentPv, delta: Math.round(calcDelta(recentPv, prevPv) * 10) / 10 },
    collections: { value: recentColl, delta: Math.round(calcDelta(recentColl, prevColl) * 10) / 10 },
  }
}

export async function getTrafficTrend(period: Period): Promise<TrafficPoint[]> {
  const result = await amplitudeQuery({
    event: "session_start",
    metric: "uniques",
    period,
  })

  const series = result.data.series[0] ?? []
  const xValues = result.data.xValues ?? []

  return xValues.map((date, i) => ({
    date,
    dau: series[i] ?? 0,
  }))
}

export async function getSessionDistribution(_period: Period): Promise<SessionBucket[]> {
  // Amplitude Event Segmentation API doesn't provide session duration distribution directly
  // This would need Amplitude's User Sessions endpoint or raw export
  // For now, return empty — will be replaced with session_end - session_start calculation
  return [
    { range: "N/A", count: 0, percentage: 100 },
  ]
}

export async function getDeveloperActivity(period: Period): Promise<DeveloperActivityData> {
  // Get page views grouped by page path — extract project pages
  const result = await amplitudeQuery({
    event: "[Amplitude] Page Viewed",
    metric: "totals",
    period,
    groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
  })

  const labels = result.data.seriesLabels ?? []
  const collapsed = result.data.seriesCollapsed ?? []

  // Filter for /project/* and /ru/project/* paths
  const projectViews: { slug: string; views: number }[] = []
  for (let i = 0; i < labels.length; i++) {
    const label = Array.isArray(labels[i]) ? String(labels[i]?.[1] ?? "") : String(labels[i])
    const match = label.match(/^(?:\/ru)?\/project\/(.+)$/)
    if (match) {
      const slug = match[1]
      const views = collapsed[i]?.[0]?.value ?? 0
      const existing = projectViews.find(p => p.slug === slug)
      if (existing) {
        existing.views += views
      } else {
        projectViews.push({ slug, views })
      }
    }
  }

  projectViews.sort((a, b) => b.views - a.views)

  const topProjects: ProjectActivity[] = projectViews.slice(0, 10).map(p => ({
    name: p.slug.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    developer: "", // would need catalog DB to map project → developer
    views: p.views,
  }))

  return {
    topProjects,
    topDevelopers: [], // needs catalog DB join
  }
}

export async function getAgentActivity(_period: Period): Promise<AgentMetrics> {
  // Agent tracking requires user properties that identify agents vs visitors
  // Not available in current Amplitude setup
  return {
    activeAgents: 0,
    collectionsPerAgent: 0,
    topAgents: [],
  }
}

export async function getRetention(): Promise<RetentionData> {
  // Amplitude has a dedicated Retention API but requires different auth
  // Using event segmentation to approximate D1/D7/D30 is complex
  // For now, return zeros — will implement with Amplitude Behavioral Cohorts API
  return {
    d1: 0,
    d7: 0,
    d30: 0,
    cohorts: [],
  }
}

export async function getGeography(period: Period): Promise<GeographyData> {
  const [countryResult, cityResult] = await Promise.all([
    amplitudeQuery({
      event: "session_start",
      metric: "uniques",
      period,
      groupBy: [{ type: "user", value: "country" }],
    }),
    amplitudeQuery({
      event: "session_start",
      metric: "uniques",
      period,
      groupBy: [{ type: "user", value: "city" }],
    }),
  ])

  // Countries
  const countryLabels = countryResult.data.seriesLabels ?? []
  const countryCollapsed = countryResult.data.seriesCollapsed ?? []
  const colors = [
    "var(--chart-1)", "var(--chart-2)", "var(--chart-3)",
    "var(--chart-4)", "var(--chart-5)",
  ]
  const countryEntries: GeoCountry[] = []
  for (let i = 0; i < countryLabels.length; i++) {
    const label = Array.isArray(countryLabels[i]) ? String(countryLabels[i]?.[1] ?? "") : String(countryLabels[i])
    const users = countryCollapsed[i]?.[0]?.value ?? 0
    if (label && label !== "none" && users > 0) {
      countryEntries.push({ country: label, users, fill: colors[i % colors.length] })
    }
  }
  countryEntries.sort((a, b) => b.users - a.users)

  // Group smaller countries into "Other"
  const topCountries = countryEntries.slice(0, 5)
  const otherUsers = countryEntries.slice(5).reduce((sum, c) => sum + c.users, 0)
  if (otherUsers > 0) {
    topCountries.push({ country: "Other", users: otherUsers, fill: "var(--chart-5)" })
  }

  // Cities
  const cityLabels = cityResult.data.seriesLabels ?? []
  const cityCollapsed = cityResult.data.seriesCollapsed ?? []
  const cityEntries: GeoCity[] = []
  for (let i = 0; i < cityLabels.length; i++) {
    const label = Array.isArray(cityLabels[i]) ? String(cityLabels[i]?.[1] ?? "") : String(cityLabels[i])
    const users = cityCollapsed[i]?.[0]?.value ?? 0
    if (label && label !== "none" && users > 0) {
      cityEntries.push({ city: label, country: "", users })
    }
  }
  cityEntries.sort((a, b) => b.users - a.users)

  return {
    countries: topCountries,
    cities: cityEntries.slice(0, 8),
  }
}

// ── Helpers ────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  const total = Math.round(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${s.toString().padStart(2, "0")}s`
}

export function formatDelta(delta: number): string {
  const prefix = delta > 0 ? "+" : ""
  return `${prefix}${delta.toFixed(1)}%`
}
