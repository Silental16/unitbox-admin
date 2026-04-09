"use client"

import { useEffect, useState, useCallback } from "react"
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
import { ArrowLeft } from "lucide-react"
import { useFlowStore } from "@/components/flow/flow-store"
import { FlowToolbar } from "@/components/flow/flow-toolbar"
import { FlowSidebar } from "@/components/flow/flow-sidebar"
import { FlowContextMenu, useContextMenu } from "@/components/flow/flow-context-menu"
import { EdgeEditor } from "@/components/flow/edge-editor"
import { useFlowShortcuts } from "@/components/flow/use-flow-shortcuts"
import { ProcessNodeWidget } from "@/components/flow/nodes/process-node"
import { JobNodeMemo } from "@/components/flow/nodes/job-node"
import { DecisionNodeWidget } from "@/components/flow/nodes/decision-node"
import { CustomEdge } from "@/components/flow/edges/custom-edge"
import { SaveIndicator } from "@/components/flow/save-indicator"

// Register node and edge types OUTSIDE the component
const nodeTypes = {
  process: ProcessNodeWidget,
  job: JobNodeMemo,
  decision: DecisionNodeWidget,
}
const edgeTypes = { custom: CustomEdge }

interface FlowEditorProps {
  flowId: string
  flowName: string
  initialNodes: FlowNode[]
  initialEdges: FlowEdge[]
}

function FlowCanvas({ flowId, flowName, initialNodes, initialEdges }: FlowEditorProps) {
  const store = useFlowStore()
  const [name, setName] = useState(flowName)

  // Initialize store with server data on mount
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

  // Editable flow name in header
  const handleNameBlur = useCallback(async () => {
    if (name !== flowName) {
      await store.updateFlowName(name)
    }
  }, [name, flowName, store])

  return (
    <div className="h-[calc(100vh-50px)] -mx-5 -my-8 flex">
      <div className="flex-1 relative">
        {/* Header with back button and editable name */}
        <div className="absolute top-3 left-14 z-10 flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur()
            }}
            className="text-sm font-medium bg-transparent border-none outline-none px-2 py-1 rounded-lg hover:bg-accent/50 focus:bg-accent/50 transition-colors"
          />
          <SaveIndicator />
        </div>

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
          <MiniMap className="!bottom-16 !right-4" />
        </ReactFlow>

        {/* Bottom toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <FlowToolbar />
        </div>

        <FlowSidebar />
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
