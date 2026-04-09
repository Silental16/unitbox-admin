"use client"

import { useReactFlow } from "@xyflow/react"
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  Download,
  Upload,
  GitBranch,
  Briefcase,

  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowStore } from "./flow-store"
import type { FlowEdgeType } from "./types"

const edgeTypeConfig: {
  type: FlowEdgeType
  label: string
  dotColor: string
}[] = [
  { type: "normal", label: "Normal", dotColor: "rgb(147,165,247)" },
  { type: "critical", label: "Critical", dotColor: "rgb(99,45,216)" },
  { type: "problem", label: "Problem", dotColor: "rgb(219,119,6)" },
]

const shadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

export function FlowToolbar() {
  const { zoomIn, zoomOut, fitView, screenToFlowPosition } = useReactFlow()
  const { addNode, reset, autoLayout, exportJSON, importFlow, activeEdgeType, setActiveEdgeType } =
    useFlowStore()

  function getCenterPosition() {
    return screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })
  }

  function handleImport() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          if (data.nodes && data.edges) {
            importFlow(data.nodes, data.edges, data.viewport)
          }
        } catch {
          // invalid JSON, ignore
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  function handleExport() {
    const json = exportJSON()
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `flow-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const btn =
    "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[rgba(0,0,23,0.043)]"
  const iconBtn =
    "flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-[rgba(0,0,23,0.043)]"

  return (
    <div
      className="flex items-center gap-0.5 rounded-[14px] bg-white p-1"
      style={{
        boxShadow: shadow,
        color: "rgb(120, 120, 129)",
      }}
    >
      <button className={btn} onClick={() => addNode("process", getCenterPosition())}>
        <GitBranch className="size-4" />
        Note
      </button>
      <button className={btn} onClick={() => addNode("job", getCenterPosition())}>
        <Briefcase className="size-4" />
        Job
      </button>

      <div className="mx-0.5 h-5 w-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />

      {edgeTypeConfig.map((et) => (
        <button
          key={et.type}
          className={cn(
            btn,
            activeEdgeType === et.type && "bg-[rgba(0,0,23,0.043)]"
          )}
          style={activeEdgeType === et.type ? { color: "rgb(15,15,16)" } : undefined}
          onClick={() => setActiveEdgeType(et.type)}
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: et.dotColor }}
          />
          {et.label}
        </button>
      ))}

      <div className="mx-0.5 h-5 w-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />

      <button className={iconBtn} onClick={() => zoomIn()}>
        <ZoomIn className="size-4" />
      </button>
      <button className={iconBtn} onClick={() => zoomOut()}>
        <ZoomOut className="size-4" />
      </button>
      <button className={iconBtn} onClick={() => fitView({ padding: 0.2 })}>
        <Maximize className="size-4" />
      </button>

      <div className="mx-0.5 h-5 w-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />

      <button className={iconBtn} onClick={() => autoLayout("LR")} title="Auto-layout (horizontal)">
        <LayoutGrid className="size-4" />
      </button>
      <button className={iconBtn} onClick={() => reset()}>
        <RotateCcw className="size-4" />
      </button>
      <button className={iconBtn} onClick={handleImport} title="Import JSON">
        <Upload className="size-4" />
      </button>
      <button className={iconBtn} onClick={handleExport} title="Export JSON">
        <Download className="size-4" />
      </button>
    </div>
  )
}
