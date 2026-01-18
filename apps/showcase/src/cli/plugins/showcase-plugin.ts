import type { Plugin } from "vite";
import {
  discoverShowcaseFiles,
  generateShowcaseModule,
} from "../../utils/discovery.js";
import type { ShowcaseConfig } from "../../config/schema.js";
import { resolve } from "path";
import { existsSync } from "fs";
import pc from "picocolors";

const VIRTUAL_MODULE_ID = "virtual:showcase-files";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

const PROVIDER_MODULE_ID = "virtual:global-provider";
const RESOLVED_PROVIDER_MODULE_ID = "\0" + PROVIDER_MODULE_ID;

/**
 * Vite plugin that creates a virtual module with all discovered showcase files
 */
export function showcasePlugin(config: ShowcaseConfig, cwd: string): Plugin {
  let showcaseModuleContent = "";

  return {
    name: "showcase-plugin",

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
      if (id === PROVIDER_MODULE_ID) {
        return RESOLVED_PROVIDER_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return showcaseModuleContent;
      }
      if (id === RESOLVED_PROVIDER_MODULE_ID) {
        if (config.globalProvider) {
          const providerPath = resolve(cwd, config.globalProvider);

          // Check if the file exists
          if (!existsSync(providerPath)) {
            const errorMessage = `
╔════════════════════════════════════════════════════════════════════════════╗
║ ${pc.red("Global Provider Error")}                                                      ║
╟────────────────────────────────────────────────────────────────────────────╢
║ The global provider file specified in showcase.config.ts does not exist:  ║
║                                                                            ║
║ ${pc.yellow("Config path:")} ${config.globalProvider.padEnd(57)}║
║ ${pc.yellow("Resolved to:")} ${providerPath.padEnd(56)}║
║                                                                            ║
║ ${pc.cyan("Solutions:")}                                                              ║
║ 1. Create the provider file at the specified path                         ║
║ 2. Update the globalProvider path in showcase.config.ts                   ║
║ 3. Remove the globalProvider option if not needed                         ║
║                                                                            ║
║ ${pc.cyan("Example provider file:")}                                                  ║
║ ${pc.dim("export default function GlobalProvider({ children }) {")}                ║
║ ${pc.dim("  return <>{children}</>;")}                                              ║
║ ${pc.dim("}")}                                                                      ║
╚════════════════════════════════════════════════════════════════════════════╝
            `.trim();

            console.error("\n" + errorMessage + "\n");

            // Return a helpful error component
            return `
              export const GlobalProvider = ({ children }) => {
                return (
                  <div style={{
                    padding: '2rem',
                    margin: '2rem',
                    background: '#fee',
                    border: '2px solid #c00',
                    borderRadius: '8px',
                    fontFamily: 'monospace'
                  }}>
                    <h2>⚠️ Global Provider Error, Path doesn't exist</h2>
                    <p>The global provider file does not exist:</p>
                    <code style={{
                      display: 'block',
                      padding: '0.5rem',
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '1rem'
                    }}>${providerPath}</code>
                    <p>Check your <strong>showcase.config.ts</strong> file and ensure the globalProvider path is correct.</p>
                    <hr />
                    {children}
                  </div>
                );
              };
              export const hasGlobalProvider = false;
            `.trim();
          }

          return `
            import Provider from '${providerPath}';
            export { Provider as GlobalProvider };
            export const hasGlobalProvider = true;
          `.trim();
        } else {
          // No provider configured - export a passthrough component
          return `
            export const GlobalProvider = ({ children }) => children;
            export const hasGlobalProvider = false;
          `.trim();
        }
      }
    },

    async handleHotUpdate({ file, server }) {
      // If a showcase file changes, regenerate the virtual module
      if (file.endsWith(".showcase.ts") || file.endsWith(".showcase.tsx")) {
        const files = await discoverShowcaseFiles(config, cwd);
        showcaseModuleContent = generateShowcaseModule(files);

        // Invalidate the virtual module
        const module = server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_MODULE_ID,
        );
        if (module) {
          server.moduleGraph.invalidateModule(module);
        }

        // Trigger HMR
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}
