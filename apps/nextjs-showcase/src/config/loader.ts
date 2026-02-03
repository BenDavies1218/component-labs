import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { existsSync } from "fs";
import pc from "picocolors";
import { ShowcaseConfigSchema, defaultConfig, type ShowcaseConfig } from "./schema.js";

const CONFIG_FILE_NAMES = [
  "showcase.config.ts",
  "showcase.config.js",
  "showcase.config.mjs",
];

/**
 * Load and validate the showcase configuration file
 */
export async function loadConfig(cwd: string): Promise<ShowcaseConfig> {
  // Try to find config file
  let configPath: string | null = null;

  for (const fileName of CONFIG_FILE_NAMES) {
    const path = resolve(cwd, fileName);
    if (existsSync(path)) {
      configPath = path;
      break;
    }
  }

  if (!configPath) {
    console.error(pc.red("✗ No showcase config file found."));
    console.log("");
    console.log(pc.dim("  Run") + pc.cyan(" nextjs-showcase init ") + pc.dim("to create one."));
    console.log("");
    process.exit(1);
  }

  try {
    // Import the config file (works with both ESM and CJS)
    const fileUrl = pathToFileURL(configPath).href;
    const configModule = await import(fileUrl);
    const userConfig = configModule.default || configModule;

    // Merge with defaults
    const mergedConfig = { ...defaultConfig, ...userConfig };

    // Validate config
    const result = ShowcaseConfigSchema.safeParse(mergedConfig);

    if (!result.success) {
      console.error(pc.red("✗ Invalid showcase config:"));
      console.error(result.error.format());
      process.exit(1);
    }

    return result.data;
  } catch (error) {
    console.error(pc.red("✗ Failed to load showcase config:"));
    console.error(error);
    process.exit(1);
  }
}
