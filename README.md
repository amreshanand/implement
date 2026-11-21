# AtmosFX — Official NPM Package Interactive Demo

[![npm version](https://img.shields.io/npm/v/@amresh8241/atmosfx.svg?color=00f0ff&label=npm%20package)](https://www.npmjs.com/package/@amresh8241/atmosfx)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![React Compatibility](https://img.shields.io/badge/React-18%20%7C%2019-indigo.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org)

Official interactive demo and developer showcase for the published npm package **[`@amresh8241/atmosfx`](https://www.npmjs.com/package/@amresh8241/atmosfx)**.

- **NPM Package**: https://www.npmjs.com/package/@amresh8241/atmosfx
- **Package Repository**: https://github.com/amreshanand/npm

---

## Overview

**AtmosFX** is a lightweight, zero-dependency visual effects and physics animation library engineered specifically for React 18 and 19. Built with raw HTML5 2D Canvas and optimized `requestAnimationFrame` render loops, AtmosFX delivers 60 FPS cinematic weather, celebratory, interactive, and atmospheric effects without bloating bundle size.

This demo website imports `@amresh8241/atmosfx` directly from the NPM registry to provide a live, production-grade sandbox where developers can interact with all 8 visual effects, tune their real component props in real time, test accessibility behavior, and copy tailored TypeScript JSX implementation code.

---

## 8 Actual Visual Effects

Every effect below is imported directly from `@amresh8241/atmosfx`:

| Effect Component | Category | Description | Primary Props |
| :--- | :--- | :--- | :--- |
| `<Snowfall />` | Weather | Drifting winter snow with wobble vectors and optional cursor repulsion. | `count`, `speed`, `wind`, `size`, `color`, `opacity`, `interaction`, `interactionRadius`, `pause` |
| `<Rain />` | Weather | High-speed directional raindrops with terminal velocity & splash particles. | `intensity`, `speed`, `angle`, `color`, `opacity`, `splashes`, `splashCount`, `splashColor` |
| `<Confetti />` | Celebratory | 3D tumbling confetti explosion with gravity, drag, and continuous recycling. | `particleCount`, `duration`, `gravity`, `spread`, `velocity`, `recycle`, `trigger`, `shapes` |
| `<Sparkles />` | Atmospheric | Sinusoidal twinkling stars, halos, and crosses with optical radial glows. | `density`, `speed`, `minSize`, `maxSize`, `shape`, `color`, `glow`, `glowRadius`, `glowColor` |
| `<Aurora />` | Atmospheric | Flowing polar light curtains rendered with multi-harmonic sine ribbons. | `intensity`, `speed`, `blur`, `ribbonCount`, `opacity`, `colors` |
| `<ParticleField />` | Interactive | Proximity network constellation with dynamic link synthesis and cursor physics. | `density`, `speed`, `connectionLines`, `connectionDistance`, `interactive`, `interactionMode` |
| `<CursorTrail />` | Interactive | Silky glowing particle ribbon following pointer trajectory with decay curves. | `trailLength`, `particleSize`, `fadeDuration`, `sensitivity`, `color`, `glow`, `glowRadius` |
| `<MeteorShower />` | Cosmic | Cinematic shooting stars with hot plasma cores and luminous vapor tails. | `frequency`, `speed`, `angle`, `randomizeAngle`, `color`, `trailColor`, `glow`, `glowRadius` |

---

## Tech Stack

- **Framework**: React 18.3+ & TypeScript 5.7+
- **Bundler & Dev Server**: Vite 6.1+
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Visual FX Core**: `@amresh8241/atmosfx` (v1.0.0 from npm)

---

## Architecture & Verification

1. **Direct NPM Import**: No local source copies or symlinks. The package is declared in `package.json` under dependencies (`"@amresh8241/atmosfx": "^1.0.0"`) and imported via standard package paths:
   ```tsx
   import {
     Snowfall,
     Rain,
     Confetti,
     Sparkles,
     Aurora,
     ParticleField,
     CursorTrail,
     MeteorShower
   } from '@amresh8241/atmosfx';
   ```

2. **Strict TypeScript Compliance**: Every customization slider, toggle, color picker, and dropdown corresponds 1:1 with the verified TypeScript interface exported by the package (`SnowfallProps`, `RainProps`, `ConfettiProps`, `SparklesProps`, `AuroraProps`, `ParticleFieldProps`, `CursorTrailProps`, `MeteorShowerProps`, and `BaseEffectProps`).

3. **Container-Confined vs. Fullscreen Viewport**: The demo exercises both container bounding (`fullScreen={false}` with `containerRef`) for a clean side-by-side sandbox, and viewport rendering (`fullScreen={true}`) for immersive previews.

4. **Accessibility (Reduced Motion)**: AtmosFX components respect `prefers-reduced-motion` at the OS level via the `respectReducedMotion` prop, either pausing heavy physics or dampening velocity automatically.

5. **Clean Lifecycle & Memory Hygiene**: Effect components cleanly tear down their `requestAnimationFrame` loops and canvas contexts upon unmounting, preventing memory leaks when navigating between effect types.

---

## Getting Started Locally

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/amreshanand/npm.git
cd implement

# Install dependencies (installs @amresh8241/atmosfx from npm)
npm install
```

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Type Check & Production Build

```bash
npm run build
```

The production output will be generated in `./dist`.

### Preview Production Build

```bash
npm run preview
```

---

## License

This demo and the `@amresh8241/atmosfx` package are licensed under the [MIT License](LICENSE).
