"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { InvestorKpis } from "@/lib/data/analytics"
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

export function InvestorKpiCards({ data }: { data: InvestorKpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KpiCard
        title="Unique Investors"
        value={data.uniqueInvestors.value.toLocaleString()}
        delta={data.uniqueInvestors.delta}
      />
      <KpiCard
        title="Preview Views"
        value={data.previewViews.value.toLocaleString()}
        delta={data.previewViews.delta}
      />
      <KpiCard
        title="Views / Collection"
        value={data.viewsPerCollection.value.toFixed(1)}
        delta={data.viewsPerCollection.delta}
      />
      <KpiCard
        title="% Target Markets"
        value={`${data.targetMarketPct.value.toFixed(1)}%`}
        delta={data.targetMarketPct.delta}
      />
    </div>
  )
}
