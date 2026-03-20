"use client"

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

export function TopOffersTable({ data }: { data: TopOffer[] }) {
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
                <TableHead>Collection #</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Developer</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead className="text-right">Unique Viewers</TableHead>
                <TableHead className="text-right">Total Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((offer) => (
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
