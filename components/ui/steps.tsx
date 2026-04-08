"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepsContextValue {
  current: number
  onClick?: (index: number) => void
}

const StepsContext = React.createContext<StepsContextValue>({ current: 0 })

function Steps({
  current,
  onClick,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  current: number
  onClick?: (index: number) => void
}) {
  return (
    <StepsContext.Provider value={{ current, onClick }}>
      <div
        data-slot="steps"
        className={cn("flex items-center gap-0", className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                data-slot="steps-connector"
                className={cn(
                  "mx-2 h-0 flex-1 border-t-2",
                  index <= current
                    ? "border-primary"
                    : "border-border"
                )}
              />
            )}
            {React.isValidElement<StepItemInternalProps>(child)
              ? React.cloneElement(child, { _index: index })
              : child}
          </React.Fragment>
        ))}
      </div>
    </StepsContext.Provider>
  )
}

interface StepItemInternalProps {
  _index?: number
}

function StepItem({
  title,
  description,
  icon,
  className,
  _index = 0,
  ...props
}: React.ComponentProps<"div"> &
  StepItemInternalProps & {
    title: string
    description?: string
    icon?: React.ReactNode
  }) {
  const { current, onClick } = React.useContext(StepsContext)
  const state =
    _index < current
      ? "completed"
      : _index === current
        ? "current"
        : "upcoming"
  const clickable = state === "completed" && onClick

  return (
    <div
      data-slot="step-item"
      data-state={state}
      className={cn(
        "flex shrink-0 items-center gap-2",
        clickable && "cursor-pointer",
        className
      )}
      onClick={clickable ? () => onClick(_index) : undefined}
      {...props}
    >
      <div
        data-slot="step-indicator"
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-pill text-sm font-medium transition-colors",
          state === "completed" && "bg-primary text-primary-foreground",
          state === "current" &&
            "bg-primary text-primary-foreground ring-4 ring-primary/20",
          state === "upcoming" &&
            "border-2 border-border bg-background text-muted-foreground"
        )}
      >
        {state === "completed" ? (
          icon ?? <CheckIcon className="size-4" />
        ) : (
          icon ?? <span>{_index + 1}</span>
        )}
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm font-medium",
            state === "upcoming" && "text-muted-foreground"
          )}
        >
          {title}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  )
}

export { Steps, StepItem }
