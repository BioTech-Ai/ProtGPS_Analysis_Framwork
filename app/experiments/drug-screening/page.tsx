"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConicalIcon } from "lucide-react"
import Link from "next/link"

export default function DrugScreening() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <FlaskConicalIcon className="w-6 h-6" />
            Drug Screening Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">
            The Virtual Drug Screening platform is currently in development. This AI-powered system will offer:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>Molecular docking simulations</li>
            <li>Binding affinity predictions</li>
            <li>Drug-target interaction analysis</li>
            <li>Structure-based drug design tools</li>
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
