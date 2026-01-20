import { existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";
import pc from "picocolors";
import {
  ShowcaseConfigSchema,
  defaultConfig,
  type ShowcaseConfig,
} from "./schema.js";
import { initCommand } from "../cli/commands/init.js";

const CONFIG_FILES = [
  "showcase.config.js",
  "showcase.config.mjs",
  "showcase.config.ts",
  ".showcaserc.js",
  ".showcaserc.mjs",
];

/**
 * Find the configuration file in the current working directory
 */
export async function findConfigFile(
  cwd: string = process.cwd(),
): Promise<string | null> {
  for (const filename of CONFIG_FILES) {
    const filepath = resolve(cwd, filename);
    if (existsSync(filepath)) {
      return filepath;
    }
  }
  return null;
}

/**
 * Load and validate the configuration file
 */
export async function loadConfig(
  cwd: string = process.cwd(),
): Promise<ShowcaseConfig> {
  let configPath = await findConfigFile(cwd);

  // Auto-initialize if no config found
  if (!configPath) {
    console.log(pc.cyan("No config found. Creating showcase.config.ts...\n"));
    await initCommand({ silent: false });
    configPath = await findConfigFile(cwd);

    if (!configPath) {
      throw new Error(
        `Failed to create configuration file. Please run 'npx component-showcase init' manually.`,
      );
    }
  }

  try {
    // Use dynamic import with file URL to support both .js and .ts
    const configModule = await import(pathToFileURL(configPath).href);
    const userConfig = configModule.default || configModule;

    // Merge with defaults and validate
    const config = { ...defaultConfig, ...userConfig };
    const validated = ShowcaseConfigSchema.parse(config);

    // Resolve paths relative to config file directory
    const configDir = resolve(configPath, "..");

    // Resolve showcase paths
    const resolvedShowcasePaths = validated.showcasePaths.map((p) =>
      resolve(configDir, p),
    );

    // Return config with resolved paths
    return {
      ...validated,
      showcasePaths: resolvedShowcasePaths,
      globalCss: validated.globalCss
        ? resolve(configDir, validated.globalCss)
        : undefined,
      outDir: resolve(configDir, validated.outDir),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to load config from ${configPath}: ${error.message}`,
      );
    }
    throw error;
  }
}

/**
 * Validate a user config object without loading from file
 */
export function validateConfig(config: unknown): ShowcaseConfig {
  const merged = Object.assign({}, defaultConfig, config);
  return ShowcaseConfigSchema.parse(merged);
}
