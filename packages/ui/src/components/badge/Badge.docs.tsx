import type { ComponentDoc } from "../../types/docs";
import { Badge } from "./Badge";

export const badgeDocs: ComponentDoc = {
  name: "Badge",
  description:
    "Small status indicator or label component for displaying metadata, tags, or status",
  category: "Feedback",
  installation: `npx @component-labs/cli add badge

This will:
- Install required dependencies
- Copy the Badge component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Badge } from "@component-labs/ui";

<Badge>New</Badge>`,
  props: [
    {
      name: "variant",
      type: '"default" | "primary" | "secondary" | "success" | "error" | "warning" | "info" | "outline"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Badge size",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Icon to display before the text",
    },
    {
      name: "removable",
      type: "boolean",
      default: "false",
      description: "Whether the badge can be removed",
    },
    {
      name: "onRemove",
      type: "() => void",
      description: "Callback when badge is removed",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Badge content",
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
      description: "Simple badge",
      code: `<Badge>New</Badge>`,
    },
    {
      title: "Variants",
      description: "Different badge variants",
      code: `<div className="flex gap-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
    },
    {
      title: "Sizes",
      description: "Different badge sizes",
      code: `<div className="flex items-center gap-2">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>`,
    },
    {
      title: "With Icon",
      description: "Badge with an icon",
      code: `import { Star } from "lucide-react";

<Badge icon={<Star className="h-3 w-3" />}>
  Featured
</Badge>`,
    },
    {
      title: "Removable",
      description: "Badge that can be removed",
      code: `const [tags, setTags] = useState(["React", "TypeScript", "Vite"]);

<div className="flex gap-2">
  {tags.map((tag) => (
    <Badge
      key={tag}
      removable
      onRemove={() => setTags(tags.filter(t => t !== tag))}
    >
      {tag}
    </Badge>
  ))}
</div>`,
    },
    {
      title: "Status Indicators",
      description: "Using badges for status",
      code: `<div className="flex gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="error">Inactive</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="info">Draft</Badge>
</div>`,
    },
  ],
  accessibility: [
    "Semantic HTML elements",
    "Keyboard accessible remove buttons",
    "Screen reader friendly",
    "Proper ARIA labels for interactive badges",
  ],
  performance: {
    bundleSize: "~1.5KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  ),
};
