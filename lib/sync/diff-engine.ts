/**
 * Diff Engine — compares old snapshot with newly parsed units.
 * Pure logic module, no external dependencies.
 */

import type { ParsedUnit } from "./parse-utils"

// --- Types ---

export type { ParsedUnit }

export interface SnapshotUnit {
  name: string
  price: number | null
  status: string | null
  unitId?: number
  unitTypeId?: number
  row?: number
}

export interface DiffChange {
  unit: string
  unitId?: number
  field: "price" | "status"
  old: number | string | null
  new: number | string | null
  pctChange?: number | null
}

export interface DiffAnomaly {
  type: "suspicious_price_change" | "missing_unit" | "mass_status_change"
  details: string
}

export interface DiffStats {
  total: number
  matched: number
  priceChanged: number
  statusChanged: number
  missing: number
  added: number
  unitsSold: number
  unitsBooked: number
}

export interface DiffResult {
  changes: DiffChange[]
  anomalies: DiffAnomaly[]
  stats: DiffStats
  newSnapshot: SnapshotUnit[]
}

// --- Raw snapshot types (legacy formats) ---

interface RawSnapshotUnit {
  name?: string
  unitName?: string
  sheetName?: string
  price?: number | null
  sheetPrice?: number | null
  prodPrice?: number | null
  status?: string | null
  sheetStatus?: string | null
  prodStatus?: string | null
  unitId?: number
  unitTypeId?: number
  row?: number
}

type RawSnapshot =
  | null
  | undefined
  | RawSnapshotUnit[]
  | { units?: RawSnapshotUnit[] }

// --- Functions ---

export function normalizeName(name: string): string {
  return String(name).toLowerCase().trim().replace(/^#/, "").replace(/\s+/g, " ")
}

/**
 * Normalize snapshot from various legacy formats to SnapshotUnit[].
 * Handles: null, object with .units key, arrays with unitName/sheetPrice/sheetStatus fields.
 */
export function normalizeSnapshot(raw: RawSnapshot): SnapshotUnit[] {
  if (!raw) return []
  let arr: RawSnapshotUnit[]
  if (Array.isArray(raw)) {
    arr = raw
  } else {
    arr = Array.isArray(raw.units) ? raw.units : []
  }
  return arr.map((u) => ({
    name: u.name || u.unitName || u.sheetName || "",
    price: u.price ?? u.sheetPrice ?? u.prodPrice ?? null,
    status: u.status || u.sheetStatus || u.prodStatus || null,
    unitId: u.unitId || undefined,
    unitTypeId: u.unitTypeId || undefined,
    row: u.row || undefined,
  }))
}

export function diff(oldSnapshot: SnapshotUnit[], newUnits: ParsedUnit[]): DiffResult {
  const changes: DiffChange[] = []
  const anomalies: DiffAnomaly[] = []

  // Build lookup from old snapshot by normalized name
  const oldMap = new Map<string, SnapshotUnit>()
  for (const u of oldSnapshot) {
    oldMap.set(normalizeName(u.name), u)
  }

  // Build lookup from new units by normalized name
  const newMap = new Map<string, ParsedUnit>()
  for (const u of newUnits) {
    newMap.set(normalizeName(u.name), u)
  }

  let priceChanged = 0
  let statusChanged = 0
  let unitsSold = 0
  let unitsBooked = 0
  let matched = 0

  // Compare old → new
  for (const [normName, oldUnit] of oldMap) {
    const newUnit = newMap.get(normName)
    if (!newUnit) continue
    matched++

    // Price change (skip if old price is 0 or null — means snapshot was incomplete)
    if (
      oldUnit.price != null &&
      newUnit.price != null &&
      oldUnit.price !== newUnit.price
    ) {
      const pctChange =
        oldUnit.price > 0
          ? Math.round(
              ((newUnit.price - oldUnit.price) / oldUnit.price) * 1000
            ) / 10
          : null // can't compute % from zero base
      changes.push({
        unit: oldUnit.name,
        unitId: oldUnit.unitId,
        field: "price",
        old: oldUnit.price,
        new: newUnit.price,
        pctChange,
      })
      priceChanged++

      if (pctChange != null && Math.abs(pctChange) > 50) {
        anomalies.push({
          type: "suspicious_price_change",
          details: `Unit ${oldUnit.name} price changed ${pctChange}% (${oldUnit.price} → ${newUnit.price})`,
        })
      }
    }

    // Status change
    if (
      oldUnit.status != null &&
      newUnit.status != null &&
      oldUnit.status !== newUnit.status
    ) {
      changes.push({
        unit: oldUnit.name,
        unitId: oldUnit.unitId,
        field: "status",
        old: oldUnit.status,
        new: newUnit.status,
      })
      statusChanged++

      if (newUnit.status === "sold") unitsSold++
      if (newUnit.status === "reserved") unitsBooked++
    }
  }

  // Missing units (in old but not in new)
  const missingUnits: string[] = []
  for (const [normName, oldUnit] of oldMap) {
    if (!newMap.has(normName)) {
      missingUnits.push(oldUnit.name)
    }
  }
  if (missingUnits.length > 0) {
    anomalies.push({
      type: "missing_unit",
      details: `${missingUnits.length} unit(s) missing: ${missingUnits.join(", ")}`,
    })
  }

  // Added units (in new but not in old)
  const addedUnits: string[] = []
  for (const [normName] of newMap) {
    if (!oldMap.has(normName)) {
      addedUnits.push(normName)
    }
  }

  // Mass status change anomaly
  if (oldSnapshot.length > 0 && statusChanged > oldSnapshot.length * 0.5) {
    anomalies.push({
      type: "mass_status_change",
      details: `${statusChanged} of ${oldSnapshot.length} units changed status`,
    })
  }

  // Build new snapshot — preserve unitId from old where matched
  const newSnapshot: SnapshotUnit[] = newUnits.map((u) => {
    const oldUnit = oldMap.get(normalizeName(u.name))
    return {
      name: u.name,
      price: u.price,
      status: u.status,
      row: u.row,
      unitId: oldUnit ? oldUnit.unitId : undefined,
    }
  })

  const stats: DiffStats = {
    total: newUnits.length,
    matched,
    priceChanged,
    statusChanged,
    missing: missingUnits.length,
    added: addedUnits.length,
    unitsSold,
    unitsBooked,
  }

  return { changes, anomalies, stats, newSnapshot }
}

export function hasBlockingAnomaly(
  anomalies: DiffAnomaly[],
  stats?: DiffStats
): boolean {
  return anomalies.some((a) => {
    if (a.type === "mass_status_change") return true
    // missing_unit is blocking only when >50% of expected units are missing
    // (partial tab coverage is expected for multi-tab projects)
    if (a.type === "missing_unit" && stats) {
      const total = stats.matched + stats.missing
      return total > 0 && stats.missing > total * 0.5
    }
    return a.type === "missing_unit" // fallback if no stats
  })
}
