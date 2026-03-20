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

const FUNNEL_LABELS = [
  "Collections Created",
  "Collections with Preview Views",
  "Total Preview Views",
  "Contact Click",
]

export function ConversionFunnel({ data }: { data: FunnelStep[] }) {
  // Remap data to investor-context labels
  const steps = FUNNEL_LABELS.map((label, i) => {
    const original = data[i]
    const isStub = label === "Contact Click"
    return {
      label,
      value: isStub ? 0 : (original?.value ?? 0),
      percentage: isStub ? 0 : (original?.percentage ?? 0),
      isStub,
    }
  })

  const maxValue = Math.max(...steps.map((s) => s.value), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investor Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {steps.map((step, i) => {
          // Compute width: min 15% so zero values show a thin line
          const widthPct = step.value > 0
            ? Math.max(15, Math.round((step.value / maxValue) * 100))
            : 15

          return (
            <div
              key={step.label}
              className="flex w-full items-center gap-3"
            >
              <span className="w-[180px] shrink-0 text-right text-sm font-medium text-muted-foreground">
                {step.label}
              </span>
              <div
                className={cn(
                  "flex items-center justify-center rounded-md px-4 py-3",
                  step.isStub
                    ? "border-2 border-dashed border-muted text-muted-foreground"
                    : "text-white"
                )}
                style={{
                  width: `${widthPct}%`,
                  minWidth: "60px",
                  backgroundColor: step.isStub ? "transparent" : STEP_COLORS[i],
                }}
              >
                <span className="tabular-nums text-sm font-semibold">
                  {step.isStub ? "Not Yet Tracked" : step.value.toLocaleString()}
                </span>
              </div>
              {!step.isStub && (
                <span className="shrink-0 tabular-nums text-sm text-muted-foreground">
                  {step.percentage}%
                </span>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
