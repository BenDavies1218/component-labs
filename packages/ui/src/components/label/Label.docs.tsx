import type { ComponentDoc } from "../../types/docs";
import { Label } from "./Label";

export const labelDocs: ComponentDoc = {
  name: "Label",
  description:
    "Accessible label component for form fields with support for required indicators and variants",
  category: "Inputs",
  installation: `npx @component-labs/cli add label

This will:
- Install required dependencies
- Copy the Label component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Label } from "@component-labs/ui";

<Label htmlFor="email">Email</Label>
<Input id="email" />`,
  props: [
    {
      name: "variant",
      type: '"default" | "error" | "muted"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "required",
      type: "boolean",
      default: "false",
      description: "Shows a red asterisk (*) indicator",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Applies disabled styling",
    },
    {
      name: "htmlFor",
      type: "string",
      description: "ID of the associated form element",
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
      description: "A simple label",
      code: `<Label htmlFor="email">Email</Label>
<Input id="email" />`,
    },
    {
      title: "Required Field",
      description: "Label with required indicator",
      code: `<Label htmlFor="password" required>
  Password
</Label>
<Input id="password" type="password" />`,
    },
    {
      title: "Error State",
      description: "Label with error styling",
      code: `<Label htmlFor="username" variant="error" required>
  Username
</Label>
<Input id="username" error="Username is already taken" />`,
    },
    {
      title: "Muted",
      description: "Label with muted styling",
      code: `<Label htmlFor="bio" variant="muted">
  Bio (optional)
</Label>
<Textarea id="bio" />`,
    },
    {
      title: "Disabled",
      description: "Label for disabled field",
      code: `<Label htmlFor="readonly" disabled>
  Readonly Field
</Label>
<Input id="readonly" disabled />`,
    },
  ],
  accessibility: [
    "Proper association with form elements via htmlFor",
    "Screen reader support",
    "Visual indicators for required fields",
    "Accessible error state styling",
  ],
  performance: {
    bundleSize: "~1KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Label>Default Label</Label>
      </div>
      <div>
        <Label required>Required Field</Label>
      </div>
      <div>
        <Label variant="error">Error Label</Label>
      </div>
      <div>
        <Label variant="muted">Muted Label</Label>
      </div>
    </div>
  ),
};
