/**
 * Flat Table Parser — each row is one unit.
 *
 * Reads unit name, price, and status from configured columns.
 * Skips empty rows and rows where unit_name_col is empty.
 */

import type { GridData, SyncConfig, ParsedUnit } from "../parse-utils"
import { parsePrice, readStatus, colLetterToIndex, computeColumnsHash } from "../parse-utils"

// --- Types ---

export interface ParseError {
  row: number
  name: string
  error: string
}

export interface ParseResult {
  units: ParsedUnit[]
  columnsHash: string
  errors: ParseError[]
}

// --- Parser ---

/**
 * Parse units from a flat table sheet.
 */
export function parse(gridData: GridData, syncConfig: SyncConfig): ParseResult {
  const nameColIdx = colLetterToIndex(syncConfig.unit_name_col)
  const priceColIdx = colLetterToIndex(syncConfig.price_col)
  const headerRowIdx = (syncConfig.header_row || 1) - 1 // 0-based
  const startRowIdx = (syncConfig.data_start_row || 2) - 1
  const endRowIdx = syncConfig.data_end_row
    ? syncConfig.data_end_row - 1
    : gridData.rows.length - 1

  // Compute header hash for structural change detection
  const headerRow = gridData.rows[headerRowIdx]
  if (!headerRow?.cells) {
    return { units: [], columnsHash: "", errors: [{ row: headerRowIdx + 1, name: "", error: "Header row missing or empty" }] }
  }
  const columnsHash = computeColumnsHash(headerRow)

  const units: ParsedUnit[] = []
  const errors: ParseError[] = []

  for (
    let i = startRowIdx;
    i <= Math.min(endRowIdx, gridData.rows.length - 1);
    i++
  ) {
    const row = gridData.rows[i]
    if (!row?.cells) continue

    const nameCell = row.cells[nameColIdx]
    const name = nameCell?.value != null ? String(nameCell.value).trim() : ""
    if (!name) continue // Skip empty rows / section headers

    const priceCell = row.cells[priceColIdx]
    const price = parsePrice(priceCell?.value)

    let status: string | null
    try {
      status = readStatus(row, syncConfig, priceColIdx)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      errors.push({ row: i + 1, name, error: `Status read error: ${message}` })
      continue
    }

    if (!status) {
      // If we can't determine status, try to infer from price cell
      if (price === null && priceCell?.value) {
        const txt = String(priceCell.value).trim().toLowerCase()
        if (["sold", "продано"].includes(txt)) status = "sold"
        else if (["booked", "бронь", "reserved"].includes(txt))
          status = "booked"
      }
      if (!status) status = price !== null ? "available" : "sold"
    }

    units.push({
      name,
      price,
      status,
      row: i + 1, // 1-based for human readability
    })
  }

  return { units, columnsHash, errors }
}
