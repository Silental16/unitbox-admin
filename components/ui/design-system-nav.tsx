"use client"

import { usePathname } from "next/navigation"

const tabs = [
  { href: "/", label: "Atoms" },
  { href: "/patterns", label: "Molecules" },
  { href: "/blocks", label: "Organisms" },
  { href: "/pages", label: "Pages" },
]

export function DesignSystemNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div className="flex gap-4 mt-3 border-b border-border pb-2">
      {tabs.map((tab) => (
        <a
          key={tab.href}
          href={tab.href}
          className={
            isActive(tab.href)
              ? "text-sm font-medium text-foreground border-b-2 border-foreground pb-2 -mb-[9px]"
              : "text-sm font-medium text-muted-foreground hover:text-foreground pb-2 -mb-[9px]"
          }
        >
          {tab.label}
        </a>
      ))}
    </div>
  )
}
