import { getCatalogProjects, getDevelopers } from "@/lib/data/queries"
import { ProjectsClient } from "@/components/projects/projects-client"

export default async function ProjectsPage() {
  const [projects, developers] = await Promise.all([
    getCatalogProjects(),
    getDevelopers(),
  ])
  return <ProjectsClient projects={projects} developers={developers} />
}
