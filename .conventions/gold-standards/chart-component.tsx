// Gold standard: Chart component using Recharts + shadcn/ui
// Pattern from: components/cards/visitors.tsx

"use client"

import { Area, AreaChart, XAxis } from "recharts"
import {
  Card,
  CardAction,
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

// 1. ChartConfig with CSS var colors, `satisfies ChartConfig`
const chartConfig = {
  metric: {
    label: "Metric Name",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

// 2. Card wrapper with ChartContainer inside
// 3. fillOpacity=0.15, strokeWidth=2, type="natural"
// 4. ChartTooltip with ChartTooltipContent indicator="line"
