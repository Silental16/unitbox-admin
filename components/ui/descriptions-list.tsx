import * as React from "react"

import { cn } from "@/lib/utils"

function DescriptionsList({
  layout = "horizontal",
  columns = 1,
  className,
  ...props
}: React.ComponentProps<"dl"> & {
  layout?: "horizontal" | "vertical"
  columns?: number
}) {
  const columnClass =
    columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : columns === 4 ? "grid-cols-4" : ""

  return (
    <dl
      data-slot="descriptions-list"
      data-layout={layout}
      className={cn(
        "group/descriptions-list grid gap-0 text-sm",
        columns > 1 && columnClass,
        className
      )}
      {...props}
    />
  )
}

function DescriptionsItem({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: string }) {
  return (
    <div
      data-slot="descriptions-item"
      className={cn(
        "border-b border-border/50 py-3 last-of-type:border-b-0 group-data-[layout=horizontal]/descriptions-list:flex group-data-[layout=horizontal]/descriptions-list:items-baseline group-data-[layout=vertical]/descriptions-list:flex group-data-[layout=vertical]/descriptions-list:flex-col group-data-[layout=vertical]/descriptions-list:gap-1",
        className
      )}
      {...props}
    >
      <dt
        data-slot="descriptions-label"
        className="w-1/3 shrink-0 text-muted-foreground group-data-[layout=vertical]/descriptions-list:w-full"
      >
        {label}
      </dt>
      <dd data-slot="descriptions-value" className="font-medium">
        {children}
      </dd>
    </div>
  )
}

export { DescriptionsList, DescriptionsItem }
