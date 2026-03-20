"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { CollectionAnalytics } from "@/lib/data/analytics"

const chartConfig = {
  created: {
    label: "Created",
    color: "var(--chart-2)",
  },
  viewed: {
    label: "Viewed",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function CollectionsChart({ data }: { data: CollectionAnalytics }) {
  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Collections</CardTitle>
        <CardDescription>
          Weekly created vs viewed
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart
            accessibilityLayer
            data={data.weeklyCreated}
            margin={{ left: 0, right: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en", { month: "short", day: "numeric" })
              }
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs"
              width={35}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="created"
              fill="var(--color-created)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="viewed"
              fill="var(--color-viewed)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
