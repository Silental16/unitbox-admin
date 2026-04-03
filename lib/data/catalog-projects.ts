// Types, interfaces, and mappers for Catalog Projects Tracker

export type ProjectFillStatus = "pending" | "filling" | "filled" | "published" | "syncing" | "error" | "archived"

export type MaterialType = "drive_folder" | "document" | "presentation" | "spreadsheet" | "pdf" | "image" | "website" | "other"

export type MaterialCategory = "general" | "chess" | "financial_model" | "document_source"

export type ChangeSource = "ai_fill" | "sync" | "manual" | "cron"

export const FILL_STATUSES: { value: ProjectFillStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "pending", label: "Pending", dot: "bg-[rgb(166,166,174)]", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "filling", label: "Filling", dot: "bg-[rgb(245,158,11)]", bg: "bg-muted", text: "text-foreground" },
  { value: "filled", label: "Filled", dot: "bg-[rgb(16,185,129)]", bg: "bg-muted", text: "text-foreground" },
  { value: "published", label: "Published", dot: "bg-[rgb(139,92,246)]", bg: "bg-muted", text: "text-foreground" },
  { value: "syncing", label: "Syncing", dot: "bg-[rgb(59,130,246)]", bg: "bg-muted", text: "text-foreground" },
  { value: "error", label: "Error", dot: "bg-[rgb(239,68,68)]", bg: "bg-destructive/10", text: "text-destructive" },
  { value: "archived", label: "Archived", dot: "bg-[rgb(166,166,174)]", bg: "bg-muted", text: "text-muted-foreground" },
]

export const MATERIAL_TYPES: { value: MaterialType; label: string; icon: string }[] = [
  { value: "drive_folder", label: "Drive Folder", icon: "folder" },
  { value: "document", label: "Document", icon: "file-text" },
  { value: "presentation", label: "Presentation", icon: "presentation" },
  { value: "spreadsheet", label: "Spreadsheet", icon: "table" },
  { value: "pdf", label: "PDF", icon: "file" },
  { value: "image", label: "Image", icon: "image" },
  { value: "website", label: "Website", icon: "globe" },
  { value: "other", label: "Other", icon: "paperclip" },
]

export const CHANGE_SOURCES: { value: ChangeSource; label: string; dot: string; bg: string; text: string }[] = [
  { value: "ai_fill", label: "AI Fill", dot: "bg-purple-500", bg: "bg-muted", text: "text-foreground" },
  { value: "sync", label: "Sync", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "manual", label: "Manual", dot: "bg-slate-400", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "cron", label: "Cron", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
]

export interface CatalogProject {
  id: string
  catalogId: number
  name: string
  location: string
  status: ProjectFillStatus
  unitsCount: number
  unitTypesCount: number
  availableUnits: number
  totalUnits: number
  developerId: string | null
  developerName: string
  fillDate: string | null
  fillIterations: number
  fillCorrections: number
  rulesAdded: string[]
  queueScore: number | null
  notes: string
  sheetsUrl: string
  driveFolderUrl: string
  lastSyncAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectMaterial {
  id: string
  projectId: string
  type: MaterialType
  title: string
  url: string
  notes: string
  category: MaterialCategory
  subLabel: string | null
  createdAt: string
}

export interface ProjectChessSource {
  id: string
  projectId: string
  sheetsUrl: string
  sheetName: string
  columnMapping: Record<string, string>
  colorLegend: Record<string, string>
  parsingNotes: string
  lastSyncAt: string | null
  lastSyncDiff: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

export interface ProjectChangeEntry {
  id: string
  projectId: string
  source: ChangeSource
  action: string
  summary: string
  diff: Record<string, unknown>
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToCatalogProject(row: Record<string, any>): CatalogProject {
  return {
    id: row.id as string,
    catalogId: (row.catalog_id ?? 0) as number,
    name: (row.name ?? "") as string,
    location: (row.location ?? "") as string,
    status: (row.status ?? "pending") as ProjectFillStatus,
    unitsCount: (row.units_count ?? 0) as number,
    unitTypesCount: (row.unit_types_count ?? 0) as number,
    availableUnits: (row.available_units ?? 0) as number,
    totalUnits: (row.total_units ?? 0) as number,
    developerId: (row.developer_id ?? null) as string | null,
    developerName: (row.developer_name ?? "") as string,
    fillDate: (row.fill_date ?? null) as string | null,
    fillIterations: (row.fill_iterations ?? 0) as number,
    fillCorrections: (row.fill_corrections ?? 0) as number,
    rulesAdded: (row.rules_added ?? []) as string[],
    queueScore: (row.queue_score ?? null) as number | null,
    notes: (row.notes ?? "") as string,
    sheetsUrl: (row.sheets_url ?? "") as string,
    driveFolderUrl: (row.drive_folder_url ?? "") as string,
    lastSyncAt: (row.last_sync_at ?? null) as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToMaterial(row: Record<string, any>): ProjectMaterial {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    type: (row.type ?? "other") as MaterialType,
    title: (row.title ?? "") as string,
    url: (row.url ?? "") as string,
    notes: (row.notes ?? "") as string,
    category: (row.category ?? "general") as MaterialCategory,
    subLabel: (row.sub_label ?? null) as string | null,
    createdAt: row.created_at as string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToChessSource(row: Record<string, any>): ProjectChessSource {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    sheetsUrl: (row.sheets_url ?? "") as string,
    sheetName: (row.sheet_name ?? "") as string,
    columnMapping: (row.column_mapping ?? {}) as Record<string, string>,
    colorLegend: (row.color_legend ?? {}) as Record<string, string>,
    parsingNotes: (row.parsing_notes ?? "") as string,
    lastSyncAt: (row.last_sync_at ?? null) as string | null,
    lastSyncDiff: (row.last_sync_diff ?? null) as Record<string, unknown> | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToChangeEntry(row: Record<string, any>): ProjectChangeEntry {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    source: (row.source ?? "manual") as ChangeSource,
    action: (row.action ?? "") as string,
    summary: (row.summary ?? "") as string,
    diff: (row.diff ?? {}) as Record<string, unknown>,
    createdAt: row.created_at as string,
  }
}
