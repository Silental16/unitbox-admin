"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3Icon,
  Building2Icon,
  FolderOpenIcon,
  ShieldIcon,
  EyeIcon,
  TrendingUpIcon,
  CheckSquareIcon,
  HandshakeIcon,
  WorkflowIcon,
  CpuIcon,
  PaletteIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  WrenchIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import { adminOnlyPages, type UserRole } from "@/lib/data/roles"
import {
  AppSidebar as AppSidebarRoot,
  AppSidebarHeader,
  AppSidebarContent,
  AppSidebarGroup,
  AppSidebarItem,
  AppSidebarFooter,
  AppSidebarToggle,
  useSidebar,
} from "@/components/ui/app-sidebar"
import { ProductSwitcher } from "@/components/product-switcher"

const products = [
  {
    id: "hq",
    name: "Unitbox HQ",
    description: "Internal operations",
    icon: <LayoutDashboardIcon className="size-3" />,
  },
  {
    id: "tools",
    name: "Tools",
    description: "ROI, Mechanics, Sandbox",
    icon: <WrenchIcon className="size-3" />,
  },
]

const workspaceItems = [
  { name: "Analytics", href: "/analytics", icon: BarChart3Icon },
  { name: "Developers", href: "/developers", icon: Building2Icon },
  { name: "Clients", href: "/clients", icon: HandshakeIcon },
  { name: "Projects", href: "/projects", icon: FolderOpenIcon },
  { name: "Tasks", href: "/tasks", icon: CheckSquareIcon },
  { name: "Competitors", href: "/competitors", icon: ShieldIcon },
]

const toolItems = [
  { name: "ROI Calculator", href: "/roi", icon: TrendingUpIcon },
  { name: "Mechanics", href: "/mechanics", icon: CpuIcon },
  { name: "Flows", href: "/flows", icon: WorkflowIcon },
  { name: "Preview", href: "/preview", icon: EyeIcon },
  { name: "Sandbox", href: "/sandbox", icon: PaletteIcon },
]

export function AppSidebar({
  userEmail,
  userRole = "user",
}: {
  userName?: string
  userEmail?: string
  userAvatar?: string
  userRole?: UserRole
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { expanded } = useSidebar()
  const [activeProduct, setActiveProduct] = useState("hq")

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const items = activeProduct === "hq" ? workspaceItems : toolItems
  const filteredItems = items.filter(
    (item) => userRole === "admin" || !adminOnlyPages.includes(item.href)
  )

  return (
    <AppSidebarRoot>
      <AppSidebarHeader>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/unitbox-icon.svg"
          alt="Unitbox"
          className="size-6 shrink-0 dark:invert"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/unitbox-wordmark.svg"
          alt="Unitbox"
          className="h-4 w-auto dark:invert opacity-0 translate-x-1 group-aria-expanded/sidebar:opacity-100 group-aria-expanded/sidebar:translate-x-0 transition-all duration-150"
        />
      </AppSidebarHeader>

      {/* Product Switcher */}
      <div className="px-3 mt-2">
        <ProductSwitcher
          products={products}
          activeProduct={activeProduct}
          onProductChange={setActiveProduct}
          collapsed={!expanded}
        />
      </div>

      <AppSidebarContent>
        <AppSidebarGroup label={activeProduct === "hq" ? "Workspace" : "Tools"}>
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <AppSidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
              >
                {item.name}
              </AppSidebarItem>
            )
          })}
        </AppSidebarGroup>
      </AppSidebarContent>

      <AppSidebarFooter>
        <AppSidebarItem
          icon={theme === "dark" ? SunIcon : MoonIcon}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Toggle theme
        </AppSidebarItem>
        {userEmail && (
          <AppSidebarItem
            icon={LogOutIcon}
            onClick={handleSignOut}
          >
            Sign out
          </AppSidebarItem>
        )}
        <AppSidebarToggle />
      </AppSidebarFooter>
    </AppSidebarRoot>
  )
}
