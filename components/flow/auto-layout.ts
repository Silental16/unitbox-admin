import Dagre from "@dagrejs/dagre"
import type { FlowNode, FlowEdge } from "./types"

export function getLayoutedElements(
  nodes: FlowNode[],
  edges: FlowEdge[],
  direction: "TB" | "LR" = "LR"
): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

  g.setGraph({
    rankdir: direction,
    nodesep: 60,
    ranksep: 160,
    edgesep: 40,
  })

  const jobHeights: Record<string, number> = { note: 100, core: 160, standard: 350, microscope: 600 }

  nodes.forEach((node) => {
    let width = 300
    let height = 180
    if (node.type === "job") {
      const vm = (node.data as any).viewMode || "note"
      height = jobHeights[vm] ?? 180
    }
    g.setNode(node.id, { width, height })
  })

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  Dagre.layout(g)

  const layoutedNodes = nodes.map((node) => {
    const pos = g.node(node.id)
    // dagre gives center position, React Flow uses top-left
    let width = 300
    let height = 180
    if (node.type === "job") {
      const vm = (node.data as any).viewMode || "note"
      height = jobHeights[vm] ?? 180
    }
    return {
      ...node,
      position: {
        x: pos.x - width / 2,
        y: pos.y - height / 2,
      },
    }
  })

  return { nodes: layoutedNodes as FlowNode[], edges }
}
