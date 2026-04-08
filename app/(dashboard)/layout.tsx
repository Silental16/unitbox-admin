import { AppSidebarProvider, AppSidebarTrigger } from "@/components/ui/app-sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PageTitle } from "@/components/page-title"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { getUserRole } from "@/lib/data/roles"

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
    <AppSidebarProvider>
      <div className="flex h-svh overflow-hidden">
        <AppSidebar
          userName={user?.user_metadata?.full_name ?? user?.email ?? ""}
          userEmail={user?.email ?? ""}
          userAvatar={user?.user_metadata?.avatar_url ?? ""}
          userRole={userRole}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-[50px] shrink-0 flex items-center gap-2 px-4 bg-background/90 backdrop-blur-[8px] border-b border-border">
            <AppSidebarTrigger />
            <Separator orientation="vertical" className="h-4 w-px bg-border mx-1" />
            <PageTitle />
          </header>
          <main className="flex-1 min-h-0 overflow-auto">
            <div className="mx-auto max-w-6xl px-5 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AppSidebarProvider>
  )
}
