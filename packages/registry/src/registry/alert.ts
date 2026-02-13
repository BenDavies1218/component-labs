import type { RegistryEntry } from "../schema";

const primitiveContent = `import { forwardRef } from "react";

export interface AlertPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** ARIA role for the alert */
  role?: "alert" | "status" | "none";
}

/**
 * AlertPrimitive
 *
 * Base alert element with proper ARIA attributes
 */
export const AlertPrimitive = forwardRef<HTMLDivElement, AlertPrimitiveProps>(
  ({ role = "alert", ...props }, ref) => {
    return <div ref={ref} role={role} {...props} />;
  },
);

AlertPrimitive.displayName = "AlertPrimitive";
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle,
  Info,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { AlertPrimitive, type AlertPrimitiveProps } from "./Alert.primitive";

export const alertVariants = cva(
  [
    "relative flex items-start gap-3 rounded-lg border p-4",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/10 dark:border-white/10",
          "bg-white dark:bg-black/20",
          "text-black dark:text-white",
        ],
        success: [
          "border-green-200 dark:border-green-800",
          "bg-green-50 dark:bg-green-950",
          "text-green-900 dark:text-green-100",
        ],
        error: [
          "border-error-200 dark:border-error-800",
          "bg-error-50 dark:bg-error-950",
          "text-error-900 dark:text-error-100",
        ],
        warning: [
          "border-yellow-200 dark:border-yellow-800",
          "bg-yellow-50 dark:bg-yellow-950",
          "text-yellow-900 dark:text-yellow-100",
        ],
        info: [
          "border-blue-200 dark:border-blue-800",
          "bg-blue-50 dark:bg-blue-950",
          "text-blue-900 dark:text-blue-100",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends Omit<AlertPrimitiveProps, "role">,
    VariantProps<typeof alertVariants> {
  /** Alert title */
  title?: ReactNode;
  /** Alert description/message */
  description?: ReactNode;
  /** Custom icon to display */
  icon?: ReactNode;
  /** Whether to show the default icon */
  showIcon?: boolean;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "default",
      title,
      description,
      icon,
      showIcon = true,
      dismissible = false,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const icons: Record<string, LucideIcon> = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertCircle,
      info: Info,
    };

    const Icon = icon
      ? null
      : variant && variant !== "default"
        ? icons[variant]
        : Info;

    return (
      <AlertPrimitive
        ref={ref}
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        {showIcon && (icon || Icon) && (
          <div className="shrink-0 mt-0.5">
            {icon || (Icon && <Icon className="h-5 w-5" />)}
          </div>
        )}

        <div className="flex-1 space-y-1">
          {title && <div className="font-semibold text-sm">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
          {children}
        </div>

        {dismissible && (
          <button
            onClick={onDismiss}
            className="shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </AlertPrimitive>
    );
  },
);

Alert.displayName = "Alert";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const alert: RegistryEntry = {
  name: "alert",
  type: "components:ui",
  description: "Alert component",
  dependencies: ["class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/alert.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/alert.primitive.tsx"
    },
    {
      path: "components/ui/alert.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/alert.tsx"
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts"
    }
  ],
  tailwind: {
    config: {
      theme: {
        extend: {}
      }
    }
  },
  meta: {
    importSpecifier: "Alert",
    moduleSpecifier: "@/components/ui/alert"
  }
};
