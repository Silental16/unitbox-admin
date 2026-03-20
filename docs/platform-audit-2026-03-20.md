# Unitbox Platform Audit — Full Deep Research

**Date:** 2026-03-20
**Status:** In progress (living document)
**Method:** Codebase exploration (frontend + backend) + deep research of 15+ competitors + agent/investor needs analysis

---

## Business Model

**Девелопер → Unitbox → Агент → Инвестор**

- **Девелоперы** загружают проекты и поддерживают данные в актуальном состоянии
- **Агенты** (внешние + внутренние отделы продаж, например BREIG) используют контент застройщика и инструменты Unitbox (офферы, финмодели) для продажи инвесторам
- **Агенты** зарабатывают комиссию со сделок
- **Девелоперы** зарабатывают, потому что агенты продают — агенты их канал продаж

---

## Секция 1: Что у Unitbox уже работает хорошо

**Сильные стороны, которые нужно сохранить и усилить:**

| Фича | Оценка | Почему это сильно |
|-------|--------|-------------------|
| **Финансовая модель (FinancialNew)** | ★★★★★ | Уникально для рынка Bali. 3-ступенчатый waterfall (revenue → profit → tax expenses), ADR, сезонность, price stages. Ни один конкурент на Бали не имеет такой глубины. SmartCrowd (Dubai) — ближайший аналог, но у них проще. |
| **Chess Board (шахматка)** | ★★★★★ | Визуализация доступности юнитов по этажам/блокам. Только Alnair (Dubai) и Parallel Select имеют что-то похожее. На Бали — уникально. |
| **Collections (офферы)** | ★★★★☆ | Агент может собрать коллекцию юнитов, кастомизировать (лого, цвета, intro text), сгенерировать PDF и отслеживать просмотры. Это ядро agent workflow — и оно работает. |
| **Мультиязычность** | ★★★★☆ | EN/RU/ID — покрывает ключевые рынки инвесторов (русскоязычные, англоязычные, локальные). |
| **Структура проекта** | ★★★★☆ | 12 секций на странице проекта (gallery, amenities, infrastructure, building progress, documents, helpful links, map и т.д.) — полнота данных на уровне лучших платформ. |
| **CRM интеграция (AMO)** | ★★★☆☆ | Gene widget встраивает юнит в AMO CRM. Полезно, но узконаправленно. |
| **Payment Plans** | ★★★★☆ | Гибкая система: default/installment, custom payments, скидки %, привязка к блокам/типам/юнитам. |

**Вывод:** Ядро платформы — финмодели + шахматка + офферы — это реально сильная тройка. Ни один конкурент на Бали не предлагает такой комбинации. Это нужно защищать и полировать.

---

## Секция 2: Критические проблемы (P0 — блокируют продажи)

### P0-1: Нет WhatsApp-ready шаринга

**Проблема:** В Бали и Дубае 90%+ коммуникации агент↔инвестор происходит в WhatsApp. Сейчас агент может только скопировать ссылку или скачать PDF. Нет "one-tap share" с превью.

**Что делают конкуренты:** Reelly — каждый проект/юнит имеет кнопку "Share via WhatsApp" с автоматической карточкой (рендер + ключевые цифры + ссылка + брендинг агента). 98% open rate у WhatsApp vs 20% у email.

**Что нужно:**
- Кнопка "Share" → генерирует WhatsApp-ready сообщение: изображение + 3-4 строки текста (цена, ROI, локация) + deep link на юнит/коллекцию
- OG-meta теги для превью при шаринге ссылок (сейчас скорее всего генерируется дефолтный превью)
- Возможность шарить и юнит, и коллекцию, и весь проект

### P0-2: Слабый Agent Branding в офферах

**Проблема:** Collections позволяют добавить лого и intro text, но агент не может:
- Добавить своё фото и контакты на каждую страницу оффера
- Использовать свои фирменные цвета
- Добавить call-to-action с прямой ссылкой на свой WhatsApp
- Показать свою "визитку" в header/footer оффера

**Бенчмарк:** Reelly — оффер выглядит как документ от агента, а не от платформы. Фото агента, телефон, WhatsApp, agency name — на каждом слайде. Инвестор воспринимает это как профессиональный материал агента, а не "скриншот с сайта".

**Почему критично:** Агенты не будут пользоваться инструментом, который не позволяет им выглядеть профессионально перед клиентом. Это прямой блокер adoption.

### P0-3: Нет трекинга воронки оффера

**Проблема:** Collections показывают `views, firstView, lastView` — но этого мало. Агент не знает:
- Какие юниты в коллекции клиент посмотрел внимательно (time spent)
- Вернулся ли клиент повторно
- На каком юните "застрял" (сигнал интереса)
- Прокрутил ли финмодель

**Бенчмарк:** Alnair — "magic link" с полной аналитикой: какие секции смотрел, сколько времени, какие юниты открывал. Highnote (US) — аналитика engagement per slide.

**Почему критично:** Без аналитики агент не знает, когда и как follow-up-ить. С аналитикой — звонит и говорит "Я вижу вы интересовались 2BR в BREIG Edem, давайте обсудим".

---

## Секция 3: Важные пробелы (P1 — влияют на конверсию)

### P1-1: Нет Comparison Tool (сравнение юнитов/проектов)

**Сейчас:** Есть "twins" — показывает похожие юниты. Но нет возможности выбрать 2-3 юнита и сравнить их бок о бок.

**Что нужно:** Агент выбирает 2-3 юнита → таблица сравнения: цена, цена/м², ROI, payment plan, developer, handover date, локация. Экспорт в PDF.

**Почему важно:** Исследование показало — инвесторы ВСЕГДА сравнивают 2-3 варианта. Если сравнение не в Unitbox, оно происходит в Excel агента → Unitbox теряет ценность.

### P1-2: Developer Track Record — слабая страница

**Сейчас:** Страница `/about` показывает описание, метрики, агентов, проекты. Но нет:
- Истории завершённых проектов (фото до/после)
- Статистики on-time delivery
- Количества сданных юнитов
- Отзывов покупателей
- "Проекту X — 3 года, вот как он выглядит сейчас"

**Почему важно:** Исследование показало — **developer track record = #1 trust signal** для инвесторов. "Buyers aren't purchasing floor plans — they're buying developer reputation." Сейчас эта страница не продаёт девелопера.

### P1-3: Финмодель слишком сложная для первого контакта

**Проблема:** FinancialNew — мощная система, но на странице юнита она показывает ВСЁ сразу: IRR, Cap Rate, CoC ROI, Net ROI, CoC Payback, годовой прогноз, exit scenarios, payment plans, калькулятор, модули. Это перегружает.

**Что нужно:**
- **Первый экран:** 3-4 ключевые метрики крупно (Net ROI, Rental Yield, Payback Period, Monthly Income)
- **"Подробнее":** Раскрывает полную финмодель
- **В оффере:** Упрощённая версия по умолчанию, полная — по запросу
- Интерактивные слайдеры "what-if" (сейчас есть, но можно сделать prominent-ее)

### P1-4: Нет Legal Clarity по проекту

**Проблема:** Для Бали ownership structure — ключевой страх инвестора. "Can I actually own this?" Сейчас нет секции, которая явно объясняет:
- Тип собственности (leasehold/Hak Pakai/PT PMA)
- Срок аренды и условия продления
- Что входит в контракт
- Какие риски

**Что нужно:** Отдельная секция "Ownership & Legal" на странице проекта. Поле `landType` уже есть в базе — нужно превратить его в информативный блок.

### P1-5: Building Progress не "живой"

**Сейчас:** BuildingProcess — timeline с фото и процентом. Но нет:
- Автоматических уведомлений инвесторам при обновлении
- Видео/drone footage
- Сравнения "план vs факт"
- Подписки на обновления

**Бенчмарк:** Лучшие платформы делают construction updates как Instagram stories — регулярные, визуальные, shareable.

---

## Секция 4: Желательные улучшения (P2 — дифференциация)

| Фича | Что даёт | Сложность |
|-------|----------|-----------|
| **Agent Dashboard** | Личный кабинет агента: мои коллекции, аналитика просмотров, мои сделки, мои клиенты | Высокая |
| **Quick Offer** | Выбрал юнит → 1 клик → branded PDF с финмоделью готов | Средняя |
| **Saved Search / Alerts** | Инвестор подписывается на "2BR villa, $200-300K, Ubud" → получает алерты | Средняя |
| **Video Tours Integration** | Kuula/Matterport embed прямо в карточке юнита | Низкая |
| **Social Proof** | Отзывы, stories инвесторов, "X юнитов продано за Y дней" | Средняя |
| **Commission Calculator** | Агент видит свою комиссию по каждому юниту | Низкая |
| **Mobile-first Redesign** | Агенты работают с телефона 80% времени | Высокая |
| **Portfolio View** | Инвестор видит все свои юниты в одном месте | Средняя |

---

## Секция 5: Что нужно упростить

| Текущее | Проблема | Рекомендация |
|---------|----------|-------------|
| **12 секций на странице проекта** | Перегруз. Scroll fatigue. Инвестор не доходит до финмодели | Приоритизировать: Hero → Key metrics → Units → Financial → всё остальное в табах |
| **Финмодель с 8 подсекциями** | Слишком много для первого визита | "Executive Summary" (4 метрики) → кнопка "Full Model" |
| **Collections Editor** | Two-panel editor — мощный, но для агента, который хочет отправить оффер за 30 секунд, это overhead | Добавить "Quick Offer" flow: выбрал юниты → auto-generated offer → share |
| **Auth flow** | 5 экранов (email check → signup → info → thank-you → email verification) | Для агентов — упростить до invite-only (девелопер приглашает) |

---

## Секция 6: Competitive Landscape (Deep Research)

### Прямые конкуренты

**Reelly (Dubai)** — ближайший аналог по бизнес-модели:
- 55,000+ агентов, 1,920 проектов, 426 девелоперов
- Ключевая фича: one-click branded presentations
- Pricing: AED 122-180/month (Personal), от AED 73/agent при 5 seats (Corporate)
- Validates Unitbox's SaaS model — рынок платит за agent productivity tools

**Alnair (Dubai):**
- "Magic link" коллекции с полной аналитикой engagement
- Interactive facade (аналог шахматки) + window view preview
- Floor-plan-level navigation

**Estatium (Bali):**
- Прямой конкурент по гео, но слабее по инструментам
- Нет финмоделей, нет шахматки

### Лучшие практики глобальных платформ

**SmartCrowd (Dubai):**
- Интерактивный ROI калькулятор с adjustable inputs
- Fee transparency (1.5% entry, 0.5% admin, 2.5% exit)
- Interactive charts

**Bayut (Dubai):**
- TruCheck — geo-tagged verification drives 20x more impressions
- Data freshness indicators

**Zillow / Redfin (US):**
- Эталон UX для property pages
- Zestimate — AI-powered property valuation

---

## Секция 7: Agent & Investor Needs (Deep Research)

### What Agents Need

1. **Speed:** One-click branded presentations — agents work "up to 10x faster" with structured data (Reelly)
2. **WhatsApp integration:** Primary sales channel in Bali/Dubai — 98% open rate
3. **Content automation:** Don't make agents build presentations — let them select and share
4. **Real-time availability:** Agents chase developers for updated price lists via WhatsApp groups
5. **Commission visibility:** Agents want to see their commission per unit instantly

### What Investors Need

**Decision hierarchy (by importance):**
1. Developer track record (#1 trust factor)
2. Location & infrastructure
3. Financial returns (ROI, rental yield, cap rate, appreciation)
4. Payment flexibility (off-plan payment plans)
5. Legal clarity (ownership structure — critical for Bali)
6. Exit strategy (resale liquidity, rental demand)
7. Construction progress transparency

### The Off-Plan Sales Funnel

1. **Discovery:** Agent finds projects via platform / developer relationships
2. **Selection:** Agent curates 2-3 options matching investor criteria
3. **Presentation:** WhatsApp-ready card → interactive link → branded PDF
4. **Comparison:** Investor compares 2-3 options (price/sqm, ROI, payment plan, developer)
5. **Due diligence:** Legal check, site visit, developer track record
6. **Decision:** Payment plan selection, deposit
7. **Post-sale:** Construction updates, handover, rental management

### Key Objections from Investors

- Construction delay risk
- Developer insolvency risk
- Market volatility ("wait and see")
- Legal complexity (especially Bali's leasehold/Hak Pakai/PT PMA)
- Lack of physical product to inspect
- Service charge uncertainty

### Property Presentation Best Practices

**What a professional offer should include:**
1. Project overview (name, location, developer, USPs)
2. Unit details (type, size, floor, view, floor plan)
3. Financial summary (price, payment plan, projected rental yield, ROI, cap rate)
4. Developer profile (track record, completed projects, delivery history)
5. Location analysis (map, nearby infrastructure, growth catalysts)
6. Legal structure (ownership type, contract terms)
7. Visual content (renders, real photos, virtual tour link)
8. Agent branding (photo, contacts, WhatsApp link)

**Format hierarchy:**
1. WhatsApp-shareable card (image + key numbers + link) — first touchpoint
2. Interactive link (web-based presentation) — consideration phase
3. Branded PDF (downloadable, printable) — decision phase
4. Video walkthrough — for remote investors

---

## Секция 8: Recommended Priority Roadmap

### Phase 1 (P0 — Agent Productivity) — unlocks agent adoption
- [ ] WhatsApp share button (unit + collection + project)
- [ ] OG-meta tags for rich link previews
- [ ] Agent branding in collections (photo, contacts, WhatsApp CTA, colors)
- [ ] Quick Offer flow (select units → auto-generate → share in 30 sec)

### Phase 2 (P1 — Investor Conversion) — improves close rate
- [ ] Financial model "Executive Summary" (4 key metrics prominent, rest collapsed)
- [ ] Comparison tool (2-3 units side-by-side)
- [ ] Developer track record page (completed projects, delivery history, social proof)
- [ ] Legal/Ownership section per project
- [ ] Commission calculator for agents

### Phase 3 (P2 — Differentiation) — competitive moat
- [ ] Collection analytics (per-unit engagement, time spent, repeat visits)
- [ ] Agent Dashboard (my collections, my analytics, my leads)
- [ ] Living Building Progress (notifications, video, drone)
- [ ] Saved Search / Alerts
- [ ] Mobile-first optimization
- [ ] Video Tours embed (Kuula/Matterport)

---

## Technical Notes

### Current Stack
- **Frontend:** Next.js 15 + Mantine UI v7 + Redux Toolkit + SCSS Modules
- **Backend:** NestJS + TypeORM + PostgreSQL (90+ entities, 40+ modules)
- **Charts:** Recharts v2.12
- **Maps:** Google Maps API + Mapbox
- **Carousels:** Swiper v11.2
- **Auth:** JWT-based with roles/permissions

### Current Pages (12 routes)
| Route | Purpose |
|-------|---------|
| `/projects` | Project listing with filters, map view, infinite scroll |
| `/project/[id]` | Project detail (12 sections: gallery, amenities, infrastructure, building progress, documents, helpful links, map, chessboard, blocks, about, render) |
| `/unit/[id]` | Unit detail with full financial model |
| `/units` | Unit directory with type selector |
| `/collections` | Agent's saved collections list |
| `/collections/[id]` | Collection editor (two-panel) |
| `/preview/[id]` | Public agent preview of collection |
| `/developers` | Developer list |
| `/about` | Developer profile |
| `/auth/*` | Authentication flow (5 screens) |
| `/profile/*` | User profile (main, password, integrations) |
| `/crm/amo/*` | CRM integration views |

### Key Database Entities
- `projects` → `blocks` → `units`
- `unit_types` (templates for units)
- `financial_new` (hierarchical: project → block → unit_type → unit)
- `adr` (rental income models)
- `payment_plans` (flexible payment terms)
- `collections` → `collections_units` (agent proposals)
- `amenities`, `infrastructure`, `helpful_links`, `documents`, `videos`, `gallery`
- `building_process` (construction timeline)
- `developers` → `agents`, `developer_info`, `developer_metrics`

---

---

## Секция 9: Growth Strategy & Platform Architecture

### The Marketplace Cold-Start Problem

```
Застройщики подпишутся ← если есть агентский трафик
Агенты придут ← если есть актуальный контент всех проектов
Контент появится ← если застройщики заполняют
→ Замкнутый круг
```

**Решение:** Supply-side subsidy — заполнить 50-100 горячих проектов самим, создав критическую массу контента. Привлечь агентов бесплатно. Показать трафик девелоперам → конвертировать в подписки.

**Валидация исследованием:** Так делали Airbnb, Zillow, 99.co. Reelly набрал 1,920 проектов и 426 девелоперов — только после этого 55K агентов пришли.

### Multi-Tenant Architecture

```
Unitbox Platform
├── Developer Cabinets (breig.unitbox.ai, teos.unitbox.ai, ...)
│   ├── Девелопер управляет СВОИМИ проектами
│   ├── Внутренний отдел продаж девелопера работает здесь же
│   └── Проекты автоматически транслируются во ВСЕ агентские кабинеты
│
├── Agency Cabinets (wellstate.unitbox.ai, ...)
│   ├── Все проекты всех девелоперов (BREIG, Teos, Nexo...)
│   ├── + 100 горячих проектов заполненных Unitbox
│   ├── + MLS вторичка от всех агентств (inter-agency marketplace)
│   ├── Агентство авторизует своих агентов
│   └── Агенты: находят юнит → оффер → инвестору → сделка
│
└── Unitbox Publisher Account
    └── Заполняет и обновляет 100 hot projects от имени Unitbox
```

**Ключевое:** Один проект (например BREIG Elysium) живёт одновременно:
- В кабинете BREIG (девелопер управляет, внутренние продажи)
- Во ВСЕХ агентских кабинетах (Wellstate, и любые другие)
- Обновления девелопера → мгновенно транслируются везде

**MLS (вторичка + земля):**
- Каждое агентство публикует свои объекты вторички от своего имени
- Все агентства видят вторичку всех агентств
- Межагентский marketplace — доп. ценность, не зависящая от девелоперов

### Data Flow

```
Developer updates project
    → auto-sync to all agency cabinets
    → agents see fresh data instantly
    → agent creates offer for investor
    → investor views offer
    → deal happens
    → developer gets sale through agent channel

Agency publishes resale listing
    → visible in ALL agency cabinets
    → other agencies can co-broker
    → inter-agency marketplace grows
```

### Tenant Types & What They See

| Tenant Type | Sees Projects | Can Manage | Pays |
|-------------|--------------|------------|------|
| **Developer** (breig.unitbox.ai) | Only own projects | Full CRUD, CRM, analytics | Subscription (for agent traffic) |
| **Agency** (wellstate.unitbox.ai) | ALL developer projects + ALL MLS | Create offers, publish resale, manage agents | Free (they ARE the value) |
| **Unitbox Publisher** | N/A | Fill & maintain 100 hot projects | Internal cost |

### Monetization Model

```
ДО подписки девелопера:
├── Проект заполнен Unitbox → виден агентствам
├── Агенты смотрят, создают офферы, продают
├── НО контакты девелопера СКРЫТЫ
└── Агент не может связаться с девелопером напрямую через платформу

ПОСЛЕ подписки девелопера:
├── Контакты видны агентам
├── CRM интеграция (заявки от агентов → сделки)
├── Спец. предложения для агентов (до 10 юнитов)
├── Аналитика трафика агентов
├── Девелопер сам управляет контентом
└── Внутренний отдел продаж использует как инструмент
```

### Team

- **Шон** — англоговорящий B2B sales, холодный аутрич балийских застройщиков
- **Глеб** — на рынке Бали, у застройщика руководитель по партнерам, привлекает агентства

---

## Секция 10: Prioritized Roadmap (38 items, ranked)

### Prioritization Logic
What unblocks the growth flywheel (agents come → use daily → developers pay) ranks highest.

### Wave 0: Foundation (без этого ничего не работает)

| # | Фича | Source | Effort | Why |
|---|-------|--------|--------|-----|
| 1 | Agency Cabinets — multi-tenant для агентств | Strategy | L | Блокер всего. Без этого нельзя подключать агентства. |
| 2 | Fill 100 hot projects от имени Unitbox | Strategy | L | Без контента агентам нечего продавать. Параллельно с #1. |
| 3 | OG-meta теги — rich preview при шаринге ссылок | Audit | XS | 2-4 часа. ROI/effort = max. |
| 4 | Unitbox publisher account | Strategy | S | Нужен для #2. |

### Wave 1: Agent Activation (ежедневное использование)

| # | Фича | Source | Effort | Why |
|---|-------|--------|--------|-----|
| 5 | Quick Offer — 1 клик → branded PDF/link | Audit+Backlog | M | THE killer feature. Экономит агенту 2ч на оффер. |
| 6 | WhatsApp Share — кнопка на юните/коллекции/проекте | Audit | S | 90%+ коммуникации в WhatsApp. |
| 7 | Agent Branding — фото, контакты, CTA в офферах | Audit+Backlog | M | Профессиональный вид = adoption. |
| 8 | "Мои проекты" тегирование | Backlog | S | Персонализация = retention. |
| 9 | Commission visibility per unit | Audit | S | Мотивация. Поле уже в базе. |
| 10 | Обновление визуала списков юнитов | Backlog | M | Первое впечатление. |

### Wave 2: Investor Conversion (офферы конвертируют лучше)

| # | Фича | Source | Effort | Why |
|---|-------|--------|--------|-----|
| 11 | FinModel Executive Summary — 4 метрики + collapse | Audit+Backlog | M | Сейчас перегружает. 5 сек чтобы понять. |
| 12 | Comparison Tool — 2-3 юнита side-by-side | Audit+Backlog | M | Инвесторы ВСЕГДА сравнивают. |
| 13 | Портфель юнитов в оффере с comparison | Backlog | M | Оффер = "3 варианта, сравните". |
| 14 | Legal/Ownership секция per project | Audit | S | #1 страх инвестора на Бали. |
| 15 | Специальные предложения (до 10 юнитов) | Backlog | S | Paywall + проще продавать. |
| 16 | Ссылка на презентацию вверху проекта | Backlog | XS | Quick win. |
| 17 | Resale status у off-plan юнитов | Backlog | XS | Маленькое но важное. |
| 18 | Документы + ссылки — merge + новый визуал | Backlog | S | Чистота UX. |

### Wave 3: Marketplace Growth (сетевые эффекты)

| # | Фича | Source | Effort | Why |
|---|-------|--------|--------|-----|
| 19 | MLS для вторички и земли | Strategy | L | Lock-in для агентств. |
| 20 | Collection analytics — engagement per unit | Audit | M | "Вижу вы интересовались 2BR..." |
| 21 | Интерактив в офферах — обратная связь | Backlog | M | Реакции, вопросы, запрос встречи. |
| 22 | Agent Dashboard — коллекции, аналитика, лиды | Audit+Backlog | L | Полноценный личный кабинет. |
| 23 | Traffic analytics per project | Backlog | M | КРИТИЧНО для монетизации. |
| 24 | Пайплайн оффер → сделка в CRM | Backlog | L | Полный цикл. |
| 25 | Developer Track Record page | Audit | M | Trust signal. |

### Wave 4: Scale & Infrastructure

| # | Фича | Source | Effort | Why |
|---|-------|--------|--------|-----|
| 26 | Новые payment plans | Backlog | M | Расширяет финмодель. |
| 27 | Капитализация + Occupancy ramp-up | Backlog | M | Правдоподобность моделей. |
| 28 | Выбор сценария в финмоделях | Backlog | S | UX финмоделей. |
| 29 | Автообновление шахматок | Backlog | L | Актуальность без ручного труда. |
| 30 | CRM Bitrix | Backlog | M | Расширяет рынок. |
| 31 | Интеграция с площадками (ProperStars) | Backlog | L | After marketplace established. |
| 32 | Admin redesign (Next.js + shadcn) | Backlog | L | Инфраструктура. |
| 33 | Ход строительства → новости/ивенты | Backlog | S | Engagement. |
| 34 | Раздел с анализом рынка | Backlog | S | Content marketing. |
| 35 | Mobile-first redesign | Audit | L | Важно, но дорого. |
| 36 | Saved Search / Alerts | Audit | M | Retention later stage. |
| 37 | Video Tours embed | Audit | S | Nice-to-have. |
| 38 | Agent onboarding guided tour | Audit | S | При масштабе 50+ агентств. |

### Effort Legend: XS=1-2d, S=3-5d, M=1-3w, L=1-2mo

### Dependency Graph

```
Wave 0: [Agency Cabinets] + [100 Projects] + [OG-meta]
    ↓
Wave 1: [Quick Offer] + [WhatsApp Share] + [Branding] + [My Projects]
    ↓ === AGENTS USE DAILY ===
Wave 2: [FinModel Summary] + [Comparison] + [Legal] + [Special Offers]
    ↓ === OFFERS CONVERT ===
Wave 3: [MLS] + [Analytics] + [Agent Dashboard] + [Traffic Analytics]
    ↓ === DEVELOPERS PAY ===
Wave 4: [CRM Bitrix] + [Feeds] + [Admin] + [Auto-update]
```

---

## Секция 11: Conceptual Platform Model — 3 Layers

### Layer 1: Agent Workspace (Growth Engine)

Unitbox для агента = **единое окно для продажи off-plan Bali**. Агент открывает Unitbox утром и видит:
- Все актуальные проекты рынка (50-100 проектов)
- Свой "портфель" проектов которые он продаёт
- Инструменты для создания офферов за 30 секунд
- MLS вторички (обмен листингами между агентствами)
- Аналитику: кто что смотрел, где сигналы интереса

**Ключевой принцип:** Агент НЕ ДОЛЖЕН уходить из Unitbox в Excel/Canva/WhatsApp для подготовки оффера.

| Сейчас | Нужно |
|--------|-------|
| Главная → редирект на main.unitbox.ai | Главная = Agent dashboard (мои проекты, горячие офферы, аналитика) |
| `/projects` — плоский список | `/projects` — с тегами (мои / все / по девелоперу), фильтры по горячести |
| Collections — вручную собирать | Quick Offer — выбрал юнит(ы) → branded offer за 1 клик |
| Нет MLS | MLS tab — вторичка и земля от агентств |
| Нет аналитики agent-level | Dashboard — views, offers sent, engagement per offer |

### Layer 2: Investor Experience (Conversion)

Страница юнита = **sales pitch**, не энциклопедия. Инвестор за 30 секунд должен понять: "Стоит ли это рассмотреть?"

**Информационная иерархия страницы проекта:**

```
УРОВЕНЬ 1 (above the fold — 5 sec decision):
├── Hero image/render (полноэкранный)
├── Key metrics bar: цена от, ROI, handover, локация
├── Developer badge (имя + verified/track record)
└── CTA: "Смотреть юниты" / "Создать оффер"

УРОВЕНЬ 2 (scrolling — 30 sec consideration):
├── Шахматка / Юниты по блокам (ГЛАВНЫЙ контент)
├── Финансовый summary (3-4 метрики, не полная модель)
├── Payment plans (simplified)
└── Gallery carousel

УРОВЕНЬ 3 (tabs — deep dive):
├── Tab: About Complex + Amenities + Infrastructure
├── Tab: Location (map + POI)
├── Tab: Documents + Helpful Links
├── Tab: Building Progress
└── Tab: Legal & Ownership (НОВОЕ)
```

**Финмодель на странице юнита:**

```
УРОВЕНЬ 1 (Executive Summary):
├── 4 карточки: Monthly Income | Net ROI | Payback | Cap Rate
├── Payment plan selector (1-2 варианта)
└── CTA: "Добавить в оффер" / "Сравнить"

УРОВЕНЬ 2 (Expand → Full Model):
├── Annual forecast chart
├── Exit scenarios
├── Interactive calculator (sliders)
└── Additional modules
```

**Новые элементы:**

| Элемент | Зачем |
|---------|-------|
| **"Ownership & Legal" секция** | #1 страх инвестора на Бали |
| **Developer Track Record** | #1 trust signal — завершённые проекты, сроки, фото "через 3 года" |
| **Social Proof** | "X юнитов продано за Y дней", quote от инвестора |
| **Специальные предложения** | Badge "Special Offer" + условия (paywall feature для девелоперов) |

### Layer 3: Developer Management (Retention)

Developer dashboard = **CMS для недвижимости**. Девелопер заходит и видит:
- Мои проекты с трафиком агентов (ЦЕННОСТЬ)
- Простой менеджмент юнитов (обновить цену, статус, спец. предложение)
- Заявки от агентов (CRM интеграция)
- Контакты застройщика (видны агентам ТОЛЬКО после подписки — paywall)

---

## Секция 12: Backlog Reprioritization

### Что правильно расставлено:
- "Заполнить топ 50-100 проектов" — bootstrap supply, абсолютно верно
- "MLS для вторички" — доп. ценность для агентов без зависимости от девелоперов
- "Специальные предложения застройщика" — конкретный paywall feature

### Что переприоритизировать:

| Бэклог | Рекомендация |
|--------|-------------|
| Интеграция с площадками (ProperStars) | Пока рано. Сначала agent adoption на платформе. Phase 3. |
| Подключить Bitrix | После AMO. CRM — developer retention, а приоритет — agent acquisition. |
| Ход строительства → новости/ивенты | Отличная идея. Ивенты — то, что агенты реально используют. |
| Админка на Next.js + shadcn | Инфраструктура, не growth. Параллельно, не блокируя agent features. |
| Анализ рынка | Content marketing. Блог отдельно, не product priority. |

### Что не хватает в бэклоге:

| Фича | Почему важно | Приоритет |
|-------|-------------|-----------|
| **WhatsApp Share** | 90%+ коммуникации агент↔инвестор | P0 |
| **OG-meta теги** | Ссылки "пустые" в мессенджерах. 2 часа работы, огромный эффект | P0 |
| **Agent onboarding** | Новый агент не понимает что делать. Нет guided tour | P1 |
| **Тегирование "мои проекты"** | Агент видит "свой" каталог | P0 |
| **Comparison tool** | Инвесторы всегда сравнивают 2-3 варианта | P1 |
| **Mobile optimization** | Агенты 80% с телефона | P1 |

---

## Секция 13: Strategic Risk

**Риск:** Заполнить 100 проектов → агенты приходят → смотрят → не возвращаются, потому что инструменты продажи недостаточно хороши.

Reelly набрал 55K агентов не потому что у них много проектов (1,920). А потому что агент экономит 2 часа на каждом оффере. One-click branded presentation — killer feature.

**Вывод:** Заполнение контента и улучшение agent tools должны идти ПАРАЛЛЕЛЬНО.

**Рекомендация по Глебу:** Дать доступ к платформе с 5-10 проектами → показать 3-5 агентам → записать реакцию → собрать feedback ДО заполнения 100 проектов. Это покажет что агенты реально будут использовать.

---

---

## Секция 14: AJTBD Analysis — Jobs To Be Done

### 5 Segments

| # | Segment | Core Job | Type |
|---|---------|----------|------|
| 1 | **Agency Owner** | Give agents единое пространство со всеми проектами + мгновенные branded офферы | B2B ЛПР (growth engine) |
| 2 | **Individual Agent** | За 2 мин найти юниты + создать branded оффер + отправить в WhatsApp | B2B user (daily) |
| 3 | **Developer / Head of Sales** | Все проекты доступны максимуму агентов с актуальными данными | B2B paying customer |
| 4 | **Internal Sales Team** | Актуальная шахматка + мгновенный оффер с финмоделью | B2B user (retention anchor) |
| 5 | **International Investor** | Получить прозрачную инфо (финмодель, юрид. структура, track record) для решения | B2C end consumer |

### Job Graphs Summary

**Agent: 83 micro jobs across 9 phases**
- Well Served: 18 (22%) — search, filter, project content, chess board
- Underserved: 15 (18%) — partial coverage
- Unserved: 50 (60%) — delivery, tracking, follow-up, closing, post-sale

**Developer: 67 micro jobs across 11 phases**
- Well Served: 20 (30%) — data entry, project setup, construction progress
- Underserved: 10 (15%) — CRM, data freshness
- Unserved: 37 (55%) — distribution, analytics, leads, reporting, special offers

### Feature-to-Job Mapping (Top Features by Jobs Served)

**Tier S: 5+ critical unserved jobs**

| Feature | Unserved Jobs | Impact |
|---------|--------------|--------|
| Quick Offer | Agent 4.2.1-4.2.3 | Core workflow. Without this, Core Job fails. |
| Comparison Tool | Agent 3.2.1-3.2.4, 8.1.1 | 5 fully unserved. Investors always compare. |
| Traffic Analytics (dev) | Dev 6.1-6.6 | 6 fully unserved. Foundation of monetization. |
| Collection Analytics | Agent 6.1.2-6.1.6 | 5 fully unserved. Data-driven follow-up. |
| Special Offers | Dev 5.1-5.5 | 5 fully unserved. Revenue lever + paywall. |

**Tier A: 2-4 critical jobs**

| Feature | Key Jobs | Impact |
|---------|----------|--------|
| WhatsApp Share | Agent 5.1.2 | Primary delivery channel |
| Agent Branding | Agent 4.1.5 | Professional look = adoption |
| Commission Visibility | Agent 3.1.8, 9.1.1 | Direct motivation |
| "My Projects" tagging | Agent 2.1.x | Personalized catalog |
| MLS Resale | Agent 2.2.1-2.2.3, 9.2.3 | 4 unserved, lock-in |
| Offer → CRM pipeline | Dev 8.1-8.5 | Closes the loop |
| Legal/Ownership section | Investor #1 fear | Trust builder |

### Key Insight

Unitbox is a great library without a librarian. Content is excellently cataloged (projects, units, financial models — WELL SERVED). But everything after content creation is UNSERVED:
- How to distribute to agents
- How to create offers FAST
- How to deliver via WhatsApp
- How to track engagement
- How to follow up smartly
- How to close deals
- How to track commissions and analytics

The platform serves 22-30% of jobs (data/content layer) and leaves 55-60% entirely unserved (sales workflow layer).

---

---

## Секция 15: Effectiveness Tracking & Attribution

Context: BREIG call 2026-03-17 — Nikita wants ROI proof. Sean needs sales arguments.

### The Attribution Problem

How to prove Unitbox influenced a deal? 4 levels, from zero-effort to full CRM.

### Level 0: Passive Attribution (NOW, S effort)

Auto-correlate: units in offers → units later sold.
- Log offer↔unit links
- When unit status → "sold", check if it was in offers (last 90 days)
- Show developer: "X offers → Y units from offers sold → $Z correlated revenue"
- Pros: zero friction, automatic, works with existing data
- Cons: correlation ≠ causation

### Level 1: Offer Engagement Tracking (Wave 2-3)

Add: did investor ACTUALLY view the unit?
- HIGH confidence: investor viewed unit in offer → unit sold
- LOW confidence: unit was in offer but never viewed
- Requires: Collection analytics (#20 from roadmap)

### Level 2: Lightweight Deal Tracker (Wave 3, no CRM needed)

Mini-pipeline inside Unitbox:
Sent → Viewed (auto) → Interested → Negotiating → Closed Won/Lost
- Agent updates status in 2 taps on collection page
- Full funnel: Offers → Views → Interest → Deals → Closed
- Metrics: win rate, time to close, revenue through Unitbox

### Level 3: Full CRM Pipeline (Wave 4, per developer)

Bi-directional sync Unitbox ↔ AMO/Bitrix:
- Offer → auto-create deal in CRM
- Unit → link to deal
- Deal status sync back
- Maximum accuracy, single source of truth

### Phased Implementation

```
NOW:     Level 0 (Passive Attribution) — log offer→unit, match with sales
Wave 2:  Level 1 (+ Engagement tracking) — HIGH/LOW confidence
Wave 3:  Level 2 (+ Deal Tracker) — full funnel without CRM
Wave 4:  Level 3 (+ CRM sync) — for enterprise clients (BREIG, Teos)
```

### Sales Pitch Metrics

| Metric | What it shows | Level |
|--------|-------------|-------|
| Offers created | How many times agents proposed your units | 0 |
| Offers viewed | How many investors actually looked | 1 |
| Correlated sales | Units from offers → sold | 0 |
| High-confidence sales | Viewed in offer → sold | 1 |
| Funnel conversion | Offer → Interest → Deal → Closed | 2 |
| Time to close | Average offer-to-deal time | 2 |
| Revenue attributed | $$$ sales through Unitbox | 0+ |

---

*This is a living document. Updated as audit progresses.*
