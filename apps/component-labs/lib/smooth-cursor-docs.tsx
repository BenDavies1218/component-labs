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
