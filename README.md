# 🔐 Escape Room 3D — Interactive Browser Game

A polished, modern 3D escape room game built with React, TypeScript, Three.js, and Zustand. Explore a mysterious futuristic chamber, find clues, solve puzzles, and escape!

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Three.js](https://img.shields.io/badge/Three.js-r167-black) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## 🎮 Game Features

- **3D Explorable Room** — Orbit camera controls, interactive objects with glow effects
- **4 Unique Puzzles** — Keypad, color sequence, safe combination, bookshelf order
- **Inventory System** — Collect, inspect, combine, and use items on objects
- **Save Progress** — Auto-saves to localStorage, resume anytime
- **Game Timer & Best Time** — Track your escape speed
- **Hint System** — 3 limited hints for when you're stuck
- **Sound Effects** — Procedurally generated audio (no external files needed)
- **Cinematic UI** — Dark theme with neon accents, smooth Framer Motion animations
- **Responsive** — Works on desktop and tablet

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── scene/          # 3D components (Room, objects, lighting)
│   ├── puzzles/        # Puzzle UI components
│   └── ui/             # HUD, inventory, modals, screens
├── config/             # Game data (items, puzzles, room layout)
├── hooks/              # Custom hooks (timer, sound, keyboard)
├── stores/             # Zustand game state
└── types/              # TypeScript interfaces
```

## 🧩 Puzzle Solutions (Spoilers!)

<details>
<summary>Click to reveal</summary>

1. **Bookshelf** → Red, Blue, Green, Gold, Black (warm to cool, ending in darkness)
2. **Color Pattern** → Red, Blue, Green, Yellow (from the cipher note)
3. **Safe** → 4217 (code fragments found around room)
4. **Keypad** → 7391 (from torn note: "The stars align at 7-3-9-1")

**Item Flow:**
- Lamp base → Key → Desk Drawer → USB
- Floor compartment → Flashlight + Battery (from pattern puzzle) → Powered Flashlight → Painting → Cipher Note
- USB → Laptop → Safe Code → Safe → Keycard → Door Card Reader
- Bookshelf puzzle → Torn Note (keypad code)
- Keypad + Keycard = ESCAPE!

</details>

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| React Three Fiber | 3D rendering |
| Drei | R3F helpers |
| Three.js | 3D engine |
| Zustand | State management |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Web Audio API | Sound effects |

## ⌨️ Controls

- **Click + Drag** — Rotate camera
- **Scroll** — Zoom in/out
- **Click objects** — Interact
- **Right-click inventory** — Inspect item
- **Escape** — Pause menu
- **Ctrl+S** — Save game
- **Ctrl+H** — Use hint

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Portfolio Features

- Clean, modular architecture
- Reusable component patterns
- Full type safety with TypeScript
- Responsive design
- Accessibility basics (keyboard support, focus indicators)
- LocalStorage persistence
- Performance optimized 3D rendering
- No external asset dependencies

---

Built with ❤️ as a portfolio project
