import { existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";
import {
  ShowcaseConfigSchema,
  defaultConfig,
  type ShowcaseConfig,
} from "./schema.js";

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
  const configPath = await findConfigFile(cwd);

  if (!configPath) {
    throw new Error(
      `Configuration file not found. Please create one of: ${CONFIG_FILES.join(", ")}\n` +
        `Run 'npx component-showcase init' to generate a config file.`,
    );
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
      tailwindConfig: validated.tailwindConfig
        ? resolve(configDir, validated.tailwindConfig)
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
