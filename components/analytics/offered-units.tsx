"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { OfferedUnit } from "@/lib/data/analytics"

export function OfferedUnits({ data }: { data: OfferedUnit[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Offered Units</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Unit data requires catalog DB integration
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.map((unit) => (
              <div key={unit.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{unit.name}</span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  in {unit.count.toLocaleString()} offers
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
