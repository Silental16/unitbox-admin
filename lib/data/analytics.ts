// Analytics data types and fetching functions
// Currently using mock data — will be replaced with catalog API calls

export type Period = "7d" | "30d" | "90d" | "all"

// ── Types ──────────────────────────────────────────────

export interface KpiMetrics {
  dau: { value: number; delta: number }
  wau: { value: number; delta: number }
  mau: { value: number; delta: number }
  avgSession: { value: number; delta: number } // seconds
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

// ── Mock Data ──────────────────────────────────────────

function generateTrafficTrend(days: number): TrafficPoint[] {
  const points: TrafficPoint[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    points.push({
      date: date.toISOString().split("T")[0],
      dau: Math.floor(800 + Math.random() * 600 + Math.sin(i / 3) * 200),
    })
  }
  return points
}

const mockKpi: KpiMetrics = {
  dau: { value: 1247, delta: 12.3 },
  wau: { value: 4832, delta: 8.1 },
  mau: { value: 12450, delta: -2.7 },
  avgSession: { value: 272, delta: 0.5 },
  collections: { value: 89, delta: 23.4 },
}

const mockSessionDistribution: SessionBucket[] = [
  { range: "0-1m", count: 423, percentage: 34 },
  { range: "1-3m", count: 348, percentage: 28 },
  { range: "3-5m", count: 224, percentage: 18 },
  { range: "5-10m", count: 149, percentage: 12 },
  { range: "10m+", count: 99, percentage: 8 },
]

const mockDeveloperActivity: DeveloperActivityData = {
  topProjects: [
    { name: "BREIG Edem Ubud", developer: "BREIG Group", views: 342 },
    { name: "Lyvin Uluwatu", developer: "Lyvin Development", views: 218 },
    { name: "ANTA MedSpa", developer: "ANTA Properties", views: 156 },
    { name: "YOLLA Resort", developer: "YOLLA", views: 134 },
    { name: "LUMA Residence", developer: "LUMA Group", views: 121 },
    { name: "Aravita Villas", developer: "Aravita", views: 98 },
    { name: "Sunny Berawa", developer: "Sunny Group", views: 87 },
    { name: "GreenVillage", developer: "Green Development", views: 76 },
    { name: "Ramada Encore", developer: "Wyndham", views: 65 },
    { name: "Edem II", developer: "BREIG Group", views: 54 },
  ],
  topDevelopers: [
    { name: "BREIG Group", projects: 5, totalViews: 890 },
    { name: "Lyvin Development", projects: 3, totalViews: 512 },
    { name: "ANTA Properties", projects: 2, totalViews: 298 },
    { name: "YOLLA", projects: 1, totalViews: 134 },
    { name: "LUMA Group", projects: 2, totalViews: 189 },
  ],
}

const mockAgentActivity: AgentMetrics = {
  activeAgents: 47,
  collectionsPerAgent: 3.2,
  topAgents: [
    { name: "Alex K.", collections: 24, sessions: 12 },
    { name: "Maria S.", collections: 18, sessions: 9 },
    { name: "Dmitry P.", collections: 15, sessions: 11 },
    { name: "Anna R.", collections: 12, sessions: 8 },
    { name: "Ivan M.", collections: 10, sessions: 7 },
  ],
}

const mockRetention: RetentionData = {
  d1: 34,
  d7: 18,
  d30: 8,
  cohorts: [
    { week: "Mar 3", rates: [100, 38, 22, 12, 9] },
    { week: "Mar 10", rates: [100, 35, 19, 10] },
    { week: "Mar 17", rates: [100, 36, 20] },
    { week: "Mar 24", rates: [100, 40] },
  ],
}

const mockGeography: GeographyData = {
  countries: [
    { country: "Indonesia", users: 562, fill: "var(--color-indonesia)" },
    { country: "Russia", users: 275, fill: "var(--color-russia)" },
    { country: "Australia", users: 137, fill: "var(--color-australia)" },
    { country: "China", users: 124, fill: "var(--color-china)" },
    { country: "Other", users: 149, fill: "var(--color-other)" },
  ],
  cities: [
    { city: "Jakarta", country: "ID", users: 312 },
    { city: "Moscow", country: "RU", users: 187 },
    { city: "Denpasar", country: "ID", users: 145 },
    { city: "Sydney", country: "AU", users: 98 },
    { city: "Singapore", country: "SG", users: 76 },
    { city: "Shanghai", country: "CN", users: 68 },
    { city: "Dubai", country: "AE", users: 54 },
    { city: "Surabaya", country: "ID", users: 47 },
  ],
}

// ── Fetch Functions ────────────────────────────────────
// TODO: Replace with real catalog API calls
// const CATALOG_API = process.env.CATALOG_API_URL
// const API_KEY = process.env.CATALOG_API_KEY

function periodToDays(period: Period): number {
  switch (period) {
    case "7d": return 7
    case "30d": return 30
    case "90d": return 90
    case "all": return 365
  }
}

export async function getDashboardKpi(_period: Period): Promise<KpiMetrics> {
  return mockKpi
}

export async function getTrafficTrend(period: Period): Promise<TrafficPoint[]> {
  return generateTrafficTrend(periodToDays(period))
}

export async function getSessionDistribution(_period: Period): Promise<SessionBucket[]> {
  return mockSessionDistribution
}

export async function getDeveloperActivity(_period: Period): Promise<DeveloperActivityData> {
  return mockDeveloperActivity
}

export async function getAgentActivity(_period: Period): Promise<AgentMetrics> {
  return mockAgentActivity
}

export async function getRetention(): Promise<RetentionData> {
  return mockRetention
}

export async function getGeography(_period: Period): Promise<GeographyData> {
  return mockGeography
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
