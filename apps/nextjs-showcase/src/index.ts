// Main entry point for the package
export { defineConfig, type ShowcaseConfig } from './config/schema.js';
export type { DiscoveredShowcase } from './utils/discovery.js';

// Prop types for showcase files
export interface PropConfig {
  type: 'string' | 'boolean' | 'number' | 'select' | 'object' | 'array';
  label: string;
  default: any;
  options?: string[];
}

export type Props = Record<string, PropConfig>;
