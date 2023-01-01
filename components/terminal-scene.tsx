"use client"

import { Html } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import ProteinTerminal from "./protein-terminal"

export default function TerminalScene() {
  const { gl } = useThree()

  useEffect(() => {
    if (gl.domElement) {
      // Prevent canvas events from interfering with terminal
      const handler = (e: Event) => {
        e.stopPropagation()
      }
      gl.domElement.addEventListener("pointerdown", handler)
      gl.domElement.addEventListener("pointerup", handler)
      gl.domElement.addEventListener("click", handler)

      return () => {
        gl.domElement.removeEventListener("pointerdown", handler)
        gl.domElement.removeEventListener("pointerup", handler)
        gl.domElement.removeEventListener("click", handler)
      }
    }
  }, [gl])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00ff00" />

      {/* Terminal Background */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[16, 4]} />
        <meshPhongMaterial
          color="#000000"
          emissive="#001100"
          specular="#00ff00"
          shininess={100}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Terminal Content */}
      <Html
        transform
        position={[0, 0, 0.1]}
        style={{
          width: "1200px",
          height: "300px",
        }}
        prepend
        zIndexRange={[100, 0]}
      >
        <div className="w-full h-full flex items-center justify-center">
          <ProteinTerminal />
        </div>
      </Html>
    </>
  )
}

