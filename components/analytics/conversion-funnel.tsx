"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FunnelStep } from "@/lib/data/analytics"
import { cn } from "@/lib/utils"

const STEP_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
]

const STEP_WIDTHS = ["100%", "75%", "50%", "25%"]

export function ConversionFunnel({ data }: { data: FunnelStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investor Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {data.map((step, i) => {
          const isMuted = step.value === 0 || step.label.includes("Not Yet")
          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center justify-between rounded-md px-4 py-3",
                isMuted
                  ? "border-2 border-dashed border-muted text-muted-foreground"
                  : "text-white"
              )}
              style={{
                maxWidth: STEP_WIDTHS[i] ?? "100%",
                width: "100%",
                backgroundColor: isMuted ? "transparent" : STEP_COLORS[i],
              }}
            >
              <span className="text-sm font-medium">{step.label}</span>
              <span className="tabular-nums text-sm font-semibold">
                {step.value.toLocaleString()}
                <span className="ml-2 opacity-75">({step.percentage}%)</span>
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
