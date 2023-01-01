"use client"

import { Html } from "@react-three/drei"
import { useRef } from "react"
import { type Mesh, DoubleSide } from "three"
import ProteinTerminal from "./protein-terminal"

export default function Terminal3D() {
  const meshRef = useRef<Mesh>(null)

  return (
    <group position={[0, 0, 0]}>
      {/* Terminal Background */}
      <mesh ref={meshRef}>
        <boxGeometry args={[6, 4, 0.1]} />
        <meshPhongMaterial
          color="#000000"
          emissive="#001100"
          specular="#00ff00"
          shininess={100}
          transparent
          opacity={0.9}
          side={DoubleSide}
        />
      </mesh>

      {/* Terminal Content */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.06]}
        style={{
          width: "1200px",
          height: "800px",
          transform: "scale(0.5)",
          transformOrigin: "center center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <ProteinTerminal />
        </div>
      </Html>

      {/* Glow Effect */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[6.2, 4.2]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.1} side={DoubleSide} />
      </mesh>
    </group>
  )
}

