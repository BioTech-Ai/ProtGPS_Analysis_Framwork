"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon } from "lucide-react"
import { motion } from "framer-motion"

interface AnalysisResultsProps {
  results: string[]
  isLoading: boolean
}

export default function AnalysisResults({ results, isLoading }: AnalysisResultsProps) {
  return (
    <Card className="bg-black/90 border-blue-primary/30">
      <CardHeader>
        <CardTitle className="text-blue-primary flex items-center gap-2">
          <BrainCircuitIcon className="w-5 h-5" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 min-h-[200px] font-mono">
          {isLoading ? (
            <div className="text-blue-primary/70 animate-pulse">Analyzing protein sequence...</div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-blue-primary text-base leading-relaxed"
                >
                  {result}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-blue-primary/50 text-base">Enter a sequence and click analyze to see predictions</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
