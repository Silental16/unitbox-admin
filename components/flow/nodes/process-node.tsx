"use client"

import { memo, useCallback, useRef, useState } from "react"
import { type NodeProps, NodeResizer } from "@xyflow/react"
import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"
import { useFlowStore } from "../flow-store"
import { NodeHandles } from "./node-handles"
import type { ProcessNode, ProcessNodeColor } from "../types"

const COLORS: ProcessNodeColor[] = ["blue", "green", "orange", "purple", "red"]

const colorMap: Record<ProcessNodeColor, { dot: string }> = {
  blue: { dot: "bg-blue-500" },
  green: { dot: "bg-emerald-500" },
  orange: { dot: "bg-orange-500" },
  purple: { dot: "bg-violet-500" },
  red: { dot: "bg-red-500" },
}

const defaultShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"
const selectedShadow =
  "rgb(15,15,16) 0px 0px 0px 2px, 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

function ProcessNodeComponent({ id, data, selected }: NodeProps<ProcessNode>) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData)
  const deleteNode = useFlowStore((s) => s.deleteNode)

  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState("")
  const [editingContent, setEditingContent] = useState(false)
  const [contentDraft, setContentDraft] = useState("")
  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const { label, color, content } = data

  const cycleColor = useCallback(() => {
    const idx = COLORS.indexOf(color)
    updateNodeData(id, { color: COLORS[(idx + 1) % COLORS.length] })
  }, [id, color, updateNodeData])

  const startEditTitle = useCallback(() => {
    setTitleDraft(label)
    setEditingTitle(true)
    setTimeout(() => titleInputRef.current?.focus(), 0)
  }, [label])

  const confirmTitle = useCallback(() => {
    setEditingTitle(false)
    if (titleDraft.trim()) updateNodeData(id, { label: titleDraft.trim() })
  }, [id, titleDraft, updateNodeData])

  const startEditContent = useCallback(() => {
    setContentDraft(content)
    setEditingContent(true)
    setTimeout(() => contentRef.current?.focus(), 0)
  }, [content])

  const confirmContent = useCallback(() => {
    setEditingContent(false)
    updateNodeData(id, { content: contentDraft })
  }, [id, contentDraft, updateNodeData])

  return (
    <div
      className="group relative min-w-[200px] bg-white rounded-2xl"
      style={{ boxShadow: selected ? selectedShadow : defaultShadow }}
    >
      <NodeResizer
        minWidth={200}
        minHeight={80}
        isVisible={!!selected}
        lineStyle={{ border: "none" }}
        handleStyle={{ opacity: 0, width: 12, height: 12 }}
      />

      {/* Title */}
      <div className="flex items-center gap-2 px-3.5 pt-3 pb-1">
        <button
          onClick={cycleColor}
          className={cn("size-2.5 shrink-0 rounded-full", colorMap[color].dot)}
        />
        {editingTitle ? (
          <input
            ref={titleInputRef}
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmTitle()
              if (e.key === "Escape") setEditingTitle(false)
            }}
            onBlur={confirmTitle}
            className="flex-1 bg-transparent text-[14px] font-medium outline-none"
            style={{
              color: "rgb(15,15,16)",
              borderBottom: "1px solid rgba(0,0,29,0.1)",
            }}
          />
        ) : (
          <span
            onDoubleClick={startEditTitle}
            className="flex-1 truncate text-[14px] font-medium cursor-default select-none"
            style={{ color: "rgb(15,15,16)" }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Content — markdown or textarea */}
      <div className="px-3.5 pb-3">
        {editingContent ? (
          <textarea
            ref={contentRef}
            value={contentDraft}
            onChange={(e) => setContentDraft(e.target.value)}
            onBlur={confirmContent}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditingContent(false)
                setContentDraft(content)
              }
            }}
            className="w-full resize-none rounded-lg px-2 py-1.5 text-[13px] outline-none"
            style={{
              backgroundColor: "rgba(0,0,23,0.043)",
              color: "rgb(15,15,16)",
              minHeight: 60,
            }}
            rows={4}
            placeholder="Write markdown..."
          />
        ) : (
          <div
            onDoubleClick={startEditContent}
            className="cursor-text select-none prose-sm"
            style={{ color: "rgb(120,120,129)" }}
          >
            {content ? (
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-[13px] leading-relaxed mb-1 last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-[13px] list-disc pl-4 mb-1 space-y-0.5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-[13px] list-decimal pl-4 mb-1 space-y-0.5">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[13px]">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold" style={{ color: "rgb(15,15,16)" }}>
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code
                      className="rounded px-1 py-0.5 text-[12px]"
                      style={{ backgroundColor: "rgba(0,0,23,0.043)" }}
                    >
                      {children}
                    </code>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <span
                className="text-[13px] italic"
                style={{ color: "rgba(0,0,17,0.25)" }}
              >
                Double-click to edit...
              </span>
            )}
          </div>
        )}
      </div>

      <NodeHandles />
    </div>
  )
}

export const ProcessNodeWidget = memo(ProcessNodeComponent)
export default ProcessNodeWidget
