"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  StatCard,
  StatCardHeader,
  StatCardValue,
} from "@/components/ui/stat-card"
import {
  UsersIcon,
  CreditCardIcon,
  DollarSignIcon,
  ClockIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  Client,
  PaymentAccount,
  SubscriptionPackage,
} from "@/lib/data/clients"
import {
  SUBSCRIPTION_STATUSES,
  formatCurrency,
} from "@/lib/data/clients"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientSheet } from "@/components/clients/client-sheet"

export function ClientsClient({
  clients: initialClients,
  paymentAccounts,
  subscriptionPackages,
}: {
  clients: Client[]
  paymentAccounts: PaymentAccount[]
  subscriptionPackages: SubscriptionPackage[]
}) {
  const router = useRouter()
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const totalRevenue = useMemo(
    () => clients.reduce((sum, c) => sum + c.totalRevenue, 0),
    [clients]
  )

  const activeCount = useMemo(
    () => clients.filter((c) => c.subscriptionStatus === "active" || c.subscriptionStatus === "expiring_soon").length,
    [clients]
  )

  const upcomingCount = useMemo(() => {
    const now = new Date()
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    let count = 0
    for (const client of clients) {
      if (!client.currentSubscription) continue
      for (const payment of client.currentSubscription.payments) {
        if (payment.status === "pending") {
          const due = new Date(payment.dueDate)
          if (due <= thirtyDays) count++
        }
      }
    }
    return count
  }, [clients])

  const filteredClients = useMemo(() => {
    let result = [...clients]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(q))
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.subscriptionStatus === statusFilter)
    }

    return result
  }, [clients, search, statusFilter])

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client)
    setSheetOpen(true)
  }, [])

  const handleSubscriptionCreated = useCallback(() => {
    router.refresh()
  }, [router])

  const handlePaymentRecorded = useCallback(() => {
    router.refresh()
  }, [router])

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {clients.length} clients · Revenue {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard>
          <StatCardHeader>
            <UsersIcon className="size-4" />
            Total Clients
          </StatCardHeader>
          <StatCardValue>{clients.length}</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <CreditCardIcon className="size-4" />
            Active Subscriptions
          </StatCardHeader>
          <StatCardValue>{activeCount}</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <DollarSignIcon className="size-4" />
            Total Revenue
          </StatCardHeader>
          <StatCardValue>{formatCurrency(totalRevenue)}</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <ClockIcon className="size-4" />
            Upcoming Payments
          </StatCardHeader>
          <StatCardValue>{upcomingCount}</StatCardValue>
        </StatCard>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-[280px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Subscription" />
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              <SelectItem value="all">All statuses</SelectItem>
              {SUBSCRIPTION_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  <span className="flex items-center gap-1.5">
                    <span className={cn("size-1.5 rounded-full", s.dot)} />
                    {s.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Active filter chips */}
        {(search || statusFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-1.5">
            {search && (
              <Badge variant="secondary" className="gap-1 pr-1">
                Search: {search}
                <button
                  onClick={() => setSearch("")}
                  className="ml-0.5 rounded-full hover:bg-muted size-4 inline-flex items-center justify-center"
                >
                  <XIcon className="size-3" />
                </button>
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 pr-1">
                Status: {SUBSCRIPTION_STATUSES.find((s) => s.value === statusFilter)?.label}
                <button
                  onClick={() => setStatusFilter("all")}
                  className="ml-0.5 rounded-full hover:bg-muted size-4 inline-flex items-center justify-center"
                >
                  <XIcon className="size-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => {
                setSearch("")
                setStatusFilter("all")
              }}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <ClientsTable clients={filteredClients} onSelectClient={handleSelectClient} />

      {/* Detail Sheet */}
      <ClientSheet
        client={selectedClient}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        paymentAccounts={paymentAccounts}
        subscriptionPackages={subscriptionPackages}
        onSubscriptionCreated={handleSubscriptionCreated}
        onPaymentRecorded={handlePaymentRecorded}
      />
    </div>
  )
}
