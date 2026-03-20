"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import type { Period } from "@/lib/data/analytics"

const periods: { value: Period; label: string }[] = [
  { value: "7d", label: "7д" },
  { value: "30d", label: "30д" },
  { value: "90d", label: "90д" },
  { value: "all", label: "Всё" },
]

export function PeriodSelector({ current }: { current: Period }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("period", value)
    router.push(`/analytics?${params.toString()}`)
  }

  return (
    <ToggleGroup
      type="single"
      value={current}
      onValueChange={handleChange}
      variant="outline"
      size="sm"
    >
      {periods.map((p) => (
        <ToggleGroupItem key={p.value} value={p.value}>
          {p.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
