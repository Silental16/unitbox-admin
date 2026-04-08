"use client"

import * as React from "react"
import { ImageIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface ImageUploadProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string
  onChange: (file: File | null) => void
  onRemove?: () => void
  accept?: string
  maxSize?: number
  placeholder?: string
}

function ImageUpload({
  value,
  onChange,
  onRemove,
  accept = "image/*",
  maxSize,
  placeholder = "Click or drag to upload image",
  className,
  ...props
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [dragOver, setDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const imageUrl = preview ?? value ?? null

  function handleFile(file: File) {
    if (maxSize && file.size > maxSize) return

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    const url = URL.createObjectURL(file)
    setPreview(url)
    onChange(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ""
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation()

    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }

    onChange(null)
    onRemove?.()
  }

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div
      data-slot="image-upload"
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-card transition-colors",
        imageUrl
          ? "border border-border"
          : "border-2 border-dashed border-border hover:border-ring/50 hover:bg-muted/30",
        dragOver && !imageUrl && "border-ring bg-muted/50",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Upload preview"
            className="size-full rounded-card object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-card bg-black/0 transition-colors group-hover:bg-black/20" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-pill bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          >
            <XIcon className="size-3.5" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center">
          <ImageIcon className="size-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">{placeholder}</div>
        </div>
      )}
    </div>
  )
}

export { ImageUpload }
export type { ImageUploadProps }
