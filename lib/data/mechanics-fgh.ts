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
];
