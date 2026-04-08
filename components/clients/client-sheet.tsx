"use client"

import { useState, useCallback } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DescriptionsList,
  DescriptionsItem,
} from "@/components/ui/descriptions-list"
import { cn } from "@/lib/utils"
import {
  CheckIcon,
  AlertCircleIcon,
  ClockIcon,
  PlusIcon,
} from "lucide-react"
import type {
  Client,
  PaymentAccount,
  SubscriptionPackage,
  ClientSubscription,
  SubscriptionPayment,
} from "@/lib/data/clients"
import {
  SUBSCRIPTION_STATUSES,
  formatCurrency,
  formatDate,
  computeSubscriptionStatus,
} from "@/lib/data/clients"
import { SubscriptionDialog } from "./subscription-dialog"
import { PaymentDialog } from "./payment-dialog"

interface ClientSheetProps {
  client: Client | null
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentAccounts: PaymentAccount[]
  subscriptionPackages: SubscriptionPackage[]
  onSubscriptionCreated: () => void
  onPaymentRecorded: () => void
}

function getStatusConfig(status: string) {
  return (
    SUBSCRIPTION_STATUSES.find((s) => s.value === status) ??
    SUBSCRIPTION_STATUSES[3]
  )
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function PaymentTimeline({
  payments,
  onRecordPayment,
}: {
  payments: SubscriptionPayment[]
  onRecordPayment: (payment: SubscriptionPayment) => void
}) {
  return (
    <div className="flex flex-col">
      {payments.map((payment, i) => (
        <div key={payment.id} className="relative flex gap-3 pb-6 last:pb-0">
          {/* Vertical connector line */}
          {i < payments.length - 1 && (
            <div className="absolute left-4 top-10 bottom-0 border-l-2 border-border" />
          )}
          {/* Status dot */}
          <div
            className={cn(
              "size-8 shrink-0 rounded-full flex items-center justify-center",
              payment.status === "paid"
                ? "bg-emerald-100 dark:bg-emerald-500/10"
                : payment.status === "overdue"
                  ? "bg-red-100 dark:bg-red-500/10"
                  : "bg-muted"
            )}
          >
            {payment.status === "paid" ? (
              <CheckIcon className="size-4 text-emerald-600" />
            ) : payment.status === "overdue" ? (
              <AlertCircleIcon className="size-4 text-red-500" />
            ) : (
              <ClockIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 pt-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Payment {payment.installmentNumber}
              </p>
              <span className="text-sm font-medium tabular-nums">
                {formatCurrency(payment.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-xs text-muted-foreground">
                {formatDate(payment.dueDate)}
              </p>
              {payment.status === "paid" && (
                <span className="text-xs text-emerald-600">
                  Paid {formatDate(payment.paidDate!)}
                </span>
              )}
              {(payment.status === "pending" ||
                payment.status === "overdue") && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => onRecordPayment(payment)}
                >
                  Record Payment
                </Button>
              )}
            </div>
            {payment.paymentAccountName && (
              <p className="text-xs text-muted-foreground mt-0.5">
                via {payment.paymentAccountName}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ClientSheet({
  client,
  open,
  onOpenChange,
  paymentAccounts,
  subscriptionPackages,
  onSubscriptionCreated,
  onPaymentRecorded,
}: ClientSheetProps) {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] =
    useState<SubscriptionPayment | null>(null)
  const [accounts, setAccounts] = useState(paymentAccounts)

  const handleAccountCreated = useCallback((account: PaymentAccount) => {
    setAccounts((prev) => [...prev, account])
  }, [])

  const openPaymentDialog = useCallback((payment: SubscriptionPayment) => {
    setSelectedPayment(payment)
    setPaymentDialogOpen(true)
  }, [])

  if (!client) return null

  const statusConfig = getStatusConfig(client.subscriptionStatus)
  const currentSub = client.currentSubscription

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[420px] sm:w-[540px] !max-w-none overflow-y-auto"
      >
        {/* Header: avatar + title + status badge */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Avatar className="size-10">
            <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate">{client.name}</h2>
            <Badge
              variant="outline"
              className={cn(statusConfig.bg, statusConfig.text)}
            >
              <span
                className={cn("size-1.5 rounded-full", statusConfig.dot)}
              />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Body: DescriptionsList */}
        <DescriptionsList layout="horizontal" className="py-4">
          <DescriptionsItem label="Domain">
            {client.catalogDomain ? (
              <a
                href={`https://${client.catalogDomain}.unitbox.ai`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {client.catalogDomain}.unitbox.ai
              </a>
            ) : (
              "—"
            )}
          </DescriptionsItem>
          <DescriptionsItem label="Projects">{client.projects}</DescriptionsItem>
          <DescriptionsItem label="Units">
            {client.activeUnits}
          </DescriptionsItem>
          <DescriptionsItem label="Total Revenue">
            {formatCurrency(client.totalRevenue)}
          </DescriptionsItem>
        </DescriptionsList>

        {/* Tabs: Subscription / History */}
        <Tabs defaultValue="subscription">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription" className="flex flex-col gap-4 mt-4">
            {currentSub ? (
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">Current Subscription</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(currentSub.startDate)} —{" "}
                      {formatDate(currentSub.endDate)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(statusConfig.bg, statusConfig.text)}
                  >
                    <span
                      className={cn("size-1.5 rounded-full", statusConfig.dot)}
                    />
                    {statusConfig.label}
                  </Badge>
                </div>

                {/* Payment timeline */}
                <div className="border-t px-4 py-4">
                  <PaymentTimeline
                    payments={currentSub.payments}
                    onRecordPayment={openPaymentDialog}
                  />
                </div>
              </Card>
            ) : (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  No active subscription
                </p>
              </Card>
            )}

            <Button
              variant="outline"
              onClick={() => setSubscriptionDialogOpen(true)}
              className="w-full"
            >
              <PlusIcon className="size-4" />
              New Subscription
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            {client.subscriptions.length > 1 ? (
              <div className="space-y-2">
                {client.subscriptions.slice(1).map((sub) => {
                  const subStatus = computeSubscriptionStatus(sub)
                  const subConfig = getStatusConfig(subStatus)
                  const totalPaid = sub.payments
                    .filter((p) => p.status === "paid")
                    .reduce((sum, p) => sum + p.amount, 0)
                  return (
                    <Card key={sub.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(sub.startDate)} —{" "}
                            {formatDate(sub.endDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium tabular-nums">
                            {formatCurrency(totalPaid)}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              subConfig.bg,
                              subConfig.text,
                              "text-xs"
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                subConfig.dot
                              )}
                            />
                            {subConfig.label}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                No past subscriptions
              </p>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <SubscriptionDialog
          open={subscriptionDialogOpen}
          onOpenChange={setSubscriptionDialogOpen}
          client={client}
          packages={subscriptionPackages}
          onCreated={onSubscriptionCreated}
        />

        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          payment={selectedPayment}
          paymentAccounts={accounts}
          onRecorded={onPaymentRecorded}
          onAccountCreated={handleAccountCreated}
        />
      </SheetContent>
    </Sheet>
  )
}
