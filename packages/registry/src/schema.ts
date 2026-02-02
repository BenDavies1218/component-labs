export interface RegistryEntry {
  name: string;
  type: "components:ui" | "components:component" | "components:example";
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    content: string;
    type: "registry:ui" | "registry:component" | "registry:lib" | "registry:hook";
    target?: string;
  }[];
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  meta?: {
    importSpecifier?: string;
    moduleSpecifier?: string;
  };
}

export interface Registry {
  [key: string]: RegistryEntry;
}
