import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import pc from "picocolors";
import { loadConfig } from "../../config/loader.js";
import { showcasePlugin } from "../plugins/showcase-plugin.js";

interface BuildOptions {
  config?: string;
  outDir?: string;
}

export async function buildCommand(options: BuildOptions = {}) {
  try {
    // Load config
    const cwd = process.cwd();
    const config = await loadConfig(cwd);

    // Override outDir if provided
    const outDir = options.outDir
      ? resolve(cwd, options.outDir)
      : config.outDir;

    // Build with Vite
    await viteBuild({
      root: resolve(__dirname, "../../../"),
      base: config.base,
      build: {
        outDir,
        emptyOutDir: true,
      },
      plugins: [react(), tailwindcss(), showcasePlugin(config, cwd)],
      resolve: {
        alias: {
          "@showcase-app": resolve(__dirname, "../../../src"),
        },
      },
    });

    console.log("");
    console.log(pc.green(`✓ Build complete: ${outDir}`));
    console.log("");
  } catch (error) {
    console.error(pc.red("✗ Build failed:"));
    console.error(error);
    process.exit(1);
  }
}
