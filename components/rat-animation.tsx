"use client"

import { useEffect, useState } from "react"
import "./rat-animation.css"

export default function RatAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="rat-animation-container">
      <div className="rat">
        <div className="rat-body">
          <div className="rat-head">
            <div className="rat-ear rat-ear-left"></div>
            <div className="rat-ear rat-ear-right"></div>
            <div className="rat-eye"></div>
            <div className="rat-nose"></div>
            <div className="rat-whisker rat-whisker-1"></div>
            <div className="rat-whisker rat-whisker-2"></div>
            <div className="rat-whisker rat-whisker-3"></div>
          </div>
          <div className="rat-torso"></div>
          <div className="rat-tail"></div>
          <div className="rat-leg rat-leg-front-left"></div>
          <div className="rat-leg rat-leg-front-right"></div>
          <div className="rat-leg rat-leg-back-left"></div>
          <div className="rat-leg rat-leg-back-right"></div>
        </div>
        <div className="rat-shadow"></div>
        <div className="rat-label">Lab Rat</div>
      </div>
    </div>
  )
}
