import type { ShowcaseConfig } from "@component_labs/react-showcase";

const config: ShowcaseConfig = {
  showcasePaths: ["./src/**/*.showcase.{ts,tsx}"],
  globalCss: "./src/index.css",
  // globalProvider: "./src/Provider.tsx", You can add a global provider if you need context providers, session, query clients, etc.
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
