"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TopAgent } from "@/lib/data/analytics"

type SortColumn = "name" | "hours" | "collections" | "offerViews"
interface SortOption { column: SortColumn; direction: "asc" | "desc" }

function toggleSort(column: SortColumn, current: SortOption): SortOption {
  if (current.column === column) {
    return { column, direction: current.direction === "asc" ? "desc" : "asc" }
  }
  return { column, direction: "desc" }
}

export function TopAgentsTable({ data }: { data: TopAgent[] }) {
  const [sort, setSort] = useState<SortOption>({ column: "hours", direction: "desc" })

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Agent data requires catalog DB integration
          </p>
        </CardContent>
      </Card>
    )
  }

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
        <CardTitle>Top Agents</CardTitle>
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
                  Agent
                  <SortIcon column="name" />
                </span>
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => setSort(toggleSort("hours", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Hours
                  <SortIcon column="hours" />
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
              <TableHead className="text-right">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((agent) => (
              <TableRow key={`${agent.name}-${agent.agency}`}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell className="text-muted-foreground">{agent.role}</TableCell>
                <TableCell className="text-muted-foreground">{agent.agency}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {agent.hours.toFixed(1)}h
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {agent.collections.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {agent.offerViews.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {agent.lastActive}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
