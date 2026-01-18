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

  // Custom app title
  title: z.string().default("Component Labs"),

  // Dev server port
  port: z.number().int().min(1).max(65535).default(6060),

  // Output directory for build
  outDir: z.string().default("./showcase-dist"),

  // Base path for deployment
  base: z.string().default("/").optional(),

  // Path to Tailwind config file
  tailwindConfig: z.string().optional(),

  // Exclude patterns (files to ignore)
  exclude: z.array(z.string()).optional(),

  // Custom theme colors
  theme: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
    })
    .optional(),
});

export type ShowcaseConfig = z.infer<typeof ShowcaseConfigSchema>;

/**
 * Default configuration
 */
export const defaultConfig: Partial<ShowcaseConfig> = {
  title: "Component Labs",
  port: 6060,
  outDir: "./showcase-dist",
  base: "/",
  exclude: ["**/node_modules/**", "**/.git/**"],
};
