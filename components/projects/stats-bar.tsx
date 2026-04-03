"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { CatalogProject } from "@/lib/data/catalog-projects"

interface StatsBarProps {
  projects: CatalogProject[]
}

export function StatsBar({ projects }: StatsBarProps) {
  const filled = projects.filter((p) => p.status === "filled").length
  const pending = projects.filter((p) => p.status === "pending").length
  const filling = projects.filter((p) => p.status === "filling").length
  const totalUnits = projects.reduce((sum, p) => sum + p.unitsCount, 0)

  const stats = [
    { label: "Filled", value: filled, color: "text-foreground" },
    { label: "In Progress", value: filling, color: "text-foreground" },
    { label: "Pending", value: pending, color: "text-muted-foreground" },
    { label: "Total Units", value: totalUnits, color: "text-foreground" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="py-4 px-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-semibold tabular-nums ${stat.color}`}>
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
