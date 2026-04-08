"use client"

import * as React from "react"
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Product = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

interface ProductSwitcherProps {
  products: Product[]
  activeProduct: string
  onProductChange: (id: string) => void
  collapsed?: boolean
  className?: string
}

export function ProductSwitcher({
  products,
  activeProduct,
  onProductChange,
  collapsed = false,
  className,
}: ProductSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const active = products.find((p) => p.id === activeProduct)

  const triggerButton = (
    <button
      data-slot="product-switcher"
      className={cn(
        "flex h-9 items-center rounded-control bg-background shadow-[var(--shadow-card)] w-full",
        collapsed ? "justify-center px-0" : "gap-2 px-2",
        className
      )}
    >
      {/* Icon — 20x20 rounded-md */}
      <span className="flex size-5 shrink-0 items-center justify-center rounded-menu-item bg-[rgba(0,0,23,0.043)] border border-[rgba(0,0,29,0.1)]">
        {active?.icon}
      </span>

      {/* Text + chevron — hidden when collapsed */}
      {!collapsed && (
        <span className="flex flex-1 items-center gap-2 overflow-hidden min-w-0">
          <span className="max-w-[168px] truncate text-sm font-medium text-[rgb(28,28,29)]">
            {active?.name}
          </span>
          <ChevronsUpDownIcon className="ml-auto mr-0.5 size-4 shrink-0 text-[rgb(120,120,129)]" />
        </span>
      )}
    </button>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>{triggerButton}</TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              {active?.name}
            </TooltipContent>
          </Tooltip>
        ) : (
          triggerButton
        )}
      </PopoverTrigger>

      <PopoverContent
        data-slot="product-switcher-content"
        align="start"
        side={collapsed ? "right" : "bottom"}
        sideOffset={collapsed ? 12 : 6}
        className="min-w-[240px] rounded-control bg-popover/90 p-1 shadow-[var(--shadow-popover)] backdrop-blur"
      >
        {products.map((product, index) => {
          const isActive = product.id === activeProduct
          return (
            <React.Fragment key={product.id}>
              {index > 0 && (
                <div className="-mx-1 my-1 h-px bg-border" />
              )}
              <button
                data-slot="product-switcher-item"
                onClick={() => {
                  onProductChange(product.id)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2 rounded-menu-item px-2 py-1.5 transition-colors hover:bg-[rgba(0,0,23,0.043)]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-[rgba(0,0,23,0.043)] border border-[rgba(0,0,29,0.1)]">
                  {product.icon}
                </span>
                <span className="flex flex-1 flex-col items-start min-w-0">
                  <span className="text-sm font-medium text-foreground">{product.name}</span>
                  <span className="-mt-px text-xs text-[rgba(0,0,17,0.53)]">{product.description}</span>
                </span>
                {isActive && <CheckIcon className="size-4 shrink-0 text-foreground" />}
              </button>
            </React.Fragment>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
