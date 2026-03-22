import { createClient } from "@/lib/supabase/server"
import { mapRowToDeveloper, type Developer } from "./developers"
import { mapRowToCompetitor, type Competitor } from "./competitors"
import { mapRowToTask, type Task } from "./tasks"
import {
  mapRowToCatalogProject,
  mapRowToMaterial,
  mapRowToChessSource,
  mapRowToChangeEntry,
  type CatalogProject,
  type ProjectMaterial,
  type ProjectChessSource,
  type ProjectChangeEntry,
} from "./catalog-projects"

export async function getDevelopers(): Promise<Developer[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("developers")
    .select("*")
    .order("active_units", { ascending: false })

  if (error) {
    console.error("Failed to fetch developers:", error)
    return []
  }

  return (data ?? []).map(mapRowToDeveloper)
}

export async function getCompetitors(): Promise<Competitor[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("competitors")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch competitors:", error)
    return []
  }

  return (data ?? []).map(mapRowToCompetitor)
}

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("order", { ascending: true })

  if (error) {
    console.error("Failed to fetch tasks:", error)
    return []
  }

  return (data ?? []).map(mapRowToTask)
}

export async function getCatalogProjects(): Promise<CatalogProject[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("catalog_projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch catalog projects:", error)
    return []
  }

  return (data ?? []).map(mapRowToCatalogProject)
}

export async function getCatalogProjectDetails(projectId: string): Promise<{
  materials: ProjectMaterial[]
  chessSources: ProjectChessSource[]
  changeLog: ProjectChangeEntry[]
}> {
  const supabase = await createClient()

  const [materialsRes, chessRes, logRes] = await Promise.all([
    supabase
      .from("project_materials")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_chess_sources")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_change_log")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(50),
  ])

  return {
    materials: (materialsRes.data ?? []).map(mapRowToMaterial),
    chessSources: (chessRes.data ?? []).map(mapRowToChessSource),
    changeLog: (logRes.data ?? []).map(mapRowToChangeEntry),
  }
}
