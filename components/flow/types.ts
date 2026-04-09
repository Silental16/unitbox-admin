import type { Node, Edge } from "@xyflow/react"

// -- Process Node --
export type ProcessNodeColor = "blue" | "green" | "orange" | "purple" | "red"

export type ProcessNodeData = {
  label: string
  color: ProcessNodeColor
  content: string
}

// -- Job Node (AJTBD) --
export type JobLevel = "big" | "core" | "small" | "micro"
export type JobType =
  | "frequency"
  | "sequential"
  | "viral"
  | "tax"
  | "orientational"

export type JobViewMode = "note" | "core" | "standard" | "microscope"
export type Frequency = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "once"
export type TriggerType = "planned-external" | "planned-internal" | "unexpected-external" | "unexpected-internal"

export type JobNodeData = {
  label: string
  summary: string
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
  viewMode: JobViewMode
  emotionsB: string
  activatingKnowledge: string
  currentSolution: string
  solutionSatisfaction: number
  considerationSet: string
  barriersToSolution: string
  barriersToJob: string
  frequency: Frequency
  importance: number
  valueDirection: string
  businessJob: string
  personalJob: string
  triggerType: TriggerType
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
export type FlowNode = ProcessNode | JobNode
export type FlowEdge = Edge<FlowEdgeData>
