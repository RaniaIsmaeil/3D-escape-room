import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

interface QuestStep {
  id: string
  label: string
  description: string
  isComplete: () => boolean
}

export function QuestChecklist() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const {
    collectedItems,
    solvedPuzzles,
    unlockedObjects,
    inventory,
    doorFullyUnlocked,
  } = useGameStore()

  const steps: QuestStep[] = [
    {
      id: 'step1',
      label: '1. Search the Lamp',
      description: 'Inspect the desk lamp. Its base is loose. Find a key inside.',
      isComplete: () => collectedItems.includes('key'),
    },
    {
      id: 'step2',
      label: '2. Open Desk Drawer',
      description: 'Use the Brass Key on the locked desk drawer to find a USB drive.',
      isComplete: () => unlockedObjects.includes('desk-drawer'),
    },
    {
      id: 'step3',
      label: '3. Solve Bookshelf Puzzle',
      description: 'Arrange books: Teal → Crimson → Orange → Silver → Purple. The painting frame has colored dots showing the order.',
      isComplete: () => solvedPuzzles.includes('bookshelf'),
    },
    {
      id: 'step4',
      label: '4. Find the Flashlight',
      description: 'Check the loose floor tile (near the back-left) to find a dead flashlight.',
      isComplete: () => collectedItems.includes('flashlight'),
    },
    {
      id: 'step5',
      label: '5. Solve Color Pattern',
      description: 'The clock has 4 colored dots (clockwise from top): Red, Blue, Green, Yellow. Enter this on the left wall panel.',
      isComplete: () => solvedPuzzles.includes('pattern'),
    },
    {
      id: 'step6',
      label: '6. Combine Flashlight + Battery',
      description: 'Select one item in your inventory, then click the other to combine them into a working flashlight.',
      isComplete: () =>
        inventory.some((i) => i.id === 'powered-flashlight') ||
        collectedItems.includes('powered-flashlight'),
    },
    {
      id: 'step7',
      label: '7. Reveal Painting Secret',
      description: 'Use the Powered Flashlight on the painting (back wall). Reveals a hidden note with part of the safe code.',
      isComplete: () => unlockedObjects.includes('painting'),
    },
    {
      id: 'step8',
      label: '8. Use USB on Laptop',
      description: 'Use the USB drive on the laptop. It shows part of the safe code: "**17".',
      isComplete: () => unlockedObjects.includes('laptop'),
    },
    {
      id: 'step9',
      label: '9. Open the Safe',
      description: 'Combine clues: painting note says "42" + laptop says "17" = 4217. Enter it on the wall safe.',
      isComplete: () => solvedPuzzles.includes('safe'),
    },
    {
      id: 'step10',
      label: '10. Enter Door Keypad Code',
      description: 'Enter 7391 on the door keypad (from the torn note clue).',
      isComplete: () => solvedPuzzles.includes('keypad'),
    },
    {
      id: 'step11',
      label: '11. Use Keycard on Door',
      description: 'Use the Access Keycard on the card reader next to the door. This fully unlocks the exit!',
      isComplete: () => doorFullyUnlocked,
    },
  ]

  const completedCount = steps.filter((s) => s.isComplete()).length

  // Find the next incomplete step
  const nextStep = steps.find((s) => !s.isComplete())

  return (
    <div className="fixed left-2 sm:left-4 bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 pointer-events-none">
      {/* Toggle button */}
      <motion.button
        className="pointer-events-auto bg-dark-800/90 backdrop-blur-md border border-neon-purple/40 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-neon-purple hover:bg-neon-purple/10 transition-colors flex items-center gap-1.5 sm:gap-2"
        onClick={() => {
          if (isAnimating) return
          setIsOpen(!isOpen)
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-base sm:text-lg">📋</span>
        <span className="font-mono text-[10px] sm:text-xs">{completedCount}/{steps.length}</span>
      </motion.button>

      {/* Checklist panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pointer-events-auto fixed left-2 sm:left-4 bottom-32 sm:bottom-auto sm:relative sm:left-0 sm:top-2 w-[calc(100vw-1rem)] sm:w-72 md:w-80 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto bg-dark-800/95 backdrop-blur-md border border-neon-purple/30 rounded-xl p-3 sm:p-4 shadow-[0_0_30px_rgba(191,0,255,0.1)]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:text-white text-xs sm:hidden"
            >
              ✕
            </button>

            <h3 className="font-display text-xs sm:text-sm text-neon-purple tracking-wider mb-1">
              QUEST LOG
            </h3>
            <p className="font-mono text-[9px] sm:text-[10px] text-gray-400 mb-2 sm:mb-3">
              Complete steps in order to escape
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 sm:h-2 bg-dark-600 rounded-full mb-3 sm:mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
                animate={{ width: `${(completedCount / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-1.5 sm:space-y-2">
              {steps.map((step) => {
                const complete = step.isComplete()
                const isCurrent = step === nextStep

                return (
                  <div
                    key={step.id}
                    className={`rounded-lg p-2 sm:p-2.5 border transition-all ${
                      complete
                        ? 'border-neon-green/30 bg-neon-green/5'
                        : isCurrent
                        ? 'border-neon-cyan/40 bg-neon-cyan/5'
                        : 'border-gray-700/30 bg-dark-700/30 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm mt-0.5 flex-shrink-0">
                        {complete ? '✅' : isCurrent ? '👉' : '⬜'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-mono text-[11px] sm:text-xs font-bold leading-tight ${
                            complete
                              ? 'text-neon-green line-through'
                              : isCurrent
                              ? 'text-neon-cyan'
                              : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </p>
                        {(isCurrent || complete) && (
                          <p className="font-mono text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Help text */}
            <p className="font-mono text-[9px] sm:text-[10px] text-gray-500 mt-2 sm:mt-3 text-center">
              💡 Click objects in the 3D room to interact
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current objective mini banner (when panel is closed) */}
      {!isOpen && nextStep && (
        <motion.div
          className="pointer-events-none mt-1.5 sm:mt-2 bg-dark-800/80 backdrop-blur-sm border border-neon-cyan/20 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 max-w-[170px] sm:max-w-[200px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-[9px] sm:text-[10px] text-neon-cyan/70">NEXT:</p>
          <p className="font-mono text-[10px] sm:text-[11px] text-gray-300 leading-tight">
            {nextStep.label.replace(/^\d+\.\s/, '')}
          </p>
        </motion.div>
      )}
    </div>
  )
}
