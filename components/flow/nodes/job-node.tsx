"use client"

import { memo, useState, useCallback, useRef, useEffect } from "react"
import { type NodeProps, NodeResizer } from "@xyflow/react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowStore } from "../flow-store"
import { NodeHandles } from "./node-handles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type {
  JobNode,
  JobLevel,
  JobType,
  JobNodeData,
  JobViewMode,
  Frequency,
  TriggerType,
} from "../types"

// ---------- Constants ----------

const LEVELS: JobLevel[] = ["core", "small", "micro"]
const JOB_TYPES: JobType[] = [
  "frequency",
  "sequential",
  "viral",
  "tax",
  "orientational",
]
const VIEW_MODES: JobViewMode[] = ["note", "core", "standard", "microscope"]
const TRIGGER_TYPES: TriggerType[] = [
  "planned-external",
  "planned-internal",
  "unexpected-external",
  "unexpected-internal",
]
const FREQUENCIES: Frequency[] = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
  "once",
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

const viewModeLabels: Record<JobViewMode, string> = {
  note: "note",
  core: "core",
  standard: "std",
  microscope: "micro",
}

const defaultShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"
const selectedShadow =
  "rgb(15,15,16) 0px 0px 0px 2px, 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

// ---------- InlineField ----------

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
      "w-full text-[13px] px-1.5 py-1 rounded-md outline-none resize-none nodrag"
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
    <div className={cn("nodrag", className)} onDoubleClick={() => setEditing(true)}>
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

// ---------- RatingBar ----------

const colorSchemes = {
  severity: (v: number) => (v < 4 ? "bg-green-500" : v <= 6 ? "bg-orange-500" : "bg-red-500"),
  importance: (v: number) => (v < 4 ? "bg-blue-300" : v <= 6 ? "bg-blue-400" : "bg-blue-500"),
  satisfaction: (v: number) => (v < 4 ? "bg-red-500" : v <= 6 ? "bg-orange-500" : "bg-green-500"),
}

function RatingBar({
  value,
  onChange,
  label,
  colorScheme,
}: {
  value: number
  onChange: (v: number) => void
  label: string
  colorScheme: "severity" | "importance" | "satisfaction"
}) {
  const getColor = colorSchemes[colorScheme]
  return (
    <div className="mt-1">
      <span
        className="text-[10px] uppercase tracking-wider block mb-1 font-medium"
        style={{ color: "rgba(0,0,17,0.35)" }}
      >
        {label}
      </span>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => {
          const active = i < value
          const color = active ? getColor(value) : "bg-neutral-200"
          return (
            <button
              key={i}
              className={cn("h-2 flex-1 rounded-sm transition-colors nodrag", color)}
              onClick={() => onChange(i + 1 === value ? 0 : i + 1)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ---------- Section wrapper ----------

function Section({
  color,
  title,
  children,
}: {
  color: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="space-y-1.5 rounded-lg p-2"
      style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
    >
      <span className={cn("text-[10px] font-semibold uppercase tracking-wider", color)}>
        {title}
      </span>
      {children}
    </div>
  )
}

// ---------- Click-to-cycle badge ----------

function CycleBadge<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T
  options: readonly T[]
  onChange: (v: T) => void
  className?: string
}) {
  const cycle = useCallback(() => {
    const idx = options.indexOf(value)
    onChange(options[(idx + 1) % options.length])
  }, [value, options, onChange])

  return (
    <button
      className={cn(
        "rounded-md px-1.5 py-0.5 text-[11px] font-medium nodrag",
        className
      )}
      style={{
        backgroundColor: "rgba(0,0,23,0.043)",
        color: "rgb(120,120,129)",
      }}
      onClick={cycle}
    >
      {value}
    </button>
  )
}

// ---------- Truncate helper ----------

function truncate(s: string, max: number): string {
  if (!s) return ""
  return s.length > max ? s.slice(0, max) + "..." : s
}

// ---------- Core view ----------

function CoreView({
  d,
  update,
}: {
  d: JobNodeData
  update: (p: Partial<JobNodeData>) => void
}) {
  const whenText = [d.context, d.trigger].filter(Boolean).join(" — ")
  return (
    <div className="space-y-1.5 px-3.5 pb-3 pt-1">
      <div className="space-y-1">
        <p className="text-[11px]" style={{ color: "rgb(120,120,129)" }}>
          <span className="font-semibold text-blue-500 uppercase text-[10px] mr-1">When:</span>
          {truncate(whenText, 80) || "—"}
        </p>
        <p className="text-[11px]" style={{ color: "rgb(120,120,129)" }}>
          <span className="font-semibold text-emerald-500 uppercase text-[10px] mr-1">Want:</span>
          {truncate(d.expectedResult, 80) || "—"}
        </p>
        <p className="text-[11px]" style={{ color: "rgb(120,120,129)" }}>
          <span className="font-semibold text-violet-500 uppercase text-[10px] mr-1">So that:</span>
          {truncate(d.soThat, 80) || "—"}
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <RatingBar
            value={d.problemSeverity}
            onChange={(v) => update({ problemSeverity: v })}
            label="Problem severity"
            colorScheme="severity"
          />
        </div>
        <div className="flex-1">
          <RatingBar
            value={d.importance}
            onChange={(v) => update({ importance: v })}
            label="Importance"
            colorScheme="importance"
          />
        </div>
      </div>
    </div>
  )
}

// ---------- Standard view ----------

function StandardView({
  d,
  update,
}: {
  d: JobNodeData
  update: (p: Partial<JobNodeData>) => void
}) {
  return (
    <div className="px-3.5 pb-3 pt-1">
      <Accordion type="multiple" className="nodrag">
        {/* When */}
        <AccordionItem value="when" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
              When
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-blue-500" title="">
              <InlineField label="Context" value={d.context} onChange={(v) => update({ context: v })} multiline />
              <InlineField label="Trigger" value={d.trigger} onChange={(v) => update({ trigger: v })} />
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "rgba(0,0,17,0.35)" }}>
                  Trigger type
                </span>
                <CycleBadge value={d.triggerType} options={TRIGGER_TYPES} onChange={(v) => update({ triggerType: v })} />
              </div>
              <InlineField label="Emotions (Point A)" value={d.emotionsA} onChange={(v) => update({ emotionsA: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Want */}
        <AccordionItem value="want" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Want
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-emerald-500" title="">
              <InlineField label="Expected result" value={d.expectedResult} onChange={(v) => update({ expectedResult: v })} multiline />
              <InlineField label="Success criteria" value={d.successCriteria} onChange={(v) => update({ successCriteria: v })} multiline />
              <InlineField label="Value direction" value={d.valueDirection} onChange={(v) => update({ valueDirection: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Current Solution */}
        <AccordionItem value="solution" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-500">
              Current Solution
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-orange-500" title="">
              <InlineField label="Current solution" value={d.currentSolution} onChange={(v) => update({ currentSolution: v })} multiline />
              <RatingBar value={d.solutionSatisfaction} onChange={(v) => update({ solutionSatisfaction: v })} label="Solution satisfaction" colorScheme="satisfaction" />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Problems */}
        <AccordionItem value="problems" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500">
              Problems
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-red-500" title="">
              <InlineField label="Problems" value={d.problems} onChange={(v) => update({ problems: v })} multiline />
              <RatingBar value={d.problemSeverity} onChange={(v) => update({ problemSeverity: v })} label="Problem severity" colorScheme="severity" />
            </Section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <RatingBar value={d.importance} onChange={(v) => update({ importance: v })} label="Importance" colorScheme="importance" />
    </div>
  )
}

// ---------- Microscope view ----------

function MicroscopeView({
  d,
  update,
}: {
  d: JobNodeData
  update: (p: Partial<JobNodeData>) => void
}) {
  return (
    <div className="px-3.5 pb-3 pt-1">
      <Accordion type="multiple" className="nodrag">
        {/* When */}
        <AccordionItem value="when" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
              When
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-blue-500" title="">
              <InlineField label="Context" value={d.context} onChange={(v) => update({ context: v })} multiline />
              <InlineField label="Trigger" value={d.trigger} onChange={(v) => update({ trigger: v })} />
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "rgba(0,0,17,0.35)" }}>
                  Trigger type
                </span>
                <CycleBadge value={d.triggerType} options={TRIGGER_TYPES} onChange={(v) => update({ triggerType: v })} />
              </div>
              <InlineField label="Emotions (Point A)" value={d.emotionsA} onChange={(v) => update({ emotionsA: v })} multiline />
              <InlineField label="Activating knowledge" value={d.activatingKnowledge} onChange={(v) => update({ activatingKnowledge: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Want + Criteria */}
        <AccordionItem value="want" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Want + Criteria
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-emerald-500" title="">
              <InlineField label="Expected result" value={d.expectedResult} onChange={(v) => update({ expectedResult: v })} multiline />
              <InlineField label="Success criteria" value={d.successCriteria} onChange={(v) => update({ successCriteria: v })} multiline />
              <InlineField label="Value direction" value={d.valueDirection} onChange={(v) => update({ valueDirection: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Big Job + Emotions */}
        <AccordionItem value="bigjob" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-500">
              Big Job + Emotions
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-violet-500" title="">
              <InlineField label="So that (big job)" value={d.soThat} onChange={(v) => update({ soThat: v })} multiline />
              <InlineField label="Emotions (Point B)" value={d.emotionsB} onChange={(v) => update({ emotionsB: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Current Solution */}
        <AccordionItem value="solution" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-500">
              Current Solution
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-orange-500" title="">
              <InlineField label="Current solution" value={d.currentSolution} onChange={(v) => update({ currentSolution: v })} multiline />
              <RatingBar value={d.solutionSatisfaction} onChange={(v) => update({ solutionSatisfaction: v })} label="Solution satisfaction" colorScheme="satisfaction" />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Barriers + Alternatives */}
        <AccordionItem value="barriers" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">
              Barriers + Alternatives
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-amber-500" title="">
              <InlineField label="Barriers to solution" value={d.barriersToSolution} onChange={(v) => update({ barriersToSolution: v })} multiline />
              <InlineField label="Barriers to job" value={d.barriersToJob} onChange={(v) => update({ barriersToJob: v })} multiline />
              <InlineField label="Consideration set" value={d.considerationSet} onChange={(v) => update({ considerationSet: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Problems */}
        <AccordionItem value="problems" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500">
              Problems
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-red-500" title="">
              <InlineField label="Problems" value={d.problems} onChange={(v) => update({ problems: v })} multiline />
              <RatingBar value={d.problemSeverity} onChange={(v) => update({ problemSeverity: v })} label="Problem severity" colorScheme="severity" />
            </Section>
          </AccordionContent>
        </AccordionItem>

        {/* Meta */}
        <AccordionItem value="meta" className="border-none">
          <AccordionTrigger className="py-2 nodrag">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Meta
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <Section color="text-neutral-500" title="">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "rgba(0,0,17,0.35)" }}>
                  Frequency
                </span>
                <CycleBadge value={d.frequency} options={FREQUENCIES} onChange={(v) => update({ frequency: v })} />
              </div>
              <RatingBar value={d.importance} onChange={(v) => update({ importance: v })} label="Importance" colorScheme="importance" />
              <InlineField label="Business job" value={d.businessJob} onChange={(v) => update({ businessJob: v })} multiline className="mt-2" />
              <InlineField label="Personal job" value={d.personalJob} onChange={(v) => update({ personalJob: v })} multiline />
            </Section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// ---------- Main component ----------

function JobNodeComponent({ id, data, selected }: NodeProps<JobNode>) {
  const { updateNodeData } = useFlowStore()
  const d = data as JobNodeData
  const level = d.level
  const style = levelStyles[level]
  const viewMode = d.viewMode || "note"

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

  const cycleViewMode = useCallback(() => {
    const idx = VIEW_MODES.indexOf(viewMode)
    update({ viewMode: VIEW_MODES[(idx + 1) % VIEW_MODES.length] })
  }, [viewMode, update])

  const isWide = viewMode === "standard" || viewMode === "microscope"

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-white",
        isWide ? "min-w-[240px]" : "min-w-[200px]"
      )}
      style={{ boxShadow: selected ? selectedShadow : defaultShadow }}
    >
      <NodeResizer
        minWidth={isWide ? 240 : 200}
        minHeight={80}
        isVisible={!!selected}
        lineStyle={{ border: "none" }}
        handleStyle={{ opacity: 0, width: 12, height: 12 }}
      />
      <NodeHandles />

      {/* Header */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5">
        <button onClick={cycleViewMode} className="nodrag" style={{ color: "rgb(120,120,129)" }}>
          <ChevronRight
            className={cn(
              "size-3.5 transition-transform",
              viewMode !== "note" && "rotate-90"
            )}
          />
        </button>
        <InlineField
          value={d.label}
          onChange={(v) => update({ label: v })}
          className="flex-1 min-w-0"
        />
      </div>

      {/* Badges row */}
      <div className="flex items-center gap-1.5 px-3.5 pb-2">
        <button
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[11px] font-medium nodrag",
            style.badge,
            style.text
          )}
          onClick={cycleLevel}
        >
          {level}
        </button>
        <button
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium nodrag"
          style={{
            backgroundColor: "rgba(0,0,23,0.043)",
            color: "rgb(120,120,129)",
          }}
          onClick={cycleType}
        >
          {d.jobType}
        </button>
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
          style={{
            backgroundColor: "rgba(0,0,23,0.043)",
            color: "rgb(120,120,129)",
          }}
        >
          {viewModeLabels[viewMode]}
        </span>
      </div>

      {/* View mode content */}
      {viewMode !== "note" && (
        <div style={{ borderTop: "1px solid rgba(0,0,29,0.075)" }}>
          {viewMode === "core" && <CoreView d={d} update={update} />}
          {viewMode === "standard" && <StandardView d={d} update={update} />}
          {viewMode === "microscope" && <MicroscopeView d={d} update={update} />}
        </div>
      )}
    </div>
  )
}

export const JobNodeMemo = memo(JobNodeComponent)
export default JobNodeMemo
