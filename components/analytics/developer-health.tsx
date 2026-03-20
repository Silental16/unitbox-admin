"use client"

import { cn } from "@/lib/utils"

function getHealthColor(score: number): string {
  if (score >= 70) return "text-emerald-500"
  if (score >= 40) return "text-amber-500"
  return "text-red-500"
}

function getHealthBg(score: number): string {
  if (score >= 70) return "bg-emerald-500"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

export function getHealthLabel(score: number): string {
  if (score >= 70) return "Healthy"
  if (score >= 40) return "Attention"
  return "At Risk"
}

interface DeveloperHealthBadgeProps {
  score: number
  size?: "sm" | "md"
}

export function DeveloperHealthBadge({ score, size = "md" }: DeveloperHealthBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("font-semibold tabular-nums", size === "sm" ? "text-xs" : "text-sm", getHealthColor(score))}>
        {score}
      </span>
      <div className={cn("relative overflow-hidden rounded-full bg-muted", size === "sm" ? "h-1.5 w-12" : "h-2 w-16")}>
        <div className={cn("h-full rounded-full transition-all", getHealthBg(score))} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
