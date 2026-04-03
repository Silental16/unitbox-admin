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
        company: "Bolt.new (StackBlitz)",
        detail: "$0→$40M ARR за 5 мес. Full-stack apps из AI-разговора за минуты. 5M регистраций",
        caseStudy: {
          mechanicInAction: "• Октябрь 2024: один твит Eric Simons без маркетинга → $0→$4M ARR за 30 дней → $40M за 5 мес\n• 5M регистраций, ~1M DAU. Series B $105.5M, оценка ~$700M\n• 4 года строили WebContainers (Node.js в браузере через WebAssembly) — killer tech без PMF\n• StackBlitz имел $80K ARR — были в неделях от закрытия. Bolt перевернул всё\n• WebContainers + LLM = AI контролирует файловую систему, npm, сервер, терминал в браузере\n• Eric Simons и Albert Pai из Чикаго, кодят с 13 лет. Simons жил в офисе AOL 4 месяца",
          jtbd: "**Core Job:** Превратить идею в работающее веб-приложение за минуты без знания фреймворков.\n\n**Сегменты:** Non-coder с идеей, разработчик-прототипист, фрилансер/агентство.\n\n**Trigger:** «Хочу показать прототип инвестору/клиенту завтра».\n\n**Push:** create-react-app 3 часа. Figma → разработчику → недели.\n\n**Pull:** Описал → получил работающее приложение. Zero install — всё в браузере.",
          monetization: "**Тарифы:** Free 300K токенов/день. Pro $20/мес (10M токенов). Enterprise custom.\n\n**ARR:** $0 → $4M (30 дн) → $20M (2 мес) → $40M (5 мес). Прогноз $100M к концу 2025.\n\n**Unit economics:** LLM API < $20/юзер. WebContainers = zero server compute (sandbox в браузере клиента). Bolt Cloud — hosting + DB как доп. revenue.",
          marketing: "• Один твит, $0 на рекламу. «Я сделал app за 5 мин» = идеальный виральный контент\n• PLG: бесплатный tier → wow за 2 мин → Pro\n• Open source на GitHub → доверие + контрибьюторы\n• «From near-death to $40M ARR» = PR-магнит (Lenny's Podcast, Indie Hackers)\n• Каждый созданный проект = демонстрация продукта",
          impact: "**Для клиента:** От идеи до working app: недели → минуты. Стоимость прототипа: $5-50K → $2-50.\n\n**Для компании:** Спас StackBlitz от смерти ($80K → $40M ARR). Создал категорию «AI app builder». Доказал что non-coders = огромный TAM для dev tools.",
          tocConstraint: "**Ограничение (до Bolt):** WebContainers — прорыв без PMF. Разработчикам хватало локальных IDE.\n\n**Решение:** Сменить клиента — вместо разработчиков продавать non-coders. LLM = катализатор.\n\n**Куда сместилось:** Качество генерации — сложные приложения ломаются, токены сжигаются на отладку.",
          trizContradictions: "**ТП #1:** Сложный full-stack, но юзер не знает код. #24 Посредник: AI + WebContainers скрывают инфраструктуру.\n\n**ТП #2:** Sandbox изолированный, но полный доступ к npm/Node.js. #2 Вынесение: WebAssembly — Node.js В браузере, не на сервере.\n\n**Физическое:** LLM универсальный (любой стек) И специализированный (best practices). #1 Сегментация: выбор модели + system prompts per stack.",
          conditions: "**Tech readiness:** WebContainers (4 года R&D) + зрелые LLM — оба сошлись.\n\n**Vibe coding тренд:** 2024-2025 — массовый интерес к AI-генерации.\n\n**Неудовлетворённый спрос:** Миллионы non-coders с идеями.\n\n**Предсмертный опыт:** $80K ARR → готовы рискнуть всем.\n\n**Zero friction:** Браузер, ничего устанавливать.",
          mvpVersion: "**Гипотеза:** Non-coders заплатят за AI full-stack builder в браузере.\n\n**Эксперимент:** WebContainers + LLM API + минимальный UI. Один твит на существующую аудиторию.\n\n**Метрика:** $4M ARR за 30 дней (реальность Bolt).\n\n**Для Unitbox:** Дать девелоперам собрать landing page проекта за 30 мин из данных каталога.",
        },
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
        detail: "AI обучен на $31M консалтинга 1026+ бизнесов. $3K initiation + $299/мес",
        caseStudy: {
          mechanicInAction: "• Формула: Value = (Dream Outcome × Likelihood) ÷ (Time × Effort). AI оптимизирует все 4 одновременно\n• ACQ AI натренирован на приватных плейбуках — 80% данных из реального консалтинга 1026+ компаний, не из книг\n• За одну сессию: полный Grand Slam Offer — ценообразование, гарантии, позиционирование, бонусы, risk reversal\n• Отличие от «загрузить книгу в ChatGPT»: implementation, не information — конкретные шаги под твой бизнес\n• Портфель Acquisition.com: 15+ компаний, $200-250M совокупной выручки\n• $100M Offers — 100K+ копий за первую неделю. 3.87M YouTube подписчиков",
          jtbd: "**Core Job:** Собрать неотразимый оффер для бизнеса $1-10M чтобы клиент не мог отказать.\n\n**Push:** Консультанты $500-1000/час дают теорию. ChatGPT даёт generic советы.\n\n**Pull:** $31M реального опыта за $299/мес. Готовые артефакты (скрипты, модели, воронки) за минуты.\n\n**Consumption Chain:** YouTube 3.87M → книги $100M Offers → ACQ AI $3K + $299/мес → ACQ Vantage $1K/мес.",
          monetization: "**Тарифы:** ACQ AI: $3K initiation + $299/мес. ACQ Vantage: $1K/мес (community + AI + workshops).\n\n845 участников Vantage ≈ ~$10M ARR. CAC ≈ $0 (контент-маркетинг). Gross margin ~85-90%.\n\nПортфель: $200-250M годовой выручки. Net worth ~$100-200M.",
          marketing: "• Content-led + community-led. $0 на paid ads\n• YouTube 3.87M, 880M+ просмотров. Книги-бестселлеры\n• Skool community. Referral: 2 реферала = бесплатная подписка\n• Каждый piece of content → воронка в ACQ AI/Vantage",
          impact: "**Для клиента:** Оффер: 2-4 недели → 1 день. Консалтинг: $15-50K → $299-1K/мес. Скрипт: trial & error → готовый за минуты.\n\n**Для компании:** 2016 $0 → 2021 $46.2M exit → 2026 портфель $250M+. YouTube 0 → 3.87M.",
          tocConstraint: "**Ограничение:** Масштабирование экспертизы — физически не могут консультировать >50-100 бизнесов.\n\n**Решение:** ACQ AI — один инструмент обслуживает 845+ одновременно. Capacity: ~100 → неограниченно.\n\n**Куда сместилось:** Качество AI ответов. Не заменяет live diagnostic session.",
          trizContradictions: "**ТП #1:** Персонализация ↑, масштабируемость ↓. #26 Копирование: клонирование экспертизы в AI из 1026 реальных кейсов.\n\n**Физическое:** Знания открытые (привлечение) И закрытые (монетизация). 20% в книгах/YouTube, 80% $31M data в ACQ AI.\n\n**Приёмы:** #10 Предварительное действие (10 лет данных ДО создания AI), #1 Сегментация (бесплатное/платное).",
          conditions: "**Founder:** Hormozi — 10+ лет hands-on, $31M документированного консалтинга. Без этого объёма BYOA невозможен.\n\n**Timing:** 2025 — массовое LLM. Предприниматели разочаровались в generic ChatGPT.\n\n**Capital:** Минимальные — аудитория = бесплатная дистрибуция. $46.2M от exit.",
          mvpVersion: "**Гипотеза:** Предприниматели $1-10M заплатят за AI с реальным консалтинговым опытом.\n\n**Эксперимент:** Custom GPT на 20-50 лучших документов/ответов клиентам. 5-10 клиентам бесплатно на неделю.\n\n**Метрика:** 6+ из 10 говорят «значительно полезнее generic AI» И 3+ готовы платить.\n\n**Следующий шаг:** Лендинг + Stripe, 50 платящих $99-299/мес.",
        },
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
        detail: "$310M+ ARR, $5B оценка. Программатический SEO: страница под каждую из 7000+ интеграций",
        caseStudy: {
          mechanicInAction: "• Zapier автоматически генерирует лендинг для КАЖДОЙ пары из 7000+ приложений = миллионы уникальных страниц\n• 3 уровня: страница приложения → страница пары (Gmail+Slack) → конкретный workflow\n• Каждая таргетирует long-tail запрос «как связать X и Y» — захват в момент осознания проблемы\n• Контент частично от партнёров при onboarding → масштаб без редакции\n• 9M+ органических визитов/мес\n• $310M ARR (2024) при всего $1.4M привлечённых инвестиций — практически bootstrapped\n• Wade Foster искал запросы на форумах вручную → предлагал решение через Skype (первые 10 клиентов)",
          jtbd: "**Core Job:** Автоматизировать связку SaaS без кода за 5 минут.\n\n**Trigger:** Гуглит «как связать X и Y» → попадает на программатическую страницу → видит готовое решение.\n\n**Push:** Ручной перенос данных между инструментами забирает часы.\n\n**Pull:** Один клик — данные текут. 7000+ приложений.\n\n**Anxiety:** «А если сломается?» — 99.9% uptime, логи, уведомления.\n\n**Metrics:** 100K+ платных клиентов, 2.2M+ пользователей.",
          monetization: "**Тарифы:** Free (100 задач/мес) → Starter $19.99 → Professional $49 → Team $69 → Company $99.\n\n**Revenue:** $140M (2021) → $250M (2023) → $310M (2024) → ~$400M (2025 прогноз).\n\n**Фандинг:** Всего $1.4M (YC + Bessemer, 2012). Ratio ARR/funding = 100x — уровень Atlassian. Оценка ~$5B. 100K+ платных клиентов.",
          marketing: "• Programmatic SEO: шаблон + данные из БД = миллионы long-tail страниц. Внутренняя перелинковка\n• Forum seeding (ранний этап): Wade Foster вручную на форумах Zendesk, QuickBooks\n• Partner-Generated Content: партнёр заполняет описание при onboarding → масштаб без редакции\n• Блог (editorial SEO) — параллельный канал с how-to\n• Remote-first с 2012 → экономия → реинвестиция в продукт",
          impact: "**Для клиента:** Ручная связка: часы → 5 мин. 7000+ приложений в одном месте.\n\n**Для компании:** 9M+ органических визитов/мес. $310M ARR при $1.4M инвестиций. $5B оценка. SEO playbook скопировали HubSpot, Airtable, Notion.",
          tocConstraint: "**Ограничение:** Количество интеграций = количество SEO-страниц = трафик.\n\n**Решение:** Self-serve onboarding для разработчиков → взрывной рост каталога → страниц → трафика.\n\n**Куда сместилось:** Commoditization интеграций (Make, n8n) + AI-агенты могут убрать необходимость в «связках» → Zapier запустил AI agents.",
          trizContradictions: "**ТП #1:** Миллионы уникальных страниц (масштаб) vs невозможно написать вручную. #26 Копирование + #6 Универсальность: шаблон + данные из БД = программатическая генерация.\n\n**ТП #2:** Качественный контент vs нет редакторов на миллионы. #24 Посредник: партнёры сами описывают при onboarding.\n\n**ИКР:** Каждая новая интеграция = бесплатная SEO-страница = бесплатная реклама.",
          conditions: "**Комбинаторный каталог:** N×M сущностей (7000 приложений) = миллионы страниц.\n\n**Long-tail intent:** Пользователи ищут «X + Y integration» в Google.\n\n**Self-serve партнёры:** Каталог растёт без ручного труда.\n\n**Freemium:** SEO приводит холодный трафик → бесплатный вход.\n\n**Bootstrapped DNA:** $1.4M → $310M ARR = capital efficiency.",
          mvpVersion: "**Гипотеза:** Программатические страницы для каждой пары интеграций привлекут organic трафик.\n\n**Для Unitbox:** Страницы /projects/{location}/{type} и /compare/{A}-vs-{B}. 400+ проектов × зоны × типы.\n\n**Метрика:** 10K органических визитов/мес через 6 мес после 500+ программатических страниц.\n\n**Следующий шаг:** Фильтрованные лендинги /villas/canggu/under-200k — программатика по зоне × тип × бюджет.",
        },
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
        detail: "$100M ARR, $3.1B оценка. Spreadsheet + 150 data providers + AI-агент Claygent",
        caseStudy: {
          mechanicInAction: "• 2017 — Kareem Amin и Nicolae Rusan основали Clay с идеей «демократизировать программирование» через spreadsheet + API\n• 2017–2022 — 6 лет итераций: терминал, фронтенд-билдер, затем pivot на spreadsheet с 75+ data-провайдерами для sales-команд\n• 2021 — Varun Anand присоединился как co-founder и переключил GTM на product-led growth\n• 2022 — закрыли Intercom, перевели поддержку в публичный Slack (20K+ участников) — стал главным каналом роста\n• 2023 — запуск Claygent (AI-агент на GPT-4), ресёрчит компании как живой SDR в 100x быстрее\n• 2024 — рост с $10M до $30M+ ARR, 10x год к году; 300K+ GTM-команд\n• Середина 2025 — $100M ARR, 10 000 клиентов, $3.1B оценка (Sequoia, CapitalG)\n• Credit-based модель: каждый enrichment/AI-запрос тратит кредиты, revenue масштабируется с usage",
          jtbd: "**Core Job:** Найти и обогатить идеальных лидов данными из 150+ источников для персонализированного outbound без ручной работы.\n\n**Trigger:** SDR тратит 40+ часов/мес на ручной ресёрч; конверсия холодных писем <1%.\n\n**Push:** Разрозненные инструменты (LinkedIn, ZoomInfo, Hunter) не интегрируются; данные устаревают.\n\n**Pull:** Один spreadsheet объединяет enrichment + intent signals + AI-персонализацию + отправку.\n\n**Anxiety:** «Сложно настроить» — reverse trial 14 дней + Slack-community с peer-to-peer обучением.\n\n**Consumption Chain:** Import ICP → waterfall enrichment (150+ провайдеров) → AI scoring → Claygent ресёрч → email → CRM sync.\n\n**Metrics:** Экономия 40 ч/мес (Oyster), покрытие данных 40→80% (OpenAI), 10 встреч/день вместо 1-2 (ServiceBell), бюджет на данные −65% (IntroCRM).",
          monetization: "**Тарифы:** Free: 100 кредитов/мес. Starter: $149/мес — 2K кредитов. Explorer: $349/мес — 10K. Pro: $800/мес — 25K. Enterprise: custom.\n\n**ARR:** $1M (2022) → $10M (2023) → $30M (начало 2025) → $100M (середина 2025) — 10x/год два года подряд.\n\n**Оценка:** $1.25B (Series B) → $3.1B (Series C, авг 2025). 10K платящих клиентов. SaaS + usage-based, negative churn.",
          marketing: "• PLG + reverse trial 14 дней без карты\n• Slack-community 20K+ — peer-to-peer обучение = виральный канал\n• Первые клиенты: 30 экспертов из Modern Sales Pros → cold email агентства = идеальный ICP\n• LinkedIn creators: армия евангелистов публикует tutorials\n• Партнёрская программа: агентства строят workflows, увеличивая credit consumption\n• Clay University + case studies (OpenAI, Rippling, Oyster)",
          impact: "**Для клиента:** Ресёрч лида: 30-45 мин → 30 сек. Покрытие данных: 40% → 80%. Время на enrichment: 40 ч/мес → ~0. Встречи: 1-2/день → 10. Бюджет на data: −65%.\n\n**Для компании:** $1M → $100M ARR за 3 года. 0 → 10K клиентов. Оценка $3.1B.",
          tocConstraint: "**Ограничение:** SDR тратит 80% времени на сбор данных вместо продаж — throughput ограничен скоростью ресёрча.\n\n**Решение:** Waterfall enrichment из 150+ провайдеров + Claygent автоматизируют 95% ресёрча.\n\n**Куда сместилось:** Качество ICP-фильтрации и персонализации (решается AI scoring + dynamic templates).",
          trizContradictions: "**ТП #1:** Данные должны быть ПОЛНЫМИ и ДЕШЁВЫМИ. Приём #5 Объединение + #24 Посредник: waterfall enrichment — цепочка провайдеров, останавливается на первом успешном.\n\n**ТП #2:** Outbound должен быть ПЕРСОНАЛЬНЫМ и МАССОВЫМ. Приём #28 Замена механической системы + #15 Динамичность: Claygent ресёрчит индивидуально за секунды.\n\n**ИКР:** Каждое письмо уникально при отправке тысяч в день.",
          conditions: "**Founder fit:** Kareem Amin — data/marketing automation (Sailthru acquisition); Nicolae Rusan — deep technical; Varun Anand — GTM-pivot.\n\n**Timing:** 2022–2023 — GPT/LLM сделали AI-enrichment реальностью; Clay был готов.\n\n**6 лет терпения:** итерации 2017–2022 без PMF; founders выдержали.\n\n**Капитал:** $62M → интеграции с 150+ провайдерами = moat.\n\n**Экосистема:** Slack 20K + агентства = network effect.",
          mvpVersion: "**Гипотеза:** SDR готовы платить за AI-обогащение лидов в spreadsheet-интерфейсе.\n\n**Эксперимент:** Google Sheet + Apps Script + 3 trial API (Hunter, Apollo, Clearbit) для waterfall enrichment. 10 SDR-ам бесплатно, список из 100 лидов.\n\n**Метрика:** ≥5 из 10 возвращаются; coverage >60% vs текущие 30-40%.\n\n**Следующий шаг:** AI-персонализация писем + credit-based billing + 10+ провайдеров.",
        },
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
        company: "Pieter Levels (Building in Public)",
        detail: "600K+ followers. $3.1M ARR. Open Startup дашборд. CAC ≈ $0 через прозрачность",
        caseStudy: {
          mechanicInAction: "• Пионер Building in Public с 2014. Скриншоты Stripe с MRR, revenue в био Twitter, Open Startup дашборд\n• Каждый milestone = вирусный пост. Посты об ошибках и убитых проектах = engagement\n• Рост с 350K до 600K+ followers за 2 года (при запуске PhotoAI)\n• CAC ≈ $0 — весь трафик органический. Каждый запуск = мгновенная аудитория\n• $3.1M ARR портфель, ~$250K/мес. Nomad List $5.3M revenue за 2024\n• Тактики: Stripe screenshots, MRR в био, Open Startup™, livestream кодинг, user testimonials",
          jtbd: "**Core Job (фаундер):** Получить бесплатную дистрибуцию без маркетингового бюджета.\n\n**Механизм:** Прозрачность → доверие → community moat → покупки «чтобы поддержать».\n\n**3 эффекта:** (1) Реальные цифры > маркетинг. (2) Аудитория эмоционально инвестирована. (3) Revenue-посты виралятся как proof of concept.",
          monetization: "**Прямая:** $3.1M ARR. PhotoAI $132K/мес, Nomad List $38K, RemoteOK $35-41K, InteriorAI $38-45K.\n\n**Косвенная:** $0 на маркетинг. 600K followers = бесплатная дистрибуция для каждого нового продукта.\n\n**Flywheel:** Прозрачность → followers → запуск → revenue → скриншот → followers.",
          marketing: "• Stripe screenshots при каждом milestone\n• MRR в bio Twitter — постоянный social proof\n• Open Startup™ — публичный live-дашборд\n• Посты об ошибках и убитых проектах\n• Livestream кодинг — аудитория видит продукт до запуска\n• Подкасты (Lex Fridman) — «герой-нарратив» одиночки",
          impact: "**До:** Нет аудитории, нет бюджета. **После:** 600K+ followers, $3.1M ARR, CAC ≈ $0.\n\nОт побочного проекта до $1M ARR за 5 лет (2014-2019), затем экспоненциальный рост. Создал движение — тысячи фаундеров копируют подход.",
          tocConstraint: "**Ограничение:** Дистрибуция для solo-фаундера без бюджета.\n\n**Решение:** Процесс разработки = контент. Каждое действие (фича, ошибка, рост) → единица контента с встроенным social proof.\n\n**Куда сместилось:** Насыщение — к 2025 тысячи копируют, сложнее выделиться. Нужен genuinely interesting product + story.",
          trizContradictions: "**ТП #1:** Время на маркетинг vs Время на продукт. Разрешение: Build in Public = маркетинг IS процесс разработки. Нет разделения.\n\n**ТП #2:** Открытость (привлекает) vs Копирование (конкуренты видят revenue). Принятие риска: community moat > information moat.\n\n**ИКР:** Дистрибуция — побочный продукт работы, не отдельная статья расходов.",
          conditions: "**Работает:** Продукт для tech-аудитории (Twitter). Solo/small team. Фаундер готов к радикальной прозрачности.\n\n**НЕ работает:** B2B enterprise (длинный цикл). Аудитория не на Twitter. Survivorship bias — успешные затмевают тысячи безрезультатных. Контрпримеры: PopClip, OrbStack — прибыльны без BIP.",
          mvpVersion: "**Гипотеза:** Прозрачность revenue + процесса создаёт organic audience.\n\n**Эксперимент:** Публикуй Stripe screenshots + процесс 30 дней. Twitter + один дополнительный канал.\n\n**Метрика:** 1K+ followers за 30 дней, 2+ inbound запроса.\n\n**Для Unitbox:** Публикация метрик каталога (проекты, юниты, синки), behind-the-scenes AI-заполнения, open roadmap в Telegram/LinkedIn.",
        },
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
        company: "Wiz",
        detail: "Fastest to $100M ARR (18 мес), $32B acquisition by Google. Идеальный PATHS alignment",
        caseStudy: {
          mechanicInAction: "• Самый быстрый SaaS до $100M ARR (18 мес) и $1B ARR (4 года)\n• PATHS alignment:\n  P: Cloud security фрагментирована — 10+ точечных инструментов, CISO тонут в алертах\n  A: Fortune 500 CISO с бюджетом $2-10M. 50%+ Fortune 100 — клиенты\n  T: COVID ускорил cloud migration на 3-5 лет, security отстал\n  H: Agentless API-коннектор — подключение за минуты. Security Graph\n  S: Мультиоблако (AWS+Azure+GCP) = весь enterprise TAM\n• 4 сооснователя из Unit 8200, знают друг друга с 2001. Предыдущий exit: Adallom → Microsoft ($320M)\n• $32B acquisition by Google (2025) — крупнейшая покупка израильской tech-компании",
          jtbd: "**Core Job:** Видеть и устранять все критические cloud-риски чтобы двигаться быстро без страха взлома.\n\n**Functional:** Единая карта рисков вместо 10 дашбордов. Приоритизация по контексту.\n\n**Emotional:** CISO спит спокойно — 50% клиентов в «Zero Criticals Club».\n\n**Social:** CISO показывает board единый граф рисков и прогресс.",
          monetization: "**Enterprise SaaS:** ACV $100K-$1M+.\n\n**ARR:** $100M (18 мес) → $350M (Feb 2024) → $750M (Mar 2025) → $1B+ (2026).\n\n**Agentless = низкая стоимость деплоя, NRR >150%. Land: CSPM → Expand: полный CNAPP.\n\n**Exit:** $32B cash (Google) — ~32x ARR.",
          marketing: "• P-lens: GTM через боль CISO — «вы не видите облачные риски»\n• T-lens: Каждый breach в новостях = лид\n• H-lens: Демо за 5 мин — подключил API, увидел все дыры. PLG для enterprise (редкость)\n• Reference: 50%+ Fortune 100. Gartner Customers' Choice 2 года. Forrester Wave Leader",
          impact: "**Масштаб:** 50%+ Fortune 100. $100M ARR за 18 мес (рекорд). $32B exit.\n\n**Качество:** 50% клиентов в Zero Criticals Club. Создали категорию CNAPP.\n\n**Команда:** ~2900 сотрудников к 2025.",
          tocConstraint: "**Ограничение:** Visibility gap — security-команды НЕ ВИДЯТ что в облаке. Agent-based = долго, неполное покрытие.\n\n**Решение:** Agentless API-сканирование → 100% покрытие за минуты. Security Graph → контекстная приоритизация.\n\n**Куда сместилось:** AI CNAPP — следующий цикл автоматизации.",
          trizContradictions: "**ТП #1:** Глубина сканирования vs Скорость подключения. API snapshot-сканирование (#24 Посредник + #26 Копирование): читает snapshot дисков через cloud API.\n\n**ТП #2:** Полнота покрытия vs Нагрузка на инфру. #2 Вынесение: agentless = нулевая нагрузка при 100%.\n\n**Физическое:** Внутри инфры (чтобы видеть) И Снаружи (не создавать risk surface). API read-only permissions.",
          conditions: "**Team:** 4 основателя из Unit 8200, предыдущий exit $320M. Rappaport руководил R&D Microsoft Israel.\n\n**Timing:** COVID ускорил cloud на 3-5 лет. Бюджеты +30-40% YoY. SolarWinds/Log4j усилили urgency.\n\n**Tech shift:** On-prem → multicloud = новая attack surface, старые инструменты не покрывают.\n\n**Capital:** $100M Series A out of stealth → мгновенный найм → скорость → winner-take-most.",
          mvpVersion: "**MVP (дек 2020):** Agentless коннектор к AWS/Azure. За 5 мин показывает все misconfigurations и уязвимости.\n\n**ONE THING:** Подключись и увидь всё. Время до value = минуты, не недели.\n\n**PATHS-валидация:** P (боль видна при демо), A (CISO сразу понимает), T (все мигрируют сейчас), H (agentless = no friction), S (multicloud = весь TAM).",
        },
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
        company: "Jasper AI (cautionary tale)",
        detail: "$80M→$35M ARR. Generic AI wrapper commoditized после ChatGPT. Pivot в enterprise",
        caseStudy: {
          mechanicInAction: "• 80/20 паттерн: агентство $15-30K/мес → Jasper заменил 80% работы за $49-149/мес (0.5% стоимости)\n• Dave Rogenmoser, JP Morgan, Chris Hull — 8 лет пивотов до GPT-3 (YC, 2020). За 7 дней сделали фронтенд к API\n• $80M ARR за 18 мес, оценка $1.5B, 100K клиентов\n• ПОУЧИТЕЛЬНАЯ ИСТОРИЯ: после ChatGPT (ноя 2022) generic AI-копирайтинг = commodity. Revenue: $80M → $35M (−56%)\n• Pivot в enterprise: Brand Voice, AI-агенты, workflows. К 2025-2026: ~$88M, но CEO ушёл\n• Урок: обёртка над чужой моделью без defensibility уязвима",
          jtbd: "**Core Job:** Производить маркетинговый контент в объёме, недоступном команде людей.\n\n**Chain:** 50+ шаблонов (email, landing, ad) → заполнить поля → AI генерирует 3-5 вариантов за секунды → Brand Voice = тон бренда → маркетолог редактирует 20%.\n\n**Trigger:** «50 вариаций объявлений к завтра, 1 копирайтер».\n\n**Клиенты:** Airbnb, Logitech, Google, Spotify — 50K+ команд.",
          monetization: "**Тарифы:** Creator $49/мес. Pro $149/мес. Business $899/мес. Enterprise custom.\n\n**Пик:** $80M ARR / 100K клиентов = ~$67/мес ARPU. Маржа: GPT-3 оптом → 10-20x markup.\n\n**Fundraising:** $131M total, оценка $1.5B (окт 2022).\n\n**Падение:** $80M → $35M после ChatGPT. К 2025: ~$88M через enterprise pivot.",
          marketing: "• Affiliate 30% recurring → армия блогеров/YouTube\n• Facebook-группа 70K+ участников\n• SEO о 'AI copywriting' (dogfooding)\n• Шаблоны как viral hook: каждый новый шаблон = новая аудитория\n• Ребрендинг Jarvis → Jasper (письмо Marvel) — обернули в PR\n• Enterprise pivot 2023: 4x рост enterprise ARR",
          impact: "**Рост:** $0 → $80M ARR за 18 мес. Unicorn за 18 мес. 100K клиентов.\n\n**Экономия:** $15-30K агентство → $149/мес = 99%. «50 вариаций за 30 мин вместо недели».\n\n**Падение:** $80M → $35M. CEO ушёл. Массовые увольнения.\n\n**Урок:** 80/20 wrapper без моата = временное преимущество.",
          tocConstraint: "**Фаза 1:** Ограничение = awareness (люди не знали что AI пишет). Решение: affiliate + community.\n\n**Фаза 2:** Ограничение = quality/trust. Решение: Brand Voice + шаблоны.\n\n**Фаза 3:** Ограничение = defensibility. ChatGPT = бесплатный generic AI. Jasper = «платная обёртка над бесплатным».\n\n**Pivot:** От «AI пишет текст» → «AI marketing OS» (агенты, workflows, analytics).",
          trizContradictions: "**ТП #1:** Контент уникальный для бренда vs генерируется общей моделью. #3 Местное качество: Brand Voice обучается на контенте бренда.\n\n**ТП #2:** Много вариаций vs каждая качественная. #1 Дробление: 50 специализированных шаблонов вместо «напиши текст».\n\n**Нерешённое ФП:** Дифференцирован от ChatGPT И зависим от тех же LLM. Separation in structure (Brand Voice, templates) оказался недостаточным.",
          conditions: "**Работает 80/20:** Процесс >$5K/мес. 80% шаблонная работа. 20% реально требует человека. Time-to-value <5 мин.\n\n**НЕ работает (урок Jasper):** AI-слой тонкий → commodity risk. Нет proprietary data → клонируют за недели. Underlying model бесплатна → ценность wrapper → 0.\n\n**Защита:** Глубокая интеграция в workflow (Brand Voice, team collab, analytics).",
          mvpVersion: "**MVP Jasper (7 дней, янв 2021):** Простой UI поверх GPT-3 API. 5-10 шаблонов. Stripe $29/мес. Запуск на тёплую аудиторию курсов.\n\n**Результат:** $1M ARR за 3 мес.\n\n**Формула:** (1) найти дорогой процесс, (2) шаблонный UI над LLM, (3) тёплая аудитория, (4) retention 30 дней.\n\n**Урок:** MVP валидировал спрос, но не построили moat пока было время.",
        },
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
