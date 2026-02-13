import {
  Combobox as AriaCombobox,
  ComboboxCancel,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
  type ComboboxProps as AriaComboboxProps,
  type ComboboxItemProps,
  type ComboboxPopoverProps,
  type ComboboxProviderProps,
} from "@ariakit/react";
import { forwardRef } from "react";

/**
 * Primitive combobox components that wrap Ariakit's combobox.
 * These are used internally - consumers should use the Combobox component instead.
 * @internal
 */

export const ComboboxProviderPrimitive = ComboboxProvider;

export const ComboboxPrimitive = forwardRef<HTMLInputElement, AriaComboboxProps>(
  (props, ref) => <AriaCombobox ref={ref} {...props} />
);
ComboboxPrimitive.displayName = "ComboboxPrimitive";

export const ComboboxCancelPrimitive = ComboboxCancel;

export const ComboboxItemPrimitive = forwardRef<HTMLDivElement, ComboboxItemProps>(
  (props, ref) => <ComboboxItem ref={ref} {...props} />
);
ComboboxItemPrimitive.displayName = "ComboboxItemPrimitive";

export const ComboboxPopoverPrimitive = forwardRef<HTMLDivElement, ComboboxPopoverProps>(
  (props, ref) => <ComboboxPopover ref={ref} {...props} />
);
ComboboxPopoverPrimitive.displayName = "ComboboxPopoverPrimitive";

export type {
  ComboboxProviderProps,
  AriaComboboxProps as ComboboxPrimitiveProps,
  ComboboxItemProps,
  ComboboxPopoverProps,
};
