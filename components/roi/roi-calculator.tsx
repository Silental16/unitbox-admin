"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react"
import {
  Clock,
  TrendingUp,
  Users,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle,
  Link2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Utilities ──

function fmt(n: number): string {
  return n.toLocaleString("ru-RU")
}

function fmtDec(n: number, decimals: number = 2): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function suggestPlan(units: number): string {
  if (units <= 50) return "300"
  if (units <= 100) return "500"
  if (units <= 240) return "1000"
  return "2000"
}

function suggestOffers(units: number): number {
  return Math.max(5, Math.round(units * 0.3))
}

// ── Constants ──

const STATS = {
  totalOffers: 1315,
  totalAgents: 152,
  totalCountries: 86,
  breigOffers: 630,
} as const

const planLabels: Record<string, string> = {
  "300": "Starter — $300/мес",
  "500": "Standard — $500/мес",
  "1000": "Pro — $1 000/мес",
  "2000": "Enterprise — $2 000/мес",
}

const featuresSavingsConfig = [
  { label: "Наличие без звонков", timeSavedPerEvent: 10, eventsMultiplier: "staff12" as const },
  { label: "Интерактивные фасады", timeSavedPerEvent: 15, eventsMultiplier: "staff8" as const },
  { label: "Финансовые модели в оффере", timeSavedPerEvent: 20, eventsMultiplier: "offers03" as const },
  { label: "CRM-синхронизация", timeSavedPerEvent: 5, eventsMultiplier: "offers" as const },
  { label: "Документы и видео", timeSavedPerEvent: 8, eventsMultiplier: "staff5" as const },
]

const howItWorks = [
  {
    icon: Users,
    title: "Агент видит наличие без звонков",
    before: "Звонит в офис, ждёт 24-48ч",
    after: "Каталог → фильтр → 30 секунд",
  },
  {
    icon: Clock,
    title: "Оффер готов за 2 минуты",
    before: "3 источника данных, 30 минут",
    after: "Агент создаёт сам за 2 минуты",
  },
  {
    icon: RefreshCw,
    title: "Данные синхронизируются сами",
    before: "Вручную: Excel, CRM, чаты",
    after: "Автосинхронизация CRM ↔ Unitbox",
  },
]

// ── Animation variants ──

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.5,
}

function AnimatedNumber({
  value,
  format = fmt,
}: {
  value: number
  format?: (n: number) => string
}) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { bounce: 0, duration: 600 })
  const display = useTransform(spring, (v) => format(Math.round(v)))

  useEffect(() => {
    mv.set(value)
  }, [value, mv])

  return <motion.span>{display}</motion.span>
}

// ── Component ──

export function RoiCalculator() {
  const [units, setUnits] = useState(100)
  const [price, setPrice] = useState(150000)
  const [offers, setOffers] = useState(30)
  const [staff, setStaff] = useState(2)
  const [plan, setPlan] = useState("500")
  const [copied, setCopied] = useState(false)
  const isInitialMount = useRef(true)

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pUnits = params.get("units")
    const pPrice = params.get("price")
    const pOffers = params.get("offers")
    const pStaff = params.get("staff")
    const pPlan = params.get("plan")

    if (pUnits) {
      const n = Number(pUnits)
      if (Number.isFinite(n)) setUnits(Math.min(1000, Math.max(20, n)))
    }
    if (pPrice) {
      const n = Number(pPrice)
      if (Number.isFinite(n)) setPrice(Math.min(500000, Math.max(50000, n)))
    }
    if (pOffers) {
      const n = Number(pOffers)
      if (Number.isFinite(n)) setOffers(Math.min(200, Math.max(5, n)))
    }
    if (pStaff) {
      const n = Number(pStaff)
      if (Number.isFinite(n)) setStaff(Math.min(10, Math.max(1, n)))
    }
    if (pPlan && pPlan in planLabels) setPlan(pPlan)
  }, [])

  // Auto-suggest plan and offers when units change (skip on initial mount to preserve URL params)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    setPlan(suggestPlan(units))
    setOffers(suggestOffers(units))
  }, [units])

  const planCost = Number(plan)

  const calc = useMemo(() => {
    // Core time savings
    const cpMinSaved = offers * 28
    const cpDollarsSaved = (cpMinSaved / 60) * 15
    const inquiries = Math.round(offers * 0.5)
    const mgrMinSaved = inquiries * 10
    const mgrDollarsSaved = (mgrMinSaved / 60) * 15
    const crmUpdates = staff * 15
    const crmMinSaved = crmUpdates * 5
    const crmDollarsSaved = (crmMinSaved / 60) * 15
    const coreMonthlySavings = cpDollarsSaved + mgrDollarsSaved + crmDollarsSaved

    // Feature savings (collapsed into one row in UI)
    const featuresSavings = featuresSavingsConfig.map((f) => {
      let events: number
      switch (f.eventsMultiplier) {
        case "staff12": events = staff * 12; break
        case "staff8": events = staff * 8; break
        case "offers03": events = Math.round(offers * 0.3); break
        case "offers": events = offers; break
        case "staff5": events = staff * 5; break
        default: events = 0
      }
      const minSaved = f.timeSavedPerEvent * events
      const dollarsSaved = (minSaved / 60) * 15
      return { ...f, events, minSaved, dollarsSaved }
    })

    const totalExpandedDollars = featuresSavings.reduce((s, f) => s + f.dollarsSaved, 0)

    // Bottom line
    const annualCost = planCost * 12
    const totalMonthlySavings = coreMonthlySavings + totalExpandedDollars
    const totalAnnualSavings = totalMonthlySavings * 12
    const coverage = Math.round((totalAnnualSavings / annualCost) * 100)
    const remainingMonthly = Math.max(0, planCost - totalMonthlySavings)
    const oneSaleCoversMonths = Math.round(price / planCost)
    const costAsPercentOfSale = (annualCost / price) * 100

    const totalMinSaved =
      cpMinSaved + mgrMinSaved + crmMinSaved +
      featuresSavings.reduce((s, f) => s + f.minSaved, 0)
    const hoursSaved = totalMinSaved / 60
    const workDaysSaved = hoursSaved / 8

    // Cost of inaction (annual)
    const annualWastedHours = Math.round(hoursSaved * 12)
    const annualWastedDollars = Math.round(annualWastedHours * 15)

    return {
      cpDollarsSaved,
      mgrDollarsSaved,
      crmDollarsSaved,
      coreMonthlySavings,
      featuresSavings,
      totalExpandedDollars,
      annualCost,
      totalMonthlySavings,
      totalAnnualSavings,
      coverage,
      remainingMonthly,
      oneSaleCoversMonths,
      costAsPercentOfSale,
      hoursSaved,
      workDaysSaved,
      annualWastedHours,
      annualWastedDollars,
    }
  }, [offers, staff, planCost, units, price])

  function shareLink() {
    const params = new URLSearchParams({
      units: String(units),
      price: String(price),
      offers: String(offers),
      staff: String(staff),
      plan,
    })
    const url = `${window.location.origin}${window.location.pathname}?${params}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Unitbox ROI</h1>
        <p className="text-sm text-muted-foreground mt-1">Калькулятор окупаемости для застройщиков</p>
      </div>

      {/* ═══ MAIN ═══ */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          {/* ── SIDEBAR (sticky inputs) ── */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Параметры</CardTitle>
                <CardDescription>
                  Настройте под ваш проект
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Юнитов в каталоге</Label>
                    <Badge variant="secondary" className="tabular-nums">
                      {fmt(units)}
                    </Badge>
                  </div>
                  <Slider
                    value={[units]}
                    onValueChange={(v) => setUnits(v[0])}
                    min={20}
                    max={1000}
                    step={10}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Средняя цена юнита</Label>
                    <Badge variant="secondary" className="tabular-nums">
                      ${fmt(price)}
                    </Badge>
                  </div>
                  <Slider
                    value={[price]}
                    onValueChange={(v) => setPrice(v[0])}
                    min={50000}
                    max={500000}
                    step={5000}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Офферов в месяц</Label>
                    <Badge variant="secondary" className="tabular-nums">
                      {fmt(offers)}
                    </Badge>
                  </div>
                  <Slider
                    value={[offers]}
                    onValueChange={(v) => setOffers(v[0])}
                    min={5}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Сотрудников отдела продаж</Label>
                    <Badge variant="secondary" className="tabular-nums">
                      {staff}
                    </Badge>
                  </div>
                  <Slider
                    value={[staff]}
                    onValueChange={(v) => setStaff(v[0])}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <Label>Тариф Unitbox</Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(planLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-1 border-t pt-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Экономия
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-primary">
                    $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} />/мес
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    1 продажа
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-primary">
                    = <AnimatedNumber value={calc.oneSaleCoversMonths} /> мес Unitbox
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* ── RIGHT COLUMN (5 sections) ── */}
          <div className="flex min-w-0 flex-col gap-8">
            {/* ═══ SECTION 1: HERO — THE SHOCK NUMBER ═══ */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hero-gradient rounded-2xl p-6 shadow-[var(--shadow-card)] ring-1 ring-primary/15"
            >
              <motion.div
                variants={cardVariants}
                transition={springTransition}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Одна продажа за ${fmt(price)}
                </span>
                <p className="text-4xl font-bold tabular-nums text-primary sm:text-5xl lg:text-6xl">
                  = <AnimatedNumber value={calc.oneSaleCoversMonths} /> месяцев
                </p>
                <span className="text-lg font-medium text-muted-foreground sm:text-xl">
                  подписки Unitbox
                </span>
              </motion.div>

              <Separator className="my-5" />

              <motion.p
                variants={cardVariants}
                transition={springTransition}
                className="text-center text-sm text-muted-foreground leading-relaxed"
              >
                Ваша команда тратит{" "}
                <span className="font-semibold text-foreground">
                  {fmtDec(calc.workDaysSaved, 1)} рабочих дней в месяц
                </span>{" "}
                на задачи, которые Unitbox автоматизирует.
                Это{" "}
                <span className="font-semibold text-foreground">
                  $<AnimatedNumber value={calc.annualWastedDollars} /> в год
                </span>{" "}
                при ставке $15/час.
              </motion.p>

              {/* Coverage bar */}
              <motion.div
                variants={cardVariants}
                transition={springTransition}
                className="mt-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Покрытие стоимости экономией
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-primary">
                    <AnimatedNumber value={calc.coverage} />%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-2.5 rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/90"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(100, calc.coverage)}%` }}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                    style={{
                      boxShadow: "0 0 8px oklch(0.496 0.265 301.924 / 0.3)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Inline social proof */}
              <motion.div
                variants={cardVariants}
                transition={springTransition}
                className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
              >
                <span>
                  <span className="font-semibold text-foreground">{fmt(STATS.totalOffers)}</span>{" "}
                  офферов создано
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="font-semibold text-foreground">{STATS.totalAgents}</span>{" "}
                  агентов на платформе
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="font-semibold text-foreground">{STATS.totalCountries}+</span>{" "}
                  стран
                </span>
              </motion.div>
            </motion.section>

            {/* ═══ SECTION 2: ROI CALCULATOR (CENTERPIECE) ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ amount: 0.3, once: true }}
              transition={springTransition}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <TrendingUp className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Расчёт экономии</h2>
              </div>

              <Card className="hover:shadow-[var(--shadow-card-hover)]">
                <CardContent className="flex flex-col gap-0">
                  <TooltipProvider>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Статья</TableHead>
                          <TableHead className="text-right">$/мес</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Создание КП</TableCell>
                          <TableCell className="text-right tabular-nums">
                            $<AnimatedNumber value={Math.round(calc.cpDollarsSaved)} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Обработка запросов агентов</TableCell>
                          <TableCell className="text-right tabular-nums">
                            $<AnimatedNumber value={Math.round(calc.mgrDollarsSaved)} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Обновление данных в CRM</TableCell>
                          <TableCell className="text-right tabular-nums">
                            $<AnimatedNumber value={Math.round(calc.crmDollarsSaved)} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex cursor-help items-center gap-1 underline decoration-dashed decoration-muted-foreground/40 underline-offset-4">
                                  Инструменты продаж
                                  <Info className="size-3 text-muted-foreground" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <ul className="flex flex-col gap-1 text-xs">
                                  {calc.featuresSavings.map((f, i) => (
                                    <li key={i} className="flex justify-between gap-4">
                                      <span>{f.label}</span>
                                      <span className="tabular-nums font-medium">
                                        ${fmt(Math.round(f.dollarsSaved))}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            $<AnimatedNumber value={Math.round(calc.totalExpandedDollars)} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell className="font-semibold">
                            Итого экономия
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-semibold text-primary">
                            $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} />/мес
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground">
                            Стоимость Unitbox
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-muted-foreground">
                            −${fmt(planCost)}/мес
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            За год
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-semibold">
                            {calc.totalAnnualSavings > calc.annualCost ? (
                              <span className="text-primary">
                                +$<AnimatedNumber value={Math.round(calc.totalAnnualSavings - calc.annualCost)} />
                              </span>
                            ) : (
                              <span>
                                −$<AnimatedNumber value={Math.round(calc.annualCost - calc.totalAnnualSavings)} />
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TooltipProvider>

                  <div className="mt-4 flex items-center justify-between rounded-lg bg-destructive/5 p-3">
                    <span className="text-sm text-muted-foreground">
                      Стоимость бездействия
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                      <AnimatedNumber value={calc.annualWastedHours} /> ч ={" "}
                      <span className="text-destructive">
                        $<AnimatedNumber value={calc.annualWastedDollars} />/год
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* ═══ SECTION 3: HOW IT WORKS — 3 COMPACT CARDS ═══ */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <motion.div
                variants={cardVariants}
                transition={springTransition}
                className="flex items-center gap-2"
              >
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <Clock className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Как это работает</h2>
              </motion.div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {howItWorks.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    transition={springTransition}
                    whileHover={{
                      y: -2,
                      transition: { type: "spring", bounce: 0, duration: 0.3 },
                    }}
                  >
                    <Card className="h-full hover:shadow-[var(--shadow-card-hover)]">
                      <CardContent className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <item.icon className="size-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground line-through decoration-muted-foreground/40">
                            {item.before}
                          </span>
                          <ArrowRight className="size-3 shrink-0 text-primary" />
                          <span className="font-medium">{item.after}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ═══ SECTION 4: OBJECTIONS — 3 CARDS ═══ */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <motion.div
                variants={cardVariants}
                transition={springTransition}
                className="flex items-center gap-2"
              >
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <HelpCircle className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Частые вопросы</h2>
              </motion.div>

              <div className="flex flex-col gap-3">
                <motion.div
                  variants={cardVariants}
                  transition={springTransition}
                  whileHover={{
                    y: -1,
                    transition: { type: "spring", bounce: 0, duration: 0.3 },
                  }}
                >
                  <Card className="hover:shadow-[var(--shadow-card-hover)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        А агенты будут этим пользоваться?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Агенты BREIG создали {fmt(STATS.breigOffers)} офферов без обучения. Unitbox проще WhatsApp:
                        агент открывает ссылку, выбирает юнит, отправляет оффер.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  transition={springTransition}
                  whileHover={{
                    y: -1,
                    transition: { type: "spring", bounce: 0, duration: 0.3 },
                  }}
                >
                  <Card className="hover:shadow-[var(--shadow-card-hover)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        У нас уже есть CRM / Excel / свой сайт
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Unitbox интегрируется с amoCRM, Bitrix24, HubSpot — не заменяет, а расширяет.
                        Excel и PDF заменяет: данные обновляются в реальном времени.
                        Внедрение: 1-2 дня. Первые результаты — через неделю.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  transition={springTransition}
                  whileHover={{
                    y: -1,
                    transition: { type: "spring", bounce: 0, duration: 0.3 },
                  }}
                >
                  <Card className="hover:shadow-[var(--shadow-card-hover)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        А если не подойдёт?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Помесячная оплата, нет годовых контрактов. Агентам не нужна регистрация —
                        просто ссылка. Можно отменить в любой месяц.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.section>

            {/* ═══ SECTION 5: DECISION SUMMARY + CTA ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ amount: 0.3, once: true }}
              transition={springTransition}
            >
              <Card className="hero-gradient ring-1 ring-primary/15">
                <CardContent className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Итог</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        Стоимость Unitbox
                      </span>
                      <span className="text-xl font-semibold tabular-nums">
                        $<AnimatedNumber value={planCost} />/мес
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        Экономия на рутине
                      </span>
                      <span className="text-xl font-semibold tabular-nums text-primary">
                        $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} />/мес
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      Покрывает <AnimatedNumber value={calc.coverage} />% стоимости подписки экономией времени
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      1 продажа = <AnimatedNumber value={calc.oneSaleCoversMonths} /> месяцев подписки
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      Масштабирует агентскую сеть без найма менеджеров
                    </li>
                  </ul>

                  <Separator />

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                      className="flex-1"
                    >
                      <Button size="lg" className="w-full">
                        Запросить демо
                      </Button>
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => window.print()}
                      >
                        Скачать расчёт
                      </Button>
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                    >
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={shareLink}
                        className="pl-3"
                      >
                        <Link2 className="mr-2 size-4" />
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                            >
                              Скопировано!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="share"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                            >
                              Поделиться
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* ═══ FOOTER ═══ */}
            <p className="text-xs text-muted-foreground">
              * Расчёт основан на средних показателях: стоимость часа менеджера
              $15, время создания КП — 28 мин, время обработки запроса — 10 мин.
              Фактические результаты могут отличаться.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
