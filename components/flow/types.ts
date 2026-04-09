import type { Node, Edge } from "@xyflow/react"

// -- Process Node --
export type ProcessNodeColor = "blue" | "green" | "orange" | "purple" | "red"

export type ProcessNodeData = {
  label: string
  color: ProcessNodeColor
  content: string
}

// -- Job Node (AJTBD) --
export type JobLevel = "core" | "small" | "micro"
export type JobType =
  | "frequency"
  | "sequential"
  | "viral"
  | "tax"
  | "orientational"

export type JobNodeData = {
  label: string
  level: JobLevel
  jobType: JobType
  context: string
  trigger: string
  emotionsA: string
  expectedResult: string
  successCriteria: string
  soThat: string
  problems: string
  problemSeverity: number
  expanded: boolean
}

// -- Decision Node --
export type DecisionNodeData = {
  question: string
}

// -- Edge --
export type FlowEdgeType = "normal" | "critical" | "problem"
export type FlowMarker = "none" | "arrow-end" | "arrow-start" | "arrow-both"

export type FlowEdgeData = {
  flowType: FlowEdgeType
  label?: string
  marker?: FlowMarker
}

// -- Union types --
export type ProcessNode = Node<ProcessNodeData, "process">
export type JobNode = Node<JobNodeData, "job">
export type DecisionNode = Node<DecisionNodeData, "decision">
export type FlowNode = ProcessNode | JobNode | DecisionNode
export type FlowEdge = Edge<FlowEdgeData>
