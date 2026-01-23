import type { ShowcaseConfig } from "@component-labs/react-showcase";

const config: ShowcaseConfig = {
  showcasePaths: [
    "./src/**/*.showcase.{ts,tsx}"
],
  globalCss: "./src/index.css",
  // globalProvider: "./src/Provider.tsx",
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
