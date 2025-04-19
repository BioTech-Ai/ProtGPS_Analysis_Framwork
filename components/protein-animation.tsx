"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D } from "@react-three/drei"
import * as THREE from "three"

interface ProteinAnimationProps {
  result: {
    location: string
    confidence: string
  }
}

function ProteinStructure({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  // Create helix points
  const points = []
  const turns = 2
  const pointsPerTurn = 30
  const radius = 0.3
  const height = 3

  for (let i = 0; i < turns * pointsPerTurn; i++) {
    const t = i / (turns * pointsPerTurn)
    const angle = 2 * Math.PI * turns * t
    const x = radius * Math.cos(angle)
    const y = height * (t - 0.5)
    const z = radius * Math.sin(angle)
    points.push(new THREE.Vector3(x, y, z))
  }

  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeometry = new THREE.TubeGeometry(curve, 70, 0.1, 8, false)

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1}>
      <group ref={groupRef}>
        <mesh geometry={tubeGeometry}>
          <meshPhongMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
            shininess={150}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function ProteinAnimation({ result }: ProteinAnimationProps) {
  // Define colors based on confidence
  const getColor = () => {
    switch (result.confidence.toLowerCase()) {
      case "high":
        return "#22c55e" // Green for high confidence
      case "medium":
        return "#F0B90B" // Yellow for medium confidence
      case "low":
        return "#ef4444" // Red for low confidence
      default:
        return "#F0B90B"
    }
  }

  return (
    <div className="w-full h-[200px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={1} />

        <group position={[0, 0, 0]}>
          <ProteinStructure color={getColor()} />

          <Text3D font="/fonts/Inter_Bold.json" size={0.3} height={0.1} position={[-2, 1, 0]}>
            {result.location}
            <meshPhongMaterial color={getColor()} emissive={getColor()} emissiveIntensity={0.5} />
          </Text3D>
        </group>
      </Canvas>
    </div>
  )
}
