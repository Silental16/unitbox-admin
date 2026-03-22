"use client"

import { useState, useCallback, useRef } from "react"
import { ExternalLinkIcon, TableIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import type { ProjectChessSource } from "@/lib/data/catalog-projects"

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Never"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface ChessSectionProps {
  chessSources: ProjectChessSource[]
  onChessSourcesChange: (sources: ProjectChessSource[]) => void
}

export function ChessSection({ chessSources, onChessSourcesChange }: ChessSectionProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleNotesChange = useCallback((sourceId: string, notes: string) => {
    onChessSourcesChange(
      chessSources.map((s) => (s.id === sourceId ? { ...s, parsingNotes: notes } : s))
    )
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      const supabase = createClient()
      await supabase.from("project_chess_sources").update({ parsing_notes: notes }).eq("id", sourceId)
    }, 800)
  }, [chessSources, onChessSourcesChange])

  if (chessSources.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No chess board sources configured.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {chessSources.map((source) => (
        <div key={source.id} className="space-y-3">
          {/* Source link */}
          <div className="flex items-center gap-2">
            <TableIcon className="size-4 text-muted-foreground shrink-0" />
            <a
              href={source.sheetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline truncate"
            >
              Google Sheets Source
              <ExternalLinkIcon className="size-3 inline ml-1" />
            </a>
            {source.sheetName && (
              <Badge variant="outline" className="text-[11px]">
                {source.sheetName}
              </Badge>
            )}
          </div>

          {/* Last sync */}
          <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
            <span className="text-muted-foreground">Last sync</span>
            <span>{formatDate(source.lastSyncAt)}</span>
          </div>

          {/* Column mapping */}
          {Object.keys(source.columnMapping).length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Column Mapping</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(source.columnMapping).map(([key, col]) => (
                  <Badge key={key} variant="secondary" className="text-[11px]">
                    {key}: {col}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Color legend */}
          {Object.keys(source.colorLegend).length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Color Legend</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(source.colorLegend).map(([color, meaning]) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px]"
                  >
                    <span
                      className="size-2.5 rounded-full shrink-0 border"
                      style={{ backgroundColor: color }}
                    />
                    {meaning}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Last sync diff */}
          {source.lastSyncDiff && Object.keys(source.lastSyncDiff).length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Last Sync Changes</p>
              <pre className="text-xs bg-muted rounded-md p-2 overflow-x-auto">
                {JSON.stringify(source.lastSyncDiff, null, 2)}
              </pre>
            </div>
          )}

          {/* Parsing notes */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Parsing Notes</p>
            <Textarea
              placeholder="Notes about how to parse this chess board..."
              value={source.parsingNotes}
              onChange={(e) => handleNotesChange(source.id, e.target.value)}
              className="min-h-[60px] text-sm resize-y"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
