"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { BeakerIcon, Dna, MicroscopeIcon as Molecule } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import components that use Three.js
const ProteinStructure = dynamic(() => import("./protein-structure"), { ssr: false })
const ProteinAnimation = dynamic(() => import("./protein-animation"), { ssr: false })

interface AnalysisData {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface VisualizationCardProps {
  sequence: string
  analysisData: AnalysisData | null
}

export default function VisualizationCard({ sequence, analysisData }: VisualizationCardProps) {
  const [activeTab, setActiveTab] = useState("structure")

  return (
    <Card className="bg-black/90 border-blue-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-blue-400 glow-blue flex items-center gap-2">
          <BeakerIcon className="w-5 h-5" />
          Protein Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black border border-blue-500/30">
            <TabsTrigger
              value="structure"
              className="text-blue-400/70 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10"
            >
              <Molecule className="w-4 h-4 mr-2" />
              3D Structure
            </TabsTrigger>
            <TabsTrigger
              value="animation"
              className="text-blue-400/70 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10"
            >
              <Dna className="w-4 h-4 mr-2" />
              Animation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="h-[400px]">
            <ProteinStructure sequence={sequence} />
          </TabsContent>

          <TabsContent value="animation" className="h-[400px]">
            <ProteinAnimation sequence={sequence} analysisData={analysisData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
