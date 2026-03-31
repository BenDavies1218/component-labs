# SmoothCursor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a SmoothCursor component to `apps/component-labs` with a working docs page.

**Architecture:** The component lives in `apps/component-labs/components/ui/smooth-cursor.tsx`. A local docs object is created in `apps/component-labs/lib/smooth-cursor-docs.tsx` and registered in `component-docs.ts`. The `ComponentDoc` type is imported from `@component-labs/ui`.

**Tech Stack:** Next.js, React 19, `motion/react` (Framer Motion), TypeScript, Tailwind CSS

---

### Task 1: Install motion dependency

**Files:**
- Modify: `apps/component-labs/package.json` (via pnpm)

**Step 1: Install the package**

```bash
cd /Users/benjamindavies/Documents/GitHub/component-labs
pnpm --filter my-v0-project add motion
```

Expected: `motion` added to `apps/component-labs/package.json` dependencies.

**Step 2: Verify**

```bash
grep '"motion"' apps/component-labs/package.json
```

Expected: `"motion": "^<version>"`

**Step 3: Commit**

```bash
git add apps/component-labs/package.json pnpm-lock.yaml
git commit -m "feat: add motion dependency to component-labs app"
```

---

### Task 2: Create the SmoothCursor component

**Files:**
- Create: `apps/component-labs/components/ui/smooth-cursor.tsx`

**Step 1: Create the file with exactly this content**

```tsx
"use client"

import { FC, useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch"
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)

      if (!nextIsEnabled) {
        setIsVisible(false)
      }
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      setIsVisible(true)

      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.95)

        if (timeout !== null) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          scale.set(1)
        }, 150)
      }
    }

    let rafId = 0
    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e)
        rafId = 0
      })
    }

    document.body.style.cursor = "none"
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      {cursor}
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/component-labs/components/ui/smooth-cursor.tsx
git commit -m "feat: add SmoothCursor component"
```

---

### Task 3: Create local docs object and register in component-docs.ts

**Files:**
- Create: `apps/component-labs/lib/smooth-cursor-docs.tsx`
- Modify: `apps/component-labs/lib/component-docs.ts`

**Step 1: Create `apps/component-labs/lib/smooth-cursor-docs.tsx`**

Note: This file uses `.tsx` because the `preview` field returns JSX. It imports `ComponentDoc` type from `@component-labs/ui` (available via the workspace dependency).

```tsx
import type { ComponentDoc } from "@component-labs/ui";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export const smoothCursorDocs: ComponentDoc = {
  name: "Smooth Cursor",
  description:
    "A physics-based custom cursor with spring animation, rotation tracking, and velocity-aware scaling. Only activates on desktop pointer devices.",
  category: "Inputs",
  status: "stable",
  version: "1.0.0",
  installation: `pnpm add motion

Then copy the component into your project:
// components/ui/smooth-cursor.tsx`,
  usage: `import { SmoothCursor } from "@/components/ui/smooth-cursor";

// Add to your root layout
export default function Layout({ children }) {
  return (
    <>
      <SmoothCursor />
      {children}
    </>
  );
}`,
  props: [
    {
      name: "cursor",
      type: "ReactNode",
      description: "Custom cursor element to render. Defaults to a built-in arrow SVG.",
    },
    {
      name: "springConfig.damping",
      type: "number",
      default: "45",
      description: "Spring damping — higher values reduce oscillation.",
    },
    {
      name: "springConfig.stiffness",
      type: "number",
      default: "400",
      description: "Spring stiffness — higher values make the cursor snappier.",
    },
    {
      name: "springConfig.mass",
      type: "number",
      default: "1",
      description: "Spring mass — higher values add inertia.",
    },
    {
      name: "springConfig.restDelta",
      type: "number",
      default: "0.001",
      description: "Threshold at which the spring is considered at rest.",
    },
  ],
  examples: [
    {
      title: "Basic usage",
      description: "Add to your root layout to apply the cursor globally.",
      code: `import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}`,
    },
    {
      title: "Custom cursor element",
      description: "Pass any React node as the cursor.",
      code: `<SmoothCursor
  cursor={
    <div className="w-4 h-4 rounded-full bg-primary" />
  }
/>`,
    },
    {
      title: "Tuned spring config",
      description: "Adjust spring physics for a different feel.",
      code: `<SmoothCursor
  springConfig={{
    damping: 20,
    stiffness: 300,
    mass: 0.5,
    restDelta: 0.001,
  }}
/>`,
    },
  ],
  accessibility: [
    "Only activates on desktop pointer devices (uses media query: any-hover: hover and any-pointer: fine)",
    "Touch devices are unaffected — no cursor is rendered",
    "Does not interfere with keyboard navigation",
    "Restores default cursor on unmount",
  ],
  performance: {
    bundleSize: "~2KB gzipped (component only, excludes motion)",
    renderTime: "GPU-composited — uses CSS transform via Framer Motion",
    rerenderOptimization: [
      "Pointer events throttled with requestAnimationFrame",
      "Spring values updated directly (no React state for position)",
      "Only re-renders on isEnabled / isVisible state changes",
    ],
    dependencies: ["motion"],
  },
  preview: () => <SmoothCursor />,
};
```

**Step 2: Add `smoothCursorDocs` to `apps/component-labs/lib/component-docs.ts`**

Add this import at the top of the file (after the existing imports):

```ts
import { smoothCursorDocs } from "./smooth-cursor-docs";
```

Add this entry to `componentDocsMap`:

```ts
"smooth-cursor": smoothCursorDocs,
```

**Step 3: Commit**

```bash
git add apps/component-labs/lib/smooth-cursor-docs.tsx apps/component-labs/lib/component-docs.ts
git commit -m "feat: add SmoothCursor docs and register docs page"
```

---

### Task 4: Verify

**Step 1: Run typecheck**

```bash
cd /Users/benjamindavies/Documents/GitHub/component-labs
pnpm --filter my-v0-project build 2>&1 | tail -20
```

Or if you just want types:

```bash
pnpm --filter my-v0-project lint 2>&1 | tail -20
```

**Step 2: Start dev server and verify the docs page loads**

```bash
pnpm --filter my-v0-project dev
```

Visit `http://localhost:3000/docs/smooth-cursor` — the page should render with name, description, props table, examples, and a live preview in the top-right corner of the page.
