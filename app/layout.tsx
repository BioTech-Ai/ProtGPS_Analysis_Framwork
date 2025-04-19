import "./globals.css"
import type { Metadata } from "next"
import type React from "react"
import { Providers } from "./providers"
import Favicon from "@/components/favicon"

export const metadata: Metadata = {
  title: "Biotech Ai - Synapse",
  description: "Advanced Research Platform for Molecular Biology",
  metadataBase: new URL("https://biotech-synapse.xyz"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Favicon />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
