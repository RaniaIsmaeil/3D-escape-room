# 🔐 3D Escape Room - Interactive Browser Game

A polished 3D escape room game built with React, TypeScript, Three.js, and Zustand. Explore a mysterious futuristic chamber, find clues, solve puzzles, and escape!

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Three.js](https://img.shields.io/badge/Three.js-r167-black) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## 🎮 Game Features

- **3D Explorable Room** - Orbit camera controls, interactive objects with glow effects
- **4 Unique Puzzles** - Keypad, color sequence, safe combination, bookshelf order
- **Inventory System** - Collect, inspect, combine, and use items on objects
- **Save/Load Progress** - Saves to localStorage, resume anytime
- **Game Timer & Best Time** - Track and beat your escape speed
- **Hint System** - 3 limited hints for when you're stuck
- **Sound Effects** - Procedurally generated audio (no external files needed)
- **Cinematic UI** - Dark theme with neon accents, smooth Framer Motion animations
- **Responsive** - Works on desktop and tablet

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

1. **Bookshelf** → Teal, Crimson, Orange, Silver, Purple (look at the colored dots on the painting frame)
2. **Color Pattern** → Red, Blue, Green, Yellow (clockwise from the wall clock's colored marks)
3. **Safe** → 4217 (combine laptop code fragment "42**" + hidden note "??-17")
4. **Keypad** → 7391 (from torn note: "The stars align at 7-3-9-1")

**Item Flow:**
- Lamp base → Brass Key → Desk Drawer → USB Drive
- Floor tile → Flashlight + Battery (from color pattern puzzle) → Powered Flashlight → Painting → Hidden Note
- USB → Laptop → Code Fragment → Safe → Access Keycard → Door Card Reader
- Bookshelf puzzle → Torn Note (keypad code)
- Keypad solved + Keycard used = ESCAPE!

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

- **Click + Drag** - Rotate camera
- **Scroll** - Zoom in/out
- **Click objects** - Interact
- **Right-click inventory** - Inspect item
- **Escape** - Pause menu
- **Ctrl+S** - Save game
- **Ctrl+H** - Use hint

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

