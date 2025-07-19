import type { Metadata } from "next"
import {getLocale} from 'next-intl/server'
import "./globals.css"

import AuthWrapper from "@/app/_components/AuthWrapper"
import Header from "@/app/_components/Header"
import Providers from "@/app/providers"

export const metadata: Metadata = {
  title: "Parking",
  authors: [{ name: "Anna Miletova", url: "https://github.com/miletovaa" }],
  description: "Parking reservation and management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <AuthWrapper>
            <Header />
            {children}
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
