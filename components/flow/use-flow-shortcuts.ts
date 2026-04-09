"use client"

import { useEffect } from "react"
import { useReactFlow } from "@xyflow/react"
import { useFlowStore } from "./flow-store"

export function useFlowShortcuts() {
  const { getNodes } = useReactFlow()
  const deleteNode = useFlowStore((s) => s.deleteNode)
  const duplicateNode = useFlowStore((s) => s.duplicateNode)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if editing text
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return

      const isMod = e.metaKey || e.ctrlKey

      // Undo: Ctrl/Cmd + Z
      if (isMod && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        useFlowStore.temporal.getState().undo()
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if ((isMod && e.key === "z" && e.shiftKey) || (isMod && e.key === "y")) {
        e.preventDefault()
        useFlowStore.temporal.getState().redo()
      }

      // Duplicate: Ctrl/Cmd + D
      if (isMod && e.key === "d") {
        e.preventDefault()
        const selected = getNodes().filter((n) => n.selected)
        selected.forEach((node) => duplicateNode(node.id))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [getNodes, deleteNode, duplicateNode])
}
