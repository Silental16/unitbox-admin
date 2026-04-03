"use client"

import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/developers": "Bali Developer Pipeline",
  "/competitors": "Competitors",
  "/analytics": "Analytics",
  "/preview": "Preview",
  "/roi": "Unitbox ROI",
  "/tasks": "Platform Roadmap",
  "/sandbox": "Component Sandbox",
}

export function PageTitle() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "Unitbox HQ"

  return (
    <span className="text-[13px] font-medium text-muted-foreground">{title}</span>
  )
}
