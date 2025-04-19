"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { Loader } from "lucide-react"
import dynamic from "next/dynamic"
import { ErrorBoundary } from "@/components/error-boundary"

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

// Import MoleculeViewer dynamically
const MoleculeViewer = dynamic(() => import("./molecule-viewer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
      <div className="flex flex-col items-center gap-2">
        <Loader className="w-6 h-6 text-[#F0B90B] animate-spin" />
        <span className="text-[#F0B90B] text-sm">Loading visualization...</span>
      </div>
    </div>
  )
}

function ErrorDisplay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
      <div className="text-center space-y-2">
        <p className="text-[#F0B90B]">Failed to load visualization</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm bg-[#F0B90B]/10 text-[#F0B90B] rounded hover:bg-[#F0B90B]/20"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default function VisualizationCard({ sequence, analysisData }: VisualizationCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return <LoadingSpinner />

  return (
    <Card className="bg-black/90 border-[#F0B90B]/30 h-[600px] overflow-hidden">
      <CardContent className="h-full p-0">
        <div className="w-full h-full relative">
          <ErrorBoundary fallback={<ErrorDisplay />}>
            <Suspense fallback={<LoadingSpinner />}>
              <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <color attach="background" args={["#000000"]} />
                <MoleculeViewer sequence={sequence} analysisData={analysisData} />
              </Canvas>
            </Suspense>
          </ErrorBoundary>
        </div>
      </CardContent>
    </Card>
  )
}
