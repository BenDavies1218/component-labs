import {
  Checkbox,
  type CheckboxProps as AriaCheckboxProps,
} from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gray-300 dark:bg-gray-700",
          "aria-checked:bg-primary-600 dark:aria-checked:bg-primary-500",
        ],
        success: [
          "bg-gray-300 dark:bg-gray-700",
          "aria-checked:bg-green-600 dark:aria-checked:bg-green-500",
        ],
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  [
    "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0",
    "transition-transform duration-200",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 group-aria-checked:translate-x-4",
        md: "h-5 w-5 group-aria-checked:translate-x-5",
        lg: "h-6 w-6 group-aria-checked:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SwitchProps
  extends Omit<AriaCheckboxProps, "size">,
    VariantProps<typeof switchVariants> {
  /** Label text to display next to the switch */
  label?: ReactNode;
  /** Description text to display below the label */
  description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { variant, size, label, description, className, children, ...props },
    ref,
  ) => {
    const switchElement = (
      <Checkbox
        ref={ref}
        render={<button type="button" />}
        className={cn("group", switchVariants({ variant, size, className }))}
        {...props}
      >
        <span
          aria-hidden="true"
          className={switchThumbVariants({ size })}
        />
      </Checkbox>
    );

    // If there's a label or description, wrap in a label element
    if (label || description || children) {
      return (
        <label className="flex items-start gap-3 cursor-pointer group">
          {switchElement}
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

    return switchElement;
  },
);

Switch.displayName = "Switch";
