import { Metadata } from "next"
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
import "rc-slider/assets/index.css"
import Footer from "@/shared/Footer/Footer"
import SiteHeader from "@/app/SiteHeader"
import CommonClient from "./CommonClient"
import MainNav3 from "@/components/Header/MainNav3"
import SecondNav2 from "@/components/Header/SecondNav2"
import MainNav2 from "@/components/Header/MainNav2"
import MainNav2Logged from "@/components/Header/MainNav2Logged"
import HeaderLogged from "@/components/Header/HeaderLogged"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import initTranslations from "@/app/i18n"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const queryClient = new QueryClient()

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout({
  params: { countryCode },
  children,
}: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const i18nNamespaces = ["common"]

  const { t, resources } = await initTranslations(countryCode, ["common"])

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
        <HeaderLogged />
        {/* <SecondNav2 /> */}
        {children}
        <CommonClient />
        <Footer />
    </TranslationsProvider>
  )
}
