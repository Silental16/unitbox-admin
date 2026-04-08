import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
  description?: string
}) {
  return (
    <div
      data-slot="form-section"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <div data-slot="form-section-header" className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
      <div
        data-slot="form-section-content"
        className="flex flex-col gap-4"
      >
        {children}
      </div>
    </div>
  )
}

export { FormSection }
