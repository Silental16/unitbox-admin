import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header + filters */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-56" />
        </div>
      </div>

      {/* Tab bar */}
      <Skeleton className="h-9 w-64" />

      {/* KPI cards row */}
      <Skeleton className="h-24 w-full" />

      {/* Chart + sidebar grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
      </div>

      {/* Funnel */}
      <Skeleton className="h-48" />

      {/* Table */}
      <Skeleton className="h-64" />

      {/* Bottom row */}
      <Skeleton className="h-48" />
    </div>
  )
}
