import * as React from "react"
import { cn } from "@/lib/utils"

function UsageMeter({
  label,
  value,
  max,
  formatValue,
  className,
  ...props
}: {
  label: string
  value: number
  max: number
  formatValue?: (n: number) => string
} & React.ComponentProps<"div">) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0
  const fmt = formatValue ?? ((n: number) => n.toLocaleString())

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium tabular-nums">
          {fmt(value)} / {fmt(max)}
        </span>
      </div>
      <div className="h-[11px] w-full overflow-hidden rounded-[3px] bg-[rgba(0,0,29,0.1)]">
        <div
          className="h-full rounded-[3px] bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export { UsageMeter }
