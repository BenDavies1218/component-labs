export type { ShowcaseConfig } from "./config/schema.js";
export { ShowcaseConfigSchema, defaultConfig } from "./config/schema.js";
export { loadConfig, validateConfig } from "./config/loader.js";

// Export showcase types for users to type their showcase files
export type { Showcase, PropConfig, ShowcaseModule, Props } from "./showcase.js";
