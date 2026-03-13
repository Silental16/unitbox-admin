"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Developer } from "@/lib/data/developers"
import { calculateIcpScore } from "@/lib/data/scoring"

interface StatsBarProps {
  developers: Developer[]
}

export function StatsBar({ developers }: StatsBarProps) {
  const totalDevelopers = developers.length
  const totalUnitsBuilding = developers.reduce(
    (sum, d) => sum + d.activeUnits,
    0
  )
  const withAgent = developers.filter((d) => d.hasAgent).length
  const agentPercent =
    totalDevelopers > 0
      ? Math.round((withAgent / totalDevelopers) * 100)
      : 0
  const avgIcp =
    totalDevelopers > 0
      ? Math.round(
          developers.reduce((sum, d) => sum + calculateIcpScore(d), 0) /
            totalDevelopers
        )
      : 0

  const stats = [
    { label: "Developers", value: String(totalDevelopers) },
    { label: "Units Building", value: totalUnitsBuilding.toLocaleString() },
    { label: "Agent Programs", value: `${withAgent} (${agentPercent}%)` },
    { label: "Avg ICP", value: String(avgIcp) },
  ]

  return (
    <Card>
      <CardContent>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/60">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 text-center sm:px-4">
              <div className="text-2xl font-semibold tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-[0.65rem] text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
