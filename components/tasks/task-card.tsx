"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon } from "lucide-react"
import type { Task } from "@/lib/data/tasks"
import { TASK_PRIORITIES, TASK_EFFORTS } from "@/lib/data/tasks"

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priority = TASK_PRIORITIES.find((p) => p.value === task.priority)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-colors ${isDragging ? "opacity-50 shadow-lg z-50" : ""}`}
      onClick={() => onClick(task)}
      {...attributes}
      {...listeners}
    >
      <CardContent className="px-2.5 py-2 space-y-1.5">
        <p className="text-[13px] font-medium leading-snug">{task.title}</p>
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
      </CardContent>
    </Card>
  )
}
