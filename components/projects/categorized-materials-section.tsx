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
import type { ProjectMaterial, MaterialType, MaterialCategory } from "@/lib/data/catalog-projects"
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

interface CategorizedMaterialsSectionProps {
  projectId: string
  materials: ProjectMaterial[]
  onMaterialsChange: (materials: ProjectMaterial[]) => void
  category: MaterialCategory
  description: string
  addButtonLabel: string
  showSubLabel?: boolean
  subLabelPlaceholder?: string
}

export function CategorizedMaterialsSection({
  projectId,
  materials,
  onMaterialsChange,
  category,
  description,
  addButtonLabel,
  showSubLabel = false,
  subLabelPlaceholder = "",
}: CategorizedMaterialsSectionProps) {
  const filtered = materials.filter((m) => m.category === category)

  return (
    <div className="space-y-3 w-full overflow-hidden">
      <p className="text-xs text-muted-foreground">{description}</p>
      <MaterialsList
        projectId={projectId}
        materials={materials}
        filtered={filtered}
        onMaterialsChange={onMaterialsChange}
        category={category}
        addButtonLabel={addButtonLabel}
        showSubLabel={showSubLabel}
        subLabelPlaceholder={subLabelPlaceholder}
      />
    </div>
  )
}

function MaterialsList({
  projectId,
  materials,
  filtered,
  onMaterialsChange,
  category,
  addButtonLabel,
  showSubLabel,
  subLabelPlaceholder,
}: {
  projectId: string
  materials: ProjectMaterial[]
  filtered: ProjectMaterial[]
  onMaterialsChange: (materials: ProjectMaterial[]) => void
  category: MaterialCategory
  addButtonLabel: string
  showSubLabel?: boolean
  subLabelPlaceholder?: string
}) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [subLabel, setSubLabel] = useState("")
  const [type, setType] = useState<MaterialType>("drive_folder")

  async function handleAdd() {
    if (!title.trim() || !url.trim()) return
    const supabase = createClient()
    const insertData: Record<string, unknown> = {
      project_id: projectId,
      title: title.trim(),
      url: url.trim(),
      type,
      category,
    }
    if (showSubLabel && subLabel.trim()) {
      insertData.sub_label = subLabel.trim()
    }
    const { data, error } = await supabase
      .from("project_materials")
      .insert(insertData)
      .select()
      .single()

    if (!error && data) {
      const newMaterial: ProjectMaterial = {
        id: data.id,
        projectId,
        type,
        title: title.trim(),
        url: url.trim(),
        notes: "",
        category,
        subLabel: showSubLabel && subLabel.trim() ? subLabel.trim() : null,
        createdAt: data.created_at,
      }
      onMaterialsChange([newMaterial, ...materials])
    }
    setTitle("")
    setUrl("")
    setSubLabel("")
    setAdding(false)
  }

  async function handleDelete(materialId: string) {
    const supabase = createClient()
    await supabase.from("project_materials").delete().eq("id", materialId)
    onMaterialsChange(materials.filter((m) => m.id !== materialId))
  }

  return (
    <div className="space-y-3 w-full overflow-hidden">
      {filtered.map((m) => {
        const typeConfig = MATERIAL_TYPES.find((t) => t.value === m.type)
        const Icon = ICON_MAP[typeConfig?.icon ?? "paperclip"] ?? PaperclipIcon
        return (
          <div key={m.id} className="flex items-start gap-3 rounded-lg border px-3 py-2.5 group w-full overflow-hidden">
            <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline truncate"
                >
                  {m.title}
                  <ExternalLinkIcon className="size-3 inline ml-1" />
                </a>
                {m.subLabel && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                    {m.subLabel}
                  </Badge>
                )}
              </div>
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

      {filtered.length === 0 && !adding && (
        <p className="text-sm text-muted-foreground py-4 text-center">
          No items yet.
        </p>
      )}

      {adding ? (
        <div className="space-y-2 rounded-lg border p-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {showSubLabel && (
            <Input
              placeholder={subLabelPlaceholder}
              value={subLabel}
              onChange={(e) => setSubLabel(e.target.value)}
            />
          )}
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
          {addButtonLabel}
        </Button>
      )}
    </div>
  )
}
