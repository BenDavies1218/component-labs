import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  MenuProviderPrimitive,
  MenuButtonPrimitive,
  MenuButtonArrowPrimitive,
  MenuPrimitive,
  MenuItemPrimitive,
  MenuItemCheckboxPrimitive,
  MenuItemCheckPrimitive,
  MenuSeparatorPrimitive,
  type MenuProviderProps,
  type MenuButtonProps,
  type MenuPrimitiveProps,
  type MenuItemProps,
  type MenuItemCheckboxProps,
  type MenuSeparatorProps,
} from "./Menu.primitive";

export const menuButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "rounded-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700",
          "hover:bg-gray-50 dark:hover:bg-gray-800",
          "focus-visible:ring-primary-600",
          "shadow-sm hover:shadow",
        ],
        primary: [
          "bg-primary-600 text-white border border-transparent",
          "hover:bg-primary-700",
          "focus-visible:ring-primary-600",
          "shadow-sm hover:shadow",
        ],
        ghost: [
          "text-gray-900 dark:text-gray-100 bg-transparent border-transparent",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus-visible:ring-primary-600",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const menuVariants = cva([
  "z-50 min-w-[200px] rounded-lg border bg-white p-1 shadow-lg",
  "dark:bg-gray-900 dark:border-gray-700",
  "opacity-0 transition-all duration-200 ease-out",
  "data-enter:opacity-100 data-enter:translate-y-0",
  "data-leave:opacity-0 data-leave:-translate-y-1",
]);

export const menuItemVariants = cva(
  [
    "flex items-center gap-2 px-3 py-2 rounded-md",
    "text-sm cursor-pointer",
    "transition-colors duration-150",
    "outline-none",
    "text-gray-900 dark:text-gray-100",
    "data-active-item:bg-primary-100 dark:data-active-item:bg-primary-900",
    "data-active-item:text-primary-900 dark:data-active-item:text-primary-100",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
);

export const menuSeparatorVariants = cva([
  "my-1 h-px bg-gray-200 dark:bg-gray-700",
]);

// Menu Provider wrapper
export interface MenuRootProps extends MenuProviderProps {
  children: ReactNode;
}

export function MenuRoot({ children, ...props }: MenuRootProps) {
  return <MenuProviderPrimitive {...props}>{children}</MenuProviderPrimitive>;
}

// Menu Button
export interface MenuTriggerProps
  extends MenuButtonProps,
    VariantProps<typeof menuButtonVariants> {
  /** Show arrow icon */
  showArrow?: boolean;
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ variant, size, showArrow = true, className, children, ...props }, ref) => {
    return (
      <MenuButtonPrimitive
        ref={ref}
        className={cn(menuButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
        {showArrow && (
          <MenuButtonArrowPrimitive className="transition-transform duration-200 group-data-[open]:rotate-180" />
        )}
      </MenuButtonPrimitive>
    );
  },
);

MenuTrigger.displayName = "MenuTrigger";

// Menu Content
export interface MenuContentProps extends MenuPrimitiveProps {
  /** Gutter space between trigger and menu */
  gutter?: number;
}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ gutter = 8, className, children, ...props }, ref) => {
    return (
      <MenuPrimitive
        ref={ref}
        gutter={gutter}
        className={cn(menuVariants(), className)}
        {...props}
      >
        {children}
      </MenuPrimitive>
    );
  },
);

MenuContent.displayName = "MenuContent";

// Menu Item
export interface MenuItemComponentProps extends MenuItemProps {}

export const MenuItemComponent = forwardRef<
  HTMLDivElement,
  MenuItemComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <MenuItemPrimitive
      ref={ref}
      className={cn(menuItemVariants(), className)}
      {...props}
    >
      {children}
    </MenuItemPrimitive>
  );
});

MenuItemComponent.displayName = "MenuItem";

// Menu Item Checkbox
export interface MenuItemCheckboxComponentProps
  extends MenuItemCheckboxProps {}

export const MenuItemCheckboxComponent = forwardRef<
  HTMLDivElement,
  MenuItemCheckboxComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <MenuItemCheckboxPrimitive
      ref={ref}
      className={cn(menuItemVariants(), "pl-8 relative", className)}
      {...props}
    >
      <MenuItemCheckPrimitive className="absolute left-2 flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-600 dark:text-primary-400"
        >
          <path
            d="M13 4L6 11L3 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </MenuItemCheckPrimitive>
      {children}
    </MenuItemCheckboxPrimitive>
  );
});

MenuItemCheckboxComponent.displayName = "MenuItemCheckbox";

// Menu Separator
export interface MenuSeparatorComponentProps extends MenuSeparatorProps {}

export const MenuSeparatorComponent = forwardRef<
  HTMLHRElement,
  MenuSeparatorComponentProps
>(({ className, ...props }, ref) => {
  return (
    <MenuSeparatorPrimitive
      ref={ref}
      className={cn(menuSeparatorVariants(), className)}
      {...props}
    />
  );
});

MenuSeparatorComponent.displayName = "MenuSeparator";

// Compound component export
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItemComponent,
  ItemCheckbox: MenuItemCheckboxComponent,
  Separator: MenuSeparatorComponent,
};
