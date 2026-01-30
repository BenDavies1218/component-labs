import type { ShowcaseConfig } from "@component-labs/react-showcase";

const config: ShowcaseConfig = {
  showcasePaths: ["../../packages/ui/src/**/*.showcase.{ts,tsx}"],
  globalCss: "../../packages/ui/src/styles.css",
  // globalProvider: "./src/Provider.tsx",
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
