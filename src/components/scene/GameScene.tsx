import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { Room } from './Room'
import { CameraController } from './CameraController'
import { useGameStore } from '../../stores/gameStore'

function SceneContent() {
  const isZooming = useGameStore((s) => s.isZooming)

  return (
    <>
      <color attach="background" args={['#2a2a45']} />
      <fog attach="fog" args={['#2a2a45', 12, 20]} />
      <Room />
      <Environment preset="apartment" />
      <CameraController />
      <OrbitControls
        enabled={!isZooming}
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 1.5, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export function GameScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 3], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
