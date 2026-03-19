export type ThreatLevel = "high" | "medium" | "low"

export type ChainLink = "developer" | "agent" | "buyer" | "developer_agent" | "agent_buyer" | "full_stack"

export type CompetitorResearchStatus = "not_started" | "in_progress" | "completed"

export const THREAT_LEVELS: { value: ThreatLevel; label: string; dot: string; bg: string; text: string }[] = [
  { value: "high", label: "High", dot: "bg-red-500", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
  { value: "medium", label: "Medium", dot: "bg-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  { value: "low", label: "Low", dot: "bg-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
]

export const CHAIN_LINKS: { value: ChainLink; label: string }[] = [
  { value: "developer", label: "Developer Tools" },
  { value: "agent", label: "Agent Tools" },
  { value: "buyer", label: "Buyer-Facing" },
  { value: "developer_agent", label: "Dev + Agent" },
  { value: "agent_buyer", label: "Agent + Buyer" },
  { value: "full_stack", label: "Full Stack" },
]

export interface Competitor {
  id: string
  name: string
  url: string
  chainLink: ChainLink
  geo: string
  businessModel: string
  threatLevel: ThreatLevel
  sizeSignal: string
  whatItDoes: string
  confidence: string
  // Dossier blocks
  snapshot: string
  productAnalysis: string
  targetMarket: string
  pricingModel: string
  distributionGtm: string
  marketing: string
  techStack: string
  strengths: string
  weaknesses: string
  threatAssessment: string
  attackVectors: string
  // Meta
  notes: string
  researchStatus: CompetitorResearchStatus
  researchedAt: string | null
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToCompetitor(row: Record<string, any>): Competitor {
  return {
    id: row.id as string,
    name: (row.name ?? "") as string,
    url: (row.url ?? "") as string,
    chainLink: (row.chain_link ?? "developer") as ChainLink,
    geo: (row.geo ?? "") as string,
    businessModel: (row.business_model ?? "") as string,
    threatLevel: (row.threat_level ?? "medium") as ThreatLevel,
    sizeSignal: (row.size_signal ?? "") as string,
    whatItDoes: (row.what_it_does ?? "") as string,
    confidence: (row.confidence ?? "") as string,
    snapshot: (row.snapshot ?? "") as string,
    productAnalysis: (row.product_analysis ?? "") as string,
    targetMarket: (row.target_market ?? "") as string,
    pricingModel: (row.pricing_model ?? "") as string,
    distributionGtm: (row.distribution_gtm ?? "") as string,
    marketing: (row.marketing ?? "") as string,
    techStack: (row.tech_stack ?? "") as string,
    strengths: (row.strengths ?? "") as string,
    weaknesses: (row.weaknesses ?? "") as string,
    threatAssessment: (row.threat_assessment ?? "") as string,
    attackVectors: (row.attack_vectors ?? "") as string,
    notes: (row.notes ?? "") as string,
    researchStatus: (row.research_status ?? "not_started") as CompetitorResearchStatus,
    researchedAt: (row.researched_at ?? null) as string | null,
    createdAt: (row.created_at ?? "") as string,
  }
}
