"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ExternalLinkIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Competitor, CompetitorResearchStatus, ThreatLevel } from "@/lib/data/competitors"

const RESEARCH_OPTIONS: { value: CompetitorResearchStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "not_started", label: "Не начато", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "in_progress", label: "В процессе", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "completed", label: "Готово", dot: "bg-emerald-500", bg: "bg-muted", text: "text-foreground" },
]

const THREAT_LEVEL_CONFIG: Record<ThreatLevel, { label: string; bg: string; text: string }> = {
  high: { label: "HIGH", bg: "bg-destructive/10", text: "text-destructive" },
  medium: { label: "MEDIUM", bg: "bg-muted", text: "text-foreground" },
  low: { label: "LOW", bg: "bg-muted", text: "text-foreground" },
}

const CHAIN_LINK_LABELS: Record<string, string> = {
  developer: "Developer Tools",
  agent: "Agent Tools",
  buyer: "Buyer-Facing",
  developer_agent: "Dev+Agent",
  agent_buyer: "Agent+Buyer",
  full_stack: "Full Stack",
}

const MIN_WIDTH = 400
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 560

interface CompetitorSheetProps {
  competitor: Competitor | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onResearchStatusChange: (competitorId: string, status: CompetitorResearchStatus) => void
  onThreatLevelChange: (competitorId: string, level: ThreatLevel) => void
  onNotesChange: (competitorId: string, notes: string) => void
}

function KVRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline break-words"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm font-medium break-words">{value}</span>
      )}
    </div>
  )
}

function RichText({ content }: { content: string }) {
  if (!content) {
    return <p className="text-sm text-muted-foreground italic">Анализ ещё не проведён</p>
  }

  const lines = content.split(/\n|(?<=[.!?])\s+(?=[•\-\d])|(?<=\.)\s+(?=[А-ЯA-Z])/g).filter(Boolean)

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null

        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("— ")
        const isNumbered = /^\d+[.)]/.test(trimmed)

        if (isBullet) {
          const text = trimmed.replace(/^[•\-—]\s*/, "")
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-muted-foreground shrink-0 mt-0.5">•</span>
              <span className="text-sm leading-relaxed">{text}</span>
            </div>
          )
        }

        if (isNumbered) {
          const match = trimmed.match(/^(\d+[.)]\s*)(.+)/)
          if (match) {
            return (
              <div key={i} className="flex gap-2 pl-1">
                <span className="text-muted-foreground shrink-0 mt-0.5 tabular-nums text-sm">{match[1]}</span>
                <span className="text-sm leading-relaxed">{match[2]}</span>
              </div>
            )
          }
        }

        return (
          <p key={i} className="text-sm leading-relaxed">{trimmed}</p>
        )
      })}
    </div>
  )
}

interface DossierSectionProps {
  title: string
  content: string
}

function DossierSection({ title, content }: DossierSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <RichText content={content} />
    </section>
  )
}

export function CompetitorSheet({
  competitor,
  open,
  onOpenChange,
  onResearchStatusChange,
  onThreatLevelChange,
  onNotesChange,
}: CompetitorSheetProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    if (open) setWidth(DEFAULT_WIDTH)
  }, [open])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    startX.current = e.clientX
    startWidth.current = width
  }, [width])

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startX.current - e.clientX
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  if (!competitor) return null

  const threat = THREAT_LEVEL_CONFIG[competitor.threatLevel]

  const kvRows: { label: string; value: string; href?: string }[] = [
    ...(competitor.geo ? [{ label: "География", value: competitor.geo }] : []),
    ...(competitor.businessModel ? [{ label: "Бизнес-модель", value: competitor.businessModel }] : []),
    ...(competitor.sizeSignal ? [{ label: "Масштаб", value: competitor.sizeSignal }] : []),
    ...(competitor.whatItDoes ? [{ label: "Что делает", value: competitor.whatItDoes }] : []),
    ...(competitor.researchedAt
      ? [{ label: "Исследовано", value: new Date(competitor.researchedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }) }]
      : []),
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className={`!max-w-none overflow-hidden p-0 flex flex-col ${dragging ? "select-none" : ""}`}
        style={{ width }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-3 -translate-x-1/2 cursor-col-resize z-[60] group"
        >
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors ${dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"}`} />
        </div>

        <ScrollArea className="flex-1 min-h-0 overscroll-contain">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 pr-12 space-y-3">
            <SheetTitle className="text-lg">{competitor.name}</SheetTitle>

            <div className="flex flex-wrap items-center gap-1.5">
              {(() => {
                const THREAT_OPTIONS: ThreatLevel[] = ["high", "medium", "low"]
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${threat.bg} ${threat.text}`}>
                        {threat.label}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {THREAT_OPTIONS.map((level) => {
                        const cfg = THREAT_LEVEL_CONFIG[level]
                        return (
                          <DropdownMenuItem
                            key={level}
                            onClick={() => onThreatLevelChange(competitor.id, level)}
                            className="gap-2"
                          >
                            <span className={`inline-flex items-center rounded-md px-1.5 py-px text-[11px] font-semibold ${cfg.bg} ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              })()}

              {(() => {
                const opt = RESEARCH_OPTIONS.find((o) => o.value === competitor.researchStatus) ?? RESEARCH_OPTIONS[0]
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${opt.bg} ${opt.text}`}>
                        <span className={`size-1.5 rounded-full shrink-0 ${opt.dot}`} />
                        {opt.label}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {RESEARCH_OPTIONS.map((o) => (
                        <DropdownMenuItem
                          key={o.value}
                          onClick={() => onResearchStatusChange(competitor.id, o.value)}
                          className="gap-2"
                        >
                          <span className={`size-1.5 rounded-full ${o.dot}`} />
                          {o.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              })()}

              <Badge variant="outline">
                {CHAIN_LINK_LABELS[competitor.chainLink] ?? competitor.chainLink}
              </Badge>
            </div>

            {competitor.url && (
              <SheetDescription className="text-xs leading-relaxed">
                <a
                  href={competitor.url.startsWith("http") ? competitor.url : `https://${competitor.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {competitor.url}
                  <ExternalLinkIcon className="size-3" />
                </a>
              </SheetDescription>
            )}
          </SheetHeader>

          <Separator />

          <div className="flex flex-col gap-8 p-6">
            {/* Key-Value Parameters */}
            <div>
              {kvRows.map((row) => (
                <KVRow key={row.label} {...row} />
              ))}
            </div>

            <Separator />

            {/* Dossier — article-style sections, no card borders */}
            <DossierSection title="Обзор" content={competitor.snapshot} />
            <DossierSection title="Продукт" content={competitor.productAnalysis} />
            <DossierSection title="Целевой рынок" content={competitor.targetMarket} />
            <DossierSection title="Бизнес-модель и ценообразование" content={competitor.pricingModel} />
            <DossierSection title="Дистрибуция и GTM" content={competitor.distributionGtm} />
            <DossierSection title="Маркетинг" content={competitor.marketing} />
            <DossierSection title="Технологический стек" content={competitor.techStack} />

            {/* Strengths & Weaknesses */}
            <section>
              <h3 className="text-sm font-semibold mb-2">Сильные стороны</h3>
              <RichText content={competitor.strengths} />
            </section>

            <section>
              <h3 className="text-sm font-semibold mb-2">Слабые стороны</h3>
              <RichText content={competitor.weaknesses} />
            </section>

            <Separator />

            <DossierSection title="Угроза для Unitbox" content={competitor.threatAssessment} />
            <DossierSection title="Векторы атаки" content={competitor.attackVectors} />

            <Separator />

            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Заметки</h3>
              <Textarea
                placeholder="Добавьте заметки..."
                value={competitor.notes}
                onChange={(e) => onNotesChange(competitor.id, e.target.value)}
                className="min-h-[60px] text-sm resize-y"
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
