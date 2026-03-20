"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AgentKpis } from "@/lib/data/analytics"
import { formatDelta } from "@/lib/data/analytics"

interface KpiCardProps {
  title: string
  value: string
  delta: number
}

function KpiCard({ title, value, delta }: KpiCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
        <Badge variant={delta >= 0 ? "secondary" : "destructive"} className="tabular-nums w-fit">
          {formatDelta(delta)}
        </Badge>
      </CardHeader>
    </Card>
  )
}

export function AgentKpiCards({ data }: { data: AgentKpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <KpiCard
        title="Active Agents"
        value={data.activeAgents.value.toLocaleString()}
        delta={data.activeAgents.delta}
      />
      <KpiCard
        title="DAU"
        value={data.dau.value.toLocaleString()}
        delta={data.dau.delta}
      />
      <KpiCard
        title="WAR"
        value={`${data.war.value.toLocaleString()}%`}
        delta={data.war.delta}
      />
      <KpiCard
        title="Collections"
        value={data.collections.value.toLocaleString()}
        delta={data.collections.delta}
      />
      <KpiCard
        title="Effective Collections"
        value={data.effectiveCollections.value.toLocaleString()}
        delta={data.effectiveCollections.delta}
      />
      <KpiCard
        title="Activation Rate"
        value={`${data.activationRate.value.toLocaleString()}%`}
        delta={data.activationRate.delta}
      />
    </div>
  )
}
