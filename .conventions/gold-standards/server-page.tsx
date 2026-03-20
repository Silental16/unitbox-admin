// Gold standard: App Router server page component
// Pattern from: app/(dashboard)/developers/page.tsx

import { getData } from "@/lib/data/queries"
import { ClientView } from "@/components/feature/client-view"

// 1. Async server component (NO "use client")
// 2. Fetch data, pass as props to client component
// 3. Next.js 16: searchParams is a Promise — must be awaited
// 4. Validate query params before casting

export default async function FeaturePage({
  searchParams,
}: {
  searchParams: Promise<{ param?: string }>
}) {
  const params = await searchParams
  // Validate before casting
  const validValues = ["a", "b", "c"] as const
  const value = validValues.includes(params?.param as typeof validValues[number])
    ? (params.param as typeof validValues[number])
    : "a" // default

  const data = await getData(value)
  return <ClientView data={data} />
}
