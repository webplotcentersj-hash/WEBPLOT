"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Starfield(props: any) {
  const ref = useRef<THREE.Points>(null!)
  const sphere = useMemo(() => {
    const arr = new Float32Array(5000 * 3)
    // fill array with points in a sphere of radius 15
    for (let i = 0; i < 5000 * 3; i += 3) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 15 * Math.cbrt(Math.random())
      arr[i] = r * Math.sin(phi) * Math.cos(theta)
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#eb671b"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 1
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.15) * 1
    }
  })

  return (
    <group ref={meshRef}>
      <mesh position={[-2, 1, -15]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#eb671b" transparent opacity={0.03} />
      </mesh>
      <mesh position={[4, -2, -12]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>
    </group>
  )
}

export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Starfield />
        <AmbientGlow />
      </Canvas>
    </div>
  )
}
