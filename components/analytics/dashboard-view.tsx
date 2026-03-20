"use client"

import { KpiCards } from "@/components/analytics/kpi-cards"
import { PeriodSelector } from "@/components/analytics/period-selector"
import { TrafficChart } from "@/components/analytics/traffic-chart"
import { SessionDistribution } from "@/components/analytics/session-distribution"
import { DeveloperActivity } from "@/components/analytics/developer-activity"
import { AgentActivity } from "@/components/analytics/agent-activity"
import { RetentionTable } from "@/components/analytics/retention-table"
import { GeographyCharts } from "@/components/analytics/geography-charts"
import type {
  Period,
  KpiMetrics,
  TrafficPoint,
  SessionBucket,
  DeveloperActivityData,
  AgentMetrics,
  RetentionData,
  GeographyData,
} from "@/lib/data/analytics"

interface DashboardViewProps {
  period: Period
  kpi: KpiMetrics
  traffic: TrafficPoint[]
  sessions: SessionBucket[]
  developers: DeveloperActivityData
  agents: AgentMetrics
  retention: RetentionData
  geography: GeographyData
}

export function DashboardView({
  period,
  kpi,
  traffic,
  sessions,
  developers,
  agents,
  retention,
  geography,
}: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Catalog usage statistics
          </p>
        </div>
        <PeriodSelector current={period} />
      </div>
      <KpiCards data={kpi} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficChart data={traffic} />
        </div>
        <SessionDistribution data={sessions} />
      </div>
      <DeveloperActivity data={developers} />
      <div className="grid gap-4 lg:grid-cols-2">
        <AgentActivity data={agents} />
        <RetentionTable data={retention} />
      </div>
      <GeographyCharts data={geography} />
    </div>
  )
}
