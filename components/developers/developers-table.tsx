"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
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
import type { Developer, ResearchStatus } from "@/lib/data/developers"
import { SALES_STATUSES } from "@/lib/data/developers"
import type { SortOption } from "@/components/developers/filter-bar"
import {
  calculateIcpScore,
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
    case "eu": return "EU"
    case "ru": return "RU"
    case "au": return "AU"
    default: return "INT"
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

const RESEARCH_STATUS_CONFIG: Record<ResearchStatus, { label: string; dot: string; bg: string; text: string }> = {
  not_started: { label: "Not Started", dot: "bg-slate-300 dark:bg-slate-600", bg: "bg-muted", text: "text-muted-foreground" },
  outdated: { label: "Outdated", dot: "bg-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  ready: { label: "Ready", dot: "bg-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  completed: { label: "Done", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
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

export function DevelopersTable({
  developers,
  sort,
  onSortChange,
  onSelectDeveloper,
  onResearchStatusChange,
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
              <TableHead>Research</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((dev) => {
              const score = calculateIcpScore(dev)
              const completed = dev.projects - dev.activeProjects
              const subscriber = isSubscriber(dev.name)
              return (
                <TableRow
                  key={dev.id}
                  className={`cursor-pointer hover:bg-muted/50 ${subscriber || dev.salesStatus === "client" ? "border-l-2 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" : ""}`}
                  onClick={() => onSelectDeveloper(dev)}
                >
                  <TableCell>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate max-w-[220px] ${subscriber ? "text-emerald-700 dark:text-emerald-400" : ""}`}>
                          {dev.name}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${originBadgeVariant(dev.originTag)}`}
                        >
                          {originLabel(dev.originTag)}
                        </span>
                        {dev.salesStatus && dev.salesStatus !== "lead" && (() => {
                          const s = SALES_STATUSES.find((st) => st.value === dev.salesStatus)
                          return s ? (
                            <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${s.bg} ${s.text}`}>
                              <span className={`size-1.5 rounded-full ${s.dot}`} />
                              {s.label}
                            </span>
                          ) : null
                        })()}
                      </div>
                      <p className="text-xs text-muted-foreground truncate max-w-[240px]">
                        {dev.founder}
                      </p>
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
                    <ResearchStatusSelect
                      status={dev.researchStatus}
                      onChange={(v) => onResearchStatusChange(dev.id, v)}
                    />
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
