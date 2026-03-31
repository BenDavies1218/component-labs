import type { ComponentDoc } from "../../types/docs";
import { Slider } from "./Slider";

export const sliderDocs: ComponentDoc = {
  name: "Slider",
  description:
    "Accessible range slider for selecting a numeric value between a min and max.",
  category: "Inputs",
  installation: `npx @component-labs/cli add slider

This will:
- Install required dependencies (class-variance-authority)
- Copy the Slider component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Slider } from "@component-labs/ui";

<Slider min={0} max={100} defaultValue={50} />`,
  props: [
    {
      name: "value",
      type: "number",
      description: "Controlled value",
    },
    {
      name: "defaultValue",
      type: "number",
      default: "0",
      description: "Default value (uncontrolled)",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step between values",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Called when value changes",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the slider is disabled",
    },
    {
      name: "label",
      type: "ReactNode",
      description: "Label displayed above the slider",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "false",
      description: "Whether to show the current value next to the label",
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
      description: "Simple slider with default range",
      code: `<Slider defaultValue={50} />`,
    },
    {
      title: "With Label and Value",
      description: "Slider showing current value",
      code: `<Slider label="Volume" showValue defaultValue={75} />`,
    },
    {
      title: "Custom Range",
      description: "Custom min, max and step",
      code: `<Slider label="Price" min={0} max={500} step={10} defaultValue={100} showValue />`,
    },
    {
      title: "Controlled",
      description: "Controlled slider",
      code: `const [vol, setVol] = useState(50);

<Slider
  label="Volume"
  showValue
  value={vol}
  onChange={setVol}
/>`,
    },
    {
      title: "Disabled",
      description: "Disabled slider",
      code: `<Slider label="Disabled" defaultValue={40} disabled />`,
    },
  ],
  accessibility: [
    "Native <input type='range'> for built-in keyboard support (arrow keys, Home, End)",
    "aria-valuemin, aria-valuemax, aria-valuenow always applied",
    "aria-disabled set when disabled",
    "Focus visible ring on thumb",
  ],
  status: "stable",
  version: "1.0.0",
  performance: {
    bundleSize: "~2KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  preview: () => (
    <div className="space-y-6 max-w-sm">
      <Slider label="Volume" showValue defaultValue={60} />
      <Slider label="Brightness" showValue defaultValue={30} />
      <Slider label="Disabled" defaultValue={50} disabled />
    </div>
  ),
};
