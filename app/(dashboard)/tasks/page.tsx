import { getTasks } from "@/lib/data/queries"
import { TasksClient } from "@/components/tasks/tasks-client"

export default async function TasksPage() {
  const tasks = await getTasks()
  return <TasksClient tasks={tasks} />
}
