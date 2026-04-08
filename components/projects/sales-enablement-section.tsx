"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  SparklesIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  TargetIcon,
  BuildingIcon,
  StarIcon,
  TrophyIcon,
  AlertTriangleIcon,
  UserIcon,
  MessageCircleIcon,
} from "lucide-react"

export interface SalesEnablementData {
  id: string
  projectId: string
  catalogId: number | null
  hookEn: string | null
  hookRu: string | null
  salesNarrative: SalesPoint[]
  developerTrust: DeveloperTrust
  agentCheatsheet: AgentCheatsheet
  offerPoints: OfferPoint[]
  sources: Source[]
  updatedAt: string
}

interface SalesPoint {
  type: "hook" | "key_advantage" | "investor_benefit" | "concept" | "market_gap" | "guarantee"
  headline_en?: string
  headline_ru?: string
  argument_en?: string
  argument_ru?: string
  vs_market_en?: string
  vs_market_ru?: string
  source?: string
}

interface DeveloperTrust {
  years_experience?: number
  completed_sqm?: number
  total_units_delivered?: number
  employees_count?: number
  booking_rating?: number
  tripadvisor_rating?: number
  google_rating?: number
  awards?: string[]
  guarantees?: {
    construction_years?: number
    finishing_years?: number
    engineering_years?: number
    rental_pct?: number
    delay_penalty_pct?: number
  }
  has_own_management?: boolean
  is_vertically_integrated?: boolean
  media_mentions?: string[]
}

interface AgentCheatsheet {
  quick_pitch_en?: string
  quick_pitch_ru?: string
  top_selling_points?: Array<{
    point_en?: string
    point_ru?: string
    vs_market_en?: string
    vs_market_ru?: string
  }>
  objections?: Array<{
    objection_en?: string
    objection_ru?: string
    answer_en?: string
    answer_ru?: string
  }>
  ideal_buyer_en?: string
  ideal_buyer_ru?: string
  conversation_starters?: Array<{ en?: string; ru?: string }>
}

interface OfferPoint {
  type: "financial_highlight" | "unique_feature" | "location_advantage" | "lifestyle"
  title_en?: string
  title_ru?: string
  value?: string
  comparison?: string
}

interface Source {
  type: "presentation" | "website" | "notion" | "manual"
  url?: string
  extracted_at?: string
}

const TYPE_LABELS: Record<string, string> = {
  hook: "Hook",
  key_advantage: "Key Advantage",
  investor_benefit: "Investor Benefit",
  concept: "Concept",
  market_gap: "Market Gap",
  guarantee: "Guarantee",
}

const TYPE_COLORS: Record<string, string> = {
  hook: "bg-muted text-foreground",
  key_advantage: "bg-muted text-foreground",
  investor_benefit: "bg-muted text-foreground",
  concept: "bg-muted text-foreground",
  market_gap: "bg-muted text-foreground",
  guarantee: "bg-muted text-foreground",
}

export function SalesEnablementSection({ data }: { data: SalesEnablementData | null }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <SparklesIcon className="size-8 mb-3 opacity-40" />
        <p className="text-sm font-medium">No sales enablement data yet</p>
        <p className="text-xs mt-1">This will be filled during the next project fill run</p>
      </div>
    )
  }

  const narrative = data.salesNarrative || []
  const trust = data.developerTrust || {}
  const cheatsheet = data.agentCheatsheet || {}
  const offers = data.offerPoints || []
  const sources = data.sources || []

  return (
    <div className="space-y-6">
      {/* Hook */}
      {(data.hookEn || data.hookRu) && (
        <div className="rounded-[var(--radius-field)] border bg-muted p-4">
          <div className="flex items-center gap-2 mb-2">
            <TargetIcon className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hook</span>
          </div>
          {data.hookEn && <p className="text-sm font-semibold">{data.hookEn}</p>}
          {data.hookRu && <p className="text-sm text-muted-foreground mt-1">{data.hookRu}</p>}
        </div>
      )}

      {/* Sales Narrative */}
      {narrative.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <SparklesIcon className="size-3.5" />
            Sales Narrative ({narrative.length})
          </h4>
          <div className="space-y-2">
            {narrative.map((point, i) => (
              <div key={i} className="rounded-[var(--radius-menu-item)] border p-3 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${TYPE_COLORS[point.type] || "bg-gray-100 text-gray-600"}`}>
                    {TYPE_LABELS[point.type] || point.type}
                  </span>
                  {point.source && (
                    <span className="text-[10px] text-muted-foreground">{point.source}</span>
                  )}
                </div>
                {point.headline_en && <p className="font-medium">{point.headline_en}</p>}
                {point.argument_en && <p className="text-muted-foreground text-xs mt-0.5">{point.argument_en}</p>}
                {point.vs_market_en && (
                  <p className="text-xs text-muted-foreground mt-0.5">vs market: {point.vs_market_en}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Developer Trust */}
      {Object.keys(trust).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <BuildingIcon className="size-3.5" />
            Developer Trust Card
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {trust.years_experience != null && (
              <div className="rounded-[var(--radius-menu-item)] border p-2">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-semibold">{trust.years_experience} years</p>
              </div>
            )}
            {trust.completed_sqm != null && (
              <div className="rounded-[var(--radius-menu-item)] border p-2">
                <p className="text-xs text-muted-foreground">Built</p>
                <p className="font-semibold">{trust.completed_sqm.toLocaleString()} m²</p>
              </div>
            )}
            {trust.employees_count != null && (
              <div className="rounded-[var(--radius-menu-item)] border p-2">
                <p className="text-xs text-muted-foreground">Team</p>
                <p className="font-semibold">{trust.employees_count}+ people</p>
              </div>
            )}
            {trust.total_units_delivered != null && (
              <div className="rounded-[var(--radius-menu-item)] border p-2">
                <p className="text-xs text-muted-foreground">Delivered</p>
                <p className="font-semibold">{trust.total_units_delivered}+ units</p>
              </div>
            )}
          </div>

          {/* Ratings */}
          {(trust.booking_rating || trust.tripadvisor_rating || trust.google_rating) && (
            <div className="flex gap-3 mt-2">
              {trust.booking_rating && (
                <Badge variant="outline" className="gap-1">
                  <StarIcon className="size-3 text-muted-foreground" />
                  Booking {trust.booking_rating}
                </Badge>
              )}
              {trust.tripadvisor_rating && (
                <Badge variant="outline" className="gap-1">
                  <StarIcon className="size-3 text-muted-foreground" />
                  TripAdvisor {trust.tripadvisor_rating}
                </Badge>
              )}
              {trust.google_rating && (
                <Badge variant="outline" className="gap-1">
                  <StarIcon className="size-3 text-muted-foreground" />
                  Google {trust.google_rating}
                </Badge>
              )}
            </div>
          )}

          {/* Awards */}
          {trust.awards && trust.awards.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {trust.awards.map((award, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] gap-1">
                  <TrophyIcon className="size-2.5" />
                  {award}
                </Badge>
              ))}
            </div>
          )}

          {/* Guarantees */}
          {trust.guarantees && Object.keys(trust.guarantees).length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3.5 text-muted-foreground" />
                Guarantees
              </p>
              <div className="space-y-1 text-xs">
                {trust.guarantees.construction_years && (
                  <p>Construction: <strong>{trust.guarantees.construction_years} years</strong></p>
                )}
                {trust.guarantees.finishing_years && (
                  <p>Finishing: <strong>{trust.guarantees.finishing_years} years</strong></p>
                )}
                {trust.guarantees.engineering_years && (
                  <p>Engineering: <strong>{trust.guarantees.engineering_years} years</strong></p>
                )}
                {trust.guarantees.rental_pct && (
                  <p>Rental guarantee: <strong>{trust.guarantees.rental_pct}%</strong></p>
                )}
                {trust.guarantees.delay_penalty_pct && (
                  <p>Delay penalty: <strong>{trust.guarantees.delay_penalty_pct}%/month</strong></p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <Separator />

      {/* Agent Cheat Sheet */}
      {Object.keys(cheatsheet).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <MessageSquareIcon className="size-3.5" />
            Agent Cheat Sheet
          </h4>

          {/* Quick Pitch */}
          {cheatsheet.quick_pitch_en && (
            <div className="rounded-[var(--radius-menu-item)] bg-muted/50 p-3 mb-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Quick Pitch (copy-paste)</p>
              <p className="text-sm">{cheatsheet.quick_pitch_en}</p>
              {cheatsheet.quick_pitch_ru && (
                <p className="text-xs text-muted-foreground mt-1">{cheatsheet.quick_pitch_ru}</p>
              )}
            </div>
          )}

          {/* Top Selling Points */}
          {cheatsheet.top_selling_points && cheatsheet.top_selling_points.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium mb-1.5">Top Selling Points</p>
              {cheatsheet.top_selling_points.map((sp, i) => (
                <div key={i} className="flex items-start gap-2 text-sm py-1">
                  <span className="text-muted-foreground font-bold text-xs mt-0.5">{i + 1}.</span>
                  <div>
                    <p>{sp.point_en}</p>
                    {sp.vs_market_en && (
                      <p className="text-xs text-muted-foreground">vs: {sp.vs_market_en}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Objections */}
          {cheatsheet.objections && cheatsheet.objections.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5">
                <AlertTriangleIcon className="size-3 text-amber-500" />
                Objections & Answers
              </p>
              {cheatsheet.objections.map((obj, i) => (
                <div key={i} className="text-sm py-1.5 border-b last:border-0">
                  <p className="text-foreground font-medium text-xs">&ldquo;{obj.objection_en}&rdquo;</p>
                  <p className="text-muted-foreground text-xs mt-0.5">&rarr; {obj.answer_en}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ideal Buyer */}
          {cheatsheet.ideal_buyer_en && (
            <div className="rounded-[var(--radius-menu-item)] border p-2.5 mb-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                <UserIcon className="size-3" />
                Ideal Buyer
              </p>
              <p className="text-xs">{cheatsheet.ideal_buyer_en}</p>
            </div>
          )}

          {/* Conversation Starters */}
          {cheatsheet.conversation_starters && cheatsheet.conversation_starters.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5">
                <MessageCircleIcon className="size-3" />
                Conversation Starters
              </p>
              {cheatsheet.conversation_starters.map((s, i) => (
                <p key={i} className="text-xs text-muted-foreground py-0.5">&ldquo;{s.en}&rdquo;</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Sources</p>
            <div className="space-y-1">
              {sources.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[9px] py-0">{s.type}</Badge>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="truncate hover:underline text-foreground underline">
                      {s.url.slice(0, 60)}...
                    </a>
                  ) : (
                    <span>manual entry</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <p className="text-[10px] text-muted-foreground text-right">
        Updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "—"}
      </p>
    </div>
  )
}

// Map Supabase row to component data
export function mapRowToSalesEnablement(row: Record<string, unknown>): SalesEnablementData {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    catalogId: row.catalog_id as number | null,
    hookEn: row.hook_en as string | null,
    hookRu: row.hook_ru as string | null,
    salesNarrative: (row.sales_narrative as SalesPoint[]) || [],
    developerTrust: (row.developer_trust as DeveloperTrust) || {},
    agentCheatsheet: (row.agent_cheatsheet as AgentCheatsheet) || {},
    offerPoints: (row.offer_points as OfferPoint[]) || [],
    sources: (row.sources as Source[]) || [],
    updatedAt: row.updated_at as string,
  }
}
