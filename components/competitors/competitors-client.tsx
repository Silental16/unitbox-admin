"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import type { Competitor, ThreatLevel, CompetitorResearchStatus } from "@/lib/data/competitors"
import { createClient } from "@/lib/supabase/client"
import { logChange } from "@/lib/audit"
import {
  FilterBar,
  type ThreatFilter,
  type ChainFilter,
  type SortOption,
} from "@/components/competitors/filter-bar"
import { CompetitorsTable } from "@/components/competitors/competitors-table"
import { CompetitorSheet } from "@/components/competitors/competitor-sheet"

const THREAT_ORDER: Record<ThreatLevel, number> = { high: 0, medium: 1, low: 2 }

export function CompetitorsClient({
  competitors: initialCompetitors,
}: {
  competitors: Competitor[]
}) {
  const [competitors, setCompetitors] = useState(initialCompetitors)
  const [search, setSearch] = useState("")
  const [threatFilter, setThreatFilter] = useState<ThreatFilter>("all")
  const [chainFilter, setChainFilter] = useState<ChainFilter>("all")
  const [sort, setSort] = useState<SortOption>({ column: "name", direction: "asc" })
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleThreatLevelChange = useCallback(async (competitorId: string, level: ThreatLevel) => {
    const old = competitors.find((c) => c.id === competitorId)?.threatLevel
    setCompetitors((prev) =>
      prev.map((c) => c.id === competitorId ? { ...c, threatLevel: level } : c)
    )
    setSelectedCompetitor((prev) => prev?.id === competitorId ? { ...prev, threatLevel: level } : prev)
    const supabase = createClient()
    await supabase.from("competitors").update({ threat_level: level }).eq("id", competitorId)
    logChange(competitorId, "threat_level", old ?? null, level)
  }, [competitors])

  const handleResearchStatusChange = useCallback(async (competitorId: string, status: CompetitorResearchStatus) => {
    const old = competitors.find((c) => c.id === competitorId)?.researchStatus
    setCompetitors((prev) =>
      prev.map((c) => c.id === competitorId ? { ...c, researchStatus: status } : c)
    )
    setSelectedCompetitor((prev) => prev?.id === competitorId ? { ...prev, researchStatus: status } : prev)
    const supabase = createClient()
    await supabase.from("competitors").update({ research_status: status }).eq("id", competitorId)
    logChange(competitorId, "research_status", old ?? null, status)
  }, [competitors])

  const notesTimerRef = useRef<NodeJS.Timeout | null>(null)
  const handleNotesChange = useCallback((competitorId: string, notes: string) => {
    setCompetitors((prev) =>
      prev.map((c) => c.id === competitorId ? { ...c, notes } : c)
    )
    setSelectedCompetitor((prev) => prev?.id === competitorId ? { ...prev, notes } : prev)
    // Debounce save to Supabase
    if (notesTimerRef.current) clearTimeout(notesTimerRef.current)
    notesTimerRef.current = setTimeout(async () => {
      const supabase = createClient()
      await supabase.from("competitors").update({ notes }).eq("id", competitorId)
      logChange(competitorId, "notes", null, notes)
    }, 800)
  }, [])

  const filteredCompetitors = useMemo(() => {
    let result = [...competitors]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.url.toLowerCase().includes(q) ||
          c.whatItDoes.toLowerCase().includes(q)
      )
    }

    if (threatFilter !== "all") {
      result = result.filter((c) => c.threatLevel === threatFilter)
    }

    if (chainFilter !== "all") {
      result = result.filter((c) => c.chainLink === chainFilter)
    }

    result.sort((a, b) => {
      const dir = sort.direction === "asc" ? 1 : -1
      switch (sort.column) {
        case "name":
          return a.name.localeCompare(b.name) * dir
        case "threatLevel":
          return (THREAT_ORDER[a.threatLevel] - THREAT_ORDER[b.threatLevel]) * dir
        case "sizeSignal":
          return a.sizeSignal.localeCompare(b.sizeSignal) * dir
        default:
          return 0
      }
    })

    return result
  }, [competitors, search, threatFilter, chainFilter, sort])

  function handleSelectCompetitor(competitor: Competitor) {
    setSelectedCompetitor(competitor)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Конкуренты
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {competitors.length} конкурентов. Сортировка по{" "}
          {sort.column === "name" ? "name" : sort.column === "threatLevel" ? "threat level" : "size signal"}.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        threatFilter={threatFilter}
        onThreatFilterChange={setThreatFilter}
        chainFilter={chainFilter}
        onChainFilterChange={setChainFilter}
      />

      <CompetitorsTable
        competitors={filteredCompetitors}
        sort={sort}
        onSortChange={setSort}
        onSelectCompetitor={handleSelectCompetitor}
        onResearchStatusChange={handleResearchStatusChange}
      />

      <CompetitorSheet
        competitor={selectedCompetitor}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onResearchStatusChange={handleResearchStatusChange}
        onThreatLevelChange={handleThreatLevelChange}
        onNotesChange={handleNotesChange}
      />
    </div>
  )
}
