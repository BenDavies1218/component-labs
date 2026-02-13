import { cva, type VariantProps } from "class-variance-authority";
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
