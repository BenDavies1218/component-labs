import { Button, ButtonProps } from "./Button.Primative";

// Showcase Configuration
export default {
  title: "Button",
  component: Button,
};

// Interactive playground with controls
export function Playground(props: ButtonProps) {
  const { children, ...buttonProps } = props;

  return <Button {...buttonProps}>{children}</Button>;
}

Playground.props = {
  variant: {
    type: "select",
    options: [
      "default",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "link",
    ],
    default: "default",
  },
  size: {
    type: "select",
    options: ["sm", "md", "lg", "icon"],
    default: "md",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
  loading: {
    type: "boolean",
    default: false,
  },
  fullWidth: {
    type: "boolean",
    default: false,
  },
  children: {
    label: "Text",
    type: "string",
    default: "Click me",
  },
  endIcon: {
    type: "select",
    default: "",
    options: ["", "🔐", "🔑", "💱"],
  },
};
