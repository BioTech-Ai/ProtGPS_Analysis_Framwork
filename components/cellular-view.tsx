"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three" // Import THREE

interface CellularViewProps {
  sequence: string
}

// Custom text renderer using CanvasTexture
function TextSprite({
  text,
  position,
  scale = 1,
}: {
  text: string
  position: [number, number, number]
  scale?: number
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 128
    const context = canvas.getContext("2d")
    if (context) {
      context.fillStyle = "#F0B90B"
      context.font = "bold 48px Inter"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillText(text, canvas.width / 2, canvas.height / 2)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [text])

  // Cleanup texture when component unmounts
  useEffect(() => {
    return () => {
      texture.dispose()
    }
  }, [texture])

  return (
    <sprite position={position} scale={[8 * scale, 2 * scale, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.9} />
    </sprite>
  )
}

function CellModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <group ref={groupRef}>
      {/* Cell membrane */}
      <Sphere args={[3, 32, 32]}>
        <meshPhongMaterial color="#F0B90B" transparent opacity={0.1} wireframe />
      </Sphere>

      {/* Nucleus */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#F0B90B" distort={0.3} speed={1.5} opacity={0.5} transparent />
      </Sphere>

      {/* Labels */}
      <TextSprite text="Nucleus" position={[0, 1.5, 0]} scale={0.8} />
      <TextSprite text="Cell Membrane" position={[0, -2, 0]} scale={0.8} />
    </group>
  )
}

export default function CellularView({ sequence }: CellularViewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CellModel />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
