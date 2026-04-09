import { getFlows } from "@/lib/data/queries"
import { FlowsClient } from "@/components/flows/flows-client"
import { createClient } from "@/lib/supabase/server"

export default async function FlowsPage() {
  const flows = await getFlows()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <FlowsClient flows={flows} userId={user?.id ?? ""} />
}
