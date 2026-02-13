import type { ComponentDoc } from "../../types/docs";
import { Toast, useToast } from "./Toast";

export const toastDocs: ComponentDoc = {
  name: "Toast",
  description:
    "Notification component for displaying temporary messages. Built with Ariakit. Requires ToastProvider wrapper.",
  category: "Feedback",
  installation: `npx @component-labs/cli add toast

This will:
- Install required dependencies
- Copy the Toast component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Toast } from "@component-labs/ui";

function App() {
  return (
    <Toast.Provider>
      <YourApp />
    </Toast.Provider>
  );
}

// In your component
const { toast } = Toast.useToast();

toast({
  title: "Notification",
  description: "This is a toast message",
});`,
  props: [
    {
      name: "ToastProvider.children",
      type: "ReactNode",
      required: true,
      description: "App content wrapped by the toast provider",
    },
    {
      name: "toast()",
      type: "(data: ToastData) => string",
      description: "Show a toast notification. Returns toast ID.",
    },
    {
      name: "ToastData.title",
      type: "ReactNode",
      description: "Toast title",
    },
    {
      name: "ToastData.description",
      type: "ReactNode",
      description: "Toast description",
    },
    {
      name: "ToastData.variant",
      type: '"default" | "success" | "error" | "warning" | "info"',
      default: '"default"',
      description: "Toast style variant",
    },
    {
      name: "ToastData.duration",
      type: "number",
      default: "5000",
      description: "Auto-dismiss duration in milliseconds (0 = no auto-dismiss)",
    },
    {
      name: "ToastData.action",
      type: "{ label: string; onClick: () => void }",
      description: "Optional action button",
    },
    {
      name: "success()",
      type: "(title: ReactNode, description?: ReactNode) => string",
      description: "Show success toast",
    },
    {
      name: "error()",
      type: "(title: ReactNode, description?: ReactNode) => string",
      description: "Show error toast",
    },
    {
      name: "warning()",
      type: "(title: ReactNode, description?: ReactNode) => string",
      description: "Show warning toast",
    },
    {
      name: "info()",
      type: "(title: ReactNode, description?: ReactNode) => string",
      description: "Show info toast",
    },
    {
      name: "dismiss()",
      type: "(id?: string) => void",
      description: "Dismiss toast by ID, or all toasts if no ID provided",
    },
  ],
  examples: [
    {
      title: "Setup",
      description: "Wrap your app with ToastProvider",
      code: `import { Toast } from "@component-labs/ui/toast";

function App() {
  return (
    <Toast.Provider>
      <YourApp />
    </Toast.Provider>
  );
}`,
    },
    {
      title: "Basic Toast",
      description: "Show a simple notification",
      code: `const { toast } = Toast.useToast();

toast({
  title: "Notification",
  description: "This is a toast message",
});`,
    },
    {
      title: "Success Toast",
      description: "Show a success message",
      code: `const { success } = Toast.useToast();

success("Saved!", "Your changes have been saved successfully.");`,
    },
    {
      title: "Error Toast",
      description: "Show an error message",
      code: `const { error } = Toast.useToast();

error("Error", "Something went wrong. Please try again.");`,
    },
    {
      title: "With Action",
      description: "Toast with an action button",
      code: `const { toast } = Toast.useToast();

toast({
  title: "Update available",
  description: "A new version is ready to install.",
  variant: "info",
  action: {
    label: "Install now",
    onClick: () => {
      // Handle update
    },
  },
});`,
    },
    {
      title: "Custom Duration",
      description: "Toast that stays longer",
      code: `const { toast } = Toast.useToast();

toast({
  title: "Important",
  description: "This will stay for 10 seconds",
  duration: 10000,
});`,
    },
    {
      title: "Persistent Toast",
      description: "Toast that doesn't auto-dismiss",
      code: `const { toast, dismiss } = Toast.useToast();

const id = toast({
  title: "Action required",
  description: "Please review before continuing",
  duration: 0, // No auto-dismiss
});

// Dismiss manually later
dismiss(id);`,
    },
  ],
  accessibility: [
    "Proper ARIA role for notifications",
    "Screen reader announcements",
    "Keyboard accessible dismiss buttons",
    "Focus management",
  ],
  performance: {
    bundleSize: "~3KB gzipped",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => {
    const DemoComponent = () => {
      const { toast, success, error } = useToast();

      return (
        <div className="space-y-2 max-w-md">
          <button
            onClick={() => toast({ title: "Default Toast", description: "This is a notification" })}
            className="px-4 py-2 bg-black text-white rounded-md text-sm"
          >
            Show Toast
          </button>
          <button
            onClick={() => success("Success!", "Operation completed")}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
          >
            Show Success
          </button>
          <button
            onClick={() => error("Error", "Something went wrong")}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm"
          >
            Show Error
          </button>
        </div>
      );
    };

    return (
      <Toast.Provider>
        <DemoComponent />
      </Toast.Provider>
    );
  },
};
