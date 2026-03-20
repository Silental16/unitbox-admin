"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DeveloperHealth } from "@/lib/data/analytics"
import { DeveloperHealthBadge } from "./developer-health"

function Sparkline({ data }: { data: number[] }) {
  if (!data.length) return null
  const max = Math.max(...data, 1)
  const width = 60
  const height = 20
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * height}`)
    .join(" ")
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-muted-foreground"
      />
    </svg>
  )
}

export function DeveloperTable({ data }: { data: DeveloperHealth[] }) {
  const sorted = [...data].sort((a, b) => a.healthScore - b.healthScore)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Developer</TableHead>
              <TableHead>Health</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">Active Agents</TableHead>
              <TableHead className="text-right">Collections</TableHead>
              <TableHead className="text-right">Offer Views</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((dev) => (
              <TableRow key={dev.code}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{dev.name}</span>
                    <span className="text-xs text-muted-foreground">{dev.code}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DeveloperHealthBadge score={dev.healthScore} />
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {dev.sessions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {dev.activeAgents.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {dev.collections.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {dev.offerViews.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Sparkline data={dev.trend} />
                </TableCell>
                <TableCell>
                  {dev.churnRisk && (
                    <Badge variant="destructive" className="whitespace-nowrap">
                      Churn Risk
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No developer data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
