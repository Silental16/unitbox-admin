"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useFlowStore } from "./flow-store"

export function SaveIndicator() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")
  const nodes = useFlowStore((s) => s.nodes)
  const edges = useFlowStore((s) => s.edges)

  useEffect(() => {
    setStatus("saving")
    const timer = setTimeout(() => setStatus("saved"), 600)
    return () => clearTimeout(timer)
  }, [nodes, edges])

  if (status === "idle") return null

  return (
    <div
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px]"
      style={{ color: "rgb(120, 120, 129)" }}
    >
      {status === "saving" ? (
        <>
          <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
          Saving...
        </>
      ) : (
        <>
          <Check className="size-3 text-emerald-500" />
          Saved
        </>
      )}
    </div>
  )
}
