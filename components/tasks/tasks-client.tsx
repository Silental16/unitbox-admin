"use client"

import { useState, useMemo, useCallback } from "react"
import { ListIcon, LayoutGridIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import type { Task, TaskStatus, TaskPriority } from "@/lib/data/tasks"
import { TASK_PRIORITIES } from "@/lib/data/tasks"
import type { SortOption } from "@/lib/data/tasks"
import {
  FilterBar,
  type StatusFilter,
  type PriorityFilter,
  type WaveFilter,
} from "@/components/tasks/filter-bar"
import { TasksTable } from "@/components/tasks/tasks-table"
import { TasksKanban } from "@/components/tasks/tasks-kanban"
import { TaskSheet } from "@/components/tasks/task-sheet"

const EFFORT_ORDER: Record<string, number> = { xs: 0, s: 1, m: 2, l: 3, xl: 4 }

export function TasksClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [waveFilter, setWaveFilter] = useState<WaveFilter>("all")
  const [sort, setSort] = useState<SortOption>({ column: "order", direction: "asc" })
  const [view, setView] = useState<"list" | "kanban">("list")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleStatusChange = useCallback(async (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    )
    setSelectedTask((prev) => (prev?.id === taskId ? { ...prev, status: newStatus } : prev))
    const supabase = createClient()
    await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId)
  }, [])

  const handlePriorityChange = useCallback(async (taskId: string, newPriority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t))
    )
    setSelectedTask((prev) => (prev?.id === taskId ? { ...prev, priority: newPriority } : prev))
    const supabase = createClient()
    await supabase.from("tasks").update({ priority: newPriority }).eq("id", taskId)
  }, [])

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      result = result.filter((t) => t.priority === priorityFilter)
    }

    if (waveFilter !== "all") {
      result = result.filter((t) => t.wave === Number(waveFilter))
    }

    result.sort((a, b) => {
      const dir = sort.direction === "asc" ? 1 : -1
      switch (sort.column) {
        case "title":
          return a.title.localeCompare(b.title) * dir
        case "priority": {
          const priorityOrder = TASK_PRIORITIES.map((p) => p.value)
          return (priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)) * dir
        }
        case "wave":
          return (a.wave - b.wave) * dir
        case "effort":
          return ((EFFORT_ORDER[a.effort] ?? 2) - (EFFORT_ORDER[b.effort] ?? 2)) * dir
        case "order":
          return (a.order - b.order) * dir
        default:
          return 0
      }
    })

    return result
  }, [tasks, search, statusFilter, priorityFilter, waveFilter, sort])

  function handleSelectTask(task: Task) {
    setSelectedTask(task)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Platform Roadmap</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {tasks.length} features across 5 waves
          </p>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "kanban")}>
          <TabsList>
            <TabsTrigger value="list">
              <ListIcon className="size-4 mr-1.5" />
              <span className="hidden sm:inline">List</span>
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <LayoutGridIcon className="size-4 mr-1.5" />
              <span className="hidden sm:inline">Board</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          waveFilter={waveFilter}
          onWaveChange={setWaveFilter}
        />
      </div>

      {view === "list" ? (
        <TasksTable
          tasks={filteredTasks}
          sort={sort}
          onSortChange={setSort}
          onSelectTask={handleSelectTask}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
      ) : (
        <TasksKanban
          tasks={filteredTasks}
          onSelectTask={handleSelectTask}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
      )}

      <TaskSheet
        task={selectedTask}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
      />
    </div>
  )
}
