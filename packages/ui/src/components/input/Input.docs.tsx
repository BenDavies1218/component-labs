
import type { ComponentDoc } from "../../types/docs";
import { Input } from "./Input";

export const inputDocs: ComponentDoc = {
  name: "Input",
  description: "Text input with validation, icon support, and accessible states.",
  category: "Inputs",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Input } from "@component-labs/ui";

<Input placeholder="Enter your email" />`,
  props: [
    {
      name: "variant",
      type: "'default' | 'outline' | 'error'",
      description: "Visual style variant",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size of the input",
      default: "'md'",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label text above the input",
    },
    {
      name: "helperText",
      type: "ReactNode",
      description: "Helper text below the input",
    },
    {
      name: "error",
      type: "string",
      description: "Error message (automatically sets variant to error)",
    },
    {
      name: "startIcon",
      type: "ReactNode",
      description: "Icon to display before the input text",
    },
    {
      name: "endIcon",
      type: "ReactNode",
      description: "Icon to display after the input text",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the input is disabled",
      default: "false",
    },
  ],
  examples: [
    {
      title: "Basic Input",
      code: `<Input placeholder="Enter your email" />`,
      description: "Simple text input",
    },
    {
      title: "With Label",
      code: `<Input
  label="Email Address"
  placeholder="you@example.com"
  type="email"
/>`,
      description: "Input with label",
    },
    {
      title: "With Helper Text",
      code: `<Input
  label="Username"
  helperText="Must be unique and at least 3 characters"
  placeholder="johndoe"
/>`,
      description: "Input with helper text",
    },
    {
      title: "With Error",
      code: `<Input
  label="Email"
  error="Please enter a valid email address"
  value="invalid-email"
/>`,
      description: "Input with error state",
    },
    {
      title: "With Icons",
      code: `<div className="space-y-4">
  <Input
    label="Search"
    placeholder="Search..."
    startIcon={<SearchIcon />}
  />
  <Input
    label="Password"
    type="password"
    endIcon={<EyeIcon />}
  />
</div>`,
      description: "Inputs with start and end icons",
    },
    {
      title: "Sizes",
      code: `<div className="space-y-4">
  <Input size="sm" placeholder="Small input" />
  <Input size="md" placeholder="Medium input" />
  <Input size="lg" placeholder="Large input" />
</div>`,
      description: "Different input sizes",
    },
    {
      title: "Disabled State",
      code: `<Input
  label="Disabled Input"
  placeholder="Cannot edit"
  disabled
/>`,
      description: "Disabled input",
    },
  ],
  accessibility: [
    "Proper label association with input",
    "ARIA attributes for error states",
    "Focus visible states with ring indicator",
    "Disabled state prevents interaction",
    "Helper text announced by screen readers",
  ],
  performance: {
    bundleSize: "~2kB gzipped",
    dependencies: ["class-variance-authority"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => <Input placeholder="Enter your email" label="Email" />,
};
