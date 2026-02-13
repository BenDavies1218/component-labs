import { forwardRef } from "react";

export interface ToastPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * ToastPrimitive
 *
 * Base toast element
 */
export const ToastPrimitive = forwardRef<HTMLDivElement, ToastPrimitiveProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);

ToastPrimitive.displayName = "ToastPrimitive";
