"use client"

import { useRef, useEffect } from "react"

export default function ProteinLoopAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation parameters
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      connection: number[]
    }[] = []

    const particleCount = 100
    const connectionDistance = 100
    const colors = ["#F0B90B", "#F8D33A", "#D9A50A"]

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        connection: [],
      })
    }

    // DNA helix parameters
    const helixWidth = canvas.width * 0.8
    const helixHeight = canvas.height * 0.8
    const helixCenterX = canvas.width / 2
    const helixCenterY = canvas.height / 2
    const helixRadius = Math.min(helixWidth, helixHeight) / 4
    const helixTurns = 3
    const helixPointsPerTurn = 20
    const helixPoints: { x: number; y: number; z: number }[] = []

    // Generate helix points
    for (let i = 0; i < helixTurns * helixPointsPerTurn; i++) {
      const t = i / (helixTurns * helixPointsPerTurn)
      const angle = 2 * Math.PI * helixTurns * t

      helixPoints.push({
        x: helixCenterX + helixRadius * Math.cos(angle),
        y: helixCenterY + (t - 0.5) * helixHeight,
        z: helixRadius * Math.sin(angle),
      })
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw helix
      ctx.lineWidth = 2

      // First strand
      ctx.beginPath()
      ctx.strokeStyle = "#F0B90B"
      for (let i = 0; i < helixPoints.length - 1; i += 2) {
        const point = helixPoints[i]
        const nextPoint = helixPoints[i + 2] || helixPoints[i]

        if (i === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }

        // Draw base pair
        if (i % 4 === 0) {
          const oppositePoint = helixPoints[i + helixPointsPerTurn] || helixPoints[i]
          if (oppositePoint) {
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(helixCenterX * 2 - oppositePoint.x, oppositePoint.y)
            ctx.moveTo(point.x, point.y)
          }
        }
      }
      ctx.stroke()

      // Second strand
      ctx.beginPath()
      ctx.strokeStyle = "#D9A50A"
      for (let i = helixPointsPerTurn; i < helixPoints.length - 1; i += 2) {
        const point = helixPoints[i]
        const nextPoint = helixPoints[i + 2] || helixPoints[i]

        if (i === helixPointsPerTurn) {
          ctx.moveTo(helixCenterX * 2 - point.x, point.y)
        } else {
          ctx.lineTo(helixCenterX * 2 - point.x, point.y)
        }
      }
      ctx.stroke()

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Find connections
        particle.connection = []
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            particle.connection.push(j)

            // Draw connection
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(240, 185, 11, ${(1 - distance / connectionDistance) * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })

      // Rotate helix points
      helixPoints.forEach((point, i) => {
        const dx = point.x - helixCenterX
        const dz = point.z

        const angle = Math.atan2(dz, dx) + 0.005
        const radius = Math.sqrt(dx * dx + dz * dz)

        point.x = helixCenterX + radius * Math.cos(angle)
        point.z = radius * Math.sin(angle)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.7 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black"></div>
    </div>
  )
}
