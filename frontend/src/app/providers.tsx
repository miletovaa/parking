import { MeStoreProvider } from "@/providers/me-store-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MeStoreProvider>
      {children}
    </MeStoreProvider>
  )
}