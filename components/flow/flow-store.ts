import { create } from "zustand"
import { temporal } from "zundo"
import {
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Viewport,
} from "@xyflow/react"
import type {
  FlowNode,
  FlowEdge,
  FlowEdgeType,
  FlowEdgeData,
  ProcessNodeData,
  JobNodeData,
  Frequency,
  TriggerType,
} from "./types"
import { mockNodes, mockEdges } from "./mock-data"
import { getLayoutedElements } from "./auto-layout"
import { createClient } from "@/lib/supabase/client"

let saveTimeout: ReturnType<typeof setTimeout> | null = null

function saveToSupabase(flowId: string, nodes: FlowNode[], edges: FlowEdge[]) {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(async () => {
    const supabase = createClient()
    await supabase
      .from("flows")
      .update({ data: { nodes, edges } })
      .eq("id", flowId)
  }, 500)
}

type FlowState = {
  flowId: string | null
  nodes: FlowNode[]
  edges: FlowEdge[]
  viewport: Viewport
  activeEdgeType: FlowEdgeType

  setFlowId: (id: string) => void
  onNodesChange: (changes: NodeChange<FlowNode>[]) => void
  onEdgesChange: (changes: EdgeChange<FlowEdge>[]) => void
  onConnect: (connection: Connection) => void
  setActiveEdgeType: (type: FlowEdgeType) => void
  setViewport: (viewport: Viewport) => void

  addNode: (type: "process" | "job", position: { x: number; y: number }) => void
  deleteNode: (id: string) => void
  duplicateNode: (id: string) => void
  updateNodeData: <T extends FlowNode["type"]>(
    id: string,
    data: Partial<Extract<FlowNode, { type: T }>["data"]>
  ) => void

  updateEdgeData: (id: string, data: Partial<FlowEdgeData>) => void
  importFlow: (nodes: FlowNode[], edges: FlowEdge[], viewport?: Viewport) => void
  autoLayout: (direction?: "TB" | "LR") => void
  reset: () => void
  exportJSON: () => string
  loadFromSupabase: (flowId: string) => Promise<void>
  updateFlowName: (name: string) => Promise<void>
}

let idCounter = Date.now()
function nextId() {
  return `node-${idCounter++}`
}

const defaultProcessData: ProcessNodeData = {
  label: "New Process",
  color: "blue",
  content: "",
}

const defaultJobData: JobNodeData = {
  label: "New Job",
  level: "small",
  jobType: "sequential",
  context: "",
  trigger: "",
  emotionsA: "",
  expectedResult: "",
  successCriteria: "",
  soThat: "",
  problems: "",
  problemSeverity: 0,
  viewMode: "note",
  emotionsB: "",
  activatingKnowledge: "",
  currentSolution: "",
  solutionSatisfaction: 0,
  considerationSet: "",
  barriersToSolution: "",
  barriersToJob: "",
  frequency: "monthly" as Frequency,
  importance: 0,
  valueDirection: "",
  businessJob: "",
  personalJob: "",
  triggerType: "planned-external" as TriggerType,
}

export const useFlowStore = create<FlowState>()(
  temporal(
    (set, get) => ({
  flowId: null,
  nodes: mockNodes,
  edges: mockEdges,
  viewport: { x: 0, y: 0, zoom: 1 },
  activeEdgeType: "normal",

  setFlowId: (id) => set({ flowId: id }),

  onNodesChange: (changes) => {
    set((s) => {
      const nodes = applyNodeChanges(changes, s.nodes) as FlowNode[]
      if (s.flowId) saveToSupabase(s.flowId, nodes, s.edges)
      return { nodes }
    })
  },

  onEdgesChange: (changes) => {
    set((s) => {
      const edges = applyEdgeChanges(changes, s.edges) as FlowEdge[]
      if (s.flowId) saveToSupabase(s.flowId, s.nodes, edges)
      return { edges }
    })
  },

  onConnect: (connection) => {
    set((s) => {
      const newEdge: FlowEdge = {
        id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        type: "custom",
        data: { flowType: s.activeEdgeType },
      }
      const edges = [...s.edges, newEdge] as FlowEdge[]
      if (s.flowId) saveToSupabase(s.flowId, s.nodes, edges)
      return { edges }
    })
  },

  setActiveEdgeType: (type) => set({ activeEdgeType: type }),

  setViewport: (viewport) => {
    set({ viewport })
  },

  addNode: (type, position) => {
    const id = nextId()
    let node: FlowNode
    if (type === "process") {
      node = { id, type: "process", position, data: { ...defaultProcessData } }
    } else {
      node = { id, type: "job", position, data: { ...defaultJobData } }
    }
    set((s) => {
      const nodes = [...s.nodes, node]
      if (s.flowId) saveToSupabase(s.flowId, nodes, s.edges)
      return { nodes }
    })
  },

  deleteNode: (id) => {
    set((s) => {
      const nodes = s.nodes.filter((n) => n.id !== id)
      const edges = s.edges.filter((e) => e.source !== id && e.target !== id)
      if (s.flowId) saveToSupabase(s.flowId, nodes, edges)
      return { nodes, edges }
    })
  },

  duplicateNode: (id) => {
    const node = get().nodes.find((n) => n.id === id)
    if (!node) return
    const newId = nextId()
    const clone = {
      ...node,
      id: newId,
      position: { x: node.position.x + 30, y: node.position.y + 30 },
      data: { ...node.data },
      selected: false,
    }
    set((s) => {
      const nodes = [...s.nodes, clone] as FlowNode[]
      if (s.flowId) saveToSupabase(s.flowId, nodes, s.edges)
      return { nodes }
    })
  },

  updateNodeData: (id, data) => {
    set((s) => {
      const nodes = s.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ) as FlowNode[]
      if (s.flowId) saveToSupabase(s.flowId, nodes, s.edges)
      return { nodes }
    })
  },

  updateEdgeData: (id, data) => {
    set((s) => {
      const edges = s.edges.map((e) =>
        e.id === id ? { ...e, data: { ...e.data, ...data } } as FlowEdge : e
      ) as FlowEdge[]
      if (s.flowId) saveToSupabase(s.flowId, s.nodes, edges)
      return { edges }
    })
  },

  importFlow: (nodes, edges, viewport) => {
    const vp = viewport ?? { x: 0, y: 0, zoom: 1 }
    set({ nodes, edges, viewport: vp })
    const { flowId } = get()
    if (flowId) saveToSupabase(flowId, nodes, edges)
  },

  autoLayout: (direction: "TB" | "LR" = "LR") => {
    const { nodes, edges, flowId } = get()
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction)
    set({ nodes: layoutedNodes, edges: layoutedEdges })
    if (flowId) saveToSupabase(flowId, layoutedNodes, layoutedEdges)
  },

  reset: () => {
    const { flowId } = get()
    set({ nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } })
    if (flowId) saveToSupabase(flowId, [], [])
  },

  exportJSON: () => {
    const { nodes, edges, viewport } = get()
    return JSON.stringify({ nodes, edges, viewport }, null, 2)
  },

  loadFromSupabase: async (flowId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("flows")
      .select("*")
      .eq("id", flowId)
      .single()

    if (data && !error) {
      const rawNodes: FlowNode[] = (data.data as any)?.nodes ?? []
      const rawEdges: FlowEdge[] = (data.data as any)?.edges ?? []

      // Filter out legacy decision nodes
      const decisionIds = new Set(
        rawNodes.filter((n) => (n as any).type === "decision").map((n) => n.id)
      )
      const nodes = rawNodes
        .filter((n) => (n as any).type !== "decision")
        .map((n) => {
          if (n.type === "job") {
            const d = n.data as any
            return {
              ...n,
              data: {
                ...defaultJobData,
                ...d,
                // Migrate old expanded → viewMode
                viewMode:
                  d.viewMode ??
                  (d.expanded === true ? "standard" : "note"),
              },
            } as FlowNode
          }
          return n
        })
      const edges = rawEdges.filter(
        (e) => !decisionIds.has(e.source) && !decisionIds.has(e.target)
      )

      set({ flowId, nodes, edges })
    }
  },

  updateFlowName: async (name: string) => {
    const { flowId } = get()
    if (!flowId) return
    const supabase = createClient()
    await supabase.from("flows").update({ name }).eq("id", flowId)
  },
    }),
    {
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
      }),
      limit: 50,
    }
  )
)

export const useTemporalStore = () => useFlowStore.temporal.getState()
