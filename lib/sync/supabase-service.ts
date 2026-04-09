/**
 * Supabase service client for sync operations.
 * Uses service role key to bypass RLS.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// --- Types ---

export interface ChessSource {
  id: string;
  project_id: string;
  sheets_url: string;
  sheet_name: string;
  sync_enabled: boolean;
  sync_config: Record<string, unknown> | null;
  unit_snapshot: Record<string, unknown> | null;
  last_anomaly: Record<string, unknown> | null;
  sync_error_count: number;
  last_successful_sync: string | null;
  catalog_id: number;
  project_name: string;
  project_uuid: string;
}

// --- Client singleton ---

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  client = createClient(url, serviceKey);
  return client;
}

// --- Public API ---

/**
 * Get all sync-enabled chess sources for published projects.
 */
export async function getSyncEnabledSources(): Promise<ChessSource[]> {
  const sb = getClient();

  const { data, error } = await sb
    .from("project_chess_sources")
    .select(
      "*, catalog_projects!inner(catalog_id, name, id)"
    )
    .eq("sync_enabled", true)
    .eq("catalog_projects.status", "published")
    .order("catalog_projects(catalog_id)", { ascending: true });

  if (error) throw new Error(`getSyncEnabledSources failed: ${error.message}`);

  // Flatten the joined data to match the original shape
  return (data || []).map((row) => {
    const cp = row.catalog_projects as Record<string, unknown>;
    return {
      ...row,
      catalog_id: cp.catalog_id as number,
      project_name: cp.name as string,
      project_uuid: cp.id as string,
      catalog_projects: undefined,
    } as ChessSource;
  });
}

/**
 * Acquire a sync lock on a chess source. Returns true if lock acquired.
 * Uses optimistic locking: only succeeds if sync_in_progress is null or expired (>5 min).
 */
export async function acquireSyncLock(sourceId: string): Promise<boolean> {
  const sb = getClient();
  const now = new Date().toISOString();
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  // Try to lock: only update if not currently locked (null) or lock expired
  // First try: sync_in_progress IS NULL
  const { data: d1 } = await sb
    .from("project_chess_sources")
    .update({ sync_in_progress: now })
    .eq("id", sourceId)
    .is("sync_in_progress", null)
    .select("id");

  if (d1 && d1.length > 0) return true;

  // Second try: sync_in_progress is stale (>5 min ago)
  const { data: d2 } = await sb
    .from("project_chess_sources")
    .update({ sync_in_progress: now })
    .eq("id", sourceId)
    .lt("sync_in_progress", fiveMinAgo)
    .select("id");

  return !!(d2 && d2.length > 0);
}

/**
 * Release sync lock on a chess source.
 */
export async function releaseSyncLock(sourceId: string): Promise<void> {
  const sb = getClient();
  await sb
    .from("project_chess_sources")
    .update({ sync_in_progress: null })
    .eq("id", sourceId);
}

/**
 * Update chess source after sync (snapshot, anomaly, error count, last sync time).
 */
export async function updateChessSource(
  id: string,
  updates: {
    unit_snapshot?: Record<string, unknown>;
    last_successful_sync?: boolean;
    last_anomaly?: Record<string, unknown> | null;
    sync_error_count?: number;
    sync_config?: Record<string, unknown>;
    columns_hash?: string;
  }
): Promise<void> {
  const sb = getClient();

  const patch: Record<string, unknown> = {};

  if (updates.unit_snapshot !== undefined) {
    patch.unit_snapshot = updates.unit_snapshot;
  }
  if (updates.last_successful_sync !== undefined) {
    patch.last_successful_sync = new Date().toISOString();
  }
  if (updates.last_anomaly !== undefined) {
    patch.last_anomaly = updates.last_anomaly;
  }
  if (updates.sync_error_count !== undefined) {
    patch.sync_error_count = updates.sync_error_count;
  }
  if (updates.sync_config) {
    patch.sync_config = updates.sync_config;
  }

  if (Object.keys(patch).length === 0 && !updates.columns_hash) return;

  // Handle columns_hash merge into sync_config
  if (updates.columns_hash) {
    if (patch.sync_config) {
      // sync_config already set above — merge columns_hash into it
      patch.sync_config = { ...(patch.sync_config as Record<string, unknown>), columns_hash: updates.columns_hash };
    } else {
      // Fetch existing sync_config from DB, then merge
      const { data: current } = await sb
        .from("project_chess_sources")
        .select("sync_config")
        .eq("id", id)
        .single();

      const existingConfig = (current?.sync_config as Record<string, unknown>) || {};
      patch.sync_config = { ...existingConfig, columns_hash: updates.columns_hash };
    }
  }

  const { error } = await sb
    .from("project_chess_sources")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(`updateChessSource failed: ${error.message}`);
}

/**
 * Log a sync event to project_change_log.
 */
export async function logSyncEvent(
  projectId: string,
  action: string,
  summary: string,
  diff: Record<string, unknown> | null,
  source: "cron" | "webhook" | "manual" = "cron"
): Promise<void> {
  const sb = getClient();

  const { error } = await sb.from("project_change_log").insert({
    project_id: projectId,
    source,
    action,
    summary,
    diff: diff ? JSON.stringify(diff) : null,
  });

  if (error) throw new Error(`logSyncEvent failed: ${error.message}`);
}

/**
 * Get ALL chess sources (regardless of sync_enabled) for projects belonging to a specific developer.
 * Used by setup endpoint to find unconfigured sources.
 */
export async function getAllSourcesForDeveloper(_developerId: number): Promise<ChessSource[]> {
  // Note: developer_id in Supabase is a UUID (FK to internal developers table),
  // not the catalog integer ID. Since ALL chess sources in Supabase are dev61 projects,
  // we return all sources. When other developers are added, filter via developer_id UUID.
  const sb = getClient();

  const { data, error } = await sb
    .from("project_chess_sources")
    .select(
      "*, catalog_projects!inner(catalog_id, name, id)"
    )
    .order("catalog_projects(catalog_id)", { ascending: true });

  if (error) throw new Error(`getAllSourcesForDeveloper failed: ${error.message}`);

  return (data || []).map((row) => {
    const cp = row.catalog_projects as Record<string, unknown>;
    return {
      ...row,
      catalog_id: cp.catalog_id as number,
      project_name: cp.name as string,
      project_uuid: cp.id as string,
      catalog_projects: undefined,
    } as ChessSource;
  });
}

/**
 * Update a chess source with auto-detected config. Does NOT enable sync.
 */
export async function saveAutoDetectedConfig(
  sourceId: string,
  syncConfig: Record<string, unknown>,
  snapshot: Record<string, unknown>,
  columnsHash: string
): Promise<void> {
  const sb = getClient();

  const { error } = await sb
    .from("project_chess_sources")
    .update({
      sync_config: { ...syncConfig, columns_hash: columnsHash },
      unit_snapshot: snapshot,
      sync_enabled: false,
    })
    .eq("id", sourceId);

  if (error) throw new Error(`saveAutoDetectedConfig failed: ${error.message}`);
}

/**
 * Get projects by their catalog IDs (for webhook validation).
 */
export async function getProjectsByIds(
  catalogIds: number[]
): Promise<Array<{ id: string; catalog_id: number; name: string }>> {
  const sb = getClient();

  const { data, error } = await sb
    .from("catalog_projects")
    .select("id, catalog_id, name")
    .in("catalog_id", catalogIds);

  if (error) throw new Error(`getProjectsByIds failed: ${error.message}`);
  return data || [];
}
