"use client"

import * as React from "react"
import Link from "next/link"
import { PanelLeftIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type SidebarContextValue = {
  expanded: boolean
  setExpanded: (v: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within <AppSidebar>")
  return ctx
}

// ---------------------------------------------------------------------------
// Cookie helpers
// ---------------------------------------------------------------------------

const COOKIE_KEY = "sidebar_expanded"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function readCookie(): boolean | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`))
  if (!match) return null
  return match[1] === "true"
}

function writeCookie(value: boolean) {
  if (typeof document === "undefined") return
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

// ---------------------------------------------------------------------------
// AppSidebarProvider — wraps sidebar + main content to share state
// ---------------------------------------------------------------------------

function AppSidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
}) {
  const isMobile = useIsMobile()
  const [expanded, setExpandedRaw] = React.useState(() => {
    const cookie = readCookie()
    return cookie ?? defaultExpanded
  })

  const setExpanded = React.useCallback((v: boolean) => {
    setExpandedRaw(v)
    writeCookie(v)
  }, [])

  // Keyboard shortcut: Cmd+B
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        setExpanded(!expanded)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [expanded, setExpanded])

  // Mobile: collapse by default
  React.useEffect(() => {
    if (isMobile) setExpandedRaw(false)
  }, [isMobile])

  const ctx = React.useMemo(
    () => ({ expanded, setExpanded, isMobile }),
    [expanded, setExpanded, isMobile]
  )

  return (
    <SidebarContext.Provider value={ctx}>{children}</SidebarContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// AppSidebar — root <aside>
// ---------------------------------------------------------------------------

function AppSidebar({
  children,
  className,
  ...props
}: React.ComponentProps<"aside">) {
  const { expanded, setExpanded, isMobile } = useSidebar()

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && expanded && (
        <div
          data-slot="sidebar-backdrop"
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setExpanded(false)}
        />
      )}

      <aside
        data-slot="sidebar"
        aria-expanded={expanded}
        className={cn(
          "group/sidebar shrink-0 flex flex-col bg-[rgb(250,250,250)] border-r border-[rgba(0,0,29,0.075)] overflow-hidden transition-[width] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isMobile
            ? expanded
              ? "fixed inset-y-0 left-0 z-50 w-[256px] shadow-lg"
              : "fixed inset-y-0 left-0 z-50 w-0 -translate-x-full"
            : expanded
              ? "w-[256px]"
              : "w-[61px]",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarHeader — logo area, 50px tall
// ---------------------------------------------------------------------------

function AppSidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "h-[50px] shrink-0 flex items-center gap-1.5 px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarContent — scrollable nav area
// ---------------------------------------------------------------------------

function AppSidebarContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarGroup — section with optional label
// ---------------------------------------------------------------------------

function AppSidebarGroup({
  children,
  label,
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-1 px-3 pt-4", className)}
      {...props}
    >
      {label && (
        <span
          data-slot="sidebar-group-label"
          className="ml-2 mb-1 text-sm font-medium text-[rgb(120,120,129)] h-0 overflow-hidden opacity-0 group-aria-expanded/sidebar:h-auto group-aria-expanded/sidebar:overflow-visible group-aria-expanded/sidebar:opacity-100 transition-all duration-150"
        >
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarItem — menu item (button or link)
// ---------------------------------------------------------------------------

function AppSidebarItem({
  children,
  icon: Icon,
  isActive = false,
  badge,
  href,
  onClick,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onClick"> & {
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
  badge?: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const { expanded, isMobile } = useSidebar()
  const showTooltip = !expanded && !isMobile

  const content = (
    <div
      data-slot="sidebar-item"
      data-active={isActive || undefined}
      className={cn(
        "relative group rounded-[10px] cursor-pointer",
        "hover:bg-[rgba(0,0,23,0.043)] duration-0",
        isActive && "bg-[rgba(0,0,23,0.043)]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center gap-2 px-2 h-8">

        {/* Icon container */}
        {Icon && (
          <div className="flex w-5 h-8 items-center justify-center shrink-0">
            <Icon
              className={cn(
                "size-5 transition-colors",
                isActive ? "text-[rgb(28,28,29)]" : "text-[rgb(120,120,129)]"
              )}
            />
          </div>
        )}

        {/* Text + badge — hidden when collapsed via group selector */}
        <div
          className="flex flex-1 h-8 items-center min-w-0 w-0 overflow-hidden opacity-0 translate-x-1 group-aria-expanded/sidebar:w-auto group-aria-expanded/sidebar:overflow-visible group-aria-expanded/sidebar:opacity-100 group-aria-expanded/sidebar:translate-x-0 transition-all duration-150"
        >
          <p
            className={cn(
              "text-sm font-medium truncate max-w-[168px]",
              isActive ? "text-[rgb(28,28,29)]" : "text-[rgb(91,91,100)]"
            )}
          >
            {children}
          </p>
          {badge && (
            <span className="ml-auto shrink-0">{badge}</span>
          )}
        </div>
      </div>
    </div>
  )

  const wrapped = href ? (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  ) : (
    content
  )

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{wrapped}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          {children}
        </TooltipContent>
      </Tooltip>
    )
  }

  return wrapped
}

// ---------------------------------------------------------------------------
// AppSidebarFooter — bottom section
// ---------------------------------------------------------------------------

function AppSidebarFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "mt-auto shrink-0 px-3 py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarToggle — collapse / expand button
// ---------------------------------------------------------------------------

function AppSidebarToggle({ className }: { className?: string }) {
  const { expanded, setExpanded, isMobile } = useSidebar()

  if (isMobile) return null

  return (
    <AppSidebarItem
      icon={expanded ? PanelLeftCloseIcon : PanelLeftOpenIcon}
      onClick={() => setExpanded(!expanded)}
      className={className}
    >
      Collapse
    </AppSidebarItem>
  )
}

// ---------------------------------------------------------------------------
// AppSidebarTrigger — header button for main content area
// ---------------------------------------------------------------------------

function AppSidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { expanded, setExpanded } = useSidebar()

  return (
    <button
      data-slot="sidebar-trigger"
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "inline-flex items-center justify-center size-8 rounded-[10px] hover:bg-[rgba(0,0,23,0.043)] cursor-pointer transition-colors",
        className
      )}
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
    </button>
  )
}

export {
  AppSidebarProvider,
  AppSidebar,
  AppSidebarHeader,
  AppSidebarContent,
  AppSidebarGroup,
  AppSidebarItem,
  AppSidebarFooter,
  AppSidebarToggle,
  AppSidebarTrigger,
  useSidebar,
}
