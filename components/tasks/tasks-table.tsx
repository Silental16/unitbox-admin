"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
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
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { Task, TaskStatus, TaskPriority, TaskStage } from "@/lib/data/tasks"
import { TASK_STATUSES, TASK_PRIORITIES, TASK_EFFORTS, TASK_STAGES } from "@/lib/data/tasks"
import type { SortOption, SortColumn } from "@/lib/data/tasks"

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })
}

interface TasksTableProps {
  tasks: Task[]
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onSelectTask: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onPriorityChange: (taskId: string, priority: TaskPriority) => void
  onStageChange: (taskId: string, stage: TaskStage) => void
}

function toggleSort(column: SortColumn, current: SortOption, defaultDir: "asc" | "desc" = "asc"): SortOption {
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

function StatusSelect({ status, onChange }: { status: TaskStatus; onChange: (v: TaskStatus) => void }) {
  const config = TASK_STATUSES.find((s) => s.value === status) ?? TASK_STATUSES[0]
  return (
    <Select value={status} onValueChange={(v) => onChange(v as TaskStatus)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {TASK_STATUSES.map((s) => (
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

function PrioritySelect({ priority, onChange }: { priority: TaskPriority; onChange: (v: TaskPriority) => void }) {
  const config = TASK_PRIORITIES.find((p) => p.value === priority) ?? TASK_PRIORITIES[2]
  return (
    <Select value={priority} onValueChange={(v) => onChange(v as TaskPriority)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {TASK_PRIORITIES.map((p) => (
          <SelectItem key={p.value} value={p.value}>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function StageSelect({ stage, onChange }: { stage: TaskStage; onChange: (v: TaskStage) => void }) {
  const config = TASK_STAGES.find((s) => s.value === stage) ?? TASK_STAGES[0]
  return (
    <Select value={stage} onValueChange={(v) => onChange(v as TaskStage)}>
      <SelectTrigger className="h-auto w-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
          <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} />
          {config.label}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {TASK_STAGES.map((s) => (
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

export function TasksTable({
  tasks,
  sort,
  onSortChange,
  onSelectTask,
  onStatusChange,
  onPriorityChange,
  onStageChange,
}: TasksTableProps) {
  return (
    <TooltipProvider>
      <div className="rounded-lg border overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[60px] cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("order", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  #
                  <SortIcon column="order" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("title", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Title
                  <SortIcon column="title" current={sort} />
                </span>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("priority", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Priority
                  <SortIcon column="priority" current={sort} />
                </span>
              </TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("wave", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Wave
                  <SortIcon column="wave" current={sort} />
                </span>
              </TableHead>
              <TableHead
                className="hidden md:table-cell cursor-pointer select-none"
                onClick={() => onSortChange(toggleSort("effort", sort))}
              >
                <span className="inline-flex items-center gap-1">
                  Effort
                  <SortIcon column="effort" current={sort} />
                </span>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Segment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const isOverdue = task.deadline && new Date(task.deadline) < new Date()
              return (
                <TableRow
                  key={task.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onSelectTask(task)}
                >
                  <TableCell className="tabular-nums text-muted-foreground">
                    {task.order}
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <span className="font-medium truncate max-w-[180px] sm:max-w-[250px] md:max-w-[350px] block">
                        {task.title}
                      </span>
                      {task.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[180px] sm:max-w-[250px] md:max-w-[350px]">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <StatusSelect
                      status={task.status}
                      onChange={(v) => onStatusChange(task.id, v)}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <PrioritySelect
                      priority={task.priority}
                      onChange={(v) => onPriorityChange(task.id, v)}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <StageSelect
                      stage={task.stage}
                      onChange={(v) => onStageChange(task.id, v)}
                    />
                  </TableCell>
                  <TableCell>
                    {task.deadline ? (
                      <span className={`text-xs tabular-nums whitespace-nowrap ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                        {formatDate(task.deadline)}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[11px] px-1.5 py-0 tabular-nums">
                      W{task.wave}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-[11px] px-1.5 py-0">
                      {TASK_EFFORTS[task.effort]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {task.segment && (
                      <Badge variant="secondary" className="text-[11px] px-1.5 py-0 capitalize">
                        {task.segment}
                      </Badge>
                    )}
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
