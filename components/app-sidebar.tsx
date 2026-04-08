"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3Icon,
  Building2Icon,
  FolderOpenIcon,
  ShieldIcon,
  EyeIcon,
  TrendingUpIcon,
  CheckSquareIcon,
  LightbulbIcon,
  PaletteIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  HandshakeIcon,
  CpuIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import { adminOnlyPages, type UserRole } from "@/lib/data/roles"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navGroups = [
  {
    label: "Workspace",
    items: [
      { title: "Analytics", href: "/analytics", icon: BarChart3Icon },
      { title: "Developers", href: "/developers", icon: Building2Icon },
      { title: "Clients", href: "/clients", icon: HandshakeIcon },
      { title: "Projects", href: "/projects", icon: FolderOpenIcon },
      { title: "Tasks", href: "/tasks", icon: CheckSquareIcon },
      { title: "Competitors", href: "/competitors", icon: ShieldIcon },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "ROI Calculator", href: "/roi", icon: TrendingUpIcon },
      { title: "Mechanics", href: "/mechanics", icon: CpuIcon },
      { title: "Preview", href: "/preview", icon: EyeIcon },
      { title: "Sandbox", href: "/sandbox", icon: PaletteIcon },
    ],
  },
]

export function AppSidebar({
  userName,
  userEmail,
  userAvatar,
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

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-9 items-center gap-2 rounded-[10px] px-2">
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
            className="h-[16px] w-auto dark:invert transition-opacity duration-200 group-data-[collapsible=icon]:hidden"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => {
          const filteredItems = group.items.filter(
            (item) => userRole === "admin" || !adminOnlyPages.includes(item.href)
          )
          if (filteredItems.length === 0) return null
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {userEmail && (
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={userEmail}>
                {userAvatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={userAvatar}
                    alt=""
                    className="size-5 rounded-full"
                  />
                ) : (
                  <div className="flex size-5 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
                    {(userName || userEmail).charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="truncate text-sm">
                  {userName || userEmail}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              tooltip="Toggle theme"
            >
              <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Toggle theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {userEmail && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} tooltip="Sign out">
                <LogOutIcon className="size-4" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
