import { Button } from "./Button";

// Showcase Configuration
export default {
  title: "Button",
  component: Button,
  params: {
    id: String,
    isOpen: Boolean,
    setOpen: () => {},
  },
};

// Showcase Variants
export function Default() {
  return <Button>Button</Button>;
}

export function Primary() {
  return <Button variant="primary">Primary</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Secondary</Button>;
}

export function Outline() {
  return <Button variant="outline">Outline</Button>;
}

export function Ghost() {
  return <Button variant="ghost">Ghost</Button>;
}

export function Destructive() {
  return <Button variant="destructive">Destructive</Button>;
}

export function Link() {
  return <Button variant="link">Link</Button>;
}

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">→</Button>
    </div>
  );
}

export function States() {
  return (
    <div className="flex gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  );
}

export function FullWidth() {
  return (
    <div className="w-full max-w-md">
      <Button fullWidth>Full Width Button</Button>
    </div>
  );
}

export function AllVariants() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Sizes</h3>
        <div className="flex gap-2 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">→</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">States</h3>
        <div className="flex gap-2">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Width</h3>
        <Button fullWidth>Full Width</Button>
      </div>
    </div>
  );
}

// Optional: Add interactive playground with controls
export function Playground() {
  return <Button>Click me</Button>;
}

// Optional: Configure which props can be controlled in the playground
Playground.controls = {
  variant: {
    type: "select",
    options: [
      "default",
      "primary",
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
    type: "text",
    default: "Click me",
  },
};
