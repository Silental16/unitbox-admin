"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SegmentedControlContextValue {
  value: string
  onValueChange: (value: string) => void
  registerItem: (value: string, el: HTMLButtonElement | null) => void
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null)

function useSegmentedControl() {
  const ctx = React.useContext(SegmentedControlContext)
  if (!ctx)
    throw new Error("SegmentedControlItem must be used within SegmentedControl")
  return ctx
}

function SegmentedControl({
  value,
  onValueChange,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value: string
  onValueChange: (value: string) => void
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({
    opacity: 0,
  })

  const registerItem = React.useCallback(
    (itemValue: string, el: HTMLButtonElement | null) => {
      if (el) {
        itemRefs.current.set(itemValue, el)
      } else {
        itemRefs.current.delete(itemValue)
      }
    },
    []
  )

  React.useEffect(() => {
    const el = itemRefs.current.get(value)
    const container = containerRef.current
    if (el && container) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
        opacity: 1,
      })
    }
  }, [value])

  return (
    <SegmentedControlContext.Provider value={{ value, onValueChange, registerItem }}>
      <div
        ref={containerRef}
        data-slot="segmented-control"
        role="radiogroup"
        className={cn(
          "relative inline-flex items-center gap-0.5 rounded-field bg-muted p-0.5",
          className
        )}
        {...props}
      >
        <div
          className="absolute rounded-control bg-background shadow-sm transition-all duration-200 ease-out"
          style={indicatorStyle}
        />
        {children}
      </div>
    </SegmentedControlContext.Provider>
  )
}

function SegmentedControlItem({
  value,
  className,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const ctx = useSegmentedControl()
  const isActive = ctx.value === value
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    ctx.registerItem(value, ref.current)
    return () => ctx.registerItem(value, null)
  }, [value, ctx.registerItem])

  return (
    <button
      ref={ref}
      data-slot="segmented-control-item"
      type="button"
      role="radio"
      aria-checked={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex items-center justify-center px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-control",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
