"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RetentionData } from "@/lib/data/analytics"

function retentionBg(value: number): string {
  if (value >= 80) return "bg-chart-1/20"
  if (value >= 50) return "bg-chart-1/15"
  if (value >= 20) return "bg-chart-1/10"
  return "bg-chart-1/5"
}

export function RetentionTable({ data }: { data: RetentionData }) {
  const maxWeeks = data.cohorts.length > 0
    ? Math.max(...data.cohorts.map((c) => c.rates.length))
    : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-muted p-3 text-center">
            <p className="text-2xl font-semibold text-chart-1 tabular-nums">
              {data.d1}%
            </p>
            <p className="text-sm text-muted-foreground">D1</p>
          </div>
          <div className="rounded-lg bg-muted p-3 text-center">
            <p className="text-2xl font-semibold text-chart-2 tabular-nums">
              {data.d7}%
            </p>
            <p className="text-sm text-muted-foreground">D7</p>
          </div>
          <div className="rounded-lg bg-muted p-3 text-center">
            <p className="text-2xl font-semibold text-chart-5 tabular-nums">
              {data.d30}%
            </p>
            <p className="text-sm text-muted-foreground">D30</p>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Weekly Cohorts
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cohort</TableHead>
              {Array.from({ length: maxWeeks }, (_, i) => (
                <TableHead key={i} className="text-center">
                  Week {i}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.cohorts.map((cohort) => (
              <TableRow key={cohort.week}>
                <TableCell className="font-medium">{cohort.week}</TableCell>
                {Array.from({ length: maxWeeks }, (_, i) => (
                  <TableCell
                    key={i}
                    className={cn(
                      "text-center tabular-nums",
                      cohort.rates[i] !== undefined && retentionBg(cohort.rates[i])
                    )}
                  >
                    {cohort.rates[i] !== undefined ? `${cohort.rates[i]}%` : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
