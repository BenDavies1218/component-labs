import { existsSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname, join } from "path";
import pc from "picocolors";

function detectProjectStructure(cwd: string) {

  // Check common directories
  const hasSrc = existsSync(join(cwd, "src"));
  const hasComponents = existsSync(join(cwd, "components"));
  const hasLib = existsSync(join(cwd, "lib"));

  // Detect global CSS
  let globalCss = "";
  const possibleCssPaths = [
    "./src/index.css",
    "./src/styles/global.css",
    "./src/styles.css",
    "./src/app/globals.css",
    "./styles/global.css",
  ];

  for (const path of possibleCssPaths) {
    if (existsSync(join(cwd, path))) {
      globalCss = path;
      break;
    }
  }

  // Build showcase paths based on structure
  const showcasePaths: string[] = [];
  if (hasSrc) showcasePaths.push("./src/**/*.showcase.{ts,tsx}");
  if (hasComponents) showcasePaths.push("./components/**/*.showcase.{ts,tsx}");
  if (hasLib) showcasePaths.push("./lib/**/*.showcase.{ts,tsx}");

  // Default fallback
  if (showcasePaths.length === 0) {
    showcasePaths.push("./src/**/*.showcase.{ts,tsx}");
  }

  return { showcasePaths, globalCss };
}

function generateConfigTemplate(cwd: string): string {
  const { showcasePaths, globalCss } = detectProjectStructure(cwd);

  const globalCssLine = globalCss
    ? `  globalCss: "${globalCss}",\n`
    : `  // globalCss: "./src/styles/global.css",\n`;

  return `import type { ShowcaseConfig } from "@component-labs/react-showcase";

const config: ShowcaseConfig = {
  showcasePaths: ${JSON.stringify(showcasePaths, null, 4).replace(/"([^"]+)":/g, "$1:")},
${globalCssLine}  // globalProvider: "./src/Provider.tsx",
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};

export default config;
`;
}

interface InitOptions {
  force?: boolean;
  silent?: boolean;
}

export async function initCommand(options: InitOptions = {}) {
  const cwd = process.cwd();
  const configPath = resolve(cwd, "showcase.config.ts");

  // Check if config already exists
  if (existsSync(configPath) && !options.force) {
    if (!options.silent) {
      console.log(
        pc.yellow("⚠ Config file already exists at showcase.config.ts"),
      );
      console.log(pc.dim("  Use --force to overwrite"));
    }
    return;
  }

  try {
    // Ensure directory exists
    const dir = dirname(configPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Generate and write config file
    const configContent = generateConfigTemplate(cwd);
    writeFileSync(configPath, configContent, "utf-8");

    if (!options.silent) {
      console.log(pc.green("✓ Created showcase.config.ts"));
      console.log("");
      console.log(pc.dim("Next steps:"));
      console.log(
        pc.dim("  1. Create .showcase.tsx files for your components"),
      );
      console.log(pc.dim("  2. Run: npx component-showcase dev"));
      console.log("");
    }
  } catch (error) {
    if (!options.silent) {
      console.error(pc.red("✗ Failed to create config file:"), error);
    }
    process.exit(1);
  }
}
