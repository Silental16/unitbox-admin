"use client"

import React from "react"
import { ArrowDownIcon, ArrowUpIcon, MessageSquareIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import type { Developer, ResearchStatus, SalesStatus } from "@/lib/data/developers"
import { SALES_STATUSES } from "@/lib/data/developers"
import type { SortOption, SortColumn } from "@/components/developers/filter-bar"
import {
  calculateIcpScore,
  countActiveUnits,
  countActiveProjects,
  countCompletedProjects,
  getScoreColor,
  getScoreProgressColor,
} from "@/lib/data/scoring"

const SUBSCRIBERS = [
  "Alex Villas", "BREIG", "HQC", "NEXA", "Everville", "TEUS",
  "Sevensky", "MBM", "Embrace", "BigBaliGroup", "Remarc",
  "Bridge", "Magnum", "Big Waves", "Ecoinvest"
]

function isSubscriber(name: string): boolean {
  const lower = name.toLowerCase()
  return SUBSCRIBERS.some(s => lower.includes(s.toLowerCase()))
}

interface DevelopersTableProps {
  developers: Developer[]
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onSelectDeveloper: (developer: Developer) => void
  onResearchStatusChange: (developerId: string, status: ResearchStatus) => void
  onSalesStatusChange: (developerId: string, status: SalesStatus) => void
}

function toggleSort(column: SortColumn, current: SortOption, defaultDir: "asc" | "desc" = "desc"): SortOption {
  if (current.column === column) {
    return { column, direction: current.direction === "asc" ? "desc" : "asc" }
  }
  return { column, direction: defaultDir }
}

function originBadgeVariant(tag: string) {
  switch (tag) {
    case "eu":
      return "bg-muted text-foreground"
    case "ru":
      return "bg-muted text-foreground"
    case "au":
      return "bg-muted text-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function originLabel(tag: string) {
  switch (tag) {
    case "eu": return "EU"
    case "ru": return "RU"
    case "au": return "AU"
    default: return "INT"
  }
}

function SortIcon({ column, current }: { column: SortColumn; current: SortOption }) {
  if (column !== current.column) return null
  return current.direction === "asc" ? (
    <ArrowUpIcon className="size-3.5" />
  ) : (
    <ArrowDownIcon className="size-3.5" />
  )
}

const RESEARCH_STATUS_CONFIG: Record<ResearchStatus, { label: string; dot: string; bg: string; text: string }> = {
  not_started: { label: "Not Started", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
  outdated: { label: "Outdated", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
  ready: { label: "Ready", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  completed: { label: "Done", dot: "bg-emerald-500", bg: "bg-muted", text: "text-foreground" },
}

function ResearchStatusSelect({ status, onChange }: { status: ResearchStatus; onChange: (v: ResearchStatus) => void }) {
  const config = RESEARCH_STATUS_CONFIG[status]
  return (
    <Select value={status} onValueChange={(v) => onChange(v as ResearchStatus)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {(Object.entries(RESEARCH_STATUS_CONFIG) as [ResearchStatus, typeof config][]).map(([key, cfg]) => (
          <SelectItem key={key} value={key}>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const SALES_STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = Object.fromEntries(
  SALES_STATUSES.map((s) => [s.value, { label: s.label, dot: s.dot, bg: s.bg, text: s.text }])
)

function SalesStatusSelect({ status, onChange }: { status: SalesStatus; onChange: (v: SalesStatus) => void }) {
  const config = SALES_STATUS_CONFIG[status] ?? SALES_STATUS_CONFIG.lead
  return (
    <Select value={status} onValueChange={(v) => onChange(v as SalesStatus)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {SALES_STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function DevelopersTable({
  developers,
  sort,
  onSortChange,
  onSelectDeveloper,
  onResearchStatusChange,
  onSalesStatusChange,
}: DevelopersTableProps) {
  return (
    <TooltipProvider>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("name", sort, "asc"))}
              >
                <span className="inline-flex items-center gap-1">
                  Developer
                  <SortIcon column="name" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("activeUnits", sort))}
              >
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Units
                  <SortIcon column="activeUnits" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("projects", sort))}
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
                onClick={() => onSortChange(toggleSort("icpScore", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  ICP Score
                  <SortIcon column="icpScore" current={sort} />
                </span>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Research</TableHead>
            </TableRow>
          </TableHeader>
            {developers.map((dev) => {
              const score = calculateIcpScore(dev)
              const activeUnits = countActiveUnits(dev)
              const activeProj = countActiveProjects(dev)
              const completedProj = countCompletedProjects(dev)
              const totalProj = dev.projectList.length
              const subscriber = isSubscriber(dev.name)
              const highlight = subscriber || dev.salesStatus === "client" ? "border-l-2 border-l-primary/30 bg-muted/50" : ""
              return (
              <tbody
                key={dev.id}
                className={`group cursor-pointer [&>tr]:border-b-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border ${highlight}`}
                onClick={() => onSelectDeveloper(dev)}
              >
                <tr className="group-hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate max-w-[220px]`}>
                          {dev.name}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${originBadgeVariant(dev.originTag)}`}
                        >
                          {originLabel(dev.originTag)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate max-w-[240px]">
                        {dev.founder}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {activeUnits.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className="font-medium">{activeProj}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-muted-foreground">{totalProj}</span>
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">{dev.priceRange}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold tabular-nums ${getScoreColor(score)}`}>
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
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <SalesStatusSelect
                      status={dev.salesStatus}
                      onChange={(v) => onSalesStatusChange(dev.id, v)}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <ResearchStatusSelect
                      status={dev.researchStatus}
                      onChange={(v) => onResearchStatusChange(dev.id, v)}
                    />
                  </TableCell>
                </tr>
                {dev.comment && (
                  <tr className="group-hover:bg-muted/50 transition-colors">
                    <td colSpan={7} className="px-4 pt-0 pb-3">
                      <span className="inline-flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/80 rounded-md px-2.5 py-1 leading-snug">
                        <MessageSquareIcon className="size-3 shrink-0 mt-px" />
                        {dev.comment}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
              )
            })}
        </Table>
      </div>
    </TooltipProvider>
  )
}
