"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"
import { PaymentAccountSelect } from "./payment-account-select"
import type { SubscriptionPayment, PaymentAccount } from "@/lib/data/clients"
import { formatCurrency, formatDate } from "@/lib/data/clients"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: SubscriptionPayment | null
  paymentAccounts: PaymentAccount[]
  onRecorded: () => void
  onAccountCreated: (account: PaymentAccount) => void
}

export function PaymentDialog({
  open,
  onOpenChange,
  payment,
  paymentAccounts,
  onRecorded,
  onAccountCreated,
}: PaymentDialogProps) {
  const [paidDate, setPaidDate] = useState("")
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  // Reset state when dialog opens
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen && payment) {
      setPaidDate(new Date().toISOString().split("T")[0])
      setSelectedAccountId(payment.paymentAccountId)
      setNotes(payment.notes ?? "")
    }
    onOpenChange(nextOpen)
  }, [payment, onOpenChange])

  async function handleRecord() {
    if (!payment) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("subscription_payments").update({
      status: "paid",
      paid_date: paidDate,
      payment_account_id: selectedAccountId,
      notes: notes || null,
    }).eq("id", payment.id)
    setSaving(false)
    onRecorded()
    onOpenChange(false)
  }

  if (!payment) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment #{payment.installmentNumber}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-4">
          Amount: {formatCurrency(payment.amount)} — Due: {formatDate(payment.dueDate)}
        </p>

        <div className="flex flex-col gap-4">
          {/* Paid date */}
          <Field>
            <FieldLabel>Paid Date</FieldLabel>
            <Input
              type="date"
              value={paidDate}
              onChange={e => setPaidDate(e.target.value)}
              className="tabular-nums"
            />
          </Field>

          {/* Payment account */}
          <Field>
            <FieldLabel>Payment Account</FieldLabel>
            <PaymentAccountSelect
              accounts={paymentAccounts}
              value={selectedAccountId}
              onChange={setSelectedAccountId}
              onAccountCreated={onAccountCreated}
            />
          </Field>

          {/* Notes */}
          <Field>
            <FieldLabel>Notes (optional)</FieldLabel>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any notes about this payment..."
              rows={2}
            />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleRecord} disabled={saving}>
            {saving ? "Recording..." : "Mark as Paid"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
