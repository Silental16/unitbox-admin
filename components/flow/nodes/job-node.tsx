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
  Frequency,
  TriggerType,
} from "../types"

/* ═══════════════════ Constants ═══════════════════ */

const LEVELS: JobLevel[] = ["core", "small", "micro"]
const JOB_TYPES: JobType[] = ["frequency", "sequential", "viral", "tax", "orientational"]
const TRIGGER_TYPES: TriggerType[] = ["planned-external", "planned-internal", "unexpected-external", "unexpected-internal"]
const FREQUENCIES: Frequency[] = ["daily", "weekly", "monthly", "quarterly", "yearly", "once"]

const TRIGGER_LABELS: Record<TriggerType, string> = {
  "planned-external": "план. внешний",
  "planned-internal": "план. внутренний",
  "unexpected-external": "неожид. внешний",
  "unexpected-internal": "неожид. внутренний",
}

const FREQUENCY_LABELS: Record<Frequency, string> = {
  daily: "ежедневно",
  weekly: "еженедельно",
  monthly: "ежемесячно",
  quarterly: "ежеквартально",
  yearly: "ежегодно",
  once: "разово",
}

const JOB_TYPE_LABELS: Record<JobType, string> = {
  frequency: "частотная",
  sequential: "последоват.",
  viral: "виральная",
  tax: "налоговая",
  orientational: "ориентац.",
}

const levelStyles: Record<JobLevel, { badge: string; text: string; dot: string }> = {
  core: { badge: "bg-blue-500/12", text: "text-blue-600", dot: "bg-blue-500" },
  small: { badge: "bg-emerald-500/12", text: "text-emerald-600", dot: "bg-emerald-500" },
  micro: { badge: "bg-neutral-400/12", text: "text-neutral-500", dot: "bg-neutral-400" },
}

const shadow = "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06), 0 2px 6px -2px rgba(0,0,0,0.05)"
const selectedShadow = "rgb(15,15,16) 0px 0px 0px 2px, 0 0 0 1px rgba(0,0,0,0.06), 0 2px 6px -2px rgba(0,0,0,0.05)"

/* ═══════════════════ InlineField ═══════════════════ */

function InlineField({
  value,
  onChange,
  multiline = false,
  label,
  placeholder = "Двойной клик для редактирования...",
  className,
}: {
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  label?: string
  placeholder?: string
  className?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) {
      setDraft(value)
      setTimeout(() => ref.current?.focus(), 0)
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

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") cancel()
      if (!multiline && e.key === "Enter") {
        e.preventDefault()
        confirm()
      }
    },
    [multiline, confirm, cancel]
  )

  const inputCls = "w-full text-[12.5px] leading-relaxed px-2 py-1 rounded-md outline-none resize-none nodrag font-[400]"
  const inputStyle: React.CSSProperties = { color: "rgb(15,15,16)", backgroundColor: "rgba(0,0,20,0.035)" }

  if (editing) {
    return (
      <div className={className}>
        {label && <Label>{label}</Label>}
        {multiline ? (
          <textarea ref={ref as React.RefObject<HTMLTextAreaElement>} className={inputCls} style={inputStyle} rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={confirm} onKeyDown={onKey} />
        ) : (
          <input ref={ref as React.RefObject<HTMLInputElement>} className={inputCls} style={inputStyle} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={confirm} onKeyDown={onKey} />
        )}
      </div>
    )
  }

  return (
    <div className={cn("cursor-text", className)} onDoubleClick={() => setEditing(true)}>
      {label && <Label>{label}</Label>}
      {value ? (
        <span className="text-[12.5px] leading-relaxed whitespace-pre-wrap block" style={{ color: "rgb(100,100,110)" }}>{value}</span>
      ) : (
        <span className="text-[12px] italic block" style={{ color: "rgba(0,0,17,0.2)" }}>{placeholder}</span>
      )}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-wide mb-0.5 block font-semibold" style={{ color: "rgba(0,0,17,0.3)" }}>
      {children}
    </span>
  )
}

/* ═══════════════════ RatingBar ═══════════════════ */

const colorFns = {
  severity: (v: number) => (v < 4 ? "bg-emerald-400" : v <= 6 ? "bg-amber-400" : "bg-red-400"),
  importance: (v: number) => (v < 4 ? "bg-sky-300" : v <= 6 ? "bg-sky-400" : "bg-sky-500"),
  satisfaction: (v: number) => (v < 4 ? "bg-red-400" : v <= 6 ? "bg-amber-400" : "bg-emerald-400"),
}

function RatingBar({ value, onChange, label, scheme }: {
  value: number
  onChange: (v: number) => void
  label: string
  scheme: "severity" | "importance" | "satisfaction"
}) {
  const color = colorFns[scheme]
  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between mb-1">
        <Label>{label}</Label>
        {value > 0 && <span className="text-[10px] font-semibold tabular-nums" style={{ color: "rgb(100,100,110)" }}>{value}/10</span>}
      </div>
      <div className="flex gap-px">
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className={cn("h-[5px] flex-1 rounded-[2px] transition-colors nodrag", i < value ? color(value) : "bg-neutral-100")}
            onClick={() => onChange(i + 1 === value ? 0 : i + 1)}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════ CycleBadge ═══════════════════ */

function CycleBadge<T extends string>({
  value,
  options,
  onChange,
  labels,
  className,
}: {
  value: T
  options: readonly T[]
  onChange: (v: T) => void
  labels?: Record<string, string>
  className?: string
}) {
  const cycle = useCallback(() => {
    const idx = options.indexOf(value)
    onChange(options[(idx + 1) % options.length])
  }, [value, options, onChange])

  return (
    <button
      className={cn("rounded-md px-1.5 py-[3px] text-[10.5px] font-medium nodrag transition-colors hover:bg-[rgba(0,0,23,0.065)]", className)}
      style={{ backgroundColor: "rgba(0,0,23,0.04)", color: "rgb(100,100,110)" }}
      onClick={cycle}
    >
      {labels?.[value] ?? value}
    </button>
  )
}

/* ═══════════════════ Section header (for accordion) ═══════════════════ */

const sectionColors: Record<string, string> = {
  when: "text-blue-500",
  want: "text-emerald-500",
  sothat: "text-violet-500",
  solution: "text-orange-500",
  barriers: "text-amber-600",
  problems: "text-red-500",
  meta: "text-neutral-400",
}

const sectionDots: Record<string, string> = {
  when: "bg-blue-500",
  want: "bg-emerald-500",
  sothat: "bg-violet-500",
  solution: "bg-orange-500",
  barriers: "bg-amber-500",
  problems: "bg-red-500",
  meta: "bg-neutral-400",
}

/* ═══════════════════ Main Component ═══════════════════ */

function JobNodeComponent({ id, data, selected }: NodeProps<JobNode>) {
  const { updateNodeData } = useFlowStore()
  const d = data as JobNodeData
  const style = levelStyles[d.level]
  const expanded = (d.viewMode ?? "note") !== "note"

  const update = useCallback(
    (partial: Partial<JobNodeData>) => updateNodeData(id, partial),
    [id, updateNodeData]
  )

  const toggleExpanded = useCallback(() => {
    update({ viewMode: expanded ? "note" : "microscope" })
  }, [expanded, update])

  const cycleLevel = useCallback(() => {
    const idx = LEVELS.indexOf(d.level)
    update({ level: LEVELS[(idx + 1) % LEVELS.length] })
  }, [d.level, update])

  const cycleType = useCallback(() => {
    const idx = JOB_TYPES.indexOf(d.jobType)
    update({ jobType: JOB_TYPES[(idx + 1) % JOB_TYPES.length] })
  }, [d.jobType, update])

  return (
    <div
      className="group relative rounded-xl bg-white"
      style={{
        boxShadow: selected ? selectedShadow : shadow,
        minWidth: expanded ? 280 : 200,
        maxWidth: 800,
      }}
    >
      <NodeResizer
        minWidth={expanded ? 280 : 200}
        maxWidth={800}
        minHeight={60}
        isVisible={!!selected}
        lineStyle={{ border: "none" }}
        handleStyle={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: "rgb(15,15,16)",
          border: "1.5px solid white",
        }}
      />
      <NodeHandles />

      {/* ── Header ── */}
      <div className="flex items-center gap-1.5 px-3 py-2">
        <button onClick={toggleExpanded} className="nodrag shrink-0" style={{ color: "rgb(140,140,150)" }}>
          <ChevronRight className={cn("size-3.5 transition-transform duration-150", expanded && "rotate-90")} />
        </button>
        <div className={cn("size-1.5 rounded-full shrink-0", style.dot)} />
        <InlineField
          value={d.label}
          onChange={(v) => update({ label: v })}
          placeholder="Название работы..."
          className="flex-1 min-w-0"
        />
      </div>

      {/* ── Badges ── */}
      <div className="flex items-center gap-1 px-3 pb-2 flex-wrap">
        <button className={cn("rounded-md px-1.5 py-[3px] text-[10.5px] font-semibold nodrag", style.badge, style.text)} onClick={cycleLevel}>
          {d.level}
        </button>
        <CycleBadge value={d.jobType} options={JOB_TYPES} onChange={(v) => update({ jobType: v })} labels={JOB_TYPE_LABELS} />
        <CycleBadge value={d.frequency} options={FREQUENCIES} onChange={(v) => update({ frequency: v })} labels={FREQUENCY_LABELS} />
        {d.importance > 0 && (
          <span className="text-[10px] font-semibold px-1.5 py-[3px] rounded-md tabular-nums" style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "rgb(14,165,233)" }}>
            {d.importance}/10
          </span>
        )}
        {d.problemSeverity > 0 && (
          <span className="text-[10px] font-semibold px-1.5 py-[3px] rounded-md tabular-nums" style={{ backgroundColor: d.problemSeverity >= 7 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", color: d.problemSeverity >= 7 ? "rgb(239,68,68)" : "rgb(245,158,11)" }}>
            боль {d.problemSeverity}/10
          </span>
        )}
      </div>

      {/* ── Summary (collapsed view) ── */}
      {!expanded && (d.summary || d.context || d.expectedResult || d.soThat) && (
        <div className="px-3 pb-2.5">
          {d.summary ? (
            <p className="text-[11.5px] leading-[1.5]" style={{ color: "rgb(120,120,130)" }}>
              {d.summary}
            </p>
          ) : (
            <div className="space-y-0.5">
              {d.context && (
                <p className="text-[11px] leading-[1.45]" style={{ color: "rgb(140,140,150)" }}>
                  <span className="font-semibold text-blue-500 text-[9.5px] uppercase tracking-wide mr-1">когда</span>
                  {d.context.length > 100 ? d.context.slice(0, 100) + "..." : d.context}
                </p>
              )}
              {d.expectedResult && (
                <p className="text-[11px] leading-[1.45]" style={{ color: "rgb(140,140,150)" }}>
                  <span className="font-semibold text-emerald-500 text-[9.5px] uppercase tracking-wide mr-1">хочу</span>
                  {d.expectedResult.length > 100 ? d.expectedResult.slice(0, 100) + "..." : d.expectedResult}
                </p>
              )}
              {d.soThat && (
                <p className="text-[11px] leading-[1.45]" style={{ color: "rgb(140,140,150)" }}>
                  <span className="font-semibold text-violet-500 text-[9.5px] uppercase tracking-wide mr-1">чтобы</span>
                  {d.soThat.length > 100 ? d.soThat.slice(0, 100) + "..." : d.soThat}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Expanded: Full accordion ── */}
      {expanded && (
        <div className="border-t border-[rgba(0,0,29,0.06)]">
          <Accordion type="multiple" defaultValue={["when", "want", "sothat", "solution", "barriers", "problems", "meta"]}>

            {/* ── КОГДА ── */}
            <AccordionItem value="when" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.when)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.when)}>Когда</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Контекст" value={d.context} onChange={(v) => update({ context: v })} multiline />
                  <InlineField label="Триггер" value={d.trigger} onChange={(v) => update({ trigger: v })} />
                  <div className="flex items-center gap-1.5">
                    <Label>Тип триггера</Label>
                    <CycleBadge value={d.triggerType} options={TRIGGER_TYPES} onChange={(v) => update({ triggerType: v })} labels={TRIGGER_LABELS} />
                  </div>
                  <InlineField label="Негативные эмоции (точка А)" value={d.emotionsA} onChange={(v) => update({ emotionsA: v })} multiline />
                  <InlineField label="Активирующее знание" value={d.activatingKnowledge} onChange={(v) => update({ activatingKnowledge: v })} multiline />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── ХОЧУ ── */}
            <AccordionItem value="want" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.want)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.want)}>Хочу</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Ожидаемый результат" value={d.expectedResult} onChange={(v) => update({ expectedResult: v })} multiline />
                  <InlineField label="Критерии успеха" value={d.successCriteria} onChange={(v) => update({ successCriteria: v })} multiline />
                  <InlineField label="Направление ценности" value={d.valueDirection} onChange={(v) => update({ valueDirection: v })} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── ЧТОБЫ ── */}
            <AccordionItem value="sothat" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.sothat)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.sothat)}>Чтобы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Работа выше уровнем (Big Job)" value={d.soThat} onChange={(v) => update({ soThat: v })} multiline />
                  <InlineField label="Позитивные эмоции (точка Б)" value={d.emotionsB} onChange={(v) => update({ emotionsB: v })} multiline />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── ТЕКУЩЕЕ РЕШЕНИЕ ── */}
            <AccordionItem value="solution" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.solution)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.solution)}>Текущее решение</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Текущее решение" value={d.currentSolution} onChange={(v) => update({ currentSolution: v })} multiline />
                  <RatingBar value={d.solutionSatisfaction} onChange={(v) => update({ solutionSatisfaction: v })} label="Удовлетворённость решением" scheme="satisfaction" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── БАРЬЕРЫ ── */}
            <AccordionItem value="barriers" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.barriers)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.barriers)}>Барьеры</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Барьеры к решению" value={d.barriersToSolution} onChange={(v) => update({ barriersToSolution: v })} multiline />
                  <InlineField label="Барьеры к работе" value={d.barriersToJob} onChange={(v) => update({ barriersToJob: v })} multiline />
                  <InlineField label="Consideration set (альтернативы)" value={d.considerationSet} onChange={(v) => update({ considerationSet: v })} multiline />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── ПРОБЛЕМЫ ── */}
            <AccordionItem value="problems" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.problems)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.problems)}>Проблемы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <InlineField label="Проблемы" value={d.problems} onChange={(v) => update({ problems: v })} multiline />
                  <RatingBar value={d.problemSeverity} onChange={(v) => update({ problemSeverity: v })} label="Сила проблемы" scheme="severity" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ── МЕТА ── */}
            <AccordionItem value="meta" className="border-none">
              <AccordionTrigger className="py-1.5 px-3 nodrag hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", sectionDots.meta)} />
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-wide", sectionColors.meta)}>Мета</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-0">
                <div className="space-y-2 rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                  <RatingBar value={d.importance} onChange={(v) => update({ importance: v })} label="Важность" scheme="importance" />
                  <InlineField label="Бизнес-работа" value={d.businessJob} onChange={(v) => update({ businessJob: v })} multiline />
                  <InlineField label="Личная работа ЛПР" value={d.personalJob} onChange={(v) => update({ personalJob: v })} multiline />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      )}
    </div>
  )
}

export const JobNodeMemo = memo(JobNodeComponent)
export default JobNodeMemo
