"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { KpiMetrics } from "@/lib/data/analytics"
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

export function KpiCards({ data }: { data: KpiMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <KpiCard
        title="DAU (вчера)"
        value={data.dau.value.toLocaleString()}
        delta={data.dau.delta}
      />
      <KpiCard
        title="WAU"
        value={data.wau.value.toLocaleString()}
        delta={data.wau.delta}
      />
      <KpiCard
        title="MAU"
        value={data.mau.value.toLocaleString()}
        delta={data.mau.delta}
      />
      <KpiCard
        title="Page Views"
        value={data.pageViews.value.toLocaleString()}
        delta={data.pageViews.delta}
      />
      <KpiCard
        title="Collections"
        value={data.collections.value.toLocaleString()}
        delta={data.collections.delta}
      />
    </div>
  )
}
