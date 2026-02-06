#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Component list
const components = [
  { name: "button", deps: ["@ariakit/react", "class-variance-authority", "lucide-react", "clsx", "tailwind-merge"] },
  { name: "checkbox", deps: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge"] },
  { name: "input", deps: ["class-variance-authority", "clsx", "tailwind-merge"] },
  { name: "dialog", deps: ["@ariakit/react", "class-variance-authority", "lucide-react", "clsx", "tailwind-merge"] },
  { name: "switch", deps: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge"] },
  { name: "menu", deps: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge"] },
  { name: "combobox", deps: ["@ariakit/react", "class-variance-authority", "lucide-react", "clsx", "tailwind-merge"] },
  { name: "data-table", deps: ["class-variance-authority", "lucide-react", "clsx", "tailwind-merge"] },
];

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRegistryEntry(component: typeof components[0]) {
  const componentPath = resolve(__dirname, `../../ui/src/components/${component.name}/${capitalize(component.name)}.tsx`);
  const utilsPath = resolve(__dirname, "../../ui/src/lib/utils.ts");

  const componentContent = readFileSync(componentPath, "utf-8");
  const utilsContent = readFileSync(utilsPath, "utf-8");

  const content = `import type { RegistryEntry } from "../schema";

const componentContent = ${JSON.stringify(componentContent)};

const utilsContent = ${JSON.stringify(utilsContent)};

export const ${component.name === "switch" ? "switchComponent" : component.name}: RegistryEntry = {
  name: "${component.name}",
  type: "components:ui",
  description: "${capitalize(component.name)} component",
  dependencies: ${JSON.stringify(component.deps)},
  registryDependencies: [],
  files: [
    {
      path: "components/ui/${component.name}.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/${component.name}.tsx"
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
    importSpecifier: "${capitalize(component.name)}",
    moduleSpecifier: "@/components/ui/${component.name}"
  }
};
`;

  const outputPath = resolve(__dirname, `../src/registry/${component.name}.ts`);
  writeFileSync(outputPath, content, "utf-8");
  console.log(`✓ Generated ${component.name}.ts`);
}

// Generate all registry entries
components.forEach(generateRegistryEntry);

console.log("\n✓ Registry generation complete!");
