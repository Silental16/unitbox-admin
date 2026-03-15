"use client"

import { useState, useMemo, useCallback } from "react"
import type { Developer, ResearchStatus, SalesStatus } from "@/lib/data/developers"
import { calculateIcpScore } from "@/lib/data/scoring"
import { createClient } from "@/lib/supabase/client"
import {
  FilterBar,
  type OriginFilter,
  type AgentFilter,
  type ScaleFilter,
  type ResearchFilter,
  type SortOption,
} from "@/components/developers/filter-bar"
import { DevelopersTable } from "@/components/developers/developers-table"
import { DeveloperSheet } from "@/components/developers/developer-sheet"

export function DevelopersClient({
  developers: initialDevelopers,
}: {
  developers: Developer[]
}) {
  const [developers, setDevelopers] = useState(initialDevelopers)
  const [search, setSearch] = useState("")
  const [origin, setOrigin] = useState<OriginFilter>("all")
  const [agent, setAgent] = useState<AgentFilter>("all")
  const [scale, setScale] = useState<ScaleFilter>("all")
  const [research, setResearch] = useState<ResearchFilter>("all")
  const [salesFilter, setSalesFilter] = useState<SalesStatus[]>([])
  const [sort, setSort] = useState<SortOption>({ column: "activeUnits", direction: "desc" })
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleResearchStatusChange = useCallback(async (developerId: string, status: ResearchStatus) => {
    setDevelopers((prev) =>
      prev.map((d) => d.id === developerId ? { ...d, researchStatus: status } : d)
    )
    setSelectedDeveloper((prev) => prev?.id === developerId ? { ...prev, researchStatus: status } : prev)
    const supabase = createClient()
    await supabase.from("developers").update({ research_status: status }).eq("id", developerId)
  }, [])

  const handleSalesStatusChange = useCallback(async (developerId: string, status: SalesStatus) => {
    setDevelopers((prev) =>
      prev.map((d) => d.id === developerId ? { ...d, salesStatus: status } : d)
    )
    setSelectedDeveloper((prev) => prev?.id === developerId ? { ...prev, salesStatus: status } : prev)
    const supabase = createClient()
    await supabase.from("developers").update({ sales_status: status }).eq("id", developerId)
  }, [])


  const filteredDevelopers = useMemo(() => {
    let result = [...developers]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.founder.toLowerCase().includes(q) ||
          d.origin.toLowerCase().includes(q) ||
          d.projectList.some((p) => p.name.toLowerCase().includes(q))
      )
    }

    if (origin !== "all") {
      result = result.filter((d) => d.originTag === origin)
    }

    if (agent === "has-agent") {
      result = result.filter((d) => d.hasAgent)
    } else if (agent === "no-agent") {
      result = result.filter((d) => !d.hasAgent)
    }

    if (research !== "all") {
      result = result.filter((d) => d.researchStatus === research)
    }

    if (salesFilter.length > 0) {
      result = result.filter((d) => salesFilter.includes(d.salesStatus))
    }

    if (scale === "large") {
      result = result.filter((d) => d.activeUnits >= 100)
    } else if (scale === "medium") {
      result = result.filter((d) => d.activeUnits >= 20 && d.activeUnits < 100)
    } else if (scale === "small") {
      result = result.filter((d) => d.activeUnits < 20)
    }

    result.sort((a, b) => {
      const dir = sort.direction === "asc" ? 1 : -1
      switch (sort.column) {
        case "activeUnits":
          return (a.activeUnits - b.activeUnits) * dir
        case "icpScore":
          return (calculateIcpScore(a) - calculateIcpScore(b)) * dir
        case "name":
          return a.name.localeCompare(b.name) * dir
        case "projects":
          return (a.projects - b.projects) * dir
        default:
          return 0
      }
    })

    return result
  }, [developers, search, origin, agent, scale, research, salesFilter, sort])

  function handleSelectDeveloper(developer: Developer) {
    setSelectedDeveloper(developer)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Bali Developers
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {developers.length} developers in BD pipeline. Sorted by
          active construction scale.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        origin={origin}
        onOriginChange={setOrigin}
        agent={agent}
        onAgentChange={setAgent}
        scale={scale}
        onScaleChange={setScale}
        research={research}
        onResearchChange={setResearch}
        salesFilter={salesFilter}
        onSalesFilterChange={setSalesFilter}
      />

      <DevelopersTable
        developers={filteredDevelopers}
        sort={sort}
        onSortChange={setSort}
        onSelectDeveloper={handleSelectDeveloper}
        onResearchStatusChange={handleResearchStatusChange}
      />

      <DeveloperSheet
        developer={selectedDeveloper}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onResearchStatusChange={handleResearchStatusChange}
        onSalesStatusChange={handleSalesStatusChange}
      />
    </div>
  )
}
