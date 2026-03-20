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
  type DragOverEvent,
  type CollisionDetection,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
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
  onReorder: (tasks: Task[]) => void
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
      className={`flex flex-col gap-1 rounded-lg p-2 min-h-[300px] transition-colors duration-150 ${isOver ? "bg-muted/60" : "bg-muted/30"}`}
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
        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground/40 py-8">
          Drop here
        </div>
      )}
    </div>
  )
}

// Custom collision: prefer cards (for reorder), then columns (for cross-column + empty)
const customCollision: CollisionDetection = (args) => {
  // 1. Try closest center — finds cards for reordering
  const centerCollisions = closestCenter(args)
  const cardHits = centerCollisions.filter((c) => !String(c.id).startsWith("column-"))
  if (cardHits.length > 0) return cardHits

  // 2. No cards found — find which column the pointer is over
  //    Use rectIntersection (more reliable than pointerWithin for large areas)
  const allCollisions = rectIntersection(args)
  const columnHits = allCollisions.filter((c) => String(c.id).startsWith("column-"))
  if (columnHits.length > 0) return [columnHits[0]]

  // 3. Last resort — pointerWithin
  const pointerHits = pointerWithin(args)
  if (pointerHits.length > 0) return pointerHits

  return centerCollisions
}

function findColumnForTask(taskId: string, tasks: Task[]): TaskStatus | null {
  const task = tasks.find((t) => t.id === taskId)
  return task?.status ?? null
}

export function TasksKanban({
  tasks,
  onSelectTask,
  onStatusChange,
  onReorder,
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

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = String(over.id)

      // If over a column droppable, change status
      if (overId.startsWith("column-")) {
        const newStatus = overId.replace("column-", "") as TaskStatus
        const task = tasks.find((t) => t.id === activeId)
        if (task && task.status !== newStatus) {
          onStatusChange(activeId, newStatus)
        }
        return
      }

      // If over another card in a different column, move to that column
      const overTask = tasks.find((t) => t.id === overId)
      const activeTaskObj = tasks.find((t) => t.id === activeId)
      if (overTask && activeTaskObj && activeTaskObj.status !== overTask.status) {
        onStatusChange(activeId, overTask.status)
      }
    },
    [tasks, onStatusChange]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null)
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = String(over.id)

      // If dropped over a column, status already handled in dragOver
      if (overId.startsWith("column-")) return

      // Reorder within same column
      const activeTaskObj = tasks.find((t) => t.id === activeId)
      const overTaskObj = tasks.find((t) => t.id === overId)
      if (!activeTaskObj || !overTaskObj) return
      if (activeTaskObj.status !== overTaskObj.status) return

      // Same column — reorder
      const columnTasks = tasks
        .filter((t) => t.status === activeTaskObj.status)
        .sort((a, b) => a.order - b.order)

      const oldIndex = columnTasks.findIndex((t) => t.id === activeId)
      const newIndex = columnTasks.findIndex((t) => t.id === overId)
      if (oldIndex === newIndex) return

      const reordered = arrayMove(columnTasks, oldIndex, newIndex)
      // Update order values
      const updatedTasks = tasks.map((t) => {
        const idx = reordered.findIndex((r) => r.id === t.id)
        if (idx !== -1) return { ...t, order: idx }
        return t
      })
      onReorder(updatedTasks)
    },
    [tasks, onReorder]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 min-w-[480px]">
          {TASK_STATUSES.map((status) => {
            const columnTasks = tasks
              .filter((t) => t.status === status.value)
              .sort((a, b) => a.order - b.order)
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
