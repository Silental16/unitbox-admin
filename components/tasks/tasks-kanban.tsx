"use client"

import { useCallback, useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  pointerWithin,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type CollisionDetection,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
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
  const { setNodeRef, isOver } = useDroppable({ id: `column-${status.value}` })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-1 rounded-lg p-2 min-h-[300px] transition-all duration-200 ${isOver ? "bg-primary/8 ring-2 ring-primary/30 ring-inset" : "bg-muted/30"}`}
    >
      <div className="flex items-center gap-2 px-1 py-1 mb-1">
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
      {tasks.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground/50 py-8">
          Drop here
        </div>
      )}
    </div>
  )
}

// Custom collision detection: prefer droppable columns, fall back to closest center
const customCollision: CollisionDetection = (args) => {
  // First try pointer-within for columns
  const pointerCollisions = pointerWithin(args)
  if (pointerCollisions.length > 0) {
    // Prefer column droppables
    const columnHit = pointerCollisions.find((c) => String(c.id).startsWith("column-"))
    if (columnHit) return [columnHit]
    return pointerCollisions
  }
  // Fallback to rect intersection
  const rectCollisions = rectIntersection(args)
  if (rectCollisions.length > 0) return rectCollisions
  // Final fallback
  return closestCenter(args)
}

export function TasksKanban({
  tasks,
  onSelectTask,
  onStatusChange,
}: TasksKanbanProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
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
      const overId = String(over.id)

      // Dropped over a column droppable (column-backlog, column-todo, etc.)
      if (overId.startsWith("column-")) {
        const newStatus = overId.replace("column-", "") as TaskStatus
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== newStatus) {
          onStatusChange(taskId, newStatus)
        }
        return
      }

      // Dropped over another card — use that card's status
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollision}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <TaskCard task={activeTask} onClick={() => {}} overlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
