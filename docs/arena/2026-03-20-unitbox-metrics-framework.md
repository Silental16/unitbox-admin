# Expert Arena: Metrics Framework for Unitbox

> **Status:** Partial consensus (4/5 converged, 1 VETO resolved)
> **Date:** 2026-03-20
> **Experts:** Lenny Rachitsky, Casey Winters, Alistair Croll, Andrew Chen, Jason Fried

---

## Verdict

Unitbox is a **pre-marketplace** in cold start phase. The unanimous agreement: **do NOT build a dashboard with 20 metrics**. Instead, use a staged OMTM (One Metric That Matters) approach that evolves as the business transitions from catalog to marketplace.

**Right now:** Track Catalog Density Score (quality of supply).
**Next:** Track Weekly Active Agencies (demand activation).
**Then:** Track Qualified Views per Listing (marketplace proof for developer sales).

---

## Key Business Context (from founder)

- Unitbox is pivoting from SaaS tool for developers → marketplace with agent traffic as value proposition
- **Chicken-and-egg:** developers pay if agents use platform; agents use if catalog has all projects
- **Plan:** Self-fill top 50-100 projects → attract agencies free → show traffic data → convert developers to paid
- Two salespeople: Shawn (cold B2B to 80 developers), Gleb (agency acquisition)
- Adding MLS for secondary market as additional agent value

---

## Debate Summary

### Phase 1: Initial Positions

**Lenny Rachitsky** opened with a 4-tier marketplace metrics framework: Collections-to-Deal Rate (fill rate) → Supply Health → Weekly Active Agents → GMV Pipeline. Argued that marketplace metrics are hierarchical and each tier activates when the previous one stabilizes.

**Casey Winters** countered with growth loop thinking: "Funnels (AARRR) will kill you. Measure the loop, not the steps." Proposed Catalog Density as the key metric — % of Bali projects fully represented in the catalog. Argued that until 60%+ coverage, the loop won't spin.

**Alistair Croll** was the most radical minimalist among the "pro-metrics" camp: ONE metric only. Weekly Active Engagement Rate. Argued Unitbox is at Stickiness stage, not Revenue. Attacked Lenny's 4-tier approach as dashboard bloat.

**Andrew Chen** focused on atomic networks: the smallest viable network for Unitbox = 1 developer + enough active agents generating deals. Proposed Match Rate per developer and HHI concentration index (BREIG at 70% = HHI 0.49, dangerously monopolistic).

**Jason Fried (Devil's Advocate)** threw the first VETO: "You have $1,088 in the bank and you're building a dashboard? Call your 12 clients. Call the 3 who left. Make BREIG pay. This is not an analytics problem."

### Phase 2: After Founder's Context (marketplace pivot)

The founder's input about the marketplace pivot caused significant position shifts:

**Lenny → shifted:** Dropped the dashboard entirely. "Jason is right here. On Phase 1, dashboard = waste." Proposed staged milestones instead: Supply Seeding → Demand Seeding → Matching. Warned against launching agency acquisition before catalog is ready: "First impression on a marketplace is irreversible."

**Casey → refined:** "Don't rush to call yourself a marketplace." Proposed Supply Activation Rate (% of projects getting at least 1 agent request/week) as the true PMF test. If <30%, "you have a catalog, not a marketplace."

**Alistair → held OMTM:** Changed from Weekly Active Engagement Rate to Catalog Density Score as current OMTM. Created a 5-stage OMTM ladder: Catalog Density → Agent Return Rate → Agent Referral Rate → Developer Conversion → GMV.

**Andrew → pivoted:** "Stop thinking about supply metrics. Supply is subsidized. All energy into demand activation." Proposed WAA (Weekly Active Agencies) as the one metric. Key insight: "When WAA grows even without you adding new projects — the subsidy worked and you can let go."

**Jason → maintained VETO** but softened: "One sheet of paper. Three lines. Updated weekly by hand." Proposed: Projects in catalog | Agencies | Paying developers. "When you have 100 projects and 50 agencies — we'll talk about metrics. Not before."

### Key Confrontations

**Casey → Lenny:** "Fill rate for a company with 12 clients is noise, not signal. In Grubhub we didn't measure fill rate until 200+ restaurants in one city."

**Lenny → Casey:** "Catalog Density 60% is right, but it's an operational milestone, not a North Star. You fill 50-100 projects, check manually — done."

**Alistair → Andrew:** "HHI and Match Rate require statistically significant data volume. You're proposing cargo cult metrics."

**Andrew → Jason:** "Without metrics you can't distinguish a working marketplace from a pretty database. That's an existential question for Unitbox."

**Jason → Everyone:** "Four smart people competing to propose the most elegant measurement system for a company that hasn't proven its product is needed by anyone."

**Lenny → Jason:** "I respect your approach, but you systematically underestimate marketplaces. Basecamp is single-sided. In a marketplace you can't just call and sell — value for one side DEPENDS on the other side being present."

---

## Consensus: Staged Metrics Framework

All experts converged on a staged approach (even Jason, whose "three lines" maps to the stages):

### Stage 1: Supply Seeding (NOW — next 6-8 weeks)

| Metric | Target | Source | Action if Below Target |
|--------|--------|--------|----------------------|
| **OMTM: Catalog Density Score** | 80% of 50+ projects "Agent-Ready" | Catalog DB: projects with complete data (units + prices + photos + floor plans + financial model) | Prioritize AI fill quality, not speed |
| Projects filled | 50 of top-100 | Manual count | Accelerate AI training |
| Time per project (AI) | <2 hours | Internal tracking | Optimize AI pipeline |

**"Agent-Ready" definition:** Project has: all unit types with prices, floor plans, at least 5 photos, financial model, bilingual descriptions (EN+RU). An agent can send this to a client WITHOUT additional questions to the developer.

### Stage 2: Demand Activation (after 50 Agent-Ready projects)

| Metric | Target | Source | Action if Below Target |
|--------|--------|--------|----------------------|
| **OMTM: Weekly Active Agencies (WAA)** | 10 agencies sending projects to clients/week | Amplitude: create_collection events grouped by agency | Gleb focuses on top 10 agencies, manual onboarding |
| Agent Return Rate (7-day) | >40% | Amplitude: session_start unique users returning within 7 days | Investigate UX friction, ask agents directly |
| Search-to-View Rate | >40% | Amplitude: map/search events → Page Viewed conversion | Improve search, add filters |

### Stage 3: Marketplace Proof (when WAA > 10 stable)

| Metric | Target | Source | Action if Below Target |
|--------|--------|--------|----------------------|
| **OMTM: Qualified Views per Listing per Week** | >5 agent views per project | Amplitude + DB: Page Viewed by project path, filtered to agent sessions | This is the DATA you show developers: "X agents viewed your project this week" |
| Supply Activation Rate | >30% projects with requests | Collections + Page Views per project | Fill gaps in catalog, improve low-performing listings |
| Developer Conversion Rate | >10% | Shawn's CRM: pitched → signed | Refine pitch, improve data presentation |

### Stage 4: Revenue (when developers start paying)

| Metric | Target | Source | Action if Below Target |
|--------|--------|--------|----------------------|
| **OMTM: MRR from new model** | $10K+ | Billing | Adjust pricing, improve value prop |
| Net Revenue Retention | >100% | Billing: expansion vs churn | Reduce churn, upsell features |
| HHI Concentration | <0.15 | Revenue by developer | Diversify client base |

---

## What NOT to Track (consensus)

All experts agreed these are vanity metrics for Unitbox's current stage:

- **DAU/MAU** — meaningless at this scale (Alistair, Jason)
- **Session duration** — can mean engagement OR confusion (Lenny)
- **Total page views** — zero information value (Lenny, Jason)
- **Retention cohorts** — statistically insignificant at <100 clients (all)
- **NPS** — just call them (Jason, Lenny)
- **GMV** — no transactions yet (Casey)
- **Growth loops** — premature, prove single cycle first (Casey self-correction)

---

## Remaining Disagreements

1. **MLS for secondary market:** Lenny says "NOT NOW, it's defocus." Others didn't address directly. Founder plans to add it.

2. **When to start agency acquisition:** Lenny insists "after 50 Agent-Ready projects, NOT BEFORE — first impression is irreversible." Casey agrees on sequencing. Andrew is more aggressive: start demand earlier to test atomic network viability.

3. **Jason's VETO on dashboards:** Partially resolved — all agreed to minimize, but Lenny/Casey/Andrew argue that Stage 2+ requires at least basic tracking in Amplitude. Jason accepts "three lines on paper" which maps to the staged approach.

---

## New Amplitude Events to Add

To support the metrics framework, instrument these events in the catalog:

| Event | Properties | Why |
|-------|-----------|-----|
| `project_viewed` | projectId, projectSlug, developerCode, userRole (agent/buyer) | Track Qualified Views per Listing |
| `unit_inquiry` | unitId, projectId, agencyCode | Track Match Rate and intent |
| `collection_sent` | collectionId, agencyCode, recipientType | Track WAA properly |
| `offer_opened` | collectionId, viewerCountry | Track demand-side engagement |

Current events (`create_collection`, `Page Viewed`) partially cover this, but need `projectId` and `userRole` enrichment.

---

## Action Items

1. **This week:** Define "Agent-Ready" checklist for projects (5-min task, not a dashboard)
2. **Weeks 1-6:** Fill 50 projects via AI, track count in Google Sheet
3. **Week 6:** Validate Catalog Density Score > 80% before launching agency acquisition
4. **Week 7+:** Gleb starts agency outreach. Track WAA in Amplitude.
5. **Week 10+:** Compile Qualified Views per Listing data. Shawn uses this for developer pitch.
6. **Do NOT build a dashboard until Stage 2.** Use Google Sheet or Amplitude's built-in charts.

---

## Expert Sources

- Lenny Rachitsky: [Marketplace Metrics](https://www.lennysnewsletter.com/p/the-most-important-marketplace-metrics), [Kickstart Marketplace](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace)
- Casey Winters: [Growth Loops](https://www.reforge.com/blog/growth-loops), [SaaS to Marketplace](https://caseyaccidental.com/saas-marketplace/)
- Alistair Croll: [Lean Analytics](https://leananalyticsbook.com/), [OMTM](https://www.oreilly.com/content/four-reasons-to-use-the-one-metric-that-matters/)
- Andrew Chen: [Cold Start Problem](https://a16z.com/books/the-cold-start-problem/), [13 Marketplace Metrics](https://a16z.com/13-metrics-for-marketplace-companies/)
- Jason Fried: [No Metrics at Basecamp](https://world.hey.com/jason/the-only-metric-that-matters-to-me-ada11073)
