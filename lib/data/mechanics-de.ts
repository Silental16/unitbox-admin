export const mechanicsDE: any[] = [
  // ── CATEGORY: ai-operations ──────────────────────────────────────
  {
    id: "ai-operations-team",
    title: "AI Operations Team",
    category: "ai-operations",
    author: "SaaStr, Multiple",
    summary: "20 узких AI-агентов + 1-2 человека = full operations, 140% revenue",
    whatIsIt:
      "AI-агенты как primary workforce: не один «умный» помощник, а команда из 10-20 узкоспециализированных агентов, каждый выполняющий конкретную операционную функцию (calendar, email triage, PM, bookkeeping, reporting, SDR, support). 1-2 человека управляют и закрывают сложные кейсы. Stack $3-12K/год вместо $200-500K на команду.",
    howItWorks: [
      "Map все операционные задачи team",
      "Специализированный AI agent на каждую (не один universal)",
      "Агенты 24/7: calendar, email, PM, bookkeeping, SDR, support",
      "Автоматизации между ними через n8n/Make",
      "1-2 человека: стратегия, high-value sales, сложные deals",
    ],
    keyInsight:
      "SaaStr: 140% Q1 revenue с 1.25 человека + 20 AI агентов. 38% семизначных бизнесов в 2026 управляются solopreneurs с AI. 20 узких агентов > 1 «умный». Cost per meeting: $50-100 vs $200-500. Ошибка: автоматизировать всё сразу — начинай с самой repetitive задачи.",
    examples: [
      {
        company: "SaaStr",
        detail: "140% Q1 2026. 1.25 человека + 20 agents",
      },
      {
        company: "Solopreneur stack 2026",
        detail: "$3-12K/год: Granola, Notion AI, Reclaim, Truewind",
      },
      {
        company: "Pieter Levels",
        detail: "$3-5M/год, 0 сотрудников. AI handles support, admin, analytics",
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
      "Расширить: AI для outreach, ответов покупателям, market research, content, financial reporting, client comms. 1 человек + 10 agents = full ops.",
    icon: "Network",
  },
  {
    id: "byoa-knowledge-vault",
    title: "BYOA / Knowledge Vault",
    category: "ai-operations",
    author: "Alex Hormozi, Glean",
    summary: "Тренируй AI на проприетарных данных компании — единственный настоящий моат. Implementation > information.",
    whatIsIt:
      "Стратегия Hormozi: каждая компания должна построить AI на своих уникальных данных — кейсах, workflows, знаниях клиентов. Конвертация знаний (книги, кейсы, SOP) в Knowledge Vault (RAG + curated expert content) даёт персонализированные ответы вместо generic. ACQ AI даёт implementation, не information. Невозможно скопировать.",
    howItWorks: [
      "Собери проприетарные данные (документы, кейсы, SOP, книги)",
      "Структурируй в Knowledge Vault (RAG/vector DB/embeddings)",
      "Обучи AI-ассистента — personalised answers вместо generic",
      "Дай сотрудникам/клиентам доступ",
      "Каждый кейс усиливает AI — compound advantage",
    ],
    keyInsight:
      "Hormozi: «Когда стоимость интеллекта → 0, моат = проприетарные данные». ACQ AI обучен на $31M консалтинга + все книги. Glean ($7.2B) = enterprise Knowledge Vault по всем данным компании. ChatGPT = generic. Knowledge Vault = «вот как Hormozi решал эту проблему у бизнеса X с revenue Y».",
    examples: [
      {
        company: "ACQ AI",
        detail: "Обучен на $31M консалтинга. Implementation, не information",
        caseStudy: {
          mechanicInAction: "Acquisition.com превратила $31M консалтинговых данных (1026+ бизнесов) в продукт ACQ AI. 80% знаний никогда не публиковались — сырые данные из реальных сессий: constraint analyses, diagnostic sessions, offer designs, converting scripts.\n\nПроприетарная Knowledge Vault — не generic chatbot, а система с worldview и playbooks. Даёт имплементацию, а не информацию: готовые скрипты, ценовые модели, воронки.\n\nACQ AI запущен в 2025. ACQ Vantage (community + AI + workshops) — март 2026. 845 участников.",
          jtbd: "**Core Job:** Собственник бизнеса $1-10M застрял на плато — хочет конкретный план (оффер, воронка, скрипт, цены) для роста 2-3x без дорогих консультантов.\n\n**Push:** Консультанты $500-1000/час и дают теорию. ChatGPT даёт generic советы. Pull: $31M реального опыта за $299/мес. Готовые артефакты за минуты.\n\n**Consumption Chain:** YouTube 3.87M → книги $100M Offers → ACQ AI $3K + $299/мес → ACQ Vantage $1К/мес.",
          monetization: "**Тарифы:** ACQ AI: $3,000 initiation + $299/мес. ACQ Vantage: $1,000/мес (community + AI + workshops).\n\n845 участников Vantage ≈ ~$10M ARR. CAC ≈ $0 (контент-маркетинг, 3.87M YouTube). Gross margin ~85-90%.\n\nПортфель Acquisition.com: $250M+ годовой выручки.",
          marketing: "**GTM:** Content-led + community-led. Нет outbound, нет paid ads. YouTube 3.87M подписчиков, 880M+ просмотров. Книги-бестселлеры. Skool community.\n\nReferral: \"Make Your Membership Free\" — 2 реферала = бесплатная подписка.\n\n**Первые клиенты:** Gym Launch (2016-2017) — лично помогал владельцам. ACQ AI — монетизация hot audience.",
          impact: "**Для клиента:** Оффер: 2-4 недели → 1 день. Консалтинг: $15-50K → $299-1,000/мес. Скрипт: trial & error → готовый за минуты. Pricing model с защитой 37% маржи.\n\n**Для компании:** 2016 $0 → 2021 $46.2M exit → 2026 портфель $250M+, net worth $100-350M. YouTube: 0 → 3.87M, 880M просмотров.",
          tocConstraint: "**Ограничение:** Масштабирование экспертизы — физически не могут консультировать >50-100 бизнесов. Demand в 10-100x превышал capacity.\n\n**Elevate:** ACQ AI — один инструмент обслуживает 845+ клиентов одновременно. Capacity: ~100 бизнесов → теоретически неограниченно.\n\n**Куда сместилось:** Качество и глубина ответов AI. AI не заменяет live diagnostic session.",
          trizContradictions: "**ТП #1:** Персонализация ↑, масштабируемость ↓. Решение: обучение AI на 1026+ реальных кейсах — персонализированные ответы на масштабе.\n\n**Физическое:** Знания открытые (для привлечения) И закрытые (для монетизации). Решение: 20% в книгах/YouTube, 80% $31M data в ACQ AI.\n\n**Приёмы:** #26 Копирование (клонирование экспертизы в AI), #10 Предварительное действие (10 лет данных ДО создания AI), #1 Сегментация (информационные бесплатно / имплементационные платно).",
          conditions: "**Founder:** Alex Hormozi — Vanderbilt, management consulting, 10+ лет hands-on. $31M документированного консалтинга по 1026 бизнесам. Без этого объёма BYOA невозможен.\n\n**Market timing:** 2025 — массовое принятие LLM. Предприниматели разочаровались в generic ChatGPT. Окно для specialized AI.\n\n**Capital:** Минимальные — аудитория = бесплатная дистрибуция. Знания = 10 лет. $46.2M от exit.",
          mvpVersion: "**Эксперимент:** Собери 20-50 лучших документов/ответов клиентам. Custom GPT или Claude Project с этими документами. Дай 5-10 клиентам бесплатно на неделю. Попроси решить задачу (оффер, скрипт, план).\n\n**Метрика:** 6+ из 10 говорят \"значительно полезнее generic AI\" И 3+ готовы платить. Retention 7 дней > 50%.\n\n**Следующий шаг:** Лендинг + Stripe, 50 платящих за $99-299/мес. Наращивать knowledge base после каждого кейса.",
        },
      },
      {
        company: "Glean",
        detail: "$7.2B оценка — enterprise AI search по всем данным компании",
        caseStudy: {
          mechanicInAction: "Glean воплощает BYOA через корпоративный Knowledge Vault. Индексирует ВСЕ внутренние данные — Slack, email, Drive, Jira, Salesforce, Confluence, GitHub и 100+ коннекторов — и строит уникальный Knowledge Graph для каждого клиента. Три слоя: контент, люди, активность.\n\n100+ коннекторов с реплицированными permissions. Model-agnostic abstraction layer. Сознательный отказ от PLG — только enterprise через CIO, минимум 100 seats.\n\nОснование 2019, $100M ARR за 3 года (март 2025), $200M ARR через 9 месяцев. Оценка $7.2B.",
          jtbd: "**Core Job:** Мгновенно находить любую внутреннюю информацию через один поиск когда компания 200→2000+ сотрудников.\n\n**Switching Trigger:** Опрос: \"найти информацию\" — топ-жалоба. 30%+ времени на поиск, а не работу.\n\n**Push:** Внутренний поиск находит 10%. Slack — ответ через часы. Новички не знают где искать. Pull: один поиск по всем системам. AI-ответы с цитатами. 80% adoption (Motive).",
          monetization: "**Тарифы:** Enterprise Search ~$45-50/user/мес. Work AI Add-on ~$15/user/мес. Итого ~$60-65/user/мес. Support 10% от ARR обязательно. Минимум ~$50-60K/год. Типичный контракт $200K+/год.\n\n**Revenue:** $110M (2024) → $200M+ (декабрь 2025). Рост 89% YoY. 1000+ организаций. Привлечено $765M. Оценка $7.2B (36x ARR).",
          marketing: "**GTM:** Top-down enterprise sales через CIO. Никакого PLG. Платный POC ~$70K. Analyst reports (Gartner, Forrester). Партнёрства: Dell (on-prem), AWS.\n\nИнвесторы (Capital One, Citi, Databricks, Workday Ventures) — каналы дистрибуции.\n\n**Первые клиенты:** Нетворк Arvind Jain из Google и Rubrik. Databricks, Confluent — растущие tech-компании с information sprawl.",
          impact: "**Для клиента:** Поиск: 30+ мин → секунды. Системы: 20+ → 1. Adoption rate 80% (Motive). Онбординг: 2-4 недели → дни.\n\n**Для компании:** 2019 $0 → 2021 $1B оценка → 2024 $110M ARR, $4.6B → 2025 $200M+, $7.2B. 1,475 сотрудников.",
          tocConstraint: "**Ограничение:** Пропускная способность поиска знаний. При росте 200→2000 связи растут квадратично, способность человека — линейно. Bottleneck = человек как посредник знаний.\n\n**Exploit:** Лучший enterprise search через Knowledge Graph с персонализацией.\n\n**Elevate:** Генеративный AI (2023-2024) — синтезированные ответы с цитатами. Далее — AI-агенты, которые выполняют действия.\n\n**Куда сместилось:** От \"найти\" к \"выполнить действие\" → из поисковика в операционную платформу.",
          trizContradictions: "**ТП #1:** Полнота индексации ↑, безопасность ↓. Решение: row-level permissions replication — индексирует всё, но каждый результат через оригинальные ACL. #1 Сегментация.\n\n**Физическое:** Knowledge Graph общий (связывает данные) И специфичный (уникальная оргструктура). Единая архитектура + уникальный instance, обучающийся на паттернах каждой компании.\n\n**Приёмы:** #3 Местное качество (каждый коннектор под API системы), #7 Матрёшка (Slack bot, browser extension, встроенный), #10 Предварительное действие (crawlers индексируют ДО запроса), #26 Копирование (копирует метаданные, оригиналы в source systems).\n\n**ИКР:** Каждый сотрудник знает всё, что знает организация, в момент когда нужно — без поиска.",
          conditions: "**Founder:** Arvind Jain — distinguished engineer Google (10+ лет, Search/Maps/YouTube). Со-основатель Rubrik ($4B+). Лично видел боль масштабирования.\n\n**Market timing:** 2019 — enterprise на 50-100+ инструментах. 2022-2023 — LLM revolution. Glean начал как search, но был готов к AI wave раньше конкурентов (Knowledge Graph уже построен).\n\n**Capital:** $765M за 6 раундов. 100+ коннекторов — каждый отдельная инженерная задача.",
          mvpVersion: "**Эксперимент:** Выгрузить 100-200 документов в векторную базу (Pinecone/Qdrant). RAG-чат на OpenAI API + LangChain. Дать 10-15 сотрудникам на неделю через Streamlit.\n\n**Метрика:** >60% вопросов получают полезный ответ. Возвращаются >3 раз за неделю. Хотя бы 1 \"нашёл то, что не мог найти раньше\".\n\n**Следующий шаг:** 2-3 реальных коннектора (Slack, Drive, Notion). Полный корпус одного отдела. 50 сотрудников.",
        },
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
      "78 правил, данные 97 девелоперов, цены/юниты Бали = Knowledge Vault. Открыть как продукт: «Спроси AI всё о рынке Бали». Продавать доступ инвесторам.",
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
        detail: "$73M ARR, $10.2B оценка. AI software engineer: все 4 patterns + Windsurf IDE",
        caseStudy: {
          mechanicInAction: "• 2023: Scott Wu, Steven Hao, Walden Yan — 3 золотых медалиста IOI — основали Cognition AI\n• Wu — дропаут Harvard, founding engineer Scale AI, CTO Lunchclub, программирует с 9 лет\n• Devin = автономный AI-инженер с песочницей (shell, редактор, браузер) — все 4 паттерна Ng\n• Reflection: анализирует ошибки, исправляет код итеративно — 67% PR мёрджатся (было 34%)\n• Tool Use: сам гуглит документацию, запускает тесты, деплоит\n• Planning: long-term reasoning, разбивает задачу на тысячи решений\n• Multi-Agent: после покупки Windsurf (IDE) — экосистема автономный агент + copilot\n• ARR: $1M (сент 2024) → $73M (июн 2025) — 73x за 9 мес. Оценка $10.2B",
          jtbd: "**Core Job:** Делегировать рутинные задачи (миграции, баги, security patches) надёжному junior-разработчику.\n\n**Trigger:** Копятся задачи, команда фокусируется на архитектуре.\n\n**Push:** Junior dev $25-50/час, долго, нужен review. AI copilot — только автокомплит.\n\n**Pull:** Автономный агент решает задачи end-to-end за $9/час, 4x быстрее.\n\n**Anxiety:** «AI сломает прод» — sandbox + plan preview + human approve merge.\n\n**Metrics:** Merge rate 67%, 4x ускорение, 2x эффективнее по ресурсам за год.",
          monetization: "**Тарифы:** От $20/мес минимум, pay-as-you-go $2.25/ACU (~$9/час). Team: $2.00/ACU (~$8/час).\n\n**ARR:** $1M (сент 2024) → $73M (июн 2025) — 73x за 9 мес. С Windsurf: ~$150M combined.\n\n**Раунды:** $21M seed (Founders Fund) → $175M Series A ($2B) → $500M ($9.8B) → $400M ($10.2B).\n\n**Unit economics:** $9/час vs junior dev $25-50/час — 3-5x дешевле.",
          marketing: "• Вирусный запуск (март 2024): видео «first AI software engineer» — миллионы просмотров\n• Снижение цены $500 → $20 (25x) — взорвало adoption\n• Case studies: Nubank (12x efficiency), EightSleep (3x output), security fixes (20x быстрее)\n• Покупка Windsurf — сотни enterprise-клиентов + IDE-канал\n• Microsoft Azure partnership\n• Annual Performance Review — прозрачность метрик как контент",
          impact: "**Для клиента:** Security vulnerability: 30 мин → 1.5 мин (20x). Миграции: месяцы → недели. Стоимость проектов: −50%. Output: 3x больше фич.\n\n**Для компании:** $1M → $73M ARR за 9 мес. Оценка $10.2B. SWE-bench: 13.86% (конкуренты max 1.96%).",
          tocConstraint: "**Ограничение:** Доверие разработчиков к автономному агенту (merge rate 67% — треть PR отклоняется).\n\n**Решение:** Публикация метрик quality, sandbox-изоляция, human-in-the-loop approve.\n\n**Куда сместилось:** Вся стратегия (покупка Windsurf, снижение цен) подчинена увеличению trust — от copilot к autonomous постепенно.",
          trizContradictions: "**ТП #1:** АВТОНОМНЫЙ (экономия) и КОНТРОЛИРУЕМЫЙ (безопасность). #35 Изменение параметров: sandbox + plan preview + human approve merge.\n\n**ТП #2:** НИЗКАЯ цена (adoption) и ВЫСОКАЯ (покрытие compute). #1 Сегментация: pay-per-ACU — платишь за работу, idle = $0.\n\n**ИКР:** Агент сам пишет, тестирует и деплоит код с нулём багов без review.",
          conditions: "**Founders:** 3 золотых медалиста IOI — competitive programming как ДНК архитектуры.\n\n**Timing:** GPT-4+ достиг уровня «надёжный junior» — до этого автономный агент невозможен.\n\n**Дефицит:** Рост зарплат разработчиков — экономический стимул для автоматизации рутины.\n\n**Capital:** $1.1B+ привлечено. ChatGPT создал хайп → инвесторы готовы вкладывать.\n\n**Культура:** DevOps + CLI — разработчики привыкли к автоматизации.",
          mvpVersion: "**Гипотеза:** Автономный AI-агент решает SWE-задачи end-to-end лучше copilot.\n\n**Эксперимент:** SWE-bench + closed beta с 10 enterprise-командами.\n\n**Метрика:** Merge rate PR (34→67%), время решения (4x), NPS инженеров.\n\n**Следующий шаг:** Покупка Windsurf для всего спектра (copilot + autonomous). Цель: 50% кода Cognition пишет Devin.",
        },
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
        detail: "2/3 чатов AI = 700 FTE. Экономия $40M/год. Гибридная модель",
        caseStudy: {
          mechanicInAction: "• 2005 — Сиемятковский, Адальберт и Якобссон основали Klarna в Стокгольме\n• 2023 — первый финтех с ChatGPT-плагином; предложила OpenAI экспериментировать на Klarna\n• Февраль 2024 — AI-ассистент на OpenAI: 2.3 млн диалогов за первый месяц, 2/3 всех обращений\n• AI обрабатывает L1 (возвраты, споры, платежи); время: 11 → 2 мин; повторные: −25%\n• 24/7 в 23 рынках, 35+ языков\n• Май 2025 — стратегический разворот: вернула людей для сложных кейсов → гибридная модель\n• Ключевое решение: не 100% AI, а освободить людей для эмпатии и judgment",
          jtbd: "**Core Job:** Решить проблему с платежом быстро и без усилий.\n\n**Trigger:** Неверный счёт, возврат, непонятный статус.\n\n**Push:** Очередь 11 мин, языковой барьер, неудобные часы.\n\n**Pull:** Мгновенно, 24/7, на родном языке.\n\n**Anxiety:** «AI не поймёт нестандартный случай» — бесшовная передача человеку.\n\n**Metrics:** Resolution time 11→2 мин, CSAT паритет, repeat −25%, cost/txn $0.32→$0.19.",
          monetization: "**Инвестиция:** $2–3 млн. **Экономия 2024:** +$40 млн. **ROI:** 13–20x.\n\nCost/transaction: $0.32 → $0.19 (−40%). Заменил 700+ (позже 853) FTE. Headcount: 5K → 3.8K.\n\nВыручка 2024: $2.81 млрд (+24% YoY). 5 кварталов операционной прибыльности.",
          marketing: "• OpenAI опубликовал Klarna как flagship кейс — бесплатный PR\n• CEO — AI-евангелист: подкасты (Sequoia, Acquired.fm), AI-клон для квартального отчёта\n• Позиционирование: «AI-first company», не финтех с AI\n• GTM: внутренняя оптимизация → внешний AI-шопинг-ассистент для 150M пользователей",
          impact: "**Для клиента:** Время: 11→2 мин. Repeat: −25%. CSAT: паритет. 35+ языков, 24/7.\n\n**Для компании:** Cost/txn: −40%. 700+ FTE → AI. Headcount: 5K→3.8K. Revenue: $2.81B (+24%).",
          tocConstraint: "**Ограничение:** Линейный рост штата (700 агентов × 23 рынка × 35 языков) — стоимость > выручки.\n\n**Решение:** AI обрабатывает 2/3 L1 автоматически; люди на сложных кейсах.\n\n**Куда сместилось:** Качество AI на edge cases; в мае 2025 вернула людей — «полностью AI» ухудшает retention.",
          trizContradictions: "**ТП #1:** Больше клиентов без роста стоимости. #1 Сегментация (L1-AI, L2-human), #10 Предварительное действие (knowledge base), #34 Отброс/регенерация (рутинные агенты → AI).\n\n**Физическое:** Дешёвая (AI) И эмпатичная (человек). #5 Объединение: гибрид с бесшовной передачей.\n\n**ИКР:** Клиент не замечает кто обслуживает — AI или человек.",
          conditions: "**Founder:** Сиемятковский — risk-taker (иммигрант, Burger King → $46B финтех).\n\n**Timing:** ChatGPT ноя 2022 → Klarna за 2 мес стала первым партнёром OpenAI.\n\n**Capital:** $2–3M AI при $2.8B выручке — risk ~0, потенциал $40M.\n\n**Scale:** 150M пользователей, 2.3M обращений/мес — данные для обучения.\n\n**Культура:** ML-модели для андеррайтинга ещё до ChatGPT.",
          mvpVersion: "**Гипотеза:** AI закрывает >50% L1-тикетов с CSAT не хуже людей.\n\n**Эксперимент:** GPT-4 + 100 тикетов из истории + knowledge base. Blind review: агент оценивает AI vs свои ответы.\n\n**Метрика:** Accuracy ≥85%, CSAT ≥4.0/5.0, response <30 сек.\n\n**Следующий шаг:** Shadow mode 5% трафика → замер repeat inquiry rate.",
        },
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

  // ── CATEGORY: content-media ──────────────────────────────────────
  {
    id: "ai-content-machine",
    title: "AI Content Machine",
    category: "content-media",
    author: "Alex Hormozi, Greg Isenberg, Multiple",
    summary:
      "1 anchor content → AI → 10+ форматов + lead gen + marketing на автопилоте",
    whatIsIt:
      "Полный цикл AI-контента: создай ценный anchor content (видео, deep-dive, гайд), AI разбивает на десятки форматов (social, email, shorts, карусели), привлекает leads через value, AI автоматически nurtures и converts. Content creation + distribution + lead gen в одном pipeline.",
    howItWorks: [
      "Создай anchor content (видео, longread, вебинар, гайд)",
      "AI извлекает ключевые идеи, генерирует 10+ форматов",
      "Распространи через SEO + social + email",
      "Собери leads через value exchange (email за гайд/report)",
      "AI nurtures, A/B тестирует, квалифицирует и бронирует calls",
    ],
    keyInsight:
      "Hormozi: «Давай так много value бесплатно, что люди чувствуют себя обязанными заплатить». Agencies: $5-15K/мес за managed pipeline, себестоимость $500-1K, маржа 80-90%. Но: чистый AI-контент деградирует. Winning = AI production + human curation + creativity.",
    examples: [
      {
        company: "Hormozi content machine",
        detail: "1 видео → 20+ clips, posts, emails. 3.9M YouTube → leads для Acquisition.com",
      },
      {
        company: "HubSpot",
        detail: "$2.6B+ ARR. Free tools + education → leads. Классика content-first",
      },
      {
        company: "Opus Clip",
        detail: "AI нарезает длинные видео на вирусные shorts",
      },
      {
        company: "Late Checkout (Greg Isenberg)",
        detail: "Автоматизирует маркетинг для портфеля стартапов. Podcast → leads",
      },
      {
        company: "AI content agencies",
        detail: "$5-15K/мес. 10x output, 80% меньше costs",
      },
      {
        company: "Swell AI, Blotato",
        detail: "Repurpose контент в 10+ форматов, адаптирует под платформу",
      },
    ],
    unitboxApplication:
      "Один deep-dive о проекте → AI: 10 Instagram, Telegram updates, emails, YouTube shorts. Бесплатный Bali RE market report → email capture → AI nurture → demo каталога → close. Каждый проект = контент-актив.",
    icon: "Newspaper",
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
