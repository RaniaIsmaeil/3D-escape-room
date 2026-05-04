import { Puzzle } from '../types'

export const PUZZLES: Record<string, Puzzle> = {
  keypad: {
    id: 'keypad',
    name: 'Door Keypad',
    type: 'keypad',
    solution: '7391',
    hint: 'The torn note mentions stars aligning...',
    isSolved: false,
    reward: 'door-unlock',
    description: 'A numeric keypad on the main door. Enter the correct 4-digit code.',
  },
  pattern: {
    id: 'pattern',
    name: 'Color Sequence',
    type: 'pattern',
    solution: ['red', 'blue', 'green', 'yellow'],
    hint: 'Check the clock. Four colored dots go clockwise: top, right, bottom, left.',
    isSolved: false,
    reward: 'battery',
    description: 'Press the colored buttons in the correct sequence to open the panel.',
  },
  safe: {
    id: 'safe',
    name: 'Safe Combination',
    type: 'combination',
    solution: '4217',
    hint: 'The code fragments are scattered around the room.',
    isSolved: false,
    reward: 'keycard',
    description: 'A digital safe with a 4-digit combination lock.',
  },
  bookshelf: {
    id: 'bookshelf',
    name: 'Book Order',
    type: 'bookshelf',
    solution: ['teal', 'crimson', 'orange', 'silver', 'purple'],
    hint: 'Look at the bottom of the painting frame. Five colored dots show the order.',
    isSolved: false,
    reward: 'note1',
    description: 'Arrange the books in the correct order to reveal a secret compartment.',
  },
}

export const TOTAL_CLUES = 5
export const TOTAL_PUZZLES = 4
export const MAX_HINTS = 3
