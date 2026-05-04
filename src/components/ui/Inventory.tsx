import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

export function Inventory() {
  const {
    inventory,
    selectedItem,
    setSelectedItem,
    setInspectingItem,
    combineItems,
  } = useGameStore()

  const handleItemClick = (itemId: string) => {
    if (selectedItem && selectedItem !== itemId) {
      // Try combining items
      const success = combineItems(selectedItem, itemId)
      if (!success) {
        setSelectedItem(itemId)
      }
    } else if (selectedItem === itemId) {
      setSelectedItem(null)
    } else {
      setSelectedItem(itemId)
    }
  }

  const handleItemInspect = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation()
    setInspectingItem(itemId)
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex justify-center pb-2 sm:pb-4 px-2 sm:px-4 overflow-visible">
        <div className="pointer-events-auto bg-dark-800/80 backdrop-blur-md border border-neon-cyan/20 rounded-xl px-2 sm:px-4 py-2 sm:py-3 flex gap-1.5 sm:gap-2 items-center min-h-[56px] sm:min-h-[72px] max-w-[90vw] overflow-visible">
          {/* Label */}
          <span className="font-mono text-[10px] sm:text-xs text-gray-500 mr-1 sm:mr-2 hidden sm:block flex-shrink-0">
            INVENTORY
          </span>

          {/* Items */}
          <AnimatePresence>
            {inventory.length === 0 && (
              <span className="font-mono text-xs text-gray-600 px-4">
                No items yet
              </span>
            )}
            {inventory.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                title={item.name}
                className={`relative group cursor-pointer rounded-lg border-2 p-1.5 sm:p-2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  selectedItem === item.id
                    ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                    : 'border-gray-700 hover:border-neon-purple/50 bg-dark-700/50'
                }`}
                onClick={() => handleItemClick(item.id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleItemInspect(e, item.id)
                }}
              >
                <span className="text-2xl sm:text-3xl">{item.icon}</span>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <div className="bg-dark-900 border border-neon-cyan/30 rounded px-2 py-1 whitespace-nowrap shadow-lg">
                    <span className="font-mono text-xs text-neon-cyan">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Inspect icon */}
                <button
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-dark-900 border border-gray-600 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-neon-cyan"
                  onClick={(e) => handleItemInspect(e, item.id)}
                >
                  🔍
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Item count */}
          {inventory.length > 0 && (
            <span className="font-mono text-xs text-gray-500 ml-2">
              {inventory.length}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
