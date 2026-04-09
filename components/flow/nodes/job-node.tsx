"use client"

import { memo, useState, useCallback, useRef, useEffect } from "react"
import { type NodeProps, NodeResizer } from "@xyflow/react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowStore } from "../flow-store"
import { NodeHandles } from "./node-handles"
import type { JobNode, JobLevel, JobType, JobNodeData } from "../types"

const LEVELS: JobLevel[] = ["core", "small", "micro"]
const JOB_TYPES: JobType[] = [
  "frequency",
  "sequential",
  "viral",
  "tax",
  "orientational",
]

const levelStyles: Record<
  JobLevel,
  { border: string; badge: string; text: string }
> = {
  core: {
    border: "border-l-blue-500",
    badge: "bg-blue-500/15",
    text: "text-blue-600",
  },
  small: {
    border: "border-l-emerald-500",
    badge: "bg-emerald-500/15",
    text: "text-emerald-600",
  },
  micro: {
    border: "border-l-neutral-400",
    badge: "bg-neutral-400/15",
    text: "text-neutral-500",
  },
}

const defaultShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"
const selectedShadow =
  "rgb(15,15,16) 0px 0px 0px 2px, 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"


function InlineField({
  value,
  onChange,
  multiline = false,
  label,
  className,
}: {
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  label?: string
  className?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) {
      setDraft(value)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [editing, value])

  const confirm = useCallback(() => {
    setEditing(false)
    if (draft !== value) onChange(draft)
  }, [draft, value, onChange])

  const cancel = useCallback(() => {
    setEditing(false)
    setDraft(value)
  }, [value])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") cancel()
      if (!multiline && e.key === "Enter") {
        e.preventDefault()
        confirm()
      }
    },
    [multiline, confirm, cancel]
  )

  if (editing) {
    const shared =
      "w-full text-[13px] px-1.5 py-1 rounded-md outline-none resize-none"
    return (
      <div className={className}>
        {label && (
          <span
            className="text-[10px] uppercase tracking-wider mb-0.5 block font-medium"
            style={{ color: "rgba(0,0,17,0.35)" }}
          >
            {label}
          </span>
        )}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className={shared}
            style={{ color: "rgb(15,15,16)", backgroundColor: "rgba(0,0,23,0.043)" }}
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={confirm}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            className={shared}
            style={{ color: "rgb(15,15,16)", backgroundColor: "rgba(0,0,23,0.043)" }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={confirm}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    )
  }

  return (
    <div className={className} onDoubleClick={() => setEditing(true)}>
      {label && (
        <span
          className="text-[10px] uppercase tracking-wider mb-0.5 block font-medium"
          style={{ color: "rgba(0,0,17,0.35)" }}
        >
          {label}
        </span>
      )}
      {value ? (
        <span
          className="text-[13px] whitespace-pre-wrap"
          style={{ color: "rgb(120,120,129)" }}
        >
          {value}
        </span>
      ) : (
        <span className="text-[13px] italic" style={{ color: "rgba(0,0,17,0.25)" }}>
          Double-click to edit...
        </span>
      )}
    </div>
  )
}

function SeverityBar({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="mt-1">
      <span
        className="text-[10px] uppercase tracking-wider block mb-1 font-medium"
        style={{ color: "rgba(0,0,17,0.35)" }}
      >
        Problem severity
      </span>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => {
          const active = i < value
          let color = "bg-neutral-200"
          if (active) {
            if (value < 4) color = "bg-green-500"
            else if (value <= 6) color = "bg-orange-500"
            else color = "bg-red-500"
          }
          return (
            <button
              key={i}
              className={cn("h-2 flex-1 rounded-sm transition-colors", color)}
              onClick={() => onChange(i + 1 === value ? 0 : i + 1)}
            />
          )
        })}
      </div>
    </div>
  )
}

function JobNodeComponent({ id, data, selected }: NodeProps<JobNode>) {
  const { updateNodeData, deleteNode } = useFlowStore()
  const d = data as JobNodeData
  const level = d.level
  const style = levelStyles[level]

  const update = useCallback(
    (partial: Partial<JobNodeData>) => {
      updateNodeData(id, partial)
    },
    [id, updateNodeData]
  )

  const cycleLevel = useCallback(() => {
    const idx = LEVELS.indexOf(d.level)
    update({ level: LEVELS[(idx + 1) % LEVELS.length] })
  }, [d.level, update])

  const cycleType = useCallback(() => {
    const idx = JOB_TYPES.indexOf(d.jobType)
    update({ jobType: JOB_TYPES[(idx + 1) % JOB_TYPES.length] })
  }, [d.jobType, update])

  const toggleExpanded = useCallback(() => {
    update({ expanded: !d.expanded })
  }, [d.expanded, update])

  return (
    <div
      className={cn(
        "group relative min-w-[200px] rounded-2xl bg-white"
      )}
      style={{ boxShadow: selected ? selectedShadow : defaultShadow }}
    >
      <NodeResizer
        minWidth={200}
        minHeight={80}
        isVisible={!!selected}
        lineStyle={{ border: "none" }}
        handleStyle={{ opacity: 0, width: 12, height: 12 }}
      />
      <NodeHandles />

      <div className="flex items-center gap-1.5 px-3.5 py-2.5">
        <button onClick={toggleExpanded} style={{ color: "rgb(120,120,129)" }}>
          <ChevronRight
            className={cn(
              "size-3.5 transition-transform",
              d.expanded && "rotate-90"
            )}
          />
        </button>
        <InlineField
          value={d.label}
          onChange={(v) => update({ label: v })}
          className="flex-1 min-w-0"
        />
      </div>

      <div className="flex items-center gap-1.5 px-3.5 pb-2">
        <button
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[11px] font-medium",
            style.badge,
            style.text
          )}
          onClick={cycleLevel}
        >
          {level}
        </button>
        <button
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium"
          style={{
            backgroundColor: "rgba(0,0,23,0.043)",
            color: "rgb(120,120,129)",
          }}
          onClick={cycleType}
        >
          {d.jobType}
        </button>
      </div>

      {d.expanded && (
        <div
          className="space-y-2 px-3.5 pb-3"
          style={{ borderTop: "1px solid rgba(0,0,29,0.075)" }}
        >
          <div className="space-y-1.5 rounded-lg p-2 mt-2" style={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
              When
            </span>
            <InlineField label="Context" value={d.context} onChange={(v) => update({ context: v })} multiline />
            <InlineField label="Trigger" value={d.trigger} onChange={(v) => update({ trigger: v })} />
            <InlineField label="Emotions (Point A)" value={d.emotionsA} onChange={(v) => update({ emotionsA: v })} />
          </div>

          <div className="space-y-1.5 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Want
            </span>
            <InlineField label="Expected result" value={d.expectedResult} onChange={(v) => update({ expectedResult: v })} multiline />
            <InlineField label="Success criteria" value={d.successCriteria} onChange={(v) => update({ successCriteria: v })} multiline />
          </div>

          <InlineField label="So that" value={d.soThat} onChange={(v) => update({ soThat: v })} multiline />
          <InlineField label="Problems" value={d.problems} onChange={(v) => update({ problems: v })} multiline />

          <SeverityBar value={d.problemSeverity} onChange={(v) => update({ problemSeverity: v })} />
        </div>
      )}
    </div>
  )
}

export const JobNodeMemo = memo(JobNodeComponent)
export default JobNodeMemo
