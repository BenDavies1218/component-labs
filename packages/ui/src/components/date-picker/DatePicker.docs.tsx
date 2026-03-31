import type { ComponentDoc } from "../../types/docs";
import { DatePicker } from "./DatePicker";

export const datePickerDocs: ComponentDoc = {
  name: "DatePicker",
  description:
    "Accessible date picker with a popover calendar for selecting a single date.",
  category: "Inputs",
  installation: `npx @component-labs/cli add date-picker

This will:
- Install required dependencies (@ariakit/react, class-variance-authority, lucide-react)
- Copy the DatePicker component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { DatePicker } from "@component-labs/ui";

<DatePicker placeholder="Pick a date" />`,
  props: [
    {
      name: "value",
      type: "Date",
      description: "Controlled selected date",
    },
    {
      name: "defaultValue",
      type: "Date",
      description: "Default selected date (uncontrolled)",
    },
    {
      name: "onChange",
      type: "(date: Date) => void",
      description: "Called when a date is selected",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Pick a date…"',
      description: "Placeholder text when no date is selected",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the picker is disabled",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label displayed above the trigger",
    },
    {
      name: "error",
      type: "string",
      description: "Error message — switches trigger to error variant",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the wrapper",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "Simple date picker",
      code: `<DatePicker placeholder="Pick a date" />`,
    },
    {
      title: "With Label",
      description: "Date picker with a label",
      code: `<DatePicker label="Date of birth" placeholder="Select date" />`,
    },
    {
      title: "With Default Value",
      description: "Pre-selected date",
      code: `<DatePicker defaultValue={new Date(2025, 0, 15)} />`,
    },
    {
      title: "Controlled",
      description: "Controlled date picker",
      code: `const [date, setDate] = useState<Date>();

<DatePicker
  value={date}
  onChange={setDate}
  label="Appointment date"
/>
{date && <p>Selected: {date.toDateString()}</p>}`,
    },
    {
      title: "With Error",
      description: "Date picker with validation error",
      code: `<DatePicker
  label="Required field"
  error="Please select a date"
/>`,
    },
    {
      title: "Disabled",
      description: "Disabled date picker",
      code: `<DatePicker
  disabled
  defaultValue={new Date()}
  label="Disabled"
/>`,
    },
  ],
  accessibility: [
    "Built on Ariakit Popover for accessible disclosure pattern",
    "Keyboard navigation: Enter/Space opens calendar, Escape closes",
    "ARIA attributes automatically applied to trigger and popover",
    "Today highlighted visually for orientation",
    "Disabled state prevents interaction and updates ARIA",
  ],
  status: "stable",
  version: "1.0.0",
  performance: {
    bundleSize: "~5KB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  preview: () => (
    <div className="space-y-4 max-w-sm">
      <DatePicker label="Select a date" placeholder="Pick a date…" />
      <DatePicker
        label="With default value"
        defaultValue={new Date(2025, 0, 15)}
      />
    </div>
  ),
};
