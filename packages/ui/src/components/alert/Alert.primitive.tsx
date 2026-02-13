import { forwardRef } from "react";

export interface AlertPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** ARIA role for the alert */
  role?: "alert" | "status" | "none";
}

/**
 * AlertPrimitive
 *
 * Base alert element with proper ARIA attributes
 */
export const AlertPrimitive = forwardRef<HTMLDivElement, AlertPrimitiveProps>(
  ({ role = "alert", ...props }, ref) => {
    return <div ref={ref} role={role} {...props} />;
  },
);

AlertPrimitive.displayName = "AlertPrimitive";
