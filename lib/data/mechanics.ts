import { mechanicsBC } from "./mechanics-bc"
import { mechanicsDE } from "./mechanics-de"
import { mechanicsFGH } from "./mechanics-fgh"

export type MechanicCategory =
  | "business-models"
  | "building-launch"
  | "sales-distribution"
  | "ai-operations"
  | "content-media"
  | "moats-defense"
  | "scaling-org"
  | "mega-patterns"

export interface CaseStudy {
  // Legacy fields (v1 — kept for backward compat with existing data)
  whatTheyDo?: string
  originStory?: string
  financials?: string
  howTheyUseIt?: string
  keyClients?: string
  lessonsForUnitbox?: string
  // New fields (v2 — 9-section deep research)
  mechanicInAction?: string
  jtbd?: string
  monetization?: string
  marketing?: string
  impact?: string
  tocConstraint?: string
  trizContradictions?: string
  conditions?: string
  mvpVersion?: string
}

export interface MechanicExample {
  company: string
  detail: string
  caseStudy?: CaseStudy
}

export interface Mechanic {
  id: string
  title: string
  category: MechanicCategory
  author: string
  summary: string
  whatIsIt: string
  howItWorks: string[]
  keyInsight: string
  examples: MechanicExample[]
  unitboxApplication: string
  icon: string
}

export const CATEGORY_LABELS: Record<MechanicCategory, string> = {
  "business-models": "A. Бизнес-модели и стратегии",
  "building-launch": "B. Построение и запуск продуктов",
  "sales-distribution": "C. Продажи и дистрибуция",
  "ai-operations": "D. AI в операциях",
  "content-media": "E. Контент и медиа",
  "moats-defense": "F. Моаты и защита",
  "scaling-org": "G. Масштабирование и org design",
  "mega-patterns": "H. Мега-паттерны",
}

export const mechanics: Mechanic[] = [
  {
    id: "community-led-ai",
    title: "Community-Led AI",
    category: "business-models",
    author: "Greg Isenberg",
    summary: "Найди нишевое сообщество → определи боль → построй AI tool → монетизируй",
    whatIsIt:
      "Фреймворк построения AI-продуктов через глубокое погружение в нишевые сообщества. Вместо гадания «что построить», ты находишь место где люди уже жалуются на конкретную проблему, строишь AI-решение и продаёшь тем же людям.",
    howItWorks: [
      "Найди активное сообщество (Reddit, Facebook группы, Skool, форумы) с повторяющейся болью",
      "Проанализируй 50-100 постов — выдели паттерн жалоб",
      "Построй AI MVP за 1-2 недели (vibe coding)",
      "Запусти в этом же сообществе, собери первых 10 платящих",
      "Итерируй на основе фидбека, масштабируй на $50-200/мес",
    ],
    keyInsight:
      "«AI для всех» проигрывает «AI для стоматологов». Чем уже ниша, тем выше конверсия и willingness-to-pay. Greg строит 3-5 продуктов одновременно и убивает проигравших быстро.",
    examples: [
      {
        company: "Late Checkout (Greg Isenberg)",
        detail: "Студия стартапов — параллельно строит несколько AI-продуктов для нишевых сообществ",
      },
      {
        company: "HeadshotPro (Danny Postma)",
        detail: "$300K/мес — AI-хедшоты для профессионалов, найдено через LinkedIn-сообщество",
      },
      {
        company: "Нишевые AI-боты",
        detail: "AI для риелторов, AI для стоматологов — $1-5K/мес с каждого клиента",
      },
    ],
    unitboxApplication:
      "Unitbox уже встроен в сообщество Bali real estate (97 девелоперов в pipeline). Можно запустить AI-бот для покупателей Bali недвижимости в Telegram-группах экспатов — он знает все проекты из каталога.",
    icon: "Users",
  },
  {
    id: "ai-agency-model",
    title: "AI Agency Model (AAA)",
    category: "business-models",
    author: "Liam Ottley",
    summary: "Audit → Demo → Retainer — продавай AI-автоматизацию как сервис для SMB",
    whatIsIt:
      "Модель AI-агентства: ты строишь AI-решения (чатботы, голосовые агенты, автоматизация workflows) для малого/среднего бизнеса и берёшь ежемесячный ретейнер. Это новый SMMA (Social Media Marketing Agency), но с маржой 70-90%.",
    howItWorks: [
      "Выбери вертикаль (стоматология, недвижимость, юридика)",
      "Проведи бесплатный AI-аудит бизнеса клиента",
      "Покажи живое демо автоматизации на их данных",
      "Закрой на ретейнер $2-5K/мес за chatbot + voice agent + workflow",
      "Масштабируй до 5-10 клиентов = $20-50K/мес",
    ],
    keyInsight:
      "Не продавай «AI» — продавай результат. «Мы сократим ваши расходы на поддержку на 60%» бьёт «У нас AI чатбот». Рынок AI agency = $7.63B в 2025, прогноз $50.31B к 2030 (CAGR 45.8%).",
    examples: [
      {
        company: "Morningside AI (Liam Ottley)",
        detail: "7-значный revenue, реальное агентство + образовательная платформа AAA Accelerator",
      },
      {
        company: "Соло AI-агентства",
        detail: "5 клиентов × $5K = $25K/мес при 85% марже ($21K прибыль), работа из дома",
      },
      {
        company: "Nate Herk (TrueHorizon AI)",
        detail: "23 года, ушёл из Goldman Sachs, 500K+ подписчиков за <2 года, строит AI receptionists",
      },
    ],
    unitboxApplication:
      "Unitbox может предлагать девелоперам AI-агента для их продаж: чатбот на сайте проекта, voice agent для квалификации лидов, автоматическая рассылка обновлений по ценам. Монетизация через ретейнер $1-3K/мес на девелопера.",
    icon: "Briefcase",
  },
  {
    id: "boring-business-ai",
    title: "Boring Business + AI",
    category: "business-models",
    author: "Codie Sanchez, Alex Hormozi",
    summary: "Купи/запусти скучный бизнес → вкинь AI для 10x leverage → outsized returns",
    whatIsIt:
      "Вместо построения очередного SaaS, купи существующий «скучный» бизнес (прачечная, автомойка, сервисная компания) и внедри AI для радикального снижения затрат и увеличения эффективности. AI-оптимизированный скучный бизнес = высокая маржа + low competition.",
    howItWorks: [
      "Найди бизнес с высоким операционным overhead (много ручной работы, звонков, admin)",
      "Купи или запусти его (часто $50-200K для малого)",
      "Внедри AI: чатбот для клиентов, автоматизация booking, AI-аналитика",
      "Сократи staff costs на 30-50%",
      "Масштабируй — теперь один менеджер управляет тем, что раньше требовало 5 человек",
    ],
    keyInsight:
      "Hormozi: «AI не заменяет людей — AI заменяет неэффективность». Скучные бизнесы имеют низкую техническую грамотность = мало конкуренции за AI-внедрение. Codie Sanchez использовала ChatGPT Operator для создания flipping-бизнеса на Facebook Marketplace.",
    examples: [
      {
        company: "Codie Sanchez portfolio",
        detail: "Покупает прачечные, автомойки, сервисные бизнесы и оптимизирует через AI. Contrarian Thinking community — 9K+ членов",
      },
      {
        company: "Hormozi portfolio (Acquisition.com)",
        detail: "$200M+ портфель. ACQ AI обучен на $31M консалтинга через 1026+ бизнесов. Команда ускорилась на 40% через AI",
      },
      {
        company: "Сервисные бизнесы + AI",
        detail: "Cleaning company + AI scheduling + chatbot booking = -40% admin costs, +25% bookings",
      },
    ],
    unitboxApplication:
      "Unitbox уже «скучный бизнес» (каталог недвижимости) с AI injection. Следующий шаг — предлагать девелоперам AI-оптимизацию их продаж как сервис: «мы автоматизируем ваш процесс продаж от лида до сделки».",
    icon: "Building",
  },
  {
    id: "wrapper-value-chain",
    title: "Wrapper Value Chain",
    category: "business-models",
    author: "Danny Postma, Pieter Levels",
    summary: "API + UX + Trust + Workflow = продукт, за который люди платят $29+/мес",
    whatIsIt:
      "«AI wrapper» перестал быть ругательством. Модель: берёшь API (OpenAI, Stability, etc.), добавляешь отличный UX, trust signals и workflow-интеграцию — получаешь продукт, за который люди платят. Ценность не в API, а в convenience layer.",
    howItWorks: [
      "Найди конкретный use case где люди уже используют ChatGPT/Claude вручную",
      "Построй специализированный интерфейс (не чат, а workflow)",
      "Добавь trust: landing page, testimonials, guarantees",
      "Сделай результат на 10x проще чем «сделай сам через API»",
      "Заряди $29-99/мес — люди платят за convenience",
    ],
    keyInsight:
      "Danny Postma: «Люди заплатят $29 за то, что могут технически сделать сами через API». Wrapper добавляет UX, trust, и workflow-интеграцию которые raw API не даёт. Термин «wrapper» был уничижительным в 2023 — к 2025 он описывает billion-dollar компании.",
    examples: [
      {
        company: "HeadshotPro (Danny Postma)",
        detail: "$300K/мес, $3.6M ARR — AI-хедшоты. Solo founder, работает из Бали. SEO-first distribution",
      },
      {
        company: "PhotoAI (Pieter Levels)",
        detail: "$138K/мес — AI-фото. Нуль сотрудников. Vanilla tech stack (PHP + jQuery + AI APIs)",
      },
      {
        company: "Jasper, Copy.ai",
        detail: "AI-копирайтинг wrappers — десятки миллионов ARR, хотя это «просто GPT wrapper»",
      },
    ],
    unitboxApplication:
      "AI-powered property report generator: покупатель вводит бюджет и предпочтения → AI анализирует каталог → выдаёт персонализированный PDF с рекомендациями. Это wrapper над каталогом + AI, за который агенты будут платить.",
    icon: "Package",
  },
  {
    id: "application-layer-thesis",
    title: "Application Layer Thesis",
    category: "business-models",
    author: "Elad Gil",
    summary: "Строй apps с доменной экспертизой, не infrastructure. Не конкурируй с OpenAI — строй поверх",
    whatIsIt:
      "AI рынок формируется в слои: foundation models (мало победителей), infrastructure/tooling (много), applications (больше всего). Максимальная ценность аккумулируется на application layer — там где доменная экспертиза встречается с AI. Ключевой тест: может ли OpenAI/Anthropic/Google добавить это как фичу? Если да — pivot, добавь domain-specific data. Если нет (proprietary data/relationships) — safe.",
    howItWorks: [
      "Выбери индустрию которую знаешь глубоко",
      "Найди самый дорогой/болезненный workflow",
      "Построй AI-приложение решающее этот workflow end-to-end",
      "Используй foundation models как commodity input (не строй свои)",
      "Моат = проприетарные данные + domain expertise + switching costs. AI wrapper без proprietary data = dead on arrival",
    ],
    keyInsight:
      "Контрарианский тезис Elad Gil: «AI infrastructure переоценена, AI applications недооценены». Infrastructure = knife fight между хорошо финансированными гигантами. Applications с доменной экспертизой имеют defensible moats. AI wrapper без proprietary data = dead on arrival. Harvey safe (юр. данные). Cursor safe (IDE experience). Generic AI writing tool = dead (Jasper потерял 50%+ revenue).",
    examples: [
      {
        company: "Harvey (юридический AI)",
        detail: "$11B оценка — AI-юрист для топовых юрфирм. Глубокая доменная экспертиза = непробиваемый моат",
      },
      {
        company: "Cursor ($29.3B)",
        detail: "Safe: IDE experience + workflow. ChatGPT не станет IDE",
      },
      {
        company: "Killed by ChatGPT",
        detail: "AI writing tools, summarizers — commoditized. Jasper потерял 50%+ revenue",
      },
      {
        company: "Abridge (медицинский AI)",
        detail: "Автоматизация клинической документации — врач-пациент разговоры → структурированные заметки",
      },
      {
        company: "EvenUp (юридический AI)",
        detail: "Генерация demand letters для personal injury с высокой точностью",
      },
    ],
    unitboxApplication:
      "Unitbox safe: OpenAI не построит каталог Бали. Проприетарные данные + relationships = непробиваемый moat. Классический application layer play.",
    icon: "Layers",
  },
  {
    id: "picks-and-shovels",
    title: "Picks and Shovels",
    category: "business-models",
    author: "Marc Lou, Matt Wolfe, Ben Tossell",
    summary: "Продавай инструменты и знания тем, кто строит AI — лопаты во время золотой лихорадки",
    whatIsIt:
      "Meta-play: вместо строительства AI-продуктов для конечных пользователей, продавай инструменты, boilerplates, образование и кураторство тем, кто строит. Во время золотой лихорадки больше всего зарабатывают продавцы лопат.",
    howItWorks: [
      "Определи что нужно AI-строителям (шаблоны, курсы, директории, инструменты)",
      "Построй/курируй этот ресурс",
      "Монетизируй через: продажу boilerplates, affiliate, listings, sponsorships, подписку",
      "Масштабируй через content marketing и community",
      "Revenue компаундится — каждый новый AI-строитель = потенциальный клиент",
    ],
    keyInsight:
      "Marc Lou зарабатывает $50K/мес продавая boilerplate (ShipFast) для тех кто строит AI SaaS. Matt Wolfe зарабатывает на FutureTools.io (AI директория) через affiliate и sponsorships. Ben Tossell's Ben's Bites (100K+ подписчиков) — самый крупный AI newsletter. Все трое зарабатывают больше чем большинство AI-продуктов.",
    examples: [
      {
        company: "ShipFast (Marc Lou)",
        detail: "$50K/мес — Next.js boilerplate для AI SaaS. Build Friday → Launch Monday → Kill or Iterate Friday",
      },
      {
        company: "FutureTools.io (Matt Wolfe)",
        detail: "AI директория, 694K подписчиков на YouTube, 230K+ email. Revenue: affiliate + listings + sponsorships",
      },
      {
        company: "Ben's Bites (Ben Tossell)",
        detail: "100K+ подписчиков, крупнейший AI newsletter. Продал Makerpad Zapier'у, теперь курирует AI",
      },
    ],
    unitboxApplication:
      "Unitbox может монетизировать свою экспертизу в AI-заполнении каталогов: продавать pipeline/methodology другим proptech компаниям, создать курс «как автоматизировать каталог недвижимости с AI», или лицензировать AI-агентов.",
    icon: "Pickaxe",
  },
  {
    id: "saas-waas-raas",
    title: "SaaS → WaaS → RaaS",
    category: "business-models",
    author: "Dharmesh Shah",
    summary: "Software → Work → Results as a Service. AI виртуальные работники = 100x pricing vs per-seat SaaS",
    whatIsIt:
      "SaaS продаёт доступ к софту. WaaS (Work as a Service) продаёт выполненную работу через AI-агентов. RaaS (Results as a Service) продаёт гарантированный результат. Ребрендинг AI из tool в «виртуального сотрудника» с именем и KPI = 100x pricing. Per-seat SaaS $50/мес → AI virtual worker $3-5K/мес. Тот же AI, другой framing.",
    howItWorks: [
      "SaaS: подписка за доступ к инструменту ($X/seat/мес)",
      "WaaS: AI-агент выполняет работу как виртуальный сотрудник ($X/task или $3-5K/мес)",
      "RaaS: платишь только за результат ($X/outcome — за лид, за сделку, за решённый тикет)",
      "AI virtual worker: получает роль и KPI (SDR, support, analyst), работает 24/7, scales instantly",
      "Каждый шаг повышает ценность и pricing power. RaaS = самая высокая маржа",
    ],
    keyInsight:
      "Dharmesh Shah купил chat.com за $15M+ — conviction в AI-first будущем. Agent.ai = 2M+ пользователей. Ребрендинг AI из tool в employee = 100x pricing. Per-seat SaaS $50/мес. AI virtual worker $3-5K/мес. Тот же AI, другой framing. Per-seat pricing ломается когда AI-агент заменяет 3 сотрудников.",
    examples: [
      {
        company: "Agent.ai (Dharmesh Shah)",
        detail: "2M+ пользователей, маркетплейс AI-агентов. Dharmesh — CTO $30B+ HubSpot",
      },
      {
        company: "11x.ai «Alice»",
        detail: "AI SDR за $3-5K/мес вместо человека за $60-80K/год. Research → personalize → send → book. Priced as headcount",
      },
      {
        company: "Artisan Ava",
        detail: "AI BDR. Full outbound pipeline. Priced as headcount replacement",
      },
      {
        company: "Devin",
        detail: "$2B+. AI Software Engineer. Junior dev salary pricing",
      },
      {
        company: "SaaStr case study",
        detail: "140% Q1 revenue с 1.25 человека + 20 AI агентов. Classic WaaS→RaaS transition",
      },
    ],
    unitboxApplication:
      "Эволюция: сейчас Unitbox = SaaS (каталог). Следующий шаг: «AI Property Manager» — 24/7 обновляет каталог, отвечает покупателям, reports. $1-2K/мес. Финальный RaaS: девелопер платит $X за каждого квалифицированного лида.",
    icon: "TrendingUp",
  },
  {
    id: "vertical-ai-agent",
    title: "Vertical AI Agent",
    category: "business-models",
    author: "Y Combinator, Sarah Guo, Sequoia",
    summary: "Узкий AI-агент для конкретной индустрии = winner-take-vertical. Первый с quality + data = 60-80% рынка",
    whatIsIt:
      "Вместо горизонтального AI «для всех» — специализированный AI-агент глубоко понимающий одну индустрию. Заменяет не инструмент, а целую рабочую функцию. Sequoia: «1000 вертикальных AI-агентов» — каждая функция в каждой индустрии получит своего AI winner. Первый quality product + compound data = доминирует 60-80% вертикали.",
    howItWorks: [
      "Выбери индустрию + job function (юрист в PI, бухгалтер в SMB, SDR в SaaS)",
      "Собери проприетарные данные для обучения (workflows, документы, кейсы)",
      "Построй агента который выполняет 80%+ работы автономно",
      "Стань default solution — compound data: каждый клиент → AI лучше",
      "Network effects: больше клиентов → больше данных → лучше продукт → winner takes 60-80%",
    ],
    keyInsight:
      "Sarah Guo: «Лучшие AI-компании не продают AI — они продают outcomes.» Gartner: 80% enterprise примут vertical AI agents к 2026. Vertical AI стартапы привлекли $15B+ в 2025. ServiceTitan ~$9B IPO (домашние услуги). Veeva $38B (фарма CRM). Кто первый с quality + compound data = winner.",
    examples: [
      {
        company: "Harvey (юридический AI)",
        detail: "$11B оценка, $190M ARR, 1000+ клиентов. $0→$100M ARR за 36 мес — один из самых быстрых B2B SaaS",
        caseStudy: {
          mechanicInAction: "Harvey воплощает механику Vertical AI Agent в чистом виде: вместо горизонтального AI-инструмента «для всех», компания построила глубоко специализированную платформу для юридической индустрии, заменяющую работу junior-юристов.\n\nКлючевые архитектурные решения:\n— Каскадная архитектура LLM: каждый запрос проходит через цепочку моделей — fine-tuned LLM для юридического синтеза, RAG-системы с доступом к публичным и приватным юридическим базам, reasoning-модели (o1) для декомпозиции задач\n— Мульти-модельный подход: OpenAI, Anthropic, Google — Harvey маршрутизирует запросы к оптимальной модели\n— 4 продукта: Assistant (research/drafting), Vault (document analysis), Knowledge (firm knowledge base), Workflows (автоматизация юридических процессов)\n— Инфраструктура на Azure (AKS, PostgreSQL, Container Registry)\n\nЧто решили НЕ делать:\n— Не строили horizontal AI tool — только legal vertical\n— Не пытались заменить senior юристов — целились в рутинную работу junior associates\n— Не делали self-serve — только enterprise sales с forward-deployed инженерами\n— Не строили foundation model с нуля — fine-tuning поверх существующих\n\nТаймлайн: лето 2022 — основание (GPT-3 эксперименты с r/legaladvice). Ноябрь 2022 — $5M seed от OpenAI Startup Fund. Февраль 2025 — Series B $300M при $5B оценке. Июнь 2025 — альянс с LexisNexis. Август 2025 — $100M ARR. Декабрь 2025 — $8B, $190M ARR. Март 2026 — $200M раунд при $11B, 1000+ клиентов.",
          jtbd: "Core Functional Job: Когда партнёр юридической фирмы получает новое дело с сотнями документов, хочу быстро получить качественный анализ прецедентов и ключевых клаузул, чтобы подготовить позицию в срок и не раздувать бюджет на billable hours junior associates.\n\nEmotional Job: Чувствовать, что моя фирма технологически передовая, не отстаёт от конкурентов, и что я лично контролирую качество — AI усиливает мою экспертизу, а не подменяет её.\n\nSwitching Trigger: Конкурирующая фирма выиграла pitch, потому что предложила клиенту быстрее и дешевле. Пример: LPHS выиграли нового клиента, ответив на urgent request за 48 часов вместо недели.\n\nPush (от старого): Junior associates тратят 60-70% времени на research и document review. Billable rates растут ($400-800/час), но клиенты давят на бюджеты. Качество зависит от усталости конкретного юриста.\n\nPull (к новому): 2-10 часов экономии в неделю на рутине. Document review 2000 документов за час вместо недели. 94.8% accuracy в benchmark — выше юриста в 4 из 6 задач.\n\nAnxiety (тормоз): «AI галлюцинирует — а мы несём fiduciary duty». Решение: RAG с верифицированными источниками (LexisNexis + Shepard's Citations), forward-deployed ex-lawyers в customer success (10% команды), Harvard Business School case study как социальное доказательство.\n\nHabit (инерция): Десятилетиями юристы работают через Westlaw/LexisNexis + Word + email. Решение: интеграция с существующими DMS, обязательное обучение при внедрении, change management через dedicated customer success.\n\nConsumption Chain: Discovery (конференции, peer referral от Am Law 100) → Evaluation (pilot 20 seats, 12 мес.) → Adoption (обучение, forward-deployed engineers) → Expansion (median seat count удваивается за 12 месяцев) → Referral (юристы переходят между фирмами и тащат Harvey с собой).\n\nOutcome Metrics: часы, сэкономленные на review (до 10 ч/неделю), время до первого ответа клиенту, accuracy по benchmark, adoption rate внутри фирмы, ROI через 90 дней (2/3 клиентов видят результат).",
          monetization: "Pricing model: per-seat subscription с enterprise minimums.\n\nКонкретные тарифы:\n— Базовый: ~$1,200/юрист/месяц ($14,400/год на seat)\n— Минимум: ~20 seats, 12-месячный контракт\n— Минимальный годовой контракт: ~$288,000\n— Дополнительно: implementation fees, обязательное обучение, кастомизация\n— Sector-specific модули (insurance, financial services) как upsell\n\nUnit economics (оценки):\n— ARR: $190M+ (конец 2025), рост 100%+ YoY\n— Клиентов: 1000+ организаций, 100,000+ юристов\n— Average deal size: ~$190K/год (ARR / клиенты), Am Law 100 фирмы — до $1-5M/год\n— Gross margin: ~70-80% (основные расходы: inference + forward-deployed team)\n— LTV: высокий — median seat count удваивается за 12 мес., контракты годовые с expansion\n— CAC payback: 12-18 месяцев (enterprise sales cycle)\n— Valuation multiple: 58x ARR\n\nПочему per-seat работает: юридические фирмы привыкли думать в терминах billable hours per person. Per-seat pricing интуитивно понятен, легко budget approval, и natural expansion metric — больше юристов = больше seats.",
          marketing: "GTM motion: Top-down enterprise sales. Не PLG, не self-serve. Dedicated sales team во главе с Rob Saliterman (ex-VP Sales), обеспечивший 4x рост ARR.\n\nKey channels:\n— Direct enterprise sales в Am Law 100 (42% уже клиенты к 2025)\n— Strategic partnerships: LexisNexis (data moat + co-distribution), PwC (4000+ юристов в 100+ странах)\n— Forward-deployed engineers (10% команды — ex-lawyers) как growth lever: живут внутри фирм-клиентов, обеспечивают adoption\n\nPartnerships:\n— LexisNexis: доступ к Shepard's Citations и US primary law — создаёт data moat, вынуждает конкурентов пересмотреть стратегию контента\n— PwC: доступ к enterprise legal departments (in-house counsel) в 100+ странах\n— Microsoft/Azure: инфраструктурное партнёрство\n— OpenAI: стартовый инвестор + кастомные модели\n\nSales cycle: 3-6 месяцев для enterprise. Pilot (20 seats) → доказательство ROI за 90 дней → expansion.\n\nПервые 10 клиентов: Allen & Overy (теперь A&O Shearman) — flagship. Связи Winston Weinberg с BigLaw + OpenAI brand как social proof. Peer referral среди Managing Partners Am Law 100 — юридическое сообщество тесное.\n\nReferral mechanics: юристы часто переходят между фирмами. Привыкший к Harvey юрист лоббирует закупку на новом месте. При 42% Am Law 100 — «все так делают», NOT having Harvey становится конкурентным недостатком.",
          impact: "Для клиента:\n— Document review (2000 docs): 1 неделя → менее 1 часа\n— Рутинный research: 3-5 часов/задача → 30-60 мин\n— Экономия времени юриста: 2-10 часов/неделю\n— Contract review time: -30% (A&O Shearman, 4000 сотрудников, 43 юрисдикции)\n— Time to benefit: 66% клиентов видят результат за 90 дней, 33% за 30 дней\n— Accuracy (benchmark): 94.8% — превышает юристов в 4 из 6 задач\n\nДля компании:\n— Ноябрь 2022: $5M seed, ~10 человек\n— 2023: первые крупные клиенты (A&O), ~50 сотрудников\n— Начало 2025: $50M ARR, $5B оценка, ~350 сотрудников\n— Август 2025: $100M ARR, 500+ клиентов, 500+ сотрудников\n— Декабрь 2025: $190M ARR, $8B оценка\n— Март 2026: $200M раунд, $11B оценка, 1000+ клиентов, ~1000 сотрудников\n\n$0 → $100M ARR за 36 месяцев — один из самых быстрых B2B SaaS в истории.",
          tocConstraint: "Системное ограничение: throughput юридического анализа ограничен количеством часов квалифицированных junior associates. Фирма может взять ровно столько дел, сколько juniors могут прочитать и проанализировать документов. Это THE bottleneck — партнёры, клиенты, сделки ждут, пока juniors доделают research.\n\nКак идентифицировали: Winston Weinberg работал junior associate в O'Melveny & Myers и лично переживал этот bottleneck — тратил дни на чтение тысяч страниц для due diligence и litigation research.\n\nExploit: первый продукт — AI Assistant для рутинного research и document review. Не заменяет юриста, а убирает bottleneck: junior теперь проверяет output AI вместо работы с нуля. Throughput вырос в 5-10x.\n\nSubordinate: вся компания подчинена этому ограничению. 4 продукта (Assistant, Vault, Knowledge, Workflows) атакуют разные аспекты юридического throughput. 10% команды — ex-lawyers с единственной задачей: обеспечить adoption (если юристы не используют tool, bottleneck не исчезает).\n\nElevate: LexisNexis partnership фундаментально увеличивает capacity — RAG с верифицированными источниками + Shepard's Citations убирает необходимость ручной проверки цитат. Поднимает потолок с «AI помогает искать» до «AI выдаёт готовый, проверенный результат».\n\nКуда сместилось: новый bottleneck — adoption и change management. Юристы имеют инструмент, но не используют из-за привычек, страха и организационной инерции. Поэтому Harvey вкладывает в forward-deployed teams и mandatory training.",
          trizContradictions: "Техническое противоречие #1: «Точность юридического анализа улучшается (AI обрабатывает больше данных), но доверие юристов ухудшается (чем сложнее модель, тем меньше transparency)». Решение: RAG с верифицированными источниками (LexisNexis + Shepard's Citations) — каждый ответ привязан к конкретному прецеденту с цитатой. Transparency без потери accuracy.\n\nТехническое противоречие #2: «Скорость внедрения растёт (больше клиентов, быстрее продажи), но качество customization падает (каждая фирма уникальна)». Решение: forward-deployed engineers (10% команды) — масштабируемая, но персонализированная имплементация.\n\nФизическое противоречие: AI-система должна быть одновременно универсальной (работать для любой юрисдикции, типа права, размера фирмы) И специализированной (понимать контекст конкретной фирмы, её прецеденты, стиль документов). Решение: каскадная архитектура — base models универсальны, fine-tuning и RAG специализированы для каждого клиента.\n\nИзобретательские приёмы:\n— Приём 1 (Сегментация): разбили юридическую работу на дискретные задачи (research, drafting, review, diligence) и создали специализированный AI для каждой\n— Приём 3 (Местное качество): разные LLM для разных задач — reasoning model для аргументации, RAG для research, fine-tuned model для drafting\n— Приём 5 (Объединение): слили AI платформу с юридической БД (LexisNexis) — раньше две отдельные системы\n— Приём 10 (Предварительное действие): forward-deployed engineers проводят mandatory training ДО запуска — снимают anxiety и habit barriers заранее\n— Приём 26 (Копирование): вместо строительства собственной юридической базы, скопировали access к LexisNexis\n\nИКР: юридический анализ любой сложности выполняется мгновенно, с 100% accuracy, без участия человека, при этом каждый вывод юридически обоснован и цитируем.\n\nМобилизация ресурсов: использовали OpenAI/Anthropic/Google модели вместо обучения с нуля; LexisNexis — десятилетия оцифрованных данных за одно партнёрство; Azure — enterprise-grade security без своего cloud; rolodex Weinberg из O'Melveny → первые enterprise клиенты.",
          conditions: "Founder background:\n— Winston Weinberg: JD из USC, практикующий юрист в O'Melveny & Myers (Am Law 50). Понимал pain изнутри, имел связи в BigLaw.\n— Gabriel Pereyra: research scientist в DeepMind, Google Brain, Meta AI. Понимал capabilities LLM до мейнстрима.\n— Были соседями в LA — chemistry и доверие до основания компании.\n\nMarket timing: лето 2022 — GPT-3 уже доступен, но ChatGPT ещё не вышел (ноябрь 2022). Harvey успел начать до хайпа, получил seed от OpenAI Fund и стал first mover когда юридическая индустрия проснулась в 2023.\n\nTechnology readiness: GPT-3/3.5 впервые показали достаточное качество для юридического текста. До этого NLP-модели не справлялись с нюансами юридического языка, multi-jurisdictional reasoning и длинными документами.\n\nRegulatory/industry context: юридическая индустрия — одна из самых консервативных, но это стало tailwind: огромный unmet demand (клиенты давят на снижение billable hours), при этом мало конкуренции от incumbents (Westlaw/LexisNexis двигались медленно).\n\nCapital requirements: $5M seed → $21M Series A → $80M Series B → $300M Series C → $700M+ всего. Нужен значительный капитал на enterprise sales team, forward-deployed engineers и inference costs.\n\nNetwork effects: каждый крупный клиент (A&O, PwC) создаёт social proof. При 42% Am Law 100 — NOT having Harvey = конкурентный недостаток. Data network effect: больше использования → лучше fine-tuning → лучше продукт.",
          mvpVersion: "Гипотеза: профессионалы в [вашей вертикали] тратят 60%+ времени на research/review рутины, и AI agent с domain-specific RAG может сократить это в 5x, за что они готовы платить $500+/мес.\n\nЭксперимент (1-2 недели, $0-500):\n1. Выбрать узкую вертикаль (медицина, бухгалтерия, страхование — НЕ юристы, Harvey уже там)\n2. Собрать 100 типичных вопросов из Reddit/форумов этой индустрии (как Harvey начинал с r/legaladvice)\n3. Построить RAG pipeline: Claude/GPT-4 + vector store (Pinecone free tier) + 20-50 отраслевых документов\n4. Прогнать 100 вопросов, попросить 3-5 практикующих специалистов оценить качество (accuracy, полезность)\n5. Если accuracy >80% и специалисты говорят «это сэкономило бы мне время» — гипотеза подтверждена\n\nМетрика успеха: >=4 из 5 специалистов оценивают ответы как «я бы использовал это в работе». Accuracy по domain-specific benchmark >80%.\n\nСледующий шаг: развернуть как Telegram/Slack бот для 10 специалистов на 2 недели бесплатно. Если DAU >60% и NPS >50 — строить web-приложение и charged pilot ($500/мес).",
        },
      },
      {
        company: "Sierra (customer service AI)",
        detail: "$10B оценка, $150M+ ARR за 21 мес. Outcome-based pricing, 70%+ auto-resolution, 40% Fortune 50",
        caseStudy: {
          mechanicInAction: "Sierra строит автономных AI-агентов, полностью заменяющих BPO call-центры для крупных брендов. Основана в феврале 2023 Bret Taylor (экс-CEO Salesforce, Chairman OpenAI) и Clay Bavor (18 лет в Google, руководил Gmail/Drive/Docs).\n\nКлючевые архитектурные решения:\n• Constellation-of-models: вместо одной LLM, Sierra оркестрирует 15+ моделей (frontier, open-weight, proprietary) — каждая выполняет задачу, для которой лучше подходит. Supervisor-слой контролирует качество и guardrails.\n• Agent OS с модульными абстракциями: агенты собираются из изолированных capabilities (retrieval, classification, tools, policies, tone) через Agent SDK. Не монолитный бот, а composable system.\n• Omnichannel deploy: один агент работает в chat, phone, email, SMS. Voice-агент запущен в production раньше всех конкурентов (через design partnership с SiriusXM).\n• Outcome-based pricing: берут деньги за resolved conversation, не за подписку. Эскалированные кейсы — часто бесплатно.\n\nЧего НЕ делают: не строят generic helpdesk (как Zendesk), не продают API для разработчиков (как OpenAI), не делают horizontal platform. Только вертикаль customer service, только enterprise.\n\nTimeline: основание — фев 2023. Public launch — фев 2024. $100M ARR — янв 2026 (21 месяц). $150M+ ARR — начало 2026. Команда ~400-600 человек. $635M привлечено, valuation $10B.",
          jtbd: "Core Functional Job: «Когда у меня миллионы клиентов звонят/пишут в поддержку ежемесячно, хочу автоматизировать 70%+ обращений с высоким CSAT, чтобы снизить стоимость CX на 50%+ без потери качества.»\n\nEmotional Job: VP of Customer Experience хочет чувствовать себя инноватором, а не «тем, кто просто резал бюджет на BPO». Хочет показать борду метрики роста, а не сокращения.\n\nSwitching Trigger: Контракт с BPO-провайдером приходит на renewal ($10M+/год) + CEO прочитал в WSJ что конкурент внедрил AI-агентов + CSAT упал ниже порога.\n\nPush (от старого): BPO-агенты дорогие ($15-25/час), текучка 30-50%/год, качество нестабильное, скрипты устарели, масштабирование = нанять 200 человек за 3 месяца. Ожидание на линии 10+ минут.\n\nPull (к новому): Мгновенный ответ 24/7, consistent quality, 70%+ resolution rate, outcome-based pricing (платишь только за результат), агент улучшается с каждым обновлением модели автоматически.\n\nAnxiety (тормоз): «AI облажается с VIP-клиентом и будет скандал в Twitter.» Разрешение: supervisor layers, guardrails, эскалация на человека при неуверенности, compliance-grade audit trail. «Что если не заработает?» — outcome-based pricing снимает риск: не работает = не платишь.\n\nHabit (инерция): Существующая BPO-инфраструктура, обученные агенты, integrated CRM workflows, SLA с аутсорсером. Преодоление: интеграция с существующими CRM/knowledge bases, постепенный rollout (начинают с простых кейсов, расширяют), design partner program для co-development.\n\nConsumption Chain: Discovery (CEO/CXO видит выступление Bret Taylor на конференции или case study в TechCrunch) → Evaluation (design partner program, POC на одном workflow за 4-6 недель) → Adoption (запуск на 1 канале, 1 типе запросов) → Expansion (добавляют voice, email, сложные workflows, новые бренды внутри холдинга) → Referral (VP of CX рассказывает на Dreamforce/NRF, публичный case study на sierra.ai).\n\nOutcome Metrics: % автоматически resolved conversations, CSAT score (целевой 4.5+/5), average handle time, cost per resolution vs BPO agent, escalation rate, first-contact resolution rate.",
          monetization: "Pricing model: outcome-based (per resolution) + hybrid consumption-based для routing/greeter interactions.\n\nТарификация по сложности: простой FAQ — дешёвый resolution. Multi-step workflow с identity checks и account actions — дороже. Если кейс эскалирован на человека — чаще всего бесплатно. Для routing/greeter-сценариев — consumption-based по количеству conversations.\n\nКонтрактные условия: годовые enterprise-контракты. Минимальный порог входа ~$150K/год. Setup fee $50K-$200K (интеграция, обучение агента, fine-tuning). Year-1 полный бюджет: $200K-$350K+. Крупные клиенты (Fortune 500) — $1M+/год.\n\nUnit economics (оценка): при $150M+ ARR и ~400-600 сотрудниках, revenue per employee ~$250K-375K. Gross margin оценочно 70-80% (основной COGS — inference costs, которые падают с каждым поколением моделей). Enterprise CAC — $50K-150K (дорогой enterprise sales cycle). LTV — $500K-$2M+ (multi-year contracts, expansion внутри клиента). Payback period — 6-12 месяцев.\n\nRevenue scale: $100M ARR (январь 2026, 21 месяц после launch). $150M+ ARR (начало 2026). Сотни клиентов. Рост 3-5x год к году. Первый год после launch — ~$20M+ ARR.\n\nAverage deal size: ~$300K-500K/год (оценка на основе $150M ARR / 300-400 клиентов).\n\nПочему outcome-based работает: (1) снижает risk для покупателя — «платишь только если работает»; (2) выравнивает incentives — Sierra заинтересована в качестве resolution; (3) позволяет premium pricing по сравнению с per-seat SaaS; (4) маржа растёт с улучшением моделей — inference дешевеет, resolution rate растёт, а цена за resolution не падает.",
          marketing: "GTM motion: top-down enterprise sales. Founder-led selling на старте — Bret Taylor (экс-CEO Salesforce) лично звонил CEO Fortune 500. Classic enterprise sales с AE, SE, solutions engineering.\n\nKey channels: (1) Personal network Bret Taylor — CXO-level relationships из Salesforce/Google/Facebook/Twitter. Это главный канал первых 2 лет. (2) PR и thought leadership — TechCrunch, Bloomberg, Fortune, CNBC. Каждый funding round = PR-волна. (3) Конференции и подкасты — Sequoia Capital «Training Data», Acquired.fm, отраслевые CX-конференции. (4) sierra.ai blog с technical deep-dives (constellation of models, agent development lifecycle).\n\nPartnerships: Prudential Financial (финансовый сектор), SiriusXM (voice design partner), потенциальные партнёрства с telecom и automotive. Не замечены partnerships с SI (Accenture, Deloitte) — пока direct sales.\n\nContent/events: blog sierra.ai с публичными case studies (Sonos, WeightWatchers, SiriusXM). Видео «Sierra Explained» с founders. Technical blogs про архитектуру. Подкасты у tier-1 VC (Sequoia).\n\nSales cycle: 4-6 недель POC (design partner program или paid pilot) → 2-4 месяца до enterprise contract. Общий цикл 3-6 месяцев.\n\nReferral mechanics: публичные case studies с конкретными метриками (70% resolution, 4.6 CSAT) → другие enterprise CXO видят результаты и приходят inbound. VP of CX рассказывает на конференциях.\n\nПервые 10 клиентов: design partner program — hand-picked brands с готовым бюджетом на CX innovation и болью с BPO. Bret Taylor лично звонил CEO. SiriusXM стала design partner для voice-продукта. WeightWatchers, Sonos — ранние design partners. Подход: «мы построим вместе, вы получите конкурентное преимущество раньше всех».",
          impact: "ДЛЯ КЛИЕНТА (до/после):\n• % auto-resolved: 0-10% (IVR/FAQ бот) → 70%+ (Sierra AI agent)\n• CSAT: 3.5-4.0/5 → 4.6/5 (WeightWatchers)\n• Время ответа: 10+ мин hold → мгновенно (24/7)\n• Cost per resolution: $5-15 (BPO agent) → $1-3 (оценка, AI agent)\n• Масштабирование: нанять +200 людей за 3 мес → мгновенно\n• 24/7 coverage: дорого (ночные смены, offshore) → включено в стоимость\n• Agent burnout/текучка: 30-50%/год → 0%\n\nКонкретные кейсы:\n• WeightWatchers: AI-агент обрабатывает ~70% customer sessions, CSAT 4.6/5\n• SiriusXM: 70%+ resolution rate в первый год, включая диагностику радио-проблем\n• Sonos: от простых FAQ до полного setup новых продуктов, troubleshooting, управления заказами и возвратами\n\nДЛЯ SIERRA:\n• Янв 2023: основание (2 человека)\n• Янв 2024: Series A — $85-110M, valuation $1B\n• Фев 2024: публичный launch\n• Окт 2024: Series C — $175M, valuation $4.5B\n• Сен 2025: Series B — $350M, valuation $10B\n• Янв 2026: $100M ARR (21 месяц после launch)\n• Начало 2026: $150M+ ARR, ~400-600 сотрудников\n• Итого: $635M привлечено. Valuation multiple ~67-100x ARR.",
          tocConstraint: "Системное ограничение: bottleneck в customer service — не количество агентов, а quality + consistency при масштабе. BPO-модель упирается в физический лимит: нанять → обучить → удержать людей. Текучка 30-50%/год = вечный цикл re-training. Constraint — throughput качественных resolution'ов при масштабе.\n\nКак идентифицировали: Bret Taylor как CEO Salesforce видел изнутри, как крупнейшие компании мира тратят миллиарды на CX и всё равно получают плохой CSAT. Clay Bavor как руководитель Google Workspace видел проблемы support на миллиардах пользователей. Оба знали: bottleneck — не софт (Zendesk/Salesforce есть у всех), а сами человеческие агенты и их physical throughput.\n\nExploit: начали с простых кейсов (FAQ, статус заказа, управление подпиской) — low-hanging fruit с высоким volume и низким risk. Это дало 70% resolution rate сразу и доказало ROI клиенту за 4-6 недель POC.\n\nSubordinate: весь продукт подчинён одной метрике — resolution rate при высоком CSAT. Agent SDK, constellation-of-models, supervisor layers — всё оптимизировано под максимальный autonomous resolution. Outcome-based pricing напрямую привязан к этой метрике. Наняли enterprise sales (не PLG), потому что constraint requires trust — enterprise CXO должен лично убедиться.\n\nElevate: (1) constellation-of-models — переход от одной LLM к 15+ специализированным моделям, каждая оптимальна для своей задачи. (2) Voice agent — раскрытие нового канала (phone = 40%+ enterprise support volume). (3) Каждое улучшение frontier-моделей автоматически увеличивает capacity без работы Sierra. (4) Agent SDK позволяет клиентам самим расширять capabilities.\n\nКуда сместилось: новый bottleneck — complex multi-step workflows (L2/L3 support), требующие глубокой интеграции с бизнес-системами (биллинг, логистика, compliance, identity verification). Sierra движется в сторону deeper enterprise integrations и более сложных workflow automation. Следующее ограничение — trust для high-stakes decisions (отмена крупного заказа, медицинский совет).",
          trizContradictions: "Техническое противоречие #1: «Автономность агента растёт → но риск ошибки растёт.» Чем больше агент делает сам (отмена заказов, возвраты, account changes), тем выше impact ошибки. Разрешение: supervisor layers — отдельные модели-контролёры проверяют решения агента в real-time. Разные уровни «agency» для разных задач: FAQ = полная автономия, финансовые операции = supervisor approval.\n\nТехническое противоречие #2: «Универсальность (работа на любом бренде) vs специализация (знание домена клиента).» Разрешение через Agent SDK: платформа универсальна (Agent OS), но каждый агент собирается из модульных skills, кастомизированных под конкретный бренд (его tone of voice, policies, knowledge base, integrations).\n\nФизическое противоречие: агент должен быть одновременно «дешёвым» (outcome-based $1-3 за resolution для клиента) И «умным» (уровень L2 техподдержки с 20-минутным разбором). Разрешение через разделение в пространстве: простые кейсы обрабатываются лёгкими/дешёвыми моделями, сложные — тяжёлыми reasoning-моделями. Средневзвешенная стоимость inference << стоимость человека.\n\nИзобретательские приёмы:\n• (1) Сегментация — constellation-of-models вместо одной модели; задачи разбиты по сложности и типу, каждый сегмент обслуживается оптимальной моделью.\n• (3) Локальное качество — разные уровни agency для разных типов задач (high-agency для reasoning, low-agency для routing).\n• (7) Матрёшка/Вложенность — supervisor model «вложена» в agent model, контролирует изнутри.\n• (10) Предварительное действие — pre-built integrations с CRM/knowledge bases подготовлены до deployment, агент сразу «знает» клиента.\n• (26) Копирование — один агент деплоится на все каналы (chat, voice, email, SMS) как единая копия.\n\nИКР (Идеальный Конечный Результат): клиент получает идеальный support experience, при котором support-отдел как таковой не существует. Агент знает клиента, его историю, предвосхищает проблемы и решает их проактивно — до обращения.\n\nМобилизация ресурсов: (1) Frontier LLM от OpenAI/Anthropic/Meta/Google — не свои модели, а best-of-breed. (2) Нетворк Bret Taylor — доступ к Fortune 500 CEO без cold outreach. (3) Существующие CRM/knowledge bases клиентов — не строят новый data store, а интегрируются с тем, что есть. (4) BPO-бюджеты клиентов — деньги уже аллоцированы на CX, задача — перенаправить на Sierra.",
          conditions: "Founder background: Bret Taylor — co-creator Google Maps, CTO Facebook, co-CEO Salesforce, Chairman OpenAI. Clay Bavor — 18+ лет в Google, руководил Gmail, Drive, Docs, Google Labs, AR/VR. Знакомы с 2005 года (Taylor нанял Bavor как APM в Google). Уникальная комбинация: enterprise sales muscle и CEO-level нетворк (Taylor) + deep product/AI expertise и platform thinking (Bavor). Личные отношения с CEO Fortune 500 компаний.\n\nMarket timing: GPT-4 (март 2023) — первая модель, способная вести сложный multi-turn conversation на уровне L1 support agent. Sierra основана в феврале 2023, буквально в момент появления этой capability. Раньше — chatbots слишком тупые, IVR-ловушки. Позже — рынок был бы уже занят (Intercom Fin, Zendesk AI, Ada).\n\nTechnology readiness: (1) LLM reasoning достигло уровня 70%+ resolution rate. (2) Multi-model orchestration стал возможен благодаря падению inference costs. (3) Появление open-weight моделей (Llama, Mistral) позволило constellation-of-models подход.\n\nRegulatory/industry context: post-COVID ускорение digital-first support. Давление на маржинальность → компании активно ищут способы сократить BPO-расходы ($300B+ глобальный рынок). Нет специфических регуляторных барьеров для AI в customer service (в отличие от healthcare или fintech). GDPR/SOC2 compliance — table stakes, не barrier.\n\nCapital requirements: $85-110M Series A ещё до значительного revenue. Итого $635M привлечено. Требует founder credibility уровня Bret Taylor — no-name founder не привлёк бы такой capital pre-revenue. Но: сам AI-агент можно построить на $0-50K (API costs) — capital нужен для enterprise sales team, не для технологии.\n\nNetwork effects / data advantages: (1) каждый resolved case → data для улучшения агента конкретного клиента (proprietary loop). (2) Кросс-клиентский learning: паттерны из retail помогают в telecom. (3) Cold start решили через design partner program: 5-10 hand-picked брендов (SiriusXM, Sonos, WeightWatchers) с готовностью инвестировать время в co-development. (4) Brand logos на сайте → social proof → inbound от других enterprise.",
          mvpVersion: "Гипотеза: AI-агент на базе frontier LLM может автономно разрешить 50%+ типовых обращений конкретного бизнеса с CSAT > 4.0/5.\n\nЭксперимент (1-2 недели, $0-500):\n1. Выбрать один бизнес (свой, знакомого, клиент на фрилансе) с хотя бы 50 обращениями в месяц.\n2. Экспортировать 100 последних тикетов из тикет-системы (Zendesk, Intercom, email).\n3. Собрать knowledge base: FAQ, help center, внутренние инструкции для агентов.\n4. Построить RAG-агента на Claude/GPT-4 + vector store (Pinecone free tier / ChromaDB) + простой UI (Streamlit/Chainlit).\n5. Запустить shadow mode на 1 неделю: агент генерирует ответ параллельно с человеком, но не отправляет клиенту.\n6. Вручную оценить 100 пар (ответ агента vs ответ человека): корректность, полнота, тон.\n\nМетрика успеха: агент даёт корректный ответ на 50%+ кейсов. Ответ агента не хуже ответа человека в 60%+ случаев по 3 критериям (correctness, completeness, tone).\n\nСледующий шаг: если shadow mode подтвердил 50%+ → запустить на live chat с ограничением: только 3 типа обращений + instant escalation button + человек мониторит в real-time. Предложить первому клиенту outcome-based pricing: $X за resolution (50% от текущей стоимости тикета). Если unit economics положительная → масштабировать.",
        },
      },
      {
        company: "Mercor (рекрутинг AI)",
        detail: "$10B оценка, $500M+ ARR за 17 мес. AI-маркетплейс 30K+ экспертов для RLHF, $4.5M revenue/employee",
        caseStudy: {
          mechanicInAction: "Mercor построил двухсторонний AI-маркетплейс, соединяющий доменных экспертов (врачи, юристы, инженеры, учёные) с AI-лабораториями для RLHF-тренировки и evaluation моделей.\n\nКлючевой продукт — AI-система, которая проводит автоматизированные интервью с кандидатами, оценивает их экспертизу и матчит с задачами AI-лабораторий.\n\nАрхитектурные решения:\n• AI-интервью вместо резюме: каждый эксперт проходит AI-оценку, которая измеряет реальные знания, а не формальные credentials. Это позволяет находить экспертов в странах с низкой стоимостью труда, но высокой квалификацией.\n• Matching algorithm с обратной связью: каждое успешное размещение улучшает алгоритм, неудачные — дают негативный сигнал. Continuous improvement loop.\n• Expert-as-a-Service (EaaS): клиент не нанимает — арендует экспертизу почасово. Mercor берёт ~35% комиссию от GPV.\n• Фокус на post-training: выбрали не pre-training data labeling (как Scale AI), а высокостоимостный post-training — RLHF, evaluation, rubric creation, benchmark design.\n\nЧего НЕ делают: не строят собственные AI-модели, не делают low-skill data labeling (оставили Remotasks/Toloka), не продают SaaS-подписку.\n\nТаймлайн: запуск январь 2023 (freelance-программисты из Индии) → пивот в RLHF/expert training → $1M ARR к лету 2023 → $35M ARR к концу 2024 → $100M ARR к марту 2025 → $450–500M ARR к сентябрю 2025 → $10B valuation в октябре 2025.",
          jtbd: "Core Functional Job: «Когда мне нужно улучшить качество модели в специфичном домене (медицина, право, финансы), хочу получить доступ к экспертам с 10+ годами опыта для RLHF-тренировки и eval, чтобы модель давала ответы уровня профессионала.»\n\nEmotional Job: чувствовать уверенность, что training data создана настоящими экспертами, а не случайными краудсорсерами. Не бояться, что качество модели упадёт из-за noisy labels.\n\nSwitching Trigger: момент, когда AI-лаборатория понимает, что generalist labelers (Scale AI, Remotasks) дают потолок качества — модель перестаёт улучшаться на generic feedback, нужны domain experts.\n\nPush (от старого): Scale AI/Remotasks платят $5–20/час неспециализированным работникам. Качество feedback низкое для сложных доменов. Найм экспертов через traditional recruitment — 4–8 недель на одну позицию.\n\nPull (к новому): доступ к 30,000+ верифицированных экспертов ($60–250/час). AI-matching за 24–72 часа, не месяцы. Managed service — Mercor решает payroll, compliance, onboarding.\n\nAnxiety (тормоз): «А что если эксперты некачественные?» — Mercor решает через AI-интервью и continuous quality scoring. «Data security?» — NDA и compliance встроены в платформу.\n\nHabit (инерция): AI-лабы уже работают со Scale AI, workflow настроены. Mercor решает через plug-and-play — минимальное изменение процессов, experts подключаются к существующим инструментам лаборатории.\n\nConsumption Chain: Word-of-mouth от другой AI-лабы → Demo + pilot (5–10 экспертов на 2 недели) → Расширение до сотен экспертов → Multi-project engagement → Referral к коллегам в индустрии.\n\nOutcome Metrics: (1) win rate модели на benchmarks после RLHF, (2) time-to-expert — дни от запроса до работающего эксперта, (3) cost per hour of expert feedback, (4) retention rate экспертов на проекте.",
          monetization: "Pricing model: marketplace take-rate (~35% комиссия с каждого часа работы эксперта) + managed service fees для enterprise.\n\nКонкретные ставки экспертов:\n• General RLHF/writing: $40–80/час\n• Coding и software engineering: $80–150/час\n• Domain experts (медицина, право, финансы): $100–250/час\n• Средняя ставка эксперта: ~$85/час\n• Клиент платит ~$115–130/час (с учётом take rate)\n\nContract terms: проектные контракты от 2 недель до многомесячных engagement. Pay-as-you-go по часам, без долгосрочных обязательств.\n\nUnit economics (оценки):\n• GPV: ~$1.5M/день = ~$550M/год\n• Net revenue при 35% take rate: ~$190M+\n• Команда: ~100 FTE → revenue per employee ~$4.5M\n• Gross margin: ~50–60% (после выплат и operations)\n• CAC: минимальный — основной канал word-of-mouth, нет sales team\n• LTV крупного клиента: $5–50M+ (AI lab, multi-year)\n\nRevenue scale: $500M+ ARR (gross) к осени 2025. $75M в феврале → $450M+ к сентябрю — 6x за 7 месяцев.\n\nКлиенты: Top 5 AI labs + 6 из Magnificent Seven.\n\nПочему модель работает: take-rate масштабируется линейно с ростом спроса AI-лабов на training data. Нет потолка SaaS-подписки. Чем больше моделей тренируются — тем больше GPV.",
          marketing: "GTM motion: 100% inbound / word-of-mouth на стороне клиентов (AI labs). Нет выделенного sales team. Community-led на стороне supply (экспертов).\n\nKey channels:\n• Referrals между AI-лабами (ключевой канал — тесное community ML researchers)\n• Twitter/X presence основателей (Brendan Foody)\n• Organic PR через Forbes, TechCrunch, Fortune — возраст основателей (22) и скорость роста генерируют coverage бесплатно\n• Mercor Research — публикация бенчмарков (APEX-Agents) для credibility\n\nPartnerships: прямые контракты с OpenAI, Anthropic, Google DeepMind, Meta. Позиция усилилась после конфликта Meta–Scale AI: Meta инвестировала $14.3B в Scale AI → exodus клиентов (лабы опасаются bias) → переход к Mercor.\n\nContent/events: бенчмарк APEX-Agents — 480 задач по investment banking, consulting, corporate law. Экспертами с 10+ лет опыта. Blog posts о будущем eval-driven AI.\n\nSales cycle: 1–2 недели от первого контакта до pilot, 1–2 месяца до full engagement.\n\nПервые 10 клиентов: личные связи основателей. Adarsh — research assistant Larry Summers в Harvard (доступ к tech elite). Hackathon в Sao Paulo — первая идея матчинга. Low seven-figure run rate до первого раунда — чистый word-of-mouth.\n\nReferral mechanics: AI-лабы — тесное community, ML researcher рекомендует коллеге. Supply side: эксперты приглашают коллег через referral.",
          impact: "Для клиента (AI-лаборатории):\n• Time-to-expert: 4–8 недель (recruitment) → 24–72 часа\n• Стоимость часа domain expert: $150–300 (рекрутинг) → $115–130 (managed)\n• Качество RLHF feedback: generalist-level → expert-level (10+ лет опыта)\n• Pass@1 на корпоративном праве: 4.4% → 16.3% (3.7x рост) после обучения на данных Mercor экспертов\n• Масштаб экспертного пула: 5–20 in-house → 30,000+ через платформу\n\nДля компании (Mercor):\n• Январь 2023 (запуск): ARR ~$0, 3 человека, pre-seed\n• Лето 2023: $1M ARR, ~10 человек, seed $250M valuation\n• Декабрь 2024: $35M ARR, ~30 человек\n• Февраль 2025 (Series B): $75M ARR, $2B valuation, ~50 человек\n• Март 2025: $100M ARR\n• Сентябрь 2025: $450M+ ARR, ~100 человек\n• Октябрь 2025 (Series C): $500M+ ARR, $10B valuation, $350M raised\n• Выплаты экспертам: >$1.5M/день ($550M+/год)\n• Revenue per employee: ~$4.5M\n• Основатели (22 года) — самые молодые self-made миллиардеры в мире",
          tocConstraint: "Системное ограничение: bottleneck в pipeline AI-лабораторий — quality of human feedback. Модели достигли потолка улучшений на generic crowdsourced data (Remotasks, MTurk). Единственный constraint, лимитирующий throughput: невозможность масштабировать доменную экспертизу для RLHF.\n\nКак идентифицировали: основатели начали с matching программистов из Индии к US-компаниям. Увидели, что AI-лабы платят $5–20/час за generic labeling, но готовы платить $100–250/час за реальных domain experts — и не могут их найти. Разница в 10–50x в ставках сигнализировала о constraint.\n\nExploit: не пытались улучшить generic crowdsourcing. Сфокусировались исключительно на high-end экспертах. AI-интервью автоматизировало vetting, убрав bottleneck ручной оценки — 1 AI «рекрутер» заменяет 100 human recruiters.\n\nSubordinate: вся компания подчинена одной цели — максимизировать throughput качественных expert-hours. Нет продуктов, не связанных с expert matching. HR, payroll, compliance — все сервисы обслуживают этот constraint.\n\nElevate: (1) AI-matching algorithm с feedback loop — каждое размещение улучшает следующее, (2) расширение пула с 1,000 до 30,000+ экспертов, (3) geographic arbitrage — врач в Нигерии за $30/час с экспертизой уровня американского за $250/час.\n\nКуда сместилось: после решения supply constraint новый bottleneck — demand concentration. 80%+ revenue от top 5 AI labs. Если training paradigm сменится (synthetic data заменит RLHF), Mercor теряет основной рынок. Ответ: расширение в Mercor Enterprise AI — выход за пределы лабов в corporate hiring.",
          trizContradictions: "Техническое противоречие #1: «Качество экспертизы растёт, но масштабируемость падает.» Настоящие domain experts — штучный товар, их нельзя нанять тысячами как crowdworkers.\nРешение: Приём #1 (Сегментация) + #3 (Локальное качество). Сегментировали задачи по уровню сложности: простые — автоматизировали, средние — generalists, сложные — domain experts. Не все часы требуют топ-экспертов.\n\nТехническое противоречие #2: «Скорость найма растёт, но точность matching падает.» Быстрый наём = risk of mismatches.\nРешение: Приём #26 (Копирование). AI-интервью копирует и масштабирует процесс оценки, который раньше делал human recruiter. Один раз обучили модель — она оценивает 1000 кандидатов/день с consistent quality.\n\nФизическое противоречие: платформа должна быть одновременно дешёвой (чтобы AI-лабы масштабировали расходы) И дорогой (чтобы привлечь топ-экспертов высокими ставками).\nРешение: Geographic arbitrage — эксперт в Индии/Нигерии/Восточной Европе получает $60–100/час (в 3–5x выше локального рынка, strong pull), клиент платит $100–130/час (в 2–3x дешевле US expert recruitment). Win-win.\n\nИзобретательские приёмы:\n• #1 Сегментация — разделение экспертов по доменам и уровням\n• #3 Локальное качество — AI-интервью адаптируется к каждому домену\n• #5 Объединение — recruitment + payroll + compliance + quality в одной платформе\n• #10 Предварительное действие — vetting экспертов ДО запроса клиента (ready pool)\n• #26 Копирование — AI-интервью как масштабированная копия human evaluation\n\nИКР (Идеальный Конечный Результат): система, где каждый domain expert в мире автоматически matched с задачами, где его экспертиза создаёт максимальную ценность — без рекрутинга, без интервью, без overhead. Expert feedback генерируется «сам по себе» как побочный продукт обычной работы.\n\nМобилизация ресурсов: миллионы professionals в developing countries, чья экспертиза была недоступна AI-лабам из-за language/timezone/payment barriers. Mercor не создал экспертов — он разблокировал доступ к уже существующим.",
          conditions: "Founder background: три друга из одной школы (Bellarmine College Prep, Bay Area). Speech & Debate team дал навыки persuasion и presentation. Adarsh Hiremath — CS/ML в Harvard, research assistant Larry Summers (доступ к tech elite network). Brendan Foody (CEO) — Georgetown. Thiel Fellowship ($100K + network Питера Тиля). Возраст 21–22 — парадоксальное преимущество: нет «это невозможно» mindset, чистый execution.\n\nMarket timing: 2023 — год после ChatGPT (ноябрь 2022), взрывной спрос на RLHF. Все лабы одновременно начали scaling post-training. Demand на domain experts вырос в 10–100x за 12 месяцев. На 2 года раньше — спроса не было. На 2 года позже — рынок занят.\n\nTechnology readiness: LLM достигли уровня, где generic feedback перестал давать improvements — RLHF с domain experts стал необходимостью. Одновременно AI стал достаточно хорош для автоматизации интервью и оценки кандидатов.\n\nRegulatory/industry context: gig economy infrastructure уже зрелая (Deel, Remote.com) — упрощён international payroll. Нет regulatory barriers для RLHF work (в отличие от medical/fintech).\n\nCapital requirements: bootstrapped до low seven-figure ARR до первого раунда. Минимальные capex — софтверная платформа, не hardware. Seed $3M → Series B $100M → Series C $350M. Всего $500M+ raised.\n\nNetwork effects: классический two-sided network effect. Больше экспертов → лучше matching → больше клиентов → больше задач → больше экспертов. Cold start решили через initial focus на Indian programmers (high supply, clear demand), затем расширились в другие домены.",
          mvpVersion: "Гипотеза: «Доменные эксперты готовы выполнять структурированные AI-training задачи за $50–100/час, и AI-компании готовы платить x2 от прямого найма ради скорости и масштаба.»\n\nЭксперимент (1–2 недели, $0–500):\n1. Выбрать один узкий домен (например, врачи-терапевты)\n2. Найти 10 экспертов через LinkedIn / профессиональные Telegram-чаты\n3. Создать простое AI-интервью (GPT-4 + Google Forms) для assessment знаний\n4. Подготовить 50 RLHF-задач (оценка медицинских ответов AI-модели по rubric)\n5. Предложить экспертам выполнить задачи за $50/час\n6. Показать результаты 2–3 AI-стартапам (не обязательно top labs)\n\nМетрика успеха: (1) 7+ из 10 экспертов согласились и выполнили задачи качественно, (2) quality score от клиента > 8/10, (3) хотя бы 1 клиент готов заплатить за следующую партию задач.\n\nСледующий шаг: автоматизировать AI-интервью, расширить до 100 экспертов в 3 доменах, заключить первый контракт на $5–10K.",
        },
      },
      {
        company: "ServiceTitan",
        detail: "~$9B IPO. Домашние услуги. First quality vertical AI winner",
      },
      {
        company: "Veeva",
        detail: "$38B. Фарма CRM. De-facto стандарт вертикали",
      },
      {
        company: "Toast",
        detail: "$1B+ revenue. Рестораны. POS → compound startup",
      },
    ],
    unitboxApplication:
      "Winner-take-vertical для Bali RE catalog. Первый AI-native + proprietary data. После Бали → Thailand, Dubai. Bali RE catalog = unclaimed vertical.",
    icon: "Bot",
  },
  ...(mechanicsBC as Mechanic[]),
  ...(mechanicsDE as Mechanic[]),
  ...(mechanicsFGH as Mechanic[]),
]
