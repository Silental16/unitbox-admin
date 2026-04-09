"use client"

import { useState, useRef, useEffect } from "react"
import { Type, MoveRight, MoveLeft } from "lucide-react"
import { useFlowStore } from "./flow-store"
import type { FlowEdgeType } from "./types"

const edgeColors: Record<FlowEdgeType, string> = {
  normal: "rgb(147,165,247)",
  critical: "rgb(99,45,216)",
  problem: "rgb(219,119,6)",
}

const typeOrder: FlowEdgeType[] = ["normal", "critical", "problem"]

export function EdgeEditor({
  edgeId,
  position,
  onClose,
}: {
  edgeId: string
  position: { x: number; y: number }
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const edges = useFlowStore((s) => s.edges)
  const updateEdgeData = useFlowStore((s) => s.updateEdgeData)
  const edge = edges.find((e) => e.id === edgeId)

  const [showLabel, setShowLabel] = useState(false)
  const [labelDraft, setLabelDraft] = useState(edge?.data?.label ?? "")
  const labelRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (showLabel) setShowLabel(false)
        else onClose()
      }
    }
    window.addEventListener("mousedown", handleClick)
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("mousedown", handleClick)
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose, showLabel])

  useEffect(() => {
    if (showLabel) setTimeout(() => labelRef.current?.focus(), 0)
  }, [showLabel])

  if (!edge) return null

  const flowType = edge.data?.flowType ?? "normal"
  const marker = edge.data?.marker ?? "none"
  const hasStartArrow = marker === "arrow-start" || marker === "arrow-both"
  const hasEndArrow = marker === "arrow-end" || marker === "arrow-both"

  const cycleType = () => {
    const idx = typeOrder.indexOf(flowType)
    updateEdgeData(edgeId, { flowType: typeOrder[(idx + 1) % typeOrder.length] })
  }

  const toggleDash = () => {
    updateEdgeData(edgeId, {
      flowType: flowType === "problem" ? "normal" : "problem",
    })
  }

  const toggleStartArrow = () => {
    if (hasStartArrow && hasEndArrow) updateEdgeData(edgeId, { marker: "arrow-end" })
    else if (hasStartArrow) updateEdgeData(edgeId, { marker: "none" })
    else if (hasEndArrow) updateEdgeData(edgeId, { marker: "arrow-both" })
    else updateEdgeData(edgeId, { marker: "arrow-start" })
  }

  const toggleEndArrow = () => {
    if (hasEndArrow && hasStartArrow) updateEdgeData(edgeId, { marker: "arrow-start" })
    else if (hasEndArrow) updateEdgeData(edgeId, { marker: "none" })
    else if (hasStartArrow) updateEdgeData(edgeId, { marker: "arrow-both" })
    else updateEdgeData(edgeId, { marker: "arrow-end" })
  }

  const confirmLabel = () => {
    updateEdgeData(edgeId, { label: labelDraft || undefined })
    setShowLabel(false)
  }

  const iconBtn =
    "flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-[rgba(0,0,23,0.043)]"
  const activeBtn =
    "flex size-8 items-center justify-center rounded-lg bg-[rgba(0,0,23,0.06)]"

  return (
    <div
      ref={ref}
      className="fixed z-[100] flex items-center gap-0.5 rounded-[14px] p-1"
      style={{
        left: position.x,
        top: position.y - 50,
        transform: "translateX(-50%)",
        backgroundColor: "rgb(255, 255, 255)",
        color: "rgb(120, 120, 129)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Color dot — cycles edge type */}
      <button className={iconBtn} onClick={cycleType} title={`Type: ${flowType}`}>
        <span
          className="size-3.5 rounded-full"
          style={{ backgroundColor: edgeColors[flowType] }}
        />
      </button>

      <div className="h-5 w-px bg-[rgba(0,0,29,0.075)]" />

      {/* Stroke style — solid/dashed */}
      <button
        className={flowType === "problem" ? activeBtn : iconBtn}
        onClick={toggleDash}
        title="Dashed line"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="h-5 w-px bg-[rgba(0,0,29,0.075)]" />

      {/* Label */}
      {showLabel ? (
        <input
          ref={labelRef}
          className="h-8 w-24 rounded-lg bg-[rgba(0,0,23,0.043)] px-2 text-[13px] text-[rgb(15,15,16)] outline-none placeholder:text-[rgba(0,0,17,0.25)]"
          value={labelDraft}
          onChange={(e) => setLabelDraft(e.target.value)}
          onBlur={confirmLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmLabel()
            if (e.key === "Escape") setShowLabel(false)
          }}
          placeholder="Label..."
        />
      ) : (
        <button
          className={edge.data?.label ? activeBtn : iconBtn}
          onClick={() => setShowLabel(true)}
          title="Add label"
        >
          <Type className="size-4" />
        </button>
      )}

      <div className="h-5 w-px bg-[rgba(0,0,29,0.075)]" />

      {/* Arrow start */}
      <button
        className={hasStartArrow ? activeBtn : iconBtn}
        onClick={toggleStartArrow}
        title="Arrow at start"
      >
        <MoveLeft className="size-4" />
      </button>

      {/* Arrow end */}
      <button
        className={hasEndArrow ? activeBtn : iconBtn}
        onClick={toggleEndArrow}
        title="Arrow at end"
      >
        <MoveRight className="size-4" />
      </button>
    </div>
  )
}
