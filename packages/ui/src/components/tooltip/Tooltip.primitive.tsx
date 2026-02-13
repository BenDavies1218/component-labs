import {
  Tooltip as AriakitTooltip,
  TooltipAnchor as AriakitTooltipAnchor,
  TooltipProvider as AriakitTooltipProvider,
  useTooltipStore,
  type TooltipProps as AriakitTooltipProps,
  type TooltipAnchorProps as AriakitTooltipAnchorProps,
  type TooltipStore,
} from "@ariakit/react";

export type TooltipStorePrimitive = TooltipStore;
export type TooltipPrimitiveProps = AriakitTooltipProps;
export type TooltipAnchorPrimitiveProps = AriakitTooltipAnchorProps;

export const TooltipPrimitive = AriakitTooltip;
export const TooltipAnchorPrimitive = AriakitTooltipAnchor;
export const TooltipProviderPrimitive = AriakitTooltipProvider;
export const useTooltipStorePrimitive = useTooltipStore;
