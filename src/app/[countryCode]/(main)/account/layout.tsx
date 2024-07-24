import { getCustomer } from "@lib/data"
import AccountLayout from "@modules/account/templates/account-layout"
import { redirect } from "next/navigation"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await getCustomer().catch(() => null)
  console.log(customer)

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : redirect('/auth')}
    </AccountLayout>
  )
}
