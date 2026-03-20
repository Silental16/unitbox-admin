import { redirect } from "next/navigation"
import { getUserRole } from "@/lib/data/roles"
import { DashboardView } from "@/components/analytics/dashboard-view"
import {
  getDashboardKpi,
  getTrafficTrend,
  getSessionDistribution,
  getDeveloperActivity,
  getAgentActivity,
  getRetention,
  getGeography,
  type Period,
} from "@/lib/data/analytics"

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const role = await getUserRole()
  if (role !== "admin") redirect("/developers")

  const params = await searchParams
  const validPeriods: Period[] = ["7d", "30d", "90d", "all"]
  const period: Period = validPeriods.includes(params?.period as Period)
    ? (params.period as Period)
    : "30d"

  const [kpi, traffic, sessions, developers, agents, retention, geography] =
    await Promise.all([
      getDashboardKpi(period),
      getTrafficTrend(period),
      getSessionDistribution(period),
      getDeveloperActivity(period),
      getAgentActivity(period),
      getRetention(),
      getGeography(period),
    ])

  return (
    <DashboardView
      period={period}
      kpi={kpi}
      traffic={traffic}
      sessions={sessions}
      developers={developers}
      agents={agents}
      retention={retention}
      geography={geography}
    />
  )
}
