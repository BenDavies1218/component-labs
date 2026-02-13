import {
  Select as AriakitSelect,
  SelectArrow as AriakitSelectArrow,
  SelectItem as AriakitSelectItem,
  SelectPopover as AriakitSelectPopover,
  useSelectStore,
  type SelectProps as AriakitSelectProps,
  type SelectArrowProps as AriakitSelectArrowProps,
  type SelectItemProps as AriakitSelectItemProps,
  type SelectPopoverProps as AriakitSelectPopoverProps,
  type SelectStore,
} from "@ariakit/react";

export type SelectStorePrimitive = SelectStore;
export type SelectPrimitiveProps = AriakitSelectProps;
export type SelectArrowPrimitiveProps = AriakitSelectArrowProps;
export type SelectItemPrimitiveProps = AriakitSelectItemProps;
export type SelectPopoverPrimitiveProps = AriakitSelectPopoverProps;

export const SelectPrimitive = AriakitSelect;
export const SelectArrowPrimitive = AriakitSelectArrow;
export const SelectItemPrimitive = AriakitSelectItem;
export const SelectPopoverPrimitive = AriakitSelectPopover;
export const useSelectStorePrimitive = useSelectStore;
