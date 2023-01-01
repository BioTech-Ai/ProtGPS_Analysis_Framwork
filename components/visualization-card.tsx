"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CanvasWrapper from "./canvas-wrapper"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface VisualizationCardProps {
  sequence?: string
  analysisData: AnalysisResult | null
}

export default function VisualizationCard({ sequence, analysisData }: VisualizationCardProps) {
  return (
    <Card className="bg-black/40 matte-border backdrop-blur-sm h-[600px]">
      <CardHeader>
        <CardTitle className="text-[#d3594d]/80">Molecular Visualization</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        <div className="w-full h-full relative bg-gradient-to-b from-black/30 to-transparent">
          <CanvasWrapper sequence={sequence} analysisData={analysisData} />
        </div>
      </CardContent>
    </Card>
  )
}

