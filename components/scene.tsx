"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Float } from "@react-three/drei"
import { Suspense, useMemo, useEffect } from "react"
import Terminal3D from "./terminal-3d"
import Particles from "./particles"
import * as THREE from "three"

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
      context.fillStyle = "#00ff00"
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

export default function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ff00" />
          <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#00ff00" />

          {/* Main Content */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Terminal3D />
          </Float>

          {/* Background Effects */}
          <Particles count={500} />

          {/* Title */}
          <TextSprite text="ProtGPS Analysis Terminal" position={[0, 2.5, 0]} scale={1.2} />

          {/* Environment and Controls */}
          <Environment preset="night" />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />

          {/* Grid Helper */}
          <gridHelper args={[30, 30, "#00ff00", "#003300"]} position={[0, -3, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="text-green-500 text-xl font-mono terminal-glow">Initializing ProtGPS Environment...</div>
      </div>
    </div>
  )
}
