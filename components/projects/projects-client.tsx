"use client"

import { useState, useMemo, useCallback } from "react"
import type { CatalogProject } from "@/lib/data/catalog-projects"
import type { Developer } from "@/lib/data/developers"
import { StatsBar } from "./stats-bar"
import { FilterBar, type StatusFilter, type SortOption } from "./filter-bar"
import { ProjectsTable } from "./projects-table"
import { ProjectSheet } from "./project-sheet"

export function ProjectsClient({
  projects: initialProjects,
  developers,
}: {
  projects: CatalogProject[]
  developers: Developer[]
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sort, setSort] = useState<SortOption>({ column: "fillDate", direction: "desc" })
  const [selectedProject, setSelectedProject] = useState<CatalogProject | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleProjectUpdate = useCallback((updated: CatalogProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setSelectedProject((prev) => (prev?.id === updated.id ? updated : prev))
  }, [])

  const handleProjectDelete = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
    setSelectedProject(null)
  }, [])

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developerName.toLowerCase().includes(q) ||
          String(p.catalogId).includes(q)
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter)
    }

    result.sort((a, b) => {
      const dir = sort.direction === "asc" ? 1 : -1
      switch (sort.column) {
        case "name":
          return a.name.localeCompare(b.name) * dir
        case "unitsCount":
          return (a.unitsCount - b.unitsCount) * dir
        case "fillDate": {
          const aDate = a.fillDate ? new Date(a.fillDate).getTime() : 0
          const bDate = b.fillDate ? new Date(b.fillDate).getTime() : 0
          return (aDate - bDate) * dir
        }
        case "catalogId":
          return (a.catalogId - b.catalogId) * dir
        case "status": {
          const statusOrder: Record<string, number> = { filled: 0, filling: 1, syncing: 2, pending: 3, error: 4 }
          return ((statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5)) * dir
        }
        case "hasChess": {
          const aHas = a.sheetsUrl ? 1 : 0
          const bHas = b.sheetsUrl ? 1 : 0
          return (aHas - bHas) * dir
        }
        default:
          return 0
      }
    })

    return result
  }, [projects, search, statusFilter, sort])

  function handleSelectProject(project: CatalogProject) {
    setSelectedProject(project)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Catalog Projects
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {projects.length} projects filled for developer 61. Track fills, materials, and sync history.
        </p>
      </div>

      <StatsBar projects={projects} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ProjectsTable
        projects={filteredProjects}
        sort={sort}
        onSortChange={setSort}
        onSelectProject={handleSelectProject}
      />

      <ProjectSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onProjectUpdate={handleProjectUpdate}
        onProjectDelete={handleProjectDelete}
        developers={developers}
      />
    </div>
  )
}
