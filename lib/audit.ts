import { createClient } from "@/lib/supabase/client"

export async function logChange(
  developerId: string,
  field: string,
  oldValue: string | null,
  newValue: string
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email ?? "unknown"

  await supabase.from("audit_log").insert({
    developer_id: developerId,
    user_email: email,
    field,
    old_value: oldValue,
    new_value: newValue,
  })
}
