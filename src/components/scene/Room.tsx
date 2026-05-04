import { useGameStore } from '../../stores/gameStore'
import { InteractiveObject } from './InteractiveObject'
import { Lighting } from './Lighting'

// Room walls, floor, and ceiling
function RoomStructure() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#3d3d5e" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2a2a45" roughness={0.8} />
      </mesh>

      {/* Back wall (door wall) */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3d3d5a" roughness={0.7} />
      </mesh>

      {/* Front wall (painting wall) */}
      <mesh position={[0, 2.5, 5]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3d3d5a" roughness={0.7} />
      </mesh>

      {/* Left wall (bookshelf wall) */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3a3a58" roughness={0.7} />
      </mesh>

      {/* Right wall (safe wall) */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3a3a58" roughness={0.7} />
      </mesh>

      {/* Neon accent strip - bottom of back wall */}
      <mesh position={[0, 0.05, -4.98]}>
        <planeGeometry args={[10, 0.05]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Neon accent strip - bottom of front wall */}
      <mesh position={[0, 0.05, 4.98]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 0.05]} />
        <meshStandardMaterial color="#bf00ff" emissive="#bf00ff" emissiveIntensity={0.6} />
      </mesh>

      {/* Neon accent strip - bottom of left wall */}
      <mesh position={[-4.98, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 0.05]} />
        <meshStandardMaterial color="#ff006e" emissive="#ff006e" emissiveIntensity={0.5} />
      </mesh>

      {/* Neon accent strip - bottom of right wall */}
      <mesh position={[4.98, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 0.05]} />
        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} />
      </mesh>

      {/* Floor details - grid lines */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={`grid-x-${i}`} position={[-5 + i, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 10]} />
          <meshBasicMaterial color="#00f5ff" opacity={0.15} transparent />
        </mesh>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={`grid-z-${i}`} position={[0, 0.01, -5 + i]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, 10]} />
          <meshBasicMaterial color="#00f5ff" opacity={0.15} transparent />
        </mesh>
      ))}

      {/* Corner accent pillar - back left */}
      <mesh position={[-4.9, 2.5, -4.9]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} emissive="#00f5ff" emissiveIntensity={0.15} />
      </mesh>

      {/* Corner accent pillar - back right */}
      <mesh position={[4.9, 2.5, -4.9]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} emissive="#39ff14" emissiveIntensity={0.15} />
      </mesh>

      {/* Corner accent pillar - front left */}
      <mesh position={[-4.9, 2.5, 4.9]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} emissive="#ff006e" emissiveIntensity={0.15} />
      </mesh>

      {/* Corner accent pillar - front right */}
      <mesh position={[4.9, 2.5, 4.9]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} emissive="#bf00ff" emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

// Door with keypad
function Door() {
  const { doorFullyUnlocked } = useGameStore()

  return (
    <InteractiveObject
      id="door"
      position={[0, 1.5, -4.85]}
      name="Main Door"
      tooltipText="🔒 LOCKED DOOR: Click to open keypad puzzle"
    >
      {/* Door frame */}
      <boxGeometry args={[1.8, 3, 0.2]} />
      <meshStandardMaterial
        color={doorFullyUnlocked ? '#39ff14' : '#3a3a5e'}
        roughness={0.3}
        metalness={0.8}
        emissive={doorFullyUnlocked ? '#39ff14' : '#d966ff'}
        emissiveIntensity={doorFullyUnlocked ? 0.3 : 0.15}
      />
    </InteractiveObject>
  )
}

// Door card reader - sleek wall-mounted panel with card slot
function DoorPanel() {
  const { isObjectUnlocked } = useGameStore()
  const unlocked = isObjectUnlocked('door-panel')

  return (
    <group>
      <InteractiveObject
        id="door-panel"
        position={[1.3, 1.5, -4.87]}
        name="Card Reader"
        tooltipText="💳 CARD READER: Use a keycard here to unlock the door"
      >
        {/* Main panel housing */}
        <boxGeometry args={[0.25, 0.45, 0.06]} />
        <meshStandardMaterial
          color={unlocked ? '#1a3a1a' : '#1a1a2e'}
          roughness={0.15}
          metalness={0.95}
          emissive={unlocked ? '#39ff14' : '#222244'}
          emissiveIntensity={unlocked ? 0.2 : 0.1}
        />
      </InteractiveObject>

      {/* Brushed metal faceplate border */}
      <mesh position={[1.3, 1.5, -4.86]}>
        <boxGeometry args={[0.28, 0.48, 0.02]} />
        <meshStandardMaterial
          color="#3a3a5e"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Card insertion slot */}
      <mesh position={[1.3, 1.48, -4.835]}>
        <boxGeometry args={[0.16, 0.02, 0.02]} />
        <meshStandardMaterial color="#050510" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* LED status indicator */}
      <mesh position={[1.3, 1.65, -4.835]}>
        <circleGeometry args={[0.02, 12]} />
        <meshStandardMaterial
          color={unlocked ? '#39ff14' : '#ff2244'}
          emissive={unlocked ? '#39ff14' : '#ff2244'}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Small icon area (card silhouette hint) */}
      <mesh position={[1.3, 1.38, -4.835]}>
        <planeGeometry args={[0.1, 0.07]} />
        <meshStandardMaterial
          color="#333355"
          emissive={unlocked ? '#39ff14' : '#4466aa'}
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

// Desk
function Desk() {
  return (
    <InteractiveObject
      id="desk"
      position={[3, 0.5, -2]}
      name="Study Desk"
      tooltipText="🪑 DESK: Look around for useful items"
    >
      {/* Desktop surface */}
      <boxGeometry args={[2, 0.1, 1.2]} />
      <meshStandardMaterial color="#2a2a4a" roughness={0.3} metalness={0.7} emissive="#00f5ff" emissiveIntensity={0.03} />
    </InteractiveObject>
  )
}

// Desk drawer
function DeskDrawer() {
  const { isObjectUnlocked } = useGameStore()
  const unlocked = isObjectUnlocked('desk-drawer')

  return (
    <InteractiveObject
      id="desk-drawer"
      position={[3, 0.25, -1.7]}
      name="Desk Drawer"
      tooltipText="🔒 DRAWER: Locked! Use a key to open it"
    >
      <boxGeometry args={[0.8, 0.2, 0.4]} />
      <meshStandardMaterial
        color={unlocked ? '#4a4a6e' : '#2a2a4e'}
        roughness={0.5}
        metalness={0.7}
        emissive={unlocked ? '#39ff14' : '#00f5ff'}
        emissiveIntensity={0.2}
      />
    </InteractiveObject>
  )
}

// Desk legs
function DeskLegs() {
  const legPositions: [number, number, number][] = [
    [2.1, 0.25, -2.5],
    [3.9, 0.25, -2.5],
    [2.1, 0.25, -1.5],
    [3.9, 0.25, -1.5],
  ]

  return (
    <>
      {legPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 0.5]} />
          <meshStandardMaterial color="#444466" metalness={0.9} roughness={0.2} emissive="#00f5ff" emissiveIntensity={0.05} />
        </mesh>
      ))}
    </>
  )
}

// Laptop
function Laptop() {
  const { isObjectUnlocked } = useGameStore()
  const unlocked = isObjectUnlocked('laptop')

  return (
    <InteractiveObject
      id="laptop"
      position={[3, 0.7, -2.2]}
      name="Laptop"
      tooltipText="💻 LAPTOP: Needs a USB drive to unlock"
    >
      {/* Laptop base */}
      <boxGeometry args={[0.8, 0.04, 0.5]} />
      <meshStandardMaterial
        color="#3a3a5e"
        roughness={0.2}
        metalness={0.9}
        emissive={unlocked ? '#39ff14' : '#6688ff'}
        emissiveIntensity={0.4}
      />
    </InteractiveObject>
  )
}

// Laptop screen (separate piece angled up)
function LaptopScreen() {
  return (
    <mesh position={[3, 0.95, -2.45]} rotation={[-0.3, 0, 0]}>
      <boxGeometry args={[0.75, 0.5, 0.02]} />
      <meshStandardMaterial
        color="#111133"
        roughness={0.1}
        metalness={0.5}
        emissive="#6688ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

// Bookshelf
function Bookshelf() {
  return (
    <InteractiveObject
      id="bookshelf"
      position={[-4.7, 1.5, 0]}
      name="Bookshelf"
      tooltipText="📚 BOOKSHELF: Arrange books in order (puzzle)"
    >
      {/* Shelf frame - thinner back panel */}
      <boxGeometry args={[0.15, 2.8, 2.2]} />
      <meshStandardMaterial color="#2c1810" roughness={0.7} metalness={0.1} />
    </InteractiveObject>
  )
}

// Bookshelf structure (non-interactive decorative parts)
function BookshelfDecor() {
  return (
    <group position={[-4.55, 1.5, 0]}>
      {/* Side panels */}
      <mesh position={[0, 0, -1.1]}>
        <boxGeometry args={[0.35, 2.8, 0.04]} />
        <meshStandardMaterial color="#3d2215" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 1.1]}>
        <boxGeometry args={[0.35, 2.8, 0.04]} />
        <meshStandardMaterial color="#3d2215" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 1.42, 0]}>
        <boxGeometry args={[0.35, 0.04, 2.24]} />
        <meshStandardMaterial color="#3d2215" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Shelves (4 rows) */}
      {[-0.7, -0.05, 0.6, 1.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[0.35, 0.04, 2.2]} />
          <meshStandardMaterial color="#4a2c1a" roughness={0.6} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

// Books on shelf - tightly packed like real books
function Books() {
  // Each shelf row: books packed side by side
  const shelves = [
    { baseY: 0.82, books: [
      { color: '#9b59b6', h: 0.52, w: 0.06 },
      { color: '#7b3fa0', h: 0.48, w: 0.05 },
      { color: '#e67e22', h: 0.54, w: 0.07 },
      { color: '#d35400', h: 0.50, w: 0.05 },
      { color: '#e67e22', h: 0.46, w: 0.06 },
      { color: '#1abc9c', h: 0.53, w: 0.06 },
      { color: '#16a085', h: 0.49, w: 0.05 },
      { color: '#bdc3c7', h: 0.51, w: 0.07 },
      { color: '#e74c3c', h: 0.47, w: 0.06 },
      { color: '#c0392b', h: 0.54, w: 0.05 },
    ]},
    { baseY: 1.47, books: [
      { color: '#e74c3c', h: 0.50, w: 0.06 },
      { color: '#1abc9c', h: 0.53, w: 0.07 },
      { color: '#9b59b6', h: 0.48, w: 0.05 },
      { color: '#bdc3c7', h: 0.51, w: 0.06 },
      { color: '#95a5a6', h: 0.49, w: 0.05 },
      { color: '#e67e22', h: 0.54, w: 0.06 },
      { color: '#9b59b6', h: 0.46, w: 0.07 },
      { color: '#1abc9c', h: 0.52, w: 0.05 },
      { color: '#e74c3c', h: 0.50, w: 0.06 },
    ]},
    { baseY: 2.12, books: [
      { color: '#bdc3c7', h: 0.48, w: 0.06 },
      { color: '#e67e22', h: 0.52, w: 0.05 },
      { color: '#e74c3c', h: 0.50, w: 0.07 },
      { color: '#9b59b6', h: 0.54, w: 0.06 },
      { color: '#1abc9c', h: 0.47, w: 0.05 },
      { color: '#8e44ad', h: 0.51, w: 0.06 },
      { color: '#bdc3c7', h: 0.49, w: 0.07 },
      { color: '#e67e22', h: 0.53, w: 0.05 },
    ]},
  ]

  return (
    <>
      {shelves.map((shelf, si) => {
        let zOffset = -0.85
        return shelf.books.map((book, bi) => {
          const z = zOffset + book.w / 2 + 0.01
          zOffset = z + book.w / 2 + 0.01
          return (
            <mesh key={`${si}-${bi}`} position={[-4.45, shelf.baseY + book.h / 2 - 0.25, z]}>
              <boxGeometry args={[0.18, book.h, book.w]} />
              <meshStandardMaterial
                color={book.color}
                roughness={0.7}
                emissive={book.color}
                emissiveIntensity={0.03}
              />
            </mesh>
          )
        })
      })}
    </>
  )
}

// Wall painting - with frame and canvas art
function Painting() {
  return (
    <InteractiveObject
      id="painting"
      position={[0, 2.2, 4.85]}
      rotation={[0, Math.PI, 0]}
      name="Wall Painting"
      tooltipText="🖼️ PAINTING: Something hidden? Use a flashlight"
    >
      {/* Canvas backing (the interactive mesh) */}
      <boxGeometry args={[2, 1.5, 0.08]} />
      <meshStandardMaterial color="#1a0a2e" roughness={0.8} />
    </InteractiveObject>
  )
}

// Painting decorative elements (non-interactive art layers)
function PaintingDecor() {
  return (
    <group position={[0, 2.2, 4.82]} rotation={[0, Math.PI, 0]}>
      {/* Gold frame - top */}
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[2.15, 0.08, 0.12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#b8860b" emissiveIntensity={0.05} />
      </mesh>
      {/* Gold frame - bottom */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[2.15, 0.08, 0.12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#b8860b" emissiveIntensity={0.05} />
      </mesh>
      {/* Gold frame - left */}
      <mesh position={[-1.04, 0, 0]}>
        <boxGeometry args={[0.08, 1.64, 0.12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#b8860b" emissiveIntensity={0.05} />
      </mesh>
      {/* Gold frame - right */}
      <mesh position={[1.04, 0, 0]}>
        <boxGeometry args={[0.08, 1.64, 0.12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#b8860b" emissiveIntensity={0.05} />
      </mesh>

      {/* Canvas background - deep blue night sky */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.9, 1.4]} />
        <meshStandardMaterial color="#0a0a2e" roughness={0.9} />
      </mesh>

      {/* Abstract landscape - mountains */}
      <mesh position={[-0.3, -0.2, 0.01]}>
        <coneGeometry args={[0.5, 0.8, 3]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} emissive="#4a2c8a" emissiveIntensity={0.05} />
      </mesh>
      <mesh position={[0.3, -0.15, 0.01]}>
        <coneGeometry args={[0.4, 0.7, 3]} />
        <meshStandardMaterial color="#1e1250" roughness={0.8} emissive="#3a1c7a" emissiveIntensity={0.05} />
      </mesh>

      {/* Moon */}
      <mesh position={[0.5, 0.35, 0.01]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#f0e6d3" roughness={0.5} emissive="#ffe4b5" emissiveIntensity={0.3} />
      </mesh>

      {/* Stars (small dots) */}
      {[[-0.6, 0.4], [-0.2, 0.5], [0.1, 0.4], [-0.5, 0.2], [0.7, 0.3], [-0.8, 0.45], [0.3, 0.55]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <circleGeometry args={[0.02, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Neon accent line (the hidden cipher glow) */}
      <mesh position={[0, -0.55, 0.02]}>
        <planeGeometry args={[1.4, 0.04]} />
        <meshStandardMaterial color="#bf00ff" emissive="#bf00ff" emissiveIntensity={0.2} transparent opacity={0.6} />
      </mesh>

      {/* 5 colored dots along the bottom frame (book order hint) */}
      {[
        { color: '#1abc9c', x: -0.4 },
        { color: '#e74c3c', x: -0.2 },
        { color: '#e67e22', x: 0 },
        { color: '#bdc3c7', x: 0.2 },
        { color: '#9b59b6', x: 0.4 },
      ].map((dot, i) => (
        <mesh key={`dot-${i}`} position={[dot.x, -0.65, 0.03]}>
          <circleGeometry args={[0.03, 12]} />
          <meshStandardMaterial color={dot.color} emissive={dot.color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Safe - realistic wall safe with door, handle, and digital display
function Safe() {
  const { isPuzzleSolved } = useGameStore()
  const solved = isPuzzleSolved('safe')

  return (
    <group>
      <InteractiveObject
        id="safe"
        position={[4.75, 1.5, 1]}
        rotation={[0, -Math.PI / 2, 0]}
        name="Wall Safe"
        tooltipText="🔐 WALL SAFE: Enter 4-digit combo to open"
      >
        {/* Safe body recessed into wall */}
        <boxGeometry args={[0.7, 0.7, 0.35]} />
        <meshStandardMaterial
          color="#2a2a3e"
          roughness={0.4}
          metalness={0.95}
        />
      </InteractiveObject>

      {/* Safe door face (front panel) */}
      <mesh position={[4.57, 1.5, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[0.68, 0.68, 0.04]} />
        <meshStandardMaterial
          color={solved ? '#2a4a2a' : '#3d3d5e'}
          roughness={0.25}
          metalness={0.95}
          emissive={solved ? '#39ff14' : '#000000'}
          emissiveIntensity={solved ? 0.1 : 0}
        />
      </mesh>

      {/* Beveled border frame */}
      <mesh position={[4.56, 1.5, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[0.74, 0.74, 0.02]} />
        <meshStandardMaterial
          color="#4a4a6e"
          roughness={0.2}
          metalness={0.98}
        />
      </mesh>

      {/* Handle / dial */}
      <mesh position={[4.54, 1.5, 1.15]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.08, 0.015, 12, 32]} />
        <meshStandardMaterial
          color="#888899"
          roughness={0.15}
          metalness={0.98}
          emissive="#aaaacc"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Handle center cap */}
      <mesh position={[4.54, 1.5, 1.15]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.04, 24]} />
        <meshStandardMaterial
          color="#666677"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Digital display panel */}
      <mesh position={[4.555, 1.7, 0.9]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.01]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.1}
          metalness={0.3}
          emissive={solved ? '#39ff14' : '#ff3366'}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Hinge details - top */}
      <mesh position={[4.56, 1.82, 0.68]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial color="#555566" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Hinge details - bottom */}
      <mesh position={[4.56, 1.18, 0.68]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial color="#555566" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Keyhole below handle */}
      <mesh position={[4.545, 1.35, 1.15]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.015, 12]} />
        <meshStandardMaterial color="#050508" roughness={0.9} />
      </mesh>
    </group>
  )
}

// Lamp
function Lamp() {
  return (
    <InteractiveObject
      id="lamp"
      position={[3.5, 0.8, -1.5]}
      name="Desk Lamp"
      tooltipText="💡 LAMP: The base feels loose... click to inspect"
    >
      {/* Lamp body */}
      <cylinderGeometry args={[0.05, 0.1, 0.5]} />
      <meshStandardMaterial
        color="#4a4a6e"
        roughness={0.3}
        metalness={0.8}
        emissive="#00f5ff"
        emissiveIntensity={0.3}
      />
    </InteractiveObject>
  )
}

// Lamp shade
function LampShade() {
  return (
    <mesh position={[3.5, 1.1, -1.5]}>
      <coneGeometry args={[0.2, 0.25, 16, 1, true]} />
      <meshStandardMaterial
        color="#6a5a8e"
        roughness={0.5}
        metalness={0.6}
        side={2}
        emissive="#ffcc44"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Wall clock
function Clock() {
  return (
    <InteractiveObject
      id="clock"
      position={[-4.85, 2.5, -2]}
      rotation={[0, Math.PI / 2, 0]}
      name="Wall Clock"
      tooltipText="🕐 CLOCK: Something unusual about the markings..."
    >
      <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
      <meshStandardMaterial
        color="#4a4a6e"
        roughness={0.3}
        metalness={0.7}
        emissive="#44ddff"
        emissiveIntensity={0.2}
      />
    </InteractiveObject>
  )
}

// Clock decorative elements - colored marks as color panel hint
function ClockDecor() {
  // Colored marks at 12, 3, 6, 9 positions (clockwise: R, B, G, Y)
  const marks = [
    { color: '#e74c3c', angle: 0 },       // 12 o'clock = Red
    { color: '#3498db', angle: Math.PI / 2 },   // 3 o'clock = Blue
    { color: '#2ecc71', angle: Math.PI },        // 6 o'clock = Green
    { color: '#f1c40f', angle: -Math.PI / 2 },   // 9 o'clock = Yellow
  ]

  return (
    <group position={[-4.82, 2.5, -2]} rotation={[0, Math.PI / 2, 0]}>
      {/* Clock face background */}
      <mesh>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
      {/* Colored marks */}
      {marks.map((mark, i) => {
        const x = Math.sin(mark.angle) * 0.27
        const y = Math.cos(mark.angle) * 0.27
        return (
          <mesh key={i} position={[x, y, 0.01]}>
            <circleGeometry args={[0.04, 12]} />
            <meshStandardMaterial color={mark.color} emissive={mark.color} emissiveIntensity={0.7} />
          </mesh>
        )
      })}
      {/* Clock hands (pointing to 7:39 for keypad hint) */}
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI * 0.6]}>
        <planeGeometry args={[0.02, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, -Math.PI * 0.35]}>
        <planeGeometry args={[0.015, 0.15]} />
        <meshStandardMaterial color="#cccccc" emissive="#cccccc" emissiveIntensity={0.2} />
      </mesh>
      {/* Center dot */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.02, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

// Pattern panel (color buttons) - large clear arcade panel
function PatternPanel() {
  return (
    <group>
      <InteractiveObject
        id="pattern-panel"
        position={[-4.85, 1.4, 2]}
        rotation={[0, Math.PI / 2, 0]}
        name="Color Panel"
        tooltipText="🎨 COLOR PANEL: Press buttons in the correct sequence"
      >
        <boxGeometry args={[1.6, 1.4, 0.06]} />
        <meshStandardMaterial
          color="#111122"
          roughness={0.2}
          metalness={0.95}
        />
      </InteractiveObject>

      {/* Panel thick frame */}
      <mesh position={[-4.86, 1.4, 2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.7, 1.5, 0.04]} />
        <meshStandardMaterial color="#2a2a44" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 4 big color buttons in 2x2 grid */}
      {[
        { color: '#e74c3c', x: -0.3, y: 0.3 },
        { color: '#3498db', x: 0.3, y: 0.3 },
        { color: '#2ecc71', x: -0.3, y: -0.3 },
        { color: '#f1c40f', x: 0.3, y: -0.3 },
      ].map((btn, i) => (
        <group key={i}>
          {/* Button housing */}
          <mesh position={[-4.82, 1.4 + btn.y, 2 + btn.x]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 32]} />
            <meshStandardMaterial color="#0a0a18" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Button dome */}
          <mesh position={[-4.80, 1.4 + btn.y, 2 + btn.x]} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.16, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color={btn.color}
              emissive={btn.color}
              emissiveIntensity={0.8}
              roughness={0.15}
              metalness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Small LED indicator light above buttons */}
      <mesh position={[-4.81, 2.0, 2]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.04, 12]} />
        <meshStandardMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

// Floor compartment - a distinct loose tile with visible cracks
function FloorCompartment() {
  const { collectedItems } = useGameStore()
  const collected = collectedItems.includes('flashlight')

  return (
    <group>
      <InteractiveObject
        id="flashlight-spot"
        position={[-2, 0.03, -3]}
        name="Floor Tile"
        tooltipText={collected ? '✅ EMPTY: Already collected' : '📦 LOOSE TILE: Click to search underneath'}
      >
        {/* Main tile - slightly raised and angled to look loose */}
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        <meshStandardMaterial
          color={collected ? '#2d2d4a' : '#4a4a6e'}
          roughness={0.6}
          metalness={0.2}
          emissive={collected ? '#000000' : '#00f5ff'}
          emissiveIntensity={collected ? 0 : 0.15}
        />
      </InteractiveObject>

      {/* Tile border groove (dark gap around the tile) */}
      <mesh position={[-2, 0.005, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.68, 0.68]} />
        <meshStandardMaterial color="#0a0a1e" roughness={0.9} />
      </mesh>

      {/* Crack lines on tile surface */}
      <mesh position={[-2.1, 0.065, -3]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[0.3, 0.008]} />
        <meshStandardMaterial color="#1a1a30" roughness={0.8} />
      </mesh>
      <mesh position={[-1.9, 0.065, -3.1]} rotation={[-Math.PI / 2, 0, -0.5]}>
        <planeGeometry args={[0.2, 0.006]} />
        <meshStandardMaterial color="#1a1a30" roughness={0.8} />
      </mesh>

      {/* Subtle glow underneath (visible through the gap) */}
      {!collected && (
        <pointLight position={[-2, -0.05, -3]} color="#39ff14" intensity={0.3} distance={0.8} />
      )}
    </group>
  )
}

export function Room() {
  return (
    <group>
      <RoomStructure />
      <Lighting />
      <Door />
      <DoorPanel />
      <Desk />
      <DeskLegs />
      <DeskDrawer />
      <Laptop />
      <LaptopScreen />
      <Bookshelf />
      <BookshelfDecor />
      <Books />
      <Painting />
      <PaintingDecor />
      <Safe />
      <Lamp />
      <LampShade />
      <Clock />
      <ClockDecor />
      <PatternPanel />
      <FloorCompartment />
    </group>
  )
}
