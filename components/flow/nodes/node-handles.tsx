"use client"

import { Handle, Position } from "@xyflow/react"

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

const handleStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  background: "rgb(15,15,16)",
  border: "1.5px solid white",
  borderRadius: "50%",
  opacity: 0,
  transition: "opacity 0.15s ease",
}

export function NodeHandles() {
  return (
    <>
      <style>{`
        .react-flow__node:hover .react-flow__handle { opacity: 1 !important; }
        .react-flow__handle:hover { transform: scale(1.3); }
      `}</style>
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={handleStyle}
        />
      ))}
    </>
  )
}
