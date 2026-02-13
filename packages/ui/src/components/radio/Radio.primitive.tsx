import {
  Radio as AriakitRadio,
  RadioGroup as AriakitRadioGroup,
  useRadioStore,
  type RadioProps as AriakitRadioProps,
  type RadioGroupProps as AriakitRadioGroupProps,
  type RadioStore,
} from "@ariakit/react";

export type RadioStorePrimitive = RadioStore;
export type RadioPrimitiveProps = AriakitRadioProps;
export type RadioGroupPrimitiveProps = AriakitRadioGroupProps;

export const RadioPrimitive = AriakitRadio;
export const RadioGroupPrimitive = AriakitRadioGroup;
export const useRadioStorePrimitive = useRadioStore;
