import type { ComponentDoc } from "../../types/docs";
import { Textarea } from "./Textarea";

export const textareaDocs: ComponentDoc = {
  name: "Textarea",
  description:
    "Multi-line text input component with auto-resize support and validation states",
  category: "Inputs",
  installation: `npx @component-labs/cli add textarea

This will:
- Install required dependencies
- Copy the Textarea component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Textarea } from "@component-labs/ui";

<Textarea placeholder="Enter your message..." />`,
  props: [
    {
      name: "variant",
      type: '"default" | "error"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "resize",
      type: '"none" | "vertical" | "horizontal" | "both"',
      default: '"vertical"',
      description: "Resize behavior (disabled when autoResize is true)",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display",
    },
    {
      name: "autoResize",
      type: "boolean",
      default: "false",
      description:
        "Whether the textarea should automatically resize based on content",
    },
    {
      name: "minRows",
      type: "number",
      default: "3",
      description: "Minimum number of rows when autoResize is enabled",
    },
    {
      name: "maxRows",
      type: "number",
      description: "Maximum number of rows when autoResize is enabled",
    },
    {
      name: "rows",
      type: "number",
      default: "3",
      description: "Number of visible rows (when autoResize is disabled)",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the textarea is disabled",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "A simple textarea",
      code: `<Textarea placeholder="Enter your message..." />`,
    },
    {
      title: "With Error",
      description: "Textarea with error state",
      code: `<Textarea
  error="This field is required"
  placeholder="Required field"
/>`,
    },
    {
      title: "Auto Resize",
      description: "Textarea that grows with content",
      code: `<Textarea
  autoResize
  minRows={3}
  maxRows={10}
  placeholder="Type to see auto-resize..."
/>`,
    },
    {
      title: "Disabled",
      description: "Disabled textarea",
      code: `<Textarea disabled placeholder="Cannot edit" />`,
    },
    {
      title: "No Resize",
      description: "Textarea with resize disabled",
      code: `<Textarea resize="none" rows={5} />`,
    },
  ],
  accessibility: [
    "Proper ARIA attributes for error states",
    "Keyboard navigation support",
    "Focus management",
    "Screen reader friendly error messages",
  ],
  performance: {
    bundleSize: "~2KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4 max-w-md">
      <Textarea placeholder="Default textarea" />
      <Textarea error="This field is required" placeholder="With error" />
      <Textarea autoResize minRows={2} maxRows={6} placeholder="Auto-resize textarea" />
    </div>
  ),
};
