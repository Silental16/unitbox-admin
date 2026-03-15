"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { CheckIcon, XIcon, ExternalLinkIcon, MapPinIcon, CalendarIcon, HomeIcon, DollarSignIcon, LayersIcon, TrendingUpIcon } from "lucide-react"
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
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Developer, ResearchStatus, SalesStatus } from "@/lib/data/developers"
import { SALES_STATUSES } from "@/lib/data/developers"
import { calculateIcpScore, getScoreTier } from "@/lib/data/scoring"

const RESEARCH_OPTIONS: { value: ResearchStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "not_started", label: "Not Started", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "outdated", label: "Outdated", dot: "bg-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  { value: "ready", label: "Ready", dot: "bg-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  { value: "completed", label: "Done", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
]

const MIN_WIDTH = 400
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 500

interface DeveloperSheetProps {
  developer: Developer | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onResearchStatusChange: (developerId: string, status: ResearchStatus) => void
  onSalesStatusChange: (developerId: string, status: SalesStatus) => void
}

function statusBadge(status: string) {
  switch (status) {
    case "presale":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          Presale
        </Badge>
      )
    case "building":
    case "construction":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          Building
        </Badge>
      )
    case "completed":
      return <Badge variant="secondary">Completed</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function icpBadgeClass(tier: string) {
  switch (tier) {
    case "high":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
    case "medium":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
    default:
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
  }
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

export function DeveloperSheet({
  developer,
  open,
  onOpenChange,
  onResearchStatusChange,
  onSalesStatusChange,
}: DeveloperSheetProps) {
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

  if (!developer) return null

  const score = calculateIcpScore(developer)
  const tier = getScoreTier(score)

  // Build key-value rows, skipping empty values
  const kvRows: { label: string; value: string; href?: string }[] = [
    ...(developer.origin ? [{ label: "Origin", value: developer.origin }] : []),
    ...(developer.founder ? [{ label: "Founder", value: developer.founder }] : []),
    { label: "Projects", value: `${developer.activeProjects} active / ${developer.projects} total` },
    ...(developer.activeUnits ? [{ label: "Units Building", value: developer.activeUnits.toLocaleString() }] : []),
    ...(developer.priceRange ? [{ label: "Price Range", value: developer.priceRange }] : []),
    ...(developer.aum ? [{ label: "AUM", value: developer.aum }] : []),
    { label: "Agent Program", value: developer.hasAgent ? "Yes" : "No" },
    ...(developer.website
      ? [{ label: "Website", value: developer.website, href: `https://${developer.website}` }]
      : []),
    ...(developer.instagram
      ? [{
          label: "Instagram",
          value: developer.instagram,
          href: `https://instagram.com/${developer.instagram.replace("@", "")}`,
        }]
      : []),
    ...(developer.whatsapp
      ? [{
          label: "WhatsApp",
          value: developer.whatsapp,
          href: `https://wa.me/${developer.whatsapp.replace(/[^0-9]/g, "")}`,
        }]
      : []),
    ...(developer.email
      ? [{ label: "Email", value: developer.email, href: `mailto:${developer.email}` }]
      : []),
    ...(developer.contacts?.telegram
      ? [{ label: "Telegram", value: "Open", href: developer.contacts.telegram }]
      : []),
    ...(developer.researchedAt
      ? [{ label: "Last Research", value: new Date(developer.researchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) }]
      : []),
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className={`!max-w-none overflow-visible p-0 flex flex-col ${dragging ? "select-none" : ""}`}
        style={{ width }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-3 -translate-x-1/2 cursor-col-resize z-[60] group"
        >
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors ${dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"}`} />
        </div>

        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 pr-12 space-y-3">
          {/* Row 1: Title */}
          <SheetTitle className="text-lg">{developer.name}</SheetTitle>

          {/* Row 2: Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Sales Status */}
            {(() => {
              const sales = SALES_STATUSES.find((s) => s.value === developer.salesStatus) ?? SALES_STATUSES[0]
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer ${sales.bg} ${sales.text}`}>
                      <span className={`size-1.5 rounded-full shrink-0 ${sales.dot}`} />
                      {sales.label}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {SALES_STATUSES.map((s) => (
                      <DropdownMenuItem
                        key={s.value}
                        onClick={() => onSalesStatusChange(developer.id, s.value)}
                        className="gap-2"
                      >
                        <span className={`size-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })()}
            {/* Research Status */}
            {(() => {
              const opt = RESEARCH_OPTIONS.find((o) => o.value === developer.researchStatus) ?? RESEARCH_OPTIONS[0]
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
                        onClick={() => onResearchStatusChange(developer.id, o.value)}
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
            <Badge className={`tabular-nums ${icpBadgeClass(tier)}`}>
              ICP {score}
            </Badge>
            {developer.origin && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                {developer.origin}
              </span>
            )}
          </div>

          {/* Row 3: Pitch */}
          {developer.pitch && (
            <SheetDescription className="text-xs leading-relaxed">
              {developer.pitch}
            </SheetDescription>
          )}
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col gap-6 p-6">
            {/* Key-Value Parameters */}
            <div>
              {kvRows.map((row) => (
                <KVRow key={row.label} {...row} />
              ))}
            </div>

            {/* Projects Table */}
            <Card size="sm" className="overflow-hidden">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardAction>
                  <Badge variant="secondary" className="tabular-nums">
                    {developer.projectList.length}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="!px-0">
                <Table className="table-fixed">
                  <TableBody>
                    {[...developer.projectList]
                      .sort((a, b) => {
                        const order: Record<string, number> = { presale: 0, building: 1, completed: 2 }
                        const sa = order[a.status] ?? 1
                        const sb = order[b.status] ?? 1
                        if (sa !== sb) return sa - sb
                        if (!a.completion && !b.completion) return 0
                        if (!a.completion) return 1
                        if (!b.completion) return -1
                        return b.completion.localeCompare(a.completion)
                      })
                      .map((project, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-3 whitespace-normal" colSpan={2}>
                          <div className="space-y-2">
                            {/* Name + Status */}
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-sm">
                                {project.url ? (
                                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                    {project.name}
                                  </a>
                                ) : project.name}
                              </p>
                              {statusBadge(project.status)}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap items-center gap-1">
                              {project.location && (
                                <a
                                  href={project.mapUrl || `https://www.google.com/maps/search/${encodeURIComponent(project.location + ", Bali")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-px text-[11px] text-primary hover:bg-muted/80 transition-colors"
                                >
                                  <MapPinIcon className="size-2.5 shrink-0" />
                                  {project.location}
                                </a>
                              )}
                              {project.type && (
                                <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-px text-[11px] text-muted-foreground">
                                  <HomeIcon className="size-2.5 shrink-0" />
                                  {project.type}
                                </span>
                              )}
                              {project.units && (
                                <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-px text-[11px] text-muted-foreground">
                                  <LayersIcon className="size-2.5 shrink-0" />
                                  {project.units}
                                </span>
                              )}
                              {project.price && (
                                <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-px text-[11px] text-muted-foreground">
                                  <DollarSignIcon className="size-2.5 shrink-0" />
                                  {project.price}
                                </span>
                              )}
                              {project.completion && (
                                <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-px text-[11px] text-muted-foreground">
                                  <CalendarIcon className="size-2.5 shrink-0" />
                                  {project.completion}
                                </span>
                              )}
                              {project.roi && (
                                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-px text-[11px] text-emerald-700">
                                  <TrendingUpIcon className="size-2.5 shrink-0" />
                                  {project.roi}
                                </span>
                              )}
                            </div>

                            {/* Description / Notes */}
                            {(project.description || project.notes) && (
                              <p className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-3">
                                {project.description || project.notes}
                              </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
