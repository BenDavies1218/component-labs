import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const inputVariants = cva(
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

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
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
            className={cn(
              inputVariants({ variant: displayVariant, size }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className,
            )}
            {...props}
          />
          {endIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p
            className={cn(
              "text-xs",
              hasError
                ? "text-error-600 dark:text-error-400"
                : "text-gray-500 dark:text-gray-400",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
