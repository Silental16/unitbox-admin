"use client"

import { Handle, Position } from "@xyflow/react"

// 4 handles — one per side, centered, positioned OUTSIDE the node
const handles = [
  { type: "source" as const, position: Position.Top, id: "source-top" },
  { type: "source" as const, position: Position.Right, id: "source-right" },
  { type: "source" as const, position: Position.Bottom, id: "source-bottom" },
  { type: "source" as const, position: Position.Left, id: "source-left" },
  { type: "target" as const, position: Position.Top, id: "target-top" },
  { type: "target" as const, position: Position.Right, id: "target-right" },
  { type: "target" as const, position: Position.Bottom, id: "target-bottom" },
  { type: "target" as const, position: Position.Left, id: "target-left" },
]

export function NodeHandles() {
  return (
    <>
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: 8,
            height: 8,
            background: "#1a192b",
            border: "1.5px solid white",
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.15s",
          }}
        />
      ))}
    </>
  )
}
