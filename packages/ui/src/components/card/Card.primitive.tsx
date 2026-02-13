import { forwardRef } from "react";

export interface CardPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardPrimitive
 *
 * Base card container element
 */
export const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);

CardPrimitive.displayName = "CardPrimitive";
