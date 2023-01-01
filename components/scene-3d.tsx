"use client"

import { Float, Text } from "@react-three/drei"
import MoleculeViewer from "./molecule-viewer"

interface Scene3DProps {
  formula: string
}

export default function Scene3D({ formula }: Scene3DProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00ff00" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <MoleculeViewer formula={formula} />
      </Float>
      {formula && (
        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          {formula}
        </Text>
      )}
    </>
  )
}

