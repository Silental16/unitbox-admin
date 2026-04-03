"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { HeartIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon,
  PackageIcon,
  LayersIcon,
  PickaxeIcon,
  TrendingUpIcon,
  BotIcon,
  SearchIcon,
  WandIcon,
  RocketIcon,
  CalendarRangeIcon,
  ZapIcon,
  ShipIcon,
  TrophyIcon,
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
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MechanicSheet } from "@/components/mechanics/mechanic-sheet"
import {
  mechanics,
  CATEGORY_LABELS,
  type Mechanic,
  type MechanicCategory,
} from "@/lib/data/mechanics"

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

export function MechanicsClient() {
  const [search, setSearch] = useState("")
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const saved = localStorage.getItem("liked-mechanics")
      if (saved) setLikedIds(new Set(JSON.parse(saved)))
    } catch { /* ignore */ }
  }, [])

  const toggleLike = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem("liked-mechanics", JSON.stringify([...next]))
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    if (!search) return mechanics
    const q = search.toLowerCase()
    return mechanics.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q)
    )
  }, [search])

  const grouped = useMemo(() => {
    const map = new Map<MechanicCategory, Mechanic[]>()
    for (const m of filtered) {
      const list = map.get(m.category) ?? []
      list.push(m)
      map.set(m.category, list)
    }
    return map
  }, [filtered])

  function handleSelect(mechanic: Mechanic) {
    setSelectedMechanic(mechanic)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Механики
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mechanics.length} бизнес-фреймворков и AI-стратегий
        </p>
      </div>

      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, автору..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {grouped.size === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Ничего не найдено
        </p>
      )}

      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((mechanic) => {
              const Icon = ICON_MAP[mechanic.icon]
              return (
                <Card
                  key={mechanic.id}
                  className="group/card flex flex-col gap-2 p-4 cursor-pointer transition-colors hover:bg-accent/50 relative"
                  onClick={() => handleSelect(mechanic)}
                >
                  <button
                    type="button"
                    onClick={(e) => toggleLike(mechanic.id, e)}
                    className={`absolute top-3 right-3 flex size-8 items-center justify-center rounded-full transition-all duration-150 hover:bg-muted ${likedIds.has(mechanic.id) ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"} focus-visible:opacity-100`}
                    aria-label={likedIds.has(mechanic.id) ? "Unlike" : "Like"}
                  >
                    <HeartIcon
                      className={`size-4 transition-all duration-300 ${
                        likedIds.has(mechanic.id)
                          ? "fill-red-500 text-red-500 scale-110"
                          : "fill-none text-muted-foreground hover:text-foreground"
                      }`}
                      style={{
                        transform: likedIds.has(mechanic.id) ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s, fill 0.2s",
                      }}
                    />
                  </button>
                  <div className="flex items-start gap-3">
                    {Icon && (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 min-w-0 pr-6">
                      <span className="text-sm font-medium leading-tight">
                        {mechanic.title}
                      </span>
                      <Badge variant="outline" className="w-fit text-[11px]">
                        {mechanic.author}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {mechanic.summary}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      <MechanicSheet
        mechanic={selectedMechanic}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
