"use client"

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon,
  PackageIcon,
  LayersIcon,
  PickaxeIcon,
  TrendingUpIcon,
  BotIcon,
  WandIcon,
  RocketIcon,
  CalendarRangeIcon,
  ZapIcon,
  ShipIcon,
  TrophyIcon,
  SearchIcon,
  BadgeDollarSignIcon,
  MailIcon,
  FileTextIcon,
  GlobeIcon,
  CompassIcon,
  PieChartIcon,
  LinkedinIcon,
  RouteIcon,
  WorkflowIcon,
  UserCogIcon,
  BrainIcon,
  UsersRoundIcon,
  HeadphonesIcon,
  BookOpenIcon,
  RadarIcon,
  NetworkIcon,
  NewspaperIcon,
  MegaphoneIcon,
  BookmarkCheckIcon,
  FilmIcon,
  DatabaseIcon,
  Share2Icon,
  ShieldAlertIcon,
  BlocksIcon,
  ReceiptIcon,
  TargetIcon,
  CrownIcon,
  ReplaceIcon,
  SproutIcon,
  CpuIcon,
  ArrowRightLeftIcon,
  PersonStandingIcon,
  DollarSignIcon,
  MedalIcon,
} from "lucide-react"
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
import { Card } from "@/components/ui/card"
import { CATEGORY_LABELS, type Mechanic, type MechanicExample } from "@/lib/data/mechanics"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users: UsersIcon,
  Briefcase: BriefcaseIcon,
  Building: BuildingIcon,
  Package: PackageIcon,
  Layers: LayersIcon,
  Pickaxe: PickaxeIcon,
  TrendingUp: TrendingUpIcon,
  Bot: BotIcon,
  Wand: WandIcon,
  Rocket: RocketIcon,
  CalendarRange: CalendarRangeIcon,
  Zap: ZapIcon,
  Ship: ShipIcon,
  Trophy: TrophyIcon,
  Search: SearchIcon,
  BadgeDollarSign: BadgeDollarSignIcon,
  Mail: MailIcon,
  FileText: FileTextIcon,
  Globe: GlobeIcon,
  Compass: CompassIcon,
  PieChart: PieChartIcon,
  Linkedin: LinkedinIcon,
  Route: RouteIcon,
  Workflow: WorkflowIcon,
  UserCog: UserCogIcon,
  Brain: BrainIcon,
  UsersRound: UsersRoundIcon,
  Headphones: HeadphonesIcon,
  BookOpen: BookOpenIcon,
  Radar: RadarIcon,
  Network: NetworkIcon,
  Newspaper: NewspaperIcon,
  Megaphone: MegaphoneIcon,
  BookmarkCheck: BookmarkCheckIcon,
  Film: FilmIcon,
  Database: DatabaseIcon,
  Share2: Share2Icon,
  ShieldAlert: ShieldAlertIcon,
  Blocks: BlocksIcon,
  Receipt: ReceiptIcon,
  Target: TargetIcon,
  Crown: CrownIcon,
  Replace: ReplaceIcon,
  Sprout: SproutIcon,
  Cpu: CpuIcon,
  ArrowRightLeft: ArrowRightLeftIcon,
  PersonStanding: PersonStandingIcon,
  DollarSign: DollarSignIcon,
  Medal: MedalIcon,
}

const MIN_WIDTH = 400
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 560

interface MechanicSheetProps {
  mechanic: Mechanic | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CaseStudySection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold mb-2">{label}</h3>
      <p className="text-sm leading-relaxed whitespace-pre-line">{children}</p>
    </section>
  )
}

export function MechanicSheet({ mechanic, open, onOpenChange }: MechanicSheetProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const [activeCase, setActiveCase] = useState<MechanicExample | null>(null)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    if (open) {
      setWidth(DEFAULT_WIDTH)
      setActiveCase(null)
    }
  }, [open])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragging(true)
      startX.current = e.clientX
      startWidth.current = width
    },
    [width]
  )

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

  if (!mechanic) return null

  const Icon = ICON_MAP[mechanic.icon]

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
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors ${
              dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"
            }`}
          />
        </div>

        <ScrollArea className="flex-1 min-h-0 overscroll-contain">
          {activeCase ? (
            /* ── Case Study Drill-Down ── */
            <>
              <div className="px-6 pt-6 pb-4 pr-12 space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 -ml-2 text-muted-foreground"
                  onClick={() => setActiveCase(null)}
                >
                  <ArrowLeftIcon className="size-4" />
                  Назад к {mechanic.title}
                </Button>
                <h2 className="text-lg font-semibold">{activeCase.company}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeCase.detail}
                </p>
              </div>

              <Separator />

              {activeCase.caseStudy ? (
                <div className="flex flex-col gap-6 p-6">
                  {/* v2 sections (9-section deep research) */}
                  {activeCase.caseStudy.mechanicInAction && (
                    <>
                      <CaseStudySection label="Механика в действии">
                        {activeCase.caseStudy.mechanicInAction}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.jtbd && (
                    <>
                      <CaseStudySection label="JTBD клиента">
                        {activeCase.caseStudy.jtbd}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.monetization && (
                    <>
                      <CaseStudySection label="Монетизация">
                        {activeCase.caseStudy.monetization}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.marketing && (
                    <>
                      <CaseStudySection label="Маркетинг и дистрибуция">
                        {activeCase.caseStudy.marketing}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.impact && (
                    <>
                      <CaseStudySection label="До/После — импакт">
                        {activeCase.caseStudy.impact}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.tocConstraint && (
                    <>
                      <CaseStudySection label="Ограничение (TOC)">
                        {activeCase.caseStudy.tocConstraint}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.trizContradictions && (
                    <>
                      <CaseStudySection label="Противоречия (TRIZ)">
                        {activeCase.caseStudy.trizContradictions}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.conditions && (
                    <>
                      <CaseStudySection label="Условия успеха">
                        {activeCase.caseStudy.conditions}
                      </CaseStudySection>
                      <Separator />
                    </>
                  )}

                  {activeCase.caseStudy.mvpVersion && (
                    <section>
                      <h3 className="text-sm font-semibold mb-2">MVP версия</h3>
                      <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 p-4">
                        <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-200 whitespace-pre-line">
                          {activeCase.caseStudy.mvpVersion}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* v1 legacy sections (fallback for old data) */}
                  {!activeCase.caseStudy.mechanicInAction && activeCase.caseStudy.whatTheyDo && (
                    <>
                      <CaseStudySection label="Что делает компания">
                        {activeCase.caseStudy.whatTheyDo}
                      </CaseStudySection>
                      <Separator />
                      <CaseStudySection label="История создания">
                        {activeCase.caseStudy.originStory}
                      </CaseStudySection>
                      <Separator />
                      <CaseStudySection label="Финансы и метрики">
                        {activeCase.caseStudy.financials}
                      </CaseStudySection>
                      <Separator />
                      <CaseStudySection label="Как используют механику">
                        {activeCase.caseStudy.howTheyUseIt}
                      </CaseStudySection>
                      <Separator />
                      <CaseStudySection label="Ключевые клиенты">
                        {activeCase.caseStudy.keyClients}
                      </CaseStudySection>
                      <Separator />
                      <section>
                        <h3 className="text-sm font-semibold mb-2">Уроки для Unitbox</h3>
                        <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-4">
                          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200 whitespace-pre-line">
                            {activeCase.caseStudy.lessonsForUnitbox}
                          </p>
                        </div>
                      </section>
                    </>
                  )}
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-sm text-muted-foreground italic">
                    Подробный кейс ещё не заполнен. Скоро будет добавлен.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* ── Main Mechanic View ── */
            <>
              <SheetHeader className="px-6 pt-6 pb-4 pr-12 space-y-3">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                  )}
                  <SheetTitle className="text-lg">{mechanic.title}</SheetTitle>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline">{mechanic.author}</Badge>
                  <Badge variant="secondary">{CATEGORY_LABELS[mechanic.category]}</Badge>
                </div>

                <SheetDescription className="text-sm leading-relaxed">
                  {mechanic.summary}
                </SheetDescription>
              </SheetHeader>

              <Separator />

              <div className="flex flex-col gap-6 p-6">
                <section>
                  <h3 className="text-sm font-semibold mb-2">Что это</h3>
                  <p className="text-sm leading-relaxed">{mechanic.whatIsIt}</p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm font-semibold mb-2">Как работает</h3>
                  <ol className="space-y-2">
                    {mechanic.howItWorks.map((step, i) => (
                      <li key={i} className="flex gap-2 pl-1">
                        <span className="text-muted-foreground shrink-0 mt-0.5 tabular-nums text-sm font-medium">
                          {i + 1}.
                        </span>
                        <span className="text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm font-semibold mb-2">Ключевой инсайт</h3>
                  <div className="border-l-4 border-primary/40 pl-4 py-2">
                    <p className="text-sm leading-relaxed italic">{mechanic.keyInsight}</p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm font-semibold mb-3">Примеры</h3>
                  <div className="flex flex-col gap-2">
                    {mechanic.examples.map((example, i) => (
                      <Card
                        key={i}
                        className={`p-3 ${example.caseStudy ? "cursor-pointer transition-colors hover:bg-accent/50" : ""}`}
                        onClick={() => example.caseStudy && setActiveCase(example)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{example.company}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {example.detail}
                            </p>
                          </div>
                          {example.caseStudy && (
                            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm font-semibold mb-2">Применение в Unitbox</h3>
                  <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-4">
                    <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                      {mechanic.unitboxApplication}
                    </p>
                  </div>
                </section>
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
