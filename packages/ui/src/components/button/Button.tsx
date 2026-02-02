import {
  Button as AccessibleButton,
  ButtonProps as AccessibleButtonProps,
} from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 cursor-pointer",
    "font-medium transition-all duration-200",
    "rounded-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary-600 dark:bg-primary-700 text-white border border-transparent",
          "hover:bg-primary-700 dark:hover:bg-primary-600",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          "shadow-sm hover:shadow",
        ],
        secondary: [
          "bg-secondary-100 dark:bg-secondary-700 text-black dark:text-white border border-transparent",
          "hover:bg-secondary-200 dark:hover:bg-secondary-600",
          "focus-visible:ring-secondary-500 dark:focus-visible:ring-secondary-400",
          "shadow-sm hover:shadow",
        ],
        outline: [
          "border-2 border-primary-600 text-foreground/70 dark:text-primary-400 bg-transparent",
          "hover:bg-primary-900 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
        ghost: [
          "text-foreground/70 dark:text-foreground/80 bg-transparent border-transparent",
          "hover:bg-primary-900 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
        destructive: [
          "bg-error-500 dark:bg-error-600 text-white border border-transparent",
          "hover:bg-error-600 dark:hover:bg-error-500",
          "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
          "shadow-sm hover:shadow",
        ],
        link: [
          "text-primary-600 dark:text-primary-400 underline-offset-4 bg-transparent border-transparent",
          "hover:underline",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    Omit<AccessibleButtonProps, "disabled">,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Loading state - shows loading indicator and disables the button */
  loading?: boolean;
  /** Custom loading indicator element */
  loadingIndicator?: ReactNode;
  /** Icon to display before the button text */
  startIcon?: ReactNode;
  /** Icon to display after the button text */
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      disabled,
      fullWidth,
      loading,
      loadingIndicator,
      startIcon,
      endIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <AccessibleButton
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            className,
          }),
        )}
        {...props}
      >
        {loading &&
          (loadingIndicator || <Loader2 className="h-4 w-4 animate-spin" />)}
        {!loading && startIcon && <span className="shrink-0">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
      </AccessibleButton>
    );
  },
);

Button.displayName = "Button";
