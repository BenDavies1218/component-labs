import { useState } from "react";
import { Menu } from "./Menu";

// Showcase Configuration
export default {
  title: "Menu",
  component: Menu,
};

// Basic Menu Example
export function BasicMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger variant="default" size="md">
        Actions
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => alert("Edit clicked")}>Edit</Menu.Item>
        <Menu.Item onClick={() => alert("Share clicked")}>Share</Menu.Item>
        <Menu.Item onClick={() => alert("Delete clicked")}>Delete</Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => alert("Report clicked")}>Report</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

// Menu with Checkbox Items
export function MenuWithCheckbox() {
  const [values, setValues] = useState({ notifications: ["email"] });

  return (
    <Menu.Root
      values={values}
      setValues={setValues as (values: Record<string, string[]>) => void}
    >
      <Menu.Trigger variant="primary" size="md">
        Notifications
      </Menu.Trigger>
      <Menu.Content>
        <Menu.ItemCheckbox name="notifications" value="email">
          Email
        </Menu.ItemCheckbox>
        <Menu.ItemCheckbox name="notifications" value="push">
          Push notifications
        </Menu.ItemCheckbox>
        <Menu.ItemCheckbox name="notifications" value="sms">
          SMS
        </Menu.ItemCheckbox>
        <Menu.ItemCheckbox name="notifications" value="slack">
          Slack
        </Menu.ItemCheckbox>
      </Menu.Content>
    </Menu.Root>
  );
}

// Interactive Playground
export function Playground(props: {
  variant: "default" | "primary" | "ghost";
  size: "sm" | "md" | "lg";
  label: string;
  showArrow: boolean;
}) {
  const { variant, size, label, showArrow } = props;

  return (
    <Menu.Root>
      <Menu.Trigger variant={variant} size={size} showArrow={showArrow}>
        {label}
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => alert("Option 1 clicked")}>
          Option 1
        </Menu.Item>
        <Menu.Item onClick={() => alert("Option 2 clicked")}>
          Option 2
        </Menu.Item>
        <Menu.Item onClick={() => alert("Option 3 clicked")}>
          Option 3
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => alert("Option 4 clicked")}>
          Option 4
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

Playground.props = {
  variant: {
    type: "select",
    options: ["default", "primary", "ghost"],
    default: "default",
  },
  size: {
    type: "select",
    options: ["sm", "md", "lg"],
    default: "md",
  },
  label: {
    type: "string",
    default: "Options",
  },
  showArrow: {
    type: "boolean",
    default: true,
  },
};
