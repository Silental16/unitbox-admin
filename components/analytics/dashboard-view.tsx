"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PeriodSelector } from "@/components/analytics/period-selector"
import { DeveloperFilter } from "@/components/analytics/developer-filter"
import { AgentKpiCards } from "@/components/analytics/agent-kpi-cards"
import { AgentTrendChart } from "@/components/analytics/agent-trend-chart"
import { CollectionsChart } from "@/components/analytics/collections-chart"
import { AgentFunnel } from "@/components/analytics/agent-funnel"
import { TopAgentsTable } from "@/components/analytics/top-agents-table"
import { DeveloperTable } from "@/components/analytics/developer-table"
import { ConversionFunnel } from "@/components/analytics/conversion-funnel"
import { InvestorKpiCards } from "@/components/analytics/investor-kpi-cards"
import { TopOffersTable } from "@/components/analytics/top-offers-table"
import { OfferedUnits } from "@/components/analytics/offered-units"
import { InvestorTrendChart } from "@/components/analytics/investor-trend-chart"
import { InvestorGeography } from "@/components/analytics/investor-geography"
import type {
  Period,
  AgentKpis,
  TrafficPoint,
  CollectionAnalytics,
  FunnelStep,
  TopAgent,
  DeveloperHealth,
  InvestorKpis,
  TopOffer,
  OfferedUnit,
  GeoData,
} from "@/lib/data/analytics"

interface DashboardViewProps {
  period: Period
  tab: "agents" | "investors"
  devFilter: string[]
  // Agent tab data
  agentKpis?: AgentKpis
  agentTraffic?: TrafficPoint[]
  collections?: CollectionAnalytics
  funnel?: FunnelStep[]
  topAgents?: TopAgent[]
  developerHealth?: DeveloperHealth[]
  // Investor tab data
  investorKpis?: InvestorKpis
  investorFunnel?: FunnelStep[]
  topOffers?: TopOffer[]
  offeredUnits?: OfferedUnit[]
  investorTraffic?: TrafficPoint[]
  geography?: GeoData
}

export function DashboardView({
  period,
  tab,
  devFilter,
  agentKpis,
  agentTraffic,
  collections,
  funnel,
  topAgents,
  developerHealth,
  investorKpis,
  investorFunnel,
  topOffers,
  offeredUnits,
  investorTraffic,
  geography,
}: DashboardViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.push(`/analytics?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Catalog usage statistics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DeveloperFilter selected={devFilter} />
          <PeriodSelector current={period} />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="agents">Agent Activity</TabsTrigger>
          <TabsTrigger value="investors">Investor Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="agents">
          <div className="flex flex-col gap-4">
            {agentKpis && <AgentKpiCards data={agentKpis} />}
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {agentTraffic && <AgentTrendChart data={agentTraffic} />}
              </div>
              {collections && <CollectionsChart data={collections} />}
            </div>
            {funnel && <AgentFunnel data={funnel} />}
            {topAgents && <TopAgentsTable data={topAgents} />}
            {!devFilter.length && developerHealth && (
              <DeveloperTable data={developerHealth} />
            )}
          </div>
        </TabsContent>
        <TabsContent value="investors">
          <div className="flex flex-col gap-4">
            {investorFunnel && <ConversionFunnel data={investorFunnel} />}
            {investorKpis && <InvestorKpiCards data={investorKpis} />}
            <div className="grid gap-4 lg:grid-cols-2">
              {topOffers && <TopOffersTable data={topOffers} />}
              {offeredUnits && <OfferedUnits data={offeredUnits} />}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {investorTraffic && (
                <InvestorTrendChart data={investorTraffic} />
              )}
              {geography && <InvestorGeography data={geography} />}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
