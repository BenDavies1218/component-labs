import type { ComponentDoc } from "../../types/docs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

export const cardDocs: ComponentDoc = {
  name: "Card",
  description:
    "Flexible container component for grouping related content with optional header, content, and footer sections",
  category: "Layout",
  installation: `npx @component-labs/cli add card

This will:
- Install required dependencies
- Copy the Card component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@component-labs/ui";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
  props: [
    {
      name: "Card.variant",
      type: '"default" | "elevated" | "outline"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "Card.hoverable",
      type: "boolean",
      default: "false",
      description: "Whether the card has hover effects (for interactive cards)",
    },
    {
      name: "CardHeader",
      type: "Component",
      description: "Container for card header content (title and description)",
    },
    {
      name: "CardTitle.as",
      type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
      default: '"h3"',
      description: "HTML heading level",
    },
    {
      name: "CardDescription",
      type: "Component",
      description: "Optional description text below the title",
    },
    {
      name: "CardContent",
      type: "Component",
      description: "Main content area of the card",
    },
    {
      name: "CardFooter",
      type: "Component",
      description: "Footer area for actions or metadata",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (applies to all components)",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "Simple card with content",
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
    },
    {
      title: "With Footer",
      description: "Card with actions in the footer",
      code: `<Card>
  <CardHeader>
    <CardTitle>Create Project</CardTitle>
    <CardDescription>
      Deploy your new project in one-click.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Input placeholder="Project name" />
  </CardContent>
  <CardFooter>
    <Button>Create</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Elevated",
      description: "Card with shadow",
      code: `<Card variant="elevated">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Message content...</p>
  </CardContent>
</Card>`,
    },
    {
      title: "Outline",
      description: "Card with prominent border",
      code: `<Card variant="outline">
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Configuration options...</p>
  </CardContent>
</Card>`,
    },
    {
      title: "Hoverable",
      description: "Interactive card with hover effect",
      code: `<Card hoverable onClick={() => navigate('/details')}>
  <CardHeader>
    <CardTitle>Product Card</CardTitle>
    <CardDescription>Click to view details</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Product information...</p>
  </CardContent>
</Card>`,
    },
    {
      title: "Custom Heading Level",
      description: "Card with custom heading semantics",
      code: `<Card>
  <CardHeader>
    <CardTitle as="h2">Main Section</CardTitle>
    <CardDescription>Important content</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content...</p>
  </CardContent>
</Card>`,
    },
  ],
  accessibility: [
    "Semantic HTML structure",
    "Proper heading hierarchy",
    "Keyboard accessible when interactive",
    "Screen reader friendly",
  ],
  performance: {
    bundleSize: "~1.5KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>A simple card with default styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content goes here.</p>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Card with shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This card has elevation.</p>
        </CardContent>
        <CardFooter>
          <span className="text-xs text-black/50 dark:text-white/50">With footer</span>
        </CardFooter>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Card with prominent border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This card has a border.</p>
        </CardContent>
      </Card>
      <Card hoverable>
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
          <CardDescription>Interactive card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Hover over me!</p>
        </CardContent>
      </Card>
    </div>
  ),
};
