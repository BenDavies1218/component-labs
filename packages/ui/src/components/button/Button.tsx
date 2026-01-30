import {
  Button as AccessibleButton,
  ButtonProps as AccessibleButtonProps,
} from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
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
          "bg-primary-600 text-black border border-transparent",
          "hover:bg-primary-700",
          "focus-visible:ring-primary-600",
          "shadow-sm hover:shadow",
        ],
        secondary: [
          "bg-secondary-600 text-black border border-transparent",
          "hover:bg-secondary-700",
          "focus-visible:ring-secondary-600",
          "shadow-sm hover:shadow",
        ],
        outline: [
          "border-2 border-primary-600 text-primary-600 dark:text-primary-400 bg-transparent",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-600",
        ],
        ghost: [
          "text-primary-600 text-black dark:text-primary-400 bg-transparent border-transparent",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-600",
        ],
        destructive: [
          "bg-error-600 text-black border border-transparent",
          "hover:bg-error-700",
          "focus-visible:ring-error-600",
          "shadow-sm hover:shadow",
        ],
        link: [
          "text-primary-600 text-black dark:text-primary-400 underline-offset-4 bg-transparent border-transparent",
          "hover:underline",
          "focus-visible:ring-primary-600",
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
        {loading && (loadingIndicator || <Spinner />)}
        {!loading && startIcon && <span className="shrink-0">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
      </AccessibleButton>
    );
  },
);

Button.displayName = "Button";

// Default spinner component
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
