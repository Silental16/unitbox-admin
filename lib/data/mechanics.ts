export type MechanicCategory = "business-models"

export interface MechanicExample {
  company: string
  detail: string
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
    summary: "Строй apps с доменной экспертизой, не infrastructure — тут ценность и защита",
    whatIsIt:
      "AI рынок формируется в слои: foundation models (мало победителей), infrastructure/tooling (много), applications (больше всего). Максимальная ценность аккумулируется на application layer — там где доменная экспертиза встречается с AI.",
    howItWorks: [
      "Выбери индустрию которую знаешь глубоко",
      "Найди самый дорогой/болезненный workflow",
      "Построй AI-приложение решающее этот workflow end-to-end",
      "Используй foundation models как commodity input (не строй свои)",
      "Моат = проприетарные данные + domain expertise + switching costs",
    ],
    keyInsight:
      "Контрарианский тезис Elad Gil: «AI infrastructure переоценена, AI applications недооценены». Infrastructure = knife fight между хорошо финансированными гигантами. Applications с доменной экспертизой имеют defensible moats. Не конкурируй с OpenAI — строй поверх них.",
    examples: [
      {
        company: "Harvey (юридический AI)",
        detail: "$1.5B оценка — AI-юрист для топовых юрфирм. Глубокая доменная экспертиза = непробиваемый моат",
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
      "Unitbox — классический application layer play. Проприетарные данные о рынке Бали (цены, юниты, тренды) + доменная экспертиза в RE + AI = приложение которое невозможно повторить без тех же данных.",
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
    summary: "Software → Work → Results as a Service — эволюция от инструмента к результату",
    whatIsIt:
      "SaaS продаёт доступ к софту. WaaS (Work as a Service) продаёт выполненную работу через AI-агентов. RaaS (Results as a Service) продаёт гарантированный результат. Маятник двигается от «вот инструмент, разбирайся сам» к «вот результат, мы всё сделали».",
    howItWorks: [
      "SaaS: подписка за доступ к инструменту ($X/seat/мес)",
      "WaaS: AI-агент выполняет работу, платишь за действия ($X/task)",
      "RaaS: платишь только за результат ($X/outcome — за лид, за сделку, за решённый тикет)",
      "Каждый шаг повышает ценность для клиента и pricing power для продавца",
      "RaaS имеет самую высокую маржу — клиент платит за outcome, не за inputs",
    ],
    keyInsight:
      "Dharmesh Shah купил chat.com за $15M+ и перенаправил на ChatGPT — показатель его conviction в AI-first будущем. Agent.ai (его проект) = маркетплейс AI-агентов с 2M+ пользователями. Per-seat pricing ломается когда AI-агент заменяет 3 сотрудников.",
    examples: [
      {
        company: "Agent.ai (Dharmesh Shah)",
        detail: "2M+ пользователей, маркетплейс AI-агентов. Dharmesh — CTO $30B+ HubSpot",
      },
      {
        company: "SaaStr case study",
        detail: "140% Q1 revenue с 1.25 человека + 20 AI агентов. Classic WaaS→RaaS transition",
      },
      {
        company: "11x.ai «Alice»",
        detail: "AI SDR за $3-5K/мес вместо человека за $60-80K/год. Чистый RaaS — платишь за встречи, не за seat",
      },
    ],
    unitboxApplication:
      "Эволюция: сейчас Unitbox = SaaS (каталог). Следующий шаг WaaS: AI-агент автоматически обновляет каталог, генерирует отчёты, отвечает покупателям. Финальный RaaS: девелопер платит $X за каждого квалифицированного лида, не за подписку.",
    icon: "TrendingUp",
  },
  {
    id: "vertical-ai-agent",
    title: "Vertical AI Agent",
    category: "business-models",
    author: "Y Combinator, Sarah Guo, Sequoia",
    summary: "Узкий AI-агент для конкретной индустрии заменяет целую job function",
    whatIsIt:
      "Вместо горизонтального AI «для всех» — специализированный AI-агент глубоко понимающий одну индустрию. Заменяет не инструмент, а целую рабочую функцию: AI-юрист, AI-бухгалтер, AI-рекрутер. Тезис Sequoia: «1000 вертикальных AI-агентов» — каждая функция в каждой индустрии получит специализированного AI.",
    howItWorks: [
      "Выбери индустрию + job function (юрист в PI, бухгалтер в SMB, SDR в SaaS)",
      "Собери проприетарные данные для обучения (workflows, документы, кейсы)",
      "Построй агента который выполняет 80%+ работы автономно",
      "Продавай как «AI-сотрудника» за $3-5K/мес (vs $60-80K/год за человека)",
      "Compound data advantage — чем больше клиентов, тем лучше модель",
    ],
    keyInsight:
      "Sarah Guo: «Лучшие AI-компании не продают AI. Они продают outcomes, которые случайно используют AI.» Gartner: 80% enterprise примут vertical AI agents к 2026. Vertical AI стартапы привлекли $15B+ в 2025. Retention 3-5x выше чем у горизонтальных решений.",
    examples: [
      {
        company: "Harvey (юридический AI)",
        detail: "$1.5B оценка. Заменяет младших юристов в топовых фирмах",
      },
      {
        company: "Sierra (customer service AI)",
        detail: "$4B+ оценка. Основатель — ex-CEO Salesforce. Заменяет BPO-колл-центры целиком",
      },
      {
        company: "Mercor (рекрутинг AI)",
        detail: "3M+ автоматических оценок кандидатов. Вертикальный AI для hiring",
      },
    ],
    unitboxApplication:
      "Unitbox строит вертикального AI-агента для Bali real estate: знает все проекты, цены, наличие юнитов, финансовые модели. Может квалифицировать лидов, сравнивать проекты, генерировать отчёты. Это не chatbot — это AI property consultant.",
    icon: "Bot",
  },
]
