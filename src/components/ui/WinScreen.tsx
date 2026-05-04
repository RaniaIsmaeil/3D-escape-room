import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

export function WinScreen() {
  const { elapsedTime, hintsUsed, solvedPuzzles, setBestTime, resetGame, setPhase } =
    useGameStore()

  // Save best time on mount
  setBestTime(elapsedTime)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Rating based on performance
  const getRating = () => {
    if (hintsUsed === 0 && elapsedTime < 300) return { stars: '⭐⭐⭐', label: 'MASTER ESCAPIST' }
    if (hintsUsed <= 1 && elapsedTime < 600) return { stars: '⭐⭐', label: 'SKILLED' }
    return { stars: '⭐', label: 'ESCAPED' }
  }

  const rating = getRating()

  const handlePlayAgain = () => {
    resetGame()
    setPhase('start')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Celebration effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-green/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neon-cyan/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-md mx-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 10 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple mb-4">
            ESCAPED!
          </h1>
        </motion.div>

        {/* Rating */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-4xl mb-2">{rating.stars}</div>
          <div className="font-display text-lg text-neon-cyan tracking-wider">
            {rating.label}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-dark-800/80 border border-neon-cyan/20 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-mono text-2xl text-neon-cyan font-bold">
                {formatTime(elapsedTime)}
              </div>
              <div className="font-mono text-xs text-gray-500 mt-1">TIME</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-neon-purple font-bold">
                {solvedPuzzles.length}
              </div>
              <div className="font-mono text-xs text-gray-500 mt-1">PUZZLES</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-neon-pink font-bold">
                {hintsUsed}
              </div>
              <div className="font-mono text-xs text-gray-500 mt-1">HINTS</div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-neon-cyan/10 border-2 border-neon-cyan text-neon-cyan font-display tracking-wider rounded-lg hover:bg-neon-cyan/20 transition-colors"
          >
            PLAY AGAIN
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
