import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointLight } from 'three'

export function Lighting() {
  const pointLight1 = useRef<PointLight>(null)
  const pointLight2 = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    // Subtle light flickering for atmosphere
    if (pointLight1.current) {
      pointLight1.current.intensity = 0.8 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
    if (pointLight2.current) {
      pointLight2.current.intensity = 0.6 + Math.sin(clock.elapsedTime * 1.5 + 1) * 0.1
    }
  })

  return (
    <>
      {/* Main ambient light - bright and clear */}
      <ambientLight intensity={1.8} color="#eeeeff" />

      {/* Overhead light */}
      <pointLight
        ref={pointLight1}
        position={[0, 4.5, 0]}
        intensity={3}
        color="#ffffff"
        distance={16}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Secondary overhead */}
      <pointLight
        position={[0, 4, 2]}
        intensity={2}
        color="#ffffff"
        distance={12}
      />

      {/* Third overhead for even coverage */}
      <pointLight
        position={[0, 4, -2]}
        intensity={2}
        color="#ffffff"
        distance={12}
      />

      {/* Desk area light - accent */}
      <pointLight
        position={[3, 2.5, -2]}
        intensity={1.5}
        color="#88ffff"
        distance={6}
      />

      {/* Door area - neon glow */}
      <pointLight
        ref={pointLight2}
        position={[0, 2.5, -4.5]}
        intensity={1.5}
        color="#dd88ff"
        distance={7}
      />

      {/* Bookshelf area */}
      <pointLight
        position={[-4, 2.5, 0]}
        intensity={1.2}
        color="#88ff88"
        distance={6}
      />

      {/* Safe area */}
      <pointLight
        position={[4.5, 2, 1]}
        intensity={1.2}
        color="#ff88aa"
        distance={5}
      />

      {/* Floor fill lights */}
      <pointLight
        position={[-2, 1, -2]}
        intensity={0.8}
        color="#ffffff"
        distance={6}
      />
      <pointLight
        position={[2, 1, 2]}
        intensity={0.8}
        color="#ffffff"
        distance={6}
      />

      {/* Ceiling area light for uniform fill */}
      <rectAreaLight
        position={[0, 4.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={10}
        height={10}
        intensity={2}
        color="#ffffff"
      />
    </>
  )
}
