"use client"

import { useState } from "react"
import {
  FolderIcon,
  FileTextIcon,
  PresentationIcon,
  TableIcon,
  FileIcon,
  ImageIcon,
  GlobeIcon,
  PaperclipIcon,
  PlusIcon,
  Trash2Icon,
  ExternalLinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import type { ProjectMaterial, MaterialType } from "@/lib/data/catalog-projects"
import { MATERIAL_TYPES } from "@/lib/data/catalog-projects"

const ICON_MAP: Record<string, React.ElementType> = {
  folder: FolderIcon,
  "file-text": FileTextIcon,
  presentation: PresentationIcon,
  table: TableIcon,
  file: FileIcon,
  image: ImageIcon,
  globe: GlobeIcon,
  paperclip: PaperclipIcon,
}

interface MaterialsSectionProps {
  projectId: string
  materials: ProjectMaterial[]
  onMaterialsChange: (materials: ProjectMaterial[]) => void
}

export function MaterialsSection({
  projectId,
  materials,
  onMaterialsChange,
}: MaterialsSectionProps) {
  return (
    <div className="space-y-3 overflow-hidden">
      <p className="text-xs text-muted-foreground">
        Источники данных для AI — Drive, сайты, PDF, ROI. При заполнении проекта AI использует эти ссылки.
      </p>
      <MaterialsList
        projectId={projectId}
        materials={materials}
        onMaterialsChange={onMaterialsChange}
      />
    </div>
  )
}

function MaterialsList({
  projectId,
  materials,
  onMaterialsChange,
}: MaterialsSectionProps) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState<MaterialType>("drive_folder")

  async function handleAdd() {
    if (!title.trim() || !url.trim()) return
    const supabase = createClient()
    const { data, error } = await supabase
      .from("project_materials")
      .insert({ project_id: projectId, title: title.trim(), url: url.trim(), type })
      .select()
      .single()

    if (!error && data) {
      onMaterialsChange([
        { id: data.id, projectId, type, title: title.trim(), url: url.trim(), notes: "", createdAt: data.created_at },
        ...materials,
      ])
    }
    setTitle("")
    setUrl("")
    setAdding(false)
  }

  async function handleDelete(materialId: string) {
    const supabase = createClient()
    await supabase.from("project_materials").delete().eq("id", materialId)
    onMaterialsChange(materials.filter((m) => m.id !== materialId))
  }

  return (
    <div className="space-y-3">
      {materials.map((m) => {
        const typeConfig = MATERIAL_TYPES.find((t) => t.value === m.type)
        const Icon = ICON_MAP[typeConfig?.icon ?? "paperclip"] ?? PaperclipIcon
        return (
          <div key={m.id} className="flex items-start gap-3 rounded-lg border px-3 py-2.5 group overflow-hidden">
            <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 overflow-hidden">
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline truncate block"
              >
                {m.title}
              </a>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{m.url}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={() => handleDelete(m.id)}
            >
              <Trash2Icon className="size-3.5 text-muted-foreground" />
            </Button>
          </div>
        )
      })}

      {materials.length === 0 && !adding && (
        <p className="text-sm text-muted-foreground py-4 text-center">
          No materials yet.
        </p>
      )}

      {adding ? (
        <div className="space-y-2 rounded-lg border p-3">
          <Input
            placeholder="Title (e.g. Project Drive Folder)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Select value={type} onValueChange={(v) => setType(v as MaterialType)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MATERIAL_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd} disabled={!title.trim() || !url.trim()}>
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setAdding(true)}
        >
          <PlusIcon className="size-3.5 mr-1.5" />
          Add Material
        </Button>
      )}
    </div>
  )
}
