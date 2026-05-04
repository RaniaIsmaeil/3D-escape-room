import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

export function ToastContainer() {
  const { toasts, removeToast } = useGameStore()

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-[90vw] sm:max-w-xs">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
            className={`pointer-events-auto px-3 py-2 sm:px-4 sm:py-3 rounded-lg border backdrop-blur-md font-mono text-xs sm:text-sm cursor-pointer ${
              toast.type === 'success'
                ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
                : toast.type === 'error'
                ? 'bg-neon-pink/10 border-neon-pink/30 text-neon-pink'
                : toast.type === 'warning'
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                : 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan'
            }`}
            onClick={() => removeToast(toast.id)}
          >
            <span className="mr-2">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✗'}
              {toast.type === 'warning' && '⚠'}
              {toast.type === 'info' && 'ℹ'}
            </span>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
