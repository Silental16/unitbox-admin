"use client"

import React from "react"
import { ArrowDownIcon, ArrowUpIcon, MessageSquareIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Competitor, CompetitorResearchStatus, ThreatLevel, ChainLink } from "@/lib/data/competitors"
import type { SortOption, SortColumn } from "@/components/competitors/filter-bar"

interface CompetitorsTableProps {
  competitors: Competitor[]
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onSelectCompetitor: (competitor: Competitor) => void
  onResearchStatusChange: (competitorId: string, status: CompetitorResearchStatus) => void
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

const THREAT_LEVEL_CONFIG: Record<ThreatLevel, { label: string; bg: string; text: string }> = {
  high: { label: "HIGH", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
  medium: { label: "MEDIUM", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" },
  low: { label: "LOW", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300" },
}

const CHAIN_LINK_LABELS: Record<ChainLink, string> = {
  developer: "Developer",
  agent: "Agent",
  buyer: "Buyer",
  developer_agent: "Dev+Agent",
  agent_buyer: "Agent+Buyer",
  full_stack: "Full Stack",
}

const RESEARCH_STATUS_CONFIG: Record<CompetitorResearchStatus, { label: string; dot: string; bg: string; text: string }> = {
  not_started: { label: "Не начато", dot: "bg-slate-300 dark:bg-slate-600", bg: "bg-muted", text: "text-muted-foreground" },
  in_progress: { label: "В процессе", dot: "bg-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  completed: { label: "Готово", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
}

function ResearchStatusSelect({ status, onChange }: { status: CompetitorResearchStatus; onChange: (v: CompetitorResearchStatus) => void }) {
  const config = RESEARCH_STATUS_CONFIG[status]
  return (
    <Select value={status} onValueChange={(v) => onChange(v as CompetitorResearchStatus)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {(Object.entries(RESEARCH_STATUS_CONFIG) as [CompetitorResearchStatus, typeof config][]).map(([key, cfg]) => (
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

export function CompetitorsTable({
  competitors,
  sort,
  onSortChange,
  onSelectCompetitor,
  onResearchStatusChange,
}: CompetitorsTableProps) {
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
                Конкурент
                <SortIcon column="name" current={sort} />
              </span>
            </TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Гео</TableHead>
            <TableHead>Бизнес-модель</TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("threatLevel", sort))}
            >
              <span className="inline-flex items-center gap-1">
                Угроза
                <SortIcon column="threatLevel" current={sort} />
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSortChange(toggleSort("sizeSignal", sort))}
            >
              <span className="inline-flex items-center gap-1">
                Масштаб
                <SortIcon column="sizeSignal" current={sort} />
              </span>
            </TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        {competitors.map((comp) => {
          const threat = THREAT_LEVEL_CONFIG[comp.threatLevel]
          return (
            <tbody
              key={comp.id}
              className="group cursor-pointer [&>tr]:border-b-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
              onClick={() => onSelectCompetitor(comp)}
            >
              <tr className="group-hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="min-w-0">
                    <span className="font-medium truncate max-w-[220px] block">
                      {comp.name}
                    </span>
                    {comp.url && (
                      <a
                        href={comp.url.startsWith("http") ? comp.url : `https://${comp.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline truncate max-w-[240px] block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {comp.url}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {CHAIN_LINK_LABELS[comp.chainLink]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{comp.geo}</TableCell>
                <TableCell className="text-sm max-w-[160px] truncate">{comp.businessModel}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${threat.bg} ${threat.text}`}>
                    {threat.label}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{comp.sizeSignal}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <ResearchStatusSelect
                    status={comp.researchStatus}
                    onChange={(v) => onResearchStatusChange(comp.id, v)}
                  />
                </TableCell>
              </tr>
              {comp.notes && (
                <tr className="group-hover:bg-muted/50 transition-colors">
                  <td colSpan={7} className="px-4 pt-0 pb-3">
                    <span className="inline-flex items-start gap-1.5 text-[11px] text-muted-foreground bg-muted/80 rounded-md px-2.5 py-1 leading-snug">
                      <MessageSquareIcon className="size-3 shrink-0 mt-px" />
                      {comp.notes}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          )
        })}
      </Table>
    </div>
  )
}
