import type { ComponentDoc } from "../../types/docs";

export const checkboxDocs: ComponentDoc = {
  name: "Checkbox",
  description: "Accessible checkbox with indeterminate state support, built on Ariakit.",
  category: "Inputs",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Checkbox } from "@component-labs/ui";

<Checkbox label="Accept terms" />`,
  props: [
    {
      name: "variant",
      type: "'default' | 'outline'",
      description: "Visual style variant of the checkbox",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size of the checkbox",
      default: "'md'",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label text to display next to the checkbox",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Description text to display below the label",
    },
    {
      name: "checkIcon",
      type: "ReactNode",
      description: "Custom check icon to replace the default",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Controlled checked state",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "Default checked state for uncontrolled usage",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the checkbox is disabled",
      default: "false",
    },
  ],
  examples: [
    {
      title: "Basic Checkbox",
      code: `<Checkbox label="I agree to the terms and conditions" />`,
      description: "Simple checkbox with a label",
    },
    {
      title: "With Description",
      code: `<Checkbox
  label="Marketing emails"
  description="Receive updates about new features and products"
/>`,
      description: "Checkbox with additional description text",
    },
    {
      title: "Sizes",
      code: `<div className="flex flex-col gap-4">
  <Checkbox size="sm" label="Small checkbox" />
  <Checkbox size="md" label="Medium checkbox" />
  <Checkbox size="lg" label="Large checkbox" />
</div>`,
      description: "Different checkbox sizes",
    },
    {
      title: "Variants",
      code: `<div className="flex flex-col gap-4">
  <Checkbox variant="default" label="Default variant" />
  <Checkbox variant="outline" label="Outline variant" />
</div>`,
      description: "Available visual variants",
    },
    {
      title: "Controlled",
      code: `const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Controlled checkbox"
/>`,
      description: "Using checkbox in controlled mode",
    },
    {
      title: "Disabled State",
      code: `<Checkbox label="Disabled checkbox" disabled />`,
      description: "Checkbox in disabled state",
    },
  ],
  accessibility: [
    "Built on Ariakit's accessible Checkbox component",
    "Proper ARIA attributes (aria-checked, aria-disabled)",
    "Keyboard accessible (Space to toggle)",
    "Focus visible states with ring indicator",
    "Screen reader announcements for state changes",
    "Supports indeterminate state",
  ],
};
