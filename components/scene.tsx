"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Float, Text, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import Terminal3D from "./terminal-3d"
import Particles from "./particles"

export default function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
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
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color="#00ff00"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter_Bold.json"
            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
          >
            ProtGPS Analysis Terminal
          </Text>

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

