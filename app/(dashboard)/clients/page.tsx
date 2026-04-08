import { getClients, getPaymentAccounts, getSubscriptionPackages } from "@/lib/data/queries"
import { ClientsClient } from "@/components/clients/clients-client"

export default async function ClientsPage() {
  const [clients, accounts, packages] = await Promise.all([
    getClients(),
    getPaymentAccounts(),
    getSubscriptionPackages(),
  ])

  return (
    <ClientsClient
      clients={clients}
      paymentAccounts={accounts}
      subscriptionPackages={packages}
    />
  )
}
