"use client"

import { Bar, BarChart, XAxis } from "recharts"

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
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart
            accessibilityLayer
            data={data.weeklyCreated}
            margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
          >
            <XAxis
              dataKey="week"
              tickLine={false}
              hide
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => String(value).slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
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
