"use client"

import { useState, useMemo, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import type { SubscriptionPackage, PaymentType } from "@/lib/data/clients"
import { PAYMENT_TYPES, formatCurrency } from "@/lib/data/clients"

interface SubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: { id: string; name: string }
  packages: SubscriptionPackage[]
  onCreated: () => void
}

function splitAmounts(total: number, count: number): number[] {
  const each = Math.floor(total / count)
  const remainder = total - each * count
  const result = Array(count).fill(each) as number[]
  result[0] += remainder
  return result
}

export function SubscriptionDialog({
  open,
  onOpenChange,
  client,
  packages,
  onCreated,
}: SubscriptionDialogProps) {
  const activePackages = useMemo(() => packages.filter(p => p.isActive), [packages])
  const [selectedPackageId, setSelectedPackageId] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [startDate, setStartDate] = useState("")
  const [paymentType, setPaymentType] = useState<PaymentType>("full")
  const [amountOverrides, setAmountOverrides] = useState<number[] | null>(null)
  const [months, setMonths] = useState<number[]>([0, 2, 2])
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const installmentCount = paymentType === "full" ? 1 : paymentType === "installment_2" ? 2 : 3

  // Derived: auto-split amounts unless user has overridden
  const amounts = useMemo(() => {
    if (amountOverrides && amountOverrides.length === installmentCount) {
      return amountOverrides
    }
    return splitAmounts(totalPrice, installmentCount)
  }, [totalPrice, installmentCount, amountOverrides])

  // Reset form when dialog opens
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      const firstPkg = activePackages[0]
      setSelectedPackageId(firstPkg?.id ?? "")
      setTotalPrice(firstPkg?.defaultPrice ?? 0)
      setStartDate(new Date().toISOString().split("T")[0])
      setPaymentType("full")
      setAmountOverrides(null)
      setMonths([0, 2, 2])
      setNotes("")
    }
    onOpenChange(nextOpen)
  }, [activePackages, onOpenChange])

  function handlePackageChange(packageId: string) {
    setSelectedPackageId(packageId)
    const pkg = activePackages.find(p => p.id === packageId)
    if (pkg?.defaultPrice != null) {
      setTotalPrice(pkg.defaultPrice)
      setAmountOverrides(null)
    }
  }

  function handleTotalPriceChange(value: number) {
    setTotalPrice(value)
    setAmountOverrides(null)
  }

  function handlePaymentTypeChange(type: PaymentType) {
    setPaymentType(type)
    setAmountOverrides(null)
  }

  function updateAmount(index: number, value: number) {
    const current = amountOverrides ?? splitAmounts(totalPrice, installmentCount)
    const updated = [...current]
    updated[index] = value
    setAmountOverrides(updated)
  }

  function updateMonth(index: number, value: string) {
    const newMonths = [...months]
    newMonths[index] = Number(value)
    setMonths(newMonths)
  }

  async function handleCreate() {
    setSaving(true)
    const supabase = createClient()
    const pkg = activePackages.find(p => p.id === selectedPackageId)
    const durationMonths = pkg?.durationMonths ?? 6
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + durationMonths)

    const { data: sub, error } = await supabase.from("client_subscriptions").insert({
      developer_id: client.id,
      package_id: selectedPackageId,
      total_price: totalPrice,
      start_date: startDate,
      end_date: endDate.toISOString().split("T")[0],
      payment_type: paymentType,
      notes,
    }).select().single()

    if (error || !sub) {
      setSaving(false)
      return
    }

    let cumulativeMonths = 0
    const paymentInserts = amounts.slice(0, installmentCount).map((amount, i) => {
      if (i > 0) cumulativeMonths += months[i]
      const dueDate = new Date(startDate)
      dueDate.setMonth(dueDate.getMonth() + cumulativeMonths)
      return {
        subscription_id: sub.id,
        installment_number: i + 1,
        amount,
        due_date: dueDate.toISOString().split("T")[0],
        status: "pending",
      }
    })

    await supabase.from("subscription_payments").insert(paymentInserts)
    setSaving(false)
    onCreated()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Subscription for {client.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Package select */}
          <Field>
            <FieldLabel>Package</FieldLabel>
            <Select value={selectedPackageId} onValueChange={handlePackageChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                {activePackages.map(pkg => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} ({pkg.durationMonths} mo)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Total price */}
          <Field>
            <FieldLabel>Total Price (USD)</FieldLabel>
            <Input
              type="number"
              value={totalPrice}
              onChange={e => handleTotalPriceChange(Number(e.target.value))}
              className="h-9"
            />
          </Field>

          {/* Start date */}
          <Field>
            <FieldLabel>Start Date</FieldLabel>
            <Input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="h-9"
            />
          </Field>

          {/* Payment type buttons */}
          <Field>
            <FieldLabel>Payment Type</FieldLabel>
            <div className="flex gap-2">
              {PAYMENT_TYPES.map(pt => (
                <Button
                  key={pt.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn("flex-1", paymentType === pt.value && "border-primary bg-primary/5")}
                  onClick={() => handlePaymentTypeChange(pt.value)}
                >
                  {pt.label}
                </Button>
              ))}
            </div>
          </Field>

          {/* Payment schedule */}
          {paymentType === "full" ? (
            <p className="text-sm text-muted-foreground">
              1 payment of {formatCurrency(totalPrice)} on {startDate}
            </p>
          ) : (
            <div className="space-y-3 mt-1 p-4 rounded-lg border bg-muted/30">
              <p className="text-sm font-medium">Payment Schedule</p>

              {/* Payment 1 — always immediately */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-xs text-muted-foreground">Payment 1</span>
                </div>
                <Input
                  type="number"
                  value={amounts[0] ?? 0}
                  onChange={e => updateAmount(0, Number(e.target.value))}
                  className="w-24 h-8"
                />
                <span className="text-xs text-muted-foreground">immediately</span>
              </div>

              {/* Payment 2 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-xs text-muted-foreground">Payment 2</span>
                </div>
                <Input
                  type="number"
                  value={amounts[1] ?? 0}
                  onChange={e => updateAmount(1, Number(e.target.value))}
                  className="w-24 h-8"
                />
                <span className="text-xs text-muted-foreground">in</span>
                <Select value={String(months[1])} onValueChange={v => updateMonth(1, v)}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(m => (
                      <SelectItem key={m} value={String(m)}>{m} mo</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment 3 (only if installment_3) */}
              {paymentType === "installment_3" && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <span className="text-xs text-muted-foreground">Payment 3</span>
                  </div>
                  <Input
                    type="number"
                    value={amounts[2] ?? 0}
                    onChange={e => updateAmount(2, Number(e.target.value))}
                    className="w-24 h-8"
                  />
                  <span className="text-xs text-muted-foreground">after payment 2</span>
                  <Select value={String(months[2])} onValueChange={v => updateMonth(2, v)}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(m => (
                        <SelectItem key={m} value={String(m)}>{m} mo</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <Field>
            <FieldLabel>Notes (optional)</FieldLabel>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={2}
            />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={saving || !selectedPackageId || totalPrice <= 0}>
            {saving ? "Creating..." : "Create Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
