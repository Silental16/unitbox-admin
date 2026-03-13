import type { Developer } from "./developers"

export function calculateIcpScore(d: Developer): number {
  return Math.min(
    100,
    Math.round(
      (d.activeUnits > 100
        ? 30
        : d.activeUnits > 50
          ? 25
          : d.activeUnits > 20
            ? 18
            : d.activeUnits > 10
              ? 12
              : 5) +
        (d.hasAgent ? 20 : 0) +
        (d.activeProjects > 3
          ? 20
          : d.activeProjects > 1
            ? 15
            : d.activeProjects === 1
              ? 10
              : 5) +
        (d.priceRange.includes("$500K") || d.priceRange.includes("$1M")
          ? 15
          : d.priceRange.includes("$300K")
            ? 10
            : 5) +
        (d.whatsapp ? 5 : 0) +
        (d.email ? 5 : 0)
    )
  )
}

export function getScoreTier(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high"
  if (score >= 45) return "medium"
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
