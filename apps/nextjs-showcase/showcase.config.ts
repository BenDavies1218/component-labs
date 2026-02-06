import { defineConfig } from "@component-labs/nextjs-showcase/config";

export default defineConfig({
  // Pattern to match your showcase files
  showcasePaths: ["../../packages/ui/src/**/*.showcase.{tsx,jsx}"],

  // Optional: Exclude certain paths
  exclude: ["node_modules/**", "dist/**"],

  // Optional: Custom title
  title: "My Component Library",

  // Optional: Port for dev server (default: 3060)
  port: 3060,

  // Output directory for generated files
  outDir: "./app",

  // Optional: Path to global CSS file
  // globalCss: "./src/styles/globals.css",

  // Optional: Path to global provider component
  // globalProvider: "./src/GlobalProvider.tsx",
});
