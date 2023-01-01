"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import MoleculeViewer from "./molecule-viewer"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface CanvasWrapperProps {
  sequence?: string
  analysisData: AnalysisResult | null
}

export default function CanvasWrapper({ sequence, analysisData }: CanvasWrapperProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <MoleculeViewer sequence={sequence} analysisData={analysisData} />
        </Suspense>
      </Canvas>
    </div>
  )
}

