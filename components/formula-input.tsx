"use client"

import type React from "react"
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
      setError("Please enter a sequence")
      return
    }

    // Allow special commands
    const command = value.toLowerCase()
    if (["help", "clear", "example"].includes(command)) {
      setError(null)
      onAnalyze()
      return
    }

    // Validate sequence
    const invalidChars = [...value].filter((char) => !AMINO_ACIDS.has(char.toUpperCase()))
    if (invalidChars.length > 0) {
      setError(`Invalid amino acids: ${[...new Set(invalidChars)].join(", ")}`)
      return
    }

    setError(null)
    onAnalyze()
  }, [value, onAnalyze])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Enter protein sequence or command (help, clear, example)..."
          className="font-mono bg-black/50 border-[#F0B90B]/30 text-[#F0B90B] placeholder:text-[#F0B90B]/50"
        />
        {error ? (
          <div className="text-red-500 text-xs">{error}</div>
        ) : (
          <div className="text-xs text-[#F0B90B]/50 font-mono">Example: MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG</div>
        )}
      </div>
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-[#F0B90B]/10 text-[#F0B90B] hover:bg-[#F0B90B]/20 border border-[#F0B90B]/30 disabled:opacity-50"
      >
        <BrainCircuitIcon className="w-4 h-4 mr-2" />
        {isAnalyzing ? "Analyzing..." : "Analyze Sequence"}
      </Button>
    </div>
  )
}
