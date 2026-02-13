import type { ComponentDoc } from "../../types/docs";
import { Select } from "./Select";

export const selectDocs: ComponentDoc = {
  name: "Select",
  description:
    "Accessible dropdown select component for choosing from a list of options. Built with Ariakit.",
  category: "Inputs",
  installation: `npx @component-labs/cli add select

This will:
- Install required dependencies
- Copy the Select component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Select } from "@component-labs/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Select options={options} placeholder="Select a fruit" />`,
  props: [
    {
      name: "options",
      type: "SelectOption[]",
      required: true,
      description:
        "Array of options with { value: string, label: ReactNode, disabled?: boolean }",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Default selected value (uncontrolled)",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Callback when selection changes",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Select an option..."',
      description: "Placeholder text when no value is selected",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the select is disabled",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label for the select",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display",
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
      description: "A simple select dropdown",
      code: `const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Select options={options} placeholder="Select a fruit" />`,
    },
    {
      title: "With Label",
      description: "Select with a label",
      code: `const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

<Select
  options={options}
  label="Country"
  placeholder="Choose your country"
/>`,
    },
    {
      title: "With Error",
      description: "Select with validation error",
      code: `<Select
  options={options}
  label="Required field"
  error="Please select an option"
/>`,
    },
    {
      title: "Controlled",
      description: "Controlled select",
      code: `const [value, setValue] = useState("");

<Select
  options={options}
  value={value}
  onChange={setValue}
  label="Controlled Select"
/>`,
    },
    {
      title: "With Disabled Options",
      description: "Select with some disabled options",
      code: `const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2 (disabled)", disabled: true },
  { value: "option3", label: "Option 3" },
];

<Select options={options} />`,
    },
    {
      title: "Disabled",
      description: "Disabled select",
      code: `<Select
  options={options}
  disabled
  defaultValue="apple"
/>`,
    },
  ],
  accessibility: [
    "Full keyboard navigation support",
    "Proper ARIA attributes for combobox pattern",
    "Screen reader friendly error messages",
    "Focus management and visual indicators",
  ],
  performance: {
    bundleSize: "~4KB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4 max-w-md">
      <Select
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
        ]}
        label="Select a fruit"
        placeholder="Choose..."
      />
      <Select
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
        label="Country"
        defaultValue="us"
      />
    </div>
  ),
};
