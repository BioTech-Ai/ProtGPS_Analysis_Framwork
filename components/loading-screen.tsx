"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [text, setText] = useState("Initializing ProtGPS Environment")
  const [dots, setDots] = useState("")

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    const textSequence = [
      "Initializing ProtGPS Environment",
      "Loading Molecular Database",
      "Calibrating AI Models",
      "Preparing Workspace",
    ]
    let currentIndex = 0

    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % textSequence.length
      setText(textSequence[currentIndex])
    }, 2000)

    // Complete loading after animations
    const timer = setTimeout(() => {
      clearInterval(dotInterval)
      clearInterval(textInterval)
      onLoadingComplete()
    }, 8000)

    return () => {
      clearInterval(dotInterval)
      clearInterval(textInterval)
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-2xl font-mono text-green-500 terminal-glow">
        {text}
        {dots}
      </div>
    </div>
  )
}

