import { Combobox, ComboboxProps } from "./Combobox";

// Showcase Configuration
export default {
  title: "Combobox",
  component: Combobox,
};

// Sample options for the playground
const sampleOptions = [
  { value: "new-york", label: "New York" },
  { value: "london", label: "London" },
  { value: "tokyo", label: "Tokyo" },
  { value: "paris", label: "Paris" },
  { value: "sydney", label: "Sydney" },
  { value: "berlin", label: "Berlin" },
  { value: "toronto", label: "Toronto" },
  { value: "singapore", label: "Singapore" },
  { value: "dubai", label: "Dubai" },
  { value: "barcelona", label: "Barcelona" },
];

// Interactive playground with controls
export function Playground(props: ComboboxProps) {
  return <Combobox {...props} options={sampleOptions} />;
}

Playground.props = {
  variant: {
    type: "select",
    options: ["default", "outline"],
    default: "default",
  },
  size: {
    type: "select",
    options: ["sm", "md", "lg"],
    default: "md",
  },
  label: {
    type: "string",
    default: "Select a city",
  },
  placeholder: {
    type: "string",
    default: "Search cities...",
  },
  showClear: {
    type: "boolean",
    default: true,
  },
  emptyMessage: {
    type: "string",
    default: "No results found",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
};
