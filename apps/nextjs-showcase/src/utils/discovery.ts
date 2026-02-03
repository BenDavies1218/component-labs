import { glob } from 'glob';
import { relative } from 'path';
import type { ShowcaseConfig } from '../config/schema.js';

export interface DiscoveredShowcase {
  /** Absolute path to the showcase file */
  absolutePath: string;
  /** Relative path from cwd */
  relativePath: string;
  /** Import path for module loading */
  importPath: string;
}

/**
 * Discover all showcase files based on config patterns
 */
export async function discoverShowcaseFiles(
  config: ShowcaseConfig,
  cwd: string = process.cwd()
): Promise<DiscoveredShowcase[]> {
  const files: DiscoveredShowcase[] = [];
  const seen = new Set<string>();

  for (const pattern of config.showcasePaths) {
    const matches = await glob(pattern, {
      cwd,
      ignore: config.exclude || [],
      absolute: true,
      nodir: true,
    });

    for (const absolutePath of matches) {
      // Avoid duplicates
      if (seen.has(absolutePath)) continue;
      seen.add(absolutePath);

      const relativePath = relative(cwd, absolutePath);
      const importPath = absolutePath.startsWith('/')
        ? absolutePath
        : `./${relativePath}`;

      files.push({
        absolutePath,
        relativePath,
        importPath,
      });
    }
  }

  return files;
}

/**
 * Group showcase files by their parent component/folder
 */
export function groupShowcaseFiles(files: DiscoveredShowcase[]): Record<string, DiscoveredShowcase[]> {
  const groups: Record<string, DiscoveredShowcase[]> = {};

  for (const file of files) {
    // Extract component name from filename
    // e.g., "Button.showcase.tsx" -> "Button"
    const fileName = file.relativePath.split('/').pop() || '';
    const componentName = fileName.replace('.showcase.tsx', '').replace('.showcase.jsx', '');

    if (!groups[componentName]) {
      groups[componentName] = [];
    }

    groups[componentName].push(file);
  }

  return groups;
}

/**
 * Parse a showcase file to extract metadata and exports
 */
export async function parseShowcaseFile(filePath: string) {
  try {
    const module = await import(filePath);

    // Extract default export (metadata)
    const metadata = module.default || {};

    // Extract all named exports (showcase variants)
    const variants: Record<string, any> = {};
    for (const [key, value] of Object.entries(module)) {
      if (key !== 'default' && typeof value === 'function') {
        variants[key] = value;
      }
    }

    return {
      metadata,
      variants,
    };
  } catch (error) {
    console.error(`Failed to parse showcase file: ${filePath}`, error);
    return {
      metadata: {},
      variants: {},
    };
  }
}
