import type { RegistryEntry } from "../schema";

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "../../lib/utils";

export const inputVariants = cva(
  [
    "w-full rounded-lg border px-3 py-2",
    "text-sm font-medium",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-700",
          "text-gray-900 dark:text-gray-100",
          "hover:border-gray-400 dark:hover:border-gray-600",
        ],
        outline: [
          "bg-transparent",
          "border-primary-600 dark:border-primary-500",
          "text-gray-900 dark:text-gray-100",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
        ],
        error: [
          "bg-white dark:bg-gray-900",
          "border-error-600 dark:border-error-500",
          "text-gray-900 dark:text-gray-100",
          "focus:ring-error-600",
        ],
      },
      size: {
        sm: "h-9 text-sm",
        md: "h-10 text-base",
        lg: "h-11 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text above the input */
  label?: ReactNode;
  /** Helper text below the input */
  helperText?: ReactNode;
  /** Error message (sets variant to error automatically) */
  error?: string;
  /** Icon to display before the input text */
  startIcon?: ReactNode;
  /** Icon to display after the input text */
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const displayVariant = hasError ? "error" : variant;
    const generatedId = useId();
    const inputId = props.id || generatedId;
    const labelId = \`\${inputId}-label\`;
    const helperTextId = \`\${inputId}-helper-text\`;
    const errorId = \`\${inputId}-error\`;

    // Build aria-describedby from available helper text or error
    const describedBy = error ? errorId : helperText ? helperTextId : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: displayVariant, size }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className,
            )}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={describedBy}
            aria-invalid={hasError ? true : undefined}
            {...props}
          />
          {endIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs text-error-600 dark:text-error-400"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperTextId}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
`;

const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export const input: RegistryEntry = {
  name: "input",
  type: "components:ui",
  description: "Input component",
  dependencies: ["class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/input.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/input.tsx"
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
    importSpecifier: "Input",
    moduleSpecifier: "@/components/ui/input"
  }
};
