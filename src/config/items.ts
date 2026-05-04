import { InventoryItem } from '../types'

export const ITEMS: Record<string, InventoryItem> = {
  key: {
    id: 'key',
    name: 'Brass Key',
    description: 'A small brass key with intricate engravings. Might fit a drawer.',
    icon: '🔑',
    usableOn: ['desk-drawer'],
  },
  note1: {
    id: 'note1',
    name: 'Torn Note',
    description: 'A torn piece of paper reading: "The stars align at 7-3-9-1"',
    icon: '📝',
  },
  note2: {
    id: 'note2',
    name: 'Hidden Note',
    description: 'Scratched into the back: "SAFE: ??-17"',
    icon: '📋',
  },
  usb: {
    id: 'usb',
    name: 'USB Drive',
    description: 'A sleek black USB drive with a glowing blue tip.',
    icon: '💾',
    usableOn: ['laptop'],
  },
  battery: {
    id: 'battery',
    name: 'Battery',
    description: 'A charged power cell. Could power something.',
    icon: '🔋',
    combinableWith: ['flashlight'],
    combinationResult: 'powered-flashlight',
  },
  flashlight: {
    id: 'flashlight',
    name: 'Flashlight (Dead)',
    description: 'A flashlight with no power. Needs a battery.',
    icon: '🔦',
    combinableWith: ['battery'],
    combinationResult: 'powered-flashlight',
  },
  'powered-flashlight': {
    id: 'powered-flashlight',
    name: 'Flashlight (Powered)',
    description: 'A working flashlight. Reveals hidden things in dark places.',
    icon: '💡',
    usableOn: ['painting'],
  },
  keycard: {
    id: 'keycard',
    name: 'Access Keycard',
    description: 'A holographic keycard with clearance level OMEGA.',
    icon: '💳',
    usableOn: ['door-panel'],
  },
  safe_code: {
    id: 'safe_code',
    name: 'Code Fragment',
    description: 'The laptop screen flashes: "ACCESS CODE: 42**"',
    icon: '🔢',
  },
  book_red: {
    id: 'book_red',
    name: 'Red Book',
    description: 'A crimson leather-bound book titled "First Light".',
    icon: '📕',
  },
}
