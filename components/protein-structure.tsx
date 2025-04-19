"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ProteinStructureProps {
  color: string
  secondaryColor?: string
}

export function ProteinStructure({ color, secondaryColor = "#00ffff" }: ProteinStructureProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Create a more complex helix structure
  const createHelix = (startPoint: THREE.Vector3, endPoint: THREE.Vector3, radius: number, turns: number) => {
    const points = []
    const segments = turns * 32

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = 2 * Math.PI * turns * t
      const x = THREE.MathUtils.lerp(startPoint.x, endPoint.x, t) + radius * Math.cos(angle)
      const y = THREE.MathUtils.lerp(startPoint.y, endPoint.y, t) + radius * Math.sin(angle)
      const z = THREE.MathUtils.lerp(startPoint.z, endPoint.z, t)
      points.push(new THREE.Vector3(x, y, z))
    }

    return points
  }

  // Create multiple connected helices
  const proteinStructures = useMemo(() => {
    const structures = []
    const helixCount = 6
    const radius = 0.3

    for (let i = 0; i < helixCount; i++) {
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      )
      const endPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      )

      const points = createHelix(startPoint, endPoint, radius, 3)
      const curve = new THREE.CatmullRomCurve3(points)
      structures.push({
        curve,
        color: i < helixCount / 2 ? color : secondaryColor,
      })

      // Add connecting loops between helices
      if (i > 0) {
        const prevEndPoint = structures[i - 1].curve.getPoint(1)
        const currentStartPoint = curve.getPoint(0)
        const connectorPoints = [
          prevEndPoint,
          new THREE.Vector3(
            (prevEndPoint.x + currentStartPoint.x) / 2,
            (prevEndPoint.y + currentStartPoint.y) / 2,
            (prevEndPoint.z + currentStartPoint.z) / 2,
          ),
          currentStartPoint,
        ]
        const connectorCurve = new THREE.CatmullRomCurve3(connectorPoints)
        structures.push({
          curve: connectorCurve,
          color: i < helixCount / 2 ? color : secondaryColor,
          isConnector: true,
        })
      }
    }

    return structures
  }, [color, secondaryColor]) // Removed createHelix from dependencies

  // Animate the structure
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={[1, 1, 1]}>
      {proteinStructures.map((structure, index) => (
        <mesh key={index}>
          <tubeGeometry
            args={[
              structure.curve,
              64, // tubular segments
              structure.isConnector ? 0.05 : 0.1, // radius
              8, // radial segments
              false, // closed
            ]}
          />
          <meshPhongMaterial
            color={structure.color}
            emissive={structure.color}
            emissiveIntensity={0.5}
            shininess={100}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
