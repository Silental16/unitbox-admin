export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done"
export type TaskPriority = "p0" | "p1" | "p2" | "p3"
export type TaskEffort = "xs" | "s" | "m" | "l" | "xl"
export type TaskSource = "audit" | "backlog" | "strategy"
export type AjtbdTier = "s" | "a" | "b" | "c"
export type TaskSegment = "agent" | "developer" | "investor" | "agency"
export type TaskStage = "concept" | "design" | "development"

export const TASK_STATUSES: { value: TaskStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "backlog", label: "Backlog", dot: "bg-slate-400", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "todo", label: "Todo", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "in_progress", label: "In Progress", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
  { value: "review", label: "Review", dot: "bg-purple-500", bg: "bg-muted", text: "text-foreground" },
  { value: "done", label: "Done", dot: "bg-emerald-500", bg: "bg-muted", text: "text-foreground" },
]

export const TASK_PRIORITIES: { value: TaskPriority; label: string; dot: string; bg: string; text: string }[] = [
  { value: "p0", label: "P0 Critical", dot: "bg-red-500", bg: "bg-destructive/10", text: "text-destructive" },
  { value: "p1", label: "P1 High", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
  { value: "p2", label: "P2 Medium", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "p3", label: "P3 Low", dot: "bg-slate-400", bg: "bg-muted", text: "text-muted-foreground" },
]

export const TASK_EFFORTS: Record<TaskEffort, string> = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L",
  xl: "XL",
}

export const TASK_SOURCES: Record<TaskSource, string> = {
  audit: "Audit",
  backlog: "Backlog",
  strategy: "Strategy",
}

export const AJTBD_TIERS: { value: AjtbdTier; label: string; bg: string; text: string }[] = [
  { value: "s", label: "S-tier", bg: "bg-muted", text: "text-foreground" },
  { value: "a", label: "A-tier", bg: "bg-muted", text: "text-foreground" },
  { value: "b", label: "B-tier", bg: "bg-muted", text: "text-foreground" },
  { value: "c", label: "C-tier", bg: "bg-muted", text: "text-muted-foreground" },
]

export const WAVE_LABELS: Record<number, string> = {
  0: "Wave 0: Foundation",
  1: "Wave 1: Agent Activation",
  2: "Wave 2: Investor Conversion",
  3: "Wave 3: Marketplace Growth",
  4: "Wave 4: Scale",
}

export const SEGMENT_LABELS: Record<TaskSegment, string> = {
  agent: "Agent",
  developer: "Developer",
  investor: "Investor",
  agency: "Agency",
}

export const TASK_STAGES: { value: TaskStage; label: string; dot: string; bg: string; text: string }[] = [
  { value: "concept", label: "Концепт", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "design", label: "Дизайн", dot: "bg-purple-500", bg: "bg-muted", text: "text-foreground" },
  { value: "development", label: "Разработка", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
]

export interface Task {
  id: string
  title: string
  description: string
  detailedDescription: string
  status: TaskStatus
  priority: TaskPriority
  wave: number
  effort: TaskEffort
  source: TaskSource
  jobsServed: string
  ajtbdTier: AjtbdTier | null
  segment: TaskSegment | null
  deadline: string | null
  assigneeId: string | null
  assigneeEmail: string | null
  assigneeName: string | null
  stage: TaskStage
  order: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface TaskUser {
  id: string
  email: string
  name: string
}

export type SortColumn = "title" | "priority" | "wave" | "effort" | "order"
export type SortOption = { column: SortColumn; direction: "asc" | "desc" }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToTask(row: Record<string, any>): Task {
  return {
    id: row.id as string,
    title: (row.title ?? "") as string,
    description: (row.description ?? "") as string,
    detailedDescription: (row.detailed_description ?? "") as string,
    status: (row.status ?? "backlog") as TaskStatus,
    priority: (row.priority ?? "p2") as TaskPriority,
    wave: (row.wave ?? 1) as number,
    effort: (row.effort ?? "m") as TaskEffort,
    source: (row.source ?? "audit") as TaskSource,
    jobsServed: (row.jobs_served ?? "") as string,
    ajtbdTier: (row.ajtbd_tier ?? null) as AjtbdTier | null,
    segment: (row.segment ?? null) as TaskSegment | null,
    deadline: (row.deadline ?? null) as string | null,
    assigneeId: (row.assignee_id ?? null) as string | null,
    assigneeEmail: (row.assignee_email ?? null) as string | null,
    assigneeName: (row.assignee_name ?? null) as string | null,
    stage: (row.stage ?? "concept") as TaskStage,
    order: (row.order ?? 0) as number,
    comment: (row.comment ?? "") as string,
    createdAt: (row.created_at ?? "") as string,
    updatedAt: (row.updated_at ?? "") as string,
  }
}
