"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/data/tasks"
import { TASK_PRIORITIES, TASK_EFFORTS } from "@/lib/data/tasks"

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priority = TASK_PRIORITIES.find((p) => p.value === task.priority)
  return (
    <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => onClick(task)}>
      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {priority && (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${priority.bg} ${priority.text}`}
            >
              <span className={`size-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
          )}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            W{task.wave}
          </Badge>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {TASK_EFFORTS[task.effort]}
          </Badge>
          {task.segment && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">
              {task.segment}
            </Badge>
          )}
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        )}
      </CardContent>
    </Card>
  )
}
