"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import {
  ExternalLinkIcon,
  MapPinIcon,
  CalendarIcon,
  LayersIcon,
  HashIcon,
  WrenchIcon,
  AlertCircleIcon,
  FolderIcon,
  TableIcon,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import type { CatalogProject, ProjectFillStatus, ProjectMaterial, ProjectChessSource, ProjectChangeEntry } from "@/lib/data/catalog-projects"
import { FILL_STATUSES } from "@/lib/data/catalog-projects"
import { MaterialsSection } from "./materials-section"
import { ChessSection } from "./chess-section"
import { ChangeLogSection } from "./change-log-section"
import {
  mapRowToMaterial,
  mapRowToChessSource,
  mapRowToChangeEntry,
} from "@/lib/data/catalog-projects"

const MIN_WIDTH = 400
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 520

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function KVRow({ label, value, href, icon: Icon }: { label: string; value: string; href?: string; icon?: React.ElementType }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-2 py-1.5 border-b border-border/50 last:border-b-0">
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        {Icon && <Icon className="size-3 shrink-0" />}
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline break-words truncate"
        >
          {value}
          <ExternalLinkIcon className="size-3 inline ml-1" />
        </a>
      ) : (
        <span className="text-sm font-medium break-words">{value}</span>
      )}
    </div>
  )
}

interface ProjectSheetProps {
  project: CatalogProject | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectUpdate: (project: CatalogProject) => void
}

export function ProjectSheet({
  project,
  open,
  onOpenChange,
  onProjectUpdate,
}: ProjectSheetProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  // Lazy-loaded detail data
  const [materials, setMaterials] = useState<ProjectMaterial[]>([])
  const [chessSources, setChessSources] = useState<ProjectChessSource[]>([])
  const [changeLog, setChangeLog] = useState<ProjectChangeEntry[]>([])
  const [detailsLoaded, setDetailsLoaded] = useState(false)

  useEffect(() => {
    if (open) setWidth(DEFAULT_WIDTH)
  }, [open])

  // Load details when sheet opens
  useEffect(() => {
    if (!open || !project || detailsLoaded) return
    async function loadDetails() {
      const supabase = createClient()
      const [materialsRes, chessRes, logRes] = await Promise.all([
        supabase.from("project_materials").select("*").eq("project_id", project!.id).order("created_at", { ascending: false }),
        supabase.from("project_chess_sources").select("*").eq("project_id", project!.id).order("created_at", { ascending: false }),
        supabase.from("project_change_log").select("*").eq("project_id", project!.id).order("created_at", { ascending: false }).limit(50),
      ])
      setMaterials((materialsRes.data ?? []).map(mapRowToMaterial))
      setChessSources((chessRes.data ?? []).map(mapRowToChessSource))
      setChangeLog((logRes.data ?? []).map(mapRowToChangeEntry))
      setDetailsLoaded(true)
    }
    loadDetails()
  }, [open, project, detailsLoaded])

  // Reset details when project changes
  useEffect(() => {
    setDetailsLoaded(false)
    setMaterials([])
    setChessSources([])
    setChangeLog([])
  }, [project?.id])

  // Resize logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    startX.current = e.clientX
    startWidth.current = width
  }, [width])

  useEffect(() => {
    if (!dragging) return
    const handleMouseMove = (e: MouseEvent) => {
      const delta = startX.current - e.clientX
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta)))
    }
    const handleMouseUp = () => setDragging(false)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  // Notes debounced save
  const notesTimerRef = useRef<NodeJS.Timeout | null>(null)
  const handleNotesChange = useCallback((notes: string) => {
    if (!project) return
    onProjectUpdate({ ...project, notes })
    if (notesTimerRef.current) clearTimeout(notesTimerRef.current)
    notesTimerRef.current = setTimeout(async () => {
      const supabase = createClient()
      await supabase.from("catalog_projects").update({ notes }).eq("id", project.id)
    }, 800)
  }, [project, onProjectUpdate])

  if (!project) return null

  const statusConfig = FILL_STATUSES.find((s) => s.value === project.status) ?? FILL_STATUSES[0]

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className={`!max-w-none overflow-hidden p-0 flex flex-col ${dragging ? "select-none" : ""}`}
        style={{ width }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-3 -translate-x-1/2 cursor-col-resize z-[60] group"
        >
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors ${dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"}`} />
        </div>

        <ScrollArea className="flex-1 min-h-0 overscroll-contain">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 pr-12 space-y-3">
            <SheetTitle className="text-lg">{project.name}</SheetTitle>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                <span className={`size-1.5 rounded-full shrink-0 ${statusConfig.dot}`} />
                {statusConfig.label}
              </span>
              <Badge variant="outline" className="tabular-nums text-[11px]">
                #{project.catalogId}
              </Badge>
              {project.location && (
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  <MapPinIcon className="size-2.5 mr-1" />
                  {project.location}
                </span>
              )}
            </div>
          </SheetHeader>

          <Separator />

          {/* Tabs */}
          <div className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="materials">
                  Materials
                  {materials.length > 0 && (
                    <Badge variant="secondary" className="ml-1.5 tabular-nums text-[10px] px-1.5 py-0">
                      {materials.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="chess">Chess Board</TabsTrigger>
                <TabsTrigger value="history">
                  History
                  {changeLog.length > 0 && (
                    <Badge variant="secondary" className="ml-1.5 tabular-nums text-[10px] px-1.5 py-0">
                      {changeLog.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="space-y-4">
                  <div>
                    <KVRow label="Catalog ID" value={`#${project.catalogId}`} href={`https://unitbox.ai/project/${project.catalogId}`} icon={HashIcon} />
                    <KVRow label="Location" value={project.location || "—"} icon={MapPinIcon} />
                    <KVRow label="Units" value={`${project.unitsCount} units / ${project.unitTypesCount} types`} icon={LayersIcon} />
                    <KVRow label="Filled" value={formatDate(project.fillDate)} icon={CalendarIcon} />
                    <KVRow label="Iterations" value={String(project.fillIterations)} icon={WrenchIcon} />
                    <KVRow label="Corrections" value={String(project.fillCorrections)} icon={AlertCircleIcon} />
                    {project.driveFolderUrl && (
                      <KVRow label="Drive" value="Open Folder" href={project.driveFolderUrl} icon={FolderIcon} />
                    )}
                    {project.sheetsUrl && (
                      <KVRow label="Sheets" value="Open Sheets" href={project.sheetsUrl} icon={TableIcon} />
                    )}
                  </div>

                  {/* Rules added */}
                  {project.rulesAdded.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Rules Added</p>
                      <div className="flex flex-wrap gap-1">
                        {project.rulesAdded.map((rule) => (
                          <Badge key={rule} variant="secondary" className="text-[11px]">
                            {rule}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Notes</p>
                    <Textarea
                      placeholder="Add notes about this project..."
                      value={project.notes}
                      onChange={(e) => handleNotesChange(e.target.value)}
                      className="min-h-[60px] text-sm resize-y"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Materials Tab */}
              <TabsContent value="materials">
                <MaterialsSection
                  projectId={project.id}
                  materials={materials}
                  onMaterialsChange={setMaterials}
                />
              </TabsContent>

              {/* Chess Board Tab */}
              <TabsContent value="chess">
                <ChessSection
                  chessSources={chessSources}
                  onChessSourcesChange={setChessSources}
                />
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history">
                <ChangeLogSection changeLog={changeLog} />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
