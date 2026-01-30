import { Checkbox, CheckboxProps } from "./Checkbox";

// Showcase Configuration
export default {
  title: "Checkbox",
  component: Checkbox,
};

// Interactive playground with controls
export function Playground(props: CheckboxProps) {
  const { label, description, ...checkboxProps } = props;

  return (
    <Checkbox label={label} description={description} {...checkboxProps} />
  );
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
    default: "I agree to the terms and conditions",
  },
  description: {
    type: "string",
    default: "You must agree to continue",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
};
