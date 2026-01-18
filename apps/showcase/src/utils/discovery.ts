import { glob } from 'glob';
import { relative } from 'path';
import type { ShowcaseConfig } from '../config/schema.js';

export interface DiscoveredShowcase {
  /** Absolute path to the showcase file */
  absolutePath: string;
  /** Relative path from cwd */
  relativePath: string;
  /** Import path for Vite */
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
 * Generate a virtual module content that imports all discovered showcases
 */
export function generateShowcaseModule(files: DiscoveredShowcase[]): string {
  const imports = files.map((file, index) => {
    return `import * as Showcase${index} from '${file.importPath}';`;
  });

  const modules = files.map((_, index) => `Showcase${index}`);

  return `
// Auto-generated showcase imports
${imports.join('\n')}

export const showcaseModules = [
  ${modules.join(',\n  ')}
];

export interface ShowcaseModule {
  default: {
    title: string;
    component?: React.ComponentType<any>;
  };
  [key: string]: any;
}
`;
}
