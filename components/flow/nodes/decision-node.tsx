"use client"

import { memo, useCallback, useRef, useState } from "react"
import { type NodeProps, NodeResizer } from "@xyflow/react"
import { useFlowStore } from "../flow-store"
import { NodeHandles } from "./node-handles"
import type { DecisionNode } from "../types"

const defaultShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"
const selectedShadow =
  "rgb(15,15,16) 0px 0px 0px 2px, 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

function DecisionNodeComponent({ id, data, selected }: NodeProps<DecisionNode>) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const startEdit = useCallback(() => {
    setDraft(data.question)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [data.question])

  const confirm = useCallback(() => {
    setEditing(false)
    if (draft.trim()) updateNodeData(id, { question: draft.trim() })
  }, [id, draft, updateNodeData])

  return (
    <div
      className="group relative min-w-[150px] bg-white rounded-2xl"
      style={{ boxShadow: selected ? selectedShadow : defaultShadow }}
    >
      <NodeResizer
        minWidth={150}
        minHeight={80}
        isVisible={!!selected}
        lineStyle={{ border: "none" }}
        handleStyle={{ opacity: 0, width: 12, height: 12 }}
      />

      <div className="flex justify-center pt-3 pb-1.5">
        <div className="size-4 rotate-45 rounded-sm bg-amber-500/80" />
      </div>

      <div className="px-3.5 pb-3 text-center">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") confirm(); if (e.key === "Escape") setEditing(false) }}
            onBlur={confirm}
            className="w-full bg-transparent text-[13px] font-medium outline-none text-center"
            style={{ color: "rgb(15,15,16)", borderBottom: "1px solid rgba(0,0,29,0.1)" }}
          />
        ) : (
          <span onDoubleClick={startEdit} className="text-[13px] font-medium cursor-default select-none" style={{ color: "rgb(15,15,16)" }}>
            {data.question}
          </span>
        )}
      </div>

      <NodeHandles />
    </div>
  )
}

export const DecisionNodeWidget = memo(DecisionNodeComponent)
export default DecisionNodeWidget
