import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { KeypadPuzzle } from './KeypadPuzzle'
import { PatternPuzzle } from './PatternPuzzle'
import { SafePuzzle } from './SafePuzzle'
import { BookshelfPuzzle } from './BookshelfPuzzle'

export function PuzzleModal() {
  const { activePuzzle } = useGameStore()

  return (
    <AnimatePresence>
      {activePuzzle === 'keypad' && <KeypadPuzzle />}
      {activePuzzle === 'pattern' && <PatternPuzzle />}
      {activePuzzle === 'safe' && <SafePuzzle />}
      {activePuzzle === 'bookshelf' && <BookshelfPuzzle />}
    </AnimatePresence>
  )
}
