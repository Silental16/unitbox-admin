import { getCompetitors } from "@/lib/data/queries"
import { CompetitorsClient } from "@/components/competitors/competitors-client"

export default async function CompetitorsPage() {
  const competitors = await getCompetitors()
  return <CompetitorsClient competitors={competitors} />
}
