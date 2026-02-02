import type { RegistryEntry } from "../schema";
import { readFileSync } from "fs";
import { resolve } from "path";

// Read the actual component file
const buttonContent = readFileSync(
  resolve(process.cwd(), "../ui/src/components/button/Button.tsx"),
  "utf-8"
);

const utilsContent = readFileSync(
  resolve(process.cwd(), "../ui/src/lib/utils.ts"),
  "utf-8"
);

export const button: RegistryEntry = {
  name: "button",
  type: "components:ui",
  description: "Interactive button with multiple variants and sizes, built on Ariakit for accessibility.",
  dependencies: [
    "@ariakit/react",
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/button.tsx",
      content: buttonContent,
      type: "registry:ui",
      target: "components/ui/button.tsx"
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts"
    }
  ],
  tailwind: {
    config: {
      theme: {
        extend: {}
      }
    }
  },
  meta: {
    importSpecifier: "Button",
    moduleSpecifier: "@/components/ui/button"
  }
};
