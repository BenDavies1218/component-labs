import type { RegistryEntry } from "../schema";

const primitiveContent = `import { forwardRef } from "react";

export interface LabelPrimitiveProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * LabelPrimitive
 *
 * Base label element with proper accessibility
 */
export const LabelPrimitive = forwardRef<HTMLLabelElement, LabelPrimitiveProps>(
  (props, ref) => {
    return <label ref={ref} {...props} />;
  },
);

LabelPrimitive.displayName = "LabelPrimitive";
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { LabelPrimitive, type LabelPrimitiveProps } from "./Label.primitive";

export const labelVariants = cva(
  ["text-sm font-medium transition-colors duration-200"],
  {
    variants: {
      variant: {
        default: "text-black dark:text-white",
        error: "text-error-500 dark:text-error-400",
        muted: "text-black/60 dark:text-white/60",
      },
      required: {
        true: "after:ml-1 after:text-error-500 after:content-['*']",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      required: false,
      disabled: false,
    },
  },
);

export interface LabelProps
  extends LabelPrimitiveProps,
    VariantProps<typeof labelVariants> {
  /** Whether the associated field is required */
  required?: boolean;
  /** Whether the associated field is disabled */
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { variant, required, disabled, className, children, ...props },
    ref,
  ) => {
    return (
      <LabelPrimitive
        ref={ref}
        className={cn(
          labelVariants({
            variant,
            required,
            disabled,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </LabelPrimitive>
    );
  },
);

Label.displayName = "Label";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const label: RegistryEntry = {
  name: "label",
  type: "components:ui",
  description: "Label component",
  dependencies: ["class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/label.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/label.primitive.tsx"
    },
    {
      path: "components/ui/label.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/label.tsx"
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
    importSpecifier: "Label",
    moduleSpecifier: "@/components/ui/label"
  }
};
