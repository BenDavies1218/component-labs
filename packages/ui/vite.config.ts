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
        alert: resolve(__dirname, "src/alert.ts"),
        badge: resolve(__dirname, "src/badge.ts"),
        button: resolve(__dirname, "src/button.ts"),
        card: resolve(__dirname, "src/card.ts"),
        checkbox: resolve(__dirname, "src/checkbox.ts"),
        combobox: resolve(__dirname, "src/combobox.ts"),
        "data-table": resolve(__dirname, "src/data-table.ts"),
        dialog: resolve(__dirname, "src/dialog.ts"),
        input: resolve(__dirname, "src/input.ts"),
        label: resolve(__dirname, "src/label.ts"),
        menu: resolve(__dirname, "src/menu.ts"),
        radio: resolve(__dirname, "src/radio.ts"),
        select: resolve(__dirname, "src/select.ts"),
        switch: resolve(__dirname, "src/switch.ts"),
        tabs: resolve(__dirname, "src/tabs.ts"),
        textarea: resolve(__dirname, "src/textarea.ts"),
        toast: resolve(__dirname, "src/toast.ts"),
        tooltip: resolve(__dirname, "src/tooltip.ts"),
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
