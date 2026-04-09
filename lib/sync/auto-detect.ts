/**
 * Auto-detection of chess board column mappings from Google Sheets headers.
 */

import { readRange } from "./sheets-client"
import { computeColumnsHash, indexToColLetter } from "./parse-utils"
import type { GridData } from "./parse-utils"

// --- Types ---

interface DetectedConfig {
  unit_name_col: string | null
  price_col: string | null
  status_col: string | null
  status_method: string
  header_row: number
  data_start_row: number
  data_end_row: number | null
  columns_hash: string
}

export interface DetectionResult {
  sourceId: string
  sheetName: string
  detected: DetectedConfig | null
  confidence: "high" | "low" | "failed"
  reason?: string
}

// --- Patterns ---

const NAME_PATTERNS = /\b(unit|villa|apt|type|name|номер|тип)\b/i
const PRICE_PATTERNS = /\b(price|usd|цена|стоимость)\b|\$/i
const STATUS_PATTERNS = /\b(status|статус|available|sold)\b/i

// --- Helpers ---

function scanRow(
  gridData: GridData,
  rowIdx: number
): { nameCol: string | null; priceCol: string | null; statusCol: string | null } {
  const row = gridData.rows[rowIdx]
  if (!row?.cells) return { nameCol: null, priceCol: null, statusCol: null }

  let nameCol: string | null = null
  let priceCol: string | null = null
  let statusCol: string | null = null

  for (let i = 0; i < row.cells.length; i++) {
    const val = row.cells[i].value
    if (val == null) continue
    const s = String(val).trim()
    if (!s) continue

    if (!nameCol && NAME_PATTERNS.test(s)) {
      nameCol = indexToColLetter(i)
    }
    if (!priceCol && PRICE_PATTERNS.test(s)) {
      priceCol = indexToColLetter(i)
    }
    if (!statusCol && STATUS_PATTERNS.test(s)) {
      statusCol = indexToColLetter(i)
    }
  }

  return { nameCol, priceCol, statusCol }
}

// --- Public API ---

/**
 * Auto-detect column mappings for a chess board sheet.
 * Fetches first 5 rows and scans for header patterns.
 */
export async function autoDetect(
  sheetId: string,
  sheetName: string,
  sourceId: string
): Promise<DetectionResult> {
  try {
    const range = sheetName
      ? `'${sheetName}'!A1:Z5`
      : "A1:Z5"

    const gridData = await readRange(sheetId, range)

    if (!gridData.rows || gridData.rows.length === 0) {
      return {
        sourceId,
        sheetName,
        detected: null,
        confidence: "failed",
        reason: "Sheet returned no rows",
      }
    }

    // Scan each of the first 5 rows for header patterns
    for (let rowIdx = 0; rowIdx < Math.min(5, gridData.rows.length); rowIdx++) {
      const { nameCol, priceCol, statusCol } = scanRow(gridData, rowIdx)

      if (nameCol && priceCol) {
        // High confidence — both key columns found
        const headerRow = gridData.rows[rowIdx]
        const columnsHash = computeColumnsHash(headerRow)

        return {
          sourceId,
          sheetName,
          detected: {
            unit_name_col: nameCol,
            price_col: priceCol,
            status_col: statusCol,
            status_method: statusCol ? "text_col" : "text_in_price",
            header_row: rowIdx + 1,
            data_start_row: rowIdx + 2,
            data_end_row: null,
            columns_hash: columnsHash,
          },
          confidence: "high",
        }
      }

      if (nameCol || priceCol) {
        // Low confidence — only one column found
        const headerRow = gridData.rows[rowIdx]
        const columnsHash = computeColumnsHash(headerRow)
        const missing = !nameCol ? "unit name column" : "price column"

        return {
          sourceId,
          sheetName,
          detected: {
            unit_name_col: nameCol,
            price_col: priceCol,
            status_col: statusCol,
            status_method: "text_in_price",
            header_row: rowIdx + 1,
            data_start_row: rowIdx + 2,
            data_end_row: null,
            columns_hash: columnsHash,
          },
          confidence: "low",
          reason: `Missing ${missing}`,
        }
      }
    }

    return {
      sourceId,
      sheetName,
      detected: null,
      confidence: "failed",
      reason: "Could not find name or price columns in first 5 rows",
    }
  } catch (err) {
    return {
      sourceId,
      sheetName,
      detected: null,
      confidence: "failed",
      reason: err instanceof Error ? err.message : String(err),
    }
  }
}
