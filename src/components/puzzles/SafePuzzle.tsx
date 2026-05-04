import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { PUZZLES } from '../../config/puzzles'

export function SafePuzzle() {
  const [digits, setDigits] = useState(['0', '0', '0', '0'])
  const [activeDigit, setActiveDigit] = useState(0)
  const [error, setError] = useState(false)
  const { solvePuzzle, setActivePuzzle, isPuzzleSolved } = useGameStore()

  const puzzle = PUZZLES.safe
  const solved = isPuzzleSolved('safe')

  const handleIncrement = (index: number) => {
    if (solved) return
    setError(false)
    const newDigits = [...digits]
    const current = parseInt(newDigits[index])
    newDigits[index] = ((current + 1) % 10).toString()
    setDigits(newDigits)
  }

  const handleDecrement = (index: number) => {
    if (solved) return
    setError(false)
    const newDigits = [...digits]
    const current = parseInt(newDigits[index])
    newDigits[index] = ((current - 1 + 10) % 10).toString()
    setDigits(newDigits)
  }

  const handleSubmit = () => {
    const code = digits.join('')
    if (code === puzzle.solution) {
      solvePuzzle('safe')
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
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
        className="relative bg-dark-800/95 border border-neon-pink/30 rounded-xl p-6 max-w-xs w-full mx-4"
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

        <h3 className="font-display text-lg text-neon-pink mb-2">WALL SAFE</h3>
        <p className="font-mono text-xs text-gray-400 mb-6">
          Set the 4-digit combination
        </p>

        {solved ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔓</div>
            <p className="font-mono text-neon-green text-sm">SAFE OPENED</p>
          </div>
        ) : (
          <>
            {/* Digit wheels */}
            <div className="flex justify-center gap-3 mb-6">
              {digits.map((digit, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <button
                    onClick={() => handleIncrement(idx)}
                    className="w-12 h-8 flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    ▲
                  </button>
                  <div
                    className={`w-12 h-14 flex items-center justify-center rounded-lg border-2 font-mono text-2xl font-bold cursor-pointer ${
                      activeDigit === idx
                        ? 'border-neon-pink text-neon-pink bg-neon-pink/10'
                        : 'border-gray-600 text-gray-200 bg-dark-700'
                    } ${error ? 'border-red-500 text-red-400' : ''}`}
                    onClick={() => setActiveDigit(idx)}
                  >
                    {digit}
                  </div>
                  <button
                    onClick={() => handleDecrement(idx)}
                    className="w-12 h-8 flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    ▼
                  </button>
                </div>
              ))}
            </div>

            {error && (
              <motion.p
                className="text-neon-pink font-mono text-xs text-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                WRONG COMBINATION
              </motion.p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-neon-pink/10 border border-neon-pink/50 text-neon-pink rounded-lg font-display tracking-wider hover:bg-neon-pink/20 transition-colors"
            >
              UNLOCK
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
