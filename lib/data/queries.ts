import { createClient } from "@/lib/supabase/server"
import { mapRowToDeveloper, type Developer } from "./developers"

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
