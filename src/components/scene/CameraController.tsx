import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useGameStore } from '../../stores/gameStore'

const DEFAULT_POSITION = new Vector3(0, 2.5, 3)
const DEFAULT_TARGET = new Vector3(0, 1.5, 0)
const ZOOM_SPEED = 2.5
const ZOOM_DISTANCE = 2

export function CameraController() {
  const { camera } = useThree()
  const progress = useRef(0)
  const startPos = useRef(new Vector3())
  const targetPos = useRef(new Vector3())
  const phase = useRef<'idle' | 'zooming-in' | 'zooming-out'>('idle')
  const lookAtTarget = useRef(new Vector3())

  useFrame((_, delta) => {
    const store = useGameStore.getState()

    // Start zoom-in when zoomTarget is set and we're idle
    if (store.isZooming && store.zoomTarget && phase.current === 'idle') {
      phase.current = 'zooming-in'
      progress.current = 0
      startPos.current.copy(camera.position)

      const objPos = new Vector3(store.zoomTarget[0], store.zoomTarget[1], store.zoomTarget[2])
      lookAtTarget.current.copy(objPos)

      // Position camera between current position and object
      const dir = new Vector3().subVectors(camera.position, objPos).normalize()
      targetPos.current.copy(objPos).add(dir.multiplyScalar(ZOOM_DISTANCE))
      targetPos.current.y = Math.max(targetPos.current.y, 0.8)
    }

    // Animate zoom-in
    if (phase.current === 'zooming-in') {
      progress.current = Math.min(progress.current + delta * ZOOM_SPEED, 1)
      const t = easeInOutCubic(progress.current)

      camera.position.lerpVectors(startPos.current, targetPos.current, t)
      camera.lookAt(lookAtTarget.current)

      if (progress.current >= 1) {
        // Zoom complete - open the modal
        if (store.pendingObjectId) {
          store.discoverObject(store.pendingObjectId)
          store.setActiveObject(store.pendingObjectId)
          store.setPendingObjectId(null)
        }
        phase.current = 'idle'
      }
    }

    // Start zoom-out when modal closes
    if (!store.activeObject && !store.activePuzzle && store.zoomTarget && phase.current === 'idle' && !store.pendingObjectId) {
      phase.current = 'zooming-out'
      progress.current = 0
      startPos.current.copy(camera.position)
      targetPos.current.copy(DEFAULT_POSITION)
    }

    // Animate zoom-out
    if (phase.current === 'zooming-out') {
      progress.current = Math.min(progress.current + delta * ZOOM_SPEED, 1)
      const t = easeInOutCubic(progress.current)

      camera.position.lerpVectors(startPos.current, targetPos.current, t)

      const currentLookAt = new Vector3().lerpVectors(lookAtTarget.current, DEFAULT_TARGET, t)
      camera.lookAt(currentLookAt)

      if (progress.current >= 1) {
        phase.current = 'idle'
        store.setIsZooming(false)
        store.setZoomTarget(null)
      }
    }
  })

  return null
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
