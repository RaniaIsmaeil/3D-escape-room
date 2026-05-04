import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { TOTAL_CLUES, TOTAL_PUZZLES, MAX_HINTS } from '../../config/puzzles'

export function HUD() {
  const {
    elapsedTime,
    cluesFound,
    solvedPuzzles,
    hintsUsed,
    useHint,
    setPhase,
  } = useGameStore()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex justify-between items-start p-2 sm:p-4">
        {/* Left: Timer + Progress */}
        <motion.div
          className="pointer-events-auto"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-dark-800/80 backdrop-blur-md border border-neon-cyan/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
            <div className="font-mono text-neon-cyan text-base sm:text-lg font-bold">
              {formatTime(elapsedTime)}
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-gray-400 mt-1">
              Clues: {cluesFound}/{TOTAL_CLUES}
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-gray-400">
              Puzzles: {solvedPuzzles.length}/{TOTAL_PUZZLES}
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-24 sm:w-32 h-1 bg-dark-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                animate={{ width: `${(solvedPuzzles.length / TOTAL_PUZZLES) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Hint + Pause only */}
        <motion.div
          className="pointer-events-auto flex gap-2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Hint button */}
          <button
            onClick={useHint}
            className="bg-dark-800/80 backdrop-blur-md border border-neon-purple/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-neon-purple hover:bg-neon-purple/10 transition-colors"
            title={`Hints: ${MAX_HINTS - hintsUsed} remaining`}
          >
            <span className="text-base sm:text-lg">💡</span>
            <span className="font-mono text-[10px] sm:text-xs ml-1">{MAX_HINTS - hintsUsed}</span>
          </button>

          {/* Pause */}
          <button
            onClick={() => setPhase('paused')}
            className="bg-dark-800/80 backdrop-blur-md border border-gray-700/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-base sm:text-lg">⏸️</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
