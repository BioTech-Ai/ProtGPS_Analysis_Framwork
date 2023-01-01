"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Points } from "@react-three/drei"
import * as THREE from "three"

interface CellModelProps {
  sequence: string
}

const COMPARTMENTS = [
  { name: "Nucleus", position: [0, 0, 0], radius: 2, color: "#4ade80" },
  { name: "Mitochondria", position: [3, 2, 0], radius: 1, color: "#22c55e" },
  { name: "P-Body", position: [-3, -2, 0], radius: 0.8, color: "#16a34a" },
  { name: "Stress Granule", position: [2, -2, 0], radius: 0.7, color: "#15803d" },
]

export default function CellModel({ sequence }: CellModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Generate membrane particles
  const membraneParticles = useMemo(() => {
    const points = []
    const count = 1000
    const radius = 5

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = radius * (0.9 + Math.random() * 0.2)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      points.push(x, y, z)
    }

    return new Float32Array(points)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Cell membrane */}
      <Points positions={membraneParticles} stride={3}>
        <pointsMaterial size={0.05} color="#00ff00" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </Points>

      {/* Compartments */}
      {COMPARTMENTS.map((compartment, index) => (
        <group key={index} position={compartment.position as [number, number, number]}>
          {/* Compartment sphere */}
          <mesh>
            <sphereGeometry args={[compartment.radius, 32, 32]} />
            <meshPhongMaterial color={compartment.color} transparent opacity={0.5} depthWrite={false} />
          </mesh>

          {/* Compartment label */}
          <Text
            position={[0, compartment.radius + 0.3, 0]}
            fontSize={0.3}
            color="#00ff00"
            anchorX="center"
            anchorY="bottom"
          >
            {compartment.name}
          </Text>

          {/* Protein particles if sequence matches this compartment */}
          <Points
            positions={
              new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * compartment.radius * 1.5))
            }
            stride={3}
          >
            <pointsMaterial
              size={0.02}
              color={compartment.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </Points>
        </group>
      ))}
    </group>
  )
}

