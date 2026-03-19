import { createClient } from "@/lib/supabase/server"
import { mapRowToDeveloper, type Developer } from "./developers"
import { mapRowToCompetitor, type Competitor } from "./competitors"

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
