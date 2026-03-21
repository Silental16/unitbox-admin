import { getTasks } from "@/lib/data/queries"
import { TasksClient } from "@/components/tasks/tasks-client"
import { createClient } from "@/lib/supabase/server"

export default async function TasksPage() {
  const tasks = await getTasks()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const currentUser = user ? {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name ?? user.email ?? "",
  } : null

  return <TasksClient tasks={tasks} currentUser={currentUser} />
}
