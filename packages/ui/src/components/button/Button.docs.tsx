import type { ComponentDoc } from "../../types/docs";
import { Button } from "./Button";

export const buttonDocs: ComponentDoc = {
  name: "Button",
  description:
    "Interactive button with multiple variants and sizes, built on Ariakit for accessibility.",
  category: "Inputs",
  installation: `npx @component-labs/cli add button

This will:
- Install required dependencies (@ariakit/react, class-variance-authority, lucide-react)
- Copy the Button component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\`

Then add the base styles to your globals.css:
\`\`\`css
@import "@component-labs/ui/base";
\`\`\``,
  usage: `import { Button } from "@component-labs/ui";

<Button>Click me</Button>`,
  props: [
    {
      name: "variant",
      type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'",
      description: "Visual style variant of the button",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'icon'",
      description: "Size of the button",
      default: "'md'",
    },
    {
      name: "fullWidth",
      type: "boolean",
      description: "Whether the button should take full width of its container",
      default: "false",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the button is disabled",
      default: "false",
    },
    {
      name: "loading",
      type: "boolean",
      description:
        "Loading state - shows loading indicator and disables the button",
      default: "false",
    },
    {
      name: "loadingIndicator",
      type: "ReactNode",
      description: "Custom loading indicator element",
    },
    {
      name: "startIcon",
      type: "ReactNode",
      description: "Icon to display before the button text",
    },
    {
      name: "endIcon",
      type: "ReactNode",
      description: "Icon to display after the button text",
    },
  ],
  examples: [
    {
      title: "Default Button",
      code: `<Button>Click me</Button>`,
      description: "Basic button with default styling",
    },
    {
      title: "Button Sizes",
      code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
      description: "Available size options",
    },
    {
      title: "With Icons",
      code: `<div className="flex gap-2">
  <Button startIcon={<Icon />}>Start Icon</Button>
  <Button endIcon={<Icon />}>End Icon</Button>
  <Button size="icon"><Icon /></Button>
</div>`,
      description: "Buttons with icon support",
    },
    {
      title: "Loading State",
      code: `<Button loading>Loading...</Button>`,
      description: "Button with loading spinner",
    },
    {
      title: "Full Width",
      code: `<Button fullWidth>Full Width Button</Button>`,
      description: "Button that spans the full width of its container",
    },
  ],
  accessibility: [
    "Built with accessibility in mind",
    "Keyboard navigation support (Enter and Space keys)",
    "Proper ARIA attributes automatically applied",
    "Focus visible states with ring indicator",
    "Disabled state prevents interaction and updates ARIA",
  ],
  status: "stable",
  version: "1.0.0",
  performance: {
    bundleSize: "3.2 KB (gzipped)",
    renderTime: "~0.5ms average",
    rerenderOptimization: [
      "Minimal re-renders with stable className generation using CVA",
      "Icon components are memoized to prevent unnecessary updates",
      "Uses React.forwardRef for better composition",
      "Loading state uses CSS animations instead of JavaScript",
    ],
  },
  preview: () => (
    <div className="space-y-6">
      {/* Variants */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Variants
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Sizes
        </h3>
        <div className="flex items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          States
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};
