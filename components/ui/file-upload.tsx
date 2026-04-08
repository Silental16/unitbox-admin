"use client"

import * as React from "react"
import { UploadIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface FileUploadContextValue {
  files: File[]
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null
)

function useFileUpload() {
  const ctx = React.useContext(FileUploadContext)
  if (!ctx)
    throw new Error("FileUpload sub-components must be used within FileUpload")
  return ctx
}

function FileUpload({
  onFilesSelected,
  accept,
  multiple = true,
  maxSize,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
}) {
  const [files, setFiles] = React.useState<File[]>([])

  function handleFiles(incoming: File[]) {
    const filtered = maxSize
      ? incoming.filter((f) => f.size <= maxSize)
      : incoming
    const next = multiple ? [...files, ...filtered] : filtered.slice(0, 1)
    setFiles(next)
    onFilesSelected(next)
  }

  return (
    <FileUploadContext.Provider
      value={{ files, onFilesSelected: handleFiles, accept, multiple, maxSize }}
    >
      <div
        data-slot="file-upload"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </FileUploadContext.Provider>
  )
}

function FileUploadDropzone({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { onFilesSelected, accept, multiple } = useFileUpload()
  const [dragOver, setDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length) onFilesSelected(dropped)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (selected.length) onFilesSelected(selected)
    e.target.value = ""
  }

  return (
    <div
      data-slot="file-upload-dropzone"
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border px-6 py-8 text-center transition-colors hover:border-ring/50 hover:bg-muted/30",
        dragOver && "border-ring bg-muted/50",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      {children ?? (
        <>
          <UploadIcon className="size-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Drag & drop or click to upload
          </div>
        </>
      )}
    </div>
  )
}

function FileUploadList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { files } = useFileUpload()

  if (files.length === 0) return null

  return (
    <div
      data-slot="file-upload-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {files.map((file, index) => (
        <FileUploadItem key={`${file.name}-${index}`} file={file} index={index} />
      ))}
    </div>
  )
}

function FileUploadItem({
  file,
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { file: File; index: number }) {
  const { files, onFilesSelected } = useFileUpload()

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function remove() {
    const next = files.filter((_, i) => i !== index)
    onFilesSelected(next)
  }

  return (
    <div
      data-slot="file-upload-item"
      className={cn(
        "flex items-center justify-between gap-3 rounded-card border border-border px-3 py-2 text-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-col truncate">
        <span className="truncate font-medium">{file.name}</span>
        <span className="text-xs text-muted-foreground">
          {formatSize(file.size)}
        </span>
      </div>
      <button
        type="button"
        onClick={remove}
        className="shrink-0 rounded-pill p-1 text-muted-foreground hover:text-foreground"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  )
}

export { FileUpload, FileUploadDropzone, FileUploadList, FileUploadItem }
