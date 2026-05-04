import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import { ROOM_OBJECTS } from '../../config/rooms'
import { ITEMS } from '../../config/items'

export function InspectModal() {
  const {
    activeObject,
    setActiveObject,
    inspectingItem,
    setInspectingItem,
    isObjectUnlocked,
    selectedItem,
    setSelectedItem,
    unlockObject,
    addItem,
    removeItem,
    collectedItems,
    setActivePuzzle,
    hasItem,
  } = useGameStore()

  const [itemCollected, setItemCollected] = useState(false)
  const [unlockAnim, setUnlockAnim] = useState(false)

  // Handle object inspection
  const object = activeObject
    ? ROOM_OBJECTS.find((o) => o.id === activeObject)
    : null

  // Handle item inspection
  const item = inspectingItem ? ITEMS[inspectingItem] : null

  const isOpen = !!object || !!item

  const handleClose = () => {
    setActiveObject(null)
    setInspectingItem(null)
    setItemCollected(false)
    setUnlockAnim(false)
  }

  const handleCollectItem = () => {
    if (!object?.containsItem) return
    if (collectedItems.includes(object.containsItem)) return

    setItemCollected(true)
    setTimeout(() => {
      addItem(object.containsItem!)
      setTimeout(() => handleClose(), 400)
    }, 600)
  }

  const handleUseSelectedItem = () => {
    if (!object || !selectedItem) return

    const invItem = ITEMS[selectedItem]
    if (invItem?.usableOn?.includes(object.id)) {
      setUnlockAnim(true)
      unlockObject(object.id)
      removeItem(selectedItem)
      setSelectedItem(null)

      setTimeout(() => {
        // If unlocking reveals an item, show it
        if (object.containsItem && !collectedItems.includes(object.containsItem)) {
          setUnlockAnim(false)
        } else {
          useGameStore.getState().checkDoorStatus()
          setTimeout(() => handleClose(), 500)
        }
      }, 800)
    } else {
      useGameStore.getState().addToast("That doesn't work here.", 'error')
    }
  }

  const handleOpenPuzzle = () => {
    if (!object?.puzzleId) return
    setActiveObject(null)
    setActivePuzzle(object.puzzleId)
  }

  const handleTryUnlock = () => {
    if (!object) return

    if (object.isLocked && object.requiredItem && !isObjectUnlocked(object.id)) {
      if (hasItem(object.requiredItem)) {
        setUnlockAnim(true)
        unlockObject(object.id)
        removeItem(object.requiredItem)

        setTimeout(() => {
          if (object.containsItem && !collectedItems.includes(object.containsItem)) {
            setUnlockAnim(false)
          } else {
            useGameStore.getState().checkDoorStatus()
            setTimeout(() => handleClose(), 500)
          }
        }, 800)
      } else {
        const needed = ITEMS[object.requiredItem]
        useGameStore.getState().addToast(
          `Needs: ${needed?.name || 'something'}`,
          'warning'
        )
      }
    }
  }

  // Determine what to show in the close-up view
  const isUnlocked = isObjectUnlocked(object?.id || '')
  const isLocked = object?.isLocked && !isUnlocked && !object?.puzzleId
  const hasCollectible = object?.containsItem && !collectedItems.includes(object.containsItem) && (!object.isLocked || isUnlocked)
  const hasPuzzle = !!object?.puzzleId && (!object.isLocked || isUnlocked || !object.requiredItem)
  const alreadyCollected = object?.containsItem && collectedItems.includes(object.containsItem)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Semi-transparent backdrop (less opaque so zoom is visible) */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />

          {/* Close-up panel */}
          <motion.div
            className="relative bg-dark-900/90 backdrop-blur-md border border-neon-cyan/20 rounded-2xl p-5 sm:p-8 max-w-lg w-full mx-3 shadow-[0_0_40px_rgba(0,245,255,0.08)]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-dark-700 border border-gray-600 text-gray-400 hover:text-white text-xs transition-colors"
            >
              ✕
            </button>

            {/* Object close-up view */}
            {object && (
              <div>
                {/* Object name */}
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Inspecting</p>
                <h3 className="font-display text-lg text-white mb-3">
                  {object.name}
                </h3>

                {/* Visual area - the "close up" scene */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-dark-800 rounded-xl border border-gray-700/50 overflow-hidden mb-4 flex items-center justify-center min-h-[200px]">
                  
                  {/* Locked state */}
                  {isLocked && !unlockAnim && (
                    <div className="text-center">
                      <motion.div
                        className="text-5xl mb-3"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        🔒
                      </motion.div>
                      <p className="font-mono text-xs text-gray-400">{object.inspectText}</p>
                      {selectedItem && ITEMS[selectedItem]?.usableOn?.includes(object.id) ? (
                        <motion.button
                          onClick={handleUseSelectedItem}
                          className="mt-3 px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan rounded-lg font-mono text-xs hover:bg-neon-cyan/30 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Use {ITEMS[selectedItem]?.icon} {ITEMS[selectedItem]?.name}
                        </motion.button>
                      ) : object.requiredItem && hasItem(object.requiredItem) ? (
                        <motion.button
                          onClick={handleTryUnlock}
                          className="mt-3 px-4 py-2 bg-neon-green/20 border border-neon-green/50 text-neon-green rounded-lg font-mono text-xs hover:bg-neon-green/30 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Use {ITEMS[object.requiredItem]?.icon} {ITEMS[object.requiredItem]?.name}
                        </motion.button>
                      ) : (
                        <p className="mt-2 font-mono text-[10px] text-neon-pink/70">
                          Find the right item to unlock this
                        </p>
                      )}
                    </div>
                  )}

                  {/* Unlock animation */}
                  {unlockAnim && (
                    <motion.div
                      className="text-center"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.3, 0], rotate: [0, 0, 90] }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="text-5xl">🔓</div>
                    </motion.div>
                  )}

                  {/* Collectible item visible */}
                  {hasCollectible && !itemCollected && !unlockAnim && (
                    <motion.button
                      onClick={handleCollectItem}
                      className="relative group cursor-pointer"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Glow ring */}
                      <div className="absolute inset-0 -m-4 rounded-full bg-neon-cyan/20 blur-xl group-hover:bg-neon-cyan/40 transition-colors" />
                      {/* Item icon */}
                      <div className="relative text-6xl">
                        {ITEMS[object.containsItem!]?.icon}
                      </div>
                      {/* Label */}
                      <motion.p
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-neon-cyan/80"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        tap to collect
                      </motion.p>
                    </motion.button>
                  )}

                  {/* Item collected animation */}
                  {itemCollected && (
                    <motion.div
                      className="text-center"
                      initial={{ scale: 1, y: 0 }}
                      animate={{ scale: 0.5, y: -60, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeIn' }}
                    >
                      <div className="text-6xl">{ITEMS[object.containsItem!]?.icon}</div>
                    </motion.div>
                  )}

                  {/* Puzzle object */}
                  {hasPuzzle && !unlockAnim && (
                    <motion.button
                      onClick={handleOpenPuzzle}
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="text-5xl mb-2"
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        {object.id === 'door' ? '🔢' : object.id === 'bookshelf' ? '📚' : object.id === 'safe' ? '🔐' : object.id === 'pattern-panel' ? '🎨' : '🧩'}
                      </motion.div>
                      <p className="font-mono text-xs text-neon-purple group-hover:text-neon-cyan transition-colors">
                        Open Puzzle
                      </p>
                    </motion.button>
                  )}

                  {/* Already collected / nothing here */}
                  {!isLocked && !hasCollectible && !hasPuzzle && !itemCollected && !unlockAnim && (
                    <div className="text-center">
                      <div className="text-4xl mb-2 opacity-40">
                        {alreadyCollected ? '📭' : '👁️'}
                      </div>
                      <p className="font-mono text-xs text-gray-500">
                        {alreadyCollected ? 'Already collected' : object.inspectText || 'Nothing else here'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Item inspection (from inventory) */}
            {item && (
              <div className="text-center">
                <div className="text-6xl mb-4 py-2">{item.icon}</div>
                <h3 className="font-display text-lg text-white mb-2">
                  {item.name}
                </h3>
                <p className="font-mono text-xs text-gray-400">
                  {item.description}
                </p>
                {item.usableOn && item.usableOn.length > 0 && (
                  <p className="font-mono text-[10px] text-neon-purple/70 mt-3">
                    Select this, then click an object to use it
                  </p>
                )}
                {item.combinableWith && item.combinableWith.length > 0 && (
                  <p className="font-mono text-[10px] text-neon-green/70 mt-1">
                    Can be combined with another item
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
