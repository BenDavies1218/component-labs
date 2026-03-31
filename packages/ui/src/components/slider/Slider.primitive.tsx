import { forwardRef } from "react";

export interface SliderPrimitiveProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Whether the slider is disabled */
  disabled?: boolean;
}

/**
 * SliderPrimitive
 *
 * Base range input element with proper accessibility attributes.
 * This is used internally — consumers should use the Slider component instead.
 * @internal
 */
export const SliderPrimitive = forwardRef<HTMLInputElement, SliderPrimitiveProps>(
  ({ disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
    );
  },
);

SliderPrimitive.displayName = "SliderPrimitive";
