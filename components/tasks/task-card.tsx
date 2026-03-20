"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon, GripVerticalIcon } from "lucide-react"
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
      className={`group relative rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-muted/50 transition-colors ${isDragging ? "opacity-40" : ""} ${overlay ? "shadow-lg rotate-2 scale-105 opacity-90" : ""}`}
    >
      {/* Drag handle — left grip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-5 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-40 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon className="size-3 text-muted-foreground" />
      </div>

      {/* Card content — clickable */}
      <div
        className="px-2.5 pl-5 py-1 cursor-pointer space-y-1"
        onClick={() => onClick(task)}
      >
        <p className="text-[13px] font-medium leading-snug">{task.title}</p>

        {task.description && (
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">{task.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-1">
          {priority && (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0 text-[10px] font-medium ${priority.bg} ${priority.text}`}
            >
              <span className={`size-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
          )}
          <Badge variant="outline" className="text-[10px] px-1 py-0">
            W{task.wave}
          </Badge>
          <Badge variant="secondary" className="text-[10px] px-1 py-0">
            {TASK_EFFORTS[task.effort]}
          </Badge>
          {task.segment && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0 capitalize">
              {task.segment}
            </Badge>
          )}
          {task.comment && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground ml-auto">
              <MessageSquareIcon className="size-3" />
            </span>
          )}
        </div>

        {task.comment && (
          <p className="text-[10px] text-muted-foreground/70 line-clamp-1 italic leading-tight">{task.comment}</p>
        )}
      </div>
    </div>
  )
}
