// Export all components
export { Sidebar } from "./components/Sidebar";
export { Header } from "./components/Header";
export { Controls } from "./components/Controls";
export { ErrorBoundary } from "./components/ErrorBoundary";
export { DotPattern } from "./components/DotPattern";
export { AnimatedGradientText } from "./components/AnimatedGradientText";
export {
  IPhoneFrame,
  IPadFrame,
  DesktopFrame,
} from "./components/DeviceContainers";
export { GettingStarted } from "./components/GettingStarted";

// Export all types
export type {
  Showcase,
  ShowcaseGroups,
  ShowcaseMetadata,
  PropConfig,
  Props,
  Theme,
  ControlsPosition,
  ViewportSize,
} from "./types";

// Export utilities
export { cn } from "./lib/utils";
