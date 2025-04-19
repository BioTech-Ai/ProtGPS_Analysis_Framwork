"use client"

import { useRef, useMemo } from "react"
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

      positions[i] = radius * Math.cos(angle)
      positions[i + 1] = height
      positions[i + 2] = radius * Math.sin(angle)

      // Add some randomness
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
  const currentDate = new Date().toLocaleString()

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scan lines */}
      <div className="absolute inset-0 bg-scan-lines opacity-10" />

      {/* CCTV timestamp */}
      <div className="absolute top-4 right-4 text-cyan-400 font-mono text-sm">
        <div>PROTEIN ANALYSIS ACTIVE</div>
        <div>24/7 MONITORING</div>
        <div>{currentDate}</div>
      </div>
    </div>
  )
}

export default function ProteinAnimationBg() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#001a2c"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleHelix />
      </Canvas>
      <CCTVOverlay />
    </div>
  )
}
