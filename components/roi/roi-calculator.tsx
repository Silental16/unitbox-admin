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

// ── i18n ──

export type Lang = "ru" | "en"

const translations = {
  ru: {
    pageTitle: "Unitbox ROI",
    pageDescription: "Калькулятор окупаемости для застройщиков",
    parameters: "Параметры",
    customizeProject: "Настройте под ваш проект",
    unitsInCatalog: "Юнитов в каталоге",
    avgUnitPrice: "Средняя цена юнита",
    offersPerMonth: "Офферов в месяц",
    salesStaff: "Сотрудников отдела продаж",
    unitboxPlan: "Тариф Unitbox",
    savings: "Экономия",
    oneSale: "1 продажа",
    monthsUnitbox: "мес Unitbox",
    perMonth: "/мес",
    oneSaleFor: "Одна продажа за",
    months: "месяцев",
    unitboxSubscription: "подписки Unitbox",
    teamSpends: "Ваша команда тратит",
    workDaysPerMonth: "рабочих дней в месяц",
    onTasksAutomated: "на задачи, которые Unitbox автоматизирует.",
    thisIs: "Это",
    perYear: "в год",
    atRate: "при ставке $15/час.",
    coverageByEfficiency: "Покрытие стоимости экономией",
    offersCreated: "офферов создано",
    agentsOnPlatform: "агентов на платформе",
    countries: "стран",
    savingsCalculation: "Расчёт экономии",
    item: "Статья",
    dollarPerMonth: "$/мес",
    proposalCreation: "Создание КП",
    agentRequestProcessing: "Обработка запросов агентов",
    crmDataUpdate: "Обновление данных в CRM",
    salesTools: "Инструменты продаж",
    totalSavings: "Итого экономия",
    unitboxCost: "Стоимость Unitbox",
    perYearLabel: "За год",
    costOfInaction: "Стоимость бездействия",
    hours: "ч",
    howItWorks: "Как это работает",
    faq: "Частые вопросы",
    summary: "Итог",
    routineSavings: "Экономия на рутине",
    coversPercent: "% стоимости подписки экономией времени",
    coversText: "Покрывает",
    oneSaleEquals: "1 продажа =",
    monthsOfSubscription: "месяцев подписки",
    scalesAgentNetwork: "Масштабирует агентскую сеть без найма менеджеров",
    requestDemo: "Запросить демо",
    downloadCalc: "Скачать расчёт",
    share: "Поделиться",
    copied: "Скопировано!",
    disclaimer: "* Расчёт основан на средних показателях: стоимость часа менеджера $15, время создания КП — 28 мин, время обработки запроса — 10 мин. Фактические результаты могут отличаться.",
    // Features
    availabilityWithoutCalls: "Наличие без звонков",
    interactiveFacades: "Интерактивные фасады",
    financialModelsInOffer: "Финансовые модели в оффере",
    crmSync: "CRM-синхронизация",
    docsAndVideo: "Документы и видео",
    // How it works
    howTitle1: "Агент видит наличие без звонков",
    howBefore1: "Звонит в офис, ждёт 24-48ч",
    howAfter1: "Каталог → фильтр → 30 секунд",
    howTitle2: "Оффер готов за 2 минуты",
    howBefore2: "3 источника данных, 30 минут",
    howAfter2: "Агент создаёт сам за 2 минуты",
    howTitle3: "Данные синхронизируются сами",
    howBefore3: "Вручную: Excel, CRM, чаты",
    howAfter3: "Автосинхронизация CRM ↔ Unitbox",
    // FAQ
    faqQ1: "А агенты будут этим пользоваться?",
    faqA1_pre: "Агенты BREIG создали",
    faqA1_post: "офферов без обучения. Unitbox проще WhatsApp: агент открывает ссылку, выбирает юнит, отправляет оффер.",
    faqQ2: "У нас уже есть CRM / Excel / свой сайт",
    faqA2: "Unitbox интегрируется с amoCRM, Bitrix24, HubSpot — не заменяет, а расширяет. Excel и PDF заменяет: данные обновляются в реальном времени. Внедрение: 1-2 дня. Первые результаты — через неделю.",
    faqQ3: "А если не подойдёт?",
    faqA3: "Помесячная оплата, нет годовых контрактов. Агентам не нужна регистрация — просто ссылка. Можно отменить в любой месяц.",
    // Plan labels
    planStarter: "Starter — $300/мес",
    planStandard: "Standard — $500/мес",
    planPro: "Pro — $1 000/мес",
    planEnterprise: "Enterprise — $2 000/мес",
  },
  en: {
    pageTitle: "Unitbox ROI",
    pageDescription: "ROI calculator for real estate developers",
    parameters: "Parameters",
    customizeProject: "Customize for your project",
    unitsInCatalog: "Units in catalog",
    avgUnitPrice: "Average unit price",
    offersPerMonth: "Offers per month",
    salesStaff: "Sales team members",
    unitboxPlan: "Unitbox plan",
    savings: "Savings",
    oneSale: "1 sale",
    monthsUnitbox: "mo Unitbox",
    perMonth: "/mo",
    oneSaleFor: "One sale at",
    months: "months",
    unitboxSubscription: "of Unitbox subscription",
    teamSpends: "Your team spends",
    workDaysPerMonth: "work days per month",
    onTasksAutomated: "on tasks that Unitbox automates.",
    thisIs: "That's",
    perYear: "per year",
    atRate: "at a rate of $15/hr.",
    coverageByEfficiency: "Cost coverage by savings",
    offersCreated: "offers created",
    agentsOnPlatform: "agents on the platform",
    countries: "countries",
    savingsCalculation: "Savings breakdown",
    item: "Item",
    dollarPerMonth: "$/mo",
    proposalCreation: "Proposal creation",
    agentRequestProcessing: "Agent inquiry handling",
    crmDataUpdate: "CRM data updates",
    salesTools: "Sales tools",
    totalSavings: "Total savings",
    unitboxCost: "Unitbox cost",
    perYearLabel: "Annual",
    costOfInaction: "Cost of inaction",
    hours: "h",
    howItWorks: "How it works",
    faq: "FAQ",
    summary: "Summary",
    routineSavings: "Routine savings",
    coversPercent: "% of subscription cost covered by time savings",
    coversText: "Covers",
    oneSaleEquals: "1 sale =",
    monthsOfSubscription: "months of subscription",
    scalesAgentNetwork: "Scales agent network without hiring managers",
    requestDemo: "Request demo",
    downloadCalc: "Download report",
    share: "Share",
    copied: "Copied!",
    disclaimer: "* Calculations based on averages: manager hourly rate $15, proposal creation — 28 min, request handling — 10 min. Actual results may vary.",
    // Features
    availabilityWithoutCalls: "Availability without calls",
    interactiveFacades: "Interactive facades",
    financialModelsInOffer: "Financial models in offers",
    crmSync: "CRM sync",
    docsAndVideo: "Documents & video",
    // How it works
    howTitle1: "Agent sees availability without calling",
    howBefore1: "Calls the office, waits 24-48h",
    howAfter1: "Catalog → filter → 30 seconds",
    howTitle2: "Offer ready in 2 minutes",
    howBefore2: "3 data sources, 30 minutes",
    howAfter2: "Agent creates it in 2 minutes",
    howTitle3: "Data syncs automatically",
    howBefore3: "Manually: Excel, CRM, chats",
    howAfter3: "Auto-sync CRM ↔ Unitbox",
    // FAQ
    faqQ1: "Will agents actually use this?",
    faqA1_pre: "BREIG agents created",
    faqA1_post: "offers without training. Unitbox is simpler than WhatsApp: agent opens a link, picks a unit, sends an offer.",
    faqQ2: "We already have CRM / Excel / our own website",
    faqA2: "Unitbox integrates with amoCRM, Bitrix24, HubSpot — it extends, not replaces. Replaces Excel and PDF: data updates in real time. Onboarding: 1-2 days. First results — within a week.",
    faqQ3: "What if it doesn't work for us?",
    faqA3: "Monthly billing, no annual contracts. Agents don't need to register — just a link. Cancel any month.",
    // Plan labels
    planStarter: "Starter — $300/mo",
    planStandard: "Standard — $500/mo",
    planPro: "Pro — $1,000/mo",
    planEnterprise: "Enterprise — $2,000/mo",
  },
} as const

// ── Utilities ──

function fmtNum(n: number, lang: Lang): string {
  return n.toLocaleString(lang === "ru" ? "ru-RU" : "en-US")
}

function fmtDec(n: number, decimals: number, lang: Lang): string {
  return n.toLocaleString(lang === "ru" ? "ru-RU" : "en-US", {
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

const PLAN_KEYS = ["300", "500", "1000", "2000"] as const

type Translations = typeof translations.ru | typeof translations.en

function getPlanLabels(t: Translations) {
  return {
    "300": t.planStarter,
    "500": t.planStandard,
    "1000": t.planPro,
    "2000": t.planEnterprise,
  }
}

const featuresSavingsConfig = [
  { key: "availabilityWithoutCalls" as const, timeSavedPerEvent: 10, eventsMultiplier: "staff12" as const },
  { key: "interactiveFacades" as const, timeSavedPerEvent: 15, eventsMultiplier: "staff8" as const },
  { key: "financialModelsInOffer" as const, timeSavedPerEvent: 20, eventsMultiplier: "offers03" as const },
  { key: "crmSync" as const, timeSavedPerEvent: 5, eventsMultiplier: "offers" as const },
  { key: "docsAndVideo" as const, timeSavedPerEvent: 8, eventsMultiplier: "staff5" as const },
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
  format,
}: {
  value: number
  format: (n: number) => string
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

export function RoiCalculator({ lang = "ru" }: { lang?: Lang }) {
  const t = translations[lang]
  const planLabels = getPlanLabels(t)
  const fmt = (n: number) => fmtNum(n, lang)

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
    const cpMinSaved = offers * 28
    const cpDollarsSaved = (cpMinSaved / 60) * 15
    const inquiries = Math.round(offers * 0.5)
    const mgrMinSaved = inquiries * 10
    const mgrDollarsSaved = (mgrMinSaved / 60) * 15
    const crmUpdates = staff * 15
    const crmMinSaved = crmUpdates * 5
    const crmDollarsSaved = (crmMinSaved / 60) * 15
    const coreMonthlySavings = cpDollarsSaved + mgrDollarsSaved + crmDollarsSaved

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
    const annualCost = planCost * 12
    const totalMonthlySavings = coreMonthlySavings + totalExpandedDollars
    const totalAnnualSavings = totalMonthlySavings * 12
    const coverage = Math.round((totalAnnualSavings / annualCost) * 100)
    const oneSaleCoversMonths = Math.round(price / planCost)
    const totalMinSaved = cpMinSaved + mgrMinSaved + crmMinSaved + featuresSavings.reduce((s, f) => s + f.minSaved, 0)
    const hoursSaved = totalMinSaved / 60
    const workDaysSaved = hoursSaved / 8
    const annualWastedHours = Math.round(hoursSaved * 12)
    const annualWastedDollars = Math.round(annualWastedHours * 15)

    return {
      cpDollarsSaved, mgrDollarsSaved, crmDollarsSaved, coreMonthlySavings,
      featuresSavings, totalExpandedDollars, annualCost,
      totalMonthlySavings, totalAnnualSavings, coverage,
      oneSaleCoversMonths, hoursSaved, workDaysSaved,
      annualWastedHours, annualWastedDollars,
    }
  }, [offers, staff, planCost, units, price])

  function shareLink() {
    const params = new URLSearchParams({
      units: String(units),
      price: String(price),
      offers: String(offers),
      staff: String(staff),
      plan,
      lang,
    })
    const url = `${window.location.origin}${window.location.pathname}?${params}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const howItWorksData = [
    { icon: Users, title: t.howTitle1, before: t.howBefore1, after: t.howAfter1 },
    { icon: Clock, title: t.howTitle2, before: t.howBefore2, after: t.howAfter2 },
    { icon: RefreshCw, title: t.howTitle3, before: t.howBefore3, after: t.howAfter3 },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.pageTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.pageDescription}</p>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          {/* ── SIDEBAR (sticky inputs) ── */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>{t.parameters}</CardTitle>
                <CardDescription>{t.customizeProject}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>{t.unitsInCatalog}</Label>
                    <Badge variant="secondary" className="tabular-nums">{fmt(units)}</Badge>
                  </div>
                  <Slider value={[units]} onValueChange={(v) => setUnits(v[0])} min={20} max={1000} step={10} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>{t.avgUnitPrice}</Label>
                    <Badge variant="secondary" className="tabular-nums">${fmt(price)}</Badge>
                  </div>
                  <Slider value={[price]} onValueChange={(v) => setPrice(v[0])} min={50000} max={500000} step={5000} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>{t.offersPerMonth}</Label>
                    <Badge variant="secondary" className="tabular-nums">{fmt(offers)}</Badge>
                  </div>
                  <Slider value={[offers]} onValueChange={(v) => setOffers(v[0])} min={5} max={200} step={5} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>{t.salesStaff}</Label>
                    <Badge variant="secondary" className="tabular-nums">{staff}</Badge>
                  </div>
                  <Slider value={[staff]} onValueChange={(v) => setStaff(v[0])} min={1} max={10} step={1} />
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <Label>{t.unitboxPlan}</Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PLAN_KEYS.map((value) => (
                        <SelectItem key={value} value={value}>
                          {planLabels[value]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-1 border-t pt-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.savings}</span>
                  <span className="text-sm font-semibold tabular-nums text-primary">
                    $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} format={fmt} />{t.perMonth}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.oneSale}</span>
                  <span className="text-sm font-semibold tabular-nums text-primary">
                    = <AnimatedNumber value={calc.oneSaleCoversMonths} format={fmt} /> {t.monthsUnitbox}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex min-w-0 flex-col gap-8">
            {/* ═══ SECTION 1: HERO ═══ */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hero-gradient rounded-2xl p-6 shadow-[var(--shadow-card)] ring-1 ring-primary/15"
            >
              <motion.div variants={cardVariants} transition={springTransition} className="flex flex-col items-center gap-2 text-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {t.oneSaleFor} ${fmt(price)}
                </span>
                <p className="text-4xl font-bold tabular-nums text-primary sm:text-5xl lg:text-6xl">
                  = <AnimatedNumber value={calc.oneSaleCoversMonths} format={fmt} /> {t.months}
                </p>
                <span className="text-lg font-medium text-muted-foreground sm:text-xl">
                  {t.unitboxSubscription}
                </span>
              </motion.div>

              <Separator className="my-5" />

              <motion.p variants={cardVariants} transition={springTransition} className="text-center text-sm text-muted-foreground leading-relaxed">
                {t.teamSpends}{" "}
                <span className="font-semibold text-foreground">
                  {fmtDec(calc.workDaysSaved, 1, lang)} {t.workDaysPerMonth}
                </span>{" "}
                {t.onTasksAutomated}{" "}
                {t.thisIs}{" "}
                <span className="font-semibold text-foreground">
                  $<AnimatedNumber value={calc.annualWastedDollars} format={fmt} /> {t.perYear}
                </span>{" "}
                {t.atRate}
              </motion.p>

              <motion.div variants={cardVariants} transition={springTransition} className="mt-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.coverageByEfficiency}</span>
                  <span className="text-xs font-semibold tabular-nums text-primary">
                    <AnimatedNumber value={calc.coverage} format={fmt} />%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-2.5 rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/90"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(100, calc.coverage)}%` }}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                    style={{ boxShadow: "0 0 8px oklch(0.496 0.265 301.924 / 0.3)" }}
                  />
                </div>
              </motion.div>

              <motion.div variants={cardVariants} transition={springTransition} className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground">{fmt(STATS.totalOffers)}</span> {t.offersCreated}
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="font-semibold text-foreground">{STATS.totalAgents}</span> {t.agentsOnPlatform}
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="font-semibold text-foreground">{STATS.totalCountries}+</span> {t.countries}
                </span>
              </motion.div>
            </motion.section>

            {/* ═══ SECTION 2: SAVINGS TABLE ═══ */}
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
                <h2 className="text-lg font-semibold">{t.savingsCalculation}</h2>
              </div>

              <Card className="hover:shadow-[var(--shadow-card-hover)]">
                <CardContent className="flex flex-col gap-0">
                  <TooltipProvider>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t.item}</TableHead>
                          <TableHead className="text-right">{t.dollarPerMonth}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{t.proposalCreation}</TableCell>
                          <TableCell className="text-right tabular-nums">$<AnimatedNumber value={Math.round(calc.cpDollarsSaved)} format={fmt} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{t.agentRequestProcessing}</TableCell>
                          <TableCell className="text-right tabular-nums">$<AnimatedNumber value={Math.round(calc.mgrDollarsSaved)} format={fmt} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{t.crmDataUpdate}</TableCell>
                          <TableCell className="text-right tabular-nums">$<AnimatedNumber value={Math.round(calc.crmDollarsSaved)} format={fmt} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex cursor-help items-center gap-1 underline decoration-dashed decoration-muted-foreground/40 underline-offset-4">
                                  {t.salesTools}
                                  <Info className="size-3 text-muted-foreground" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <ul className="flex flex-col gap-1 text-xs">
                                  {calc.featuresSavings.map((f, i) => (
                                    <li key={i} className="flex justify-between gap-4">
                                      <span>{t[f.key]}</span>
                                      <span className="tabular-nums font-medium">${fmt(Math.round(f.dollarsSaved))}</span>
                                    </li>
                                  ))}
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">$<AnimatedNumber value={Math.round(calc.totalExpandedDollars)} format={fmt} /></TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell className="font-semibold">{t.totalSavings}</TableCell>
                          <TableCell className="text-right tabular-nums font-semibold text-primary">
                            $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} format={fmt} />{t.perMonth}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground">{t.unitboxCost}</TableCell>
                          <TableCell className="text-right tabular-nums text-muted-foreground">−${fmt(planCost)}{t.perMonth}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">{t.perYearLabel}</TableCell>
                          <TableCell className="text-right tabular-nums font-semibold">
                            {calc.totalAnnualSavings > calc.annualCost ? (
                              <span className="text-primary">+$<AnimatedNumber value={Math.round(calc.totalAnnualSavings - calc.annualCost)} format={fmt} /></span>
                            ) : (
                              <span>−$<AnimatedNumber value={Math.round(calc.annualCost - calc.totalAnnualSavings)} format={fmt} /></span>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TooltipProvider>

                  <div className="mt-4 flex items-center justify-between rounded-lg bg-destructive/5 p-3">
                    <span className="text-sm text-muted-foreground">{t.costOfInaction}</span>
                    <span className="text-sm font-semibold tabular-nums">
                      <AnimatedNumber value={calc.annualWastedHours} format={fmt} /> {t.hours} ={" "}
                      <span className="text-destructive">
                        $<AnimatedNumber value={calc.annualWastedDollars} format={fmt} />/{lang === "ru" ? "год" : "yr"}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* ═══ SECTION 3: HOW IT WORKS ═══ */}
            <motion.section
              initial="hidden" whileInView="visible"
              viewport={{ amount: 0.3, once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <motion.div variants={cardVariants} transition={springTransition} className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <Clock className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{t.howItWorks}</h2>
              </motion.div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {howItWorksData.map((item, i) => (
                  <motion.div key={i} variants={cardVariants} transition={springTransition}
                    whileHover={{ y: -2, transition: { type: "spring", bounce: 0, duration: 0.3 } }}>
                    <Card className="h-full hover:shadow-[var(--shadow-card-hover)]">
                      <CardContent className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <item.icon className="size-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground line-through decoration-muted-foreground/40">{item.before}</span>
                          <ArrowRight className="size-3 shrink-0 text-primary" />
                          <span className="font-medium">{item.after}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ═══ SECTION 4: FAQ ═══ */}
            <motion.section
              initial="hidden" whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <motion.div variants={cardVariants} transition={springTransition} className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <HelpCircle className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{t.faq}</h2>
              </motion.div>

              <div className="flex flex-col gap-3">
                {[
                  { q: t.faqQ1, a: <>{t.faqA1_pre} {fmt(STATS.breigOffers)} {t.faqA1_post}</> },
                  { q: t.faqQ2, a: t.faqA2 },
                  { q: t.faqQ3, a: t.faqA3 },
                ].map((faq, i) => (
                  <motion.div key={i} variants={cardVariants} transition={springTransition}
                    whileHover={{ y: -1, transition: { type: "spring", bounce: 0, duration: 0.3 } }}>
                    <Card className="hover:shadow-[var(--shadow-card-hover)]">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{faq.q}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ═══ SECTION 5: SUMMARY ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ amount: 0.3, once: true }}
              transition={springTransition}
            >
              <Card className="hero-gradient ring-1 ring-primary/15">
                <CardContent className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">{t.summary}</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">{t.unitboxCost}</span>
                      <span className="text-xl font-semibold tabular-nums">
                        $<AnimatedNumber value={planCost} format={fmt} />{t.perMonth}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">{t.routineSavings}</span>
                      <span className="text-xl font-semibold tabular-nums text-primary">
                        $<AnimatedNumber value={Math.round(calc.totalMonthlySavings)} format={fmt} />{t.perMonth}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {t.coversText} <AnimatedNumber value={calc.coverage} format={fmt} />{t.coversPercent}
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {t.oneSaleEquals} <AnimatedNumber value={calc.oneSaleCoversMonths} format={fmt} /> {t.monthsOfSubscription}
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {t.scalesAgentNetwork}
                    </li>
                  </ul>

                  <Separator />

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <motion.div whileTap={{ scale: 0.97 }} transition={{ type: "spring", bounce: 0, duration: 0.15 }} className="flex-1">
                      <Button size="lg" className="w-full">{t.requestDemo}</Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.97 }} transition={{ type: "spring", bounce: 0, duration: 0.15 }} className="flex-1">
                      <Button variant="outline" size="lg" className="w-full" onClick={() => window.print()}>
                        {t.downloadCalc}
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.97 }} transition={{ type: "spring", bounce: 0, duration: 0.15 }}>
                      <Button variant="ghost" size="lg" onClick={shareLink} className="pl-3">
                        <Link2 className="mr-2 size-4" />
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span key="copied" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                              {t.copied}
                            </motion.span>
                          ) : (
                            <motion.span key="share" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                              {t.share}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
