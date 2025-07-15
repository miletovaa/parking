import { NextIntlClientProvider } from "next-intl"
import { MeStoreProvider } from "@/providers/me-store-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <MeStoreProvider>
        {children}
      </MeStoreProvider>
    </NextIntlClientProvider>
  )
}