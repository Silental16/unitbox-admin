"use client"

import { Badge } from "@/components/ui/badge"
import type { ProjectChangeEntry } from "@/lib/data/catalog-projects"
import { CHANGE_SOURCES } from "@/lib/data/catalog-projects"

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface ChangeLogSectionProps {
  changeLog: ProjectChangeEntry[]
}

export function ChangeLogSection({ changeLog }: ChangeLogSectionProps) {
  if (changeLog.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No changes recorded yet.
      </p>
    )
  }

  return (
    <div className="space-y-1">
      {changeLog.map((entry) => {
        const sourceConfig = CHANGE_SOURCES.find((s) => s.value === entry.source) ?? CHANGE_SOURCES[2]
        return (
          <div
            key={entry.id}
            className="flex items-start gap-3 rounded-[var(--radius-field)] border px-3 py-2.5"
          >
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-[var(--radius-menu-item)] px-1.5 py-0.5 text-[11px] font-medium ${sourceConfig.bg} ${sourceConfig.text}`}>
                  <span className={`size-1.5 rounded-full shrink-0 ${sourceConfig.dot}`} />
                  {sourceConfig.label}
                </span>
                <Badge variant="outline" className="text-[11px]">
                  {entry.action}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <p className="text-sm">{entry.summary}</p>
              {Object.keys(entry.diff).length > 0 && (
                <details className="text-xs">
                  <summary className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Show diff
                  </summary>
                  <pre className="mt-1 bg-muted rounded-[var(--radius-menu-item)] p-2 overflow-x-auto">
                    {JSON.stringify(entry.diff, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
