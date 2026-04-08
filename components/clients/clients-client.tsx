"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilterIcon } from "lucide-react"
import type {
  Client,
  PaymentAccount,
  SubscriptionPackage,
  SubscriptionStatus,
} from "@/lib/data/clients"
import {
  SUBSCRIPTION_STATUSES,
  formatCurrency,
} from "@/lib/data/clients"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientSheet } from "@/components/clients/client-sheet"

function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-2xl font-semibold tabular-nums mt-1">{value}</p>
    </Card>
  )
}

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
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus[]>([])
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

    if (statusFilter.length > 0) {
      result = result.filter((c) => statusFilter.includes(c.subscriptionStatus))
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

  function toggleStatus(status: SubscriptionStatus) {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {clients.length} active clients. Total revenue: {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        <SummaryCard title="Total Clients" value={clients.length} />
        <SummaryCard title="Active Subscriptions" value={activeCount} />
        <SummaryCard title="Total Revenue" value={formatCurrency(totalRevenue)} />
        <SummaryCard title="Upcoming Payments" value={upcomingCount} />
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs h-9"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <ListFilterIcon className="size-3.5" />
              Status
              {statusFilter.length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  {statusFilter.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {SUBSCRIPTION_STATUSES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s.value}
                checked={statusFilter.includes(s.value)}
                onCheckedChange={() => toggleStatus(s.value)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
