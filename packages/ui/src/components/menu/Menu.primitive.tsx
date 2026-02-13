import {
  Menu as AriaMenu,
  MenuButton,
  MenuButtonArrow,
  MenuItem,
  MenuItemCheckbox,
  MenuItemCheck,
  MenuProvider,
  MenuSeparator,
  type MenuButtonProps,
  type MenuItemCheckboxProps,
  type MenuItemProps,
  type MenuProps as AriaMenuProps,
  type MenuProviderProps,
  type MenuSeparatorProps,
} from "@ariakit/react";
import { forwardRef } from "react";

/**
 * Primitive menu components that wrap Ariakit's menu.
 * These are used internally - consumers should use the Menu component instead.
 * @internal
 */

export const MenuProviderPrimitive = MenuProvider;
export const MenuButtonPrimitive = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => <MenuButton ref={ref} {...props} />
);
MenuButtonPrimitive.displayName = "MenuButtonPrimitive";

export const MenuButtonArrowPrimitive = MenuButtonArrow;

export const MenuPrimitive = forwardRef<HTMLDivElement, AriaMenuProps>(
  (props, ref) => <AriaMenu ref={ref} {...props} />
);
MenuPrimitive.displayName = "MenuPrimitive";

export const MenuItemPrimitive = forwardRef<HTMLDivElement, MenuItemProps>(
  (props, ref) => <MenuItem ref={ref} {...props} />
);
MenuItemPrimitive.displayName = "MenuItemPrimitive";

export const MenuItemCheckboxPrimitive = forwardRef<HTMLDivElement, MenuItemCheckboxProps>(
  (props, ref) => <MenuItemCheckbox ref={ref} {...props} />
);
MenuItemCheckboxPrimitive.displayName = "MenuItemCheckboxPrimitive";

export const MenuItemCheckPrimitive = MenuItemCheck;

export const MenuSeparatorPrimitive = forwardRef<HTMLHRElement, MenuSeparatorProps>(
  (props, ref) => <MenuSeparator ref={ref} {...props} />
);
MenuSeparatorPrimitive.displayName = "MenuSeparatorPrimitive";

export type {
  MenuProviderProps,
  MenuButtonProps,
  AriaMenuProps as MenuPrimitiveProps,
  MenuItemProps,
  MenuItemCheckboxProps,
  MenuSeparatorProps,
};
