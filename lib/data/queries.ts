import { createClient } from "@/lib/supabase/server"
import { mapRowToDeveloper, type Developer } from "./developers"
import { mapRowToCompetitor, type Competitor } from "./competitors"
import { mapRowToTask, type Task } from "./tasks"

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
