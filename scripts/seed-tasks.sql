-- Seed tasks from Platform Audit Roadmap (2026-03-20)
-- Run this in Supabase SQL editor AFTER create-tasks-table.sql

-- Wave 0: Foundation
INSERT INTO tasks (title, description, detailed_description, status, priority, wave, effort, source, jobs_served, ajtbd_tier, segment, "order") VALUES
('Agency Cabinets', 'Multi-tenant для агентств (wellstate.unitbox.ai), авторизация агентов, видят все проекты', 'Infrastructure foundation. Without agency cabinets, we cannot onboard agencies. Each agency gets their own subdomain, can authorize their agents, and sees ALL developer projects + Unitbox-filled projects + MLS resale listings.

This is the #1 blocker for the entire growth flywheel. Enables ALL agent jobs (83 micro jobs identified in AJTBD analysis).

Architecture: Developer cabinets (breig.unitbox.ai) already exist. Agency cabinets follow the same multi-tenant pattern but with different data visibility — agencies see all projects from all developers.', 'backlog', 'p0', 0, 'l', 'strategy', 'Enables ALL agent jobs — infrastructure foundation', 's', 'agency', 1),

('Fill 100 Hot Projects', 'Заполнить топовые проекты Бали от имени Unitbox', 'Bootstrap supply for the marketplace. Without content, agents have nothing to sell. We fill the top 50-100 off-plan projects on the Bali market ourselves, creating critical mass of content.

Parallel with Agency Cabinets. Gleb helps identify which projects agencies actively sell.

Validated by research: Airbnb, Zillow, 99.co all did supply-side subsidy at launch. Reelly had 1,920 projects before hitting 55K agents.', 'backlog', 'p0', 0, 'l', 'strategy', 'Agent jobs 2.1.1-2.1.9 (search has results)', NULL, NULL, 2),

('OG-Meta Tags', 'Rich preview при шаринге ссылок в WhatsApp/Telegram', 'Every link shared in WhatsApp/Telegram looks "empty" without proper OG meta tags. Adding og:title, og:description, og:image to project and unit pages means every shared link shows a professional preview with render image + key metrics.

2-4 hours of work. ROI/effort ratio is maximum. Affects every single link ever shared by any agent.', 'backlog', 'p0', 0, 'xs', 'audit', 'Agent jobs 5.1.2, 5.1.4 (links look professional)', 'b', 'agent', 3),

('Unitbox Publisher Account', 'Аккаунт застройщика для проектов, заполненных Unitbox', 'Create a developer entity "Unitbox" that hosts the 100 hot projects we fill ourselves. Technically simple — just create a developer record. Needed for Fill 100 Projects task.', 'backlog', 'p0', 0, 's', 'strategy', 'Infrastructure for Fill 100 Projects', NULL, NULL, 4);

-- Wave 1: Agent Activation
INSERT INTO tasks (title, description, detailed_description, status, priority, wave, effort, source, jobs_served, ajtbd_tier, segment, "order") VALUES
('Quick Offer', 'Выбрал юнит(ы) → 1 клик → branded PDF/link готов', 'THE killer feature. Agent selects unit(s) → one click → branded offer with financial model, payment plan, agent photo+contacts is ready to share.

Currently agents must: create collection → add units → customize branding → generate PDF. This takes 5-10 minutes. Quick Offer reduces it to <30 seconds.

Reelly built 55K agent base on this exact feature. Agent saves 2 hours per offer.

AJTBD: Closes agent jobs 4.2.1 (one-click share), 4.2.2 (auto-apply branding), 4.2.3 (WhatsApp-ready link). These are THE core workflow jobs — without this, the Core Job "create professional offer in <2 min" fails.', 'backlog', 'p0', 1, 'm', 'audit', 'Agent 4.2.1-4.2.3 (core workflow), Dev 6.4 (offers created)', 's', 'agent', 5),

('WhatsApp Share', 'Кнопка Share на юните/коллекции/проекте → WhatsApp-ready сообщение', '90%+ of agent↔investor communication happens in WhatsApp. Currently agent copies link and pastes manually.

Need: Share button → opens WhatsApp with pre-filled message (image + key metrics + deep link). Uses WhatsApp URL scheme: https://wa.me/?text=...

Combined with OG-meta tags, every shared link looks professional in chat.', 'backlog', 'p0', 1, 's', 'audit', 'Agent 5.1.2 (primary delivery channel)', 'a', 'agent', 6),

('Agent Branding', 'Фото, контакты, WhatsApp CTA, цвета агентства в офферах', 'Agents won''t send clients a "faceless" document. Every offer needs: agent photo, full name, phone, WhatsApp link, agency logo, brand colors.

Benchmark: Reelly — offer looks like it came from the agent, not the platform. Investor perceives it as professional material from their agent.

Currently Collections allow logo + intro text. Missing: agent photo, contact details, WhatsApp CTA on every page of the offer.', 'backlog', 'p0', 1, 'm', 'audit', 'Agent 4.1.5, 4.2.2 (professional look = adoption)', 'a', 'agent', 7),

('"My Projects" Tagging', 'Агент/агентство отмечает проекты с которыми работает', 'Agent sees "their catalog" instead of 100 projects. Tag projects as "mine" → filter to only show tagged projects. Personalization = retention.

Also enables: agency-level tagging (which developer each project belongs to), resale ownership tracking.', 'backlog', 'p1', 1, 's', 'backlog', 'Agent 2.1.x (filtered catalog), Dev 3.6 (agent engagement)', 'a', 'agent', 8),

('Commission Visibility', 'Агент видит свою комиссию по каждому юниту', 'Direct motivation lever. agent_commission field already exists in the database — just needs UI.

Agent sees: "Your commission: 5% ($14,000)" on every unit. Changes behavior — agents preferentially recommend units with visible commission.

AJTBD: Closes agent job 3.1.8 (check commission) which is currently UNSERVED and ranked #4 in top 10 highest-leverage jobs.', 'backlog', 'p1', 1, 's', 'audit', 'Agent 3.1.8 (motivation), 9.1.1 (earnings)', 'a', 'agent', 9),

('Unit List Visual Update', 'Обновление визуала карточек юнитов и таблиц', 'First impression of the platform for agents. Updating unit cards and tables to look modern and professional. Includes both catalog and CRM widget views.', 'backlog', 'p1', 1, 'm', 'backlog', 'Agent 3.1.1-3.1.7 (evaluate faster)', 'b', 'agent', 10);

-- Wave 2: Investor Conversion
INSERT INTO tasks (title, description, detailed_description, status, priority, wave, effort, source, jobs_served, ajtbd_tier, segment, "order") VALUES
('Financial Model Executive Summary', '4 ключевые метрики крупно, остальное collapsed', 'Current FinancialNew shows EVERYTHING at once: IRR, Cap Rate, CoC ROI, Net ROI, CoC Payback, annual forecast, exit scenarios, payment plans, calculator, modules. This overwhelms investors on first contact.

Solution: Level 1 shows 4 key metrics (Monthly Income, Net ROI, Payback Period, Cap Rate). "See Full Model" expands to complete analysis. In offers, simplified version by default.

Interactive sliders for what-if scenarios should be more prominent.', 'backlog', 'p1', 2, 'm', 'audit', 'Agent 3.1.2 (quick evaluate), Investor core need', 'b', 'investor', 11),

('Comparison Tool', 'Выбрать 2-3 юнита → side-by-side таблица → экспорт', 'Investors ALWAYS compare 2-3 options. If comparison doesn''t happen in Unitbox, it happens in agent''s Excel → Unitbox loses value.

Agent selects 2-3 units → comparison table: price, price/sqm, ROI, payment plan, developer, handover, location. Export to PDF.

AJTBD: Closes 5 fully UNSERVED agent jobs (3.2.1-3.2.4, 8.1.1). Ranked S-tier.', 'backlog', 'p1', 2, 'm', 'audit', 'Agent 3.2.1-3.2.4, 8.1.1 (5 unserved jobs)', 's', 'agent', 12),

('Portfolio in Offer', 'Несколько юнитов в одном оффере с comparison view', 'Extend Collections to support multi-unit comparison within the offer itself. Agent sends "here are 3 options" with built-in comparison table.

Related to Comparison Tool — same comparison logic but embedded in the offer/collection view.', 'backlog', 'p1', 2, 'm', 'backlog', 'Agent 4.1.1-4.1.3 (multi-unit offer), Dev 6.4', 'b', 'agent', 13),

('Legal/Ownership Section', 'Тип собственности, сроки, условия per project', '#1 investor fear in Bali: "Can I actually own this?" Currently no section explains ownership structure per project.

landType field exists in DB. Need: dedicated "Ownership & Legal" section on project page explaining leasehold/Hak Pakai/PT PMA, lease term, extension conditions, risks.

Research showed: developer track record is #1 trust signal, legal clarity is #2 for Bali specifically.', 'backlog', 'p1', 2, 's', 'audit', 'Investor #1 fear resolved', 'a', 'investor', 14),

('Special Offers System', 'До 10 юнитов со спец. условиями для агентов', 'Developer can mark up to 10 units with special conditions: bonus commission, client discount, limited-time pricing.

Paywall feature for developers (only available after subscription). Agents see "Special Offer" badges → easier to close deals.

AJTBD: Closes 5 fully UNSERVED developer jobs (5.1-5.5). Direct revenue lever.', 'backlog', 'p1', 2, 's', 'backlog', 'Dev 5.1-5.5 (all 5 unserved), Agent 3.1.8', 's', 'developer', 15),

('Presentation Link at Top', 'Ссылка на презентацию вверху страницы проекта', 'Quick win. Agent immediately sees "Download Presentation" at the top of project page instead of scrolling to Documents section.', 'backlog', 'p2', 2, 'xs', 'backlog', 'Agent 3.1.1 (quick access)', 'b', 'agent', 16),

('Resale Status for Units', 'Статус resale у off-plan юнитов', 'Small but important: mark units that are being resold by owners (not developer). Different story for investor — resale = immediate availability, different pricing logic.', 'backlog', 'p2', 2, 'xs', 'backlog', 'Investor decision context', 'c', 'investor', 17),

('Documents & Links Merge', 'Смержить документы и ссылки, новый визуал', 'Currently two separate sections (Documents + Helpful Links) that could be one unified "Resources" section with better visual design.', 'backlog', 'p2', 2, 's', 'backlog', 'UX cleanup', 'c', NULL, 18);

-- Wave 3: Marketplace Growth
INSERT INTO tasks (title, description, detailed_description, status, priority, wave, effort, source, jobs_served, ajtbd_tier, segment, "order") VALUES
('MLS for Resale & Land', 'Агентства публикуют вторичку и землю, все видят', 'Inter-agency marketplace. Each agency publishes their resale listings → all agencies see all resale. Creates network effect independent of developers.

Additional value for agencies that doesn''t depend on developer content. Lock-in mechanism.

AJTBD: Closes 4 fully UNSERVED agent jobs (2.2.1-2.2.3, 9.2.3).', 'backlog', 'p1', 3, 'l', 'strategy', 'Agent 2.2.1-2.2.3, 9.2.3 (4 unserved, lock-in)', 'a', 'agency', 19),

('Collection Analytics', 'Какие юниты смотрел клиент, time spent, повторные визиты', 'Transform agent follow-up from guessing to data-driven. "I see you were interested in the 2BR at BREIG Edem, let''s discuss."

Track per-unit views within collection, time spent, repeat visits, PDF downloads. Real-time notification when client opens.

AJTBD: Closes 5 fully UNSERVED agent jobs (6.1.2-6.1.6). Benchmark: Alnair magic links, DocSend-style analytics.', 'backlog', 'p1', 3, 'm', 'audit', 'Agent 6.1.2-6.1.6 (5 unserved, data-driven follow-up)', 's', 'agent', 20),

('Offer Interactivity', 'Обратная связь от инвестора в офферах', 'Offers become two-way: investor can react to units, ask questions, request a meeting directly from the offer. Not just "view" but "interact."', 'backlog', 'p2', 3, 'm', 'backlog', 'Agent 7.1.1 (engagement-based followup), Dev 7.1-7.4', 'b', 'agent', 21),

('Agent Dashboard', 'Личный кабинет агента: коллекции, аналитика, лиды', 'Full agent workspace: my collections, my analytics (views, engagement), my leads, my commissions. The "home screen" for the agent when they log into Unitbox.', 'backlog', 'p1', 3, 'l', 'audit', 'Agent 6.1.6, 9.1.3 + overview', 'a', 'agent', 22),

('Traffic Analytics for Developers', 'Трафик агентов на проекты застройщиков', 'CRITICAL for monetization. Shows developer: "50 agents viewed your project, 23 offers created, $3.2M in correlated sales."

This is what we sell to developers. Without this data, we can''t prove value → can''t convert free → paid.

AJTBD: Closes 6 fully UNSERVED developer jobs (6.1-6.6).', 'backlog', 'p0', 3, 'm', 'backlog', 'Dev 6.1-6.6 (all 6 unserved, MONETIZATION)', 's', 'developer', 23),

('Offer → CRM Pipeline', 'Полный цикл оффер → сделка в CRM → продажа', 'Agent creates offer → auto-creates deal in AMO CRM → unit linked to deal → deal progresses → unit status syncs back. Full loop.

Discussed with BREIG (2026-03-17): Teos already has this partially working with Koma CRM.', 'backlog', 'p1', 3, 'l', 'backlog', 'Agent 8.2.3 (deal tracking), Dev 8.1-8.5 (5 jobs)', 'a', 'developer', 24),

('Developer Track Record', 'Завершённые проекты, delivery history, social proof', '#1 trust signal for investors according to research. Developer page needs: completed projects with photos, on-time delivery stats, total units delivered, investor testimonials.

Currently /about page shows description, metrics, agents, projects — but no track record, no completion history, no trust score.', 'backlog', 'p2', 3, 'm', 'audit', 'Agent 3.1.4 (evaluate developer), Investor #1 trust signal', 'b', 'developer', 25);

-- Wave 4: Scale & Infrastructure
INSERT INTO tasks (title, description, detailed_description, status, priority, wave, effort, source, jobs_served, ajtbd_tier, segment, "order") VALUES
('New Payment Plans', 'Оплата с аренды, рассрочка после сдачи, настройка периодичности, макс. кол-во платежей', 'Extend payment plan system: rental income payments, post-handover installments, configurable payment frequency, maximum payment count.', 'backlog', 'p2', 4, 'm', 'backlog', 'Extends financial model capabilities', 'c', 'investor', 26),

('Capitalization & Occupancy Ramp-up', 'Рост стоимости недвижимости + коэффициент на occupancy по годам', 'Add asset appreciation settings and year-by-year occupancy ramp-up coefficients to financial models. Makes projections more realistic.', 'backlog', 'p2', 4, 'm', 'backlog', 'Financial model realism', 'c', 'investor', 27),

('Scenario Selection', 'Выбор сценария в финмоделях (pessimistic/realistic/optimistic)', 'UX improvement: investor/agent can toggle between pessimistic, realistic, optimistic scenarios with one click. Currently possible but not prominent.', 'backlog', 'p2', 4, 's', 'backlog', 'Financial model UX', 'c', 'investor', 28),

('Auto-update Chess Boards', 'Раз в день парсить сайты/sheets для обновления шахматок', 'Automated data freshness. Parse developer Google Sheets or websites daily to update unit statuses and prices without manual work.

AJTBD: Closes developer jobs 4.4, 4.5, 4.6 (data freshness automation).', 'backlog', 'p2', 4, 'l', 'backlog', 'Dev 4.4, 4.5, 4.6 (3 unserved, automation)', 'b', 'developer', 29),

('CRM Bitrix Integration', 'Подключить Bitrix для девелоперов', 'Many Bali developers use Bitrix instead of AMO. Expanding CRM integration to Bitrix widens the addressable market.', 'backlog', 'p2', 4, 'm', 'backlog', 'Dev CRM ecosystem expansion', 'c', 'developer', 30),

('Platform Feed Integration', 'Интеграция с площадками типа ProperStars — Unitbox как feed', 'Unitbox becomes a feed for listing platforms. Developers manage inventory once → publish to multiple platforms. XML generation for different formats.

Details pending after BREIG meeting about ProperStars specifics.', 'backlog', 'p3', 4, 'l', 'backlog', 'Dev distribution expansion', 'c', 'developer', 31),

('Admin Redesign', 'Перевести админку на Next.js + shadcn, обновить визуал', 'Rebuild the developer admin interface with modern components. Currently catalog admin uses older UI. New admin on Next.js + shadcn with simplified unit management.', 'backlog', 'p3', 4, 'l', 'backlog', 'Developer UX improvement', 'c', 'developer', 32),

('News & Events', 'Ход строительства → новости/ивенты для агентов', 'Transform construction progress into a news/events feed. Launch events, site visits, construction milestones — content agents actually share with clients.', 'backlog', 'p3', 4, 's', 'backlog', 'Agent engagement, Dev 10.4', 'c', 'agent', 33),

('Market Analysis Section', 'Раздел с анализом рынка и материалами партнеров', 'Content marketing: publish market analysis, partner research, investment guides. SEO value + positions Unitbox as market expert.', 'backlog', 'p3', 4, 's', 'backlog', 'Content marketing / SEO', 'c', NULL, 34),

('Mobile-first Redesign', 'Оптимизация под мобильные устройства', 'Agents work 80% from phones. Current responsive design may need mobile-first optimization. Audit current mobile UX first before committing.', 'backlog', 'p2', 4, 'l', 'audit', 'Agent mobile workflow', 'b', 'agent', 35),

('Saved Search & Alerts', 'Инвестор подписывается на критерии и получает алерты', 'Investor saves "2BR villa, $200-300K, Ubud" → gets alerts when matching units appear. Retention feature for later stage.', 'backlog', 'p3', 4, 'm', 'audit', 'Investor retention', 'c', 'investor', 36),

('Video Tours Embed', 'Kuula/Matterport embed в карточке юнита', 'Embed 3D virtual tours directly in unit pages. Kuula URLs already stored for some projects — just need the embed component.', 'backlog', 'p3', 4, 's', 'audit', 'Investor experience', 'c', 'investor', 37),

('Agent Onboarding Tour', 'Guided tour для новых агентов при первом входе', 'When a new agent logs in for the first time, guide them through key features: how to search, create offers, share via WhatsApp. Important at scale (50+ agencies).', 'backlog', 'p3', 4, 's', 'audit', 'Agent activation', 'c', 'agent', 38),

('Offer Attribution Tracking', 'Отслеживание влияния Unitbox на закрытые сделки', 'Critical for sales pitch to developers. 4-level attribution system:

Level 0 (NOW): Passive — log offer↔unit links, auto-correlate with sales (unit in offer → unit sold = correlated)
Level 1: + Engagement tracking (investor VIEWED unit → unit sold = HIGH confidence)
Level 2: + Lightweight deal tracker in Unitbox (Sent → Viewed → Interested → Negotiating → Closed)
Level 3: + Full CRM pipeline sync (bi-directional AMO/Bitrix)

Discussed with BREIG (2026-03-17): pipeline from agent fixes client → offer → unit reservation → deal closure.

Key metrics: offers created, offers viewed, correlated sales, revenue attributed, funnel conversion, time to close.

Sales pitch: "47 offers created → 38 viewed → 12 units sold → $3.2M correlated revenue through Unitbox"', 'backlog', 'p0', 3, 'm', 'strategy', 'Dev 6.1-6.6 (analytics), Agent 8.2.3 (deal tracking), Monetization foundation', 's', 'developer', 39);
