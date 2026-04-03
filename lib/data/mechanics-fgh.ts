export const mechanicsFGH: any[] = [
  // === CATEGORY: moats-defense (6 items) ===
  {
    id: "proprietary-data-moat",
    title: "Proprietary Data Moat",
    category: "moats-defense",
    author: "Alex Hormozi, Kieran Flanagan",
    icon: "Database",
    summary: "Данные которые нельзя загуглить = единственный реальный моат",
    whatIsIt:
      "Код и media масштабируются через AI, но проприетарные данные — нет. Hormozi: фаундеры с проприетарными знаниями строят leverage который нельзя скопировать.",
    howItWorks: [
      "Определи уникальные данные бизнеса",
      "Систематизируй сбор: каждая транзакция, кейс",
      "Структурируй в queryable format",
      "Тренируй AI на данных",
      "Compound: больше данных → лучше продукт → больше клиентов",
    ],
    keyInsight:
      "Flanagan (ex-HubSpot): «Если моат = контент, ты в опасности. AI коммодитизирует SEO». Новый моат = proprietary data + community + brand.",
    examples: [
      {
        company: "Hormozi / Acquisition.com",
        detail: "$31M консалтинга + 1026 бизнесов. Unique dataset",
      },
      {
        company: "Zillow / Redfin",
        detail: "Проприетарные данные о ценах. Zestimate = неповторимый моат",
      },
      {
        company: "Bloomberg Terminal",
        detail: "$10B+ revenue. Данных нет больше нигде",
      },
    ],
    unitboxApplication:
      "Цены юнитов Бали real-time, занятость, тренды, финмодели, 97 девелоперов. Zillow для Бали — compound advantage.",
  },
  {
    id: "distribution-moat",
    title: "Distribution Moat",
    category: "moats-defense",
    author: "Greg Isenberg, Elad Gil, Kieran Flanagan",
    icon: "Share2",
    summary:
      "Технологии commoditize, дистрибуция — нет. Кто владеет каналом — побеждает",
    whatIsIt:
      "С AI любой строит за weekend. Технология не барьер. Моат = дистрибуция: audience, brand, SEO, partnerships.",
    howItWorks: [
      "Определи каналы (SEO, community, partnerships, email)",
      "80% времени на дистрибуцию, 20% на продукт",
      "Строй audience через content, community",
      "Создай network effects",
      "Lock-in через integrations, data, relationships",
    ],
    keyInsight:
      "Isenberg: «Все строят AI tool за weekend. Но кто доставит 10,000 клиентам?» Gil: apps владеют дистрибуцией. Distribution > technology.",
    examples: [
      {
        company: "HubSpot",
        detail:
          "$2.6B+ ARR. Моат = 7M блог читателей + brand, не технология CRM",
      },
      {
        company: "Zapier",
        detail:
          "$230M+ ARR. Интеграции + SEO. Каждая интеграция = keyword + канал",
      },
      {
        company: "Pieter Levels",
        detail: "700K+ Twitter = бесплатная дистрибуция. Instant audience",
      },
    ],
    unitboxApplication:
      "97 девелоперов в pipeline = distribution moat. Ни один конкурент не получит доступ за деньги. Расширить: default каталог для Bali agents.",
  },
  {
    id: "dont-compete-openai",
    title: "Don't Compete with OpenAI",
    category: "moats-defense",
    author: "Elad Gil, multiple",
    icon: "ShieldAlert",
    summary:
      "Если продукт = фича ChatGPT — ты в опасности. Строй поверх, не вместо",
    whatIsIt:
      "Не строй что может быть фичей OpenAI/Anthropic/Google. Они убьют тебя апдейтом. Строй поверх, с domain expertise.",
    howItWorks: [
      "Может ли OpenAI добавить это как фичу?",
      "Если да — pivot, добавь domain-specific data",
      "Если нет (proprietary data/relationships) — safe",
      "Foundation models = commodity input",
      "Инвестируй в то что модели НЕ дают",
    ],
    keyInsight:
      "AI wrapper без proprietary data = dead on arrival. Harvey safe (юр. данные). Cursor safe (IDE experience). Generic AI writing tool = dead.",
    examples: [
      {
        company: "Killed by ChatGPT",
        detail:
          "AI writing tools, summarizers — commoditized. Jasper потерял 50%+ revenue",
      },
      {
        company: "Harvey ($8B)",
        detail: "Safe: юридические данные которые OpenAI не построит",
      },
      {
        company: "Cursor ($29.3B)",
        detail: "Safe: IDE experience. ChatGPT не станет IDE",
      },
    ],
    unitboxApplication:
      "Unitbox safe: OpenAI не построит каталог Бали. Проприетарные данные + relationships = непробиваемый moat.",
  },
  {
    id: "compound-startup",
    title: "Compound Startup (Rebundling)",
    category: "moats-defense",
    author: "Rippling, Ramp, Deel, Toast",
    icon: "Blocks",
    summary:
      "Общий data layer → несколько продуктов → CAC↓, switching cost↑",
    whatIsIt:
      "После unbundling маятник вернулся. Победители объединяют продукты с общим data layer. Один source of truth питает всё.",
    howItWorks: [
      "Core product — одна проблема отлично",
      "Captive customer base",
      "Product #2 на тех же данных (CAC ≈ 0)",
      "Общий data layer улучшает AI для всех",
      "Switching cost множится: 1 tool easy, 5 integrated — impossible",
    ],
    keyInsight:
      "Rippling: 1 employee graph → 20+ продуктов. Ramp: карты → расходы → закупки. Deel: $0 → $500M+ ARR за ~4 года. Shared data = better AI models.",
    examples: [
      {
        company: "Rippling",
        detail: "20+ продуктов, 1 employee graph. HR, IT, расходы, карты",
      },
      {
        company: "Ramp",
        detail: "Карты → расходы → bill pay → закупки → travel",
      },
      {
        company: "Deel",
        detail:
          "$0 → $500M+ ARR за ~4 года. Платежи → payroll → HR → иммиграция",
      },
    ],
    unitboxApplication:
      "Core = каталог. +AI лидогенерация. +Market analytics. +ROI calculator. Shared data layer. Девелопер не уйдёт.",
  },
  {
    id: "usage-outcome-pricing",
    title: "Usage/Outcome-Based Pricing",
    category: "moats-defense",
    author: "Gartner, Replit",
    icon: "Receipt",
    summary: "Per-seat сломана. Usage или outcome pricing — будущее",
    whatIsIt:
      "AI-агент заменяет 3 сотрудника = меньше seats. Новые модели: usage-based и outcome-based. Gartner: 40% SaaS перейдёт к 2030.",
    howItWorks: [
      "Определи unit of value (API call, resolution, lead)",
      "Привяжи pricing к unit",
      "Usage: $X за call / документ",
      "Outcome: $X за лид / сделку / тикет",
      "Hybrid: base + overage",
    ],
    keyInsight:
      "Replit: $2M → $144M ARR за год на usage-based. Intercom: $0.99/resolution. 92% AI компаний = mixed pricing. Per-seat kills growth.",
    examples: [
      {
        company: "Replit",
        detail: "$2M → $144M ARR. Usage-based = explosive growth",
      },
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution. Outcome-based",
      },
      {
        company: "Snowflake",
        detail: "$2.8B+ revenue. Usage-based gold standard",
      },
    ],
    unitboxApplication:
      "От fixed fee → outcome: $X за qualified lead из каталога, или usage: $X за обновлённый юнит при sync.",
  },
  {
    id: "last-mile-problem",
    title: "The Last Mile Problem",
    category: "moats-defense",
    author: "Multiple",
    icon: "Target",
    summary: "AI делает 80%, ценность — в оставшихся 20%",
    whatIsIt:
      "AI быстро делает 80%. Последние 20% (QA, edge cases, judgment) = 100x усилий. Кто решает last mile — забирает premium.",
    howItWorks: [
      "AI делает 80% быстро",
      "20% = edge cases, quality, judgment",
      "Human-in-the-loop для критических решений",
      "AI учится на corrections",
      "Premium за «100% guarantee» vs «80% AI»",
    ],
    keyInsight:
      "95% accuracy — легко. 99.5% (production) — в 100x сложнее. «100% AI» демо впечатляют, но «95% AI + 5% human QA» = what ships.",
    examples: [
      {
        company: "Harvey",
        detail: "AI 80% research + lawyer 20% judgment = premium pricing",
      },
      {
        company: "Unitbox pipeline",
        detail: "AI fills 80%, 78 правил + human QA = last mile",
      },
      {
        company: "GitHub Copilot",
        detail: "~40% кода AI. Programmer reviews 60%. Productivity 2x",
      },
    ],
    unitboxApplication:
      "Unitbox решает last mile: AI + 78 правил + QA. Монетизируй: «guaranteed quality» tier vs «AI-only draft».",
  },

  // === CATEGORY: scaling-org (3 items) ===
  {
    id: "one-person-million",
    title: "One-Person $1M+ Company",
    category: "scaling-org",
    author: "Pieter Levels, Danny Postma, Dario Amodei",
    icon: "Crown",
    summary: "Solo founder + AI = $1M+ revenue. AI рутину, human стратегию",
    whatIsIt:
      "Реальность 2026. Solo founders $1M+/год с AI. Amodei: 70-80% вероятность $1B one-person company к 2026-2027.",
    howItWorks: [
      "Human: стратегия, product vision, high-value sales",
      "AI: support, content, development, admin",
      "Stack: Claude/GPT, Cursor, n8n, AI support",
      "$3-12K/год tools vs $200-500K сотрудники",
      "Margins 60-80%",
    ],
    keyInsight:
      "Solo founders: 23.7% (2019) → 36.3% (2025). 38% семизначных = solopreneurs. Но: survivorship bias. Общий thread = pre-existing distribution.",
    examples: [
      {
        company: "Pieter Levels",
        detail: "$3-5M/год, 0 сотрудников. PhotoAI+NomadList+RemoteOK",
      },
      {
        company: "Danny Postma",
        detail: "$3.6M ARR HeadshotPro. Solo из Бали",
      },
      {
        company: "Base44 → Wix",
        detail: "Solo → $80M продажа за 6 мес",
      },
    ],
    unitboxApplication:
      "1 человек + Claude Code + 5 агентов + auto-sync = 50+ проектов. Target: $1M ARR без найма.",
  },
  {
    id: "ai-replaces-tasks",
    title: "AI Replaces Tasks, Not Roles",
    category: "scaling-org",
    author: "TechCrunch, multiple",
    icon: "Replace",
    summary:
      "AI убирает рутину — роль эволюционирует вверх, не исчезает",
    whatIsIt:
      "AI не увольняет — убирает рутинную часть каждой роли. Роль поднимается по abstraction ladder.",
    howItWorks: [
      "Разбей роль на tasks: рутина vs стратегия",
      "AI забирает рутинные",
      "Human focus → стратегия, отношения, judgment",
      "Меньше juniors, seniors ценнее",
      "Team shrinks, output grows",
    ],
    keyInsight:
      "Support: -30-50%. Content: -50-70% junior writers. Dev: 0% layoffs, 2-3x productivity. Pattern: AI eliminates task layers.",
    examples: [
      {
        company: "Klarna",
        detail: "AI = 2/3 support = 700 FTE. People → relationship roles",
      },
      {
        company: "Копирайтинг",
        detail: "50-70% juniors replaced. Senior editors ценнее",
      },
      {
        company: "Dev",
        detail: "0% layoffs, 2-3x productivity. AI = force multiplier",
      },
    ],
    unitboxApplication:
      "AI fills catalog (task), человек manages quality + relationships (role). Масштабирование: AI agents, не люди.",
  },
  {
    id: "ai-growth-system",
    title: "AI Growth System",
    category: "scaling-org",
    author: "Nick Saraev (LeftClick AI)",
    icon: "Sprout",
    summary:
      "Niche → Outreach → Lead handling — repeatable AI growth machine",
    whatIsIt:
      "Системный подход: выбери нишу, настрой AI outreach, автоматизируй lead handling. Система компаундится.",
    howItWorks: [
      "Niche selection: vertical с болью и budget",
      "Build AI demo за 5 минут",
      "Cold outreach: Clay + AI personalization",
      "AI lead handling: chatbot qualification, auto-booking",
      "Close: retainer model, AI 80% work",
    ],
    keyInsight:
      "Maker School = #1 по revenue на Skool. Ключ: система, не one-off tactics. Каждый компонент повторяем и масштабируем.",
    examples: [
      {
        company: "LeftClick AI",
        detail: "AI growth systems. Maker School = #1 на Skool",
      },
      {
        company: "AI agency students",
        detail: "$10-50K/мес первый год через Growth System",
      },
      {
        company: "Clay.com + AI outreach",
        detail: "75+ providers + AI. 3-5x qualified meetings",
      },
    ],
    unitboxApplication:
      "Для девелоперов: 1) Niche = Bali devs 5+ projects, 2) AI research их каталог, 3) Персонализированный outreach, 4) AI demo за 48ч, 5) Retainer $1-3K/мес.",
  },

  // === CATEGORY: mega-patterns (6 items) ===
  {
    id: "ai-native-vs-augmented",
    title: "AI-Native vs AI-Augmented",
    category: "mega-patterns",
    author: "Cursor, Harvey, Sierra, Wiz",
    icon: "Cpu",
    summary: "Не прикрути ChatGPT — построй всё вокруг AI как ядра",
    whatIsIt:
      "AI-augmented = старый продукт + AI фича. AI-native = невозможен без AI. AI-native растут 3-10x быстрее.",
    howItWorks: [
      "AI-augmented: добавь AI (low risk, low differentiation)",
      "AI-native: перепроектируй вокруг AI (high risk, high reward)",
      "Заменяет job function, не task",
      "Pricing: value-based",
      "Compound: каждый user делает AI лучше",
    ],
    keyInsight:
      "Cursor: 0→$2B+ ARR за <2 года. Harvey: $8B. Sierra: $4B+. Wiz: самый быстрый до $100M ARR (18 мес). Заменяют job function целиком.",
    examples: [
      {
        company: "Cursor",
        detail: "$2B+ ARR, $29.3B. AI-native IDE. 0→$100M за <2 года",
      },
      {
        company: "Harvey",
        detail: "$8B. AI-native юрист. Заменяет juniors",
      },
      {
        company: "Sierra",
        detail: "$4B+. AI-native customer service. Заменяет BPO",
      },
    ],
    unitboxApplication:
      "Unitbox = AI-native. Без AI = месяцы ручного труда. С AI = 48 часов. Каждая новая фича должна быть AI-native.",
  },
  {
    id: "services-as-software",
    title: "Services-as-Software",
    category: "mega-patterns",
    author: "Foundation Capital",
    icon: "ArrowRightLeft",
    summary: "$5.4T услуг → софт с 80%+ маржой",
    whatIsIt:
      "$5.4T на проф. услуги. AI превращает agency/BPO/consulting в software с маржой 80%+. Foundation Capital: $4.6T новой стоимости.",
    howItWorks: [
      "Найди услугу с high spend + repetitive work",
      "Автоматизируй 80%+ через AI",
      "Продавай как software: $2-5K/мес vs $15-30K agency",
      "Клиент: 5-10x экономия. Ты: 80%+ маржа",
      "Scale без найма",
    ],
    keyInsight:
      "$4.6T — больше всего SaaS рынка ($800B). BPO ($200B+) = главная мишень. Sierra доказала модель.",
    examples: [
      {
        company: "Sierra",
        detail: "$4B+. Заменяет BPO ($33B market). Per resolution",
      },
      {
        company: "Writer, Jasper",
        detail: "AI заменяет agency $15-30K за $2-5K",
      },
      {
        company: "Mercor",
        detail: "3M+ оценок кандидатов. Заменяет recruiting agency",
      },
    ],
    unitboxApplication:
      "Каталогизация = услуга $2-5K/мес на catalog manager. Unitbox AI = $500/мес. 5-10x экономия, 80%+ маржа.",
  },
  {
    id: "ai-virtual-worker",
    title: "AI Virtual Worker",
    category: "mega-patterns",
    author: "11x Alice, Artisan Ava, Devin",
    icon: "PersonStanding",
    summary:
      "AI «сотрудник» за $3-5K/мес вместо $60-80K/год человека",
    whatIsIt:
      "AI не tool, а виртуальный сотрудник с именем и KPI. Продаётся как headcount replacement.",
    howItWorks: [
      "AI получает роль и задачи (SDR, support, analyst)",
      "Работает 24/7",
      "Отчитывается: KPI, dashboards",
      "$3-5K/мес vs $60-80K/год (3-5x дешевле)",
      "Scales instantly: 5 SDR = 5 instances",
    ],
    keyInsight:
      "Ребрендинг AI из tool в employee = 100x pricing. Per-seat SaaS $50/мес. AI virtual worker $3-5K/мес. Тот же AI, другой framing.",
    examples: [
      {
        company: "11x Alice",
        detail: "AI SDR $3-5K/мес. Research → personalize → send → book",
      },
      {
        company: "Artisan Ava",
        detail: "AI BDR. Full outbound pipeline. Priced as headcount",
      },
      {
        company: "Devin",
        detail: "$2B+. AI Software Engineer. Junior dev salary pricing",
      },
    ],
    unitboxApplication:
      "«AI Property Manager»: 24/7 обновляет каталог, отвечает покупателям, reports. $1-2K/мес vs $1-2K реальный менеджер на Бали.",
  },
  {
    id: "open-core-cloud",
    title: "Open Core + Cloud",
    category: "mega-patterns",
    author: "Supabase, n8n, Cal.com",
    icon: "Globe",
    summary: "Open-source ядро + managed cloud = community + revenue",
    whatIsIt:
      "Open-source core привлекает developers и trust. Managed cloud монетизирует. Community = distribution, Cloud = revenue.",
    howItWorks: [
      "Core product = open-source",
      "Community contributions бесплатно улучшают",
      "Self-host: бесплатно, привлекает evangelists",
      "Cloud: $20-$500+/мес managed service",
      "Enterprise: $1000+/мес с SSO, SLA",
    ],
    keyInsight:
      "Supabase $200M+ raised. n8n $30M+. Cal.com $32M. Open source = trust в AI era где люди боятся vendor lock-in.",
    examples: [
      {
        company: "Supabase",
        detail: "$200M+ raised. 1M+ developers. Open-source Firebase",
      },
      {
        company: "n8n",
        detail: "$30M+. Open-source AI automation. De facto agency tool",
      },
      {
        company: "Cal.com",
        detail: "$32M raised. 1000+ contributors",
      },
    ],
    unitboxApplication:
      "Open-source отдельные компоненты (floor plan extraction, chess parser) → привлечь proptech devs. Managed = полный каталог + AI.",
  },
  {
    id: "anti-saas-pricing",
    title: "Anti-SaaS Pricing Taxonomy",
    category: "mega-patterns",
    author: "Multiple",
    icon: "DollarSign",
    summary:
      "5 моделей вместо per-seat: outcome, usage, AI-employee, open core, credits",
    whatIsIt:
      "Per-seat ломается когда AI заменяет сотрудников. 5 новых моделей атакуют со всех сторон.",
    howItWorks: [
      "Per-outcome: $X за результат (Sierra, Intercom)",
      "Usage-based: $X за потребление (Snowflake, OpenAI)",
      "AI-employee: $3-5K/мес за виртуального работника",
      "Open core + cloud (Supabase, n8n)",
      "Flexible credits (Bolt, Lovable)",
    ],
    keyInsight:
      "Gartner: 40% SaaS → usage/outcome к 2030. 92% AI компаний = mixed pricing. Per-seat dying.",
    examples: [
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution. Pure outcome",
      },
      {
        company: "Snowflake",
        detail: "$2.8B+. Usage-based gold standard",
      },
      {
        company: "11x.ai",
        detail: "$3-5K/мес AI SDR. Employee pricing = 100x premium",
      },
    ],
    unitboxApplication:
      "Fixed fee → outcome: $X за лид из каталога. Align: Unitbox зарабатывает когда девелопер зарабатывает.",
  },
  {
    id: "winner-take-vertical",
    title: "Winner-Take-Vertical",
    category: "mega-patterns",
    author: "Sequoia, ServiceTitan, Toast, Veeva",
    icon: "Medal",
    summary:
      "AI рынок = winner-take-vertical, не winner-take-all. Первый в нише = 60-80%",
    whatIsIt:
      "Sequoia: «1000 vertical AI agents». Каждая функция + индустрия = свой AI winner. Кто первый с quality + data = доминирует.",
    howItWorks: [
      "Выбери vertical",
      "Стань default solution",
      "Compound data: каждый клиент → AI лучше",
      "Network effects: больше клиентов → больше данных → лучше продукт",
      "Winner takes 60-80% vertical",
    ],
    keyInsight:
      "ServiceTitan ~$9B IPO. Toast $1B+. Procore $1B+ ARR. Veeva $38B. Первый quality product + compound data = winner. Bali RE catalog = unclaimed.",
    examples: [
      {
        company: "ServiceTitan",
        detail: "~$9B IPO. Домашние услуги. First quality vertical",
      },
      {
        company: "Toast",
        detail: "$1B+ revenue. Рестораны. POS → payroll, marketing, supply",
      },
      {
        company: "Veeva",
        detail: "$38B. Фарма CRM. De-facto стандарт",
      },
    ],
    unitboxApplication:
      "Winner-take-vertical для Bali RE catalog. Первый AI-native + proprietary data. После Бали → Thailand, Dubai.",
  },
];
