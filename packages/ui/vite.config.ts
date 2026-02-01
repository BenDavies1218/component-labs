import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    tailwindcss(),
  ],
  css: {
    transformer: "lightningcss",
  },
  build: {
    lib: {
      entry: {
        button: resolve(__dirname, "src/button.ts"),
        checkbox: resolve(__dirname, "src/checkbox.ts"),
        combobox: resolve(__dirname, "src/combobox.ts"),
        "data-table": resolve(__dirname, "src/data-table.ts"),
        dialog: resolve(__dirname, "src/dialog.ts"),
        input: resolve(__dirname, "src/input.ts"),
        menu: resolve(__dirname, "src/menu.ts"),
        switch: resolve(__dirname, "src/switch.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: false,
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
