"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Building2Icon,
  EyeIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"

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

const navItems = [
  {
    title: "Developers",
    href: "/developers",
    icon: Building2Icon,
  },
  {
    title: "Preview",
    href: "/preview",
    icon: EyeIcon,
  },
]

export function AppSidebar({
  userName,
  userEmail,
  userAvatar,
}: {
  userName?: string
  userEmail?: string
  userAvatar?: string
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
      <SidebarHeader className="px-3 pt-4 pb-2 group-data-[collapsible=icon]:px-0">
        <div className="flex items-center gap-2 overflow-hidden group-data-[collapsible=icon]:justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/unitbox-icon.svg"
            alt="Unitbox"
            className="size-7 shrink-0 dark:invert"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/unitbox-wordmark.svg"
            alt="Unitbox"
            className="h-[18px] w-auto dark:invert transition-[opacity,margin] duration-200 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-2"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {userEmail && (
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={userEmail}>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt=""
                    className="size-5 rounded-full"
                  />
                ) : (
                  <div className="flex size-5 items-center justify-center rounded-full bg-muted text-xs font-medium">
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
