import type { ComponentDoc } from "../../types/docs";
import { Tooltip } from "./Tooltip";

export const tooltipDocs: ComponentDoc = {
  name: "Tooltip",
  description:
    "Displays informative text when users hover over or focus on an element. Built with Ariakit.",
  category: "Feedback",
  installation: `npx @component-labs/cli add tooltip

This will:
- Install required dependencies
- Copy the Tooltip component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Tooltip } from "@component-labs/ui";

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`,
  props: [
    {
      name: "content",
      type: "ReactNode",
      required: true,
      description: "Content to display in the tooltip",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Element that triggers the tooltip",
    },
    {
      name: "variant",
      type: '"default" | "inverse"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "showDelay",
      type: "number",
      default: "700",
      description: "Delay before showing tooltip (milliseconds)",
    },
    {
      name: "hideDelay",
      type: "number",
      default: "0",
      description: "Delay before hiding tooltip (milliseconds)",
    },
    {
      name: "placement",
      type: '"top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end"',
      default: '"top"',
      description: "Position of the tooltip relative to trigger",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "Simple tooltip on hover",
      code: `<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`,
    },
    {
      title: "With Text",
      description: "Tooltip on text element",
      code: `<Tooltip content="Additional information">
  <span className="underline cursor-help">Hover for info</span>
</Tooltip>`,
    },
    {
      title: "Different Placements",
      description: "Tooltip in various positions",
      code: `<div className="flex gap-4">
  <Tooltip content="Top tooltip" placement="top">
    <Button>Top</Button>
  </Tooltip>

  <Tooltip content="Bottom tooltip" placement="bottom">
    <Button>Bottom</Button>
  </Tooltip>

  <Tooltip content="Left tooltip" placement="left">
    <Button>Left</Button>
  </Tooltip>

  <Tooltip content="Right tooltip" placement="right">
    <Button>Right</Button>
  </Tooltip>
</div>`,
    },
    {
      title: "Inverse Variant",
      description: "Tooltip with light background",
      code: `<Tooltip content="Light tooltip" variant="inverse">
  <Button>Hover me</Button>
</Tooltip>`,
    },
    {
      title: "Custom Delays",
      description: "Tooltip with custom show/hide delays",
      code: `<Tooltip
  content="Shows instantly, hides after 1s"
  showDelay={0}
  hideDelay={1000}
>
  <Button>Hover me</Button>
</Tooltip>`,
    },
    {
      title: "Rich Content",
      description: "Tooltip with formatted content",
      code: `<Tooltip
  content={
    <div>
      <strong>Pro Tip:</strong>
      <br />
      Use keyboard shortcuts for faster navigation
    </div>
  }
>
  <Button>Learn more</Button>
</Tooltip>`,
    },
    {
      title: "With Icon",
      description: "Tooltip on icon button",
      code: `import { HelpCircle } from "lucide-react";

<Tooltip content="Get help and support">
  <Button variant="ghost" size="icon">
    <HelpCircle className="h-4 w-4" />
  </Button>
</Tooltip>`,
    },
  ],
  accessibility: [
    "Proper ARIA attributes for tooltips",
    "Keyboard accessible (focus triggers tooltip)",
    "Screen reader support",
    "Respects user motion preferences",
  ],
  performance: {
    bundleSize: "~2.5KB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center p-8">
      <Tooltip content="This is a tooltip">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
          Hover me
        </button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="inverse">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
          Inverse
        </button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
          Left
        </button>
      </Tooltip>
    </div>
  ),
};
