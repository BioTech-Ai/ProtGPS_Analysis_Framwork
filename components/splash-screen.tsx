"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          clearInterval(interval)

          // After progress reaches 100%, wait a moment and then trigger the completion
          setTimeout(() => {
            setShowLogo(false)
            setTimeout(onComplete, 1000) // Wait for exit animation to complete
          }, 500)

          return 100
        }
        return newProgress
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence mode="wait">
      {showLogo && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Logo */}
            <div className="relative w-48 h-48 mb-8">
              {/* Outer pulsing circle */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#0052FF]/10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Inner rotating hexagon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 10L105 40V80L60 110L15 80V40L60 10Z" stroke="#0052FF" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>

              {/* DNA helix symbol */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path d="M4 4h16v16H4z" fill="none" />
                  <motion.path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                    fill="#0052FF"
                    strokeWidth="0.2"
                    stroke="#0052FF"
                  />
                  <motion.path
                    d="M9.5 8.5l5 7M9.5 15.5l5-7"
                    stroke="#0052FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ pathLength: [0, 1] }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                  <motion.path
                    d="M7 10h2M15 10h2M7 14h2M15 14h2"
                    stroke="#0052FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ pathLength: [0, 1] }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Brand Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0052FF] to-[#4D8AFF] bg-clip-text text-transparent mb-2">
                BioTech AI - Synapse
              </h1>
              <p className="text-[#0052FF]/70 text-sm">Advanced Research Platform</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-64 h-1 bg-[#0052FF]/20 rounded-full mt-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div className="h-full bg-[#0052FF]" style={{ width: `${progress}%` }} initial={{ width: "0%" }} />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="text-transparent bg-gradient-to-r from-[#0052FF] to-[#4D8AFF] bg-clip-text text-sm mt-4 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Initializing Research Environment...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
