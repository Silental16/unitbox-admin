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
import type { ChainLink, ThreatLevel } from "@/lib/data/competitors"

export type ThreatFilter = "all" | ThreatLevel
export type ChainFilter = "all" | ChainLink
export type SortColumn = "name" | "threatLevel" | "sizeSignal"
export type SortOption = { column: SortColumn; direction: "asc" | "desc" }

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  threatFilter: ThreatFilter
  onThreatFilterChange: (value: ThreatFilter) => void
  chainFilter: ChainFilter
  onChainFilterChange: (value: ChainFilter) => void
}

const CHAIN_LINK_LABELS: Record<ChainLink, string> = {
  developer: "Developer Tools",
  agent: "Agent Tools",
  buyer: "Buyer-Facing",
  developer_agent: "Dev+Agent",
  agent_buyer: "Agent+Buyer",
  full_stack: "Full Stack",
}

export function FilterBar({
  search,
  onSearchChange,
  threatFilter,
  onThreatFilterChange,
  chainFilter,
  onChainFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, URL..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={threatFilter} onValueChange={(v) => onThreatFilterChange(v as ThreatFilter)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Угроза" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">Все уровни</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={chainFilter} onValueChange={(v) => onChainFilterChange(v as ChainFilter)}>
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">Все типы</SelectItem>
            {(Object.entries(CHAIN_LINK_LABELS) as [ChainLink, string][]).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
