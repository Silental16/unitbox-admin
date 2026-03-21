"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon } from "lucide-react"
import type { Task } from "@/lib/data/tasks"
import { TASK_PRIORITIES, TASK_EFFORTS } from "@/lib/data/tasks"

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
  overlay?: boolean
}

export function TaskCard({ task, onClick, overlay }: TaskCardProps) {
  const priority = TASK_PRIORITIES.find((p) => p.value === task.priority)
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
      className={`rounded-lg bg-card text-card-foreground cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-all touch-none ${isDragging ? "opacity-40" : ""} ${overlay ? "shadow-lg rotate-2 scale-105 opacity-90" : ""}`}
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
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0 text-[11px] font-medium ${priority.bg} ${priority.text}`}
            >
              <span className={`size-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
          )}
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
        </div>

        {task.comment && (
          <span className="inline-flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/80 rounded-md px-2.5 py-1 leading-snug">
            <MessageSquareIcon className="size-3 shrink-0 mt-px" />
            {task.comment}
          </span>
        )}
      </div>
    </div>
  )
}
