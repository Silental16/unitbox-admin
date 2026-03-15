import type { Developer } from "./developers"

/**
 * ICP Score (0-100): Based purely on active units under construction.
 * More units being built = higher value as Unitbox client.
 */
export function calculateIcpScore(d: Developer): number {
  if (d.activeUnits >= 500) return 100
  if (d.activeUnits >= 300) return 90
  if (d.activeUnits >= 200) return 80
  if (d.activeUnits >= 100) return 65
  if (d.activeUnits >= 50) return 50
  if (d.activeUnits >= 30) return 38
  if (d.activeUnits >= 15) return 25
  if (d.activeUnits > 0) return 12
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
