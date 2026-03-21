"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus, TaskPriority, TaskStage, TaskUser } from "@/lib/data/tasks"
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_EFFORTS,
  TASK_SOURCES,
  AJTBD_TIERS,
  TASK_STAGES,
} from "@/lib/data/tasks"

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })
}

const MIN_WIDTH = 320
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 500

interface TaskSheetProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onPriorityChange: (taskId: string, priority: TaskPriority) => void
  onCommentChange: (taskId: string, comment: string) => void
  onDeadlineChange: (taskId: string, deadline: string | null) => void
  onAssigneeChange: (taskId: string, user: { id: string; email: string; name: string } | null) => void
  onStageChange: (taskId: string, stage: TaskStage) => void
  currentUser: TaskUser | null
}

export function TaskSheet({
  task,
  open,
  onOpenChange,
  onStatusChange,
  onPriorityChange,
  onCommentChange,
  onDeadlineChange,
  onAssigneeChange,
  onStageChange,
  currentUser,
}: TaskSheetProps) {
  const [comment, setComment] = useState("")
  const commentTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    if (open) {
      setWidth(DEFAULT_WIDTH)
      setComment(task?.comment ?? "")
    }
  }, [open, task?.id])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    startX.current = e.clientX
    startWidth.current = width
  }, [width])

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startX.current - e.clientX
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  if (!task) return null

  const statusConfig = TASK_STATUSES.find((s) => s.value === task.status) ?? TASK_STATUSES[0]
  const priorityConfig = TASK_PRIORITIES.find((p) => p.value === task.priority) ?? TASK_PRIORITIES[2]
  const stageConfig = TASK_STAGES.find((s) => s.value === task.stage) ?? TASK_STAGES[0]
  const tierConfig = task.ajtbdTier ? AJTBD_TIERS.find((t) => t.value === task.ajtbdTier) : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className={`!max-w-none overflow-hidden p-0 flex flex-col w-full sm:w-auto ${dragging ? "select-none" : ""}`}
        style={{ width: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : width }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-3 -translate-x-1/2 cursor-col-resize z-[60] group"
        >
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors ${dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"}`} />
        </div>

        <ScrollArea className="flex-1 min-h-0 overscroll-contain">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 pr-12 sm:px-6 sm:pt-6 sm:pb-4 space-y-3">
            {/* Row 1: Title */}
            <SheetTitle className="text-lg">{task.title}</SheetTitle>

            {/* Row 2: Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Status Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${statusConfig.bg} ${statusConfig.text}`}>
                    <span className={`size-1.5 rounded-full shrink-0 ${statusConfig.dot}`} />
                    {statusConfig.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {TASK_STATUSES.map((s) => (
                    <DropdownMenuItem
                      key={s.value}
                      onClick={() => onStatusChange(task.id, s.value)}
                      className="gap-2"
                    >
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Priority Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${priorityConfig.bg} ${priorityConfig.text}`}>
                    <span className={`size-1.5 rounded-full shrink-0 ${priorityConfig.dot}`} />
                    {priorityConfig.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {TASK_PRIORITIES.map((p) => (
                    <DropdownMenuItem
                      key={p.value}
                      onClick={() => onPriorityChange(task.id, p.value)}
                      className="gap-2"
                    >
                      <span className={`size-1.5 rounded-full ${p.dot}`} />
                      {p.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Stage Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${stageConfig.bg} ${stageConfig.text}`}>
                    <span className={`size-1.5 rounded-full shrink-0 ${stageConfig.dot}`} />
                    {stageConfig.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {TASK_STAGES.map((s) => (
                    <DropdownMenuItem
                      key={s.value}
                      onClick={() => onStageChange(task.id, s.value)}
                      className="gap-2"
                    >
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Badge variant="outline" className="text-[11px] px-1.5 py-0">
                W{task.wave}
              </Badge>
              <Badge variant="secondary" className="text-[11px] px-1.5 py-0">
                {TASK_EFFORTS[task.effort]}
              </Badge>
              <Badge variant="secondary" className="text-[11px] px-1.5 py-0 capitalize">
                {TASK_SOURCES[task.source]}
              </Badge>
              {task.segment && (
                <Badge variant="secondary" className="text-[11px] px-1.5 py-0 capitalize">
                  {task.segment}
                </Badge>
              )}
            </div>

            {/* Row 3: Description */}
            {task.description && (
              <SheetDescription className="text-xs leading-relaxed">
                {task.description}
              </SheetDescription>
            )}
          </SheetHeader>

          <Separator />

          <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
            {/* Deadline & Assignee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Дедлайн</p>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className={cn("justify-start text-left font-normal", !task.deadline && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 size-4" />
                        {task.deadline ? formatDate(task.deadline) : "Выбрать дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={task.deadline ? new Date(task.deadline) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            onDeadlineChange(task.id, date.toISOString().split("T")[0])
                          }
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {task.deadline && (
                    <Button variant="ghost" size="icon-xs" onClick={() => onDeadlineChange(task.id, null)}>
                      <XIcon className="size-3" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Ответственный</p>
                {task.assigneeName ? (
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {task.assigneeName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm">{task.assigneeName}</span>
                    <Button variant="ghost" size="icon-xs" onClick={() => onAssigneeChange(task.id, null)}>
                      <XIcon className="size-3" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => currentUser && onAssigneeChange(task.id, currentUser)}>
                    Назначить на меня
                  </Button>
                )}
              </div>
            </div>

            {/* Details */}
            {task.detailedDescription && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Details</p>
                <div className="text-sm whitespace-pre-wrap leading-relaxed break-words overflow-hidden">
                  {task.detailedDescription}
                </div>
              </div>
            )}

            {/* AJTBD Analysis */}
            {task.jobsServed && (
              <Card size="sm">
                <CardHeader>
                  <CardTitle>AJTBD Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tierConfig && (
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-2">
                      <span className="text-sm text-muted-foreground">Tier</span>
                      <span>
                        <Badge className={`${tierConfig.bg} ${tierConfig.text}`}>
                          {tierConfig.label}
                        </Badge>
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Jobs Served</span>
                    <span className="text-sm">{task.jobsServed}</span>
                  </div>
                  {task.segment && (
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-2">
                      <span className="text-sm text-muted-foreground">Segment</span>
                      <span>
                        <Badge variant="secondary" className="capitalize">
                          {task.segment}
                        </Badge>
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Comments */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Комментарий</p>
              <Textarea
                value={comment}
                onChange={(e) => {
                  const val = e.target.value
                  setComment(val)
                  if (commentTimer.current) clearTimeout(commentTimer.current)
                  commentTimer.current = setTimeout(() => {
                    if (task) onCommentChange(task.id, val)
                  }, 800)
                }}
                placeholder="Добавить заметку..."
                className="min-h-[80px] text-sm resize-y break-all"
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
