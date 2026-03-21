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
import type { TaskStatus, TaskPriority, TaskStage } from "@/lib/data/tasks"
import { TASK_STATUSES, TASK_PRIORITIES, TASK_STAGES } from "@/lib/data/tasks"

export type StatusFilter = "all" | TaskStatus
export type PriorityFilter = "all" | TaskPriority
export type WaveFilter = "all" | "0" | "1" | "2" | "3" | "4"
export type StageFilter = "all" | TaskStage

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  priorityFilter: PriorityFilter
  onPriorityChange: (value: PriorityFilter) => void
  waveFilter: WaveFilter
  onWaveChange: (value: WaveFilter) => void
  stageFilter: StageFilter
  onStageChange: (value: StageFilter) => void
}

export function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  waveFilter,
  onWaveChange,
  stageFilter,
  onStageChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-[280px]">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
          <SelectTrigger className="w-[120px] sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              {TASK_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => onPriorityChange(v as PriorityFilter)}>
          <SelectTrigger className="w-[110px] sm:w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectGroup>
              <SelectItem value="all">All Priorities</SelectItem>
              {TASK_PRIORITIES.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${p.dot}`} />
                    {p.label}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={waveFilter} onValueChange={(v) => onWaveChange(v as WaveFilter)}>
          <SelectTrigger className="w-[100px] sm:w-[120px]">
            <SelectValue placeholder="Wave" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectGroup>
              <SelectItem value="all">All Waves</SelectItem>
              <SelectItem value="0">Wave 0</SelectItem>
              <SelectItem value="1">Wave 1</SelectItem>
              <SelectItem value="2">Wave 2</SelectItem>
              <SelectItem value="3">Wave 3</SelectItem>
              <SelectItem value="4">Wave 4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={stageFilter} onValueChange={(v) => onStageChange(v as StageFilter)}>
          <SelectTrigger className="w-[120px] sm:w-[140px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectGroup>
              <SelectItem value="all">All Stages</SelectItem>
              {TASK_STAGES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
