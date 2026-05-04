import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'

export function StartScreen() {
  const { setPhase, startTimer } = useGameStore()

  const handleStart = () => {
    setPhase('playing')
    startTimer()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-pink/5 rounded-full blur-[80px] animate-glow-pulse" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 text-center px-4">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mb-4">
            ESCAPE
          </h1>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl text-neon-cyan/80 tracking-[0.2em] sm:tracking-[0.3em] mb-2">
            THE CHAMBER
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-xs sm:text-sm md:text-base text-gray-400 mt-4 sm:mt-6 mb-8 sm:mb-12 max-w-md mx-auto px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You wake up in a mysterious locked room. Find clues, solve puzzles, and escape.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-4 items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={handleStart}
            className="group relative px-10 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-display text-lg tracking-wider hover:bg-neon-cyan/10 transition-all duration-300 rounded-sm"
          >
            <span className="relative z-10">START GAME</span>
            <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-neon-cyan/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="bg-dark-700/50 border border-gray-700/30 rounded-lg p-4">
            <p className="font-mono text-xs text-gray-300 text-left leading-relaxed">
              <span className="text-neon-cyan">HOW TO PLAY:</span><br />
              • Drag to look around the room<br />
              • Click glowing objects to interact<br />
              • Use 📋 Quest Log (left side) for step-by-step guidance<br />
              • Collect items → use them on locked objects<br />
              • Solve all puzzles to escape!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
