import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import pc from "picocolors";

interface InitOptions {
  force?: boolean;
}

const CONFIG_TEMPLATE = `import { defineConfig } from "@component-labs/nextjs-showcase/config";

export default defineConfig({
  // Pattern to match your showcase files
  showcasePaths: ["src/**/*.showcase.{tsx,jsx}"],

  // Optional: Exclude certain paths
  exclude: ["node_modules/**", "dist/**"],

  // Optional: Custom title
  title: "My Component Library",

  // Optional: Port for dev server (default: 3060)
  port: 3060,

  // Optional: Path to global CSS file
  // globalCss: "./src/styles/globals.css",

  // Optional: Path to global provider component
  // globalProvider: "./src/GlobalProvider.tsx",
});
`;

export async function initCommand(options: InitOptions = {}) {
  const cwd = process.cwd();
  const configPath = resolve(cwd, "showcase.config.ts");

  // Check if config already exists
  if (existsSync(configPath) && !options.force) {
    console.log(pc.yellow("⚠ showcase.config.ts already exists."));
    console.log("");
    console.log(pc.dim("  Use") + pc.cyan(" --force ") + pc.dim("to overwrite."));
    console.log("");
    return;
  }

  try {
    // Write config file
    writeFileSync(configPath, CONFIG_TEMPLATE, "utf-8");

    console.log(pc.green("✓ Created showcase.config.ts"));
    console.log("");
    console.log(pc.dim("  Next steps:"));
    console.log(pc.dim("    1. Create your first showcase file (*.showcase.tsx)"));
    console.log(pc.dim("    2. Run") + pc.cyan(" nextjs-showcase dev ") + pc.dim("to start the dev server"));
    console.log("");
  } catch (error) {
    console.error(pc.red("✗ Failed to create config file:"));
    console.error(error);
    process.exit(1);
  }
}
