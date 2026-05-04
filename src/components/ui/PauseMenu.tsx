import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

export function PauseMenu() {
  const { setPhase, resetGame, elapsedTime, bestTime } = useGameStore()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleResume = () => setPhase('playing')

  const handleRestart = () => {
    resetGame()
    setPhase('start')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        className="relative bg-dark-800/95 border border-neon-purple/30 rounded-xl p-8 max-w-sm w-full mx-4 text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h2 className="font-display text-3xl text-neon-purple mb-6">PAUSED</h2>

        <div className="font-mono text-sm text-gray-400 mb-6">
          <p>Time: {formatTime(elapsedTime)}</p>
          {bestTime && <p className="mt-1">Best: {formatTime(bestTime)}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleResume}
            className="w-full py-3 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg font-display tracking-wider hover:bg-neon-cyan/20 transition-colors"
          >
            RESUME
          </button>
          <button
            onClick={handleRestart}
            className="w-full py-3 bg-neon-pink/10 border border-neon-pink/50 text-neon-pink rounded-lg font-display tracking-wider hover:bg-neon-pink/20 transition-colors"
          >
            RESTART
          </button>
          <button
            onClick={() => setPhase('start')}
            className="w-full py-2 text-gray-500 font-mono text-sm hover:text-gray-300 transition-colors"
          >
            Main Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
