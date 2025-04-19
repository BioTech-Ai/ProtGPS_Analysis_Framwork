"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

export default function CancerDetector() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <SearchIcon className="w-6 h-6" />
            Cancer Cell Detector
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">
            The Cancer Cell Detector platform is currently in development. This advanced tool will utilize machine
            learning algorithms to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>Identify cancer cells through morphological analysis</li>
            <li>Track behavioral patterns in real-time</li>
            <li>Analyze cellular markers and protein expression</li>
            <li>Generate detailed reports with confidence scores</li>
          </ul>
          <p className="text-terminal-orange mt-4">Expected release: Q3 2024</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
