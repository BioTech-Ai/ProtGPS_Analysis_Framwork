"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, PlayIcon, Trash2Icon } from "lucide-react"

interface FormulaInputProps {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function FormulaInput({ value, onChange, onAnalyze, isAnalyzing }: FormulaInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    onChange("")
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative border ${
          isFocused ? "border-blue-400" : "border-blue-500/30"
        } rounded-md transition-colors`}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter protein sequence..."
          className="min-h-[120px] bg-black/50 border-0 text-blue-100 placeholder:text-blue-400/50 font-mono resize-none"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute top-2 right-2 h-6 w-6 text-blue-400/70 hover:text-blue-400 hover:bg-blue-500/10"
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-blue-400/70">
          {value.length > 0 ? `${value.length} characters` : "Enter a protein sequence"}
        </div>
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing || !value.trim()}
          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <PlayIcon className="mr-2 h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
