"use client"

import { useState, useCallback, Suspense } from "react"
import { BeakerIcon, BookOpenIcon, BrainCircuitIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalysisResults from "@/components/analysis-results"
import FormulaInput from "@/components/formula-input"
import VisualizationCard from "@/components/visualization-card"
import { analyzeProtein } from "@/actions/analyze"
import EducationContent from "@/components/education-content"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

export default function AnalysisPage() {
  const [sequence, setSequence] = useState("")
  const [analysisResults, setAnalysisResults] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)

  const handleSequenceChange = useCallback((newSequence: string) => {
    setSequence(newSequence)
  }, [])

  const handleAnalyze = useCallback(async () => {
    try {
      setIsAnalyzing(true)
      const result = await analyzeProtein(sequence)
      setAnalysisData(result)
      setAnalysisResults([
        `Predicted Location: ${result.location}`,
        `Confidence Score: ${result.confidence}`,
        `Associated Compartments: ${result.compartments.join(", ")}`,
        `Potential Interactions: ${result.interactions}`,
        `Localization Signals: ${result.signals}`,
      ])
    } catch (error) {
      console.error("Analysis error:", error)
      setAnalysisResults(["Error: Unable to analyze protein sequence"])
      setAnalysisData(null)
    } finally {
      setIsAnalyzing(false)
    }
  }, [sequence])

  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#d3594d]/90 title-glow">ProtGPS Analysis Platform</h1>
          <p className="text-[#d3594d]/40">Advanced Protein Localization Prediction System</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border matte-border rounded-lg">
            <TabsTrigger
              value="analysis"
              className="text-[#d3594d]/60 data-[state=active]:text-[#d3594d]/90 hover:text-[#d3594d]/90 transition-colors"
            >
              <BrainCircuitIcon className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="visualization"
              className="text-[#d3594d]/60 data-[state=active]:text-[#d3594d]/90 hover:text-[#d3594d]/90 transition-colors"
            >
              <BeakerIcon className="w-4 h-4 mr-2" />
              Visualization
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-[#d3594d]/60 data-[state=active]:text-[#d3594d]/90 hover:text-[#d3594d]/90 transition-colors"
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input and Analysis */}
              <div className="space-y-6">
                <Card className="bg-black/40 matte-border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#d3594d]/80 flex items-center gap-2">
                      <BrainCircuitIcon className="w-5 h-5" />
                      Protein Sequence Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormulaInput
                      value={sequence}
                      onChange={handleSequenceChange}
                      onAnalyze={handleAnalyze}
                      isAnalyzing={isAnalyzing}
                    />
                  </CardContent>
                </Card>

                <AnalysisResults results={analysisResults} isLoading={isAnalyzing} />
              </div>

              {/* Visualization */}
              <Suspense fallback={<div className="h-[600px] bg-black/40 matte-border rounded-lg" />}>
                <VisualizationCard sequence={sequence} analysisData={analysisData} />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="space-y-4">
            <Card className="bg-black/40 matte-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d3594d]/80">Molecular Visualization</CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <Suspense fallback={<div className="h-full bg-black/40 matte-border" />}>
                  <VisualizationCard sequence={sequence} analysisData={analysisData} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <EducationContent />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

