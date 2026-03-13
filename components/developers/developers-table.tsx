"use client"

import { ArrowDownIcon, ArrowUpIcon, SparklesIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Developer } from "@/lib/data/developers"
import type { SortOption } from "@/components/developers/filter-bar"
import {
  calculateIcpScore,
  getScoreColor,
  getScoreProgressColor,
} from "@/lib/data/scoring"

interface DevelopersTableProps {
  developers: Developer[]
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onSelectDeveloper: (developer: Developer) => void
}

function originBadgeVariant(tag: string) {
  switch (tag) {
    case "eu":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
    case "ru":
      return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
    case "au":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
  }
}

function originLabel(tag: string) {
  switch (tag) {
    case "eu":
      return "EU"
    case "ru":
      return "RU"
    case "au":
      return "AU"
    default:
      return "INT"
  }
}

function SortIcon({ column, current }: { column: SortOption; current: SortOption }) {
  if (column !== current) return null
  return column === "name" ? (
    <ArrowUpIcon className="size-3.5" />
  ) : (
    <ArrowDownIcon className="size-3.5" />
  )
}

export function DevelopersTable({
  developers,
  sort,
  onSortChange,
  onSelectDeveloper,
}: DevelopersTableProps) {
  return (
    <TooltipProvider>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange("name")}
              >
                <span className="inline-flex items-center gap-1">
                  Developer
                  <SortIcon column="name" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => onSortChange("activeUnits")}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Units
                  <SortIcon column="activeUnits" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => onSortChange("projects")}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-end gap-1 w-full underline decoration-dashed underline-offset-4 decoration-muted-foreground/50">
                      Projects
                      <SortIcon column="projects" current={sort} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Completed / Total projects</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange("icpScore")}
              >
                <span className="inline-flex items-center gap-1">
                  ICP Score
                  <SortIcon column="icpScore" current={sort} />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((dev) => {
              const score = calculateIcpScore(dev)
              const completed = dev.projects - dev.activeProjects
              return (
                <TableRow
                  key={dev.name}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectDeveloper(dev)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate max-w-[220px]">
                            {dev.name}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${originBadgeVariant(dev.originTag)}`}
                          >
                            {originLabel(dev.originTag)}
                          </span>
                          {dev.isNew && (
                            <Badge variant="outline" className="gap-1 text-[10px]">
                              <SparklesIcon className="size-2.5" />
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[240px]">
                          {dev.founder}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {dev.activeUnits.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className="text-muted-foreground">{completed}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="font-medium">{dev.projects}</span>
                  </TableCell>
                  <TableCell className="text-sm">{dev.priceRange}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold tabular-nums ${getScoreColor(score)}`}
                      >
                        {score}
                      </span>
                      <div className="relative h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all ${getScoreProgressColor(score)}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}
