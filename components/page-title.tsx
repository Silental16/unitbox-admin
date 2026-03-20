"use client"

import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/developers": "Bali Developer Pipeline",
  "/competitors": "Competitors",
  "/analytics": "Analytics",
  "/preview": "Preview",
  "/roi": "Unitbox ROI",
  "/tasks": "Platform Roadmap",
}

export function PageTitle() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "Unitbox HQ"

  return (
    <span className="text-sm font-medium text-muted-foreground">{title}</span>
  )
}
