/**
 * parse-utils.ts — Shared utilities for parsing chess board data
 */

import { createHash } from "crypto"

// --- Types ---

export interface SheetCell {
  value: string | number | null | undefined
  bgColor?: string
}

export interface SheetRow {
  cells: SheetCell[]
}

export interface GridData {
  rows: SheetRow[]
}

export interface SyncConfig {
  status_method?: string
  status_col?: string
  status_color_target?: string
  text_legend?: Record<string, string>
  color_legend?: Record<string, string>
  unit_name_col?: string
  price_col?: string
  header_row?: number
  data_start_row?: number
  data_end_row?: number
  layout_type?: string
}

export type UnitStatus = "available" | "sold" | "reserved" | "blocked"

export interface ParsedUnit {
  name: string
  price: number | null
  status: string
  row: number
}

// --- Functions ---

/**
 * Parse price string to number, return null if unparseable.
 */
export function parsePrice(raw: string | number | null | undefined): number | null {
  if (raw == null || raw === "") return null
  const s = String(raw).trim()
  if (s === "") return null

  // Known non-numeric values
  const skip = ["sold", "n/a", "-", "—", "–", "#ref!"]
  if (skip.includes(s.toLowerCase())) return null

  // Strip dollar sign
  let cleaned = s.replace(/^\$\s*/, "")

  // Detect European format: "190 000,00" — comma followed by exactly 2 digits at end
  if (/,\d{2}$/.test(cleaned)) {
    cleaned = cleaned.replace(/,\d{2}$/, "")
  }

  // Remove spaces and commas (thousand separators)
  cleaned = cleaned.replace(/[\s,]/g, "")

  // Must be a valid number now
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null

  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

/**
 * Case-insensitive text legend lookup with built-in defaults.
 */
export function lookupText(
  raw: string | number | null | undefined,
  textLegend: Record<string, string> | null | undefined
): string | null {
  if (raw == null) return null
  const s = String(raw).trim().toLowerCase()
  if (s === "") return null

  // Check user-provided legend first
  if (textLegend) {
    for (const [key, val] of Object.entries(textLegend)) {
      if (key.toLowerCase() === s) return val
    }
  }

  // Built-in defaults
  const defaults: Record<string, string> = {
    available: "available",
    "for sale": "available",
    "in sale": "available",
    "not sold": "available",
    resale: "available",
    "re-sale": "available",
    sold: "sold",
    продано: "sold",
    продан: "sold",
    booked: "reserved",
    reserved: "reserved",
    бронь: "reserved",
    reservation: "reserved",
    deposit: "reserved",
    депозит: "reserved",
    shareholding: "reserved",
    blocked: "blocked",
  }

  if (defaults[s]) return defaults[s]

  // Prefix match: "Депозит Иванов" or "deposit John" → reserved
  if (s.startsWith("депозит") || s.startsWith("deposit")) return "reserved"

  return null
}

/**
 * Normalize status to catalog values.
 */
export function normalizeStatus(status: string | null | undefined): string | null {
  if (!status) return null
  const s = String(status).trim().toLowerCase()
  const valid = ["available", "sold", "reserved", "blocked"]
  if (valid.includes(s)) return s
  return lookupText(s, null) || null
}

/**
 * Read unit status from a row based on config.
 */
export function readStatus(
  row: SheetRow,
  config: SyncConfig,
  priceColIndex: number
): string | null {
  const method = config.status_method

  if (method === "text_col") {
    const idx = colLetterToIndex(config.status_col)
    const cell = row.cells[idx]
    if (!cell) return null
    return normalizeStatus(lookupText(cell.value, config.text_legend))
  }

  if (method === "bg_color") {
    let cell: SheetCell | undefined
    const target = config.status_color_target || "row"
    if (target === "price_cell") {
      cell = row.cells[priceColIndex]
    } else if (target === "cell") {
      const idx = colLetterToIndex(config.status_col)
      cell = row.cells[idx]
    } else {
      cell = row.cells[0]
    }
    if (!cell || !cell.bgColor) return null
    const legend = config.color_legend || {}
    const color = cell.bgColor.toLowerCase()
    for (const [key, val] of Object.entries(legend)) {
      if (key.toLowerCase() === color) return normalizeStatus(val)
    }
    return null
  }

  if (method === "text_in_price") {
    const cell = row.cells[priceColIndex]
    if (!cell) return null
    const textResult = lookupText(cell.value, config.text_legend)
    if (textResult) return normalizeStatus(textResult)
    if (parsePrice(cell.value) !== null) return "available"
    return null
  }

  if (method === "dash_means_sold") {
    const cell = row.cells[priceColIndex]
    if (!cell) return "sold"
    const v = String(cell.value || "").trim()
    if (v === "" || v === "-" || v === "—" || v === "–") return "sold"
    return "available"
  }

  if (method === "bool_col") {
    const idx = colLetterToIndex(config.status_col)
    const cell = row.cells[idx]
    if (!cell) return "available"
    return String(cell.value).toUpperCase() === "TRUE" ? "sold" : "available"
  }

  if (method === "mixed") {
    const idx = colLetterToIndex(config.status_col)
    const cell = row.cells[idx]
    if (cell && cell.value) {
      const textResult = lookupText(cell.value, config.text_legend)
      if (textResult) return normalizeStatus(textResult)
    }
    let colorCell: SheetCell | undefined
    const target = config.status_color_target || "row"
    if (target === "price_cell") {
      colorCell = row.cells[priceColIndex]
    } else if (target === "cell") {
      colorCell = row.cells[idx]
    } else {
      colorCell = row.cells[0]
    }
    if (colorCell && colorCell.bgColor) {
      const legend = config.color_legend || {}
      const color = colorCell.bgColor.toLowerCase()
      for (const [key, val] of Object.entries(legend)) {
        if (key.toLowerCase() === color) return normalizeStatus(val)
      }
    }
    return null
  }

  return null
}

/**
 * Convert column letter to 0-based index: A→0, B→1, Z→25, AA→26
 * Also accepts numbers (returned as-is).
 */
export function colLetterToIndex(letter: string | number | null | undefined): number {
  if (letter == null) return 0
  if (typeof letter === "number") return letter
  const s = String(letter).toUpperCase()
  let index = 0
  for (let i = 0; i < s.length; i++) {
    index = index * 26 + (s.charCodeAt(i) - 64)
  }
  return index - 1
}

/**
 * Convert 0-based column index to letter: 0→A, 1→B, 25→Z, 26→AA
 */
export function indexToColLetter(num: number): string {
  let result = ""
  let n = num + 1
  while (n > 0) {
    n--
    result = String.fromCharCode(65 + (n % 26)) + result
    n = Math.floor(n / 26)
  }
  return result
}

/**
 * SHA-256 of header row values joined by "|", first 16 chars.
 */
export function computeColumnsHash(row: SheetRow): string {
  const values = row.cells
    .map((c) => (c.value != null ? String(c.value) : ""))
    .join("|")
  return createHash("sha256").update(values).digest("hex").slice(0, 16)
}
