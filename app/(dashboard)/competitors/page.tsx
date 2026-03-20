import { redirect } from "next/navigation"
import { getUserRole } from "@/lib/data/roles"
import { getCompetitors } from "@/lib/data/queries"
import { CompetitorsClient } from "@/components/competitors/competitors-client"

export default async function CompetitorsPage() {
  const role = await getUserRole()
  if (role !== "admin") redirect("/developers")

  const competitors = await getCompetitors()
  return <CompetitorsClient competitors={competitors} />
}
