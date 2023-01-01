"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BeakerIcon, BrainCircuitIcon, SaveIcon } from "lucide-react"

interface FormulaEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function FormulaEditor({ value, onChange }: FormulaEditorProps) {
  const [savedFormulas, setSavedFormulas] = useState<string[]>([])

  const handleSave = () => {
    if (value && !savedFormulas.includes(value)) {
      setSavedFormulas((prev) => [...prev, value])
    }
  }

  const handleAnalyze = async () => {
    // Implement AI analysis here
  }

  return (
    <Card className="h-full bg-black/80 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-green-400 font-mono terminal-glow flex items-center gap-2">
          <BeakerIcon className="w-5 h-5" />
          Formula Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter molecular formula..."
            className="font-mono bg-black/50 border-green-500/30 text-green-400 placeholder:text-green-600/50"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              Save Formula
            </Button>
            <Button
              onClick={handleAnalyze}
              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
            >
              <BrainCircuitIcon className="w-4 h-4 mr-2" />
              Analyze with AI
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-mono">Saved Formulas</h3>
          <div className="space-y-1">
            {savedFormulas.map((formula, index) => (
              <div
                key={index}
                className="p-2 border border-green-500/30 rounded-md text-green-400 font-mono cursor-pointer hover:bg-green-500/10"
                onClick={() => onChange(formula)}
              >
                {formula}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

