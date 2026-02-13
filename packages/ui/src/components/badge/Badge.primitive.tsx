import { forwardRef } from "react";

export interface BadgePrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * BadgePrimitive
 *
 * Base badge element (span)
 */
export const BadgePrimitive = forwardRef<HTMLSpanElement, BadgePrimitiveProps>(
  (props, ref) => {
    return <span ref={ref} {...props} />;
  },
);

BadgePrimitive.displayName = "BadgePrimitive";
