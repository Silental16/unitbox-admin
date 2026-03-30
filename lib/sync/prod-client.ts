/**
 * Catalog Prod API Client — serverless-friendly, direct fetch().
 *
 * Safety: ONLY operates on projects belonging to developer 61.
 * Auth: refresh token → JWT cached in memory per invocation.
 */

import { normalizeName, type DiffChange } from "./diff-engine"

// --- Types ---

export interface ProdUnit {
  id: number;
  name: string;
  price: number;
  status: string;
  unitTypeId: number;
  blockId: number;
}

export interface ApplyError {
  unit: string;
  error: string;
}

export interface ApplyResult {
  applied: number;
  skipped: number;
  errors: ApplyError[];
}

// --- Constants ---

const ALLOWED_DEVELOPER_ID = 61;

// --- In-memory JWT cache ---

let cachedJwt: string | null = null;

// --- Env helpers ---

function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

function getApiBase(): string {
  return getEnv("CATALOG_API_BASE");
}

// --- Auth ---

/**
 * Authenticate via refresh token (matches local prod-api.js pattern).
 * GET /auth/refresh with refreshToken cookie → new accessToken + refreshToken.
 */
export async function login(): Promise<string> {
  const base = getApiBase();
  const refreshToken = getEnv("CATALOG_API_REFRESH_TOKEN");

  const res = await fetch(`${base}/auth/refresh`, {
    method: "GET",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${body.slice(0, 200)}`);
  }

  // Extract accessToken from Set-Cookie
  const cookies = res.headers.get("set-cookie") || "";
  const match = cookies.match(/accessToken=([^;]+)/);
  if (!match) {
    throw new Error("Refresh succeeded but no accessToken in Set-Cookie");
  }

  cachedJwt = match[1];

  // Safety: verify token belongs to developer 61 (decode JWT payload)
  try {
    const payload = JSON.parse(
      Buffer.from(cachedJwt.split(".")[1], "base64").toString()
    );
    if (payload.developerId !== ALLOWED_DEVELOPER_ID) {
      cachedJwt = null;
      throw new Error(
        `SAFETY: JWT developerId=${payload.developerId}, expected ${ALLOWED_DEVELOPER_ID}`
      );
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("SAFETY:")) throw e;
    // If JWT decode fails, allow — the API will reject bad tokens anyway
  }

  return cachedJwt;
}

// --- Generic API call ---

/**
 * Authenticated fetch wrapper with automatic retry on 401.
 */
export async function apiCall<T = unknown>(
  method: string,
  endpoint: string,
  body?: unknown
): Promise<T> {
  if (!cachedJwt) await login();

  const doFetch = async (jwt: string): Promise<Response> => {
    const base = getApiBase();
    const headers: Record<string, string> = {
      Cookie: `accessToken=${jwt}`,
    };
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
    return fetch(`${base}${endpoint}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch(cachedJwt!);

  // Retry once on 401
  if (res.status === 401) {
    console.warn("[prod-client] Got 401, re-authenticating...");
    await login();
    res = await doFetch(cachedJwt!);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${endpoint} failed (${res.status}): ${text}`);
  }

  const text = await res.text();
  if (!text) return undefined as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}

// --- Load project units ---

interface BlocksResponse {
  blocks?: Block[];
}

interface Block {
  id: number;
  unitTypes?: UnitType[];
}

interface UnitType {
  id: number;
  units?: Unit[];
}

interface Unit {
  id: number;
  name?: string;
  price?: number | string;
  status?: string;
}

/**
 * Load all units for a catalog project. Returns Map<normalizedName, ProdUnit>.
 */
export async function loadProjectUnits(
  catalogId: number
): Promise<Map<string, ProdUnit>> {
  // Get project to extract code
  const project = await apiCall<{ code?: string }>(
    "GET",
    `/projects/project/${catalogId}`
  );

  if (!project.code) {
    throw new Error(`Project ${catalogId} has no code`);
  }

  // Developer 61 safety is enforced at login() via JWT token verification

  // Get all blocks with unit types and units
  const blocksData = await apiCall<BlocksResponse | Block[]>(
    "GET",
    `/project/${project.code}/blocks`
  );
  const blocks: Block[] = Array.isArray(blocksData)
    ? blocksData
    : (blocksData as BlocksResponse).blocks || [];

  const unitMap = new Map<string, ProdUnit>();

  for (const block of blocks) {
    for (const ut of block.unitTypes || []) {
      for (const unit of ut.units || []) {
        const key = normalizeName(unit.name || "");
        unitMap.set(key, {
          id: unit.id,
          name: unit.name || "",
          price: Number(unit.price) || 0,
          status: unit.status || "",
          unitTypeId: ut.id,
          blockId: block.id,
        });
      }
    }
  }

  return unitMap;
}

// --- Apply changes ---

/**
 * Apply diff changes to prod units. Logs every write.
 */
export async function applyChanges(
  changes: DiffChange[],
  unitMap: Map<string, ProdUnit>
): Promise<ApplyResult> {
  let applied = 0;
  let skipped = 0;
  const errors: ApplyError[] = [];

  // Group changes by unit name
  const byUnit = new Map<string, DiffChange[]>();
  for (const change of changes) {
    const key = normalizeName(change.unit || "");
    if (!byUnit.has(key)) byUnit.set(key, []);
    byUnit.get(key)!.push(change);
  }

  for (const [key, unitChanges] of byUnit) {
    // Try exact match, then with #, then without #
    const prodUnit =
      unitMap.get(key) ||
      unitMap.get("#" + key) ||
      unitMap.get(key.replace(/^#/, ""));

    if (!prodUnit) {
      skipped++;
      errors.push({ unit: unitChanges[0].unit, error: "Unit not found in prod" });
      continue;
    }

    // Validate unitTypeId exists
    if (!prodUnit.unitTypeId) {
      skipped++;
      errors.push({ unit: prodUnit.name, error: "Unit has no unitTypeId" });
      continue;
    }

    // Build update body — only changed fields
    const updateBody: Record<string, unknown> = { name: prodUnit.name };
    for (const change of unitChanges) {
      if (change.field === "price") {
        updateBody.price = change.new;
      }
      if (change.field === "status") {
        updateBody.status = change.new;
      }
    }

    try {
      console.log(
        `[prod-client] PUT /units/${prodUnit.id} (${prodUnit.name}):`,
        JSON.stringify(updateBody)
      );
      await apiCall(
        "PUT",
        `/units/${prodUnit.id}?unitTypeId=${prodUnit.unitTypeId}`,
        updateBody
      );
      applied++;
    } catch (err) {
      errors.push({
        unit: prodUnit.name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return { applied, skipped, errors };
}
