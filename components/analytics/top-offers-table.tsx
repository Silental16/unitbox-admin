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
import type { TopOffer } from "@/lib/data/analytics"

type SortColumn = "collectionId" | "uniqueViewers" | "totalViews"
interface SortOption { column: SortColumn; direction: "asc" | "desc" }

function toggleSort(column: SortColumn, current: SortOption): SortOption {
  if (current.column === column) {
    return { column, direction: current.direction === "asc" ? "desc" : "asc" }
  }
  return { column, direction: "desc" }
}

export function TopOffersTable({ data }: { data: TopOffer[] }) {
  const [sort, setSort] = useState<SortOption>({ column: "uniqueViewers", direction: "desc" })

  function SortIcon({ column }: { column: SortColumn }) {
    if (sort.column !== column) return <span className="text-muted-foreground/30 ml-1">↕</span>
    return <span className="ml-1">{sort.direction === "asc" ? "↑" : "↓"}</span>
  }

  const sorted = [...data].sort((a, b) => {
    const dir = sort.direction === "asc" ? 1 : -1
    return dir * ((a[sort.column] ?? 0) - (b[sort.column] ?? 0))
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Offers</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Collection data requires catalog DB integration
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => setSort(toggleSort("collectionId", sort))}
                >
                  <span className="inline-flex items-center gap-1">
                    Collection #
                    <SortIcon column="collectionId" />
                  </span>
                </TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Developer</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead
                  className="text-right cursor-pointer select-none"
                  onClick={() => setSort(toggleSort("uniqueViewers", sort))}
                >
                  <span className="inline-flex items-center justify-end gap-1 w-full">
                    Unique Viewers
                    <SortIcon column="uniqueViewers" />
                  </span>
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer select-none"
                  onClick={() => setSort(toggleSort("totalViews", sort))}
                >
                  <span className="inline-flex items-center justify-end gap-1 w-full">
                    Total Views
                    <SortIcon column="totalViews" />
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((offer) => (
                <TableRow key={offer.collectionId}>
                  <TableCell className="text-muted-foreground tabular-nums">
                    #{offer.collectionId}
                  </TableCell>
                  <TableCell>{offer.createdBy}</TableCell>
                  <TableCell>{offer.developer}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {offer.units.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-amber-500 tabular-nums">
                    {offer.uniqueViewers.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {offer.totalViews.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
