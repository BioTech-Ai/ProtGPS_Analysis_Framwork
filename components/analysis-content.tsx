"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { BeakerIcon, BookOpenIcon, BrainCircuitIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { analyzeProtein } from "@/actions/analyze"
import dynamic from "next/dynamic"

// Dynamically import components that use Three.js
const AnalysisResults = dynamic(() => import("./analysis-results"), { ssr: false })
const FormulaInput = dynamic(() => import("./formula-input"), { ssr: false })
const VisualizationCard = dynamic(() => import("./visualization-card"), { ssr: false })
const EducationContent = dynamic(() => import("./education-content"), { ssr: false })
const CellularView = dynamic(() => import("./cellular-view"), { ssr: false })

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-[#F0B90B]">Loading analysis tools...</div>
    </div>
  )
}

export default function AnalysisContent() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [sequence, setSequence] = useState("")
  const [analysisResults, setAnalysisResults] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  //const [exportOpen, setExportOpen] = useState(false)
  //const [reportOpen, setReportOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!sequence.trim()) {
      toast({
        title: "Error",
        description: "Please enter a protein sequence",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const result = await analyzeProtein(sequence)

      if (typeof result === "string") {
        // Handle command responses
        if (result === "CLEAR_TERMINAL") {
          setAnalysisResults([])
          setAnalysisData(null)
        } else {
          setAnalysisResults([result])
        }
      } else {
        // Handle analysis results
        setAnalysisData(result)
        setAnalysisResults([
          `Predicted Location: ${result.location}`,
          `Confidence Score: ${result.confidence}`,
          `Associated Compartments: ${result.compartments.join(", ")}`,
          `Potential Interactions: ${result.interactions}`,
          `Localization Signals: ${result.signals}`,
        ])

        toast({
          title: "Analysis Complete",
          description: "Your protein sequence has been analyzed successfully.",
        })
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setAnalysisResults(["Error: " + (error instanceof Error ? error.message : "Failed to analyze sequence")])
      setAnalysisData(null)

      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze sequence",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [sequence, toast])

  if (!mounted) return <LoadingFallback />

  return (
    <ErrorBoundary>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between">
          <TabsList className="bg-black border border-[#F0B90B]/30">
            <TabsTrigger
              value="analysis"
              className="text-[#F0B90B]/70 data-[state=active]:text-[#F0B90B] data-[state=active]:bg-[#F0B90B]/10"
            >
              <BrainCircuitIcon className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="visualization"
              className="text-[#F0B90B]/70 data-[state=active]:text-[#F0B90B] data-[state=active]:bg-[#F0B90B]/10"
            >
              <BeakerIcon className="w-4 h-4 mr-2" />
              Visualization
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-[#F0B90B]/70 data-[state=active]:text-[#F0B90B] data-[state=active]:bg-[#F0B90B]/10"
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            {/* <Button
              variant="outline"
              className="bg-black border-[#F0B90B]/30 text-[#F0B90B] hover:bg-[#F0B90B]/10"
              onClick={() => setExportOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="bg-black border-[#F0B90B]/30 text-[#F0B90B] hover:bg-[#F0B90B]/10"
              onClick={() => setReportOpen(true)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Report
            </Button> */}
          </div>
        </div>

        <TabsContent value="analysis" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-black/90 border-[#F0B90B]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F0B90B] glow-yellow flex items-center gap-2">
                      <BrainCircuitIcon className="w-5 h-5" />
                      Protein Sequence Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormulaInput
                      value={sequence}
                      onChange={setSequence}
                      onAnalyze={handleAnalyze}
                      isAnalyzing={isAnalyzing}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <AnalysisResults results={analysisResults} isLoading={isAnalyzing} />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <VisualizationCard sequence={sequence} analysisData={analysisData} />
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="visualization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-black/90 border-[#F0B90B]/30 lg:col-span-2 h-[600px]">
              <CardHeader>
                <CardTitle className="text-[#F0B90B] glow-yellow">Cellular Visualization</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)]">
                <CellularView sequence={sequence} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education">
          <EducationContent />
        </TabsContent>
      </Tabs>
    </ErrorBoundary>
  )
}
