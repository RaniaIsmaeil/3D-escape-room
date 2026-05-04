import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { PUZZLES } from '../../config/puzzles'

const BOOKS = [
  { id: 'purple', color: '#9b59b6', label: 'Purple' },
  { id: 'orange', color: '#e67e22', label: 'Orange' },
  { id: 'teal', color: '#1abc9c', label: 'Teal' },
  { id: 'silver', color: '#bdc3c7', label: 'Silver' },
  { id: 'crimson', color: '#e74c3c', label: 'Crimson' },
]

export function BookshelfPuzzle() {
  const [arrangement, setArrangement] = useState<string[]>([])
  const [error, setError] = useState(false)
  const { solvePuzzle, setActivePuzzle, isPuzzleSolved } = useGameStore()

  const puzzle = PUZZLES.bookshelf
  const solved = isPuzzleSolved('bookshelf')
  const solution = puzzle.solution as string[]

  const availableBooks = BOOKS.filter((b) => !arrangement.includes(b.id))

  const handleBookClick = (bookId: string) => {
    if (solved) return
    setError(false)

    const newArrangement = [...arrangement, bookId]
    setArrangement(newArrangement)

    // Check if complete
    if (newArrangement.length === solution.length) {
      const isCorrect = newArrangement.every((id, idx) => id === solution[idx])
      if (isCorrect) {
        solvePuzzle('bookshelf')
      } else {
        setError(true)
        setTimeout(() => {
          setArrangement([])
          setError(false)
        }, 1200)
      }
    }
  }

  const handleRemoveLast = () => {
    setArrangement(arrangement.slice(0, -1))
    setError(false)
  }

  const handleReset = () => {
    setArrangement([])
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
        className="relative bg-dark-800/95 border border-neon-green/30 rounded-xl p-6 max-w-sm w-full mx-4"
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

        <h3 className="font-display text-lg text-neon-green mb-2">BOOKSHELF ORDER</h3>
        <p className="font-mono text-xs text-gray-400 mb-4">
          Place the books in order. Look at the painting for a clue.
        </p>

        {solved ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📖</div>
            <p className="font-mono text-neon-green text-sm">SECRET COMPARTMENT REVEALED</p>
          </div>
        ) : (
          <>
            {/* Current arrangement (shelf slots) */}
            <div className="flex gap-2 mb-4 justify-center">
              {Array.from({ length: 5 }).map((_, idx) => {
                const bookId = arrangement[idx]
                const book = BOOKS.find((b) => b.id === bookId)
                return (
                  <div
                    key={idx}
                    className={`w-10 h-16 rounded border-2 flex items-center justify-center transition-all ${
                      book
                        ? 'border-opacity-80'
                        : 'border-gray-700 border-dashed'
                    } ${error ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: book ? `${book.color}33` : 'transparent',
                      borderColor: book ? book.color : undefined,
                    }}
                  >
                    {book && (
                      <span className="text-[10px] font-mono text-white/70 writing-vertical">
                        {book.label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {error && (
              <motion.p
                className="text-neon-pink font-mono text-xs text-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                WRONG ORDER
              </motion.p>
            )}

            {/* Available books */}
            <p className="font-mono text-xs text-gray-500 mb-2">Available books:</p>
            <div className="flex gap-2 flex-wrap justify-center mb-4">
              {availableBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  className="w-12 h-16 rounded border-2 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: `${book.color}22`,
                    borderColor: `${book.color}88`,
                  }}
                >
                  <span className="text-[10px] font-mono text-white/80">
                    {book.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={handleRemoveLast}
                disabled={arrangement.length === 0}
                className="flex-1 py-2 bg-dark-700 border border-gray-700 text-gray-400 rounded-lg font-mono text-xs hover:bg-dark-600 disabled:opacity-30 transition-all"
              >
                Undo
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-dark-700 border border-gray-700 text-gray-400 rounded-lg font-mono text-xs hover:bg-dark-600 transition-all"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
