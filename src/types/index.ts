// Game types for the Escape Room

export type GamePhase = 'loading' | 'start' | 'playing' | 'paused' | 'won'

export interface InventoryItem {
  id: string
  name: string
  description: string
  icon: string // emoji or icon identifier
  usableOn?: string[] // object IDs this item can be used on
  combinableWith?: string[] // item IDs this can combine with
  combinationResult?: string // resulting item ID when combined
}

export interface RoomObject {
  id: string
  name: string
  description: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  isInteractable: boolean
  isLocked: boolean
  requiredItem?: string // item ID needed to unlock
  containsItem?: string // item ID found after interaction
  puzzleId?: string // associated puzzle
  inspectText?: string
  isDiscovered: boolean
}

export interface Puzzle {
  id: string
  name: string
  type: 'keypad' | 'pattern' | 'combination' | 'bookshelf' | 'note'
  solution: string | string[]
  hint: string
  isSolved: boolean
  reward?: string // item ID or action
  description: string
}

export interface GameProgress {
  cluesFound: number
  totalClues: number
  puzzlesSolved: number
  totalPuzzles: number
  itemsCollected: number
  hintsUsed: number
  maxHints: number
}

export interface Toast {
  id: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export interface SaveData {
  inventory: string[]
  solvedPuzzles: string[]
  discoveredObjects: string[]
  unlockedObjects: string[]
  elapsedTime: number
  hintsUsed: number
  timestamp: number
}

export interface LeaderboardEntry {
  name: string
  time: number
  hintsUsed: number
  date: string
}
