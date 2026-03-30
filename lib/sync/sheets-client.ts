/**
 * Google Sheets API client with OAuth token refresh, rate limiting, and retry.
 * Serverless-friendly: in-memory token cache (one invocation lifetime).
 */

import type { SheetCell, SheetRow, GridData } from "./parse-utils"

// Re-export so existing consumers don't break
export type { GridData }

// --- Types ---

interface SheetsColor {
  red?: number;
  green?: number;
  blue?: number;
}

// --- Token cache ---

let cachedToken: string | null = null;

async function getToken(forceRefresh = false): Promise<string> {
  if (cachedToken && !forceRefresh) return cachedToken;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN"
    );
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google OAuth token refresh failed (${res.status}): ${body.slice(0, 500)}`);
  }

  const data = await res.json();
  cachedToken = data.access_token as string;
  return cachedToken;
}

function invalidateToken() {
  cachedToken = null;
}

// --- Rate limiter (1 req/sec, concurrency-safe via promise chain) ---

let requestQueue: Promise<void> = Promise.resolve();

async function waitForRateLimit(): Promise<void> {
  const prev = requestQueue;
  let resolve!: () => void;
  requestQueue = new Promise<void>((r) => { resolve = r; });
  await prev;
  await new Promise((r) => setTimeout(r, 1000));
  resolve();
}

// --- Request with retry ---

async function sheetsRequest(url: string): Promise<unknown> {
  await waitForRateLimit();

  const token = await getToken();
  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(30000),
  });

  // Retry on 401 (token expired)
  if (res.status === 401) {
    invalidateToken();
    const newToken = await getToken(true);
    await waitForRateLimit();
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${newToken}` },
      signal: AbortSignal.timeout(30000),
    });
  }

  // Retry on 429 (rate limited)
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 10000));
    await waitForRateLimit();
    const tok = await getToken();
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${tok}` },
      signal: AbortSignal.timeout(30000),
    });
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API ${res.status}: ${body.slice(0, 500)}`);
  }

  return res.json();
}

// --- Color conversion ---

function rgbToHex(color: SheetsColor | null): string {
  if (!color) return "FFFFFFFF"; // default white
  const r = Math.round((color.red || 0) * 255);
  const g = Math.round((color.green || 0) * 255);
  const b = Math.round((color.blue || 0) * 255);
  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0").toUpperCase();
  return `FF${hex}`;
}

// --- Sheets API response types (minimal, for type safety) ---

interface SheetsApiCellData {
  formattedValue?: string;
  effectiveFormat?: { backgroundColor?: SheetsColor };
}

interface SheetsApiRowData {
  values?: SheetsApiCellData[];
}

interface SheetsApiGridData {
  rowData?: SheetsApiRowData[];
}

interface SheetsApiSheet {
  data?: SheetsApiGridData[];
  properties?: { title?: string };
}

interface SheetsApiResponse {
  sheets?: SheetsApiSheet[];
}

// --- Parse grid data ---

export function parseGridData(apiResponse: SheetsApiResponse): GridData {
  const rows: SheetRow[] = [];
  const sheets = apiResponse.sheets || [];
  for (const sheet of sheets) {
    const dataArr = sheet.data || [];
    for (const data of dataArr) {
      const rowData = data.rowData || [];
      for (const row of rowData) {
        const cells: SheetCell[] = [];
        const values = row.values || [];
        for (const cell of values) {
          const value: string | null = cell.formattedValue || null;
          const bg: SheetsColor | null = cell.effectiveFormat?.backgroundColor || null;
          cells.push({
            value,
            bgColor: rgbToHex(bg),
          });
        }
        rows.push({ cells });
      }
    }
  }
  return { rows };
}

// --- Public API ---

/**
 * Read a range from a Google Sheet with cell values and background colors.
 */
export async function readRange(sheetId: string, range: string): Promise<GridData> {
  const encodedRange = encodeURIComponent(range);
  const fields = encodeURIComponent(
    "sheets.data.rowData.values(formattedValue,effectiveFormat.backgroundColor)"
  );
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `?ranges=${encodedRange}&includeGridData=true&fields=${fields}`;
  const data = (await sheetsRequest(url)) as SheetsApiResponse;
  return parseGridData(data);
}

/**
 * Get all tab (sheet) names from a spreadsheet.
 */
export async function getSheetTabs(sheetId: string): Promise<string[]> {
  const fields = encodeURIComponent("sheets.properties.title");
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `?fields=${fields}`;
  const data = (await sheetsRequest(url)) as SheetsApiResponse;
  return (data.sheets || []).map((s) => s.properties?.title ?? "");
}
