// Analytics data fetching from Amplitude Event Segmentation API
// Server-side only — uses API key/secret from env vars

export type Period = "7d" | "30d" | "90d" | "6m" | "all"

// ── Types ──────────────────────────────────────────────

// Agent Activity KPIs
export interface AgentKpis {
  activeAgents: { value: number; delta: number }
  dau: { value: number; delta: number }
  war: { value: number; delta: number } // Weekly Active Rate
  collections: { value: number; delta: number }
  effectiveCollections: { value: number; delta: number } // 2+ units AND 1+ view
  activationRate: { value: number; delta: number } // % agents who created collection within 30d
}

// Investor Activity KPIs
export interface InvestorKpis {
  uniqueInvestors: { value: number; delta: number }
  previewViews: { value: number; delta: number }
  viewsPerCollection: { value: number; delta: number }
  targetMarketPct: { value: number; delta: number } // % from RU, ID, AE, DE
}

// Developer Health Score
export interface DeveloperHealth {
  code: string
  name: string
  healthScore: number // 0-100
  sessions: number
  activeAgents: number
  collections: number
  offerViews: number
  trend: number[] // sparkline data (last 7 periods)
  churnRisk: boolean // collections/week dropped >50% for 2+ weeks
}

// Collection analytics
export interface CollectionAnalytics {
  weeklyCreated: { week: string; created: number; viewed: number }[]
  byDeveloper: { code: string; name: string; monthly: Record<string, number> }[]
}

// Top agents
export interface TopAgent {
  name: string
  role: string
  agency: string
  hours: number
  collections: number
  offerViews: number
  lastActive: string
}

// Top offers (most viewed collections)
export interface TopOffer {
  collectionId: number
  createdBy: string
  developer: string
  units: number
  uniqueViewers: number
  totalViews: number
}

// Funnel step
export interface FunnelStep {
  label: string
  value: number
  percentage: number
}

// Most offered units
export interface OfferedUnit {
  name: string
  count: number
}

// Traffic trend point
export interface TrafficPoint {
  date: string
  value: number
}

// Geography
export interface GeoData {
  countries: { name: string; value: number; percentage: number }[]
  cities: { name: string; country: string; value: number }[]
  targetMarketPct: number
}

// ── Project-Developer Mapping ────────────────────────────

// Project slug -> developer code mapping (from catalog DB)
const PROJECT_DEVELOPER_MAP: Record<string, string> = {
  "elysium": "breig",
  "edem_2": "breig",
  "edem_i": "breig",
  "luma": "luma",
  "yolla": "yolla",
  "anta_medspa": "anta",
  "green_village": "greenvillage",
  "aravita": "aravita",
  "ramada_encore": "ramada",
  "lyvin_uluwatu": "lyvin",
  // TODO: expand with all known projects from catalog DB
}

const TARGET_MARKET_COUNTRIES = ["Russia", "Indonesia", "United Arab Emirates", "Germany"]

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
    case "6m": return 180
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
  interval?: number
  limit?: number
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
  if (params.interval) {
    url.searchParams.set("i", String(params.interval))
  }
  if (params.limit) {
    url.searchParams.set("limit", String(params.limit))
  }

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

// ── Internal Helpers ─────────────────────────────────────

function sumSeries(series: number[]): number {
  return series.reduce((a, b) => a + b, 0)
}

function lastN(series: number[], n: number): number[] {
  return series.slice(-n)
}

function calcDelta(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100 * 10) / 10
}

function extractLabel(labels: (number | string | (number | string)[])[], index: number): string {
  const label = labels[index]
  return Array.isArray(label) ? String(label[1] ?? "") : String(label)
}

/** Check if a page path belongs to one of the filtered developer codes */
function matchesDevFilter(pagePath: string, devFilter?: string[]): boolean {
  if (!devFilter || devFilter.length === 0) return true
  for (const [slug, code] of Object.entries(PROJECT_DEVELOPER_MAP)) {
    if (pagePath.includes(slug) && devFilter.includes(code)) {
      return true
    }
  }
  return false
}

/** Split series into two halves and compute delta */
function halfDelta(series: number[], days: number): { current: number; delta: number } {
  const half = Math.floor(days / 2)
  const recent = sumSeries(lastN(series, half))
  const prev = sumSeries(series.slice(-days, -half))
  return { current: recent, delta: calcDelta(recent, prev) }
}

// ── Agent Tab Functions ──────────────────────────────────

export async function getAgentKpis(period: Period, devFilter?: string[]): Promise<AgentKpis> {
  const days = periodToDays(period)

  const [dauResult, collectionsResult, previewResult] = await Promise.all([
    amplitudeQuery({ event: "session_start", metric: "uniques", period }),
    amplitudeQuery({ event: "create_collection", metric: "totals", period }),
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "totals",
      period,
      groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
    }),
  ])

  // DAU
  const dauSeries = dauResult.data.series[0] ?? []
  const half = Math.floor(days / 2)
  const recentDau = lastN(dauSeries, half)
  const prevDau = dauSeries.slice(-days, -half)
  const avgRecentDau = recentDau.length ? Math.round(sumSeries(recentDau) / recentDau.length) : 0
  const avgPrevDau = prevDau.length ? Math.round(sumSeries(prevDau) / prevDau.length) : 0

  // WAR (Weekly Active Rate) — unique users in last 7 days / total registered
  const wauDays = Math.min(days, 7)
  const wauRecent = sumSeries(lastN(dauSeries, wauDays))
  const wauPrev = sumSeries(dauSeries.slice(-(wauDays * 2), -wauDays))

  // Collections
  const collSeries = collectionsResult.data.series[0] ?? []
  const collHalf = halfDelta(collSeries, days)

  // Effective collections: filter preview views by devFilter if needed
  // An effective collection = one that was both created AND viewed at least once
  // For now approximate with preview views count (needs catalog DB for precise calc)
  let effectiveCount = 0
  const previewLabels = previewResult.data.seriesLabels ?? []
  const previewCollapsed = previewResult.data.seriesCollapsed ?? []
  for (let i = 0; i < previewLabels.length; i++) {
    const path = extractLabel(previewLabels, i)
    if (path.includes("preview") && matchesDevFilter(path, devFilter)) {
      effectiveCount += previewCollapsed[i]?.[0]?.value ?? 0
    }
  }

  // Active agents — unique session starters (approximation)
  const activeAgentsValue = dauResult.data.seriesCollapsed[0]?.[0]?.value ?? 0

  // Activation rate — % of agents who created a collection (approximation)
  const totalCollections = collHalf.current
  const activationRate = activeAgentsValue > 0
    ? Math.round((totalCollections / activeAgentsValue) * 100 * 10) / 10
    : 0

  return {
    activeAgents: {
      value: activeAgentsValue,
      delta: calcDelta(sumSeries(recentDau), sumSeries(prevDau)),
    },
    dau: {
      value: avgRecentDau,
      delta: calcDelta(avgRecentDau, avgPrevDau),
    },
    war: {
      value: wauRecent,
      delta: calcDelta(wauRecent, wauPrev),
    },
    collections: {
      value: collHalf.current,
      delta: collHalf.delta,
    },
    effectiveCollections: {
      value: effectiveCount,
      delta: 0, // TODO: compute delta when we have historical effective collection data
    },
    activationRate: {
      value: activationRate,
      delta: 0, // TODO: compute delta over periods
    },
  }
}

export async function getAgentTrafficTrend(period: Period, _devFilter?: string[]): Promise<TrafficPoint[]> {
  const result = await amplitudeQuery({
    event: "session_start",
    metric: "uniques",
    period,
  })

  const series = result.data.series[0] ?? []
  const xValues = result.data.xValues ?? []

  // TODO: when devFilter is provided, use grouped query by page path and filter
  return xValues.map((date, i) => ({
    date,
    value: series[i] ?? 0,
  }))
}

export async function getCollectionAnalytics(period: Period, _devFilter?: string[]): Promise<CollectionAnalytics> {
  const result = await amplitudeQuery({
    event: "create_collection",
    metric: "totals",
    period,
    interval: 7, // weekly
  })

  const series = result.data.series[0] ?? []
  const xValues = result.data.xValues ?? []

  // TODO: add "viewed" count — requires join with preview_view events
  const weeklyCreated = xValues.map((week, i) => ({
    week,
    created: series[i] ?? 0,
    viewed: 0, // TODO: needs cross-event join
  }))

  // By developer — needs page path grouping
  const devResult = await amplitudeQuery({
    event: "create_collection",
    metric: "totals",
    period,
    interval: 30, // monthly
    groupBy: [{ type: "event", value: "developerCode" }],
  })

  const devLabels = devResult.data.seriesLabels ?? []
  const devCollapsed = devResult.data.seriesCollapsed ?? []
  const byDeveloper: CollectionAnalytics["byDeveloper"] = []

  for (let i = 0; i < devLabels.length; i++) {
    const code = extractLabel(devLabels, i)
    if (!code || code === "none") continue
    const value = devCollapsed[i]?.[0]?.value ?? 0
    byDeveloper.push({
      code,
      name: code.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      monthly: { total: value }, // TODO: break down by month when monthly series available
    })
  }

  return { weeklyCreated, byDeveloper }
}

export async function getAgentFunnel(period: Period, _devFilter?: string[]): Promise<FunnelStep[]> {
  // Funnel: Session -> View Project -> Create Collection -> Preview Viewed
  const [sessionsResult, projectViewsResult, collectionsResult, previewResult] = await Promise.all([
    amplitudeQuery({ event: "session_start", metric: "uniques", period }),
    amplitudeQuery({ event: "[Amplitude] Page Viewed", metric: "uniques", period }),
    amplitudeQuery({ event: "create_collection", metric: "uniques", period }),
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "uniques",
      period,
      groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
    }),
  ])

  const sessions = sessionsResult.data.seriesCollapsed[0]?.[0]?.value ?? 0
  const projectViews = projectViewsResult.data.seriesCollapsed[0]?.[0]?.value ?? 0
  const collections = collectionsResult.data.seriesCollapsed[0]?.[0]?.value ?? 0

  // Preview views: count paths containing "preview"
  let previewViewers = 0
  const labels = previewResult.data.seriesLabels ?? []
  const collapsed = previewResult.data.seriesCollapsed ?? []
  for (let i = 0; i < labels.length; i++) {
    const path = extractLabel(labels, i)
    if (path.includes("preview")) {
      previewViewers += collapsed[i]?.[0]?.value ?? 0
    }
  }

  const top = sessions || 1
  return [
    { label: "Sessions", value: sessions, percentage: 100 },
    { label: "Viewed Projects", value: projectViews, percentage: Math.round((projectViews / top) * 100) },
    { label: "Created Collection", value: collections, percentage: Math.round((collections / top) * 100) },
    { label: "Preview Viewed", value: previewViewers, percentage: Math.round((previewViewers / top) * 100) },
  ]
}

export async function getTopAgents(period: Period, _devFilter?: string[]): Promise<TopAgent[]> {
  // TODO: requires catalog DB integration — agents are stored in the catalog's users table
  // Amplitude tracks session_start with user_id but agent metadata (name, role, agency) is in catalog DB
  // For v1, return empty array
  return []
}

export async function getDeveloperHealth(period: Period): Promise<DeveloperHealth[]> {
  const [sessionsResult, collectionsResult] = await Promise.all([
    amplitudeQuery({
      event: "session_start",
      metric: "uniques",
      period,
      groupBy: [{ type: "event", value: "developerCode" }],
    }),
    amplitudeQuery({
      event: "create_collection",
      metric: "totals",
      period,
      groupBy: [{ type: "event", value: "developerCode" }],
      interval: 7, // weekly for trend
    }),
  ])

  const sessLabels = sessionsResult.data.seriesLabels ?? []
  const sessCollapsed = sessionsResult.data.seriesCollapsed ?? []
  const collLabels = collectionsResult.data.seriesLabels ?? []
  const collSeries = collectionsResult.data.series ?? []

  const devMap: Record<string, DeveloperHealth> = {}

  // Sessions per developer
  for (let i = 0; i < sessLabels.length; i++) {
    const code = extractLabel(sessLabels, i)
    if (!code || code === "none") continue
    const sessions = sessCollapsed[i]?.[0]?.value ?? 0
    devMap[code] = {
      code,
      name: code.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      healthScore: 0,
      sessions,
      activeAgents: 0, // TODO: needs agent-level grouping
      collections: 0,
      offerViews: 0, // TODO: needs preview view data per developer
      trend: [],
      churnRisk: false,
    }
  }

  // Collections per developer + weekly trend
  for (let i = 0; i < collLabels.length; i++) {
    const code = extractLabel(collLabels, i)
    if (!code || code === "none") continue
    const weekSeries = collSeries[i] ?? []
    const totalCollections = sumSeries(weekSeries)

    if (!devMap[code]) {
      devMap[code] = {
        code,
        name: code.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        healthScore: 0,
        sessions: 0,
        activeAgents: 0,
        collections: 0,
        offerViews: 0,
        trend: [],
        churnRisk: false,
      }
    }

    devMap[code].collections = totalCollections
    devMap[code].trend = lastN(weekSeries, 7)

    // Churn risk: collections/week dropped >50% for 2+ consecutive weeks
    if (weekSeries.length >= 3) {
      const recent = weekSeries.slice(-3)
      const droppedWeek1 = recent[0] > 0 && recent[1] < recent[0] * 0.5
      const droppedWeek2 = recent[1] > 0 && recent[2] < recent[1] * 0.5
      // Also flag if last 2 weeks are both less than 50% of the week before them
      const droppedFromBase = recent[0] > 0 && recent[2] < recent[0] * 0.5
      devMap[code].churnRisk = (droppedWeek1 && droppedWeek2) || droppedFromBase
    }
  }

  // Compute health score: simple weighted formula
  for (const dev of Object.values(devMap)) {
    const sessionScore = Math.min(dev.sessions / 10, 30) // max 30 pts
    const collectionScore = Math.min(dev.collections / 5, 40) // max 40 pts
    const trendScore = dev.churnRisk ? 0 : 30 // 30 pts if no churn risk
    dev.healthScore = Math.round(sessionScore + collectionScore + trendScore)
  }

  return Object.values(devMap).sort((a, b) => b.healthScore - a.healthScore)
}

// ── Investor Tab Functions ───────────────────────────────

export async function getInvestorKpis(period: Period, devFilter?: string[]): Promise<InvestorKpis> {
  const [previewResult, geoResult] = await Promise.all([
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "uniques",
      period,
      groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
    }),
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "uniques",
      period,
      groupBy: [{ type: "user", value: "country" }],
    }),
  ])

  // Preview views — count paths containing "preview"
  const labels = previewResult.data.seriesLabels ?? []
  const collapsed = previewResult.data.seriesCollapsed ?? []
  let uniqueInvestors = 0
  let previewViews = 0
  for (let i = 0; i < labels.length; i++) {
    const path = extractLabel(labels, i)
    if (path.includes("preview") && matchesDevFilter(path, devFilter)) {
      const val = collapsed[i]?.[0]?.value ?? 0
      uniqueInvestors += val
      previewViews += val
    }
  }

  // Views per collection — approximate (previewViews / collections created)
  const collResult = await amplitudeQuery({
    event: "create_collection",
    metric: "totals",
    period,
  })
  const totalCollections = collResult.data.seriesCollapsed[0]?.[0]?.value ?? 0
  const viewsPerCollection = totalCollections > 0
    ? Math.round((previewViews / totalCollections) * 10) / 10
    : 0

  // Target market percentage
  const geoLabels = geoResult.data.seriesLabels ?? []
  const geoCollapsed = geoResult.data.seriesCollapsed ?? []
  let totalUsers = 0
  let targetUsers = 0
  for (let i = 0; i < geoLabels.length; i++) {
    const country = extractLabel(geoLabels, i)
    const users = geoCollapsed[i]?.[0]?.value ?? 0
    totalUsers += users
    if (TARGET_MARKET_COUNTRIES.includes(country)) {
      targetUsers += users
    }
  }
  const targetMarketPct = totalUsers > 0
    ? Math.round((targetUsers / totalUsers) * 100 * 10) / 10
    : 0

  return {
    uniqueInvestors: { value: uniqueInvestors, delta: 0 }, // TODO: compute from series split
    previewViews: { value: previewViews, delta: 0 },
    viewsPerCollection: { value: viewsPerCollection, delta: 0 },
    targetMarketPct: { value: targetMarketPct, delta: 0 },
  }
}

export async function getInvestorTrafficTrend(period: Period, _devFilter?: string[]): Promise<TrafficPoint[]> {
  // Track preview page views over time
  const result = await amplitudeQuery({
    event: "[Amplitude] Page Viewed",
    metric: "totals",
    period,
    groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
  })

  // Aggregate preview paths per date
  const xValues = result.data.xValues ?? []
  const labels = result.data.seriesLabels ?? []
  const series = result.data.series ?? []

  const dailyValues = new Array<number>(xValues.length).fill(0)

  for (let i = 0; i < labels.length; i++) {
    const path = extractLabel(labels, i)
    if (path.includes("preview")) {
      const pathSeries = series[i] ?? []
      for (let j = 0; j < pathSeries.length; j++) {
        dailyValues[j] += pathSeries[j] ?? 0
      }
    }
  }

  return xValues.map((date, i) => ({
    date,
    value: dailyValues[i],
  }))
}

export async function getTopOffers(period: Period, _devFilter?: string[]): Promise<TopOffer[]> {
  // TODO: requires catalog DB — collection IDs, creator info, unit counts
  // Amplitude can track preview views by collection ID if the event includes it
  // For v1, return empty array
  return []
}

export async function getMostOfferedUnits(period: Period, _devFilter?: string[]): Promise<OfferedUnit[]> {
  // TODO: requires catalog DB — unit_types added to collections
  // This data is stored in the catalog DB collections table
  // For v1, return empty array
  return []
}

export async function getInvestorGeography(period: Period, _devFilter?: string[]): Promise<GeoData> {
  const [countryResult, cityResult] = await Promise.all([
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "uniques",
      period,
      groupBy: [{ type: "user", value: "country" }],
    }),
    amplitudeQuery({
      event: "[Amplitude] Page Viewed",
      metric: "uniques",
      period,
      groupBy: [{ type: "user", value: "city" }],
    }),
  ])

  // Countries
  const countryLabels = countryResult.data.seriesLabels ?? []
  const countryCollapsed = countryResult.data.seriesCollapsed ?? []
  const countryEntries: { name: string; value: number }[] = []
  let totalUsers = 0

  for (let i = 0; i < countryLabels.length; i++) {
    const name = extractLabel(countryLabels, i)
    const value = countryCollapsed[i]?.[0]?.value ?? 0
    if (name && name !== "none" && value > 0) {
      countryEntries.push({ name, value })
      totalUsers += value
    }
  }
  countryEntries.sort((a, b) => b.value - a.value)

  const countries = countryEntries.map(c => ({
    name: c.name,
    value: c.value,
    percentage: totalUsers > 0 ? Math.round((c.value / totalUsers) * 100 * 10) / 10 : 0,
  }))

  // Target market percentage
  let targetUsers = 0
  for (const c of countryEntries) {
    if (TARGET_MARKET_COUNTRIES.includes(c.name)) {
      targetUsers += c.value
    }
  }
  const targetMarketPct = totalUsers > 0
    ? Math.round((targetUsers / totalUsers) * 100 * 10) / 10
    : 0

  // Cities
  const cityLabels = cityResult.data.seriesLabels ?? []
  const cityCollapsed = cityResult.data.seriesCollapsed ?? []
  const cityEntries: { name: string; country: string; value: number }[] = []

  for (let i = 0; i < cityLabels.length; i++) {
    const name = extractLabel(cityLabels, i)
    const value = cityCollapsed[i]?.[0]?.value ?? 0
    if (name && name !== "none" && value > 0) {
      cityEntries.push({ name, country: "", value })
    }
  }
  cityEntries.sort((a, b) => b.value - a.value)

  return {
    countries,
    cities: cityEntries.slice(0, 10),
    targetMarketPct,
  }
}

// ── Helpers ────────────────────────────────────────────

export function formatDelta(delta: number): string {
  const prefix = delta > 0 ? "+" : ""
  return `${prefix}${delta.toFixed(1)}%`
}
