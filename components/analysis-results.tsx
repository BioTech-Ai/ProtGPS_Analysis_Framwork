"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon } from "lucide-react"

interface AnalysisResultsProps {
  results: string[]
  isLoading: boolean
}

export default function AnalysisResults({ results, isLoading }: AnalysisResultsProps) {
  return (
    <Card className="bg-black/40 matte-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#d3594d]/80 flex items-center gap-2">
          <BrainCircuitIcon className="w-5 h-5" />
          AI Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 min-h-[200px] font-mono">
          {isLoading ? (
            <div className="text-[#d3594d]/60 animate-pulse">Analyzing protein structure and location...</div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="text-[#d3594d]/70">
                  {result}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[#d3594d]/20">Enter a formula and click analyze to see AI predictions</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

