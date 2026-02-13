import type { RegistryEntry } from "../schema";

const primitiveContent = `import { forwardRef } from "react";

export interface BadgePrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * BadgePrimitive
 *
 * Base badge element (span)
 */
export const BadgePrimitive = forwardRef<HTMLSpanElement, BadgePrimitiveProps>(
  (props, ref) => {
    return <span ref={ref} {...props} />;
  },
);

BadgePrimitive.displayName = "BadgePrimitive";
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { BadgePrimitive, type BadgePrimitiveProps } from "./Badge.primitive";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full border font-medium",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/10 dark:border-white/10",
          "bg-black/5 dark:bg-white/5",
          "text-black dark:text-white",
        ],
        primary: [
          "border-primary-200 dark:border-primary-800",
          "bg-primary-100 dark:bg-primary-900",
          "text-primary-700 dark:text-primary-300",
        ],
        secondary: [
          "border-secondary-200 dark:border-secondary-800",
          "bg-secondary-100 dark:bg-secondary-900",
          "text-secondary-700 dark:text-secondary-300",
        ],
        success: [
          "border-green-200 dark:border-green-800",
          "bg-green-100 dark:bg-green-900",
          "text-green-700 dark:text-green-300",
        ],
        error: [
          "border-error-200 dark:border-error-800",
          "bg-error-100 dark:bg-error-900",
          "text-error-700 dark:text-error-300",
        ],
        warning: [
          "border-yellow-200 dark:border-yellow-800",
          "bg-yellow-100 dark:bg-yellow-900",
          "text-yellow-700 dark:text-yellow-300",
        ],
        info: [
          "border-blue-200 dark:border-blue-800",
          "bg-blue-100 dark:bg-blue-900",
          "text-blue-700 dark:text-blue-300",
        ],
        outline: [
          "border-black/20 dark:border-white/20",
          "bg-transparent",
          "text-black dark:text-white",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends BadgePrimitiveProps,
    VariantProps<typeof badgeVariants> {
  /** Badge content */
  children: ReactNode;
  /** Icon to display before the text */
  icon?: ReactNode;
  /** Whether the badge can be removed */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant,
      size,
      icon,
      removable = false,
      onRemove,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <BadgePrimitive
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {removable && (
          <button
            onClick={onRemove}
            className="shrink-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove badge"
            type="button"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </BadgePrimitive>
    );
  },
);

Badge.displayName = "Badge";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const badge: RegistryEntry = {
  name: "badge",
  type: "components:ui",
  description: "Badge component",
  dependencies: ["class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/badge.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/badge.primitive.tsx"
    },
    {
      path: "components/ui/badge.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/badge.tsx"
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
    importSpecifier: "Badge",
    moduleSpecifier: "@/components/ui/badge"
  }
};
