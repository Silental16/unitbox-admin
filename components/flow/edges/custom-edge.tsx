"use client"

import { memo } from "react"
import {
  EdgeLabelRenderer,
  getBezierPath,
  Position,
  useInternalNode,
  type EdgeProps,
} from "@xyflow/react"
import type { FlowEdge } from "../types"
import { cn } from "@/lib/utils"

const edgeStyles = {
  normal: { stroke: "rgb(147, 165, 247)", strokeWidth: 1.5 },
  critical: { stroke: "rgb(99, 45, 216)", strokeWidth: 2 },
  problem: { stroke: "rgb(219, 119, 6)", strokeWidth: 1.5, strokeDasharray: "6 3" },
} as const

const labelClasses = {
  critical: "bg-violet-100 text-violet-700",
  problem: "bg-orange-100 text-orange-700",
  normal: "",
} as const

function getBestSides(
  sx: number, sy: number, sw: number, sh: number,
  tx: number, ty: number, tw: number, th: number,
): { sourcePos: Position; targetPos: Position } {
  const sCx = sx + sw / 2
  const sCy = sy + sh / 2
  const tCx = tx + tw / 2
  const tCy = ty + th / 2
  const dx = tCx - sCx
  const dy = tCy - sCy
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)

  if (absDx > absDy) {
    return dx > 0
      ? { sourcePos: Position.Right, targetPos: Position.Left }
      : { sourcePos: Position.Left, targetPos: Position.Right }
  } else {
    return dy > 0
      ? { sourcePos: Position.Bottom, targetPos: Position.Top }
      : { sourcePos: Position.Top, targetPos: Position.Bottom }
  }
}

function getPoint(
  x: number, y: number, w: number, h: number,
  pos: Position, offset: number = 0,
): { x: number; y: number } {
  // Points are ON the node border — React Flow bezier handles the curve outward
  switch (pos) {
    case Position.Top:    return { x: x + w / 2 + offset, y }
    case Position.Bottom: return { x: x + w / 2 + offset, y: y + h }
    case Position.Left:   return { x, y: y + h / 2 + offset }
    case Position.Right:  return { x: x + w, y: y + h / 2 + offset }
  }
}

function CustomEdgeComponent({
  id, source, target,
  data, selected,
}: EdgeProps<FlowEdge>) {
  const sourceNode = useInternalNode(source)
  const targetNode = useInternalNode(target)

  if (!sourceNode || !targetNode) return null

  const flowType = data?.flowType ?? "normal"
  const label = data?.label
  const marker = data?.marker ?? "none"
  const style = edgeStyles[flowType]
  const strokeColor = style.stroke

  const sw = sourceNode.measured?.width ?? 300
  const sh = sourceNode.measured?.height ?? 150
  const sx = sourceNode.internals.positionAbsolute.x
  const sy = sourceNode.internals.positionAbsolute.y
  const tw = targetNode.measured?.width ?? 300
  const th = targetNode.measured?.height ?? 150
  const tx = targetNode.internals.positionAbsolute.x
  const ty = targetNode.internals.positionAbsolute.y

  const { sourcePos, targetPos } = getBestSides(sx, sy, sw, sh, tx, ty, tw, th)

  // Offset for multiple edges between same nodes
  const edgeHash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const offset = ((edgeHash % 5) - 2) * 12

  const sourcePoint = getPoint(sx, sy, sw, sh, sourcePos, offset)
  const targetPoint = getPoint(tx, ty, tw, th, targetPos, offset)

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sourcePoint.x,
    sourceY: sourcePoint.y,
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    curvature: 0.4,
  })

  const markerId = `marker-${id}`
  const markerStartId = `marker-start-${id}`
  const showEnd = marker === "arrow-end" || marker === "arrow-both"
  const showStart = marker === "arrow-start" || marker === "arrow-both"

  return (
    <>
      {(showEnd || showStart) && (
        <defs>
          {showEnd && (
            <marker id={markerId} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 2 2 L 10 6 L 2 10" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            </marker>
          )}
          {showStart && (
            <marker id={markerStartId} markerWidth="12" markerHeight="12" refX="2" refY="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
              <path d="M 10 2 L 2 6 L 10 10" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            </marker>
          )}
        </defs>
      )}

      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          ...style,
          opacity: selected ? 1 : 0.6,
          transition: "opacity 0.15s",
          markerEnd: showEnd ? `url(#${markerId})` : undefined,
          markerStart: showStart ? `url(#${markerStartId})` : undefined,
        }}
        fill="none"
      />
      <path d={edgePath} fill="none" stroke="transparent" strokeWidth={20} className="react-flow__edge-interaction" />

      {label && (
        <EdgeLabelRenderer>
          <div className="nodrag nopan pointer-events-none absolute" style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}>
            <span
              className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap", labelClasses[flowType])}
              style={flowType === "normal" ? { backgroundColor: "rgba(0,0,23,0.043)", color: "rgb(120,120,129)" } : undefined}
            >
              {label}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export const CustomEdge = memo(CustomEdgeComponent)
