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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  { value: "not_started", label: "Not Started", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "in_progress", label: "In Progress", dot: "bg-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  { value: "completed", label: "Done", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
]

const THREAT_LEVEL_CONFIG: Record<ThreatLevel, { label: string; bg: string; text: string }> = {
  high: { label: "HIGH", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
  medium: { label: "MEDIUM", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" },
  low: { label: "LOW", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300" },
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
const DEFAULT_WIDTH = 500

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
    <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50 last:border-b-0">
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

interface DossierBlockProps {
  title: string
  content: string
}

function DossierBlock({ title, content }: DossierBlockProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content ? (
          <div className="space-y-2">
            {content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No analysis yet</p>
        )}
      </CardContent>
    </Card>
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
    ...(competitor.geo ? [{ label: "Geo", value: competitor.geo }] : []),
    ...(competitor.businessModel ? [{ label: "Business Model", value: competitor.businessModel }] : []),
    ...(competitor.sizeSignal ? [{ label: "Size Signal", value: competitor.sizeSignal }] : []),
    ...(competitor.whatItDoes ? [{ label: "What It Does", value: competitor.whatItDoes }] : []),
    ...(competitor.confidence ? [{ label: "Confidence", value: competitor.confidence }] : []),
    ...(competitor.researchedAt
      ? [{ label: "Last Research", value: new Date(competitor.researchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) }]
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
            {/* Row 1: Title */}
            <SheetTitle className="text-lg">{competitor.name}</SheetTitle>

            {/* Row 2: Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Threat Level */}
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
                            <span className={`inline-flex items-center rounded-md px-1.5 py-px text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              })()}
              {/* Research Status */}
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

            {/* Row 3: URL */}
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

          <div className="flex flex-col gap-6 p-6">
            {/* Key-Value Parameters */}
            <div>
              {kvRows.map((row) => (
                <KVRow key={row.label} {...row} />
              ))}
            </div>

            {/* 10 Dossier Blocks */}
            <DossierBlock title="Snapshot" content={competitor.snapshot} />
            <DossierBlock title="Product Analysis" content={competitor.productAnalysis} />
            <DossierBlock title="Target Market" content={competitor.targetMarket} />
            <DossierBlock title="Business Model / Pricing" content={competitor.pricingModel} />
            <DossierBlock title="Distribution & GTM" content={competitor.distributionGtm} />
            <DossierBlock title="Marketing & Messaging" content={competitor.marketing} />
            <DossierBlock title="Tech Stack" content={competitor.techStack} />

            {/* Strengths & Weaknesses — split */}
            <Card size="sm">
              <CardHeader>
                <CardTitle>Strengths & Weaknesses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Strengths</p>
                  {competitor.strengths ? (
                    <div className="space-y-2">
                      {competitor.strengths.split("\n\n").map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed">{p}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No analysis yet</p>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Weaknesses</p>
                  {competitor.weaknesses ? (
                    <div className="space-y-2">
                      {competitor.weaknesses.split("\n\n").map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed">{p}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No analysis yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <DossierBlock title="Threat to Unitbox" content={competitor.threatAssessment} />
            <DossierBlock title="Attack Vectors" content={competitor.attackVectors} />

            {/* Notes textarea */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Notes</p>
              <Textarea
                placeholder="Add notes about this competitor..."
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
