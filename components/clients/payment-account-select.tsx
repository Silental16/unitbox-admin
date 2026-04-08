"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { PlusIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { PaymentAccount } from "@/lib/data/clients"

interface PaymentAccountSelectProps {
  accounts: PaymentAccount[]
  value: string | null
  onChange: (accountId: string) => void
  onAccountCreated: (account: PaymentAccount) => void
}

export function PaymentAccountSelect({ accounts, value, onChange, onAccountCreated }: PaymentAccountSelectProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleAddAccount() {
    if (!newName.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("payment_accounts")
      .insert({ name: newName.trim() })
      .select()
      .single()
    setSaving(false)
    if (!error && data) {
      onAccountCreated({ id: data.id, name: data.name, isDefault: data.is_default, createdAt: data.created_at })
      setNewName("")
      setAddDialogOpen(false)
      onChange(data.id)
    }
  }

  return (
    <>
      <Select value={value ?? undefined} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          {accounts.map(acc => (
            <SelectItem key={acc.id} value={acc.id}>
              {acc.name}{acc.isDefault ? " (default)" : ""}
            </SelectItem>
          ))}
          <div className="border-t mt-1 pt-1 px-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              onClick={(e) => { e.preventDefault(); setAddDialogOpen(true) }}
            >
              <PlusIcon className="size-4 mr-2" />
              Add account
            </Button>
          </div>
        </SelectContent>
      </Select>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Account</DialogTitle>
          </DialogHeader>
          <Field>
            <FieldLabel>Account Name</FieldLabel>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Bank Transfer"
              onKeyDown={e => e.key === "Enter" && handleAddAccount()}
            />
          </Field>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAccount} disabled={saving || !newName.trim()}>
              {saving ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
