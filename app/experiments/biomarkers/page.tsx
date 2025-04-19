"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulseIcon } from "lucide-react"
import Link from "next/link"

export default function Biomarkers() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <HeartPulseIcon className="w-6 h-6" />
            Biomarker Discovery Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">
            The Biomarker Discovery platform is currently in development. This integrated system will enable:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>Multi-omics data analysis</li>
            <li>Novel biomarker identification</li>
            <li>Clinical validation workflows</li>
            <li>Comprehensive biomarker screening</li>
          </ul>
          <p className="text-terminal-orange mt-4">Expected release: Q1 2025</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
