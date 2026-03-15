import type { Developer } from "./developers"

/**
 * ICP Score (0-100): How valuable is this developer as a Unitbox client?
 *
 * Based purely on active construction scale:
 *   - Active units under construction (0-60 pts)
 *   - Active projects count (0-40 pts)
 */
export function calculateIcpScore(d: Developer): number {
  let score = 0

  // Active units (0-60 pts)
  if (d.activeUnits >= 200) score += 60
  else if (d.activeUnits >= 100) score += 50
  else if (d.activeUnits >= 50) score += 40
  else if (d.activeUnits >= 20) score += 28
  else if (d.activeUnits >= 10) score += 18
  else if (d.activeUnits > 0) score += 8

  // Active projects (0-40 pts)
  if (d.activeProjects >= 5) score += 40
  else if (d.activeProjects >= 3) score += 30
  else if (d.activeProjects >= 2) score += 22
  else if (d.activeProjects === 1) score += 12

  return Math.min(100, score)
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
