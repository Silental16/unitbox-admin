import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { FlowEditor } from "@/components/flows/flow-editor"

export default async function FlowEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: flow, error } = await supabase
    .from("flows")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !flow) notFound()

  return (
    <FlowEditor
      flowId={flow.id}
      flowName={flow.name}
      initialNodes={(flow.data as any)?.nodes ?? []}
      initialEdges={(flow.data as any)?.edges ?? []}
    />
  )
}
