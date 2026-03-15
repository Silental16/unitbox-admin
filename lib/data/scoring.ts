import type { Developer } from "./developers"

/**
 * Counts active units from project_list (building + presale projects only).
 * Parses the units string to extract the leading number.
 */
export function countActiveUnits(d: Developer): number {
  let total = 0
  for (const p of d.projectList) {
    if (p.status !== "building" && p.status !== "presale") continue
    if (!p.units) continue
    // Extract first number from strings like "50", "120 (88 studios + 32 1BR)", "65+ rooms", "TBD"
    const match = p.units.match(/(\d+)/)
    if (match) total += parseInt(match[1], 10)
  }
  return total
}

/**
 * ICP Score (0-100): Based on actual active units from project_list data.
 * Calculated dynamically — not from the static active_units field.
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
