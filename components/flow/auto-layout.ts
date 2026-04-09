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
    nodesep: 80,
    ranksep: 120,
    edgesep: 40,
  })

  nodes.forEach((node) => {
    // Estimate node dimensions based on type
    const width = node.type === "decision" ? 200 : 300
    const height = node.type === "decision" ? 100 : 180
    g.setNode(node.id, { width, height })
  })

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  Dagre.layout(g)

  const layoutedNodes = nodes.map((node) => {
    const pos = g.node(node.id)
    // dagre gives center position, React Flow uses top-left
    const width = node.type === "decision" ? 200 : 300
    const height = node.type === "decision" ? 100 : 180
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
