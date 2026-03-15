import type { Developer } from "./developers"

/**
 * ICP Score (0-100): How valuable is this developer as a Unitbox client?
 *
 * Primary signals (70 points max):
 *   - Active units under construction (0-40 pts) — more units = more value from chess board + agent tools
 *   - Active projects count (0-30 pts) — multiple projects = stronger need for portfolio management
 *
 * Secondary signals (30 points max):
 *   - Has agent program (10 pts) — already distributes through agents, Unitbox digitizes this
 *   - Contact completeness (5 pts) — we can reach them
 *   - Research done (5 pts) — we know enough to pitch
 *   - Price tier (10 pts) — higher price = more commission potential per unit
 */
export function calculateIcpScore(d: Developer): number {
  let score = 0

  // Active units (0-40 pts) — the core signal
  if (d.activeUnits >= 200) score += 40
  else if (d.activeUnits >= 100) score += 35
  else if (d.activeUnits >= 50) score += 28
  else if (d.activeUnits >= 20) score += 20
  else if (d.activeUnits >= 10) score += 12
  else if (d.activeUnits > 0) score += 6
  // 0 units = 0 pts

  // Active projects (0-30 pts)
  if (d.activeProjects >= 5) score += 30
  else if (d.activeProjects >= 3) score += 24
  else if (d.activeProjects >= 2) score += 18
  else if (d.activeProjects === 1) score += 10
  // 0 projects = 0 pts

  // Agent program (0-10 pts)
  if (d.hasAgent) score += 10

  // Price tier (0-10 pts)
  const pr = d.priceRange.toLowerCase()
  if (pr.includes("1m") || pr.includes("1.5m") || pr.includes("2m") || pr.includes("3m")) score += 10
  else if (pr.includes("500k") || pr.includes("600k") || pr.includes("700k") || pr.includes("800k")) score += 7
  else if (pr.includes("200k") || pr.includes("300k") || pr.includes("400k")) score += 4
  else if (pr) score += 2

  // Contact completeness (0-5 pts)
  if (d.whatsapp || d.email) score += 5

  // Research done (0-5 pts)
  if (d.researchStatus === "completed") score += 5

  return Math.min(100, score)
}

export function getScoreTier(score: number): "high" | "medium" | "low" {
  if (score >= 65) return "high"
  if (score >= 35) return "medium"
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
