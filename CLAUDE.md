# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**The Secret of Time (Ang Lihim ng Panahon)** is an educational interactive story-based game that teaches cryptography through Philippine history. Players travel through 5 historical eras (1450-1986), solving cipher puzzles to progress through the narrative.

## Tech Stack

- **Framework**: Next.js 16.0.10 with App Router architecture
- **UI Library**: React 19.2.1 with TypeScript 5
- **Styling**: Tailwind CSS v4 (inline `@theme` configuration in globals.css)
- **State Management**: Zustand 5.0.9 with persist middleware
- **3D Graphics**: React Three Fiber 9.4.2 + React Three Drei 10.7.7 + Three.js 0.182.0
- **Animations**: Framer Motion 12.23.26 (primary) + GSAP 3.14.2 (timelines)
- **Audio**: Howler 2.2.4

## Common Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Note**: No test suite is currently configured.

## Architecture

### Directory Structure

```
src/
├── app/              # Next.js App Router pages (layout, routes)
├── components/       # React components organized by feature
│   ├── 3d/          # Three.js/R3F components
│   ├── chapter1/    # Chapter-specific components
│   ├── chapter5/
│   ├── epilogue/
│   ├── prologue/
│   └── ui/          # Shared UI components
├── lib/             # Utility functions
│   └── ciphers/    # Cryptography implementations
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
```

### Key Architectural Patterns

1. **Feature-Based Organization**: Components are grouped by game chapter/feature rather than by type.

2. **Client-Side Rendering**: All interactive pages use `'use client'` directive. The game is client-side heavy due to 3D graphics and animations.

3. **Dynamic Imports for 3D**: Three.js components must be dynamically imported with `ssr: false` to prevent server-side rendering issues:
   ```tsx
   const AmuletScene = dynamic(() => import('@/components/3d/AmuletScene'), {
     ssr: false,
     loading: () => <div>Loading...</div>
   })
   ```

4. **Persistent Game State**: Zustand store at `src/store/gameStore.ts` persists to localStorage with key `secret-of-time-storage`. Tracks:
   - Current chapter and completed chapters
   - Unlocked ciphers and discovered secrets
   - Player choices affecting endings
   - UI state (settings, inventory, etc.)

5. **Path Aliases**: Use `@/*` to import from `src/*`:
   ```tsx
   import { Button } from '@/components/ui/Button'
   import { caesarCipher } from '@/lib/ciphers/caesar'
   ```

### Game Structure

- **Prologue** (`/prologue`): Story introduction, chest discovery, time travel initiation
- **Chapters 1-5** (`/chapter/[id]`): Each chapter represents a Philippine historical era with a unique cipher:
  - Chapter 1 (1450): Pre-Colonial - Caesar Cipher
  - Chapter 2 (1896): Philippine Revolution - Vigenère Cipher
  - Chapter 3 (1945): WWII - Playfair Cipher
  - Chapter 4 (1983): Martial Law - Rail Fence Cipher
  - Chapter 5 (1986): EDSA Revolution - Columnar Transposition Cipher
- **Epilogue** (`/epilogue`): Multiple endings (EndingA, EndingB, PostCredits) based on player choices

### Cryptography Implementation

Cipher implementations in `src/lib/ciphers/` include:
- `encrypt()` and `decrypt()` functions
- `validate()` for input validation
- `getStepByStep()` for educational explanations
- Brute force crackers for educational purposes

Each cipher is historically accurate and includes detailed comments explaining the algorithm.

### Styling and Theming

Tailwind CSS v4 uses inline `@theme` configuration in `src/app/globals.css`:
- **Custom Colors**: Filipino-inspired palette (gold, purple, brass, mahogany)
- **Custom Animations**: `mystical-pulse`, `float`, `shimmer`, `glow-pulse`, `time-warp`
- **Utility Classes**: `.mystical-glow`, `.floating`, `.shimmer-effect`, `.filipino-border`
- **Font Variables**: `--font-display`, `--font-body`, `--font-dramatic`, `--font-mono`

### TypeScript Configuration

- Strict mode enabled
- Path alias `@/*` → `./src/*`
- Target: ES2017 with modern JSX transform

## Important Notes

- **3D Performance**: Keep Three.js scenes optimized; use `useMemo` for geometries/materials
- **Animation Performance**: Prefer Framer Motion for declarative animations, GSAP for complex timelines
- **State Updates**: Always use Zustand actions to update game state (never mutate directly)
- **Historical Accuracy**: Maintain historical context and educational value when modifying chapters
- **Accessibility**: Ensure all interactive elements have proper ARIA labels and keyboard navigation
