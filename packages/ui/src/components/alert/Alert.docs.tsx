import type { ComponentDoc } from "../../types/docs";
import { Alert } from "./Alert";

export const alertDocs: ComponentDoc = {
  name: "Alert",
  description:
    "Inline feedback component for displaying important messages to users",
  category: "Feedback",
  installation: `npx @component-labs/cli add alert

This will:
- Install required dependencies
- Copy the Alert component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Alert } from "@component-labs/ui";

<Alert description="This is an informational message" />`,
  props: [
    {
      name: "variant",
      type: '"default" | "success" | "error" | "warning" | "info"',
      default: '"default"',
      description: "Visual style variant",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Alert title",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Alert description/message",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Custom icon to display",
    },
    {
      name: "showIcon",
      type: "boolean",
      default: "true",
      description: "Whether to show the default icon",
    },
    {
      name: "dismissible",
      type: "boolean",
      default: "false",
      description: "Whether the alert can be dismissed",
    },
    {
      name: "onDismiss",
      type: "() => void",
      description: "Callback when alert is dismissed",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "Simple alert with message",
      code: `<Alert description="This is an informational message" />`,
    },
    {
      title: "With Title",
      description: "Alert with title and description",
      code: `<Alert
  title="Heads up!"
  description="You can add components to your app using the CLI."
/>`,
    },
    {
      title: "Success",
      description: "Success alert",
      code: `<Alert
  variant="success"
  title="Success"
  description="Your changes have been saved successfully."
/>`,
    },
    {
      title: "Error",
      description: "Error alert",
      code: `<Alert
  variant="error"
  title="Error"
  description="There was a problem with your request."
/>`,
    },
    {
      title: "Warning",
      description: "Warning alert",
      code: `<Alert
  variant="warning"
  title="Warning"
  description="This action cannot be undone."
/>`,
    },
    {
      title: "Info",
      description: "Info alert",
      code: `<Alert
  variant="info"
  title="Did you know?"
  description="You can use keyboard shortcuts to navigate faster."
/>`,
    },
    {
      title: "Dismissible",
      description: "Alert that can be closed",
      code: `const [show, setShow] = useState(true);

{show && (
  <Alert
    dismissible
    onDismiss={() => setShow(false)}
    title="Cookie Policy"
    description="We use cookies to improve your experience."
  />
)}`,
    },
    {
      title: "Without Icon",
      description: "Alert without icon",
      code: `<Alert
  showIcon={false}
  title="Simple Alert"
  description="This alert has no icon"
/>`,
    },
    {
      title: "Custom Content",
      description: "Alert with custom children",
      code: `<Alert title="Custom Actions">
  <div className="mt-2 flex gap-2">
    <button>Accept</button>
    <button>Decline</button>
  </div>
</Alert>`,
    },
  ],
  accessibility: [
    "Proper ARIA role for alerts",
    "Screen reader announcements",
    "Keyboard accessible dismiss buttons",
    "Color contrast meets WCAG standards",
  ],
  performance: {
    bundleSize: "~2KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        title="Heads up!"
        description="You can add components to your app using the CLI."
      />
      <Alert
        variant="success"
        title="Success"
        description="Your changes have been saved successfully."
      />
      <Alert
        variant="error"
        title="Error"
        description="There was a problem with your request."
      />
      <Alert
        variant="warning"
        title="Warning"
        description="This action cannot be undone."
      />
    </div>
  ),
};
