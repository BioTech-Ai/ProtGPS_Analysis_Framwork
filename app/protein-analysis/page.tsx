"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BrainCircuitIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { analyzeProtein } from "../actions/analyze-protein"
import type { ProteinAnalysisResult } from "../actions/analyze-protein"
import { HelpDialog } from "@/components/help-dialog"
import SplashScreen from "@/components/splash-screen"
import ProteinAnimationBg from "@/components/protein-animation-bg"

export default function ProteinAnalysisPage() {
  const { toast } = useToast()
  const [sequence, setSequence] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ProteinAnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setLoading(false)
  }

  const handleAnalyze = async () => {
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
      const analysisResult = await analyzeProtein(sequence)
      setResult(analysisResult)
      toast({
        title: "Analysis Complete",
        description: "Protein sequence analysis completed successfully. View results below.",
        variant: "default",
        className: "bg-black border-blue-500/30",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          error instanceof Error
            ? `Error analyzing sequence: ${error.message}`
            : "Failed to analyze protein sequence. Please try again.",
        variant: "destructive",
        className: "bg-black border-red-500/30",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  // If loading, show splash screen
  if (loading) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className="min-h-screen bg-black">
      <ProteinAnimationBg />
      <header className="border-b border-blue-500/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-blue-400 glow-blue">
                  <BrainCircuitIcon className="w-6 h-6" />
                  BioTech AI - Synapse Analysis
                </h1>
                <div className="text-sm text-blue-400/70">biotech-synapse.xyz</div>
              </div>
            </div>
            <HelpDialog title="How to Use Protein Analysis">
              <p className="text-base leading-relaxed mb-4">
                The Protein GPS Analysis tool helps you analyze protein sequences to predict their cellular location,
                structure, and function. Follow these steps to get started:
              </p>
              <ol className="list-decimal list-inside space-y-3 mb-4">
                <li className="text-base leading-relaxed">
                  Enter a valid protein sequence in the input field (using standard amino acid letters A-Y)
                </li>
                <li className="text-base leading-relaxed">Click the "Analyze Sequence" button to start the analysis</li>
                <li className="text-base leading-relaxed">
                  View the results, which include:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Primary cellular location</li>
                    <li>Confidence level of the prediction</li>
                    <li>Possible cellular compartments</li>
                    <li>Predicted protein interactions</li>
                    <li>Structural features</li>
                    <li>Additional predictions about membrane association, secretion, etc.</li>
                  </ul>
                </li>
              </ol>
              <p className="text-base leading-relaxed mb-2">
                <strong>Example sequence:</strong> MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG
              </p>
              <p className="text-base leading-relaxed">
                <strong>Note:</strong> Analysis typically takes 5-15 seconds depending on sequence length.
              </p>
            </HelpDialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-black/90 border-blue-500/30">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl md:text-2xl text-blue-400 mb-1">Protein Sequence Analysis</CardTitle>
                  <CardDescription className="text-blue-300 text-base">
                    Enter a protein sequence to analyze its location and structure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <Input
                  value={sequence}
                  onChange={(e) => setSequence(e.target.value)}
                  placeholder="Enter protein sequence..."
                  className="font-mono bg-black/50 border-blue-500/30 text-blue-300 placeholder:text-blue-400/50 text-base py-2.5"
                />
                <p className="text-sm text-blue-400/70">Example: MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG</p>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 py-2.5 text-base"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Sequence"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-black/90 border-blue-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl text-blue-400">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="grid gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Primary Location</h3>
                      <p className="text-blue-300 text-base leading-relaxed">{result.location}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Confidence</h3>
                      <p className="text-blue-300 text-base leading-relaxed">{result.confidence}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Cellular Compartments</h3>
                      <ul className="list-disc list-inside text-blue-300 space-y-1.5">
                        {result.compartments.map((compartment, index) => (
                          <li key={index} className="text-base leading-relaxed">
                            {compartment}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Predicted Interactions</h3>
                      <ul className="list-disc list-inside text-blue-300 space-y-1.5">
                        {result.interactions.map((interaction, index) => (
                          <li key={index} className="text-base leading-relaxed">
                            {interaction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Structural Features</h3>
                      <ul className="list-disc list-inside text-blue-300 space-y-1.5">
                        {result.structuralFeatures.map((feature, index) => (
                          <li key={index} className="text-base leading-relaxed">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Additional Predictions</h3>
                      <ul className="list-disc list-inside text-blue-300 space-y-1.5">
                        <li className="text-base leading-relaxed">
                          Membrane Protein: {result.predictions.membrane ? "Yes" : "No"}
                        </li>
                        <li className="text-base leading-relaxed">
                          Secretory Protein: {result.predictions.secretory ? "Yes" : "No"}
                        </li>
                        <li className="text-base leading-relaxed">
                          Nuclear Protein: {result.predictions.nuclear ? "Yes" : "No"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
