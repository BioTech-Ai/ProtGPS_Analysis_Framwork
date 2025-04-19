"use client"

import { useRef, useEffect, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleHelix() {
  const points = useRef<THREE.Points>(null)

  // Generate helix points
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const radius = 2
    const turns = 5
    const pointsPerTurn = 400

    for (let i = 0; i < positions.length; i += 3) {
      const t = i / positions.length
      const angle = 2 * Math.PI * turns * t
      const height = (t - 0.5) * 4

      // Create main helix structure
      positions[i] = radius * Math.cos(angle)
      positions[i + 1] = height
      positions[i + 2] = radius * Math.sin(angle)

      // Add spikes
      if (i % 12 === 0) {
        const spikeLength = 0.5
        positions[i] *= 1 + spikeLength
        positions[i + 2] *= 1 + spikeLength
      }

      // Add randomness for particle effect
      positions[i] += (Math.random() - 0.5) * 0.2
      positions[i + 1] += (Math.random() - 0.5) * 0.2
      positions[i + 2] += (Math.random() - 0.5) * 0.2
    }

    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.1
      points.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <Points ref={points} positions={particlePositions}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00ffff"
      />
    </Points>
  )
}

function CCTVOverlay() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      setDateTime(formatted)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scan lines */}
      <div className="absolute inset-0 bg-scan-lines opacity-20" />

      {/* CCTV overlay elements */}
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-sm font-bold">
        <div>BIOTECH AI - SYNAPSE</div>
        <div>PROTEIN ANALYSIS SYSTEM</div>
      </div>

      {/* Recording indicator */}
      <div className="absolute top-4 right-4 flex items-center text-cyan-400 font-mono text-sm">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
        REC
      </div>

      {/* Date/Time */}
      <div className="absolute bottom-4 right-4 text-cyan-400 font-mono text-sm">{dateTime}</div>

      {/* Camera ID */}
      <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-sm">CAM_01: MAIN_ANALYSIS</div>
    </div>
  )
}

export default function CCTVProteinAnimation() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#001a2c"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleHelix />
      </Canvas>
      <CCTVOverlay />

      {/* Gradient overlay - make it less opaque */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 pointer-events-none" />
    </div>
  )
}
