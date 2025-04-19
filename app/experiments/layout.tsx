"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import type React from "react"

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  )
}
