import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  TabListPrimitive,
  TabPanelPrimitive,
  TabPrimitive,
  useTabStorePrimitive,
  type TabListPrimitiveProps,
  type TabPanelPrimitiveProps,
  type TabPrimitiveProps,
} from "./Tabs.primitive";

// ============================================================================
// Tab List Variants
// ============================================================================

export const tabListVariants = cva(
  ["inline-flex items-center gap-1 rounded-lg p-1"],
  {
    variants: {
      variant: {
        default: "bg-black/5 dark:bg-white/5",
        outline: "border border-black/10 dark:border-white/10",
        underline: "border-b border-black/10 dark:border-white/10 p-0 gap-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Tab Variants
// ============================================================================

export const tabVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "px-3 py-1.5 text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-md",
          "text-black/70 dark:text-white/70",
          "hover:text-black dark:hover:text-white",
          "data-[active-item]:bg-white dark:data-[active-item]:bg-black",
          "data-[active-item]:text-black dark:data-[active-item]:text-white",
          "data-[active-item]:shadow-sm",
        ],
        outline: [
          "rounded-md",
          "text-black/70 dark:text-white/70",
          "hover:text-black dark:hover:text-white",
          "hover:bg-black/5 dark:hover:bg-white/5",
          "data-[active-item]:bg-white dark:data-[active-item]:bg-black",
          "data-[active-item]:text-black dark:data-[active-item]:text-white",
          "data-[active-item]:border data-[active-item]:border-black/10 dark:data-[active-item]:border-white/10",
        ],
        underline: [
          "rounded-none border-b-2 border-transparent px-4 py-3",
          "text-black/70 dark:text-white/70",
          "hover:text-black dark:hover:text-white",
          "hover:border-black/20 dark:hover:border-white/20",
          "data-[active-item]:border-primary-600 dark:data-[active-item]:border-primary-400",
          "data-[active-item]:text-black dark:data-[active-item]:text-white",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Tabs Root (Provider)
// ============================================================================

export interface TabsRootProps {
  /** Default selected tab ID */
  defaultSelectedId?: string;
  /** Controlled selected tab ID */
  selectedId?: string;
  /** Change handler */
  onSelectIdChange?: (id: string | null | undefined) => void;
}

// ============================================================================
// Tab List
// ============================================================================

export interface TabListProps
  extends Omit<TabListPrimitiveProps, "store">,
    VariantProps<typeof tabListVariants> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <TabListPrimitive
        ref={ref}
        className={cn(tabListVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

TabList.displayName = "TabList";

// ============================================================================
// Tab
// ============================================================================

export interface TabProps
  extends Omit<TabPrimitiveProps, "store">,
    VariantProps<typeof tabVariants> {}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <TabPrimitive
        ref={ref}
        className={cn(tabVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

Tab.displayName = "Tab";

// ============================================================================
// Tab Panel
// ============================================================================

export interface TabPanelProps
  extends Omit<TabPanelPrimitiveProps, "store"> {}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, ...props }, ref) => {
    return (
      <TabPanelPrimitive
        ref={ref}
        className={cn("mt-4 focus-visible:outline-none", className)}
        {...props}
      />
    );
  },
);

TabPanel.displayName = "TabPanel";

// ============================================================================
// Tabs (Compound Component with Store)
// ============================================================================

export interface TabsProps extends TabsRootProps {
  /** Visual variant for tabs */
  variant?: "default" | "outline" | "underline";
  /** Children components */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function Tabs({
  defaultSelectedId,
  selectedId,
  onSelectIdChange,
  variant = "default",
  className,
  children,
}: TabsProps) {
  const store = useTabStorePrimitive({
    defaultSelectedId,
    selectedId,
    setSelectedId: onSelectIdChange,
  });

  // Clone children and inject store + variant
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        store,
        variant,
      });
    }
    return child;
  });

  return <div className={className}>{childrenWithProps}</div>;
}

Tabs.displayName = "Tabs";

// Export compound component parts
import React from "react";

export const TabsCompound = Object.assign(Tabs, {
  List: TabList,
  Tab: Tab,
  Panel: TabPanel,
});
