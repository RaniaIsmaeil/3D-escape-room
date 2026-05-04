import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { PUZZLES } from '../../config/puzzles'

export function KeypadPuzzle() {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const { solvePuzzle, setActivePuzzle, isPuzzleSolved } = useGameStore()

  const puzzle = PUZZLES.keypad
  const solved = isPuzzleSolved('keypad')

  const handlePress = (digit: string) => {
    if (solved) return
    if (code.length >= 4) return
    setError(false)
    const newCode = code + digit
    setCode(newCode)

    if (newCode.length === 4) {
      if (newCode === puzzle.solution) {
        solvePuzzle('keypad')
      } else {
        setError(true)
        setTimeout(() => {
          setCode('')
          setError(false)
        }, 1000)
      }
    }
  }

  const handleClear = () => {
    setCode('')
    setError(false)
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
        className="relative bg-dark-800/95 border border-neon-cyan/30 rounded-xl p-6 max-w-xs w-full mx-4"
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

        <h3 className="font-display text-lg text-neon-cyan mb-4">DOOR KEYPAD</h3>

        {solved ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔓</div>
            <p className="font-mono text-neon-green text-sm">ACCESS GRANTED</p>
          </div>
        ) : (
          <>
            {/* Display */}
            <div
              className={`bg-dark-900 border rounded-lg p-3 mb-4 text-center font-mono text-2xl tracking-[0.5em] ${
                error ? 'border-neon-pink text-neon-pink' : 'border-neon-cyan/30 text-neon-cyan'
              }`}
            >
              {code.padEnd(4, '·')}
            </div>

            {error && (
              <motion.p
                className="text-neon-pink font-mono text-xs text-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ACCESS DENIED
              </motion.p>
            )}

            {/* Keypad grid */}
            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map(
                (key) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === 'C') handleClear()
                      else if (key === '←') setCode(code.slice(0, -1))
                      else handlePress(key)
                    }}
                    className={`py-3 rounded-lg font-mono text-lg transition-all ${
                      key === 'C'
                        ? 'bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20'
                        : 'bg-dark-700 border border-gray-700 text-gray-200 hover:bg-dark-600 hover:border-neon-cyan/30 active:scale-95'
                    }`}
                  >
                    {key}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
