import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "./clientLayout"
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ShopNow - Your One-Stop E-commerce Shop",
  description: "Discover amazing products at great prices",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // This is a client component wrapper to conditionally render the navbar
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <div className="flex min-h-screen flex-col">
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </div>
        </Providers>
        
      </body>
    </html>
  )
}
