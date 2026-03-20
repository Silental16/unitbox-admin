"use client"

import { useCallback } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { useState } from "react"
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

function DroppableColumn({
  status,
  tasks,
  onSelectTask,
}: {
  status: (typeof TASK_STATUSES)[number]
  tasks: Task[]
  onSelectTask: (task: Task) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status.value })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-1.5 rounded-lg p-2 min-h-[200px] transition-colors ${isOver ? "bg-muted/60" : "bg-muted/30"}`}
    >
      <div className="flex items-center gap-2 px-1 py-1">
        <span className={`size-2 rounded-full ${status.dot}`} />
        <span className="text-xs font-medium">{status.label}</span>
        <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 tabular-nums">
          {tasks.length}
        </Badge>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onSelectTask} />
        ))}
      </SortableContext>
    </div>
  )
}

export function TasksKanban({
  tasks,
  onSelectTask,
  onStatusChange,
}: TasksKanbanProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const task = (event.active.data.current as { task: Task } | undefined)?.task
    if (task) setActiveTask(task)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null)
      const { active, over } = event
      if (!over) return

      const taskId = active.id as string
      const overId = over.id as string

      // Check if dropped over a column
      const isColumn = TASK_STATUSES.some((s) => s.value === overId)
      if (isColumn) {
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== overId) {
          onStatusChange(taskId, overId as TaskStatus)
        }
        return
      }

      // Dropped over another card — find its column
      const overTask = tasks.find((t) => t.id === overId)
      if (overTask) {
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== overTask.status) {
          onStatusChange(taskId, overTask.status)
        }
      }
    },
    [tasks, onStatusChange]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const taskId = active.id as string
      const overId = over.id as string

      const isColumn = TASK_STATUSES.some((s) => s.value === overId)
      if (isColumn) {
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== overId) {
          onStatusChange(taskId, overId as TaskStatus)
        }
      }
    },
    [tasks, onStatusChange]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 min-w-[480px]">
          {TASK_STATUSES.map((status) => {
            const columnTasks = tasks
              .filter((t) => t.status === status.value)
              .sort(sortByPriorityThenOrder)
            return (
              <DroppableColumn
                key={status.value}
                status={status}
                tasks={columnTasks}
                onSelectTask={onSelectTask}
              />
            )
          })}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80 rotate-2 scale-105">
            <TaskCard task={activeTask} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
