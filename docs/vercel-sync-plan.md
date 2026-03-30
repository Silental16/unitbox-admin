# Vercel Auto-Sync — Implementation Plan

## Overview

Migrate chess board auto-sync from local Node.js scripts to Vercel serverless API routes.

**Flow after migration:**
```
Google Drive Watch → webhook (Vercel) → /api/chess/sync (Vercel)
  → reads Google Sheets via OAuth
  → diffs with Supabase snapshot
  → simple changes → apply to prod API → Telegram report ✅
  → anomaly → log + Telegram alert 🚨
```

## Complexity: COMPLEX (5/6 medium triggers)

## New Environment Variables (Vercel Secrets)

| Env Var | Purpose | Source |
|---------|---------|--------|
| `GOOGLE_CLIENT_ID` | Sheets OAuth | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Sheets OAuth | Google Cloud Console |
| `GOOGLE_REFRESH_TOKEN` | Sheets OAuth | Existing local token |
| `CATALOG_API_BASE` | Prod catalog URL | catalog backend |
| `CATALOG_API_EMAIL` | Prod API login | catalog backend |
| `CATALOG_API_PASSWORD` | Prod API login | catalog backend |
| `SYNC_SECRET` | Internal endpoint auth | Generate random |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Supabase access | Already exists in Vercel |
| `TELEGRAM_SYNC_BOT_TOKEN` | Telegram alerts | Already exists in Vercel |
| `TELEGRAM_SYNC_CHAT_ID` | Telegram chat | Already exists in Vercel |

## Task Decomposition

### Task 1: Port pure-logic lib modules (no external deps)
**Files to create:**
- `lib/sync/parse-utils.ts` — port from parse-utils.js (price parsing, status normalization, column utils)
- `lib/sync/diff-engine.ts` — port from diff-engine.js (snapshot comparison, anomaly detection)
- `lib/sync/parsers/flat-table.ts` — port from parsers/flat-table.js (chess board parser)

**No external dependencies.** Direct TS port with proper types.

### Task 2: Create Google Sheets client for serverless
**File to create:** `lib/sync/sheets-client.ts`
**What it does:**
- OAuth token refresh via `fetch('https://oauth2.googleapis.com/token')` using env vars
- In-memory token cache (per invocation)
- `readRange(sheetId, range)` → `{rows: [{cells: [{value, bgColor}]}]}`
- `getSheetTabs(sheetId)` → `string[]`
- Rate limiting (1 req/sec via simple delay)

**Env vars:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`

### Task 3: Create catalog prod API client for serverless
**File to create:** `lib/sync/prod-client.ts`
**What it does:**
- Login via `POST /auth/sign-in` with email/password → JWT token
- In-memory token cache (per invocation)
- `loadProjectUnits(catalogId)` → Map of normalized name → {id, price, status, unitTypeId}
- `updateUnit(unitId, unitTypeId, data)` → applies price/status change
- Developer 61 safety: verify project belongs to dev 61 before writes

**Env vars:** `CATALOG_API_BASE`, `CATALOG_API_EMAIL`, `CATALOG_API_PASSWORD`

### Task 4: Create Supabase service client
**File to create:** `lib/sync/supabase-service.ts`
**What it does:**
- Creates Supabase client with `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
- `getSyncEnabledSources()` → chess sources with sync_enabled=true
- `updateChessSource(id, updates)` → update snapshot, anomaly, error count
- `logSyncEvent(projectId, action, summary, diff)` → insert project_change_log
- `logChangeLogEntry(projectId, changes)` → batch log unit-level changes

**Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### Task 5: Create sync orchestrator API route
**File to create:** `app/api/chess/sync/route.ts`
**What it does:**
- POST handler, auth via `Authorization: Bearer ${SYNC_SECRET}`
- Accepts optional body: `{ catalogIds?: number[], dryRun?: boolean }`
- For each sync-enabled source:
  1. Fetch sheet data via sheets-client
  2. Parse via flat-table parser
  3. Diff with snapshot via diff-engine
  4. If no blocking anomalies and not dryRun: apply via prod-client
  5. Update snapshot in Supabase
  6. Log everything
- Send Telegram summary
- Return JSON: `{synced, noChanges, anomalies, errors, details[]}`

**Pattern:** Follow `app/api/analytics/sync/route.ts` — CRON_SECRET auth guard, service role Supabase

### Task 6: Update webhook to trigger sync
**File to edit:** `app/api/webhook/sheets-changed/route.ts`
**Changes:**
- After logging + Telegram notification, call `/api/chess/sync` internally
- Use `fetch(new URL('/api/chess/sync', request.url), { method: 'POST', headers: { Authorization: Bearer SYNC_SECRET }, body: catalogIds })`
- Or use `after()` (Next.js 15.1+) for non-blocking execution
- Keep existing behavior (log, mark, notify) + add sync trigger

### Task 7: Update middleware to exempt sync route
**File to edit:** `middleware.ts`
**Changes:**
- Add `/api/chess/sync` to the list of exempted routes (alongside webhook and analytics/sync)

### Task 8: Update vercel.json for optional cron
**File to edit:** `vercel.json`
**Changes:**
- Add cron job: `"/api/chess/sync"` at `"17 */6 * * *"` (every 6 hours as fallback)
- This catches any missed webhooks

### Task 9: Create .conventions/ with discovered patterns
**Files to create:** `.conventions/gold-standards/api-route.ts`, `.conventions/gold-standards/lib-module.ts`

## Definition of Done

- Build passes: `npm run build` (ignore pre-existing agent-activity.tsx TS error)
- Middleware exempts new route
- `/api/chess/sync` accepts POST with SYNC_SECRET auth
- Webhook triggers sync after notification
- Google Sheets data is read via OAuth (no Python subprocess)
- Prod API changes applied via direct HTTP (no local prod-api.js)
- Supabase logging via service role key
- Telegram summary sent after each sync
- All secrets in env vars, no hardcoded tokens

## Security Measures

1. **SYNC_SECRET** — random 64-char hex, `crypto.timingSafeEqual` for comparison
2. **Webhook verification** — validate `x-goog-channel-token` matches expected format
3. **Dev 61 safety** — prod-client verifies developer ID before any write
4. **Service role key** — only for server-side routes, never exposed to browser
5. **No SQL injection** — use Supabase client methods, not raw SQL
