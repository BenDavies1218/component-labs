import type { Plugin } from 'vite';
import { discoverShowcaseFiles, generateShowcaseModule } from '../../utils/discovery.js';
import type { ShowcaseConfig } from '../../config/schema.js';

const VIRTUAL_MODULE_ID = 'virtual:showcase-files';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

/**
 * Vite plugin that creates a virtual module with all discovered showcase files
 */
export function showcasePlugin(config: ShowcaseConfig, cwd: string): Plugin {
  let showcaseModuleContent = '';

  return {
    name: 'showcase-plugin',

    async buildStart() {
      // Discover all showcase files
      const files = await discoverShowcaseFiles(config, cwd);

      console.log(`📦 Found ${files.length} showcase file(s)`);

      // Generate the virtual module content
      showcaseModuleContent = generateShowcaseModule(files);
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return showcaseModuleContent;
      }
    },

    async handleHotUpdate({ file, server }) {
      // If a showcase file changes, regenerate the virtual module
      if (file.endsWith('.showcase.ts') || file.endsWith('.showcase.tsx')) {
        const files = await discoverShowcaseFiles(config, cwd);
        showcaseModuleContent = generateShowcaseModule(files);

        // Invalidate the virtual module
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
        }

        // Trigger HMR
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
}
