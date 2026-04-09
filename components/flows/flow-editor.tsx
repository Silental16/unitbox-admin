"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MiniMap,
  ConnectionMode,
} from "@xyflow/react"
import type { FlowNode, FlowEdge } from "@/components/flow/types"
import "@xyflow/react/dist/style.css"
import { PauseIcon } from "lucide-react"
import { useFlowStore } from "@/components/flow/flow-store"
import { FlowToolbar } from "@/components/flow/flow-toolbar"
import { FlowContextMenu, useContextMenu } from "@/components/flow/flow-context-menu"
import { EdgeEditor } from "@/components/flow/edge-editor"
import { useFlowShortcuts } from "@/components/flow/use-flow-shortcuts"
import { ProcessNodeWidget } from "@/components/flow/nodes/process-node"
import { JobNodeMemo } from "@/components/flow/nodes/job-node"
import { DecisionNodeWidget } from "@/components/flow/nodes/decision-node"
import { CustomEdge } from "@/components/flow/edges/custom-edge"
import { SaveIndicator } from "@/components/flow/save-indicator"

const nodeTypes = {
  process: ProcessNodeWidget,
  job: JobNodeMemo,
  decision: DecisionNodeWidget,
}
const edgeTypes = { custom: CustomEdge }

const headerShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06)"

interface FlowEditorProps {
  flowId: string
  flowName: string
  initialNodes: FlowNode[]
  initialEdges: FlowEdge[]
}

function FlowCanvas({ flowId, flowName, initialNodes, initialEdges }: FlowEditorProps) {
  const store = useFlowStore()
  const [name, setName] = useState(flowName)

  useEffect(() => {
    useFlowStore.setState({ nodes: initialNodes, edges: initialEdges, flowId })
  }, [flowId]) // eslint-disable-line react-hooks/exhaustive-deps

  useFlowShortcuts()

  const {
    position: ctxPosition,
    target: ctxTarget,
    onNodeContextMenu,
    onEdgeContextMenu,
    onPaneContextMenu,
    close: closeCtx,
  } = useContextMenu()

  const [edgeEditorState, setEdgeEditorState] = useState<{
    edgeId: string
    position: { x: number; y: number }
  } | null>(null)

  const handleEdgeDoubleClick = useCallback(
    (_event: React.MouseEvent, edge: any) => {
      setEdgeEditorState({
        edgeId: edge.id,
        position: { x: _event.clientX, y: _event.clientY },
      })
    },
    []
  )

  const handleNameBlur = useCallback(async () => {
    if (name !== flowName) {
      await store.updateFlowName(name)
    }
  }, [name, flowName, store])

  return (
    <div className="h-screen w-screen bg-[rgb(250,250,250)] relative">
      {/* Top-left header — ElevenLabs breadcrumb style */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
        <Link
          href="/flows"
          className="flex items-center gap-1.5 rounded-[10px] bg-white px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-accent/50"
          style={{ boxShadow: headerShadow, color: "rgb(91, 91, 100)" }}
        >
          <PauseIcon className="size-3.5" />
          Flows
        </Link>
        <div
          className="flex items-center rounded-[10px] bg-white py-1"
          style={{ boxShadow: headerShadow }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur()
            }}
            className="bg-transparent border-none outline-none px-3 py-0.5 text-[13px] font-medium text-foreground min-w-[120px] max-w-[300px]"
            style={{ color: "rgb(15, 15, 16)" }}
          />
        </div>
        <SaveIndicator />
      </div>

      {/* React Flow canvas */}
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: "custom" }}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[16, 16]}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <MiniMap className="!bottom-20 !right-4" />
      </ReactFlow>

      {/* Bottom toolbar — centered */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <FlowToolbar />
      </div>

      {/* Context menu */}
      {ctxPosition && ctxTarget && (
        <FlowContextMenu
          position={ctxPosition}
          target={ctxTarget}
          onClose={closeCtx}
        />
      )}

      {/* Edge editor */}
      {edgeEditorState && (
        <EdgeEditor
          edgeId={edgeEditorState.edgeId}
          position={edgeEditorState.position}
          onClose={() => setEdgeEditorState(null)}
        />
      )}
    </div>
  )
}

export function FlowEditor(props: FlowEditorProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvas {...props} />
    </ReactFlowProvider>
  )
}
