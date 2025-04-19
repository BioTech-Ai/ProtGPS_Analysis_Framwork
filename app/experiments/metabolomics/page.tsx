"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BeakerIcon } from "lucide-react"
import Link from "next/link"

export default function Metabolomics() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <BeakerIcon className="w-6 h-6" />
            Metabolomics Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">This experiment is currently in development. Please check back later.</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
