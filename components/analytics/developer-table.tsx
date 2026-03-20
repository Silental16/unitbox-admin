"use client"

import { useState } from "react"
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

type SortColumn = "name" | "healthScore" | "sessions" | "activeAgents" | "collections" | "offerViews"
interface SortOption { column: SortColumn; direction: "asc" | "desc" }

function toggleSort(column: SortColumn, current: SortOption): SortOption {
  if (current.column === column) {
    return { column, direction: current.direction === "asc" ? "desc" : "asc" }
  }
  return { column, direction: "desc" }
}

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
  const [sort, setSort] = useState<SortOption>({ column: "healthScore", direction: "asc" })

  function SortIcon({ column }: { column: SortColumn }) {
    if (sort.column !== column) return <span className="text-muted-foreground/30 ml-1">↕</span>
    return <span className="ml-1">{sort.direction === "asc" ? "↑" : "↓"}</span>
  }

  const sorted = [...data].sort((a, b) => {
    const dir = sort.direction === "asc" ? 1 : -1
    if (sort.column === "name") return dir * a.name.localeCompare(b.name)
    return dir * ((a[sort.column] ?? 0) - (b[sort.column] ?? 0))
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => setSort(toggleSort("name", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Developer
                  <SortIcon column="name" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => setSort(toggleSort("healthScore", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Health
                  <SortIcon column="healthScore" />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => setSort(toggleSort("sessions", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Sessions
                  <SortIcon column="sessions" />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => setSort(toggleSort("activeAgents", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Active Agents
                  <SortIcon column="activeAgents" />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => setSort(toggleSort("collections", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Collections
                  <SortIcon column="collections" />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => setSort(toggleSort("offerViews", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Offer Views
                  <SortIcon column="offerViews" />
                </span>
              </TableHead>
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
