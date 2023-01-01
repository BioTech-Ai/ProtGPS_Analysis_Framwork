"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuitIcon } from "lucide-react"
import { useState, useCallback } from "react"

interface FormulaInputProps {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

const AMINO_ACIDS = new Set([
  "A",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "Y",
])

export default function FormulaInput({ value, onChange, onAnalyze, isAnalyzing }: FormulaInputProps) {
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.toUpperCase()
      setError(null)
      onChange(newValue)
    },
    [onChange],
  )

  const handleAnalyze = useCallback(() => {
    if (!value.trim()) {
      setError("Please enter a formula")
      return
    }

    const isValid = value.split("").every((char) => AMINO_ACIDS.has(char))
    if (!isValid) {
      setError("Invalid formula. Please use only valid amino acid letters (A-Y)")
      return
    }

    onAnalyze()
  }, [value, onAnalyze])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Enter molecular formula..."
          className="font-mono bg-black/20 border-[#d3594d]/10 text-[#d3594d]/80 placeholder:text-[#d3594d]/20"
          maxLength={50}
        />
        {error ? (
          <div className="text-red-400/90 text-xs">{error}</div>
        ) : (
          <div className="text-xs text-[#d3594d]/40">Example: MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG</div>
        )}
      </div>
      <Button
        onClick={handleAnalyze}
        disabled={!value || isAnalyzing}
        className={`w-full matte-bg border matte-border text-[#d3594d]/80 hover:bg-[#d3594d]/5 
          transition-colors ${isAnalyzing ? "opacity-50" : ""}`}
      >
        <BrainCircuitIcon className="w-4 h-4 mr-2" />
        {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
      </Button>
    </div>
  )
}

