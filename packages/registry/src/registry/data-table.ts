import type { RegistryEntry } from "../schema";
import { readFileSync } from "fs";
import { resolve } from "path";

const dataTableContent = readFileSync(
  resolve(process.cwd(), "../ui/src/components/data-table/DataTable.tsx"),
  "utf-8"
);

const utilsContent = readFileSync(
  resolve(process.cwd(), "../ui/src/lib/utils.ts"),
  "utf-8"
);

const intersectionObserverContent = readFileSync(
  resolve(process.cwd(), "../ui/src/lib/IntersectionObserver.tsx"),
  "utf-8"
);

export const dataTable: RegistryEntry = {
  name: "data-table",
  type: "components:ui",
  description: "Accessible data table with sorting, filtering, and infinite scrolling.",
  dependencies: [
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/data-table.tsx",
      content: dataTableContent,
      type: "registry:ui",
      target: "components/ui/data-table.tsx"
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts"
    },
    {
      path: "lib/intersection-observer.tsx",
      content: intersectionObserverContent,
      type: "registry:lib",
      target: "lib/intersection-observer.tsx"
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
    importSpecifier: "DataTable",
    moduleSpecifier: "@/components/ui/data-table"
  }
};
