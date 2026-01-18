import {
  Button as AccessibleButton,
  ButtonProps as AccessibleButtonProps,
} from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "rounded-lg border",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground border-transparent",
          "hover:bg-primary/90",
          "focus-visible:ring-ring",
          "shadow-sm hover:shadow",
        ],
        primary: [
          "bg-primary-600 text-black border-transparent",
          "hover:bg-primary-700",
          "focus-visible:ring-primary-600",
          "shadow-sm hover:shadow",
        ],
        secondary: [
          "bg-secondary-600 text-black border-transparent",
          "hover:bg-secondary-700",
          "focus-visible:ring-secondary-600",
          "shadow-sm hover:shadow",
        ],
        outline: [
          "border-primary-600 text-primary-600 bg-transparent",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-600",
        ],
        ghost: [
          "text-primary-600 dark:text-primary-400 bg-transparent border-transparent",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-600",
        ],
        destructive: [
          "bg-error-600 text-black border-transparent",
          "hover:bg-error-700",
          "focus-visible:ring-error-600",
          "shadow-sm hover:shadow",
        ],
        link: [
          "text-primary-600 text-black underline-offset-4 bg-transparent border-transparent",
          "hover:underline",
          "focus-visible:ring-primary-600",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
        icon: "h-10 w-10",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "cursor-pointer active:scale-95",
      },
      fullWidth: {
        true: "w-full",
        false: null,
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "sm",
        className: "border",
      },
      {
        variant: "outline",
        size: ["md", "lg"],
        className: "border-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
      fullWidth: false,
    },
  },
);

type data = {
  [key: string]: string;
};

export interface ButtonProps
  extends
    Omit<AccessibleButtonProps, "disabled">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  fullWidth?: boolean;
  data?: data[];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      data,
      disabled,
      loading,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Convert data array to data-* attributes
    const dataAttributes = data?.reduce(
      (acc, item) => {
        Object.entries(item).forEach(([key, value]) => {
          acc[`data-${key}`] = value;
        });
        return acc;
      },
      {} as Record<string, string>,
    );

    return (
      <AccessibleButton
        ref={ref}
        disabled={disabled || loading || undefined}
        className={cn(
          buttonVariants({
            variant,
            size,
            disabled: disabled || loading,
            fullWidth,
            className,
          }),
        )}
        {...dataAttributes}
        {...props}
      >
        {Object.values(dataAttributes || {}).toString()}
        {loading ? "Loading..." : children}
      </AccessibleButton>
    );
  },
);

Button.displayName = "Button";
