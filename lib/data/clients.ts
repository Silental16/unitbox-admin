export type SubscriptionStatus = "active" | "expiring_soon" | "expired" | "no_subscription"
export type PaymentStatus = "pending" | "paid" | "overdue"
export type PaymentType = "full" | "installment_2" | "installment_3"

export const SUBSCRIPTION_STATUSES: { value: SubscriptionStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "active", label: "Active", dot: "bg-emerald-500", bg: "bg-muted", text: "text-foreground" },
  { value: "expiring_soon", label: "Expiring Soon", dot: "bg-amber-500", bg: "bg-muted", text: "text-foreground" },
  { value: "expired", label: "Expired", dot: "bg-red-500", bg: "bg-muted", text: "text-muted-foreground" },
  { value: "no_subscription", label: "No Subscription", dot: "bg-slate-300", bg: "bg-muted", text: "text-muted-foreground" },
]

export const PAYMENT_STATUSES: { value: PaymentStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: "pending", label: "Pending", dot: "bg-blue-500", bg: "bg-muted", text: "text-foreground" },
  { value: "paid", label: "Paid", dot: "bg-emerald-500", bg: "bg-muted", text: "text-foreground" },
  { value: "overdue", label: "Overdue", dot: "bg-red-500", bg: "bg-destructive/10", text: "text-destructive" },
]

export const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: "full", label: "Full Payment" },
  { value: "installment_2", label: "2 Installments" },
  { value: "installment_3", label: "3 Installments" },
]

export interface PaymentAccount {
  id: string
  name: string
  isDefault: boolean
  createdAt: string
}

export interface SubscriptionPackage {
  id: string
  name: string
  durationMonths: number
  defaultPrice: number | null
  isActive: boolean
}

export interface ClientSubscription {
  id: string
  developerId: string
  packageId: string | null
  totalPrice: number
  currency: string
  startDate: string
  endDate: string
  paymentType: PaymentType
  notes: string
  createdAt: string
  payments: SubscriptionPayment[]
}

export interface SubscriptionPayment {
  id: string
  subscriptionId: string
  installmentNumber: number
  amount: number
  dueDate: string
  paidDate: string | null
  status: PaymentStatus
  paymentAccountId: string | null
  paymentAccountName: string | null
  receiptUrl: string | null
  notes: string
  createdAt: string
}

export interface Client {
  id: string
  name: string
  catalogDomain: string | null
  projects: number
  activeUnits: number
  subscriptionStatus: SubscriptionStatus
  currentSubscription: ClientSubscription | null
  subscriptions: ClientSubscription[]
  totalRevenue: number
}

export function computeSubscriptionStatus(sub: ClientSubscription | null): SubscriptionStatus {
  if (!sub) return "no_subscription"
  const now = new Date()
  const end = new Date(sub.endDate)
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  if (end < now) return "expired"
  if (end <= thirtyDaysFromNow) return "expiring_soon"
  return "active"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToPaymentAccount(row: Record<string, any>): PaymentAccount {
  return {
    id: row.id as string,
    name: (row.name ?? "") as string,
    isDefault: (row.is_default ?? false) as boolean,
    createdAt: (row.created_at ?? "") as string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToSubscriptionPackage(row: Record<string, any>): SubscriptionPackage {
  return {
    id: row.id as string,
    name: (row.name ?? "") as string,
    durationMonths: (row.duration_months ?? 6) as number,
    defaultPrice: row.default_price != null ? Number(row.default_price) : null,
    isActive: (row.is_active ?? true) as boolean,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToPayment(row: Record<string, any>): SubscriptionPayment {
  return {
    id: row.id as string,
    subscriptionId: (row.subscription_id ?? "") as string,
    installmentNumber: (row.installment_number ?? 1) as number,
    amount: Number(row.amount ?? 0),
    dueDate: (row.due_date ?? "") as string,
    paidDate: (row.paid_date ?? null) as string | null,
    status: (row.status ?? "pending") as PaymentStatus,
    paymentAccountId: (row.payment_account_id ?? null) as string | null,
    paymentAccountName: (row.payment_accounts?.name ?? null) as string | null,
    receiptUrl: (row.receipt_url ?? null) as string | null,
    notes: (row.notes ?? "") as string,
    createdAt: (row.created_at ?? "") as string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToSubscription(row: Record<string, any>, payments: SubscriptionPayment[] = []): ClientSubscription {
  return {
    id: row.id as string,
    developerId: (row.developer_id ?? "") as string,
    packageId: (row.package_id ?? null) as string | null,
    totalPrice: Number(row.total_price ?? 0),
    currency: (row.currency ?? "USD") as string,
    startDate: (row.start_date ?? "") as string,
    endDate: (row.end_date ?? "") as string,
    paymentType: (row.payment_type ?? "full") as PaymentType,
    notes: (row.notes ?? "") as string,
    createdAt: (row.created_at ?? "") as string,
    payments,
  }
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}
