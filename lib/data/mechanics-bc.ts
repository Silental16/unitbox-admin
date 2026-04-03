export const mechanicsBC: any[] = [
  // ── CATEGORY B: building-launch ──────────────────────────────────────
  {
    id: "rapid-shipping",
    title: "Rapid Shipping",
    category: "building-launch",
    author: "Marc Lou, Pieter Levels",
    summary:
      "Weekend MVP → Launch Monday → Kill or Iterate. Portfolio approach = 1-2 winners из десятков попыток",
    whatIsIt:
      "Философия максимальной скорости: построй MVP за выходные (или за месяц), запусти, замерь traction, убей или удвой. Marc Lou делает $1M+/год на портфеле микро-продуктов. Pieter Levels запустил 70+ проектов — выжили NomadList, RemoteOK, PhotoAI. Если не стыдно за первую версию — запустил поздно.",
    howItWorks: [
      "Выбери идею, построй MVP через boilerplate + AI за weekend (или месяц)",
      "Landing + Stripe + core feature — ничего лишнего",
      "Запуск: Product Hunt, Twitter, community",
      "Нет traction за 7-30 дней → kill. Есть → double down",
      "Portfolio approach: 10 мёртвых + 1-2 работающих = success",
    ],
    keyInsight:
      "Marc Lou: $1,032,000 в 2025 на 4 продуктах, 95% маржа, solo. Pieter Levels: 70+ проектов, 3-4 приносят $3-5M/год, 0 сотрудников. PhotoAI запущен как грубый прототип — сейчас $138K/мес. Перфекционизм = смерть. 95% запланированных фич никогда не понадобятся. Success rate ~3-5%, но каждый успех оправдывает все провалы.",
    examples: [
      {
        company: "Marc Lou portfolio",
        detail: "$85K/мес на 4 продуктах, ~95% margins. ShipFast, TrustMRR, CodeFast, DataFast",
      },
      {
        company: "Pieter Levels",
        detail: "70+ проектов, 3-4 приносят $3-5M/год. 0 сотрудников. NomadList начался как Google Sheet",
      },
      {
        company: "Danny Postma",
        detail: "Headlime → $20K MRR → продал за $1M. Потом HeadshotPro → $3.6M ARR",
      },
      {
        company: "Sahil Lavingia (Gumroad)",
        detail: "Множество проектов до Gumroad. $10M+ revenue, 1 сотрудник",
      },
      {
        company: "Stripe",
        detail: "Первая версия — 7 строк кода. Сейчас $95B",
      },
      {
        company: "YC trend",
        detail: "Solo founders: 23.7% (2019) → 36.3% (2025)",
      },
    ],
    unitboxApplication:
      "Weekend MVP для тестов: AI property report, Bali investment calculator, developer CRM, AI-консьерж для покупателей — каждый как weekend project. Запусти как простого Telegram-бота, не жди идеального UI.",
    icon: "Rocket",
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
    id: "ai-pricing-revolution",
    title: "AI Pricing Revolution",
    category: "sales-distribution",
    author: "Sarah Guo, Gartner, Replit, Multiple",
    summary:
      "Per-seat SaaS умирает. Outcome, usage, AI-employee, credits — новые модели ценообразования",
    whatIsIt:
      "Per-seat pricing ломается когда AI-агент заменяет 3 сотрудников. Новые модели атакуют со всех сторон: outcome-based (плати за результат), usage-based (плати за потребление), AI-employee ($3-5K/мес за виртуального работника), open core + cloud, flexible credits. Sarah Guo: «Лучшие AI-компании не продают AI — они продают outcomes». Gartner: 40% SaaS перейдёт к usage/outcome к 2030.",
    howItWorks: [
      "Определи unit of value (resolution, лид, API call, документ)",
      "Per-outcome: $X за результат (Sierra $0.99/resolution, Intercom Fin)",
      "Usage-based: $X за потребление (Snowflake, Replit — effort-based)",
      "AI-employee: $3-5K/мес за виртуального работника (11x, Artisan)",
      "Hybrid: base subscription + usage/outcome overage (92% AI компаний)",
    ],
    keyInsight:
      "Outcome pricing поддерживает $500-5000/мес. API-access — $20/мес. Разница 25-250x за тот же AI. Replit: $2M → $253M ARR за год на usage-based — 90x рост одной сменой модели. Ребрендинг AI из tool в employee = 100x pricing. Per-seat SaaS $50/мес → AI virtual worker $3-5K/мес.",
    examples: [
      {
        company: "Sierra",
        detail: "$4B+ оценка. Charges per resolution. RaaS model",
      },
      {
        company: "Intercom Fin",
        detail: "$0.99/resolution. Pure outcome pricing",
        caseStudy: {
          mechanicInAction: "Intercom совершила радикальный поворот к outcome-based pricing через AI-агента Fin. Fin заряжает $0.99 за успешный \"outcome\" (резолюцию). Клиент платит ТОЛЬКО за результат.\n\nПараллельно per-seat pricing для human agents: Essential ($29/мес), Advanced ($85/мес), Expert ($132/мес). Гибридная модель.\n\nFin вырос с $1M до $100M+ ARR менее чем за 2 года. При общем ARR ~$400M, Fin уже ~25% выручки.\n\nFin доступен на платформах конкурентов (Zendesk, Salesforce) через fin.ai. Гарантия производительности до $1M.",
          jtbd: "**Core Job:** Мгновенно решать проблемы клиентов 24/7 без увеличения штата.\n\n**Switching Trigger:** CSAT падает, время ответа растёт, руководство давит на сокращение headcount.\n\n**Push:** Per-seat: 2x клиентов = 2x агентов = 2x расходов. Pull: $0.99 за решённую проблему. Resolution rate 66%, топовые 80%+.\n\n**Anxiety:** \"AI будет галлюцинировать\" — гарантия до $1M + деньги только за подтверждённые резолюции.",
          monetization: "**Тарифы:** Essential $29/seat, Advanced $85/seat, Expert $132/seat + Fin $0.99/outcome.\n\n**Revenue:** $400M+ ARR (2026). Fin ~$100M ARR. 30,000+ клиентов, 7,000+ на Fin. Fin решает 1M+ запросов/неделю.\n\n**Почему работает:** Outcome-based — forcing function для качества. Intercom зарабатывает только когда Fin решает проблему → выравнивание incentives.",
          marketing: "**GTM:** Гибрид PLG + enterprise sales. 14-дневный trial, Fin включён во все планы. Case studies с метриками (Lightspeed 65%, Anthropic 50.8%). Fin.ai как standalone бренд для пользователей конкурентов.\n\n**Первые клиенты (2011):** Ирландская tech-тусовка. Biz Stone (Twitter) — ранний инвестор.",
          impact: "**Для клиента:** AI resolution 50-80%. Время ответа: 2-24ч → мгновенно. Стоимость тикета: $5-15 → $0.99. Lightspeed: +31% закрытий/день. Databox: +40% revenue.\n\n**Для компании:** 2023 $275M ARR (10% рост, стагнация) → 2024 $343M (25%, AI reacceleration) → 2026 $400M+. Fin: $1M → $100M ARR за 2 года.",
          tocConstraint: "**Ограничение:** Пропускная способность человеческих агентов (~30-50 тикетов/день). Fin AI Agent — фундаментальное расширение capacity: неограниченное количество тикетов параллельно, 24/7.\n\n**Куда сместилось:** Качество knowledge base. Fin решает только то, что покрыто документацией. Далее: AI, который сам обучается из резолюций.",
          trizContradictions: "**ТП #1:** Скорость ответа ↑, точность ↓ (галлюцинации). Решение: проприетарный RAG с тройной фильтрацией (retrieval → reranking → generation).\n\n**ТП #2:** Автоматизация ↑, revenue от per-seat ↓. Решение: гибридная модель — per-seat для платформы + outcome-based сверху. Revenue не каннибализируется.\n\n**Физическое:** Дешёвый для клиента И прибыльный для Intercom. $0.99 в 5-15x дешевле человека, но при 1M+ резолюций/неделю = $100M+ ARR. #17 Переход в другое измерение.",
          conditions: "**Founders:** Eoghan McCabe и команда — 13 лет в customer messaging. Продали Exceptional → Rackspace.\n\n**Market timing:** GPT-4 (2023) + 30,000 клиентов + миллиарды разговоров как training data. Zendesk медленнее из-за legacy.\n\n**Capital:** $240M+ до Fin. $250M debt round (март 2026).",
          mvpVersion: "**Эксперимент:** Определить measurable outcome в своём домене. Предложить 10 клиентам две опции: (A) $99/мес фиксированно, (B) $X за outcome. Измерить выбор и willingness to pay.\n\n**Метрика:** >60% выбирают outcome-based; средний чек >= фиксированной через 30 дней; NPS > 50.",
        },
      },
      {
        company: "Snowflake",
        detail: "$2.8B+ revenue. Usage-based gold standard",
        caseStudy: {
          mechanicInAction: "Snowflake построил бизнес на $4.68B revenue вокруг одного решения: разделение compute и storage на три слоя. Это сделало usage-based pricing технически возможным.\n\nКлюч — Virtual Warehouses (изолированные кластеры, billing посекундный), принципиальный отказ от per-seat модели. Когда весь рынок продавал лицензии, Snowflake сказал: платите только за потреблённые вычисления.\n\nОснована 2012, первый релиз 2014, IPO сентябрь 2020 ($3.4B — крупнейшее софтверное IPO).",
          jtbd: "**Core Job:** Запустить аналитику на петабайтах за минуты без provisioning.\n\n**Emotional Job:** Контроль над расходами — не бояться запустить тяжёлый запрос.\n\n**Switching Trigger:** CFO видит счёт за Redshift/Teradata, где 80% мощности простаивает.\n\n**Push:** On-prem DWH $500K-2M/год + DBA-команда. Pull: per-second billing, auto-suspend, масштабирование за 30 секунд.",
          monetization: "**Тарифы:** Standard ~$2.00/credit, Enterprise ~$3.00, Business Critical ~$4.00. Storage $23-40/TB/мес. Billing посекундный.\n\n**Revenue:** $4.68B FY2026 (рост 29%). NRR 126-128%. 580 клиентов с >$1M/год. Gross margin 67%. Market cap ~$70B.\n\n**Почему работает:** NRR 127% = даже без новых клиентов revenue +27%/год. Клиент начинает с $10K, через год $100K, потом $1M+.",
          marketing: "**GTM:** PLG + enterprise sales. Free trial 30 дней, $400 credits. Cloud Marketplaces (AWS/Azure/GCP). Partner ecosystem (Deloitte, Accenture, dbt, Fivetran).\n\nData Sharing network effect: если A шарит данные с B через Snowflake, B тоже должен быть на Snowflake.\n\n**Первые клиенты:** Personal network из Oracle world. Компании, страдавшие от Teradata/Oracle стоимости.",
          impact: "**Для клиента:** Стоимость DWH: $500K-2M → $50-200K/год. Provisioning: 2-4 недели → 30 секунд. Утилизация: 20-30% → ~100%. DBA: 3-5 FTE → 0.5-1.\n\n**Для компании:** FY2020 $265M → FY2023 $2.07B → FY2026 $4.68B. 580 → ~700 клиентов >$1M. Команда: ~500 → 7,000+.",
          tocConstraint: "**Ограничение:** Utilization rate — клиент платил 24/7 при реальной загрузке 4 часа/день. Exploit: auto-suspend/auto-resume, result caching.\n\n**Elevate:** Data Marketplace + Cortex AI (ML/LLM в SQL) — новые use cases = больше compute consumption.\n\n**Куда сместилось:** Data gravity и vendor lock-in. Ответ: Apache Iceberg support. Конкуренция с Databricks за AI/ML workloads.",
          trizContradictions: "**ТП #1:** Производительность ↑, стоимость ↑ пропорционально. Решение: warehouses разных размеров — клиент сам выбирает скорость/цена. #1 Сегментация.\n\n**Физическое:** Данные должны быть общими (единая версия) И изолированными (запросы не влияют друг на друга). Решение: единый storage, раздельные compute warehouses. #2 Вынесение.\n\n**Приёмы:** #10 Result caching (хранятся 24ч), #26 Zero-copy cloning без физического дублирования.\n\n**ИКР:** Data warehouse, которого нет — стоимость = 0 при отсутствии запросов, бесконечная масштабируемость, zero admin.",
          conditions: "**Founders:** Dageville и Cruanes — 15+ лет в Oracle. Żukowski — создатель Vectorwise. Deep-tech инженеры за 40.\n\n**Market timing:** 2012 — AWS зрелый, cloud-native DWH не существует. 2 года раньше — AWS сырой. 2 года позже — Redshift укрепился бы.\n\n**Capital:** $1.4B+ до IPO. 2-3 года R&D до первого платящего клиента. Высокий барьер входа.",
          mvpVersion: "**Эксперимент:** Добавить metered billing (Stripe Meters/Lago) к существующему продукту. Две landing pages: фиксированный прайс vs usage-based. A/B тест 50/50.\n\n**Метрика:** Usage-based signup rate +20%+, средний revenue за 30 дней не падает.\n\n**Следующий шаг:** Commitment tiers (предоплата со скидкой), resource monitors, dashboard потребления.",
        },
      },
      {
        company: "Replit",
        detail: "$2.8M → $253M ARR за год. Effort-based pricing = 90x рост",
        caseStudy: {
          mechanicInAction: "Replit применила радикальный переход от подписки к usage-based pricing. До конца 2024 — Hacker Plan $7/мес, ~$2.8M ARR. В сентябре 2024 запустили Replit Agent — AI-агент для создания приложений по описанию.\n\nВместо flat-rate: effort-based pricing — оплата за фактическую работу агента. Простые задачи ~$0.06-0.25 за checkpoint, сложные — несколько долларов. Подписка ($20-40/мес) даёт кредиты, перерасход — pay-as-you-go.\n\nМодель AWS/Stripe: чем больше строишь, тем больше платишь.\n\nTimeline: 2016 основание → 2022 $2.8M ARR → сентябрь 2024 Agent → октябрь 2025 $253M ARR (~90x за год) → март 2026 оценка $9B.",
          jtbd: "**Core Job:** Превратить идею приложения в работающий продукт без программистов за часы.\n\n**Switching Trigger:** Видит, как Agent за 30 минут создаёт рабочее приложение. Один пользователь: \"$2,000/год заменил за $2.40 и 20 минут.\"\n\n**Push:** Фрилансер $50-150/час, 2-4 недели на MVP. No-code ограничен. Pull: говоришь → получаешь код. Стоимость пропорциональна усилию.",
          monetization: "**Тиры:** Starter $0, Core $20/мес ($25 кредитов), Pro $100/мес, Teams $40/user/мес, Enterprise custom.\n\nUsage: checkpoint $0.06 — несколько $. ARPU вырос с $2-5/мес до $140/мес.\n\n**Revenue:** $2.8M (2022) → $16M (конец 2024) → $253M (октябрь 2025). Цель $1B к концу 2026. 30M+ пользователей. Оценка $9B.",
          marketing: "**GTM:** Bottom-up PLG + community-led growth. 30M+ пользователей = UGC → SEO. Creator marketing (Passionfroot, $300K+ бюджет). Viral demos в Twitter/X. 2,500 members инвестировали через краудфандинг.\n\n**Первые клиенты:** Open-source JSRepl (2011) → 750K органических к 2016. Enterprise — inbound после вирусных видео.",
          impact: "**Для клиента:** Время MVP: 2-4 недели → 30-60 минут. Стоимость прототипа: $5,000-50,000 → $2-50. Zinus: 1.5 мес вместо 3, экономия $140,000+.\n\n**Для компании:** ~90x рост ARR за 12 месяцев. Оценка: $1.16B (2022) → $3B (2025) → $9B (2026). Привлечено $650M за 6 месяцев.",
          tocConstraint: "**Ограничение:** ARPU ceiling — flat-rate $7/мес при 30M пользователей и <1% конверсии = $2.8M ARR. Ограничение НЕ количество пользователей, а неспособность монетизировать потребление.\n\n**Elevate:** Effort-based pricing полностью снял потолок ARPU. Одна смена модели → 90x рост.\n\n**Куда сместилось:** Стоимость inference (GPU). 80% gross margin на Enterprise, ~50-60% на individual.",
          trizContradictions: "**ТП #1:** Доступность ↑, доход ↓. Бесплатно для масс → не зарабатываешь. Решение: usage-based — вход бесплатный, платишь за потребление. #1 Сегментация на микротранзакции.\n\n**Физическое:** Простой (для non-coders) И мощный (для developers). Решение: Multi-agent — manager на естественном языке (простота), editor agents пишут production-код (мощность). #5 Объединение.\n\n**Приёмы:** #7 Матрёшка (подписка → кредиты → checkpoints → inference calls), #10 Предварительное действие (auto-commit перед каждым шагом агента).",
          conditions: "**Founder:** Amjad Masad — Facebook (JS infrastructure) + Codecademy. Вырос в Аммане, кодил в интернет-кафе. 4 отказа от Y Combinator. 8 лет строительства платформы.\n\n**Market timing:** LLM production-quality code generation (GPT-4, Claude 3.5) в 2024. Раньше — AI-код слишком плохой. Позже — рынок занят.\n\n**Network effects:** Community 30M = UGC → SEO → новые пользователи. Cold start: бесплатный IDE + образование.",
          mvpVersion: "**Эксперимент:** Взять SaaS с AI-функциями. Для 50% — usage-based (кредиты за AI-запросы). Для остальных — подписка. Stripe Metered Billing + middleware.\n\n**Метрика:** ARPU usage-based > 3x подписочной. Retention не ниже 80%. Churn не вырос.\n\n**Следующий шаг:** Мигрировать всех AI-users на hybrid (подписка + usage credits). Tiered credit packs. Enterprise с committed spend.",
        },
      },
      {
        company: "AI SDR services",
        detail: "$50 за meeting vs $200-500 через SDR человека",
      },
      {
        company: "11x.ai",
        detail: "$3-5K/мес AI SDR. Employee pricing = 100x premium",
      },
    ],
    unitboxApplication:
      "От fixed fee → outcome: $X за qualified lead из каталога, или usage: $X за обновлённый юнит при sync. Align: Unitbox зарабатывает когда девелопер зарабатывает.",
    icon: "BadgeDollarSign",
  },
  {
    id: "ai-outbound-machine",
    title: "AI Outbound Machine",
    category: "sales-distribution",
    author: "Clay.com ecosystem",
    summary:
      "Data enrichment → AI personalization → Multi-channel sequences (email + LinkedIn + voice)",
    whatIsIt:
      "Полный цикл AI outbound: Clay.com обогащает данные о prospects через 75+ providers, AI персонализирует messages, multi-channel delivery через email + LinkedIn + voice (Vapi/Bland) в одной AI-управляемой sequence. AI адаптирует message и channel на основе response patterns.",
    howItWorks: [
      "Clay.com обогащает данные о prospects (75+ data providers)",
      "AI пишет персонализированные first lines",
      "Day 1: AI-personalized email → Day 3: LinkedIn connection → Day 5: follow-up → Day 7: AI voice call",
      "AI анализирует responses, adjusts sequence и channel",
      "Smart follow-ups на автопилоте, quality > quantity",
    ],
    keyInsight:
      "Компании делают 3-5x больше qualified meetings с AI outbound. Multi-channel outreach: 3-5x response rate vs single-channel. Cost per meeting: $50-100 vs $200-500 традиционно. Voice AI (Vapi) добавляет human touch на масштабе. 10 personalized touches > 100 generic.",
    examples: [
      {
        company: "Clay.com",
        detail: "Spreadsheet + 75 data providers + AI. Центр AI outbound",
      },
      {
        company: "Clay + Instantly + Vapi stack",
        detail: "Full multi-channel: data enrichment → email → LinkedIn → voice. 3-5x response",
      },
      {
        company: "Instantly.ai",
        detail: "AI email outreach at scale. Тысячи agencies используют",
      },
      {
        company: "11x, Artisan",
        detail: "AI SDR companies: полный multi-channel на автопилоте",
      },
      {
        company: "Real estate lead gen",
        detail: "Email + WhatsApp + call sequence для property investors",
      },
    ],
    unitboxApplication:
      "AI outreach к новым девелоперам: Clay enriches data → AI персонализирует → email с market data → LinkedIn comment → WhatsApp с demo → Vapi call для qualification.",
    icon: "Mail",
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
];
