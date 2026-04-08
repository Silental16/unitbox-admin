"use client"

import * as React from "react"
import { ResponsiveContainer, LineChart, Line } from "recharts"

import { cn } from "@/lib/utils"

function Sparkline({
  data,
  color = "var(--color-chart-1)",
  width = 80,
  height = 32,
  strokeWidth = 1.5,
  className,
  ...props
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
  strokeWidth?: number
} & Omit<React.ComponentProps<"div">, "color">) {
  const chartData = React.useMemo(
    () => data.map((value) => ({ value })),
    [data]
  )

  return (
    <div
      data-slot="sparkline"
      className={cn("inline-block", className)}
      style={{ width, height }}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { Sparkline }
