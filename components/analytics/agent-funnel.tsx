"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { FunnelStep } from "@/lib/data/analytics"

const barColors = [
  "bg-chart-1/20",
  "bg-chart-2/20",
  "bg-chart-3/20",
  "bg-chart-4/20",
]

export function AgentFunnel({ data }: { data: FunnelStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {data.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className="w-40 text-sm text-muted-foreground">{step.label}</span>
              <div className="flex-1">
                <div
                  className={cn(
                    "h-8 rounded-md flex items-center px-3",
                    barColors[i % barColors.length]
                  )}
                  style={{ width: `${step.percentage}%` }}
                >
                  <span className="text-sm font-medium tabular-nums">{step.value.toLocaleString()}</span>
                </div>
              </div>
              <span className="w-16 text-right text-sm tabular-nums text-muted-foreground">{step.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
