import { createServerClient } from "@supabase/ssr"
import type { cookies as CookiesFn } from "next/headers"

export async function createClient() {
  const { cookies } = await import("next/headers") as { cookies: typeof CookiesFn }
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component — the middleware handles session refresh
          }
        },
      },
    }
  )
}
