export const mechanicsDE: any[] = [
  // ── CATEGORY: ai-operations ──────────────────────────────────────
  {
    id: "ai-coo",
    title: "AI COO",
    category: "ai-operations",
    author: "Multiple",
    summary: "AI обрабатывает operational задачи 3-5 сотрудников",
    whatIsIt:
      "AI для замены операционных функций: calendar, email triage, PM, bookkeeping, reporting. Stack $3-12K/год вместо $60-100K на COO.",
    howItWorks: [
      "Список всех операционных задач",
      "Для каждой — AI tool: Granola, Notion AI, Reclaim.ai, Truewind",
      "Автоматизации между ними через n8n/Make",
      "AI рутина, человек стратегия",
      "$3-12K/год вместо $60-100K",
    ],
    keyInsight:
      "38% семизначных бизнесов в 2026 управляются solopreneurs с AI. Ошибка: автоматизировать всё сразу. Начинай с самой repetitive задачи.",
    examples: [
      {
        company: "Solopreneur stack 2026",
        detail: "$3-12K/год: Granola, Notion AI, Reclaim, Truewind",
      },
      {
        company: "SaaStr",
        detail: "140% Q1 revenue, 1.25 человека + 20 AI агентов",
      },
      {
        company: "Pieter Levels",
        detail: "$3-5M/год, 0 сотрудников. AI handles support, admin, analytics",
      },
    ],
    unitboxApplication:
      "Unitbox уже AI COO: Claude Code как CTO, auto-sync, AI agents. Добавить: AI для financial reporting, client comms, pipeline mgmt.",
    icon: "UserCog",
  },
  {
    id: "byoa",
    title: "BYOA — Build Your Own AI",
    category: "ai-operations",
    author: "Alex Hormozi",
    summary: "Тренируй AI на данных компании — единственный настоящий моат",
    whatIsIt:
      "Стратегия Hormozi: каждая компания должна построить AI на своих уникальных данных — кейсах, workflows, знаниях клиентов. Невозможно скопировать.",
    howItWorks: [
      "Собери проприетарные данные (документы, кейсы, SOP)",
      "Структурируй в Knowledge Vault (RAG/vector DB)",
      "Обучи AI-ассистента",
      "Дай сотрудникам доступ",
      "Каждый кейс усиливает AI — compound advantage",
    ],
    keyInsight:
      "Hormozi: «Когда стоимость интеллекта → 0, моат = проприетарные данные». ACQ AI обучен на $31M консалтинга + все книги. Невозможно повторить.",
    examples: [
      {
        company: "ACQ AI",
        detail: "Обучен на $31M консалтинга. Implementation, не information",
      },
      {
        company: "Knowledge Vaults trend",
        detail: "Тренируй AI на экспертном контенте за 15 минут",
      },
      {
        company: "Glean",
        detail: "$4.6B оценка — enterprise AI search по всем данным компании",
      },
    ],
    unitboxApplication:
      "78 правил, данные 97 девелоперов, цены/юниты Бали = Knowledge Vault. Открыть как продукт: «Спроси AI всё о рынке Бали».",
    icon: "Brain",
  },
  {
    id: "hybrid-teams",
    title: "Hybrid Teams",
    category: "ai-operations",
    author: "Dharmesh Shah",
    summary:
      "Люди + AI агенты = одна команда, каждый делает своё лучшее",
    whatIsIt:
      "AI-агенты — полноправные члены команды. Люди: стратегия, креатив, отношения. AI: рутина, анализ, масштаб.",
    howItWorks: [
      "Определи роли и задачи",
      "Для каждой: AI (рутина) или Human (стратегия)",
      "Создай AI-агентов для AI-задач",
      "Настрой handoff протоколы",
      "Мониторь quality, итерируй",
    ],
    keyInsight:
      "Agent.ai (2M+ юзеров) = маркетплейс AI-агентов для hybrid teams. Ключ: чёткие handoff protocols. AI без handoff = плохой customer experience.",
    examples: [
      {
        company: "Agent.ai",
        detail: "2M+ пользователей. Маркетплейс для hybrid teams",
      },
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution. 50% AI, 50% люди. Classic hybrid",
      },
      {
        company: "Klarna",
        detail: "AI = 2/3 support чатов = 700 FTE. Маржа выросла",
      },
    ],
    unitboxApplication:
      "AI agents заполняют каталог, auto-sync обновляет цены, человек делает QA и общается с девелоперами. Масштабируется без найма.",
    icon: "UsersRound",
  },
  {
    id: "agentic-patterns",
    title: "Agentic Patterns",
    category: "ai-operations",
    author: "Andrew Ng",
    summary:
      "Reflection + Tool Use + Planning + Multi-Agent > single-shot",
    whatIsIt:
      "4 паттерна AI-агентов от Andrew Ng: из «отвечателя» в автономного работника. Agent с итерациями на GPT-3.5 бьёт single-shot GPT-4.",
    howItWorks: [
      "Reflection: проверяет и исправляет свою работу",
      "Tool Use: API, базы данных, поиск",
      "Planning: разбивает задачу на шаги",
      "Multi-Agent: несколько ролей сотрудничают",
      "Комбинация = production-grade agent",
    ],
    keyInsight:
      "Ng: «Agentic workflows — следующий major unlock». 5 итераций GPT-3.5 > 1 shot GPT-4. YC W25: 50%+ стартапов = agentic AI.",
    examples: [
      {
        company: "Devin (Cognition)",
        detail:
          "AI software engineer. Все 4 patterns: планирует, кодит, тестирует, исправляет",
      },
      {
        company: "Unitbox pipeline",
        detail:
          "5 агентов + reflection (verify SQL) + tools (Supabase, S3) + planning (5 фаз)",
      },
      {
        company: "Claude Code",
        detail: "$1B ARR. Agent: tool use, planning, reflection",
      },
    ],
    unitboxApplication:
      "Pipeline = agentic patterns в действии. Усилить: self-healing при auto-sync ошибках.",
    icon: "Workflow",
  },
  {
    id: "ai-support-hybrid",
    title: "AI Support Hybrid",
    category: "ai-operations",
    author: "Intercom, Zendesk",
    summary:
      "60-80% AI (L1) + 20-40% human (L2) — единственная рабочая модель",
    whatIsIt:
      "AI на простых запросах, люди на сложных/эмоциональных. 100% AI = customer satisfaction tank. Hybrid proven.",
    howItWorks: [
      "RAG over knowledge base",
      "AI обрабатывает L1: FAQ, статус, how-to",
      "Детектирует complexity → эскалирует людям",
      "Люди на L2: жалобы, refunds, complex",
      "Feedback loop: решённые людьми → обучают AI",
    ],
    keyInsight:
      "95% AI support пилотов стагнируют (100% замена). Winning: 60-80% AI L1 = instant, 20-40% humans L2 = empathy. Intercom: $0.99/resolution, 50% rate. Klarna: 700 FTE equivalent.",
    examples: [
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution, 50% rate. Outcome pricing",
      },
      {
        company: "Klarna",
        detail: "2/3 чатов AI = 700 FTE. Satisfaction = human level",
      },
      {
        company: "Sierra",
        detail: "$4B+. Заменяет BPO колл-центры",
      },
    ],
    unitboxApplication:
      "AI support для покупателей: вопросы о проектах, ценах, ROI. 80% мгновенно. 20% сложных → менеджер.",
    icon: "Headphones",
  },
  {
    id: "knowledge-vault",
    title: "Knowledge Vault",
    category: "ai-operations",
    author: "Hormozi ecosystem",
    summary:
      "AI на экспертном контенте за 15 минут — заменяет курсы и консалтинг",
    whatIsIt:
      "Конвертация знаний (книги, кейсы, SOP) в AI-ассистента. RAG + curated expert content = персонализированные ответы.",
    howItWorks: [
      "Собери expert content",
      "Загрузи в RAG (vector DB + embeddings)",
      "AI отвечает на основе всего контента",
      "Personalised answers вместо generic",
      "Монетизируй или используй internal",
    ],
    keyInsight:
      "ACQ AI даёт implementation, не information. ChatGPT = generic. Knowledge Vault = «вот как Hormozi решал эту проблему у бизнеса X с revenue Y».",
    examples: [
      {
        company: "ACQ AI",
        detail: "$31M консалтинга. Implementation answers",
      },
      {
        company: "Dexa.ai",
        detail: "«Спроси Hormozi» — AI отвечает из 4000+ видео",
      },
      {
        company: "Custom GPTs",
        detail: "Тысячи обученных на экспертном контенте",
      },
    ],
    unitboxApplication:
      "Knowledge Vault о Бали: данные каталога, research, финмодели, зонирование. Продавать доступ инвесторам.",
    icon: "BookOpen",
  },
  {
    id: "ai-competitive-intelligence",
    title: "AI Competitive Intelligence",
    category: "ai-operations",
    author: "Firecrawl, Browserbase",
    summary:
      "Скрейпинг конкурентов → AI → проприетарные датасеты real-time",
    whatIsIt:
      "Автоматический мониторинг конкурентов: скрейпинг, анализ цен, product changes, hiring patterns.",
    howItWorks: [
      "Скрейпинг конкурентов (Firecrawl + n8n)",
      "AI классифицирует данные",
      "Alerts при значимых изменениях",
      "AI weekly competitive report",
      "Данные компаундятся → тренды",
    ],
    keyInsight:
      "Проприетарные datasets = ценнейший asset. Данные о конкурентах невозможно купить. Hormozi «proprietary data moat» в действии.",
    examples: [
      {
        company: "Firecrawl",
        detail: "Web scraping API для AI. Структурированные datasets",
      },
      {
        company: "Clay.com",
        detail: "75 providers + AI enrichment для competitive intel",
      },
      {
        company: "Crayon, Klue",
        detail: "Enterprise CI platforms. $10-50K/год",
      },
    ],
    unitboxApplication:
      "Автомониторинг цен конкурентных каталогов, новых проектов на Бали, AI-отчёты для девелоперов.",
    icon: "Radar",
  },
  {
    id: "20-ai-agents-team",
    title: "20 AI Agents = Team",
    category: "ai-operations",
    author: "SaaStr",
    summary: "20 AI агентов + 1.25 человека → 140% revenue",
    whatIsIt:
      "SaaStr: заменили sales team на 20 AI агентов + 1.25 человека. 140% целевого Q1 revenue.",
    howItWorks: [
      "Map все задачи team",
      "Специализированный AI agent на каждую",
      "Агенты 24/7, 10x лидов",
      "1.25 человека управляют + закрывают сложные deals",
      "Cost per meeting: $50-100 vs $200-500",
    ],
    keyInsight:
      "AI agents = primary workforce, не помощники. 20 узких агентов > 1 «умный». Каждый специализирован.",
    examples: [
      {
        company: "SaaStr",
        detail: "140% Q1 2026. 1.25 человека + 20 agents",
      },
      {
        company: "11x.ai Alice",
        detail: "AI SDR $3-5K/мес vs $60-80K/год человек",
      },
      {
        company: "Artisan Ava",
        detail: "AI BDR: research → personalize → send → follow-up",
      },
    ],
    unitboxApplication:
      "Расширить: AI для outreach, ответов покупателям, market research, content. 1 человек + 10 agents = full ops.",
    icon: "Network",
  },

  // ── CATEGORY: content-media ──────────────────────────────────────
  {
    id: "ai-content-pipeline",
    title: "AI Content Pipeline",
    category: "content-media",
    author: "Multiple",
    summary: "1 контент → AI → 10+ форматов автоматически",
    whatIsIt:
      "Один anchor content → AI разбивает на десятки форматов: social posts, email, short videos, карусели.",
    howItWorks: [
      "Создай anchor content (видео, longread, подкаст)",
      "AI извлекает ключевые идеи",
      "Генерирует: 5 Twitter, 3 LinkedIn, 1 email, 10 short video scripts",
      "Адаптирует tone под платформу",
      "Планируй публикации на неделю",
    ],
    keyInsight:
      "Agencies: $5-15K/мес за managed pipeline. Себестоимость $500-1K. Маржа 80-90%. Но: чистый AI-контент деградирует. Winning = AI production + human curation.",
    examples: [
      {
        company: "Hormozi content",
        detail: "1 видео → 20+ clips, posts, emails. 3.9M YouTube",
      },
      {
        company: "Opus Clip",
        detail: "AI нарезает длинные видео на вирусные shorts",
      },
      {
        company: "AI content agencies",
        detail: "$5-15K/мес. 10x output, 80% меньше costs",
      },
    ],
    unitboxApplication:
      "Один deep-dive о проекте → AI: 10 Instagram, Telegram updates, emails, YouTube shorts. Каждый проект = контент-актив.",
    icon: "Newspaper",
  },
  {
    id: "vibe-marketing",
    title: "Vibe Marketing",
    category: "content-media",
    author: "Greg Isenberg",
    summary:
      "AI трансформирует контент в множество форматов — маркетинг на автопилоте",
    whatIsIt:
      "AI-driven маркетинг: полная автоматизация content transformation, A/B testing, targeting.",
    howItWorks: [
      "Seed контент (testimonial, case study)",
      "AI tools: Swell, Opus Clip, Blotato",
      "AI тестирует варианты",
      "AI анализирует что работает",
      "Marketing machine 24/7",
    ],
    keyInsight:
      "Isenberg: «Маркетинг перестаёт быть ручным трудом». Один маркетолог = работа 5. Но: generic AI content = noise. Human creativity + AI execution.",
    examples: [
      {
        company: "Late Checkout",
        detail: "Автоматизирует маркетинг для портфеля стартапов",
      },
      {
        company: "Swell AI",
        detail: "Repurposes контент в 10+ форматов",
      },
      {
        company: "Blotato",
        detail: "AI adapts content для разных платформ",
      },
    ],
    unitboxApplication:
      "AI автоматически генерирует маркетинг для каждого нового проекта — Instagram, Telegram, email, YouTube.",
    icon: "Megaphone",
  },
  {
    id: "curation-as-business",
    title: "Curation as Business",
    category: "content-media",
    author: "Matt Wolfe, Ben Tossell",
    summary:
      "Курируй AI-инструменты → медиа-бизнес с premium pricing",
    whatIsIt:
      "Стань trusted curator: когда шума слишком много — ценность в фильтрации. Newsletter, директория, подкаст.",
    howItWorks: [
      "Выбери нишу кураторства",
      "Ежедневно фильтруй, выбирай лучшее",
      "Публикуй: newsletter, YouTube, directory",
      "Monetize: sponsorships $2-10K, affiliate 10-30%, premium",
      "Audience compounds",
    ],
    keyInsight:
      "Ben Tossell: 7-figure за <1 год на AI newsletter. Matt Wolfe: 694K YouTube. Кураторство defensible — trust нельзя скопировать AI.",
    examples: [
      {
        company: "Ben's Bites",
        detail: "120K+ подписчиков, 7-figure за <1 год",
      },
      {
        company: "FutureTools.io",
        detail: "230K email, 694K YouTube. Sponsorships + affiliate",
      },
      {
        company: "TLDR Newsletter",
        detail: "1.2M подписчиков. $5M+/год sponsorships",
      },
    ],
    unitboxApplication:
      "«Bali Property Intelligence» newsletter: AI-curated market updates. Premium для девелоперов $500/мес.",
    icon: "BookmarkCheck",
  },
  {
    id: "ai-creative-agency",
    title: "AI Creative Agency",
    category: "content-media",
    author: "Brett Malinowski",
    summary:
      "AI-generated ролики за $20-40K — creative services нового поколения",
    whatIsIt:
      "AI генерирует рекламный контент (видео, product shots, brand content) за $20-40K. Не commodity — premium AI creative.",
    howItWorks: [
      "Клиент даёт бриф",
      "AI генерирует концепты",
      "AI создаёт видео/images",
      "Human creative director — quality control",
      "Delivery за дни, premium pricing",
    ],
    keyInsight:
      "Brett Malinowski: 25 лет, $20-40K за AI commercial. 448K YouTube. Premium потому что результат = high-quality brand content.",
    examples: [
      {
        company: "Brett Malinowski",
        detail: "$20-40K/проект. 448K YouTube",
      },
      {
        company: "AI video agencies",
        detail: "$10-50K/проект на AI video production",
      },
      {
        company: "Runway, Pika",
        detail: "AI video tools. Agencies = creative direction layer",
      },
    ],
    unitboxApplication:
      "AI-generated видео-туры для девелоперов из фото + floor plans за $1-3K вместо $5-15K съёмок.",
    icon: "Film",
  },
];
