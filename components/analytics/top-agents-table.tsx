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
import type { TopAgent } from "@/lib/data/analytics"

export function TopAgentsTable({ data }: { data: TopAgent[] }) {
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

  const sorted = [...data].sort((a, b) => b.hours - a.hours)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead className="text-right">Hours</TableHead>
              <TableHead className="text-right">Collections</TableHead>
              <TableHead className="text-right">Offer Views</TableHead>
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
