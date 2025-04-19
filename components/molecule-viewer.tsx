"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface MoleculeViewerProps {
  sequence?: string
  analysisData: AnalysisResult | null
}

function InfoText({ text, position }: { text: string; position: [number, number, number] }) {
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

  useEffect(() => {
    return () => {
      texture.dispose()
    }
  }, [texture])

  return (
    <sprite position={position} scale={[8, 2, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.9} />
    </sprite>
  )
}

function SimpleMolecule({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  // Create simple sphere geometry for atoms
  const geometry = useMemo(() => new THREE.SphereGeometry(0.5, 32, 32), [])

  // Create material
  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        shininess: 100,
      }),
    [color],
  )

  // Simple rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} />
      <mesh geometry={geometry} material={material} position={[1, 0, 0]} scale={0.5} />
      <mesh geometry={geometry} material={material} position={[-1, 0, 0]} scale={0.5} />
      <mesh geometry={geometry} material={material} position={[0, 1, 0]} scale={0.5} />
      <mesh geometry={geometry} material={material} position={[0, -1, 0]} scale={0.5} />
    </group>
  )
}

export default function MoleculeViewer({ sequence, analysisData }: MoleculeViewerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const color = useMemo(() => {
    return "#F0B90B" // Always use the Binance gold color
  }, [])

  if (!mounted) return null

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      <SimpleMolecule color={color} />

      {analysisData?.location && (
        <group position={[0, -3, 0]}>
          <InfoText text={analysisData.location} position={[0, 0, 0]} />
          <InfoText text={`Confidence: ${analysisData.confidence || "Unknown"}`} position={[0, -1, 0]} />
        </group>
      )}

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={5} maxDistance={20} />
    </>
  )
}
