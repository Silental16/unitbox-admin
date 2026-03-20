import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PageTitle } from "@/components/page-title"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { getUserRole, type UserRole } from "@/lib/data/roles"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userRole = await getUserRole()

  return (
    <SidebarProvider>
      <AppSidebar
        userName={user?.user_metadata?.full_name ?? user?.email ?? ""}
        userEmail={user?.email ?? ""}
        userAvatar={user?.user_metadata?.avatar_url ?? ""}
        userRole={userRole}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <PageTitle />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
