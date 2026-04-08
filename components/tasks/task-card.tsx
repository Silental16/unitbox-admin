"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon } from "lucide-react"
import type { Task } from "@/lib/data/tasks"
import { TASK_PRIORITIES, TASK_EFFORTS, TASK_STAGES } from "@/lib/data/tasks"

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
}

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
  overlay?: boolean
}

export function TaskCard({ task, onClick, overlay }: TaskCardProps) {
  const priority = TASK_PRIORITIES.find((p) => p.value === task.priority)
  const stageConfig = TASK_STAGES.find((s) => s.value === task.stage) ?? TASK_STAGES[0]
  const isOverdue = task.deadline && new Date(task.deadline) < new Date()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } })

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      }

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      data-slot="card"
      data-interactive
      className={`rounded-[var(--radius-card)] bg-card text-card-foreground overflow-hidden cursor-pointer active:cursor-grabbing hover:bg-muted/50 transition-all touch-none ${isDragging ? "opacity-40 cursor-grabbing" : ""} ${overlay ? "shadow-lg rotate-2 scale-105 opacity-90 cursor-grabbing" : ""}`}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Only open sheet if not dragging (PointerSensor distance=8 handles this)
        onClick(task)
      }}
    >
      <div className="px-2.5 py-2 space-y-1">
        <p className="text-sm font-medium leading-snug">{task.title}</p>

        {task.description && (
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">{task.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-1">
          {priority && (
            <span
              className={`inline-flex items-center gap-1 rounded-[var(--radius-menu-item)] px-1.5 py-0 text-[11px] font-medium ${priority.bg} ${priority.text}`}
            >
              <span className={`size-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-[var(--radius-menu-item)] px-1.5 py-0 text-[11px] font-medium ${stageConfig.bg} ${stageConfig.text}`}
          >
            <span className={`size-1.5 rounded-full ${stageConfig.dot}`} />
            {stageConfig.label}
          </span>
          <Badge variant="outline" className="text-[11px] px-1 py-0 tabular-nums">
            W{task.wave}
          </Badge>
          <Badge variant="secondary" className="text-[11px] px-1 py-0">
            {TASK_EFFORTS[task.effort]}
          </Badge>
          {task.segment && (
            <Badge variant="secondary" className="text-[11px] px-1 py-0 capitalize">
              {task.segment}
            </Badge>
          )}
          {task.deadline && (
            <span className={`text-[11px] tabular-nums ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
              {formatDate(task.deadline)}
            </span>
          )}
          {task.assigneeName && (
            <div className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium ml-auto" title={task.assigneeName}>
              {task.assigneeName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {task.comment && (
          <span className="inline-flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/80 rounded-[var(--radius-menu-item)] px-2.5 py-1 leading-snug break-all overflow-hidden max-w-full">
            <MessageSquareIcon className="size-3 shrink-0 mt-px" />
            <span className="break-words overflow-wrap-anywhere min-w-0">{task.comment}</span>
          </span>
        )}
      </div>
    </div>
  )
}
