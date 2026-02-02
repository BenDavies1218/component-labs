import { existsSync } from "fs";
import { resolve } from "path";

export interface ComponentsConfig {
  $schema?: string;
  style: string;
  tsx: boolean;
  tailwind: {
    config: string;
    css: string;
    baseColor?: string;
    cssVariables?: boolean;
  };
  aliases: {
    components: string;
    utils: string;
    ui?: string;
  };
}

export async function getConfig(cwd: string): Promise<ComponentsConfig | null> {
  const configPath = resolve(cwd, "components.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const config = await import(configPath, { assert: { type: "json" } });
    return config.default || config;
  } catch (error) {
    return null;
  }
}

export function resolveConfigPaths(cwd: string, config: ComponentsConfig) {
  return {
    tailwindConfig: resolve(cwd, config.tailwind.config),
    tailwindCss: resolve(cwd, config.tailwind.css),
    components: config.aliases.components.replace(/^@\//, ""),
    utils: config.aliases.utils.replace(/^@\//, ""),
    ui: config.aliases.ui?.replace(/^@\//, "") || "components/ui",
  };
}
