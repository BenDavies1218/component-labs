import { cva } from "class-variance-authority";
import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { SliderPrimitive, type SliderPrimitiveProps } from "./Slider.primitive";

// ============================================================================
// Variants
// ============================================================================

export const sliderInputVariants = cva(
  [
    "relative w-full cursor-pointer appearance-none bg-transparent",
    // Webkit thumb
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-primary-600 dark:[&::-webkit-slider-thumb]:bg-primary-400",
    "[&::-webkit-slider-thumb]:shadow-sm",
    "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-black",
    "[&::-webkit-slider-thumb]:cursor-grab",
    "[&:active::-webkit-slider-thumb]:cursor-grabbing",
    // Firefox thumb
    "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-moz-range-thumb]:border-black",
    "[&::-moz-range-thumb]:bg-primary-600 dark:[&::-moz-range-thumb]:bg-primary-400",
    "[&::-moz-range-thumb]:cursor-grab",
    // Focus ring on thumb
    "focus-visible:outline-none",
    "[&:focus-visible::-webkit-slider-thumb]:ring-2",
    "[&:focus-visible::-webkit-slider-thumb]:ring-primary-500",
    "[&:focus-visible::-webkit-slider-thumb]:ring-offset-2",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50",
    "disabled:[&::-webkit-slider-thumb]:cursor-not-allowed",
  ],
);

// ============================================================================
// Props
// ============================================================================

export interface SliderProps
  extends Omit<
    SliderPrimitiveProps,
    "type" | "onChange" | "value" | "defaultValue" | "min" | "max" | "step"
  > {
  /** Controlled value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step between values */
  step?: number;
  /** Called when value changes */
  onChange?: (value: number) => void;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Label displayed above the slider */
  label?: ReactNode;
  /** Whether to show the current value next to the label */
  showValue?: boolean;
  /** Additional CSS classes for the wrapper */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled,
      label,
      showValue = false,
      className,
      ...props
    },
    ref,
  ) => {
    const sliderId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;

    const percentage =
      min === max ? 0 : ((currentValue - min) / (max - min)) * 100;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = Number(e.target.value);
      setInternalValue(next);
      onChange?.(next);
    }

    return (
      <div className={cn("space-y-2", className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={sliderId} className="text-sm font-medium text-black dark:text-white">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm tabular-nums text-black/60 dark:text-white/60">
                {currentValue}
              </span>
            )}
          </div>
        )}

        <div className="relative flex h-4 items-center w-full">
          {/* Track background */}
          <div className="absolute h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            {/* Track fill */}
            <div
              className="h-full rounded-full bg-primary-600 dark:bg-primary-400 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <SliderPrimitive
            ref={ref}
            id={sliderId}
            min={min}
            max={max}
            step={step}
            value={value !== undefined ? value : internalValue}
            disabled={disabled}
            onChange={handleChange}
            className={cn(sliderInputVariants())}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";
