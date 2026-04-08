import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statCardVariants = cva(
  "flex flex-col gap-3 rounded-2xl p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground ring-1 ring-foreground/10",
        ghost: "bg-muted text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function StatCard({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statCardVariants>) {
  return (
    <div
      data-slot="stat-card"
      className={cn(statCardVariants({ variant }), className)}
      {...props}
    />
  )
}

function StatCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-header"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StatCardValue({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-value"
      className={cn(
        "text-2xl font-semibold tracking-tight tabular-nums",
        className
      )}
      {...props}
    />
  )
}

function StatCardDelta({
  className,
  trend = "neutral",
  ...props
}: React.ComponentProps<"span"> & {
  trend?: "up" | "down" | "neutral"
}) {
  return (
    <span
      data-slot="stat-card-delta"
      data-trend={trend}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium tabular-nums",
        trend === "up" && "text-[var(--color-trend-up)]",
        trend === "down" && "text-[var(--color-trend-down)]",
        trend === "neutral" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  StatCard,
  StatCardHeader,
  StatCardValue,
  StatCardDelta,
  statCardVariants,
}
