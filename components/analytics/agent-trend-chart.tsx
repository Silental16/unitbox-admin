"use client"

import { Area, AreaChart, XAxis } from "recharts"

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
  type ChartConfig,
} from "@/components/ui/chart"
import type { TrafficPoint } from "@/lib/data/analytics"

const chartConfig = {
  value: {
    label: "DAU",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function AgentTrendChart({ data }: { data: TrafficPoint[] }) {
  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Agent DAU Trend</CardTitle>
        <CardDescription>
          Last {data.length} days
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              hide
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => String(value).slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              fillOpacity={0.15}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
