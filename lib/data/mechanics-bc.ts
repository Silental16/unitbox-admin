export const mechanicsBC: any[] = [
  // ── CATEGORY B: building-launch ──────────────────────────────────────
  {
    id: "vibe-coding",
    title: "Vibe Coding",
    category: "building-launch",
    author: "Pieter Levels, Andrej Karpathy",
    summary: "Опиши что хочешь → AI пишет код → ship за часы",
    whatIsIt:
      "Революционный подход: описываешь что хочешь естественным языком, AI генерирует код. Термин придумал Karpathy в 2025. Рынок $8.5B в 2026, 63% пользователей — не разработчики.",
    howItWorks: [
      "Опиши продукт/фичу текстом",
      "AI генерирует код (Claude Code, Cursor, Bolt, Lovable)",
      "Итерируй через диалог",
      "Деплой за минуты (Vercel, Netlify)",
      "Получай фидбек, итерируй",
    ],
    keyInsight:
      "Claude Code достиг $1B ARR за 6 месяцев — быстрее ChatGPT. Ограничение: vibe coding hangover реален — quick builds без архитектуры ломаются на масштабе.",
    examples: [
      {
        company: "Pieter Levels",
        detail: "$3-5M/год, 0 сотрудников. PHP+jQuery+AI",
      },
      {
        company: "Base44 → Wix",
        detail: "Соло-фаундер, vibe coding → $80M продажа за 6 мес",
      },
      {
        company: "Cursor",
        detail: "$2B+ ARR, $29.3B оценка. Главный инструмент vibe coding",
      },
    ],
    unitboxApplication:
      "Unitbox уже использует Claude Code. Следующий шаг — быстро прототипировать UI для девелоперов, генерировать custom reports за часы.",
    icon: "Wand",
  },
  {
    id: "weekend-mvp",
    title: "Weekend MVP",
    category: "building-launch",
    author: "Marc Lou",
    summary: "Build Friday → Launch Monday → Kill or Iterate Friday",
    whatIsIt:
      "Фреймворк максимальной скорости: построй MVP за выходные, запусти в понедельник, к пятнице реши — развивать или убить. Marc Lou делает $1M+/год на портфеле таких микро-продуктов.",
    howItWorks: [
      "Пятница: выбери идею, построй MVP через boilerplate + AI",
      "Суббота-воскресенье: landing, Stripe, basic features",
      "Понедельник: запуск на Product Hunt + Twitter",
      "Вторник-четверг: смотри метрики",
      "Пятница: $0 = kill, >$500 = double down",
    ],
    keyInsight:
      "Marc Lou: $1,032,000 в 2025 на 4 продуктах. TrustMRR $22.9K, CodeFast $21.8K, ShipFast $20.3K, DataFast $15.9K/мес. 95% маржа, solo.",
    examples: [
      {
        company: "Marc Lou portfolio",
        detail: "$85K/мес на 4 продуктах, ~95% margins",
      },
      {
        company: "Danny Postma",
        detail:
          "Headlime → $20K MRR → продал за $1M. Потом HeadshotPro → $3.6M ARR",
      },
      {
        company: "Indie hackers",
        detail: "Сотни micro-SaaS $1-10K MRR построенных за выходные",
      },
    ],
    unitboxApplication:
      "Weekend MVP для тестов: AI property report, Bali investment calculator, developer CRM — каждый как weekend project.",
    icon: "Rocket",
  },
  {
    id: "12-startups-12-months",
    title: "12 Startups in 12 Months",
    category: "building-launch",
    author: "Pieter Levels",
    summary: "Запусти 12 продуктов за год — один выстрелит",
    whatIsIt:
      "Челлендж Pieter Levels: по одному продукту каждый месяц. Большинство провалятся, но 1-2 найдут PMF. Portfolio approach к стартапам.",
    howItWorks: [
      "Месяц 1: идея → MVP → запуск → замер",
      "Нет traction за 30 дней → следующий",
      "Есть traction → продолжай параллельно",
      "К концу года: 10 мёртвых + 1-2 работающих",
      "Удвой ставку на победителей",
    ],
    keyInsight:
      "Levels запустил 70+ проектов. Выжили NomadList, RemoteOK, PhotoAI — $3-5M/год суммарно. Success rate ~3-5%, но каждый успех оправдывает все провалы.",
    examples: [
      {
        company: "Pieter Levels",
        detail: "70+ проектов, 3-4 приносят $3-5M/год. 0 сотрудников",
      },
      {
        company: "Sahil Lavingia (Gumroad)",
        detail:
          "Множество проектов до Gumroad. $10M+ revenue, 1 сотрудник",
      },
      {
        company: "YC trend",
        detail: "Solo founders: 23.7% (2019) → 36.3% (2025)",
      },
    ],
    unitboxApplication:
      "Мини-продукты вокруг каталога: price tracker, dev comparison tool, ROI simulator, investment newsletter.",
    icon: "CalendarRange",
  },
  {
    id: "ship-before-ready",
    title: "Ship Before Ready",
    category: "building-launch",
    author: "Pieter Levels",
    summary: "Конкурентное преимущество = скорость, не качество",
    whatIsIt:
      "Философия: если не стыдно за первую версию — запустил поздно. Скорость важнее качества кода и идеального дизайна.",
    howItWorks: [
      "Определи core feature — одну вещь",
      "Построй только её",
      "Запусти с минимальным UI",
      "Слушай фидбек первых пользователей",
      "Итерируй на основе реального использования",
    ],
    keyInsight:
      "PhotoAI запущен как грубый прототип — сейчас $138K/мес. Перфекционизм = смерть. 95% запланированных фич никогда не понадобятся.",
    examples: [
      {
        company: "Pieter Levels",
        detail:
          "Каждый продукт запущен в «ужасном» виде. NomadList начался как Google Sheet",
      },
      {
        company: "Twitter/X",
        detail: "Первые годы — баги и downtime. Но были первыми",
      },
      {
        company: "Stripe",
        detail: "Первая версия — 7 строк кода. Сейчас $95B",
      },
    ],
    unitboxApplication:
      "AI-консьерж для покупателей — запусти как простого Telegram-бота, не жди идеального UI.",
    icon: "Zap",
  },
  {
    id: "vibe-shipping",
    title: "Vibe Shipping",
    category: "building-launch",
    author: "Autoflowly, ecosystem",
    summary:
      "Эволюция vibe coding: AI деплоит готовые продукты из разговора",
    whatIsIt:
      "Если vibe coding = «AI пишет код», то vibe shipping = «AI деплоит готовый продукт». Фаундерам не нужны файлы — им нужны live deployed apps.",
    howItWorks: [
      "Опиши продукт в разговоре с AI",
      "AI генерирует полный стек",
      "AI автоматически деплоит",
      "Получи URL за минуты",
      "Итерируй — каждое изменение сразу live",
    ],
    keyInsight:
      "Сдвиг 2026: от generating code к shipping products. 63% пользователей vibe coding — не разработчики (фаундеры, PM, маркетологи).",
    examples: [
      {
        company: "Autoflowly",
        detail:
          "Full-stack: React + Python + PostgreSQL + hosting из разговора",
      },
      {
        company: "Lovable",
        detail:
          "Frontend + Supabase backend. Тысячи non-technical founders",
      },
      {
        company: "Bolt.new",
        detail:
          "In-browser preview. От идеи до deployed app за 1 сессию",
      },
    ],
    unitboxApplication:
      "Быстрое создание инструментов: landing pages для девелоперов, dashboards, demo-страницы — деплой за минуты.",
    icon: "Ship",
  },
  {
    id: "grand-slam-offer-ai",
    title: "Grand Slam Offer + AI",
    category: "building-launch",
    author: "Alex Hormozi, Liam Ottley",
    summary:
      "AI генерирует pricing, guarantees и positioning за один день",
    whatIsIt:
      "Комбинация Grand Slam Offer из $100M Offers Hormozi с AI: анализ рынка, конкурентов и ЦА, затем offer stack с pricing, bonuses, guarantees.",
    howItWorks: [
      "Скорми AI информацию о продукте и рынке",
      "AI генерирует Dream Outcome",
      "AI создаёт offer stack: core + bonuses + urgency + guarantee",
      "AI рассчитывает pricing по value equation",
      "Тестируй на клиентах, итерируй с AI",
    ],
    keyInsight:
      "ACQ AI обучен на $31M консалтинга через 1026+ бизнесов. Ottley: ChatGPT для ниш → анализ → Hormozi offer steps. AI за 1 день создаёт то, что раньше — месяц.",
    examples: [
      {
        company: "ACQ AI (Hormozi)",
        detail: "Строит Grand Slam Offers за один afternoon",
      },
      {
        company: "Liam Ottley AAA",
        detail:
          "Hormozi's $100M Offers как основа для AI agency offers",
      },
      {
        company: "AI offer generators",
        detail: "Десятки инструментов по фреймворку Hormozi",
      },
    ],
    unitboxApplication:
      "Grand Slam Offer для девелоперов: «Заполним каталог за 48ч, 95%+ точность, или деньги назад. Бонус: AI-агент для лидов на 3 мес бесплатно».",
    icon: "Trophy",
  },
  {
    id: "seo-first-distribution",
    title: "SEO-First AI Distribution",
    category: "building-launch",
    author: "Danny Postma",
    summary: "SEO как главный канал — organic traffic вместо paid ads",
    whatIsIt:
      "Стратегия Danny Postma: AI-продукт с SEO primary distribution. Страницы под keywords, AI для генерации SEO-контента.",
    howItWorks: [
      "Найди high-intent keywords",
      "Landing page под каждый keyword cluster",
      "Оптимизируй: meta, speed, structured data",
      "AI генерирует supporting content",
      "Компаундный рост: ссылки + трафик",
    ],
    keyInsight:
      "HeadshotPro — основной трафик через SEO, без рекламы. Affiliate $50K+/мес (15% revenue). Но: SEO moat умирает из-за AI-контента. Решение: SEO + proprietary data + brand.",
    examples: [
      {
        company: "HeadshotPro",
        detail: "$3.6M ARR без paid ads. 5% conversion. SEO-first",
      },
      {
        company: "Zapier",
        detail:
          "Empire на SEO — страница под каждую интеграцию. $230M+ ARR",
      },
      {
        company: "Canva",
        detail: "$2B+ revenue, начинали с SEO на design templates",
      },
    ],
    unitboxApplication:
      "SEO-страницы: «buy villa bali», «bali investment property». Каждый проект = отдельная SEO-страница с AI-контентом.",
    icon: "Search",
  },

  // ── CATEGORY C: sales-distribution ───────────────────────────────────
  {
    id: "outcome-pricing",
    title: "Outcome Pricing",
    category: "sales-distribution",
    author: "Sarah Guo, Deloitte",
    summary:
      "Продавай результат, не технологию — «−60% расходов» бьёт «AI чатбот»",
    whatIsIt:
      "Ценообразование по результату: клиент платит за measurable outcome (лид, сделка, решённый тикет), не за доступ к инструменту. Premium pricing потому что risk на продавце.",
    howItWorks: [
      "Определи measurable outcome для клиента",
      "Привяжи pricing к outcome",
      "$50 за meeting vs $300 через человека",
      "Гарантируй результат или refund",
      "Track и оптимизируй outcome rate",
    ],
    keyInsight:
      "Sarah Guo: «Лучшие AI-компании не продают AI. Они продают outcomes.» Outcome pricing поддерживает $500-5000/мес. API-access — $20/мес. Разница 25-250x за тот же AI.",
    examples: [
      {
        company: "Sierra",
        detail: "$4B+ оценка. Charges per resolution. RaaS model",
      },
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution. Pure outcome pricing",
      },
      {
        company: "AI SDR services",
        detail: "$50 за meeting vs $200-500 через SDR человека",
      },
    ],
    unitboxApplication:
      "Вместо «$X за заполнение» → «$X за каждого квалифицированного лида из каталога». Align incentives.",
    icon: "BadgeDollarSign",
  },
  {
    id: "ai-outbound-pipeline",
    title: "AI Outbound Pipeline",
    category: "sales-distribution",
    author: "Clay.com ecosystem",
    summary:
      "Data enrichment → AI personalization → Multi-channel sequences",
    whatIsIt:
      "Автоматизированный outbound: Clay.com обогащает данные о prospects через 75+ providers, AI персонализирует messages, multi-channel delivery.",
    howItWorks: [
      "Clay.com обогащает данные о prospects",
      "AI пишет персонализированные first lines",
      "Multi-channel: email + LinkedIn + voice (Vapi/Bland)",
      "AI анализирует responses и adjusts",
      "Smart follow-ups на автопилоте",
    ],
    keyInsight:
      "Компании делают 3-5x больше qualified meetings с AI outbound. Cost per meeting: $50-100 vs $200-500 традиционно. Clay.com стал centerpiece AI-powered outbound.",
    examples: [
      {
        company: "Clay.com",
        detail:
          "Spreadsheet + 75 data providers + AI. Центр AI outbound",
      },
      {
        company: "Instantly.ai",
        detail:
          "AI email outreach at scale. Тысячи agencies используют",
      },
      {
        company: "AI SDR teams",
        detail:
          "3-5x qualified meetings vs traditional SDR. Cost per meeting ↓ 70%",
      },
    ],
    unitboxApplication:
      "AI outreach к новым девелоперам: Clay enriches data → AI персонализирует → «Вот как выглядит ваш проект в каталоге» → demo → close.",
    icon: "Mail",
  },
  {
    id: "content-first-lead-gen",
    title: "Content-First Lead Gen",
    category: "sales-distribution",
    author: "Alex Hormozi, Greg Isenberg",
    summary:
      "Обучай бесплатно → воронка → AI follow-up → продажа",
    whatIsIt:
      "Стратегия: создай бесплатный ценный контент (demo, вебинар, гайд), привлеки leads через value, AI автоматически nurtures и converts.",
    howItWorks: [
      "Создай anchor content: deep-dive, вебинар, гайд",
      "Распространи через SEO + social",
      "Собери leads через value exchange (email за гайд)",
      "AI nurtures: персонализированные follow-ups",
      "AI квалифицирует и бронирует calls",
    ],
    keyInsight:
      "Hormozi: «Давай так много value бесплатно, что люди чувствуют себя обязанными заплатить». Teaching-first подход: демо, вебинары, workshops → серьёзные prospects. AI автоматизирует follow-up.",
    examples: [
      {
        company: "Hormozi content machine",
        detail:
          "3.9M YouTube. Бесплатный контент → leads для Acquisition.com",
      },
      {
        company: "Greg Isenberg podcast",
        detail:
          "Weekly startup ideas → leads для Late Checkout studio",
      },
      {
        company: "HubSpot",
        detail:
          "$2.6B+ ARR. Free tools + education → leads. Классика content-first",
      },
    ],
    unitboxApplication:
      "Бесплатный Bali RE market report (AI-generated из данных каталога) → email capture → AI nurture → demo каталога → close.",
    icon: "FileText",
  },
  {
    id: "building-in-public",
    title: "Building in Public",
    category: "sales-distribution",
    author: "Pieter Levels, Danny Postma",
    summary:
      "Публичные revenue, процесс, ошибки = органический рост и trust",
    whatIsIt:
      "Стратегия: делись revenue числами, процессом разработки, ошибками публично. Создаёт organic audience, trust, и distribution без маркетингового бюджета.",
    howItWorks: [
      "Публикуй revenue screenshots регулярно",
      "Делись code snippets и процессом",
      "Рассказывай об ошибках и learnings",
      "Отвечай на вопросы community",
      "Revenue transparency = trust = customers",
    ],
    keyInsight:
      "Pieter Levels: 700K+ Twitter followers через building in public. Каждый запуск = instant audience. Danny Postma: open revenue charts как marketing tool. Прозрачность = trust = premium pricing.",
    examples: [
      {
        company: "Pieter Levels",
        detail:
          "700K+ followers. Публичные revenue $3-5M/год. Каждый твит = marketing",
      },
      {
        company: "Danny Postma",
        detail:
          "Open revenue charts HeadshotPro. $300K/мес публично",
      },
      {
        company: "Marc Lou",
        detail:
          "$1M/год документирован публично. Transparency = audience",
      },
    ],
    unitboxApplication:
      "Building in public для Unitbox: публиковать AI fill pipeline results, auto-sync stats, market data insights. Привлечёт proptech community и potential clients.",
    icon: "Globe",
  },
  {
    id: "paths-framework",
    title: "PATHS Framework",
    category: "sales-distribution",
    author: "Dharmesh Shah",
    summary:
      "Problem → Audience → Timing → How → Scale — оценка AI-идей",
    whatIsIt:
      "Фреймворк Dharmesh Shah для быстрой оценки AI-стартап идей по 5 критериям. Позволяет за 15 минут отфильтровать weak ideas.",
    howItWorks: [
      "Problem: решает ли реальную боль? (не nice-to-have)",
      "Audience: достаточно ли людей с этой болью?",
      "Timing: почему сейчас? (AI enabled что раньше было невозможно)",
      "How: можем ли мы построить это лучше других?",
      "Scale: может ли это вырасти в $10M+ бизнес?",
    ],
    keyInsight:
      "Dharmesh: «Большинство AI-идей проваливаются на Timing — они решают проблему, но AI не даёт 10x advantage над существующими решениями». Если AI делает лишь 2x лучше — не строй.",
    examples: [
      {
        company: "Agent.ai (Dharmesh)",
        detail:
          "Passed PATHS: P=agent discovery, A=every business, T=agents ready, H=HubSpot expertise, S=marketplace",
      },
      {
        company: "ChatSpot",
        detail:
          "Dharmesh built для HubSpot. P=CRM complexity, A=7M users, T=GPT ready, H=CTO of HubSpot, S=platform",
      },
      {
        company: "Failed AI startups",
        detail:
          "Часто fail на T: «Мы строим AI X» но AI не даёт 10x improvement",
      },
    ],
    unitboxApplication:
      "PATHS для новых Unitbox продуктов: P=manual catalog pain, A=1000s developers globally, T=AI fills catalogs now, H=78 rules + data, S=every RE market.",
    icon: "Compass",
  },
  {
    id: "80-20-ai-pattern",
    title: "80/20 AI Pattern",
    category: "sales-distribution",
    author: "Shaan Puri",
    summary:
      "Найди human-intensive процесс → «что если AI делает 80%?»",
    whatIsIt:
      "Простейший фреймворк для поиска AI-бизнес идей: найди процесс где люди тратят много времени на repetitive work, спроси «что если AI делает 80% этого?»",
    howItWorks: [
      "Найди процесс с высоким human labor",
      "Спроси: что если AI делает 80%?",
      "Оцени: сколько стоит human labor сейчас?",
      "Построй AI решение на 80% автоматизации",
      "Заряди 50% от human cost = instant ROI для клиента",
    ],
    keyInsight:
      "Shaan Puri: «Не строй AI для AI людей. Строй AI для скучных индустрий.» Маркетинговое агентство $15-30K/мес → AI за $2-5K. SDR $60-80K/год → AI за $3-5K/мес. 80% автоматизации достаточно.",
    examples: [
      {
        company: "My First Million podcast",
        detail:
          "Shaan + Sam Parr: еженедельные AI business ideas через 80/20 lens",
      },
      {
        company: "AI replacing agencies",
        detail:
          "Marketing agency $15-30K → AI tools $2-5K. 80% автоматизации",
      },
      {
        company: "AI SDR",
        detail:
          "SDR $60-80K/год → AI $3-5K/мес. 80% outbound автоматизировано",
      },
    ],
    unitboxApplication:
      "80/20 для Unitbox: catalog manager тратит 80% на data entry (автоматизировано AI). Оставшиеся 20% — QA и relationships.",
    icon: "PieChart",
  },
  {
    id: "linkedin-25-strategy",
    title: "LinkedIn <25 Strategy",
    category: "sales-distribution",
    author: "LinkMate research",
    summary:
      "<25 targeted requests/неделю + strategic commenting > cold DMs",
    whatIsIt:
      "Новая LinkedIn стратегия 2026: меньше = больше. Отправляй <25 hyper-targeted connection requests в неделю вместо массовых. Strategic commenting > cold DMs.",
    howItWorks: [
      "<25 connection requests/неделю (avoid algorithmic penalties)",
      "Каждый request — hyper-personalized",
      "Strategic commenting на посты target audience",
      "Public engagement drives inbound profile views",
      "Inbound >> outbound на LinkedIn в 2026",
    ],
    keyInsight:
      "Spray-and-pray умер на LinkedIn в 2026. <25 targeted requests удваивают success rate. Strategic commenting = new cold DM: публичный engagement безопаснее и эффективнее. LinkedIn penalties за mass outreach жёсткие.",
    examples: [
      {
        company: "LinkedIn lead gen data 2026",
        detail:
          "<25 requests/неделю = 2x success rate vs mass outreach",
      },
      {
        company: "Strategic commenting trend",
        detail:
          "Public engagement → inbound profile views → connections → deals",
      },
      {
        company: "LinkMate research",
        detail:
          "Data-driven LinkedIn strategy. Algorithm favors engagement over connections",
      },
    ],
    unitboxApplication:
      "LinkedIn для привлечения Bali девелоперов: comment на посты RE developers, share market insights, <25 targeted connections/неделю.",
    icon: "Linkedin",
  },
  {
    id: "multi-channel-ai-sequence",
    title: "Multi-Channel AI Sequence",
    category: "sales-distribution",
    author: "Clay ecosystem",
    summary:
      "Email + LinkedIn + Voice в одной AI-powered последовательности",
    whatIsIt:
      "Объединение email, LinkedIn и voice (Vapi/Bland) в одну AI-управляемую sequence. AI адаптирует message и channel на основе response patterns.",
    howItWorks: [
      "Day 1: AI-personalized email",
      "Day 3: LinkedIn connection + comment",
      "Day 5: Follow-up email с new angle",
      "Day 7: AI voice call (Vapi/Bland)",
      "AI analyzes responses, adjusts sequence",
    ],
    keyInsight:
      "Multi-channel outreach: 3-5x response rate vs single-channel. AI персонализирует каждый touchpoint. Voice AI (Vapi) добавляет human touch на масштабе. Но: качество > количество — 10 personalized touches > 100 generic.",
    examples: [
      {
        company: "Clay + Instantly + Vapi stack",
        detail:
          "Full multi-channel: data enrichment → email → LinkedIn → voice. 3-5x response",
      },
      {
        company: "AI SDR companies",
        detail:
          "11x, Artisan: полный multi-channel на автопилоте",
      },
      {
        company: "Real estate lead gen",
        detail:
          "Email + WhatsApp + call sequence для property investors",
      },
    ],
    unitboxApplication:
      "Multi-channel для девелоперов: email с market data → LinkedIn comment → WhatsApp с demo → Vapi call для qualification.",
    icon: "Route",
  },
  {
    id: "ghl-ai-stack",
    title: "GHL + AI Stack",
    category: "sales-distribution",
    author: "AI agency ecosystem",
    summary:
      "GoHighLevel как CRM backbone + AI chatbots + automation = sub-industry",
    whatIsIt:
      "GoHighLevel (GHL) стал де-факто инфраструктурой для AI agencies. CRM + landing pages + email + SMS + pipeline — всё в одном, с AI chatbots и automation сверху.",
    howItWorks: [
      "GHL как CRM и pipeline management",
      "AI chatbot на сайте клиента (через GHL)",
      "Automated follow-ups через email + SMS",
      "AI qualification и lead scoring",
      "Dashboard для клиента с metrics",
    ],
    keyInsight:
      "Огромная часть AI agencies построена на GHL. Это почти sub-industry: GHL + AI chatbot + n8n automation = standard AAA stack. Клиенты получают unified platform, agency получает sticky retainer.",
    examples: [
      {
        company: "GHL AI agency ecosystem",
        detail:
          "Тысячи agencies на GHL. Standard stack: GHL + Voiceflow/Botpress + n8n",
      },
      {
        company: "Typical agency on GHL",
        detail:
          "$2-5K/мес retainer. GHL white-labeled. AI chatbot + automation",
      },
      {
        company: "GHL marketplace",
        detail:
          "App marketplace с AI integrations. SaaS-like revenue для agencies",
      },
    ],
    unitboxApplication:
      "GHL или аналог как CRM для девелоперов: Unitbox каталог + CRM для leads + AI chatbot + automated follow-ups. Всё в одном для девелопера.",
    icon: "Workflow",
  },
];
