import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import {getLocale} from 'next-intl/server'
import "./globals.css"

import AuthWrapper from "@/app/_components/AuthWrapper"
import Header from "@/app/_components/Header"
import Providers from "@/app/providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
