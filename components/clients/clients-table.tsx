"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { Client } from "@/lib/data/clients"
import {
  SUBSCRIPTION_STATUSES,
  formatCurrency,
  formatDate,
} from "@/lib/data/clients"

interface ClientsTableProps {
  clients: Client[]
  onSelectClient: (client: Client) => void
}

function getNextPayment(client: Client) {
  if (!client.currentSubscription) return null
  const pending = client.currentSubscription.payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  return pending[0] ?? null
}

function isOverdue(dueDate: string) {
  return new Date(dueDate) < new Date()
}

export function ClientsTable({ clients, onSelectClient }: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
        <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
          No clients found
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead className="text-right">Projects</TableHead>
            <TableHead className="text-right">Units</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead>Next Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => {
            const statusConfig = SUBSCRIPTION_STATUSES.find(
              (s) => s.value === client.subscriptionStatus
            ) ?? SUBSCRIPTION_STATUSES[3]
            const nextPayment = getNextPayment(client)
            const overdue = nextPayment ? isOverdue(nextPayment.dueDate) : false

            return (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectClient(client)}
              >
                <TableCell>
                  <span className="font-medium">{client.name}</span>
                </TableCell>
                <TableCell>
                  {client.catalogDomain ? (
                    <a
                      href={`https://${client.catalogDomain}.unitbox.ai`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {client.catalogDomain}.unitbox.ai
                    </a>
                  ) : (
                    <span className="text-muted-foreground">&mdash;</span>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {client.projects}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {client.activeUnits}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusConfig.bg, statusConfig.text)}
                  >
                    <span className={cn("size-1.5 rounded-full", statusConfig.dot)} />
                    {statusConfig.label}
                  </Badge>
                  {client.currentSubscription && (
                    <span className="ml-1.5 text-xs text-muted-foreground">
                      {formatDate(client.currentSubscription.endDate)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatCurrency(client.totalRevenue)}
                </TableCell>
                <TableCell>
                  {nextPayment ? (
                    <div className={cn("text-sm", overdue && "text-destructive")}>
                      <span className="tabular-nums">{formatDate(nextPayment.dueDate)}</span>
                      <span className="ml-1.5 text-xs tabular-nums">
                        {formatCurrency(nextPayment.amount)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">&mdash;</span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
