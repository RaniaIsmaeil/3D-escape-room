import { useEffect, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from './stores/gameStore'
import { GameScene } from './components/scene/GameScene'
import { StartScreen } from './components/ui/StartScreen'
import { HUD } from './components/ui/HUD'
import { Inventory } from './components/ui/Inventory'
import { InspectModal } from './components/ui/InspectModal'
import { PuzzleModal } from './components/puzzles/PuzzleModal'
import { ToastContainer } from './components/ui/Toast'
import { PauseMenu } from './components/ui/PauseMenu'
import { WinScreen } from './components/ui/WinScreen'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { QuestChecklist } from './components/ui/QuestChecklist'
import { useGameTimer, useKeyboardShortcuts } from './hooks/useGameHooks'

function App() {
  const { phase, doorFullyUnlocked, setPhase, stopTimer } = useGameStore()
  const [loading, setLoading] = useState(true)

  // Hooks
  useGameTimer()
  useKeyboardShortcuts()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Check win condition
  useEffect(() => {
    if (doorFullyUnlocked && phase === 'playing') {
      stopTimer()
      setPhase('won')
    }
  }, [doorFullyUnlocked, phase, stopTimer, setPhase])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-dark-900">
      {/* 3D Scene - always rendered when playing */}
      {(phase === 'playing' || phase === 'paused') && (
        <Suspense fallback={<LoadingScreen />}>
          <GameScene />
        </Suspense>
      )}

      {/* UI Layers */}
      <AnimatePresence mode="wait">
        {phase === 'start' && <StartScreen key="start" />}
        {phase === 'won' && <WinScreen key="win" />}
      </AnimatePresence>

      {/* In-game UI */}
      {phase === 'playing' && (
        <>
          <HUD />
          <Inventory />
          <QuestChecklist />
          <InspectModal />
          <PuzzleModal />
        </>
      )}

      {/* Pause overlay */}
      <AnimatePresence>
        {phase === 'paused' && <PauseMenu />}
      </AnimatePresence>

      {/* Toast notifications - always visible */}
      <ToastContainer />
    </div>
  )
}

export default App
