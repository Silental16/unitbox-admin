export type ProjectStatus = "presale" | "building" | "completed"

export type ResearchStatus = "not_started" | "completed" | "outdated"

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
  }
}
