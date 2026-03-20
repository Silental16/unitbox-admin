# Analytics Dashboard Redesign — Design Spec

## Overview

Complete redesign of the Unitbox Admin analytics dashboard, restructured based on product analytics expert review. Replaces the current flat single-page dashboard with a two-tab, filter-driven analytics system focused on actionable metrics.

## Data Sources

- **Amplitude Event Segmentation API** — sessions, page views, events, geography
- **Catalog PostgreSQL DB** — collections, units, user profiles, project→developer mapping
- **Computed** — developer health scores, WAR, effective collections

## Architecture

### Global Filters (URL-driven, affect all widgets)

| Filter | Type | URL Param | Values |
|--------|------|-----------|--------|
| Period | ToggleGroup | `?period=` | `7d`, `30d`, `90d`, `6m`, `all` |
| Developer | Multi-select Combobox | `?dev=` | `breig,teus` or omitted for all |

All filters persist in URL → shareable, bookmarkable.

### Tab Structure

Two tabs via shadcn `Tabs` component, selected tab stored in URL `?tab=agents|investors`.

### Developer Attribution

Developer is determined by **project ownership**, not subdomain. A hardcoded map `projectSlug → developerCode` is built from catalog DB data. Any page view on `/project/{slug}` or `/unit/{unitId}` is attributed to the project's owning developer regardless of which subdomain it's viewed on.

---

## Tab 1: Agent Activity

Information hierarchy: Hero → Activation → Detail.

### Hero Zone — KPI Cards (6 cards, grid)

| KPI | Source | Description |
|-----|--------|-------------|
| Active Agents | Catalog DB | Registered users with ≥1 session in period |
| DAU | Amplitude | Daily active users (exclude /preview/ paths) |
| WAR | Amplitude + DB | Weekly Active Rate = active agents this week / total registered agents |
| Collections Created | Amplitude | `create_collection` events in period |
| Effective Collections | Amplitude + DB | Collections with 2+ units AND 1+ investor view |
| Activation Rate | DB | % of registered agents who created ≥1 collection within 30 days |

Each card shows: value + delta vs previous period (Badge variant secondary/destructive).

### Activation Zone — Charts (2-col grid)

**DAU Trend** (area chart, left 2/3)
- Agent-only DAU over time
- Excludes /preview/ page views
- Recharts AreaChart, fillOpacity=0.15

**Collections Trend** (bar chart, right 1/3)
- Weekly collections created (green bars)
- Overlay: "viewed collections" as second series (lighter color)
- Shows gap between created and actually-viewed

### Detail Zone

**Agent→Collection Funnel** (horizontal funnel visualization)
- Steps: Browse Projects → Browse Units → Create Collection
- Computed from page view ratios
- Shows conversion rate between each step

**Top Agents Table** (sortable)
| Column | Source |
|--------|--------|
| Agent Name | DB |
| Role | DB |
| Agency | DB |
| Hours | DB (sessionDuration) |
| Collections | DB (createCollectionCount) |
| Offer Views | Amplitude (preview views on their collections) |
| Last Active | Amplitude (last session_start) |

**Developer Comparison Table** (visible when "All developers" selected)
| Column | Source |
|--------|--------|
| Developer | DB |
| Health Score | Computed (badge: green/yellow/red) |
| Sessions | Amplitude |
| Active Agents | Amplitude (unique users) |
| Collections | Amplitude |
| Offer Views | Amplitude (preview views) |
| Trend | Amplitude (sparkline mini-chart) |
| Churn Risk | Computed (flag if collections/week dropped >50% for 2+ weeks) |

Click developer name → applies developer filter to entire dashboard.

---

## Tab 2: Investor Activity

Information hierarchy: Hero → Engagement → Context.

### Hero Zone — Conversion Funnel

Vertical funnel:
1. Collections Created: N (full width)
2. Shared (has preview views): N (75% width)
3. Viewed by Investors: N (50% width)
4. Contact Click: "Not Yet Tracked" (25% width, muted)

Stubbed bottom steps with "Not Yet Tracked" label and note about needed instrumentation.

### Engagement Zone

**Investor KPIs** (4 cards)
| KPI | Description |
|-----|-------------|
| Unique Investors | Unique users viewing /preview/ paths |
| Preview Views | Total /preview/ page views |
| Views / Collection | Avg investor views per collection |
| % Target Markets | % of investor views from Russia, Indonesia, UAE, Germany |

**Top Offers Table** (sortable)
| Column | Source |
|--------|--------|
| Collection # | DB |
| Created By | DB |
| Developer | DB (via project ownership) |
| Units | DB |
| Unique Viewers | Amplitude |
| Total Views | Amplitude |

**Most Offered Units** (list)
- Top units by frequency in collections
- Shows: unit name, in N offers

### Context Zone (2-col grid)

**Investor Traffic Trend** (area chart)
- Preview page views over time
- Amber/orange color to distinguish from agent chart

**Investor Geography** (donut chart + table)
- Top 5 countries with percentages
- "Other" bucket for remaining
- Table: top 8 cities

---

## Developer Health Score

Composite score (0-100) computed from 4 signals:

| Signal | Weight | Calculation |
|--------|--------|-------------|
| Activity Trend | 30% | Sessions this period vs previous (growth = 100, stable = 70, declining = 30) |
| Collections/Agent | 25% | Collections created / active agents (benchmarked against platform average) |
| Investor Reach | 25% | Preview views / collections (how effective are their offers) |
| Content Completeness | 20% | % of projects with amenities + infrastructure + financial model filled |

Score → Badge:
- 70-100: Green (healthy)
- 40-69: Yellow (attention needed)
- 0-39: Red (churn risk)

---

## Removed Metrics (per expert review)

| Metric | Reason |
|--------|--------|
| Avg Session Duration | Unreliable — agents leave tabs open, inflates to 64min |
| D30 Retention | Wrong for B2B — replaced with WAR |
| Feature Usage bars | Vanity — replaced with funnel |
| Viral Coefficient | Can't calculate without share tracking |
| Geography count | Vanity — replaced with % target markets |
| Map feature stats | Dead feature (14 searches in 6 months) |

---

## File Plan

### Modified Files
- `lib/data/analytics.ts` — complete rewrite (types + queries)
- `app/(dashboard)/analytics/page.tsx` — new params, new data fetches
- `app/(dashboard)/analytics/loading.tsx` — new skeleton
- `components/analytics/dashboard-view.tsx` — rewrite with tabs
- `components/analytics/kpi-cards.tsx` — delete (replaced by tab-specific KPIs)
- `components/analytics/period-selector.tsx` — add 6m option
- `components/analytics/traffic-chart.tsx` — rename to agent-trend-chart
- `components/analytics/geography-charts.tsx` — keep, minor refactor
- `components/analytics/session-distribution.tsx` — delete
- `components/analytics/retention-table.tsx` — delete
- `components/analytics/developer-activity.tsx` — delete (replaced by developer-table)
- `components/analytics/agent-activity.tsx` — delete (replaced by top-agents-table)

### New Files
- `components/analytics/developer-filter.tsx`
- `components/analytics/agent-kpi-cards.tsx`
- `components/analytics/agent-trend-chart.tsx`
- `components/analytics/collections-chart.tsx`
- `components/analytics/agent-funnel.tsx`
- `components/analytics/top-agents-table.tsx`
- `components/analytics/developer-table.tsx`
- `components/analytics/developer-health.tsx`
- `components/analytics/investor-kpi-cards.tsx`
- `components/analytics/investor-trend-chart.tsx`
- `components/analytics/top-offers-table.tsx`
- `components/analytics/offered-units.tsx`
- `components/analytics/conversion-funnel.tsx`
- `components/analytics/investor-geography.tsx`

### Task Dependencies
```
Task 1 (Data Layer) ──→ Task 2 (Shell) ──→ Task 3 (Agent Tab)
                                        ──→ Task 4 (Investor Tab)
                                        ──→ Task 5 (Developer Table)
                                        ──→ Task 6 (Conventions)
```

Tasks 3, 4, 5 run in parallel with 3 coders.

## Tech Stack

- Next.js 16 App Router (server components + "use client" for interactive)
- shadcn/ui (Cards, Tables, Badges, Tabs, ToggleGroup, Combobox)
- Recharts (AreaChart, BarChart, PieChart wrapped in ChartContainer)
- Amplitude Event Segmentation API v2 (Basic auth, 1h cache)
- Catalog PostgreSQL (via Docker, project→developer mapping)
