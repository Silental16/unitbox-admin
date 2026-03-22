import { getCatalogProjects } from "@/lib/data/queries"
import { ProjectsClient } from "@/components/projects/projects-client"

export default async function ProjectsPage() {
  const projects = await getCatalogProjects()
  return <ProjectsClient projects={projects} />
}
