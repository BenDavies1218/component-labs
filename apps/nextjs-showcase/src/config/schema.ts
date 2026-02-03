import { z } from "zod";

/**
 * Configuration schema for Next.js Component Showcase
 */
export const ShowcaseConfigSchema = z.object({
  // Glob patterns to find showcase files
  showcasePaths: z
    .array(z.string())
    .min(1, "At least one showcase path is required"),

  // Path to global CSS file
  globalCss: z.string().optional(),

  // Path to global provider component file
  globalProvider: z.string().optional(),

  // Dev server port
  port: z.number().int().min(1).max(65535).default(3060),

  // Output directory for build
  outDir: z.string().default("./out"),

  // Exclude patterns (files to ignore)
  exclude: z.array(z.string()).optional(),

  // Title for the showcase site
  title: z.string().default("Component Showcase"),
});

export type ShowcaseConfig = z.infer<typeof ShowcaseConfigSchema>;

/**
 * Default configuration
 */
export const defaultConfig: Partial<ShowcaseConfig> = {
  port: 3060,
  outDir: "./out",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
  title: "Component Showcase",
};

/**
 * Helper function to define config with type safety
 */
export function defineConfig(config: ShowcaseConfig): ShowcaseConfig {
  return config;
}
