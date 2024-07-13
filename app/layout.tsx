import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { Toaster } from "sonner"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tune Match",
  description: "Find your perfect playlist",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-gray-900 text-gray-100 antialiased"
        )}
      >
        {children}
        <Toaster richColors theme="system" closeButton />
      </body>
    </html>
  )
}
