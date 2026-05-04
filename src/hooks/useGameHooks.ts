import { useEffect, useRef } from 'react'
import { useGameStore } from '../stores/gameStore'

// Simple sound effect hook using Web Audio API
// No external audio files needed - generates tones programmatically

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  if (!audioContext) return
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

export function useSoundEffects() {
  const { soundEnabled } = useGameStore()

  const playClick = () => {
    if (!soundEnabled) return
    playTone(800, 0.1, 'square', 0.1)
  }

  const playSuccess = () => {
    if (!soundEnabled) return
    playTone(523, 0.15, 'sine', 0.2)
    setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 100)
    setTimeout(() => playTone(784, 0.2, 'sine', 0.2), 200)
  }

  const playError = () => {
    if (!soundEnabled) return
    playTone(200, 0.3, 'sawtooth', 0.15)
  }

  const playPickup = () => {
    if (!soundEnabled) return
    playTone(1047, 0.1, 'sine', 0.15)
    setTimeout(() => playTone(1319, 0.15, 'sine', 0.15), 80)
  }

  const playUnlock = () => {
    if (!soundEnabled) return
    playTone(440, 0.1, 'triangle', 0.2)
    setTimeout(() => playTone(554, 0.1, 'triangle', 0.2), 100)
    setTimeout(() => playTone(659, 0.2, 'triangle', 0.2), 200)
    setTimeout(() => playTone(880, 0.3, 'triangle', 0.2), 300)
  }

  return { playClick, playSuccess, playError, playPickup, playUnlock }
}

// Timer hook
export function useGameTimer() {
  const { timerRunning, tick, phase } = useGameStore()
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRunning && phase === 'playing') {
      intervalRef.current = window.setInterval(() => {
        tick()
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerRunning, phase, tick])
}

// Keyboard shortcuts hook
export function useKeyboardShortcuts() {
  const { phase, setPhase, saveGame, useHint } = useGameStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'playing') return

      switch (e.key) {
        case 'Escape':
          setPhase('paused')
          break
        case 'h':
        case 'H':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            useHint()
          }
          break
        case 's':
        case 'S':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            saveGame()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, setPhase, saveGame, useHint])
}
