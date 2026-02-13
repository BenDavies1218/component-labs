import type { ComponentDoc } from "../../types/docs";
import { Radio, RadioGroup } from "./Radio";

export const radioDocs: ComponentDoc = {
  name: "Radio / RadioGroup",
  description:
    "Accessible radio button components for single selection from a set of options. Built with Ariakit.",
  category: "Inputs",
  installation: `npx @component-labs/cli add radio

This will:
- Install required dependencies
- Copy the Radio component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Radio, RadioGroup } from "@component-labs/ui";

<RadioGroup label="Choose a size" defaultValue="medium">
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>`,
  props: [
    {
      name: "Radio.value",
      type: "string",
      required: true,
      description: "The value of this radio button",
    },
    {
      name: "Radio.label",
      type: "ReactNode",
      description: "Label text for the radio button",
    },
    {
      name: "Radio.description",
      type: "ReactNode",
      description: "Description text shown below the label",
    },
    {
      name: "Radio.error",
      type: "boolean",
      description: "Whether this radio is in an error state",
    },
    {
      name: "Radio.disabled",
      type: "boolean",
      description: "Whether the radio button is disabled",
    },
    {
      name: "RadioGroup.defaultValue",
      type: "string",
      description: "Default selected value (uncontrolled)",
    },
    {
      name: "RadioGroup.value",
      type: "string",
      description: "Controlled selected value",
    },
    {
      name: "RadioGroup.onChange",
      type: "(value: string) => void",
      description: "Callback when selection changes",
    },
    {
      name: "RadioGroup.label",
      type: "ReactNode",
      description: "Label for the radio group",
    },
    {
      name: "RadioGroup.error",
      type: "string",
      description: "Error message to display",
    },
    {
      name: "RadioGroup.className",
      type: "string",
      description: "Additional CSS classes",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "A simple radio group",
      code: `<RadioGroup label="Choose a size" defaultValue="medium">
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>`,
    },
    {
      title: "With Descriptions",
      description: "Radio buttons with helper text",
      code: `<RadioGroup label="Select plan" defaultValue="pro">
  <Radio
    value="free"
    label="Free"
    description="Perfect for trying out"
  />
  <Radio
    value="pro"
    label="Pro"
    description="For professionals"
  />
  <Radio
    value="enterprise"
    label="Enterprise"
    description="For large teams"
  />
</RadioGroup>`,
    },
    {
      title: "With Error",
      description: "Radio group with validation error",
      code: `<RadioGroup
  label="Required selection"
  error="Please select an option"
>
  <Radio value="yes" label="Yes" error />
  <Radio value="no" label="No" error />
</RadioGroup>`,
    },
    {
      title: "Controlled",
      description: "Controlled radio group",
      code: `const [value, setValue] = useState("option1");

<RadioGroup
  label="Controlled"
  value={value}
  onChange={setValue}
>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>`,
    },
    {
      title: "Disabled",
      description: "Disabled radio options",
      code: `<RadioGroup label="With disabled options" defaultValue="enabled">
  <Radio value="enabled" label="Enabled" />
  <Radio value="disabled" label="Disabled" disabled />
</RadioGroup>`,
    },
  ],
  accessibility: [
    "Full keyboard navigation support",
    "Proper ARIA attributes for radio groups",
    "Screen reader friendly error messages",
    "Focus management and visual indicators",
  ],
  performance: {
    bundleSize: "~3KB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-6 max-w-md">
      <RadioGroup label="Choose a size" defaultValue="medium">
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
      <RadioGroup
        label="Select plan"
        defaultValue="pro"
      >
        <Radio
          value="free"
          label="Free"
          description="Perfect for trying out"
        />
        <Radio
          value="pro"
          label="Pro"
          description="For professionals"
        />
      </RadioGroup>
    </div>
  ),
};
