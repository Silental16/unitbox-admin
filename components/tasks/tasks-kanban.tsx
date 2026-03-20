"use client"

import { Badge } from "@/components/ui/badge"
import type { Task, TaskStatus, TaskPriority } from "@/lib/data/tasks"
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/data/tasks"
import { TaskCard } from "@/components/tasks/task-card"

interface TasksKanbanProps {
  tasks: Task[]
  onSelectTask: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onPriorityChange: (taskId: string, priority: TaskPriority) => void
}

function sortByPriorityThenOrder(a: Task, b: Task): number {
  const priorityOrder = TASK_PRIORITIES.map((p) => p.value)
  const ai = priorityOrder.indexOf(a.priority)
  const bi = priorityOrder.indexOf(b.priority)
  if (ai !== bi) return ai - bi
  return a.order - b.order
}

export function TasksKanban({
  tasks,
  onSelectTask,
}: TasksKanbanProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 min-w-[480px]">
        {TASK_STATUSES.map((status) => {
          const columnTasks = tasks
            .filter((t) => t.status === status.value)
            .sort(sortByPriorityThenOrder)
          return (
            <div key={status.value} className="flex flex-col gap-2 bg-muted/30 rounded-lg p-2">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <span className={`size-2 rounded-full ${status.dot}`} />
                <span className="text-sm font-medium">{status.label}</span>
                <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 tabular-nums">
                  {columnTasks.length}
                </Badge>
              </div>
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onClick={onSelectTask} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
