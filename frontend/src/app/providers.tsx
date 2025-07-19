import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from 'next-themes'
import { MeStoreProvider } from "@/providers/me-store-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <MeStoreProvider>
          {children}
        </MeStoreProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}