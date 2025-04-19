"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WrenchIcon } from "lucide-react"
import Link from "next/link"

export default function CellRepair() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <WrenchIcon className="w-6 h-6" />
            Cancer Cell Repair Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">
            The Cancer Cell Repair Analysis platform is currently in development. This comprehensive tool will provide:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>Real-time monitoring of DNA repair mechanisms</li>
            <li>Mutation tracking and analysis</li>
            <li>Repair pathway visualization</li>
            <li>Comparative analysis with normal cells</li>
          </ul>
          <p className="text-terminal-orange mt-4">Expected release: Q4 2024</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
