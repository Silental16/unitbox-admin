export type ProjectStatus = "presale" | "building" | "completed"

export type ResearchStatus = "not_started" | "outdated" | "ready" | "completed"

export type SalesStatus = "lead" | "intro_sent" | "meeting_done" | "offer_sent" | "client" | "declined"

export const SALES_STATUSES: { value: SalesStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "lead", label: "Lead", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "intro_sent", label: "Intro Sent", dot: "bg-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  { value: "meeting_done", label: "Meeting Done", dot: "bg-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  { value: "offer_sent", label: "Offer Sent", dot: "bg-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400" },
  { value: "client", label: "Client", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
  { value: "declined", label: "Declined", dot: "bg-red-500", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
]

export interface DeveloperProject {
  name: string
  location: string
  type: string
  units: string
  price: string
  status: ProjectStatus
  url?: string
  completion?: string
  mapUrl?: string
  description?: string
  notes?: string
  roi?: string
}

export interface Developer {
  id: string
  name: string
  origin: string
  originTag: string
  founder: string
  website: string
  instagram: string
  whatsapp: string
  email: string
  projects: number
  activeProjects: number
  activeUnits: number
  priceRange: string
  hasAgent: boolean
  aum: string
  isNew: boolean
  projectList: DeveloperProject[]
  contacts: Record<string, string>
  pitch: string
  researchStatus: ResearchStatus
  researchedAt: string | null
  salesStatus: SalesStatus
  languages: string[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToDeveloper(row: Record<string, any>): Developer {
  return {
    id: row.id as string,
    name: row.name as string,
    origin: (row.origin ?? "") as string,
    originTag: (row.origin_tag ?? "int") as string,
    founder: (row.founder ?? "") as string,
    website: (row.website ?? "") as string,
    instagram: (row.instagram ?? "") as string,
    whatsapp: (row.whatsapp ?? "") as string,
    email: (row.email ?? "") as string,
    projects: (row.projects ?? 0) as number,
    activeProjects: (row.active_projects ?? 0) as number,
    activeUnits: (row.active_units ?? 0) as number,
    priceRange: (row.price_range ?? "") as string,
    hasAgent: (row.has_agent ?? false) as boolean,
    aum: (row.aum ?? "") as string,
    isNew: (row.is_new ?? false) as boolean,
    projectList: (row.project_list ?? []) as DeveloperProject[],
    contacts: (row.contacts ?? {}) as Record<string, string>,
    pitch: (row.pitch ?? "") as string,
    researchStatus: (row.research_status ?? "not_started") as ResearchStatus,
    researchedAt: (row.researched_at ?? null) as string | null,
    salesStatus: (row.sales_status ?? "lead") as SalesStatus,
    languages: (row.languages ?? []) as string[],
  }
}
