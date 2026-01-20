import { z } from "zod";

/**
 * Configuration schema for Component Showcase
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
  port: z.number().int().min(1).max(65535).default(6060),

  // Output directory for build
  outDir: z.string().default("./showcase-dist"),

  // Exclude patterns (files to ignore)
  exclude: z.array(z.string()).optional(),
});

export type ShowcaseConfig = z.infer<typeof ShowcaseConfigSchema>;

/**
 * Default configuration
 */
export const defaultConfig: Partial<ShowcaseConfig> = {
  port: 6060,
  outDir: "./showcase-dist",
  exclude: ["**/node_modules/**", "**/.git/**", "**/*.test.*"],
};
