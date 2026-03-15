"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { SalesStatus } from "@/lib/data/developers"
import { SALES_STATUSES } from "@/lib/data/developers"

export type OriginFilter = "all" | "eu" | "ru" | "au" | "int"
export type AgentFilter = "all" | "has-agent" | "no-agent"
export type ScaleFilter = "all" | "large" | "medium" | "small"
export type ResearchFilter = "all" | "not_started" | "outdated" | "ready" | "completed"
export type SortColumn = "activeUnits" | "icpScore" | "name" | "projects"
export type SortOption = { column: SortColumn; direction: "asc" | "desc" }

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  origin: OriginFilter
  onOriginChange: (value: OriginFilter) => void
  agent: AgentFilter
  onAgentChange: (value: AgentFilter) => void
  scale: ScaleFilter
  onScaleChange: (value: ScaleFilter) => void
  research: ResearchFilter
  onResearchChange: (value: ResearchFilter) => void
  salesFilter: SalesStatus[]
  onSalesFilterChange: (value: SalesStatus[]) => void
}

export function FilterBar({
  search,
  onSearchChange,
  origin,
  onOriginChange,
  agent,
  onAgentChange,
  scale,
  onScaleChange,
  research,
  onResearchChange,
  salesFilter,
  onSalesFilterChange,
}: FilterBarProps) {
  const toggleSalesStatus = (status: SalesStatus) => {
    if (salesFilter.includes(status)) {
      onSalesFilterChange(salesFilter.filter((s) => s !== status))
    } else {
      onSalesFilterChange([...salesFilter, status])
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search developers, founders..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={origin} onValueChange={(v) => onOriginChange(v as OriginFilter)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Origin" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">All Origins</SelectItem>
            <SelectItem value="eu">European</SelectItem>
            <SelectItem value="ru">RU / CIS</SelectItem>
            <SelectItem value="au">Australian</SelectItem>
            <SelectItem value="int">International</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Sales Status — multi-select */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 text-sm font-normal">
            {salesFilter.length === 0
              ? "All Statuses"
              : salesFilter.length === 1
                ? SALES_STATUSES.find((s) => s.value === salesFilter[0])?.label
                : `${salesFilter.length} statuses`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {SALES_STATUSES.map((s) => (
            <DropdownMenuCheckboxItem
              key={s.value}
              checked={salesFilter.includes(s.value)}
              onCheckedChange={() => toggleSalesStatus(s.value)}
              onSelect={(e) => e.preventDefault()}
            >
              <span className={`size-1.5 rounded-full ${s.dot}`} />
              {s.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Select value={agent} onValueChange={(v) => onAgentChange(v as AgentFilter)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Agent" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="has-agent">Has Agent Program</SelectItem>
            <SelectItem value="no-agent">No Agent Program</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={scale} onValueChange={(v) => onScaleChange(v as ScaleFilter)}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Scale" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="large">Large (100+)</SelectItem>
            <SelectItem value="medium">Medium (20-100)</SelectItem>
            <SelectItem value="small">Small (&lt;20)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={research} onValueChange={(v) => onResearchChange(v as ResearchFilter)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Research" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">All Research</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="outdated">Outdated</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Done</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
