// Import all showcase files
import * as ButtonShowcase from "../../../packages/ui/src/components/Button.showcase";

/**
 * A Demo is just a React component function that renders an example
 * Much simpler than Storybook's story format!
 */
export interface Showcase {
  id: string;
  name: string;
  title: string; // Full title like "Button / Primary"
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
  const demos: Showcase[] = [];
  const meta = module.default;
  const componentTitle = meta.title;

  for (const [key, value] of Object.entries(module)) {
    if (key === "default") continue;

    // Each export should be a function component
    if (typeof value === "function") {
      demos.push({
        id: `${componentTitle}-${key}`,
        name: key,
        title: `${componentTitle} / ${key}`,
        component: value as () => React.ReactElement,
        controls: (value as any).controls,
      });
    }
  }

  return demos;
}

export const allShowcases: Showcase[] = [
  ...parseShowcase(ButtonShowcase as ShowcaseModule),
];

export const showcaseGroups = allShowcases.reduce(
  (groups, demo) => {
    const [component] = demo.title.split(" / ");
    if (!groups[component]) {
      groups[component] = [];
    }
    groups[component].push(demo);
    return groups;
  },
  {} as Record<string, Showcase[]>,
);
