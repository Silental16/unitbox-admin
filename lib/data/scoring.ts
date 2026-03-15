import type { Developer, DeveloperProject } from "./developers"

const SEA_KEYWORDS = [
  "bali", "canggu", "ubud", "uluwatu", "seminyak", "nusa dua", "bukit", "berawa",
  "pererenan", "kuta", "sanur", "tabanan", "gianyar", "pecatu", "bingin", "seseh",
  "jimbaran", "ungasan", "kedungu", "nyanyi", "melasti", "pandawa", "karangasem",
  "denpasar", "badung", "kerobokan", "umalas", "cemagi", "kediri", "tibubeneng",
  "sukawati", "nusa penida", "nusa ceningan", "gili", "lombok", "sumba", "sumbawa",
  "phuket", "nai harn", "thailand", "kaba-kaba", "buwit", "munduk", "amed",
  "nuanu", "sawangan", "benoa", "kutuh", "abiansemal",
]

/** Check if a project is in Southeast Asia (Bali, Indonesia islands, Thailand) */
export function isSeaProject(p: DeveloperProject): boolean {
  if (!p.location) return true // assume SEA if no location
  const loc = p.location.toLowerCase()
  return SEA_KEYWORDS.some((kw) => loc.includes(kw))
}

function parseUnits(units: string | undefined): number {
  if (!units) return 0
  const match = String(units).match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/**
 * Counts active units from SEA projects only (building + presale).
 */
export function countActiveUnits(d: Developer): number {
  let total = 0
  for (const p of d.projectList) {
    if (p.status !== "building" && p.status !== "presale") continue
    if (!isSeaProject(p)) continue
    total += parseUnits(p.units)
  }
  return total
}

/** Count active (building + presale) projects */
export function countActiveProjects(d: Developer): number {
  return d.projectList.filter((p) => p.status === "building" || p.status === "presale").length
}

/** Count completed projects */
export function countCompletedProjects(d: Developer): number {
  return d.projectList.filter((p) => p.status === "completed").length
}

/**
 * ICP Score (0-100): Based on active SEA units only.
 */
export function calculateIcpScore(d: Developer): number {
  const units = countActiveUnits(d)
  if (units >= 500) return 100
  if (units >= 300) return 90
  if (units >= 200) return 80
  if (units >= 100) return 65
  if (units >= 50) return 50
  if (units >= 30) return 38
  if (units >= 15) return 25
  if (units > 0) return 12
  return 0
}

export function getScoreTier(score: number): "high" | "medium" | "low" {
  if (score >= 60) return "high"
  if (score >= 30) return "medium"
  return "low"
}

export function getScoreColor(score: number): string {
  const tier = getScoreTier(score)
  if (tier === "high") return "text-emerald-600 dark:text-emerald-400"
  if (tier === "medium") return "text-amber-600 dark:text-amber-400"
  return "text-red-500 dark:text-red-400"
}

export function getScoreProgressColor(score: number): string {
  const tier = getScoreTier(score)
  if (tier === "high") return "bg-emerald-500"
  if (tier === "medium") return "bg-amber-500"
  return "bg-red-500"
}
