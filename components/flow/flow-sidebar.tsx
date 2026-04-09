"use client"

import { useState } from "react"
import {
  PanelLeftClose,
  PanelLeftOpen,
  GitBranch,
  Briefcase,
  Diamond,
  LayoutGrid,
  RotateCcw,
  Upload,
  Download,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useFlowStore } from "./flow-store"

const shadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

const nodeTypes = [
  { type: "process" as const, label: "Process", icon: GitBranch, color: "rgb(99,45,216)" },
  { type: "job" as const, label: "Job", icon: Briefcase, color: "rgb(59,130,246)" },
  { type: "decision" as const, label: "Decision", icon: Diamond, color: "rgb(245,158,11)" },
]

export function FlowSidebar() {
  const [expanded, setExpanded] = useState(false)
  const { addNode, autoLayout, reset, exportJSON, importFlow } = useFlowStore()

  function handleAddNode(type: "process" | "job" | "decision") {
    addNode(type, { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 })
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
          if (data.nodes && data.edges) importFlow(data.nodes, data.edges, data.viewport)
        } catch { /* ignore */ }
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

  const btnClass =
    "flex items-center gap-2.5 h-8 w-full px-2.5 text-[13px] rounded-lg transition-colors hover:bg-[rgba(0,0,23,0.043)]"
  const iconBtnClass =
    "flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-[rgba(0,0,23,0.043)]"

  return (
    <div
      className={cn(
        "absolute left-3 top-3 z-50 flex flex-col rounded-[14px] bg-white transition-all duration-150 overflow-hidden",
        expanded ? "w-[200px]" : "w-10"
      )}
      style={{ boxShadow: shadow, color: "rgb(120,120,129)" }}
    >
      {/* Toggle + Back to Flows */}
      <div className={cn("flex items-center shrink-0", expanded ? "px-1.5 pt-1.5 gap-1" : "flex-col pt-1.5 gap-0.5 px-1")}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={iconBtnClass}
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
        </button>
        {expanded && (
          <Link href="/flows" className={iconBtnClass} title="Back to Flows">
            <ArrowLeft className="size-4" />
          </Link>
        )}
        {!expanded && (
          <Link href="/flows" className={iconBtnClass} title="Back to Flows">
            <ArrowLeft className="size-3.5" />
          </Link>
        )}
      </div>

      {/* Separator */}
      <div className="mx-2 my-1 h-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />

      {/* Node types */}
      <div className={cn("flex flex-col gap-0.5", expanded ? "px-1.5" : "px-1 items-center")}>
        {expanded && (
          <span className="px-2.5 text-[10px] uppercase tracking-wider font-medium mb-0.5" style={{ color: "rgba(0,0,17,0.35)" }}>
            Add node
          </span>
        )}
        {nodeTypes.map((nt) => {
          const Icon = nt.icon
          return expanded ? (
            <button key={nt.type} className={btnClass} onClick={() => handleAddNode(nt.type)}>
              <Icon className="size-4 shrink-0" style={{ color: nt.color }} />
              <span>{nt.label}</span>
            </button>
          ) : (
            <button key={nt.type} className={iconBtnClass} onClick={() => handleAddNode(nt.type)} title={nt.label}>
              <Icon className="size-4" style={{ color: nt.color }} />
            </button>
          )
        })}
      </div>

      {/* Separator */}
      <div className="mx-2 my-1 h-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />

      {/* Actions */}
      <div className={cn("flex flex-col gap-0.5 pb-1.5", expanded ? "px-1.5" : "px-1 items-center")}>
        {expanded && (
          <span className="px-2.5 text-[10px] uppercase tracking-wider font-medium mb-0.5" style={{ color: "rgba(0,0,17,0.35)" }}>
            Actions
          </span>
        )}
        {expanded ? (
          <>
            <button className={btnClass} onClick={() => autoLayout("LR")}>
              <LayoutGrid className="size-4 shrink-0" />
              <span>Auto-layout</span>
            </button>
            <button className={btnClass} onClick={handleImport}>
              <Upload className="size-4 shrink-0" />
              <span>Import</span>
            </button>
            <button className={btnClass} onClick={handleExport}>
              <Download className="size-4 shrink-0" />
              <span>Export</span>
            </button>
            <button className={btnClass} onClick={() => reset()}>
              <RotateCcw className="size-4 shrink-0" />
              <span>Reset</span>
            </button>
          </>
        ) : (
          <>
            <button className={iconBtnClass} onClick={() => autoLayout("LR")} title="Auto-layout">
              <LayoutGrid className="size-4" />
            </button>
            <button className={iconBtnClass} onClick={handleImport} title="Import">
              <Upload className="size-4" />
            </button>
            <button className={iconBtnClass} onClick={handleExport} title="Export">
              <Download className="size-4" />
            </button>
            <button className={iconBtnClass} onClick={() => reset()} title="Reset">
              <RotateCcw className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
