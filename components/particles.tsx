"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Particles({ count = 500 }) {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const radius = 8

    for (let i = 0; i < count; i++) {
      // Create a sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = radius * Math.cbrt(Math.random()) // Cube root for more uniform distribution

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    return positions
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y += 0.0005
    points.current.rotation.x += 0.0002

    // Pulse effect
    const time = state.clock.getElapsedTime()
    if (points.current.material instanceof THREE.PointsMaterial) {
      points.current.material.size = 0.05 + Math.sin(time) * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff00"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

