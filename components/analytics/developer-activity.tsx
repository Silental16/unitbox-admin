"use client"

import { Badge } from "@/components/ui/badge"
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
import type { DeveloperActivityData } from "@/lib/data/analytics"

function rankVariant(rank: number) {
  if (rank === 1) return "default" as const
  if (rank <= 3) return "secondary" as const
  return "outline" as const
}

export function DeveloperActivity({ data }: { data: DeveloperActivityData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Top Projects
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topProjects.slice(0, 10).map((project, i) => (
                  <TableRow key={`${project.name}-${project.developer}`}>
                    <TableCell>
                      <Badge variant={rankVariant(i + 1)}>
                        {i + 1}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {project.developer}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {project.views.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Top Developers
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Developer</TableHead>
                  <TableHead className="text-right">Projects</TableHead>
                  <TableHead className="text-right">Total Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topDevelopers.map((dev) => (
                  <TableRow key={dev.name}>
                    <TableCell className="font-medium">{dev.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {dev.projects}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {dev.totalViews.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
