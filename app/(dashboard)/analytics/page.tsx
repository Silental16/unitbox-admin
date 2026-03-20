import { redirect } from "next/navigation"
import { getUserRole } from "@/lib/data/roles"
import { DashboardView } from "@/components/analytics/dashboard-view"
import {
  getAgentKpis,
  getAgentTrafficTrend,
  getCollectionAnalytics,
  getAgentFunnel,
  getTopAgents,
  getDeveloperHealth,
  getInvestorKpis,
  getInvestorTrafficTrend,
  getTopOffers,
  getMostOfferedUnits,
  getInvestorGeography,
  type Period,
} from "@/lib/data/analytics"

const VALID_PERIODS: Period[] = ["7d", "30d", "90d", "6m", "all"]
const VALID_TABS = ["agents", "investors"] as const

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; dev?: string; tab?: string }>
}) {
  const role = await getUserRole()
  if (role !== "admin") redirect("/developers")

  const params = await searchParams

  // Validate period
  const period: Period = VALID_PERIODS.includes(params?.period as Period)
    ? (params.period as Period)
    : "30d"

  // Validate tab
  const tab: (typeof VALID_TABS)[number] = VALID_TABS.includes(
    params?.tab as (typeof VALID_TABS)[number]
  )
    ? (params.tab as (typeof VALID_TABS)[number])
    : "agents"

  // Parse developer filter
  const devFilter = params?.dev
    ? params.dev.split(",").filter((d) => d.trim().length > 0)
    : []

  // Fetch data based on active tab
  if (tab === "agents") {
    const [agentKpis, agentTraffic, collections, funnel, topAgents, developerHealth] =
      await Promise.all([
        getAgentKpis(period, devFilter.length > 0 ? devFilter : undefined),
        getAgentTrafficTrend(period, devFilter.length > 0 ? devFilter : undefined),
        getCollectionAnalytics(period, devFilter.length > 0 ? devFilter : undefined),
        getAgentFunnel(period, devFilter.length > 0 ? devFilter : undefined),
        getTopAgents(period, devFilter.length > 0 ? devFilter : undefined),
        getDeveloperHealth(period),
      ])

    return (
      <DashboardView
        period={period}
        tab={tab}
        devFilter={devFilter}
        agentKpis={agentKpis}
        agentTraffic={agentTraffic}
        collections={collections}
        funnel={funnel}
        topAgents={topAgents}
        developerHealth={developerHealth}
      />
    )
  }

  // Investor tab
  const [investorKpis, investorFunnel, topOffers, offeredUnits, investorTraffic, geography] =
    await Promise.all([
      getInvestorKpis(period, devFilter.length > 0 ? devFilter : undefined),
      getAgentFunnel(period, devFilter.length > 0 ? devFilter : undefined),
      getTopOffers(period, devFilter.length > 0 ? devFilter : undefined),
      getMostOfferedUnits(period, devFilter.length > 0 ? devFilter : undefined),
      getInvestorTrafficTrend(period, devFilter.length > 0 ? devFilter : undefined),
      getInvestorGeography(period, devFilter.length > 0 ? devFilter : undefined),
    ])

  return (
    <DashboardView
      period={period}
      tab={tab}
      devFilter={devFilter}
      investorKpis={investorKpis}
      investorFunnel={investorFunnel}
      topOffers={topOffers}
      offeredUnits={offeredUnits}
      investorTraffic={investorTraffic}
      geography={geography}
    />
  )
}
