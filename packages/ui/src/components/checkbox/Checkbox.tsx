import {
  Checkbox as AriaCheckbox,
  CheckboxCheck,
  type CheckboxProps as AriaCheckboxProps,
} from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  [
    "flex items-center justify-center rounded border-2",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-gray-300 dark:border-gray-700",
          "bg-white dark:bg-gray-900",
          "aria-checked:bg-primary-600 aria-checked:border-primary-600",
          "hover:border-gray-400 dark:hover:border-gray-600",
        ],
        outline: [
          "border-primary-600 dark:border-primary-500",
          "bg-transparent",
          "aria-checked:bg-primary-600 aria-checked:border-primary-600",
          "hover:border-primary-700 dark:hover:border-primary-400",
        ],
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface CheckboxProps
  extends Omit<AriaCheckboxProps, "size">,
    VariantProps<typeof checkboxVariants> {
  /** Label text to display next to the checkbox */
  label?: ReactNode;
  /** Description text to display below the label */
  description?: ReactNode;
  /** Custom check icon */
  checkIcon?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant,
      size,
      label,
      description,
      checkIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const checkbox = (
      <AriaCheckbox
        ref={ref}
        render={<div />}
        className={cn(checkboxVariants({ variant, size, className }))}
        {...props}
      >
        <CheckboxCheck>
          {checkIcon || <CheckIcon />}
        </CheckboxCheck>
      </AriaCheckbox>
    );

    // If there's a label or description, wrap in a label element
    if (label || description || children) {
      return (
        <label className="flex items-start gap-2 cursor-pointer group">
          {checkbox}
          <div className="flex flex-col gap-1">
            {(label || children) && (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {label || children}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </span>
            )}
          </div>
        </label>
      );
    }

    return checkbox;
  },
);

Checkbox.displayName = "Checkbox";

// Default check icon
function CheckIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden="true"
    >
      <path
        d="M13 4L6 11L3 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
