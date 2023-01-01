"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [lines, setLines] = useState<string[]>([])
  const [showEnter, setShowEnter] = useState(false)
  const [showPlatformLink, setShowPlatformLink] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const startupLines = [
      "Initializing ProtGPS Terminal...",
      "Loading core modules...",
      "Calibrating molecular analysis engine...",
      "Establishing quantum tunneling protocols...",
      "Activating protein prediction matrix...",
      "Loading AI models...",
      "Initializing visualization engine...",
      "System ready.",
    ]

    const addLine = (index: number) => {
      if (index < startupLines.length) {
        setLines((prev) => [...prev, startupLines[index]])
        setTimeout(() => addLine(index + 1), 500)
      } else {
        setTimeout(() => setShowEnter(true), 1000)
      }
    }

    setTimeout(() => addLine(0), 1000)
  }, [])

  const handleEnter = () => {
    setShowEnter(false)
    setLines((prev) => [...prev, "Access granted. Welcome to ProtGPS."])
    setTimeout(() => setShowPlatformLink(true), 1000)
  }

  const handlePlatformClick = () => {
    setFadeOut(true)
    setTimeout(() => {
      router.push("/analysis")
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-black border border-green-500/30 rounded-lg p-6">
          <div className="font-mono space-y-2">
            <AnimatePresence>
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 terminal-glow"
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>

            {showEnter && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
                <button
                  onClick={handleEnter}
                  className="text-green-400 terminal-glow text-xl hover:text-green-300 transition-colors cursor-pointer"
                >
                  Press ENTER to continue...
                </button>
              </motion.div>
            )}

            {showPlatformLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={handlePlatformClick}
                  className="text-3xl font-bold text-green-400 terminal-glow hover:text-green-300 transition-colors cursor-pointer"
                >
                  ProtGPS Analysis Platform
                </button>
                <div className="mt-4 text-green-400/70">Click to enter the platform</div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  )
}

