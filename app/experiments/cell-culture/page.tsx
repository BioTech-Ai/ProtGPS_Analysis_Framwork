"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MicroscopeIcon } from "lucide-react"
import Link from "next/link"
import { BetaFrozenNotice } from "@/components/beta-frozen-notice"

export default function CellCulture() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <MicroscopeIcon className="w-6 h-6" />
            Cell Culture Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BetaFrozenNotice />
          <p className="text-terminal-orange">
            The Smart Cell Culture System is currently in development. This automated platform will provide:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>Real-time culture monitoring and analysis</li>
            <li>Environmental parameter optimization</li>
            <li>Automated growth tracking</li>
            <li>Intelligent alert system for culture conditions</li>
          </ul>
          <p className="text-terminal-orange mt-4">Expected release: Q2 2024</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
