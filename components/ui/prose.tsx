"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

function Prose({
  children,
  className,
  ...props
}: {
  children: string
} & Omit<React.ComponentProps<"div">, "children">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "prose-sm max-w-none text-sm leading-relaxed text-foreground",
        "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-2",
        "[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2",
        "[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1.5",
        "[&_p]:mb-2 [&_p]:leading-relaxed",
        "[&_ul]:mb-2 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1",
        "[&_ol]:mb-2 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:space-y-1",
        "[&_li]:text-sm [&_li]:leading-relaxed",
        "[&_strong]:font-semibold",
        "[&_em]:italic",
        "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-70",
        "[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono",
        "[&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-3",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:mb-2",
        "[&_hr]:border-border [&_hr]:my-4",
        className
      )}
      {...props}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  )
}

export { Prose }
