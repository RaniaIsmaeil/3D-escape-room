import { create } from 'zustand'
import { GamePhase, InventoryItem, Toast, SaveData } from '../types'
import { ITEMS } from '../config/items'
import { PUZZLES, TOTAL_CLUES, TOTAL_PUZZLES, MAX_HINTS } from '../config/puzzles'
import { ROOM_OBJECTS } from '../config/rooms'

interface GameState {
  // Game phase
  phase: GamePhase
  setPhase: (phase: GamePhase) => void

  // Timer
  elapsedTime: number
  timerRunning: boolean
  startTimer: () => void
  stopTimer: () => void
  tick: () => void

  // Inventory
  inventory: InventoryItem[]
  addItem: (itemId: string) => void
  removeItem: (itemId: string) => void
  hasItem: (itemId: string) => boolean
  combineItems: (item1Id: string, item2Id: string) => boolean
  selectedItem: string | null
  setSelectedItem: (itemId: string | null) => void

  // Objects
  discoveredObjects: string[]
  unlockedObjects: string[]
  discoverObject: (objectId: string) => void
  unlockObject: (objectId: string) => void
  isObjectDiscovered: (objectId: string) => boolean
  isObjectUnlocked: (objectId: string) => boolean
  collectedItems: string[] // track which containsItem have been taken

  // Puzzles
  solvedPuzzles: string[]
  solvePuzzle: (puzzleId: string) => void
  isPuzzleSolved: (puzzleId: string) => boolean

  // Active interactions
  activeObject: string | null
  setActiveObject: (objectId: string | null) => void
  activePuzzle: string | null
  setActivePuzzle: (puzzleId: string | null) => void
  inspectingItem: string | null
  setInspectingItem: (itemId: string | null) => void

  // Progress
  cluesFound: number
  addClue: () => void
  hintsUsed: number
  useHint: () => string | null

  // Toasts
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void

  // Sound
  soundEnabled: boolean
  musicEnabled: boolean
  toggleSound: () => void
  toggleMusic: () => void

  // Save/Load
  saveGame: () => void
  loadGame: () => boolean
  hasSaveData: () => boolean

  // Leaderboard
  bestTime: number | null
  setBestTime: (time: number) => void

  // Reset
  resetGame: () => void

  // Door state - final escape
  doorFullyUnlocked: boolean
  checkDoorStatus: () => void

  // Progression gating
  getCurrentStep: () => number
  canInteract: (objectId: string) => boolean

  // Camera zoom
  zoomTarget: [number, number, number] | null
  isZooming: boolean
  pendingObjectId: string | null
  setZoomTarget: (target: [number, number, number] | null) => void
  setIsZooming: (zooming: boolean) => void
  setPendingObjectId: (id: string | null) => void
  zoomToObject: (objectId: string, position: [number, number, number]) => void
}

const getInitialState = () => ({
  phase: 'start' as GamePhase,
  elapsedTime: 0,
  timerRunning: false,
  inventory: [] as InventoryItem[],
  selectedItem: null as string | null,
  discoveredObjects: [] as string[],
  unlockedObjects: [] as string[],
  collectedItems: [] as string[],
  solvedPuzzles: [] as string[],
  activeObject: null as string | null,
  activePuzzle: null as string | null,
  inspectingItem: null as string | null,
  cluesFound: 0,
  hintsUsed: 0,
  toasts: [] as Toast[],
  soundEnabled: true,
  musicEnabled: true,
  doorFullyUnlocked: false,
  bestTime: null as number | null,
  zoomTarget: null as [number, number, number] | null,
  isZooming: false,
  pendingObjectId: null as string | null,
})

export const useGameStore = create<GameState>((set, get) => ({
  ...getInitialState(),

  // Load best time from localStorage on init
  bestTime: (() => {
    try {
      const saved = localStorage.getItem('escape-room-best-time')
      return saved ? parseInt(saved) : null
    } catch {
      return null
    }
  })(),

  setPhase: (phase) => set({ phase }),

  startTimer: () => set({ timerRunning: true }),
  stopTimer: () => set({ timerRunning: false }),
  tick: () => set((state) => ({ elapsedTime: state.elapsedTime + 1 })),

  addItem: (itemId) => {
    const item = ITEMS[itemId]
    if (!item) return
    const state = get()
    if (state.inventory.find((i) => i.id === itemId)) return
    set({
      inventory: [...state.inventory, item],
      collectedItems: [...state.collectedItems, itemId],
    })
    get().addToast(`Collected: ${item.name}`, 'success')
    get().addClue()
  },

  removeItem: (itemId) =>
    set((state) => ({
      inventory: state.inventory.filter((i) => i.id !== itemId),
    })),

  hasItem: (itemId) => get().inventory.some((i) => i.id === itemId),

  combineItems: (item1Id, item2Id) => {
    const item1 = ITEMS[item1Id]
    const item2 = ITEMS[item2Id]
    if (!item1 || !item2) return false

    if (item1.combinableWith?.includes(item2Id) && item1.combinationResult) {
      const state = get()
      const resultItem = ITEMS[item1.combinationResult]
      if (!resultItem) return false
      set({
        inventory: [
          ...state.inventory.filter(
            (i) => i.id !== item1Id && i.id !== item2Id
          ),
          resultItem,
        ],
        collectedItems: [...state.collectedItems, item1.combinationResult],
        selectedItem: null,
      })
      get().addToast(`Combined: ${resultItem.name}`, 'success')
      return true
    }
    return false
  },

  setSelectedItem: (itemId) => set({ selectedItem: itemId }),

  discoverObject: (objectId) =>
    set((state) => ({
      discoveredObjects: state.discoveredObjects.includes(objectId)
        ? state.discoveredObjects
        : [...state.discoveredObjects, objectId],
    })),

  unlockObject: (objectId) => {
    set((state) => ({
      unlockedObjects: state.unlockedObjects.includes(objectId)
        ? state.unlockedObjects
        : [...state.unlockedObjects, objectId],
    }))
    const obj = ROOM_OBJECTS.find((o) => o.id === objectId)
    if (obj) {
      get().addToast(`Unlocked: ${obj.name}`, 'success')
    }
  },

  isObjectDiscovered: (objectId) =>
    get().discoveredObjects.includes(objectId),

  isObjectUnlocked: (objectId) =>
    get().unlockedObjects.includes(objectId),

  solvePuzzle: (puzzleId) => {
    const state = get()
    if (state.solvedPuzzles.includes(puzzleId)) return
    set({ solvedPuzzles: [...state.solvedPuzzles, puzzleId] })
    get().addToast('Puzzle solved!', 'success')

    // Grant puzzle reward
    const puzzle = PUZZLES[puzzleId]
    if (puzzle?.reward) {
      if (puzzle.reward === 'door-unlock') {
        get().checkDoorStatus()
      } else if (ITEMS[puzzle.reward]) {
        get().addItem(puzzle.reward)
      }
    }

    // Remove clue items that are no longer needed
    if (puzzleId === 'safe') {
      get().removeItem('note2')
      get().removeItem('safe_code')
    }
    if (puzzleId === 'keypad') {
      get().removeItem('note1')
    }
  },

  isPuzzleSolved: (puzzleId) => get().solvedPuzzles.includes(puzzleId),

  setActiveObject: (objectId) => set({ activeObject: objectId }),
  setActivePuzzle: (puzzleId) => set({ activePuzzle: puzzleId }),
  setInspectingItem: (itemId) => set({ inspectingItem: itemId }),

  addClue: () =>
    set((state) => ({
      cluesFound: Math.min(state.cluesFound + 1, TOTAL_CLUES),
    })),

  useHint: () => {
    const state = get()
    if (state.hintsUsed >= MAX_HINTS) {
      get().addToast('No hints remaining!', 'error')
      return null
    }

    // Find unsolved puzzle and return hint
    const unsolvedPuzzle = Object.values(PUZZLES).find(
      (p) => !state.solvedPuzzles.includes(p.id)
    )
    if (unsolvedPuzzle) {
      set({ hintsUsed: state.hintsUsed + 1 })
      get().addToast(`Hint: ${unsolvedPuzzle.hint}`, 'info')
      return unsolvedPuzzle.hint
    }
    return null
  },

  addToast: (message, type) => {
    const id = Date.now().toString() + Math.random().toString(36)
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }))
    // Auto-remove after 3 seconds
    setTimeout(() => {
      get().removeToast(id)
    }, 3000)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),

  saveGame: () => {
    const state = get()
    const saveData: SaveData = {
      inventory: state.inventory.map((i) => i.id),
      solvedPuzzles: state.solvedPuzzles,
      discoveredObjects: state.discoveredObjects,
      unlockedObjects: state.unlockedObjects,
      elapsedTime: state.elapsedTime,
      hintsUsed: state.hintsUsed,
      timestamp: Date.now(),
    }
    try {
      localStorage.setItem('escape-room-save', JSON.stringify(saveData))
      get().addToast('Game saved!', 'info')
    } catch {
      get().addToast('Failed to save game', 'error')
    }
  },

  loadGame: () => {
    try {
      const raw = localStorage.getItem('escape-room-save')
      if (!raw) return false
      const data: SaveData = JSON.parse(raw)
      const inventory = data.inventory
        .map((id) => ITEMS[id])
        .filter(Boolean) as InventoryItem[]
      set({
        inventory,
        solvedPuzzles: data.solvedPuzzles,
        discoveredObjects: data.discoveredObjects,
        unlockedObjects: data.unlockedObjects,
        elapsedTime: data.elapsedTime,
        hintsUsed: data.hintsUsed,
        collectedItems: data.inventory,
        phase: 'playing',
        timerRunning: true,
      })
      get().addToast('Game loaded!', 'info')
      return true
    } catch {
      return false
    }
  },

  hasSaveData: () => {
    try {
      return !!localStorage.getItem('escape-room-save')
    } catch {
      return false
    }
  },

  setBestTime: (time) => {
    const current = get().bestTime
    if (current === null || time < current) {
      set({ bestTime: time })
      try {
        localStorage.setItem('escape-room-best-time', time.toString())
      } catch { /* ignore */ }
    }
  },

  checkDoorStatus: () => {
    const state = get()
    // Door requires: keypad solved + keycard used
    const keypadSolved = state.solvedPuzzles.includes('keypad')
    const keycardUsed = state.unlockedObjects.includes('door-panel')
    if (keypadSolved && keycardUsed) {
      set({ doorFullyUnlocked: true })
      get().addToast('The door clicks open! You can escape!', 'success')
    }
  },

  getCurrentStep: () => {
    const state = get()
    // Step 1: Search Lamp → get key
    if (!state.collectedItems.includes('key')) return 1
    // Step 2: Open desk drawer → get USB
    if (!state.unlockedObjects.includes('desk-drawer')) return 2
    // Step 3: Solve bookshelf puzzle
    if (!state.solvedPuzzles.includes('bookshelf')) return 3
    // Step 4: Find flashlight
    if (!state.collectedItems.includes('flashlight')) return 4
    // Step 5: Solve color pattern → get battery
    if (!state.solvedPuzzles.includes('pattern')) return 5
    // Step 6: Combine flashlight + battery
    if (!state.inventory.some((i) => i.id === 'powered-flashlight') && !state.collectedItems.includes('powered-flashlight')) return 6
    // Step 7: Reveal painting secret
    if (!state.unlockedObjects.includes('painting')) return 7
    // Step 8: Use USB on laptop
    if (!state.unlockedObjects.includes('laptop')) return 8
    // Step 9: Open safe → get keycard
    if (!state.solvedPuzzles.includes('safe')) return 9
    // Step 10: Enter door keypad code
    if (!state.solvedPuzzles.includes('keypad')) return 10
    // Step 11: Use keycard on door
    if (!state.doorFullyUnlocked) return 11
    return 12 // All done
  },

  canInteract: (objectId) => {
    const step = get().getCurrentStep()
    // Map object IDs to their minimum required step
    const objectStepMap: Record<string, number> = {
      'lamp': 1,
      'desk-drawer': 2,
      'bookshelf': 3,
      'flashlight-spot': 4,
      'pattern-panel': 5,
      'painting': 7,
      'laptop': 8,
      'safe': 9,
      'door': 10,
      'door-panel': 11,
    }
    const requiredStep = objectStepMap[objectId]
    // Objects not in the map (desk, clock) are always interactable
    if (requiredStep === undefined) return true
    return step >= requiredStep
  },

  setZoomTarget: (target) => set({ zoomTarget: target }),
  setIsZooming: (zooming) => set({ isZooming: zooming }),
  setPendingObjectId: (id) => set({ pendingObjectId: id }),
  zoomToObject: (objectId, position) => {
    set({ zoomTarget: position, pendingObjectId: objectId, isZooming: true })
  },

  resetGame: () => {
    set({
      ...getInitialState(),
      bestTime: get().bestTime,
      soundEnabled: get().soundEnabled,
      musicEnabled: get().musicEnabled,
    })
    try {
      localStorage.removeItem('escape-room-save')
    } catch { /* ignore */ }
  },
}))
