"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import FormulaEditor from "./formula-editor"
import Scene3D from "./scene-3d"
import TerminalScene from "./terminal-scene"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Workspace() {
  const [activeFormula, setActiveFormula] = useState<string>("")

  return (
    <div className="w-full h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-sm border-b border-green-500/30 z-10">
        <div className="container mx-auto h-full flex items-center justify-between">
          <h1 className="text-green-400 font-mono text-xl terminal-glow">ProtGPS Workspace</h1>
          <Tabs defaultValue="formula" className="w-[400px]">
            <TabsList className="bg-black/50 border border-green-500/30">
              <TabsTrigger value="formula" className="text-green-400">
                Formula
              </TabsTrigger>
              <TabsTrigger value="visualization" className="text-green-400">
                Visualization
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-green-400">
                Analysis
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[calc(100vh-200px)] pt-16 grid grid-cols-2">
        <div className="h-full border-r border-green-500/30">
          <FormulaEditor value={activeFormula} onChange={setActiveFormula} />
        </div>

        <div className="h-full">
          <Canvas>
            <Suspense fallback={null}>
              <Scene3D formula={activeFormula} />
              <Environment preset="night" />
              <OrbitControls makeDefault />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Terminal Section */}
      <div className="absolute bottom-0 left-0 w-full h-[200px]">
        <Canvas eventSource={document.body} eventPrefix="client">
          <Suspense fallback={null}>
            <TerminalScene />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

