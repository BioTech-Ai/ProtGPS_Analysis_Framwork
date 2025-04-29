"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { TerminalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { analyzeProtein } from "../actions/analyze"

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

function isValidProteinSequence(sequence: string): boolean {
  const upperSequence = sequence.toUpperCase()
  return upperSequence.split("").every((char) => AMINO_ACIDS.has(char))
}

export default function ProteinTerminal() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([
    "ProtGPS v1.0 - Protein Structure and Location Analysis",
    "Type 'help' for available commands",
    "Type 'example' to see a sample protein sequence",
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      const { scrollHeight } = terminalRef.current
      terminalRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    const isCommand = ["help", "clear", "example"].includes(trimmedInput.toLowerCase())

    if (!isCommand && !isValidProteinSequence(trimmedInput)) {
      setError("Invalid protein sequence. Please enter valid amino acid letters (A-Y).")
      return
    }

    setIsProcessing(true)
    setError(null)
    setOutput((prev) => [...prev, `> ${trimmedInput}`])

    try {
      const result = await analyzeProtein(trimmedInput)
      if (result === "CLEAR_TERMINAL") {
        setOutput([
          "ProtGPS v1.0 - Protein Structure and Location Analysis",
          "Type 'help' for available commands",
          "Type 'example' to see a sample protein sequence",
        ])
      } else {
        setOutput((prev) => [...prev, result])
      }
    } catch (error) {
      setError("Failed to analyze protein sequence. Please try again.")
      setOutput((prev) => [...prev, "Error: Failed to analyze protein sequence"])
    }

    setInput("")
    setIsProcessing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    setInput(e.target.value)
  }

  return (
    <Card
      className="w-[800px] backdrop-blur-sm bg-black/80 border-blue-primary/30 terminal-box-glow"
      onClick={(e) => e.stopPropagation()}
    >
      <CardHeader className="border-b border-blue-primary/30">
        <CardTitle className="flex items-center gap-2 text-blue-primary terminal-glow">
          <TerminalIcon className="w-5 h-5" />
          ProtGPS Terminal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={terminalRef}
          className="bg-black/90 rounded-lg p-4 h-[200px] mb-4 overflow-auto border border-blue-primary/30"
          aria-live="polite"
        >
          <div className="text-blue-primary font-mono space-y-2 terminal-glow text-base leading-relaxed">
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
            {isProcessing && <div className="animate-pulse">Processing...</div>}
            {error && <div className="text-red-500 font-bold">{error}</div>}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter protein sequence or command..."
            className="font-mono bg-black/50 border-blue-primary/30 text-white placeholder:text-blue-primary/50 h-12 min-h-0 py-2 text-base"
            disabled={isProcessing}
            aria-label="Protein sequence input"
          />
          <Button
            type="submit"
            disabled={isProcessing}
            className="bg-blue-primary/20 text-blue-primary hover:bg-blue-primary/30 border border-blue-primary/30 terminal-glow font-semibold h-12"
            onClick={(e) => e.stopPropagation()}
          >
            {isProcessing ? "Processing..." : "Analyze"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
