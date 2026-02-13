
import type { ComponentDoc } from "../../types/docs";
import { Dialog } from "./Dialog";

export const dialogDocs: ComponentDoc = {
  name: "Dialog",
  description: "Modal dialog with focus trap and accessible dismissal, built on Ariakit.",
  category: "Feedback",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { Dialog } from "@component-labs/ui";

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`,
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state (Dialog.Root)",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback when open state changes (Dialog.Root)",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Default open state for uncontrolled usage (Dialog.Root)",
      default: "false",
    },
    {
      name: "backdrop",
      type: "boolean",
      description: "Whether to show the backdrop overlay (Dialog.Content)",
      default: "true",
    },
  ],
  examples: [
    {
      title: "Basic Dialog",
      code: `<Dialog.Root>
  <Dialog.Trigger>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="ghost">Cancel</Button>
      </Dialog.Close>
      <Button variant="destructive">Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`,
      description: "Simple confirmation dialog",
    },
    {
      title: "Controlled Dialog",
      code: `const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Controlled Dialog</Dialog.Title>
    </Dialog.Header>
    <p>Dialog is {open ? 'open' : 'closed'}</p>
  </Dialog.Content>
</Dialog.Root>`,
      description: "Using dialog in controlled mode",
    },
    {
      title: "Form Dialog",
      code: `<Dialog.Root>
  <Dialog.Trigger>
    <Button>Add User</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create Account</Dialog.Title>
      <Dialog.Description>
        Enter user details below
      </Dialog.Description>
    </Dialog.Header>
    <form className="space-y-4">
      <Input label="Name" />
      <Input label="Email" type="email" />
    </form>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="outline">Cancel</Button>
      </Dialog.Close>
      <Button type="submit">Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`,
      description: "Dialog with form content",
    },
  ],
  accessibility: [
    "Built on Ariakit's accessible Dialog component",
    "Focus trap - keeps focus within dialog",
    "Escape key to close",
    "Click outside/backdrop to dismiss",
    "Proper ARIA attributes (role='dialog', aria-modal)",
    "Focus returns to trigger on close",
    "Screen reader announcements",
  ],
  relatedComponents: ["Toast"],
  performance: {
    bundleSize: "~4kB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>This is a dialog description</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
