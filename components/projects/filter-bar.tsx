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
import type { ProjectFillStatus } from "@/lib/data/catalog-projects"

export type StatusFilter = "all" | ProjectFillStatus
export type SortColumn = "name" | "unitsCount" | "fillDate" | "catalogId" | "status" | "hasChess"
export type SortOption = { column: SortColumn; direction: "asc" | "desc" }

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (value: StatusFilter) => void
}

export function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-[300px]">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-[26px] bg-neutral-200/30 border-neutral-200"
        />
      </div>
      <Select value={statusFilter} onValueChange={(v) => onStatusFilterChange(v as StatusFilter)}>
        <SelectTrigger className="w-[140px] rounded-[26px] bg-neutral-200/30 border-neutral-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="filled">Filled</SelectItem>
            <SelectItem value="filling">Filling</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="syncing">Syncing</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
