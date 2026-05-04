import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { Html } from '@react-three/drei'
import { useGameStore } from '../../stores/gameStore'

interface InteractiveObjectProps {
  id: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  children: React.ReactNode
  name: string
  tooltipText?: string
}

export function InteractiveObject({
  id,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  children,
  name,
  tooltipText,
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const { setActiveObject, discoverObject, phase, canInteract, addToast, zoomToObject, isZooming } = useGameStore()

  const isAccessible = canInteract(id)

  useFrame((_, delta) => {
    // Glow animation on hover
    if (hovered && isAccessible) {
      setGlowIntensity((prev) => Math.min(prev + delta * 4, 1))
    } else {
      setGlowIntensity((prev) => Math.max(prev - delta * 4, 0))
    }

    // Apply emissive glow
    if (meshRef.current) {
      const material = meshRef.current.material as MeshStandardMaterial
      if (material.emissive) {
        material.emissiveIntensity = glowIntensity * 0.5
      }
    }
  })

  const handleClick = () => {
    if (phase !== 'playing') return
    if (isZooming) return
    if (!isAccessible) {
      addToast('Complete your current objective first! Check the quest log.', 'warning')
      return
    }
    // Trigger camera zoom, then the CameraController will open the modal
    zoomToObject(id, position)
  }

  const handlePointerOver = () => {
    if (phase !== 'playing') return
    setHovered(true)
    document.body.style.cursor = isAccessible ? 'pointer' : 'not-allowed'
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {children}
      </mesh>
      {hovered && tooltipText && (
        <Html center position={[0, 1.5, 0]} distanceFactor={8}>
          <div className={`bg-dark-800/95 border-2 ${isAccessible ? 'border-neon-cyan/60' : 'border-red-500/60'} text-white px-4 py-2 rounded-lg text-sm font-mono whitespace-nowrap pointer-events-none backdrop-blur-md shadow-[0_0_15px_rgba(0,245,255,0.2)]`}>
            {isAccessible ? (tooltipText || name) : '🚫 Not yet! Complete your current step first'}
          </div>
        </Html>
      )}
    </group>
  )
}
