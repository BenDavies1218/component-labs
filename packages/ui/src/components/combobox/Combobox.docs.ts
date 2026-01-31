import type { ComponentDoc } from "../../types/docs";

export const comboboxDocs: ComponentDoc = {
  name: "Combobox",
  description: "Searchable select with autocomplete functionality, built on Ariakit for accessibility.",
  category: "Navigation",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Combobox } from "@component-labs/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

<Combobox options={options} placeholder="Select fruit..." />`,
  props: [
    {
      name: "options",
      type: "ComboboxOption[]",
      description: "Array of options to display in the dropdown",
      required: true,
    },
    {
      name: "variant",
      type: "'default' | 'outline'",
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
      type: "string",
      description: "Label text above the combobox",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text for the input",
    },
    {
      name: "showClear",
      type: "boolean",
      description: "Show clear button when value is not empty",
      default: "true",
    },
    {
      name: "filterFn",
      type: "(options: ComboboxOption[], searchValue: string) => ComboboxOption[]",
      description: "Custom filter function for options",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Callback when search value changes",
    },
    {
      name: "onSelectOption",
      type: "(value: string) => void",
      description: "Callback when an option is selected",
    },
    {
      name: "emptyMessage",
      type: "string",
      description: "Message to display when no results found",
      default: "'No results found'",
    },
    {
      name: "renderItem",
      type: "(option: ComboboxOption) => ReactNode",
      description: "Custom render function for items",
    },
  ],
  examples: [
    {
      title: "Basic Combobox",
      code: `const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Combobox
  label="Select a fruit"
  placeholder="Search fruits..."
  options={fruits}
/>`,
      description: "Simple searchable select",
    },
    {
      title: "With Custom Filter",
      code: `const customFilter = (options, search) => {
  return options.filter(opt =>
    opt.label.toLowerCase().startsWith(search.toLowerCase())
  );
};

<Combobox
  options={fruits}
  filterFn={customFilter}
  placeholder="Type to search..."
/>`,
      description: "Using custom filter logic",
    },
    {
      title: "Controlled Selection",
      code: `const [selected, setSelected] = useState("");

<Combobox
  options={fruits}
  onSelectOption={(value) => {
    setSelected(value);
    console.log("Selected:", value);
  }}
  placeholder="Choose..."
/>`,
      description: "Handle selection changes",
    },
    {
      title: "Custom Item Rendering",
      code: `<Combobox
  options={users}
  renderItem={(option) => (
    <div className="flex items-center gap-2">
      <Avatar src={option.avatar} />
      <span>{option.label}</span>
    </div>
  )}
/>`,
      description: "Customize how items are rendered",
    },
  ],
  accessibility: [
    "Built on Ariakit's accessible Combobox component",
    "Keyboard navigation (Arrow keys, Enter, Escape)",
    "Proper ARIA attributes (aria-autocomplete, aria-expanded)",
    "Screen reader support with announcements",
    "Focus management",
    "Type-ahead functionality",
  ],
  relatedComponents: ["Menu", "Command"],
};
