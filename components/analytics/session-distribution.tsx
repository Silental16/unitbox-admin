"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { SessionBucket } from "@/lib/data/analytics"

const chartConfig = {
  count: {
    label: "Sessions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SessionDistribution({ data }: { data: SessionBucket[] }) {
  const hasData = data.length > 0 && data[0].range !== "N/A"
  const totalSessions = data.reduce((sum, item) => sum + item.count, 0)

  // Weighted average: use midpoint of each range in minutes
  const rangeMidpoints: Record<string, number> = {
    "0-1m": 0.5,
    "1-3m": 2,
    "3-5m": 4,
    "5-10m": 7.5,
    "10m+": 12,
  }
  const weightedSum = data.reduce(
    (sum, item) => sum + (rangeMidpoints[item.range] ?? 5) * item.count,
    0
  )
  const avgDuration =
    totalSessions > 0 ? (weightedSum / totalSessions).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Duration</CardTitle>
      </CardHeader>
      {!hasData ? (
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">
              Session duration data not available.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Requires raw event export API.
            </p>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className="pt-0">
            <ChartContainer
              config={chartConfig}
              className="max-h-[180px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={data}
                margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="range"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="grid w-full grid-cols-2 divide-x divide-border/60">
              <div className="px-2 text-center">
                <div className="text-[0.65rem] text-muted-foreground uppercase">
                  Total Sessions
                </div>
                <div className="text-sm font-medium tabular-nums">
                  {totalSessions.toLocaleString()}
                </div>
              </div>
              <div className="px-2 text-center">
                <div className="text-[0.65rem] text-muted-foreground uppercase">
                  Avg Duration
                </div>
                <div className="text-sm font-medium tabular-nums">
                  {avgDuration}m
                </div>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
