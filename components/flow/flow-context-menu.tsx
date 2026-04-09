"use client"

import { useCallback, useRef, useEffect, useState } from "react"
import { useReactFlow } from "@xyflow/react"
import { Copy, Trash2 } from "lucide-react"
import { useFlowStore } from "./flow-store"

type MenuPosition = { x: number; y: number } | null
type MenuTarget = { type: "node"; id: string } | { type: "edge"; id: string } | { type: "pane" } | null

export function useContextMenu() {
  const [position, setPosition] = useState<MenuPosition>(null)
  const [target, setTarget] = useState<MenuTarget>(null)

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: any) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setTarget({ type: "node", id: node.id })
  }, [])

  const onEdgeContextMenu = useCallback((event: React.MouseEvent, edge: any) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setTarget({ type: "edge", id: edge.id })
  }, [])

  const onPaneContextMenu = useCallback((event: MouseEvent | React.MouseEvent) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setTarget({ type: "pane" })
  }, [])

  const close = useCallback(() => {
    setPosition(null)
    setTarget(null)
  }, [])

  return { position, target, onNodeContextMenu, onEdgeContextMenu, onPaneContextMenu, close }
}

export function FlowContextMenu({
  position,
  target,
  onClose,
}: {
  position: { x: number; y: number }
  target: { type: "node" | "edge" | "pane"; id?: string }
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const deleteNode = useFlowStore((s) => s.deleteNode)
  const duplicateNode = useFlowStore((s) => s.duplicateNode)
  const { deleteElements, screenToFlowPosition } = useReactFlow()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("click", handleClick)
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  const shadow = "0 0 0 1px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06)"

  const menuItemClass =
    "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-[13px] transition-colors hover:bg-[rgba(0,0,23,0.043)]"

  return (
    <div
      ref={ref}
      className="fixed z-[100] min-w-[180px] rounded-[14px] bg-white p-1.5"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: shadow,
        color: "rgb(15, 15, 16)",
      }}
    >
      {target.type === "node" && target.id && (
        <>
          <button
            className={menuItemClass}
            onClick={() => {
              duplicateNode(target.id!)
              onClose()
            }}
          >
            <Copy className="size-3.5" style={{ color: "rgb(120,120,129)" }} />
            Duplicate
            <span className="ml-auto text-[11px]" style={{ color: "rgb(120,120,129)" }}>&#x2318;D</span>
          </button>
          <div className="my-1 h-px" style={{ backgroundColor: "rgba(0,0,29,0.075)" }} />
          <button
            className={menuItemClass}
            style={{ color: "rgb(220, 38, 38)" }}
            onClick={() => {
              deleteNode(target.id!)
              onClose()
            }}
          >
            <Trash2 className="size-3.5" />
            Delete
            <span className="ml-auto text-[11px]" style={{ color: "rgb(220,38,38,0.5)" }}>&#x232B;</span>
          </button>
        </>
      )}

      {target.type === "edge" && target.id && (
        <button
          className={menuItemClass}
          style={{ color: "rgb(220, 38, 38)" }}
          onClick={() => {
            deleteElements({ edges: [{ id: target.id! }] })
            onClose()
          }}
        >
          <Trash2 className="size-3.5" />
          Delete edge
          <span className="ml-auto text-[11px]" style={{ color: "rgb(220,38,38,0.5)" }}>&#x232B;</span>
        </button>
      )}

      {target.type === "pane" && (
        <>
          <button
            className={menuItemClass}
            onClick={() => {
              const flowPos = screenToFlowPosition({ x: position.x, y: position.y })
              useFlowStore.getState().addNode("process", flowPos)
              onClose()
            }}
          >
            Add Process
          </button>
          <button
            className={menuItemClass}
            onClick={() => {
              const flowPos = screenToFlowPosition({ x: position.x, y: position.y })
              useFlowStore.getState().addNode("job", flowPos)
              onClose()
            }}
          >
            Add Job
          </button>
        </>
      )}
    </div>
  )
}
