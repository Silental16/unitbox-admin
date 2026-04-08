"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function TagInput({
  value,
  onChange,
  placeholder,
  max,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  max?: number
}) {
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  function addTag(tag: string) {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (value.includes(trimmed)) return
    if (max != null && value.length >= max) return
    onChange([...value, trimmed])
    setInput("")
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(input)
    }
    if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div
      data-slot="tag-input"
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-field border border-input bg-transparent px-3 py-1.5 text-sm transition-colors focus-within:border-ring focus-within:ring-[1px] focus-within:ring-ring/50",
        className
      )}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      {value.map((tag, index) => (
        <span
          key={tag}
          data-slot="tag-input-tag"
          className="inline-flex items-center gap-1 rounded-pill bg-muted px-2 py-0.5 text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(index)
            }}
            className="inline-flex shrink-0 items-center justify-center rounded-pill text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        data-slot="tag-input-field"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : undefined}
        className="min-w-[60px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}

export { TagInput }
