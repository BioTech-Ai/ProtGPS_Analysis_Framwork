"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import CellModel from "./cell-model"

interface CellularViewProps {
  sequence: string
}

export default function CellularView({ sequence }: CellularViewProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ff00" />

        <Suspense fallback={null}>
          <CellModel sequence={sequence} />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

