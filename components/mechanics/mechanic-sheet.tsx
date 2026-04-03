"use client"

import { useState, useCallback, useEffect, useRef } from "react"
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
import { CATEGORY_LABELS, type Mechanic } from "@/lib/data/mechanics"

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

export function MechanicSheet({ mechanic, open, onOpenChange }: MechanicSheetProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    if (open) setWidth(DEFAULT_WIDTH)
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
          {/* Header */}
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
            {/* What is it */}
            <section>
              <h3 className="text-sm font-semibold mb-2">Что это</h3>
              <p className="text-sm leading-relaxed">{mechanic.whatIsIt}</p>
            </section>

            <Separator />

            {/* How it works */}
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

            {/* Key insight */}
            <section>
              <h3 className="text-sm font-semibold mb-2">Ключевой инсайт</h3>
              <div className="border-l-4 border-primary/40 pl-4 py-2">
                <p className="text-sm leading-relaxed italic">{mechanic.keyInsight}</p>
              </div>
            </section>

            <Separator />

            {/* Examples */}
            <section>
              <h3 className="text-sm font-semibold mb-3">Примеры</h3>
              <div className="flex flex-col gap-2">
                {mechanic.examples.map((example, i) => (
                  <Card key={i} className="p-3">
                    <p className="text-sm font-medium">{example.company}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {example.detail}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Unitbox application */}
            <section>
              <h3 className="text-sm font-semibold mb-2">Применение в Unitbox</h3>
              <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-4">
                <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                  {mechanic.unitboxApplication}
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
