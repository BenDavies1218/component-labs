import { existsSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import pc from "picocolors";

const CONFIG_TEMPLATE = `import type { ShowcaseConfig } from "component-labs-showcase";

const config: ShowcaseConfig = {
  // Glob patterns to find showcase files
  showcasePaths: [
    "./src/**/*.showcase.{ts,tsx}",
    "./components/**/*.showcase.{ts,tsx}",
  ],

  // Optional: Path to global CSS file
  globalCss: "./src/styles/global.css",

  // Optional: Custom app title
  title: "Component Showcase",

  // Optional: Dev server port
  port: 3000,

  // Optional: Output directory for build
  outDir: "./showcase-dist",

  // Optional: Exclude patterns
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
`;

interface InitOptions {
  force?: boolean;
}

export async function initCommand(options: InitOptions = {}) {
  const cwd = process.cwd();
  const configPath = resolve(cwd, "showcase.config.ts");

  // Check if config already exists
  if (existsSync(configPath) && !options.force) {
    console.log(
      pc.yellow("⚠ Config file already exists at showcase.config.ts"),
    );
    console.log(pc.dim("  Use --force to overwrite"));
    process.exit(1);
  }

  try {
    // Ensure directory exists
    const dir = dirname(configPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write config file
    writeFileSync(configPath, CONFIG_TEMPLATE, "utf-8");

    console.log(pc.green("✓ Created showcase.config.ts"));
    console.log("");
    console.log(pc.dim("Next steps:"));
    console.log(
      pc.dim("  1. Update showcasePaths to match your project structure"),
    );
    console.log(pc.dim("  2. Create .showcase.tsx files for your components"));
    console.log(pc.dim("  3. Run: npx component-showcase dev"));
    console.log("");
  } catch (error) {
    console.error(pc.red("✗ Failed to create config file:"), error);
    process.exit(1);
  }
}
