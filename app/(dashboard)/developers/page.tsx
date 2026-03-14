import { getDevelopers } from "@/lib/data/queries"
import { DevelopersClient } from "@/components/developers/developers-client"

export default async function DevelopersPage() {
  const developers = await getDevelopers()
  return <DevelopersClient developers={developers} />
}
