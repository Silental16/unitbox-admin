"use client"

import { Progress } from "@/components/ui/progress"

export function UsageMeter() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">API Calls</span>
          <span className="tabular-nums">7,500 / 10,000</span>
        </div>
        <Progress value={75} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Storage</span>
          <span className="tabular-nums">3.2 GB / 5 GB</span>
        </div>
        <Progress value={64} />
      </div>
    </div>
  )
}

export default UsageMeter
