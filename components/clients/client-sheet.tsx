"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type {
  Client,
  PaymentAccount,
  SubscriptionPackage,
  ClientSubscription,
  SubscriptionPayment,
} from "@/lib/data/clients"
import {
  SUBSCRIPTION_STATUSES,
  PAYMENT_STATUSES,
  formatCurrency,
  formatDate,
  computeSubscriptionStatus,
} from "@/lib/data/clients"
import { SubscriptionDialog } from "./subscription-dialog"
import { PaymentDialog } from "./payment-dialog"

const MIN_WIDTH = 400
const MAX_WIDTH = 900
const DEFAULT_WIDTH = 520

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

function getPaymentStatusConfig(status: string) {
  return (
    PAYMENT_STATUSES.find((s) => s.value === status) ??
    PAYMENT_STATUSES[0]
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
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<SubscriptionPayment | null>(null)
  const [accounts, setAccounts] = useState(paymentAccounts)

  const handleAccountCreated = useCallback((account: PaymentAccount) => {
    setAccounts((prev) => [...prev, account])
  }, [])

  useEffect(() => {
    if (open) setWidth(DEFAULT_WIDTH)
  }, [open])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragging(true)
      startX.current = e.clientX
      startWidth.current = width
    },
    [width]
  )

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startX.current - e.clientX
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  const openPaymentDialog = useCallback((payment: SubscriptionPayment) => {
    setSelectedPayment(payment)
    setPaymentDialogOpen(true)
  }, [])

  if (!client) return null

  const statusConfig = getStatusConfig(client.subscriptionStatus)
  const currentSub = client.currentSubscription

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className={cn(
          "!max-w-none overflow-hidden p-0 flex flex-col",
          dragging && "select-none"
        )}
        style={{ width }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-3 -translate-x-1/2 cursor-col-resize z-[60] group"
        >
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 transition-colors",
              dragging ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"
            )}
          />
        </div>

        <ScrollArea className="flex-1 min-h-0 overscroll-contain">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 pr-12 space-y-3">
            <SheetTitle className="text-lg">{client.name}</SheetTitle>
            <SheetDescription className="text-xs leading-relaxed">
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
                "No domain"
              )}
              {" — "}
              {client.projects} projects, {client.activeUnits} units
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 p-6 pt-0">
            {/* Current subscription card */}
            {currentSub ? (
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">Current Subscription</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(currentSub.startDate)} — {formatDate(currentSub.endDate)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(statusConfig.bg, statusConfig.text)}
                  >
                    <span className={cn("size-1.5 rounded-full", statusConfig.dot)} />
                    {statusConfig.label}
                  </Badge>
                </div>

                {/* Payment timeline */}
                <div className="border-t px-4 py-3 space-y-3">
                  {currentSub.payments.map((payment) => {
                    const paymentConfig = getPaymentStatusConfig(payment.status)
                    return (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn("size-2 rounded-full", paymentConfig.dot)}
                          />
                          <span className="text-sm">
                            Payment {payment.installmentNumber}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(payment.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium tabular-nums">
                            {formatCurrency(payment.amount)}
                          </span>
                          {payment.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openPaymentDialog(payment)}
                            >
                              Record
                            </Button>
                          )}
                          {payment.status === "overdue" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive/30"
                              onClick={() => openPaymentDialog(payment)}
                            >
                              Record
                            </Button>
                          )}
                          {payment.status === "paid" && (
                            <span className="text-xs text-emerald-600">
                              Paid {formatDate(payment.paidDate!)}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            ) : (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">No active subscription</p>
              </Card>
            )}

            {/* New subscription button */}
            <Button
              variant="outline"
              onClick={() => setSubscriptionDialogOpen(true)}
              className="w-full"
            >
              + New Subscription
            </Button>

            {/* Subscription history */}
            {client.subscriptions.length > 1 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-3">Subscription History</p>
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
                              {formatDate(sub.startDate)} — {formatDate(sub.endDate)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium tabular-nums">
                              {formatCurrency(totalPaid)}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(subConfig.bg, subConfig.text, "text-xs")}
                            >
                              <span className={cn("size-1.5 rounded-full", subConfig.dot)} />
                              {subConfig.label}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

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
