import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { showcasePlugin } from './src/cli/plugins/showcase-plugin.js';
import { loadConfig } from './src/config/loader.js';

export default defineConfig(async () => {
  // Load showcase config
  const config = await loadConfig(process.cwd());

  return {
    plugins: [react(), tailwindcss(), showcasePlugin(config, process.cwd())],
    server: {
      port: 3000,
    },
  };
});
