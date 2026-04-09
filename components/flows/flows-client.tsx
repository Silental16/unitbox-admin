"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusIcon, WorkflowIcon, MoreHorizontalIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Flow } from "@/lib/data/flows"

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function FlowsClient({
  flows: initialFlows,
  userId,
}: {
  flows: Flow[]
  userId: string
}) {
  const [flows, setFlows] = useState(initialFlows)
  const router = useRouter()
  const supabase = createClient()

  async function handleCreate() {
    const { data, error } = await supabase
      .from("flows")
      .insert({ name: "Untitled Flow", user_id: userId })
      .select()
      .single()

    if (error) {
      console.error("Failed to create flow:", error)
      return
    }

    router.push(`/flows/${data.id}`)
  }

  async function handleDelete(flowId: string) {
    setFlows((prev) => prev.filter((f) => f.id !== flowId))

    const { error } = await supabase
      .from("flows")
      .delete()
      .eq("id", flowId)

    if (error) {
      console.error("Failed to delete flow:", error)
      setFlows(initialFlows)
    }
  }

  if (flows.length === 0) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Flows</h1>
          <Button onClick={handleCreate} className="rounded-xl">
            <PlusIcon className="size-4" />
            New Flow
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
          <WorkflowIcon className="size-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No flows yet</p>
          <Button onClick={handleCreate} variant="outline" className="rounded-xl">
            Create your first flow
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Flows</h1>
        <Button onClick={handleCreate} className="rounded-xl">
          <PlusIcon className="size-4" />
          New Flow
        </Button>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Recent flows
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flows.map((flow) => (
            <Link
              key={flow.id}
              href={`/flows/${flow.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center">
                <WorkflowIcon className="size-10 text-muted-foreground/30" />
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg bg-white/90 dark:bg-black/90"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(flow.id)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[13px] font-medium truncate">{flow.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Updated {timeAgo(flow.updatedAt)} · Owner
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
