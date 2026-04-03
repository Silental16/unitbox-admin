export const mechanicsFGH: any[] = [
  // === CATEGORY: moats-defense (4 items) ===
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
        caseStudy: {
          mechanicInAction: "Zillow построил проприетарный data moat через Zestimate — алгоритм оценки стоимости недвижимости, покрывающий 104+ миллионов домов в США. Запущен 8 февраля 2006 года.\n\nКлючевые решения: neural network (2017), computer vision для анализа фото, Zillow Prize ($1M конкурс на Kaggle). Источники данных: county/tax records, MLS фиды, пользовательские данные за 20 лет.\n\nОтказались от iBuying (Zillow Offers) в 2021 после убытка ~$881M — алгоритм не заменяет рыночную экспертизу для ПОКУПКИ, но работает для ОЦЕНКИ.",
          jtbd: "**Core Functional Job:** Мгновенно узнать реальную стоимость дома для принятия решений на данных, а не интуиции агента.\n\n**Switching Trigger:** \"Сколько это стоит на самом деле?\" — до Zillow единственный путь: позвонить агенту или appraisal ($300-500).\n\n**Consumption Chain:** Discovery (увидел дом) → Evaluation (Zestimate) → Adoption (мониторит цены) → Expansion (агент, ипотека через Zillow) → Referral (\"проверь свой Zestimate\" — вирусный loop).",
          monetization: "**Model:** Гибрид рекламы (Share of Voice) + marketplace (лидогенерация) + SaaS.\n\nPremier Agent — основной доход ($2B+): агент покупает долю показов в ZIP-коде. Auction-based. Средняя стоимость лида: $223 (крупные метро), $139 (не-метро).\n\n**Revenue 2025:** $2.6B (+16% YoY). Adjusted EBITDA: $622M (24%). Первый прибыльный год (GAAP).",
          marketing: "**GTM:** PLG через вирусный контент (Zestimate) + B2B enterprise sales (Premier Agent). SEO: доминирование по \"[адрес] value\" — ~60% трафика. PR-launch: серверы упали в день запуска от \"Узнай стоимость любого дома бесплатно\".\n\nRich Barton использовал playbook Expedia: дать потребителю информацию, которую контролируют посредники.",
          impact: "**Для покупателя:** Узнать стоимость: $300-500 и 3-5 дней → бесплатно за 2 секунды. Информационная асимметрия → паритет.\n\n**Для компании:** 2006: ~$0 → 2011 IPO: $66M → 2015 (Trulia): $846M → 2025: $2.6B, 228M уникальных посещений/мес, ~$18B market cap. Redfin приобретён Rocket Companies за $1.75B в 2025.",
          tocConstraint: "**Ограничение:** Информационная асимметрия — покупатели не знали реальную стоимость. Exploit: агрегация публичных данных. Elevate: добавили проприетарные слои (поведенческие данные, computer vision, neural network).\n\n**Куда сместилось:** От информации → к транзакции. Zillow двигается к \"housing super app\": ShowingTime+, Zillow Home Loans.",
          trizContradictions: "**Физическое противоречие:** Zestimate должен быть точным (доверие) И неточным (агенты остаются нужны). Решение: \"starting point\", median error 2.4-7.5%.\n\n**Приёмы:** #10 Предварительное действие (Zestimate рассчитан ДО запроса для 104M домов), #26 Копирование (Zillow Prize — crowd-sourced улучшение), #25 Самообслуживание (пользователи сами обновляют данные о доме).\n\n**ИКР:** Дом сам знает свою цену. Вся транзакция на платформе без посредников.",
          conditions: "**Founder:** Rich Barton — основатель Expedia. Playbook: информация от посредников → потребителю. Lloyd Frink — co-founder Expedia.\n\n**Market timing (2006):** Broadband, пузырь недвижимости, Google Maps API (2005), оцифровка county records.\n\n**Network effects:** Data network effect: больше пользователей → точнее Zestimate → больше пользователей. Cross-side: покупатели → агенты платят → листинги → покупатели.",
          mvpVersion: "**Для Bali контекста:** Собрать данные о 200-300 объектах с 5+ сайтов. Построить price/sqm модель по зонам. Лендинг: \"Узнай справедливую цену виллы в Bali\". Запустить на 100 потенциальных покупателей.\n\n**Метрика:** >30% вводят данные, >10% оставляют контакт, >5 делятся ссылкой.\n\n**Следующий шаг:** Интегрировать в Unitbox как \"Unitbox Estimate\" для каждого проекта.",
        },
      },
      {
        company: "Bloomberg Terminal",
        detail: "$10B+ revenue. Данных нет больше нигде",
        caseStudy: {
          mechanicInAction: "Bloomberg Terminal -- это не просто софт для финансовых данных. Это закрытая экосистема проприетарных данных, которые физически не существуют за пределами терминала. Основан в 1981 году Michael Bloomberg после увольнения из Salomon Brothers, на $10M выходного пособия.\n\n**Ключевые стратегические решения:**\n- Сбор и агрегация данных по облигациям (fixed income), где до Bloomberg не было единого источника цен и ликвидности. Именно рынок бондов -- не акций -- стал первой точкой входа\n- Встроенная messaging-система Instant Bloomberg (IB) -- превратила терминал из справочника в торговую площадку. OTC-сделки буквально заключаются через IB-чат\n- Собственная симвология FIGI -- 700M+ инструментов с проприетарной схемой идентификации\n- Приобретение Second Measure (данные по транзакциям потребителей), New Energy Finance, альтернативные данные (контейнерные перевозки, геополитические риски, ESG)\n- Merrill Lynch стала первым клиентом (1982) -- купила 20 терминалов + 30% компании за $30M\n\n**Что решили НЕ делать:** не пошли в розницу, не давали API без подписки на терминал, не продавали данные по частям, не делали freemium. Всё или ничего -- $32K/год.\n\n**Timeline:** 1981 основание → 1982 первый терминал → 1986 переименование в Bloomberg LP → 1990 запуск Bloomberg News → 1991: 10,000 терминалов → 2023: 325,000+ подписчиков, $12.5B выручка.",
          jtbd: "**Core Functional Job:** \"Когда я работаю с портфелем в real-time, хочу мгновенный доступ к ценам, аналитике и контрагентам в одном окне, чтобы принимать торговые решения быстрее конкурентов.\"\n\n**Emotional Job:** Чувствовать себя \"в клубе\" -- терминал Bloomberg это статус-символ на Wall Street.\n\n**Switching Trigger:** Момент, когда трейдер или аналитик впервые не может найти бонд или связаться с контрагентом через другой инструмент.\n\n**Push (от старого):** Фрагментация данных -- без Bloomberg крупный фонд вынужден работать с десятками нишевых провайдеров.\n\n**Pull (к новому):** Один интерфейс = данные + аналитика + новости + чат + торговля. 325,000 профессионалов в одной сети.\n\n**Consumption Chain:** Университет (бесплатные терминалы) → Стажировка → Первая работа → Карьерный рост → Рекомендация на уровне департамента.",
          monetization: "**Pricing model:** Фиксированная подписка per seat, без usage-based компонента.\n\n**Тарифы (2026):** 1 терминал: $31,980/год. 2-4: $28,320/seat/год. Минимум 2-летний контракт.\n\n**Revenue scale:** $12.5B (2023). Терминал = 85% выручки ≈ $10.6B. При 325,000 подписчиках средний revenue per seat ≈ $32,600.\n\nLTV одного seat ≈ $300K+ (средний клиент остаётся 10+ лет, churn <5%).",
          marketing: "**GTM motion:** Top-down enterprise sales + media-led brand building. Bloomberg News и Bloomberg TV как воронка. Академическая программа: бесплатные терминалы в 350+ университетах. IB-чат создаёт давление на контрагентов — если ваш dealer на Bloomberg, вам нужен Bloomberg.\n\n**Первые 10 клиентов:** Merrill Lynch (1982) -- прямая продажа через личные связи Michael Bloomberg с Wall Street.",
          impact: "**Для клиента:** Источники данных: 10-30 провайдеров → 1 терминал. Время на поиск цены бонда: минуты-часы → секунды. Покрытие: 700M+ инструментов через FIGI.\n\n**Для компании:** 1982: 20 терминалов → 1991: 10,000 → 2023: 325,000+, $12.5B выручки. Michael Bloomberg's net worth: ~$100B+ (88% владения).",
          tocConstraint: "**Системное ограничение:** Доступ к ценам fixed income инструментов. Облигации торгуются OTC -- нет единого источника цен. Bloomberg агрегировал bond pricing в реальном времени, затем превратил терминал из справочника в торговую площадку через IB-чат.\n\n**Куда сместилось:** После захвата fixed income → equities и alternative data. Bloomberg покупает alt data providers (Second Measure, New Energy Finance).",
          trizContradictions: "**Физическое противоречие:** Данные должны быть одновременно открытыми (привлечение) И закрытыми (моат). Решение: headline открыт, deep data закрыт.\n\n**Приёмы:** #5 Объединение (данные + чат + торговля + новости = один терминал), #7 Матрёшка (IB-чат вложен в терминал, торговля в чат), #10 Предварительное действие (университеты формируют привычку ДО покупки).\n\n**ИКР:** Финансовый профессионал получает все данные и контрагентов мгновенно без переключения систем.",
          conditions: "**Founder:** Michael Bloomberg -- 15 лет на bond trading desk Salomon Brothers. $10M выходного пособия = стартовый капитал.\n\n**Market timing:** Начало 1980-х -- компьютеризация финансов. Bond market $40T+, технологически отсталый.\n\n**Network effects:** Merrill Lynch -- якорный клиент. IB-чат: каждый новый подписчик делает сеть ценнее. К 10,000 терминалов сеть стала самоподдерживающейся.",
          mvpVersion: "**Гипотеза:** Если собрать проприетарные данные в узкой нише, которые не доступны в открытых источниках, клиенты будут платить premium и не смогут легко уйти.\n\n**Эксперимент:** Собрать данные из 20-50 источников вручную, предложить 5-10 профессионалам бесплатный доступ на 2 недели.\n\n**Метрика успеха:** 3 из 10 спрашивают \"когда обновление?\" в первую неделю. Хотя бы 1 готов платить $50-200/мес.",
        },
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
        detail: "$3.13B revenue, 288K клиентов. Моат = 7K статей + Academy + 6K партнёров, не технология CRM",
        caseStudy: {
          mechanicInAction: "• 2006: Brian Halligan и Dharmesh Shah (MIT) заметили — покупатели игнорируют cold-calls, но жадно потребляют контент\n• Придумали термин «inbound marketing» — притягивай клиента контентом, не проталкивай рекламу\n• Блог 7K+ статей → 1.5M просмотров/мес → бесплатные инструменты (Website Grader) → воронка в CRM\n• Бесплатный CRM (2014) как троянский конь: $0 вход → привыкание → upsell в Marketing/Sales/Service Hub\n• Topic Cluster SEO: доминирование по тысячам ключевых слов\n• Технология (CRM) — commodity; дистрибуция (7K статей + SEO + 288K клиентов + Academy) — настоящий moat\n• $3.13B revenue (2025, +19% YoY), net new ARR +24%",
          jtbd: "**Core Job:** Генерировать поток лидов без enterprise-бюджета на рекламу.\n\n**Trigger:** Outbound дорожает, CAC растёт, cold email не работает.\n\n**Push:** 5-7 отдельных SaaS (Mailchimp + WordPress + Salesforce), данные разрозненны, 40% времени на интеграции.\n\n**Pull:** Всё-в-одном от первого визита до закрытой сделки. Inbound-лиды на 62% дешевле outbound.\n\n**Anxiety:** «Сложно мигрировать» — бесплатный CRM + Academy обучают постепенно.\n\n**Metrics:** CAC −62%, время на отчётность с дней до минут, 288K клиентов.",
          monetization: "**Тарифы:** Free CRM $0. Starter $20/seat/мес. Professional $890/мес (Marketing Hub). Enterprise $3,600/мес.\n\n**Revenue:** $3.13B (2025, +19% YoY). Guidance 2026: $3.69-3.70B. 288K+ клиентов, +40K net new за 2025.\n\nASRPC $11,683/квартал (Q4 2025). Core Seats + Credits — новая модель для AI-фич.",
          marketing: "• Создание категории: термин «inbound marketing» + книга (2009) + конференция INBOUND (10K+)\n• SEO-машина: 7K+ статей, topic clusters, доминирование по «marketing», «CRM», «sales»\n• Бесплатные инструменты как top-of-funnel: Website Grader (4.5M оценок), Make My Persona\n• HubSpot Academy: 100K+ выпускников → hiring signal → lock-in через обученных сотрудников\n• 6K+ агентств-партнёров продают HubSpot клиентам — армия бесплатных продавцов",
          impact: "**Для клиента:** CAC −62%. Инструментов: 5-7 → 1. Время на отчётность: дни → минуты.\n\n**Для компании:** $3.13B revenue (2025). 288K клиентов. Academy 100K+ выпускников. 6K партнёров. Conference 10K+.",
          tocConstraint: "**Ограничение:** Не технология (CRM можно скопировать за $2M), а ДИСТРИБУЦИЯ — доступ к вниманию SMB.\n\n**Решение:** Каждая фича = повод для статьи, каждый инструмент собирает лидов. Academy + Partners расширяют канал.\n\n**Куда сместилось:** AI-монетизация (Core Seats + Credits) и борьба с AI-native CRM конкурентами.",
          trizContradictions: "**ТП #1:** Охват (миллионы) vs Качество (только квалифицированные). #1 Сегментация: Topic Clusters делят контент на awareness/consideration/decision + Lead Scoring.\n\n**ТП #2:** Бесплатность (для привлечения) vs Монетизация. Разделение во времени: Free CRM сейчас → лимиты при масштабировании → естественный переход на платный.\n\n**ИКР:** Продукт сам себя продаёт через контент, клиенты обучаются в Academy, платят по мере роста.",
          conditions: "**Founders:** Brian Halligan + Dharmesh Shah (MIT). Halligan — sales background, Shah — developer + blogger.\n\n**Timing:** 2006 — outbound умирает, Google SEO растёт, SMB ищут альтернативу холодным звонкам.\n\n**Категория:** Придумали «inbound marketing» — не конкурировали в существующей, а создали новую.\n\n**Экосистема:** 6K+ партнёров + Academy = самоусиливающийся flywheel.\n\n**Moat:** 7K статей + SEO-позиции невозможно скопировать за год.",
          mvpVersion: "**Гипотеза:** Бесплатный инструмент + SEO-контент дают лидов дешевле $5 без рекламы.\n\n**Эксперимент:** 1 калькулятор/грейдер + 10 SEO-статей (pillar + clusters) за 30 дней. Форма email в инструменте.\n\n**Метрика:** 1K уникальных/мес через органику, 50+ email-подписок, CAC < $5.\n\n**Следующий шаг:** 5 инструментов + 50 статей + email-nurture → замер конверсии email→trial→paid.",
        },
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
        caseStudy: {
          mechanicInAction: "Rippling -- классический compound startup. Parker Conrad заложил единый \"employee graph\" — граф данных сотрудника, на котором строятся ВСЕ продукты. К 2025 году 30+ продуктов: HR, Payroll, Benefits, IT, Device, App, Expense Management, Corporate Cards, Global Payroll (150+ стран).\n\n\"Hub\" команда строит общие примитивы, автономные продуктовые команды строят модули поверх. Каждый новый продукт достигает $1M ARR за 5-6 месяцев.\n\nTimeline: 2016 основание → 2018 запуск → 2020 $115M ARR → 2023 $350M ARR → 2025 $570M ARR при $16.8B.",
          jtbd: "**Core Job:** ONE click при найме → автоматически payroll, benefits, Slack/Gmail, ноутбук, security policies.\n\n**Switching Trigger:** Компания растёт 50→200, количество point solutions (Gusto + BambooHR + Jamf + Expensify + Brex) неуправляемо. Данные рассинхронизируются, offboarding забывают в 3 из 7 систем.\n\n**Outcome:** Время onboarding: 3 дня → 90 секунд. Системы: 7-12 → 1. Payroll admin: 14 часов → <1 час (-93%).",
          monetization: "**Model:** Модульная подписка. HRIS $8/emp/мес + $35 platform fee. Payroll $35/emp/мес. Типичный стек $15-25/emp/мес, полный $30-50+.\n\nNRR: 130%. Cross-sell: >$5M/month net new. Client retention: 99.5%. $570M ARR, 20,000+ клиентов.",
          marketing: "**GTM:** Outbound-first (150 SDRs, 1,300 demos/month, >50% revenue). Cross-sell $5M+/month.\n\nMini-CRO структура: для каждого нового продукта dedicated leader. CFO/HR переходя в новые компании переносят Rippling. Parker Conrad использовал сеть из Zenefits.",
          impact: "**Для клиента:** Onboarding 3 дня → 90 сек. Payroll admin -93%. Системы 7-12 → 1. Offboarding: ~60% → 100% automated.\n\n**Для компании:** 2018 ~$5M → 2020 $115M → 2023 $350M → 2025 $570M ARR. Оценка $16.8B → $20.8B. 10+ продуктов с >$1M ARR каждый.",
          tocConstraint: "**Ограничение:** Разрозненность данных о сотрудниках по 7-12 системам. Conrad пережил это в Zenefits: каждый продукт строился как отдельный silo.\n\n**Exploit:** Employee graph как foundation ПЕРЕД любыми продуктами. 2 года stealth mode на архитектуру shared data layer.\n\n**Куда сместилось:** Cognitive load sales team — при 30+ продуктах один rep не может знать все → specialized selling teams.",
          trizContradictions: "**ТП #1:** Ширина линейки ↑, глубина ↓. Решение: shared primitives дают 80% функциональности \"бесплатно\", инженеры фокусируются на domain-specific 20%.\n\n**Физическое:** Одновременно простой (для SMB с 20 людьми) И сложный (для enterprise с 2,000 в 30 странах). Решение: модульная архитектура — клиент видит ТОЛЬКО купленные модули.\n\n**Приёмы:** #5 Объединение (12 систем → единая платформа), #6 Универсальность (один employee record triggers 20+ actions), #10 Предварительное действие (2 года stealth на shared primitives ДО запуска).",
          conditions: "**Founder:** Parker Conrad прожил весь цикл в Zenefits (0 → $4.5B → вынужденная отставка). Лично видел, почему одна вертикаль упирается без unified data layer.\n\n**Market timing:** 2016-2018 — пост-SaaS unbundling, компании на 7-12 point solutions. Remote work (2020+) ускорил спрос.\n\n**Capital:** $45M на 2 года stealth. Compound startup требует больше начального капитала, но экономика лучше на каждом новом продукте. Всего $1.4B+.",
          mvpVersion: "**Эксперимент:** Google Sheet как employee graph + Zapier automations: при добавлении строки → автоматически создать аккаунты в 3 SaaS (Slack, Gmail, Notion). Измерить экономию для 5 компаний на 20-100 человек.\n\n**Метрика:** HR manager говорит \"готов платить\" и экономия >2 часов/неделю.\n\n**Следующий шаг:** Заменить Google Sheet на реальный data layer. Добавить второй модуль (offboarding). Если cross-module value > sum of parts — compound model работает.",
        },
      },
      {
        company: "Ramp",
        detail: "Карты → расходы → bill pay → закупки → travel",
        caseStudy: {
          mechanicInAction: "Ramp запустился в феврале 2020 с корпоративных карт — троянский конь: бесплатная карта захватывала транзакционные данные, которые питали всю экосистему. Каждый свайп генерировал данные для AI-категоризации.\n\nПоследовательность rebundling: карты (2020) → expense management → bill pay (2021) → procurement (2022) → travel (2023) → treasury (2024) → AI agents (2025).\n\nНЕ делали: rewards-программу как Brex, банкинг, HR/payroll.",
          jtbd: "**Core Job:** Видеть и контролировать каждый доллар в реальном времени, тратить меньше и закрывать месяц быстрее.\n\n**Switching Trigger:** Конец квартала — 3+ дня на сверку, 15% не сдали expense reports. Обнаружение дублирующейся подписки на $5,000/мес.\n\n**Outcome:** AI автокатегоризация 90%+. Средняя экономия 3.5%. Одна платформа вместо 5.",
          monetization: "**Model:** Freemium + SaaS + interchange. Free: безлимитные карты, базовый expense. Plus $15/user/мес. Enterprise custom.\n\nInterchange ~1.5-2% от транзакций покрывает free tier. ARR >$1B (сентябрь 2025), рост 54% YoY. $100B+ покупок/год. 50,000+ клиентов. Оценка $32B.",
          marketing: "**GTM:** PLG (бесплатная регистрация) + outbound sales. Cold email — основной канал, 30 дней до клиента. SEO по long-tail financial запросам. Brex-to-Ramp migration campaigns.\n\n**Первые 10:** 40-50 влиятельных фаундеров-инвесторов стали первыми пользователями и евангелистами. Forrester TEI: 503% ROI.",
          impact: "**Для клиента:** Expense reports: 5-8 ч/мес → ~0. Закрытие месяца: 5-10 дней → 1-2. Экономия 3.5%. ROI 503% за 3 года. Barry's: 400 ч/мес экономии.\n\n**Для компании:** 2020 запуск → 2023 $300M ARR → сентябрь 2025 >$1B ARR. Positive free cash flow. Оценка $32B. 50,000+ клиентов.",
          tocConstraint: "**Ограничение:** Spend visibility — 50-70% расходов \"тёмные\". CFO не знает кто, за что и зачем платит. Каждая транзакция по карте стала мгновенной точкой данных.\n\n**Куда сместилось:** Принятие решений на данных → forecasting и scenario planning. Отсюда treasury management и predictive analytics.",
          trizContradictions: "**ТП #1:** Полнота функционала ↑, простота ↓. Решение: модульные add-ons, каждый подключается отдельно.\n\n**ТП #2:** Цена ↓ (бесплатно), доход должен ↑. Решение: interchange покрывает free tier. Чем больше тратит клиент — тем больше зарабатывает Ramp.\n\n**Физическое:** Простой (сотрудники без обучения) И мощный (enterprise-grade аналитика). Два interface layer.\n\n**Приёмы:** #1 Сегментация, #5 Объединение (card+expense+AP в единый data layer), #26 Копирование (виртуальные карты — unlimited копий).",
          conditions: "**Founders:** Glyman и Atiyeh создали Paribus (exit в Capital One). 2+ года внутри Capital One — знание банковской инфраструктуры.\n\n**Market timing:** 2019-2020. Brex доказал модель. COVID ускорил цифровизацию. Marqeta API — запуск карт без банковской лицензии.\n\n**Capital:** >$1.6B привлечено. Interchange в США 1.5-2% (в Европе 0.3% cap — модель бы не работала).",
          mvpVersion: "**Эксперимент:** Подключить 5-10 компаний через Plaid API. Агрегировать транзакции + подписки. Вручную с ChatGPT категоризировать и найти переплаты. Отправить PDF-отчёт: \"3 места, где вы теряете деньги\".\n\n**Метрика:** 3 из 5 хотят регулярный отчёт. Хотя бы 1 экономит >$500.\n\n**Следующий шаг:** Автоматизировать сбор данных. Тестировать готовность платить $50-200/мес.",
        },
      },
      {
        company: "Deel",
        detail:
          "$0 → $500M+ ARR за ~4 года. Платежи → payroll → HR → иммиграция",
      },
      {
        company: "Toast",
        detail: "$6.15B выручки, 164K ресторанов. POS → payroll → marketing → lending",
        caseStudy: {
          mechanicInAction: "Toast -- compound startup в ресторанной индустрии. Вошёл через POS -- центральный нервный узел ресторана -- и последовательно добавлял модули: онлайн-заказы, маркетинг, payroll ($90/мес + $9/сотрудник), аналитику, Toast Capital (кредитование), дебетовые карты.\n\nКлючевые решения: только рестораны (не horizontal как Square), собственное железо для кухонь, embedded payments как ядро (~82% выручки).\n\nTimeline: 2011 основание → 2013 pivot в POS → 2021 IPO ($20B) → 2025 $6.15B выручки, 164K ресторанов.",
          jtbd: "**Core Job:** Единая система для всех операций ресторана (заказы, платежи, персонал, маркетинг, финансы) вместо 7 разных софтов.\n\n**Switching Trigger:** Открытие нового ресторана или момент когда старый POS (NCR, Aloha, Micros) не справляется с онлайн-заказами.\n\n**Consumption Chain:** Видят терминал Toast у конкурентов (~80% social proof) → demo от локального sales rep → установка 1-2 дня → через 3-6 мес подключают payroll, marketing, Capital.",
          monetization: "**Model:** Подписка + embedded payments + финпродукты. Starter Kit $0/мес (повышенная комиссия ~2.99%). Point of Sale $69/мес. Payroll $90/мес + $9/сотрудник.\n\n82% выручки — fintech/payments. NRR 135%. Средний ACV ~$10,000/год. $6.15B выручки 2025, EBITDA прогноз $775-795M на 2026.",
          marketing: "**GTM:** Field sales (основной канал) + PLG (бесплатный starter kit). Local sales reps заходят в рестораны, показывают demo. Density play: 5+ ресторанов на Toast в районе → остальные спрашивают.\n\nПартнёрство с US Foods — двусторонний обмен лидами. Первые клиенты: основатели лично обходили рестораны в Бостоне.",
          impact: "**Для клиента:** Table turn time -15%. Выручка +30% выше среднего. Вендоры: 5-7 → 1. Toast Capital: одобрение за 1 день vs 4-6 недель банк.\n\n**Для компании:** 2013 pivot → 2021 IPO $20B → 2025: 164K ресторанов, $6.15B выручки, $2B+ ARR. Цель CEO: $5B → $10B ARR.",
          tocConstraint: "**Ограничение:** Технологическая фрагментация ресторанного бизнеса — 5-7 несвязанных систем. Основатели сидели в ресторанах Бостона и видели: боль не в системе, а в разрыве между системами.\n\n**Exploit:** POS как центральный хаб всех транзакций.\n\n**Elevate:** Fintech layer (Toast Capital, дебетовые карты) использует transaction data для автоматического underwriting.\n\n**Куда сместилось:** Международная экспансия и enterprise chains.",
          trizContradictions: "**ТП #1:** Глубина функций ↑, простота для SMB-владельца ↓. Решение: модульные add-ons, Starter Kit = минимум. #1 Сегментация.\n\n**ТП #2:** Низкая цена входа ($0/мес) vs высокий ARPU ($10K+/год). Решение: embedded payments — 2.99% с каждой транзакции. Revenue пропорционален успеху ресторана. #5 Объединение.\n\n**Физическое:** Универсальный (все типы ресторанов) И специализированный (уникальные процессы каждого формата). Единое ядро + настраиваемые workflow. #3 Местное качество.\n\n**ИКР:** Ресторан работает как автоматизированная машина — владелец занимается только едой и гостями.",
          conditions: "**Founders:** Три сооснователя из Endeca Technologies (куплена Oracle за $1B). Опыт enterprise software из MIT-экосистемы.\n\n**Market timing:** 2013 — cloud POS созрел, iPad стал дешёвым, Stripe доказал embedded payments. COVID 2020 ускорил онлайн-заказы в 5x.\n\n**Capital:** ~$900M+ до IPO. Hardware + field sales по всей стране + бесплатный tier.",
          mvpVersion: "**Эксперимент:** Выбрать вертикаль (например, барбершопы), вручную настроить связку из 3 бесплатных инструментов (Calendly + Stripe + Google Sheets) для 5 бизнесов. Взять $50-100/мес за \"unified dashboard\".\n\n**Метрика:** 3 из 5 платят второй месяц + 2 просят дополнительный функционал.\n\n**Следующий шаг:** Автоматизировать интеграцию, добавить 2-й модуль, выйти на 20 клиентов и замерить density effect.",
        },
      },
    ],
    unitboxApplication:
      "Core = каталог. +AI лидогенерация. +Market analytics. +ROI calculator. Shared data layer. Девелопер не уйдёт.",
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
        detail: "$3-5M/год, 0 сотрудников. 70+ проектов, 3-5 живых. PhotoAI+NomadList+RemoteOK",
        caseStudy: {
          mechanicInAction: "• 1987 г.р., Нидерланды. Учился на музыкального продюсера, зарабатывал $2-3K/мес на YouTube-музыке\n• 2013 — продал все вещи, уехал как цифровой номад с ноутбуком и рюкзаком\n• 2014 — челлендж «12 стартапов за 12 месяцев»: по продукту в месяц, убивал неработающие\n• Nomad List (~7-й стартап) взлетел — из Google Spreadsheet в платформу для номадов\n• Добавил RemoteOK, InteriorAI, затем PhotoAI (2023) — AI-генерация фото\n• Стек намеренно примитивный: vanilla PHP, jQuery, SQLite. Без React, без микросервисов\n• AI = «цифровая рабочая сила»: 95% кода и саппорта автоматизировано через LLM\n• К 2025: 70+ проектов за карьеру, 3-5 живых, $3-5M/год, 0 сотрудников",
          jtbd: "**Core Job:** Построить бизнес со свободой локации и времени без команды и инвесторов.\n\n**Trigger:** Депрессия после возвращения в Нидерланды, деньги заканчивались, музыка не масштабировалась.\n\n**Push:** Офис = потеря свободы; венчур = потеря контроля; фриланс = время на деньги.\n\n**Pull:** Recurring revenue 24/7 без участия; жизнь из любой точки мира.\n\n**Anxiety:** «Что если ни один из 12 стартапов не взлетит?»\n\n**Consumption Chain:** Идея → MVP за 2-4 недели → публичный запуск (Twitter) → метрики 30 дней → kill or keep.\n\n**Metrics:** MRR (open dashboard), платящие юзеры, время на поддержку → 0.",
          monetization: "**PhotoAI:** ~$132K/мес ($1.6M ARR) — подписка на AI-генерацию фото, 70% дохода.\n**RemoteOK:** ~$41K/мес (~$500K ARR) — платные размещения вакансий.\n**InteriorAI:** ~$40K/мес (~$480K ARR) — подписка на AI-редизайн интерьеров.\n**Nomad List:** ~$700K ARR — подписка для номадов.\n\nИтого: $3-5M/год. Маржа ~85-95% (нет зарплат, серверы + API = основные расходы). Replicate API для ML вместо своей инфраструктуры.",
          marketing: "• Building in public: открытые дашборды выручки, ежедневные твиты — доверие + виральность\n• Twitter/X: 500K+ подписчиков, каждый пост = органический охват\n• SEO: Nomad List — 1000+ городов, RemoteOK — тысячи вакансий = длинный хвост\n• Виральные AI-фото (PhotoAI) шарятся пользователями = бесплатный word-of-mouth\n• $0 на рекламу — никогда\n• Подкасты (Lex Fridman, Indie Hackers) — «герой-нарратив» одиночки",
          impact: "**До (2013):** $2-3K/мес (YouTube-музыка). 0 продуктов. Депрессия.\n\n**После (2025):** $250-400K/мес (портфель SaaS). 3-5 живых, 70+ запущенных. 0 сотрудников. $0 инвестиций. Финансовая свобода из любой точки мира.",
          tocConstraint: "**Ограничение:** Время одного человека — невозможно масштабировать поддержку, разработку и маркетинг одновременно.\n\n**Решение:** Радикальная автоматизация (AI-саппорт, cron-джобы) + простейший стек (PHP/SQLite) без DevOps-оверхеда.\n\n**Куда сместилось:** Потолок идей — нужно находить новые AI-ниши быстрее конкурентов.",
          trizContradictions: "**ТП #1:** СЛОЖНЫЙ (много функций для удержания) и ПРОСТОЙ (один человек поддерживает). #1 Сегментация + #25 Самообслуживание: независимые микро-продукты; пользователи сами генерируют контент.\n\n**ТП #2:** МНОГО экспериментов но МАЛО времени на каждый. #10 Предварительное действие + #35 Изменение параметров: boilerplate + дедлайн 1 месяц отсекает перфекционизм.\n\n**ИКР:** Продукт сам себя развивает, поддерживает и продвигает без участия фаундера.",
          conditions: "**Founder fit:** Разработчик-универсал: frontend + backend + дизайн + копирайтинг.\n\n**Низкие расходы:** Номад-лайфстайл $1-2K/мес в ЮВА — экспериментирование без давления.\n\n**Тайминг:** 2014 — бум remote work до COVID; 2023 — бум генеративного AI → PhotoAI попал в волну.\n\n**Капитал:** ~$0 — только ноутбук. Все продукты bootstrapped.\n\n**Twitter/X как платформа:** Без building in public — нет органического роста.",
          mvpVersion: "**Гипотеза:** Люди платят за AI-генерацию профессиональных фото (аватары, бизнес, dating).\n\n**Эксперимент:** Лендинг + Stripe + Replicate API (Stable Diffusion fine-tune на 20 фото). Запуск на Twitter. $0 маркетинг + ~$50-100 API.\n\n**Метрика:** 50+ платящих за первую неделю при $29.\n\n**Следующий шаг:** Подписка $19/мес, расширить модели (бизнес, dating, LinkedIn), виральность фото.",
        },
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
        company: "ServiceTitan",
        detail: "$961M revenue, $9B IPO. Вертикальный SaaS для home services — 164K+ trades бизнесов",
        caseStudy: {
          mechanicInAction: "• 2007: Ara Mahdessian и Vahe Kuzoyan — дети армянских иммигрантов-сантехников в Калифорнии\n• Видели как родители ночами вручную делают invoices, scheduling, учёт → построили cloud-платформу\n• Вертикальный SaaS для home services (HVAC, сантехника, электрика) — $600B+ рынок в США\n• IPO декабрь 2024: $71/акция, открытие $101, market cap $9B\n• Revenue $685M (FY2024, +24% YoY) → $961M (TTM Jan 2026)\n• Модульная стратегия: scheduling → dispatch → invoicing → marketing → payroll → FinTech (lending)\n• Клиенты: рост продаж до +70%, выручка с $16M до $20M после внедрения\n• 0% пользователей ServiceTitan в статусе struggling business",
          jtbd: "**Core Job:** Управлять trades-бизнесом из одной системы — scheduling, dispatch, invoicing, маркетинг.\n\n**Trigger:** Владелец возвращается с вызовов и ночами делает бумажную работу.\n\n**Push:** Excel/бумага, 5-7 несвязанных систем, нет real-time маржи.\n\n**Pull:** Один dashboard: звонок → dispatch → tracking → invoice → P&L.\n\n**Anxiety:** «Я сантехник, не IT» — white-glove онбординг, UX для планшета в фургоне.\n\n**Metrics:** Revenue клиентов +70%, средний чек ↑, ночная работа → 0.",
          monetization: "**Тарифы:** $150-$500+/мес per user. Модульная подписка: scheduling/dispatch (базовый) + marketing, accounting, payroll (upsell).\n\n**Revenue:** $685M (FY2024) → $961M (TTM Jan 2026). Рост 24-25% YoY. Gross margin ~58%.\n\n**IPO:** Декабрь 2024, $9B market cap. Платформенная стратегия: FinTech (payments, lending), Pro Products marketplace.\n\nNRR высокий — клиенты расширяют модули.",
          marketing: "• «Born in the trades, built for the trades» — vertical focus\n• Сарафан от подрядчиков — 63% home services бизнесов растут (исследование 2025)\n• Case studies с цифрами (+70% sales) как главный контент\n• Conference Pantheon как community event\n• Каждый продавец говорит на языке HVAC/plumbing, не generic SaaS\n• Auto review requests после визитов — клиенты генерируют social proof",
          impact: "**Для клиента:** Ночная бумажная работа → 0. Scheduling: бумага → real-time dispatch. Invoice: ручной → auto. P&L: не знал маржу → real-time. Revenue: +70%.\n\n**Для компании:** $0 (2012) → $685M (2024) → $961M (2026). IPO $9B. $600B+ TAM.",
          tocConstraint: "**Ограничение:** Подрядчики — технари, не IT. Adoption нового софта = главный барьер.\n\n**Решение:** White-glove онбординг + UX для планшета в фургоне. Данные показывают ROI в $$$.\n\n**Куда сместилось:** Международная экспансия и enterprise chains (Comfort Systems $5B+ revenue).",
          trizContradictions: "**ТП #1:** Мощная (много модулей, AI) и Простая (для сантехника с iPad). #1 Сегментация: роли owner/dispatcher/technician видят разные интерфейсы.\n\n**ТП #2:** Универсальная (все trades) и Специализированная (уникальные workflows). #17 Переход в другое измерение: модульная архитектура + vertical-specific templates поверх общего ядра.\n\n**ИКР:** Подрядчик НЕ занимается администрированием — система сама делает scheduling, invoicing, follow-up.",
          conditions: "**Founders:** Дети сантехников — глубокое понимание боли, доверие community.\n\n**Рынок:** $600B+ TAM, миллионы SMB — greenfield без софта (pen & paper).\n\n**Timing:** Cloud SaaS + iPad стали доступны. COVID ускорил digital adoption.\n\n**Capital:** ~$900M+ до IPO. Field sales по стране + free starter tier.\n\n**Moat:** Высокий switching cost — вся операционка на платформе после внедрения.",
          mvpVersion: "**Гипотеза:** Trades-бизнесы заплатят за cloud scheduling + dispatch + invoicing.\n\n**Эксперимент:** MVP для одной вертикали (HVAC/plumbing): звонок → заказ → назначение техника → счёт. 5-10 бизнесов Южной Калифорнии.\n\n**Метрика:** 3 из 5 платят второй месяц + просят доп. функционал.\n\n**Следующий шаг:** Новые trades + второй модуль (marketing/accounting). Density effect в регионе.",
        },
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

  // === CATEGORY: mega-patterns (3 items) ===
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
        company: "Cursor (Anysphere)",
        detail: "$1.2B ARR, $29.3B оценка. AI-native IDE. 1M+ DAU, 360K платящих",
        caseStudy: {
          mechanicInAction: "• 2022: 4 студента MIT (Truell, Asif, Lunnemark, Sanger) основали Anysphere\n• Год «блуждали» — mechanical engineering tools не взлетели\n• Март 2023: запуск Cursor — форк VS Code с глубоко встроенным AI\n• Ключевое решение: форкнуть VS Code — знакомый интерфейс + AI-first архитектура\n• Context engine (какой код подавать в LLM) — главный дифференциатор\n• Январь 2025: $100M ARR, $0 на маркетинг\n• Ноябрь 2025: >$1B ARR, $29.3B оценка\n• 1M+ DAU, 360K платящих, 50K компаний, более половины Fortune 500",
          jtbd: "**Core Job:** Писать код быстрее, не переключаясь между инструментами.\n\n**Trigger:** Разработчик тратит 60%+ времени на чтение и отладку чужого кода.\n\n**Push:** Copilot — автокомплит без контекста; ChatGPT — copy-paste убивает flow.\n\n**Pull:** «Выдели код + спроси» в редакторе; AI видит весь репозиторий.\n\n**Anxiety:** «Будет ли AI генерировать баги?» — у NVIDIA баг-рейт flat при 3x росте коммитов.\n\n**Consumption Chain:** Скачал → VS Code привычки сохранены → Tab-автокомплит сразу → trial кончается → $20/мес очевидно.\n\n**Metrics:** -25% debugging, -30-50% цикл разработки, +50% shipped code (Trimble), 3x committed code (NVIDIA).",
          monetization: "**Тарифы:** Free trial 2 нед. Pro $20/мес. Business $40/мес. Enterprise custom.\n\n**ARR:** ~$1M (2023) → $100M (янв 2025) → $500M (июн) → >$1B (ноя 2025). Рост 1100% YoY. Удвоение каждые ~2 мес.\n\n**Раунды:** $400K pre-seed → $900M Series C ($9.9B) → $2.3B Series D ($29.3B). $0 маркетинг, основные затраты — inference.",
          marketing: "• $0 на маркетинг — 100% organic word-of-mouth\n• Bottom-up PLG: разработчик → команда → Business план\n• Форк VS Code = нулевой switching cost\n• Enterprise sales team только с начала 2025 (ответ на входящий спрос)\n• Первые клиенты — MIT/OpenAI экосистема → вирус через Twitter/X",
          impact: "**Для клиента:** Debugging: -20-25%. Цикл: -30-50%. Trimble (800 инж.): +50% shipped code. NVIDIA (30K devs): 3x код при flat bug rate.\n\n**Для компании:** $1M → $1.2B ARR за 2 года (1200x). $400K pre-seed → $29.3B. $0 маркетинг.",
          tocConstraint: "**Ограничение:** LLM видит один файл, не понимает архитектуру → нерелевантный код.\n\n**Решение:** Context engine собирает файлы, типы, зависимости перед каждым запросом.\n\n**Куда сместилось:** Качество LLM-моделей и enterprise compliance (SOC2, on-prem).",
          trizContradictions: "**ТП #1:** AI должен видеть ВЕСЬ код (точность) и НЕ весь (контекст LLM + стоимость). Приём #1 Дробление + #10 Предварительное действие: семантические чанки, индексация, релевантные фрагменты.\n\n**ТП #2:** НОВЫЙ (AI-native) и ПРИВЫЧНЫЙ (без переучивания). Приём #5 Объединение: форк VS Code = привычность бесплатно.\n\n**ИКР:** Редактор сам пишет код, разработчик только формулирует намерение.",
          conditions: "**Founders:** 4 MIT CSAIL + OpenAI accelerator. Deep ML + product sense.\n\n**Timing:** GPT-3.5/4 (2023) — code generation достаточно хорош; Copilot доказал рынок, но остался автокомплитом.\n\n**Капитал:** $400K → доказали PMF → unit economics с первого дня.\n\n**Рынок:** 30M+ разработчиков, VS Code 74% share → форк = мгновенный доступ.\n\n**Microsoft слишком медленный:** корпоративная инерция → стартап обогнал.",
          mvpVersion: "**Гипотеза:** Разработчики платят $20/мес за AI-редактор с контекстом всего проекта.\n\n**Эксперимент:** Форк VS Code + OpenAI API + базовый context (файл + импорты + табы). 50 разработчикам на 7 дней.\n\n**Метрика:** 40%+ WAU retention, AI-фичи ≥3 раза/неделю.\n\n**Следующий шаг:** Codebase indexing + Pro $20/мес.",
        },
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
        company: "Writer",
        detail: "AI заменяет контент-агентство $15-30K/мес за $2-5K. $47M ARR, оценка $1.9B",
        caseStudy: {
          mechanicInAction: "Writer превращает услугу контент-агентства в software-платформу. Пивот из Qordoba (AI-локализация) в 2020. Ключевое решение — собственное семейство LLM Palmyra (от 128M параметров до 1M-token контекст), а не обёртка над OpenAI/Anthropic.\n\nЧто заменяется: маркетинговое агентство ($15-30K/мес) → платформа Writer ($2-5K/мес). AI-агенты генерируют контент в brand voice с guardrails и RAG по Knowledge Graph.\n\nTimeline: 2015 Qordoba → 2020 Writer → 2022 $2M ARR → 2023 $16M ARR → 2024 $47M ARR, оценка $1.9B → 2025-2026 ~$84M revenue, 300+ enterprise-клиентов.",
          jtbd: "**Core Job:** Генерировать 50+ единиц on-brand контента в месяц без ручного написания, сократить time-to-market с недель до часов.\n\n**Switching Trigger:** Бюджет $180-360K/год на агентство, цикл бриф→публикация 2-4 недели. CMO видит конкурентов в 5x быстрее.\n\n**Push:** Агентства дорого, медленно, нет контроля brand voice. Pull: 10x скорость, 70-85% экономия, неограниченные итерации.\n\n**Anxiety:** \"AI-контент будет generic\" — fine-tuning Palmyra на данных клиента + Knowledge Graph + guardrails.",
          monetization: "**Тиры:** Starter $29-39/seat/мес (до 20 users). Enterprise — custom pricing, unlimited viewers.\n\nСредний enterprise-контракт ~$150-280K/год. Gross margin ~75-80% (собственные модели). LTV $500K+.\n\n**Revenue:** $2M (2022) → $16M (2023, +700%) → $47M (2024, +194%) → ~$84M (2025). Оценка $1.9B (40x ARR).",
          marketing: "**GTM:** Top-down enterprise sales с land-and-expand. Стратегические партнёрства: Accenture (инвестор + канал), AWS (Palmyra в Bedrock), Salesforce, Adobe, IBM Ventures — каждый инвестор = канал продаж.\n\nMay Habib — активный thought leader. Sales cycle 2-4 месяца.\n\n**Cold start:** Клиентская база Qordoba (Visa, Marriott, NBA) — 5 лет enterprise-отношений.",
          impact: "**Для клиента:** Стоимость контента: $15-30K → $2-5K/мес (-70-85%). Время: 2-4 недели → часы. Объём: 20-30 → 100+ единиц/мес. ROI 9x.\n\n**Для компании:** Пивот 2020 → $47M ARR 2024 → $1.9B оценка. 300+ enterprise-клиентов: Uber, Spotify, L'Oréal, Accenture, Qualcomm, Vanguard.",
          tocConstraint: "**Ограничение:** Пропускная способность маркетинг-команды по production контента. 80% времени на production, 20% на стратегию.\n\n**Exploit:** AI-assisted writing → Elevate: AI agents полностью генерируют контент, человек только ревьюит. Throughput увеличен в 5-10x.\n\n**Куда сместилось:** Стратегия и дистрибуция контента. Writer двигается в agentic workflows — планирование + анализ performance.",
          trizContradictions: "**ТП #1:** Качество ↑ (кастомизация под бренд), стоимость модели ↑. Решение: компактные Palmyra с synthetic data — enterprise-quality при fraction of cost frontier моделей. #35 Изменение параметров.\n\n**Физическое:** Модель универсальная (для любого enterprise) И специализированная (знает бренд). Решение: base Palmyra универсальна → fine-tuning специализирует. #15 Динамичность.\n\n**Приёмы:** #1 Дробление (pipeline: генерация → guardrail → Knowledge Graph → review), #10 Предварительное действие (Knowledge Graph индексирует ДО генерации), #5 Объединение (LLM + RAG + guardrails + style guide = единая платформа).",
          conditions: "**Founder:** May Habib — Harvard, Lehman Brothers, Mubadala. C-level нетворк. 5 лет Qordoba = готовая кодовая база и enterprise-клиенты.\n\n**Market timing:** 2020 — GPT-3 сделал generative AI реальностью, но enterprise не доверяли OpenAI. Window для enterprise-grade AI с собственными моделями.\n\n**Capital:** $326M итого. Без $100M+ Series B собственные модели невозможны.",
          mvpVersion: "**Эксперимент:** Telegram/Slack бот на Claude/GPT-4 API с brand voice guide + 10-20 примеров контента (RAG через embeddings). Найти 3-5 бизнесов с фрилансерами $1-5K/мес, предложить бесплатный 2-недельный pilot.\n\n**Метрика:** >=3 из 5 готовы платить $200-500/мес. Качество \"приемлемое с минимальными правками\" в >=70% случаев.\n\n**Следующий шаг:** Web-интерфейс, style guide editor, vertical-specific RAG.",
        },
      },
      {
        company: "Deel",
        detail: "$17.3B оценка, $1.15B ARR. Превратила global hiring из услуги в софт",
        caseStudy: {
          mechanicInAction: "Deel превратила глобальный найм и выплаты подрядчикам — процесс, традиционно требующий юристов, бухгалтеров и локальных юрлиц — в единую SaaS-платформу.\n\nМодульная архитектура: contractor payments (2019) → EOR → global payroll → HRIS → immigration → IT device management. Собственные юрлица в 150+ странах. 13 M&A сделок.\n\nTimeline: YC W19 → $500M ARR (март 2024) → $1B+ ARR (2025) → $17.3B valuation. Рост от $0 до $1B+ ARR за ~5 лет.",
          jtbd: "**Core Job:** Нанять разработчика в другой стране за 1 день с контрактом и выплатами без юрлица.\n\n**Switching Trigger:** Первый международный найм: юрлицо $20-50K и 3-6 месяцев.\n\n**Push:** Открытие юрлица $20-50K, contractor-схемы = misclassification штрафы, бухгалтерия в Excel для 10 стран. Pull: один dashboard, онбординг за 5 минут, единый инвойс.",
          monetization: "**Model:** Per-employee-per-month (PEPM), модульная подписка. HRIS: бесплатно. Contractor: $49/мес. EOR: от $599/мес. Global Payroll: $29/мес.\n\n**Revenue:** $0 (2019) → $100M (2022) → $500M (март 2024) → $1.15B run rate (август 2025). Первый месяц $100M+ — сентябрь 2025. 3 года подряд прибыльна. 35,000+ клиентов, 150+ стран.",
          marketing: "**GTM:** PLG (бесплатный HRIS) + sales-led enterprise + SEO (278 glossary-страниц, 45K визитов/мес). Outbound ~30% продаж (Amplemarket, рост 20x за 12 мес).\n\n**Первые клиенты:** YC W19 batch network. Pivot от smart contracts к compliance после customer interviews.",
          impact: "**Для клиента:** Время найма: 3-6 мес → 1-5 дней. Стоимость entry: $20-50K → $599/мес. Payroll-вендоры: 10 → 1.\n\n**Для компании:** $0 (2019) → $1.15B ARR (2025). Оценка $17.3B. 5,000+ сотрудников, 1.5M+ workers на платформе, $22B payroll/год. Подготовка к IPO.",
          tocConstraint: "**Ограничение:** Compliance complexity — невозможность одного юрлица нанимать людей в другой юрисдикции. Exploit: шаблоны контрактов 150+ стран, EOR конструкция. Elevate: M&A (PaySpace 45 engines, PayGroup APAC).\n\n**Куда сместилось:** HR operations полного цикла → performance management, immigration, IT provisioning. Стратегия \"workforce operating system\".",
          trizContradictions: "**ТП #1:** Скорость онбординга ↑, compliance quality ↓. Решение: pre-built шаблоны для 150+ юрисдикций + автоматическая классификация.\n\n**Физическое:** Локальный (законы каждой страны, юрлица) И глобальный (единый интерфейс). Разделение в пространстве: back-end локальный (150+ entities), front-end глобальный.\n\n**Приёмы:** #1 Сегментация (модули), #5 Объединение (13 M&A → единая платформа), #7 Матрёшка (бесплатный HRIS → платные модули), #10 Предварительное действие (compliance templates ДО найма).",
          conditions: "**Founders:** Alex Bouaziz (MIT, Prodware) и Shuo Wang (MIT, iRobot exit). Лично столкнулись с проблемой. MIT + YC = доступ к клиентам и a16z.\n\n**Market timing:** 2019 — за год до COVID. Пандемия создала взрывной спрос. Рынок EOR вырос с ~$3B до $10B+ за 3 года.\n\n**Regulatory tailwind:** AB5, EU директивы, IR35 — компании ДОЛЖНЫ обеспечить compliance.",
          mvpVersion: "**Эксперимент:** 1 страна (Индонезия). Юрист для contractor agreement ($200-500). Лендинг: \"Наймите подрядчика за 24 часа\". Найти 5-10 компаний через LinkedIn. Вручную обработать 3-5 контрактов. Брать $49-99/мес.\n\n**Метрика:** >=3 из 5 оплатили. Retention 2-й месяц >= 80%. Хотя бы 1 запрос на 2-ю страну.\n\n**Следующий шаг:** 2-я страна (Таиланд/Вьетнам). Автоматизация контрактов. Wise Business API. К месяцу 3 — 3-5 стран ЮВА.",
        },
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
        detail: "$70M ARR, $5B оценка. 4M+ developers. Open-source Firebase alternative",
        caseStudy: {
          mechanicInAction: "• 2020: Paul Copplestone и Ant Wilson запускают Supabase — managed Postgres с auth, storage, realtime и auto-generated API\n• Open Core: ядро (PostgreSQL + PostgREST + GoTrue + Realtime) под Apache 2.0; облако — проприетарный слой\n• Май 2020: смена тэглайна на «the open-source Firebase alternative» — за 3 дня рост с 8 до 800 баз\n• YC S20 → pre-seed → к декабрю 2020 уже 3 100 баз\n• 2024: $30M ARR → 2025: $70M ARR (рост ~250% YoY), 4M+ разработчиков\n• Октябрь 2025: Series E $100M при $5B (через 4 мес после Series D $200M при $2B)\n• Всего $500M привлечено; ~230 человек (полностью удалённая команда)\n• Драйвер 2025: vibe-coding платформы (Bolt.new, Lovable, Cursor) автоматически провижонят Supabase",
          jtbd: "**Core Job:** Получить рабочий бэкенд (БД + auth + storage + realtime) за минуты, не недели.\n\n**Trigger:** Новый проект → настройка инфраструктуры займёт дни.\n\n**Push:** Firebase — vendor lock-in, непредсказуемые цены, нет SQL.\n\n**Pull:** Полный Postgres без абстракций + open-source = можно мигрировать.\n\n**Anxiety:** «Open-source = нестабильно?» — managed cloud + enterprise SLA.\n\n**Consumption Chain:** Sign up → создать проект → автогенерация API → SDK → Row Level Security → деплой.\n\n**Metrics:** Time-to-first-query <2 мин; Chatbase — $1M MRR за 5 мес на Supabase; Maergo — экономия 4x.",
          monetization: "**Тарифы:** Free: 50K MAU, 500MB БД — $0. Pro: 100K MAU, 8GB — $25/мес. Team: SSO, compliance — $599/мес. Enterprise: custom.\n\n**ARR:** ~$10.5M (2023) → $30M (конец 2024) → $70M (2025). Рост ~250% YoY.\n\n**Оценка:** $2B (июн 2025) → $5B (окт 2025) — 71x forward revenue. Всего $500M привлечено. $304K revenue на сотрудника.",
          marketing: "• Community-led: 75K+ GitHub stars как главный канал\n• Позиционирование через антагониста: «open-source Firebase alternative» захватила весь поисковый спрос\n• Первые 50 сотрудников из open-source сообщества\n• Launch Week каждый квартал — серия ежедневных анонсов, вирусный охват\n• Vibe-coding: Bolt.new, Lovable, Cursor интегрируют по умолчанию → каждый AI-проект = новый клиент\n• «Build in a weekend. Scale to millions.»",
          impact: "**Для клиента:** Time-to-backend: дни → минуты. Lock-in: полный → нулевой. Chatbase: $1M MRR за 5 мес. Maergo: 4x экономия.\n\n**Для компании:** 8 баз (май 2020) → 4M+ проектов (2025). $70M ARR / 230 чел = $304K/чел. Оценка $5B.",
          tocConstraint: "**Ограничение:** Разработчики хотят Postgres, но настройка auth + realtime + storage + API — недели.\n\n**Решение:** Предсобранный стек (PostgREST + GoTrue + Realtime + Storage) с единым dashboard и auto-generated API.\n\n**Куда сместилось:** Enterprise sales и multi-region (отсюда Team $599 и Enterprise тарифы).",
          trizContradictions: "**ТП #1:** Полностью open-source (доверие) И приносить выручку (cloud margin). Приём #1 Сегментация + #24 Посредник: open-source = движки; проприетарный = orchestration (billing, dashboard).\n\n**ТП #2:** Простой как Firebase И мощный как raw Postgres. Приём #3 Местное качество + #25 Самообслуживание: API автогенерируется (простота), полный SQL сохраняется (мощность).\n\n**ИКР:** Каждая таблица сама становится REST/GraphQL endpoint без потери возможностей Postgres.",
          conditions: "**Founders:** Paul Copplestone — серийный предприниматель (ServisHero, Nimbus); Ant Wilson — масштабируемые системы.\n\n**Timing:** 2020 — пик разочарования в Firebase (lock-in, pricing), Postgres = стандарт.\n\n**Капитал:** $500M total → долгосрочное строительство без давления на монетизацию.\n\n**Экосистема:** Зрелые OSS компоненты (PostgREST, GoTrue) — собрать и упаковать.\n\n**Волна 2024-2025:** Vibe-coding создал взрывной органический спрос.",
          mvpVersion: "**Гипотеза:** Разработчики выберут managed Postgres с auto-API вместо Firebase, если «open-source Firebase alternative».\n\n**Эксперимент:** Supabase self-hosted (Docker) + landing + waitlist. Product Hunt / Hacker News.\n\n**Метрика:** 500+ signups за 7 дней (реальный результат: 8→800 баз за 3 дня).\n\n**Следующий шаг:** Managed cloud Pro $25/мес для первых 50 из waitlist, замер free→paid конверсии.",
        },
      },
      {
        company: "n8n",
        detail: "$40M ARR, $2.5B оценка. Open-source AI automation. 500+ интеграций, 67 человек",
        caseStudy: {
          mechanicInAction: "• 2019: Jan Oberhauser (Берлин, бывший VFX-художник) устал переписывать glue-code → создал n8n\n• Open Core: ядро (500+ интеграций, visual builder, JS/Python) бесплатно self-hosted; cloud + enterprise = платные\n• Fair-code лицензия (Sustainable Use) — видно всё, но production >3 узлов требует лицензии\n• Первый найм — DevRel (не инженер), фокус на community с первого дня → 16K за 18 мес\n• $254M total: Seed $1.5M (Sequoia) → Series C $180M (Accel + Nvidia, окт 2025)\n• $40M ARR, оценка $2.5B (58x). 3K+ enterprise клиентов. 67 человек = $597K revenue/employee\n• Revenue mix: 55% cloud, 30% enterprise, 15% embedded/OEM\n• Драйвер 2025: AI workflow automation — 6.2K+ community шаблонов с LLM/классификацией",
          jtbd: "**Core Job:** Автоматизировать процессы между 500+ сервисами без boilerplate кода.\n\n**Trigger:** Zapier/Make дорого ($50-100/мес) и ограничено; custom code — долго и хрупко.\n\n**Push:** Glue-code между сервисами = дни работы. Закрытые платформы = vendor lock-in.\n\n**Pull:** Visual builder + JS/Python в любом узле + self-hosted бесплатно + AI-агенты нативно.\n\n**Anxiety:** «Open-source = нестабильно» — managed cloud + enterprise SLA.\n\n**Metrics:** ARPU $13.3K/год, SanctifAI запустили первый workflow за 2 часа.",
          monetization: "**Тарифы:** Self-hosted: бесплатно. Cloud Starter: $24/мес (2.5K executions). Pro: $120/мес (10K). Enterprise: custom (SSO, LDAP, audit).\n\n**ARR:** $40M (2025). Рост ~250% YoY. Gross margin >75%. ARPU $13.3K/год.\n\n**Оценка:** $2.5B (Series C, окт 2025). $254M total funding. 67 человек = $597K/employee.\n\nUpsell path: self-hosted free → cloud (удобство) → enterprise (compliance).",
          marketing: "• Community-Led: GitHub open-source → organic discovery. DevRel = первый найм\n• 6.2K+ community workflow templates — каждый = SEO-магнит + proof of value\n• Sequoia + Accel подкасты — founder-as-thought-leader\n• Bottom-up: разработчик ставит self-hosted → команда растёт → покупает Cloud/Enterprise\n• AI-хайп как tailwind: «AI workflow automation» вместо просто «automation»\n• n8n Fest — офлайн community event",
          impact: "**Для клиента:** Glue-code: дни → часы визуально. Zapier: $50-100/мес → self-hosted $0. AI-агенты встроены нативно.\n\n**Для компании:** 0 → $40M ARR за ~5 лет. 0 → $2.5B оценка за 6 лет. 67 чел = $597K/employee. 3K+ enterprise клиентов.",
          tocConstraint: "**Ограничение:** Конверсия self-hosted → платный cloud/enterprise (типичная проблема Open Core).\n\n**Решение:** Cloud настолько удобен (zero-ops, auto-scaling, SSO), что self-hosted = pain. Вход от $24/мес. Enterprise features только в платной.\n\n**Куда сместилось:** Конкуренция с Zapier/Make за low-code рынок + новые AI-native automation платформы.",
          trizContradictions: "**ТП #1:** Открытый (adoption) и Закрытый (revenue). Fair-code лицензия: видно всё, но production >3 узлов = лицензия. Enterprise-фичи только платные.\n\n**ТП #2:** No-code (citizen devs) и Full-code (инженеры). Visual builder + JS/Python в любом узле. AI генерирует из plain English.\n\n**ИКР:** Workflow собирается, запускается и масштабируется без вмешательства — описал на plain English → работает.",
          conditions: "**Founder:** Jan Oberhauser — VFX → code → automation. Лично прожил боль glue-code.\n\n**Timing:** 2019 — Zapier доказал рынок, но closed-source и дорого. Open-source альтернатива = голубой океан.\n\n**Community-first:** DevRel раньше sales — создал army of evangelists.\n\n**AI wave 2024-2025:** Позиционирование как AI workflow platform добавило рост.\n\n**Capital:** $254M → долгосрочное строительство без давления на монетизацию.",
          mvpVersion: "**Гипотеза:** Разработчики выберут open-source visual workflow builder вместо Zapier.\n\n**Эксперимент:** Node-based builder + 20-30 интеграций + self-hosted Docker + GitHub repo. Community forum.\n\n**Метрика:** 1K+ GitHub stars за 6-12 мес.\n\n**Следующий шаг:** Hosted cloud $20/мес как первый revenue stream.",
        },
      },
      {
        company: "Cal.com",
        detail: "$32M raised. 1000+ contributors",
      },
    ],
    unitboxApplication:
      "Open-source отдельные компоненты (floor plan extraction, chess parser) → привлечь proptech devs. Managed = полный каталог + AI.",
  },
];
