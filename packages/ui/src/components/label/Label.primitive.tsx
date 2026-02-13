import { forwardRef } from "react";

export interface LabelPrimitiveProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * LabelPrimitive
 *
 * Base label element with proper accessibility
 */
export const LabelPrimitive = forwardRef<HTMLLabelElement, LabelPrimitiveProps>(
  (props, ref) => {
    return <label ref={ref} {...props} />;
  },
);

LabelPrimitive.displayName = "LabelPrimitive";
