import { createClient } from "@/lib/supabase/server"
import { mapRowToDeveloper, type Developer } from "./developers"
import { mapRowToCompetitor, type Competitor } from "./competitors"
import { mapRowToTask, type Task } from "./tasks"
import {
  mapRowToCatalogProject,
  mapRowToMaterial,
  mapRowToChessSource,
  mapRowToChangeEntry,
  type CatalogProject,
  type ProjectMaterial,
  type ProjectChessSource,
  type ProjectChangeEntry,
} from "./catalog-projects"
import { mapRowToFlow, type Flow } from "./flows"
import {
  mapRowToPaymentAccount,
  mapRowToSubscription,
  mapRowToPayment,
  mapRowToSubscriptionPackage,
  computeSubscriptionStatus,
  type Client,
  type PaymentAccount,
  type SubscriptionPackage,
  type ClientSubscription,
} from "./clients"

export async function getDevelopers(): Promise<Developer[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("developers")
    .select("*")
    .order("active_units", { ascending: false })

  if (error) {
    console.error("Failed to fetch developers:", error)
    return []
  }

  return (data ?? []).map(mapRowToDeveloper)
}

export async function getCompetitors(): Promise<Competitor[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("competitors")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch competitors:", error)
    return []
  }

  return (data ?? []).map(mapRowToCompetitor)
}

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("order", { ascending: true })

  if (error) {
    console.error("Failed to fetch tasks:", error)
    return []
  }

  return (data ?? []).map(mapRowToTask)
}

export async function getCatalogProjects(): Promise<CatalogProject[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("catalog_projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch catalog projects:", error)
    return []
  }

  return (data ?? []).map(mapRowToCatalogProject)
}

export async function getCatalogProjectDetails(projectId: string): Promise<{
  materials: ProjectMaterial[]
  chessSources: ProjectChessSource[]
  changeLog: ProjectChangeEntry[]
}> {
  const supabase = await createClient()

  const [materialsRes, chessRes, logRes] = await Promise.all([
    supabase
      .from("project_materials")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_chess_sources")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_change_log")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(50),
  ])

  return {
    materials: (materialsRes.data ?? []).map(mapRowToMaterial),
    chessSources: (chessRes.data ?? []).map(mapRowToChessSource),
    changeLog: (logRes.data ?? []).map(mapRowToChangeEntry),
  }
}

// ─── Clients & Subscriptions ──────────────────────────────────────

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient()

  // Get all developers with sales_status = 'client'
  const { data: devRows, error: devError } = await supabase
    .from("developers")
    .select("id, name, catalog_domain, projects, active_units")
    .eq("sales_status", "client")
    .order("name", { ascending: true })

  if (devError) {
    console.error("Failed to fetch clients:", devError)
    return []
  }

  const devIds = (devRows ?? []).map((d) => d.id)
  if (devIds.length === 0) return []

  // Get all subscriptions for these developers
  const { data: subRows } = await supabase
    .from("client_subscriptions")
    .select("*")
    .in("developer_id", devIds)
    .order("start_date", { ascending: false })

  // Get all payments for these subscriptions
  const subIds = (subRows ?? []).map((s) => s.id)
  let paymentRows: Record<string, unknown>[] = []
  if (subIds.length > 0) {
    const { data } = await supabase
      .from("subscription_payments")
      .select("*, payment_accounts(name)")
      .in("subscription_id", subIds)
      .order("installment_number", { ascending: true })
    paymentRows = data ?? []
  }

  // Group payments by subscription
  const paymentsBySubId = new Map<string, typeof paymentRows>()
  for (const p of paymentRows) {
    const sid = p.subscription_id as string
    if (!paymentsBySubId.has(sid)) paymentsBySubId.set(sid, [])
    paymentsBySubId.get(sid)!.push(p)
  }

  // Group subscriptions by developer
  const subsByDevId = new Map<string, ClientSubscription[]>()
  for (const row of subRows ?? []) {
    const devId = row.developer_id as string
    const payments = (paymentsBySubId.get(row.id) ?? []).map(mapRowToPayment)
    const sub = mapRowToSubscription(row, payments)
    if (!subsByDevId.has(devId)) subsByDevId.set(devId, [])
    subsByDevId.get(devId)!.push(sub)
  }

  // Build clients
  return (devRows ?? []).map((dev) => {
    const subs = subsByDevId.get(dev.id) ?? []
    const current = subs[0] ?? null // sorted desc by start_date
    const totalRevenue = subs.reduce((sum, s) => {
      const paidSum = s.payments
        .filter((p) => p.status === "paid")
        .reduce((pSum, p) => pSum + p.amount, 0)
      return sum + paidSum
    }, 0)

    return {
      id: dev.id as string,
      name: (dev.name ?? "") as string,
      catalogDomain: (dev.catalog_domain ?? null) as string | null,
      projects: (dev.projects ?? 0) as number,
      activeUnits: (dev.active_units ?? 0) as number,
      subscriptionStatus: computeSubscriptionStatus(current),
      currentSubscription: current,
      subscriptions: subs,
      totalRevenue,
    }
  })
}

export async function getClientSubscriptions(developerId: string): Promise<ClientSubscription[]> {
  const supabase = await createClient()

  const { data: subRows, error } = await supabase
    .from("client_subscriptions")
    .select("*")
    .eq("developer_id", developerId)
    .order("start_date", { ascending: false })

  if (error) {
    console.error("Failed to fetch subscriptions:", error)
    return []
  }

  const subIds = (subRows ?? []).map((s) => s.id)
  if (subIds.length === 0) return []

  const { data: payRows } = await supabase
    .from("subscription_payments")
    .select("*, payment_accounts(name)")
    .in("subscription_id", subIds)
    .order("installment_number", { ascending: true })

  const paymentsBySubId = new Map<string, typeof payRows>()
  for (const p of payRows ?? []) {
    const sid = p.subscription_id as string
    if (!paymentsBySubId.has(sid)) paymentsBySubId.set(sid, [])
    paymentsBySubId.get(sid)!.push(p)
  }

  return (subRows ?? []).map((row) => {
    const payments = (paymentsBySubId.get(row.id) ?? []).map(mapRowToPayment)
    return mapRowToSubscription(row, payments)
  })
}

export async function getPaymentAccounts(): Promise<PaymentAccount[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("payment_accounts")
    .select("*")
    .order("is_default", { ascending: false })

  if (error) {
    console.error("Failed to fetch payment accounts:", error)
    return []
  }

  return (data ?? []).map(mapRowToPaymentAccount)
}

export async function getSubscriptionPackages(): Promise<SubscriptionPackage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscription_packages")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true })

  if (error) {
    console.error("Failed to fetch packages:", error)
    return []
  }

  return (data ?? []).map(mapRowToSubscriptionPackage)
}

// ─── Flows ───────────────────────────────────────────────────────

export async function getFlows(): Promise<Flow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("flows")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch flows:", error)
    return []
  }

  return (data ?? []).map(mapRowToFlow)
}
