
import type { ComponentDoc } from "../../types/docs";
import { Menu } from "./Menu";

export const menuDocs: ComponentDoc = {
  name: "Menu",
  description: "Dropdown menu with keyboard navigation and checkbox support, built on Ariakit.",
  category: "Navigation",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Menu } from "@component-labs/ui";

<Menu.Root>
  <Menu.Trigger>Open Menu</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Item 1</Menu.Item>
    <Menu.Item>Item 2</Menu.Item>
  </Menu.Content>
</Menu.Root>`,
  props: [
    {
      name: "variant",
      type: "'default' | 'primary' | 'ghost'",
      description: "Visual style variant of the menu trigger button (Menu.Trigger)",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size of the menu trigger button (Menu.Trigger)",
      default: "'md'",
    },
    {
      name: "showArrow",
      type: "boolean",
      description: "Whether to show arrow icon on trigger (Menu.Trigger)",
      default: "true",
    },
    {
      name: "gutter",
      type: "number",
      description: "Space between trigger and menu content (Menu.Content)",
      default: "8",
    },
  ],
  examples: [
    {
      title: "Basic Menu",
      code: `<Menu.Root>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item>Delete</Menu.Item>
  </Menu.Content>
</Menu.Root>`,
      description: "Simple dropdown menu with items and separator",
    },
    {
      title: "With Checkboxes",
      code: `<Menu.Root>
  <Menu.Trigger>View Options</Menu.Trigger>
  <Menu.Content>
    <Menu.ItemCheckbox defaultChecked>Show toolbar</Menu.ItemCheckbox>
    <Menu.ItemCheckbox>Show sidebar</Menu.ItemCheckbox>
    <Menu.ItemCheckbox defaultChecked>Show footer</Menu.ItemCheckbox>
  </Menu.Content>
</Menu.Root>`,
      description: "Menu with checkbox items for toggleable options",
    },
    {
      title: "Trigger Variants",
      code: `<div className="flex gap-2">
  <Menu.Root>
    <Menu.Trigger variant="default">Default</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Item 1</Menu.Item>
    </Menu.Content>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger variant="primary">Primary</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Item 1</Menu.Item>
    </Menu.Content>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger variant="ghost">Ghost</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Item 1</Menu.Item>
    </Menu.Content>
  </Menu.Root>
</div>`,
      description: "Different trigger button styles",
    },
    {
      title: "Without Arrow",
      code: `<Menu.Root>
  <Menu.Trigger showArrow={false}>No Arrow</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Item 1</Menu.Item>
  </Menu.Content>
</Menu.Root>`,
      description: "Menu trigger without arrow indicator",
    },
  ],
  accessibility: [
    "Built on Ariakit's accessible Menu component",
    "Full keyboard navigation (Arrow keys, Enter, Escape)",
    "Proper ARIA attributes (aria-haspopup, aria-expanded)",
    "Focus management and trap within menu",
    "Screen reader announcements",
    "Automatic focus return to trigger on close",
  ],
  relatedComponents: ["Combobox", "Command"],
  performance: {
    bundleSize: "~5kB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <Menu.Root>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Delete</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};
