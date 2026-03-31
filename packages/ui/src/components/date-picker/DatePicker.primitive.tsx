import {
  Popover as AriakitPopover,
  PopoverDisclosure as AriakitPopoverDisclosure,
  usePopoverStore,
  type PopoverProps as AriakitPopoverProps,
  type PopoverDisclosureProps as AriakitPopoverDisclosureProps,
  type PopoverStore,
} from "@ariakit/react";

export type DatePickerStorePrimitive = PopoverStore;
export type DatePickerPopoverPrimitiveProps = AriakitPopoverProps;
export type DatePickerTriggerPrimitiveProps = AriakitPopoverDisclosureProps;

export const DatePickerPopoverPrimitive = AriakitPopover;
export const DatePickerTriggerPrimitive = AriakitPopoverDisclosure;
export const useDatePickerStorePrimitive = usePopoverStore;
