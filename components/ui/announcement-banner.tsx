import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function AnnouncementBanner({
  badge = "New",
  children,
  href,
  className,
  ...props
}: {
  badge?: string
  children: React.ReactNode
  href?: string
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative inline-flex max-w-full items-center justify-between gap-2 rounded-full border border-input p-1.5",
        className
      )}
      {...props}
    >
      <Badge className="mr-3 bg-foreground text-background py-1">{badge}</Badge>
      <span className="truncate pr-2 text-sm font-medium">{children}</span>
      <ChevronRightIcon className="h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
      {href && (
        <a
          href={href}
          className="absolute inset-0 rounded-full outline-none focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
    </div>
  )
}

export { AnnouncementBanner }
