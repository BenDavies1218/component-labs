import type { ComponentDoc } from "../../types/docs";

export const switchDocs: ComponentDoc = {
  name: "Switch",
  description: "Toggle switch for boolean settings, built on Ariakit for accessibility.",
  category: "Inputs",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Switch } from "@component-labs/ui";

<Switch label="Enable notifications" />`,
  props: [
    {
      name: "variant",
      type: "'default' | 'success'",
      description: "Visual style variant",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size of the switch",
      default: "'md'",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label text to display next to the switch",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Description text to display below the label",
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
      description: "Whether the switch is disabled",
      default: "false",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLInputElement>) => void",
      description: "Callback when switch state changes",
    },
  ],
  examples: [
    {
      title: "Basic Switch",
      code: `<Switch label="Enable notifications" />`,
      description: "Simple toggle switch",
    },
    {
      title: "With Description",
      code: `<Switch
  label="Marketing emails"
  description="Receive updates about new features and products"
/>`,
      description: "Switch with additional description",
    },
    {
      title: "Sizes",
      code: `<div className="flex flex-col gap-4">
  <Switch size="sm" label="Small switch" />
  <Switch size="md" label="Medium switch" />
  <Switch size="lg" label="Large switch" />
</div>`,
      description: "Different switch sizes",
    },
    {
      title: "Variants",
      code: `<div className="flex flex-col gap-4">
  <Switch variant="default" label="Default variant" defaultChecked />
  <Switch variant="success" label="Success variant" defaultChecked />
</div>`,
      description: "Available visual variants",
    },
    {
      title: "Controlled",
      code: `const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  label="Controlled switch"
/>`,
      description: "Using switch in controlled mode",
    },
    {
      title: "Disabled State",
      code: `<Switch label="Disabled switch" disabled />`,
      description: "Switch in disabled state",
    },
  ],
  accessibility: [
    "Built on Ariakit's accessible Switch component",
    "Proper ARIA attributes (role='switch', aria-checked)",
    "Keyboard accessible (Space to toggle)",
    "Focus visible states with ring indicator",
    "Screen reader announcements for state changes",
  ],
  relatedComponents: ["Checkbox"],
};
