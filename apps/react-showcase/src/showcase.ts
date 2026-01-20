// Import showcase files dynamically from virtual module
import { showcaseModules } from "virtual:showcase-files";

/**
 * A Showcase is a React component function that renders a demo of a UI component,
 * along with optional control configurations for interactive props.
 */
export interface Showcase {
  id: string;
  name: string;
  title: string;
  component: (props?: any) => React.ReactElement;
  props?: Record<string, PropConfig>;
}

export interface PropConfig {
  type: "string" | "boolean" | "select" | "number" | "object" | "array";
  label?: string; // Optional label for the control
  default?: any; // Default value for the control
  options?: string[]; // For 'select' type, the available options
}

export interface ShowcaseModule {
  default: {
    title: string;
    component?: React.ComponentType<any>;
  };
  [key: string]: any;
}

function parseShowcase(module: ShowcaseModule): Showcase[] {
  const showcases: Showcase[] = [];
  const meta = module.default;
  const componentTitle = meta.title;

  for (const [key, value] of Object.entries(module)) {
    if (key === "default") continue;
    if (typeof value === "function") {
      showcases.push({
        id: `${componentTitle}-${key}`,
        name: key,
        title: `${componentTitle} / ${key}`,
        component: value as () => React.ReactElement,
        props: (value as any).props || {},
      });
    }
  }

  return showcases;
}

export const allShowcases: Showcase[] = showcaseModules.flatMap((module) =>
  parseShowcase(module as ShowcaseModule),
);

export const showcaseGroups = allShowcases.reduce(
  (groups, showcase) => {
    const [component] = showcase.title.split(" / ");
    if (!groups[component]) {
      groups[component] = [];
    }
    groups[component].push(showcase);
    return groups;
  },
  {} as Record<string, Showcase[]>,
);
