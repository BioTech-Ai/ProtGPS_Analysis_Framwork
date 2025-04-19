"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, DnaIcon, ZapIcon, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { analyzeGenomicSequence } from "../actions/analyze-genomics"
import type { GenomicsAnalysisResult } from "../actions/analyze-genomics"
import { HelpDialog } from "@/components/help-dialog"

export default function GenomicsAnalysisPage() {
  const { toast } = useToast()
  const [sequence, setSequence] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<GenomicsAnalysisResult | null>(null)
  const [sequenceType, setSequenceType] = useState<"DNA" | "RNA">("DNA")
  const [options, setOptions] = useState({
    includeVariants: true,
    includeMapping: true,
    includeExpression: false,
    includePathways: false,
  })

  const handleAnalyze = async () => {
    if (!sequence.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sequence",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const analysisResult = await analyzeGenomicSequence(sequence, sequenceType, options)
      setResult(analysisResult)
      toast({
        title: "Analysis Complete",
        description: "Your sequence has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze sequence",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExport = () => {
    if (!result) return
    const jsonString = JSON.stringify(result, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `genomics-analysis-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-[#F0B90B]/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[#F0B90B]/70 hover:text-[#F0B90B] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2 text-[#F0B90B] glow-yellow">
                  {sequenceType === "DNA" ? <DnaIcon className="w-6 h-6" /> : <ZapIcon className="w-6 h-6" />}
                  {sequenceType === "DNA"
                    ? "BioTech AI - Synapse Genome Sequencer"
                    : "BioTech AI - Synapse RNA Analyzer"}
                </h1>
                <div className="text-xs text-[#F0B90B]/70">biotech-synapse.xyz</div>
              </div>
            </div>
            <HelpDialog title={sequenceType === "DNA" ? "How to Use DNA Analysis" : "How to Use RNA Analysis"}>
              {sequenceType === "DNA" ? (
                <>
                  <p>
                    The Advanced Genome Sequencer analyzes DNA sequences to identify genomic features, variants, and
                    structural elements. Follow these steps to analyze your DNA sequence:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                      Select the analysis options you want to include:
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>
                          <strong>Variant Analysis:</strong> Identifies mutations and polymorphisms
                        </li>
                        <li>
                          <strong>Genomic Mapping:</strong> Provides mapping quality metrics
                        </li>
                        <li>
                          <strong>Expression Analysis:</strong> Predicts gene expression levels
                        </li>
                        <li>
                          <strong>Pathway Analysis:</strong> Identifies enriched biological pathways
                        </li>
                      </ul>
                    </li>
                    <li>Enter your DNA sequence (using A, T, G, C nucleotides)</li>
                    <li>Click "Analyze Sequence" to start the analysis</li>
                    <li>View the comprehensive results and export them if needed</li>
                  </ol>
                  <p className="mt-2">
                    <strong>Example DNA sequence:</strong> ATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGC
                  </p>
                  <p className="mt-2">
                    <strong>Note:</strong> For best results, provide sequences of at least 50 base pairs.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The RNA Expression Analyzer examines RNA sequences to predict expression levels, identify regulatory
                    elements, and analyze pathways. Follow these steps to analyze your RNA sequence:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                      Select the analysis options you want to include:
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>
                          <strong>Variant Analysis:</strong> Identifies RNA editing sites and modifications
                        </li>
                        <li>
                          <strong>Genomic Mapping:</strong> Provides mapping quality metrics
                        </li>
                        <li>
                          <strong>Expression Analysis:</strong> Predicts expression levels and fold changes
                        </li>
                        <li>
                          <strong>Pathway Analysis:</strong> Identifies enriched biological pathways
                        </li>
                      </ul>
                    </li>
                    <li>Enter your RNA sequence (using A, U, G, C nucleotides)</li>
                    <li>Click "Analyze Sequence" to start the analysis</li>
                    <li>View the comprehensive results and export them if needed</li>
                  </ol>
                  <p className="mt-2">
                    <strong>Example RNA sequence:</strong> AUCGAUCGUAGCUAGCUAGCUAGCUAGCUAGCUAGC
                  </p>
                  <p className="mt-2">
                    <strong>Note:</strong> Expression analysis works best with longer sequences (100+ nucleotides).
                  </p>
                </>
              )}
            </HelpDialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-black/90 border-[#F0B90B]/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-[#F0B90B]">Sequence Analysis</CardTitle>
                  <CardDescription className="text-[#F0B90B]/70">
                    {sequenceType === "DNA"
                      ? "Analyze DNA sequences for variants, mapping, and structural features"
                      : "Analyze RNA sequences for expression, modifications, and pathway enrichment"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={sequenceType} onValueChange={(value) => setSequenceType(value as "DNA" | "RNA")}>
                <TabsList className="bg-black border border-[#F0B90B]/30">
                  <TabsTrigger
                    value="DNA"
                    className="text-[#F0B90B]/70 data-[state=active]:text-[#F0B90B] data-[state=active]:bg-[#F0B90B]/10"
                  >
                    DNA Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="RNA"
                    className="text-[#F0B90B]/70 data-[state=active]:text-[#F0B90B] data-[state=active]:bg-[#F0B90B]/10"
                  >
                    RNA Analysis
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="variants"
                      checked={options.includeVariants}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeVariants: checked as boolean }))
                      }
                    />
                    <label htmlFor="variants" className="text-[#F0B90B]/70">
                      Variant Analysis
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mapping"
                      checked={options.includeMapping}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeMapping: checked as boolean }))
                      }
                    />
                    <label htmlFor="mapping" className="text-[#F0B90B]/70">
                      Genomic Mapping
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="expression"
                      checked={options.includeExpression}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeExpression: checked as boolean }))
                      }
                    />
                    <label htmlFor="expression" className="text-[#F0B90B]/70">
                      Expression Analysis
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pathways"
                      checked={options.includePathways}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includePathways: checked as boolean }))
                      }
                    />
                    <label htmlFor="pathways" className="text-[#F0B90B]/70">
                      Pathway Analysis
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                    placeholder={`Enter ${sequenceType} sequence...`}
                    className="font-mono bg-black/50 border-[#F0B90B]/30 text-[#F0B90B] placeholder:text-[#F0B90B]/50"
                  />
                  <p className="text-xs text-[#F0B90B]/50">
                    Example: {sequenceType === "DNA" ? "ATCGATCGTAGCTAGCTAGC..." : "AUCGAUCGUAGCUAGCUAGC..."}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 bg-[#F0B90B]/10 text-[#F0B90B] hover:bg-[#F0B90B]/20 border border-[#F0B90B]/30"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Sequence"}
                  </Button>
                  {result && (
                    <Button
                      onClick={handleExport}
                      className="bg-[#F0B90B]/10 text-[#F0B90B] hover:bg-[#F0B90B]/20 border border-[#F0B90B]/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-black/90 border-[#F0B90B]/30">
                <CardHeader>
                  <CardTitle className="text-[#F0B90B]">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-[#F0B90B] font-semibold mb-2">Sequence Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-[#F0B90B]/90">
                        <div>Type: {result.sequenceType}</div>
                        <div>Length: {result.length} bp</div>
                        <div>GC Content: {(result.gcContent * 100).toFixed(2)}%</div>
                      </div>
                    </div>

                    {/* Quality Metrics */}
                    <div>
                      <h3 className="text-[#F0B90B] font-semibold mb-2">Quality Metrics</h3>
                      <div className="grid grid-cols-2 gap-4 text-[#F0B90B]/90">
                        <div>Mean Quality: {result.qualityMetrics.meanQuality.toFixed(2)}</div>
                        <div>Coverage Depth: {result.qualityMetrics.depthOfCoverage}x</div>
                        <div>Mapping Rate: {(result.qualityMetrics.mappingRate * 100).toFixed(2)}%</div>
                        <div>Duplication Rate: {(result.qualityMetrics.duplicationRate * 100).toFixed(2)}%</div>
                      </div>
                    </div>

                    {/* Variants */}
                    {options.includeVariants && result.variants && result.variants.length > 0 && (
                      <div>
                        <h3 className="text-[#F0B90B] font-semibold mb-2">Variants</h3>
                        <div className="space-y-2">
                          {result.variants.map((variant, index) => (
                            <div key={index} className="p-2 border border-[#F0B90B]/20 rounded text-[#F0B90B]/90">
                              <div className="grid grid-cols-2 gap-2">
                                <div>Position: {variant.position}</div>
                                <div>Type: {variant.type}</div>
                                <div>Impact: {variant.impact}</div>
                                <div>
                                  Change: {variant.reference} → {variant.alternate}
                                </div>
                              </div>
                              <div className="mt-1 text-sm">{variant.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expression Data */}
                    {options.includeExpression && result.expressionData && (
                      <div>
                        <h3 className="text-[#F0B90B] font-semibold mb-2">Expression Analysis</h3>
                        <div className="space-y-2">
                          {Object.entries(result.expressionData).map(([gene, data], index) => (
                            <div key={index} className="p-2 border border-[#F0B90B]/20 rounded text-[#F0B90B]/90">
                              <div className="grid grid-cols-3 gap-2">
                                <div>Gene: {gene}</div>
                                <div>Expression: {data.expression.toFixed(2)}</div>
                                <div>Fold Change: {data.foldChange.toFixed(2)}</div>
                              </div>
                              <div className="text-sm">p-value: {data.pValue.toExponential(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pathway Enrichment */}
                    {options.includePathways && result.pathwayEnrichment && (
                      <div>
                        <h3 className="text-[#F0B90B] font-semibold mb-2">Pathway Enrichment</h3>
                        <div className="space-y-2">
                          {result.pathwayEnrichment.map((pathway, index) => (
                            <div key={index} className="p-2 border border-[#F0B90B]/20 rounded text-[#F0B90B]/90">
                              <div className="grid grid-cols-2 gap-2">
                                <div>Pathway: {pathway.pathway}</div>
                                <div>Score: {pathway.enrichmentScore.toFixed(2)}</div>
                              </div>
                              <div className="text-sm">
                                Genes: {pathway.genes.join(", ")}
                                <div>p-value: {pathway.pValue.toExponential(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
