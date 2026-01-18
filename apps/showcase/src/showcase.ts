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
  component: () => React.ReactElement;
  controls?: Record<string, ControlConfig>;
}

export interface ControlConfig {
  type: "text" | "boolean" | "select" | "number";
  default?: any;
  options?: string[];
}

export interface ShowcaseModule {
  default: {
    title: string;
    component?: React.ComponentType<any>;
  };
  [key: string]: any;
}

/**
 * Parse a showcase module into demos
 * Each named export becomes a demo
 */
function parseShowcase(module: ShowcaseModule): Showcase[] {
  const showcases: Showcase[] = [];
  const meta = module.default;
  const componentTitle = meta.title;

  for (const [key, value] of Object.entries(module)) {
    if (key === "default") continue;

    // Each export should be a function component
    if (typeof value === "function") {
      showcases.push({
        id: `${componentTitle}-${key}`,
        name: key,
        title: `${componentTitle} / ${key}`,
        component: value as () => React.ReactElement,
        controls: (value as any).controls,
      });
    }
  }

  return showcases;
}

// Parse all dynamically loaded showcase modules
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
