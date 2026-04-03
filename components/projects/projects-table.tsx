"use client"

import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon, CheckIcon, MinusIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CatalogProject, ProjectFillStatus } from "@/lib/data/catalog-projects"
import { FILL_STATUSES } from "@/lib/data/catalog-projects"
import type { SortOption, SortColumn } from "./filter-bar"

interface ProjectsTableProps {
  projects: CatalogProject[]
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onSelectProject: (project: CatalogProject) => void
}

function toggleSort(column: SortColumn, current: SortOption, defaultDir: "asc" | "desc" = "desc"): SortOption {
  if (current.column === column) {
    return { column, direction: current.direction === "asc" ? "desc" : "asc" }
  }
  return { column, direction: defaultDir }
}

function SortIcon({ column, current }: { column: SortColumn; current: SortOption }) {
  if (column !== current.column) return null
  return current.direction === "asc" ? (
    <ArrowUpIcon className="size-3.5" />
  ) : (
    <ArrowDownIcon className="size-3.5" />
  )
}

function StatusBadge({ status }: { status: ProjectFillStatus }) {
  const config = FILL_STATUSES.find((s) => s.value === status) ?? FILL_STATUSES[0]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 h-6 text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`size-2 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  )
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function ProjectsTable({
  projects,
  sort,
  onSortChange,
  onSelectProject,
}: ProjectsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("name", sort, "asc"))}
            >
              <span className="inline-flex items-center gap-1">
                Project
                <SortIcon column="name" current={sort} />
              </span>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("status", sort, "asc"))}
            >
              <span className="inline-flex items-center gap-1">
                Status
                <SortIcon column="status" current={sort} />
              </span>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("unitsCount", sort))}
            >
              <span className="inline-flex items-center justify-end gap-1 w-full">
                Avail / Total
                <SortIcon column="unitsCount" current={sort} />
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("fillDate", sort))}
            >
              <span className="inline-flex items-center gap-1">
                Fill Date
                <SortIcon column="fillDate" current={sort} />
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none text-center"
              onClick={() => onSortChange(toggleSort("hasChess", sort))}
            >
              <span className="inline-flex items-center justify-center gap-1">
                Chess
                <SortIcon column="hasChess" current={sort} />
              </span>
            </TableHead>
            <TableHead>Last Sync</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onSelectProject(project)}
            >
              <TableCell>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-[240px]">
                      {project.name}
                    </span>
                    <Badge variant="outline" className="tabular-nums text-[11px] shrink-0">
                      #{project.catalogId}
                    </Badge>
                  </div>
                  {project.developerName && (
                    <p className="text-xs text-muted-foreground truncate max-w-[240px]">
                      {project.developerName}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm">{project.location || "—"}</TableCell>
              <TableCell>
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                {project.totalUnits > 0 ? (
                  <span>
                    <span className="text-emerald-600 dark:text-emerald-400">{project.availableUnits}</span>
                    <span className="text-muted-foreground font-normal">/{project.totalUnits}</span>
                  </span>
                ) : "—"}
              </TableCell>
              <TableCell className="text-sm tabular-nums">
                {formatDate(project.fillDate)}
              </TableCell>
              <TableCell className="text-center">
                {project.sheetsUrl ? (
                  <CheckIcon className="size-4 text-emerald-500 mx-auto" />
                ) : (
                  <MinusIcon className="size-4 text-muted-foreground/30 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-sm tabular-nums">
                {formatDate(project.lastSyncAt)}
              </TableCell>
            </TableRow>
          ))}
          {projects.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
