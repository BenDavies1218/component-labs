import type { ShowcaseConfig } from "./src/config/schema";

const config: ShowcaseConfig = {
  showcasePaths: [
    "../../packages/ui/src/**/*.showcase.{ts,tsx}",
    "./src/**/*.showcase.{ts,tsx}",
  ],
  globalCss: "./src/index.css",
  title: "Component Labs",
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
