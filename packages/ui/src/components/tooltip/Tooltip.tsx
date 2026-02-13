import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  TooltipAnchorPrimitive,
  TooltipPrimitive,
  TooltipProviderPrimitive,
  useTooltipStorePrimitive,
  type TooltipAnchorPrimitiveProps,
  type TooltipPrimitiveProps,
} from "./Tooltip.primitive";

// ============================================================================
// Tooltip Variants
// ============================================================================

export const tooltipVariants = cva(
  [
    "z-50 rounded-md px-3 py-1.5 text-sm shadow-md",
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  ],
  {
    variants: {
      variant: {
        default: "bg-black dark:bg-white text-white dark:text-black",
        inverse: "bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Tooltip Root
// ============================================================================

export interface TooltipRootProps {
  /** Content to display in tooltip */
  content: ReactNode;
  /** Element that triggers the tooltip */
  children: ReactNode;
  /** Visual variant */
  variant?: "default" | "inverse";
  /** Show delay in milliseconds */
  showDelay?: number;
  /** Hide delay in milliseconds */
  hideDelay?: number;
  /** Placement of the tooltip */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
}

export interface TooltipProps
  extends Omit<TooltipPrimitiveProps, "store">,
    VariantProps<typeof tooltipVariants> {}

export interface TooltipAnchorProps
  extends Omit<TooltipAnchorPrimitiveProps, "store"> {}

// ============================================================================
// Tooltip Component
// ============================================================================

export function Tooltip({
  content,
  children,
  variant = "default",
  showDelay = 700,
  hideDelay = 0,
  placement = "top",
}: TooltipRootProps) {
  const tooltip = useTooltipStorePrimitive({
    showTimeout: showDelay,
    hideTimeout: hideDelay,
    placement,
  });

  return (
    <TooltipProviderPrimitive>
      <TooltipAnchorPrimitive store={tooltip}>
        {children}
      </TooltipAnchorPrimitive>

      <TooltipPrimitive
        store={tooltip}
        gutter={8}
        className={cn(tooltipVariants({ variant }))}
      >
        {content}
      </TooltipPrimitive>
    </TooltipProviderPrimitive>
  );
}

Tooltip.displayName = "Tooltip";

// ============================================================================
// TooltipContent (standalone)
// ============================================================================

export const TooltipContent = forwardRef<HTMLDivElement, TooltipProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <TooltipPrimitive
        ref={ref}
        gutter={8}
        className={cn(tooltipVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

TooltipContent.displayName = "TooltipContent";

// ============================================================================
// TooltipAnchor (standalone)
// ============================================================================

export const TooltipAnchor = forwardRef<HTMLDivElement, TooltipAnchorProps>(
  (props, ref) => {
    return <TooltipAnchorPrimitive ref={ref} {...props} />;
  },
);

TooltipAnchor.displayName = "TooltipAnchor";
