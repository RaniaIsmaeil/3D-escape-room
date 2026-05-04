import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { PUZZLES } from '../../config/puzzles'

const COLORS = [
  { id: 'red', color: '#e74c3c', label: 'R' },
  { id: 'blue', color: '#3498db', label: 'B' },
  { id: 'green', color: '#2ecc71', label: 'G' },
  { id: 'yellow', color: '#f1c40f', label: 'Y' },
]

export function PatternPuzzle() {
  const [sequence, setSequence] = useState<string[]>([])
  const [error, setError] = useState(false)
  const [flash, setFlash] = useState<string | null>(null)
  const { solvePuzzle, setActivePuzzle, isPuzzleSolved } = useGameStore()

  const puzzle = PUZZLES.pattern
  const solved = isPuzzleSolved('pattern')
  const solution = puzzle.solution as string[]

  const handleColorPress = (colorId: string) => {
    if (solved) return
    setError(false)
    setFlash(colorId)
    setTimeout(() => setFlash(null), 200)

    const newSequence = [...sequence, colorId]
    setSequence(newSequence)

    // Check if current press matches
    const idx = newSequence.length - 1
    if (newSequence[idx] !== solution[idx]) {
      setError(true)
      setTimeout(() => {
        setSequence([])
        setError(false)
      }, 1000)
      return
    }

    // Check if complete
    if (newSequence.length === solution.length) {
      solvePuzzle('pattern')
    }
  }

  const handleClose = () => setActivePuzzle(null)

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      <motion.div
        className="relative bg-gradient-to-b from-dark-800 to-dark-900 border border-neon-purple/40 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-[0_0_60px_rgba(191,0,255,0.15)]"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* Header with decorative line */}
        <div className="text-center mb-5">
          <h3 className="font-display text-xl text-neon-purple mb-1">COLOR PANEL</h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent mx-auto mb-2" />
          <p className="font-mono text-[11px] text-gray-400">
            Tap the colors in the correct sequence
          </p>
        </div>

        {solved ? (
          <div className="text-center py-8">
            <motion.div
              className="text-5xl mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring' }}
            >
              ✓
            </motion.div>
            <p className="font-mono text-neon-green text-sm">PANEL OPENED</p>
          </div>
        ) : (
          <>
            {/* Sequence indicator - styled like LED slots */}
            <div className="flex justify-center gap-3 mb-5 p-3 bg-dark-900/80 rounded-xl border border-gray-700/30">
              {solution.map((_, idx) => {
                const filledColor = COLORS.find(c => c.id === sequence[idx])
                return (
                  <motion.div
                    key={idx}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      idx < sequence.length
                        ? error && idx === sequence.length - 1
                          ? 'border-neon-pink'
                          : 'border-transparent'
                        : 'border-gray-600/50 border-dashed'
                    }`}
                    style={{
                      backgroundColor: filledColor ? filledColor.color : 'rgba(30,30,50,0.8)',
                      boxShadow: filledColor ? `0 0 12px ${filledColor.color}, inset 0 0 6px ${filledColor.color}` : 'none',
                    }}
                    animate={filledColor ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.2 }}
                  />
                )
              })}
            </div>

            {error && (
              <motion.p
                className="text-neon-pink font-mono text-xs text-center mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
                transition={{ duration: 0.4 }}
              >
                ✗ WRONG SEQUENCE
              </motion.p>
            )}

            {/* Color buttons - Simon Says style */}
            <div className="relative p-5 bg-dark-900/60 rounded-2xl border border-gray-700/30">
              {/* Center decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-800 border-2 border-gray-600/50 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-dark-700 border border-gray-500/30" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {COLORS.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => handleColorPress(c.id)}
                    className="aspect-square rounded-2xl border-2 transition-colors relative overflow-hidden"
                    style={{
                      backgroundColor: flash === c.id ? c.color : `${c.color}30`,
                      borderColor: flash === c.id ? c.color : `${c.color}88`,
                      boxShadow: flash === c.id
                        ? `0 0 30px ${c.color}, 0 0 60px ${c.color}44, inset 0 0 20px ${c.color}`
                        : `0 0 10px ${c.color}22, inset 0 0 30px ${c.color}11`,
                    }}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${c.color}66` }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {/* Inner glow effect */}
                    <div
                      className="absolute inset-2 rounded-xl opacity-40"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${c.color}66 0%, transparent 70%)`,
                      }}
                    />
                    {/* Shine reflection */}
                    <div
                      className="absolute top-1 left-1 w-1/3 h-1/3 rounded-full opacity-30"
                      style={{ background: `radial-gradient(circle, white 0%, transparent 70%)` }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => setSequence([])}
              className="w-full mt-4 py-2.5 text-gray-500 font-mono text-xs hover:text-gray-300 border border-gray-700/30 rounded-lg hover:border-gray-600/50 transition-all"
            >
              ↺ Reset
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
