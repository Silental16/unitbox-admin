"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function InlineEdit({
  value,
  onSave,
  type = "text",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onSave"> & {
  value: string
  onSave: (value: string) => void
  type?: "text" | "number"
}) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setDraft(value)
  }, [value])

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  function save() {
    setEditing(false)
    if (draft !== value) {
      onSave(draft)
    }
  }

  function cancel() {
    setEditing(false)
    setDraft(value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") save()
    if (e.key === "Escape") cancel()
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-slot="inline-edit-input"
        type={type}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-auto w-full rounded-field border border-input bg-transparent px-1.5 py-0.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
          className
        )}
      />
    )
  }

  return (
    <div
      data-slot="inline-edit"
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setEditing(true)
      }}
      className={cn(
        "cursor-text rounded-field px-1.5 py-0.5 text-sm transition-colors hover:bg-muted/50",
        className
      )}
      {...props}
    >
      {value || <span className="text-muted-foreground">—</span>}
    </div>
  )
}

export { InlineEdit }
