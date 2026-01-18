import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { loadConfig } from "../../config/loader.js";
import { showcasePlugin } from "../plugins/showcase-plugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface DevOptions {
  port?: string;
  config?: string;
}

export async function devCommand(options: DevOptions = {}) {
  try {
    // Load config
    const cwd = process.cwd();
    const config = await loadConfig(cwd);

    // Override port if provided
    const port = options.port ? parseInt(options.port, 10) : config.port;

    console.log(pc.cyan("Starting Component Showcase...\n"));

    // Create Vite server with our plugin
    const server = await createServer({
      configFile: false, // Don't load vite.config.ts to avoid duplicate plugins
      root: resolve(__dirname, "../../../"), // Point to showcase app root
      server: {
        port,
        open: true,
      },
      plugins: [react(), tailwindcss(), showcasePlugin(config, cwd)],
      resolve: {
        alias: {
          "@showcase-app": resolve(__dirname, "../../../src"),
          "@": resolve(cwd, "src"), // User's project src directory
        },
      },
    });

    await server.listen();

    console.log("");
    server.printUrls();
    console.log("");
    console.log(
      pc.dim(`  Watching: ${config.showcasePaths?.length} pattern(s)`),
    );
    console.log("");
  } catch (error) {
    console.error(pc.red("✗ Failed to start dev server:"));
    console.error(error);
    process.exit(1);
  }
}
