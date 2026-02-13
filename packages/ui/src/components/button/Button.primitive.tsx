import {
  Button as AccessibleButton,
  ButtonProps as AccessibleButtonProps,
} from "@ariakit/react";
import { forwardRef } from "react";

/**
 * Primitive button component that wraps Ariakit's accessible button.
 * This is the primitive component used internally - consumers should use the Button component instead.
 * @internal
 */
export const ButtonPrimitive = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (props, ref) => {
    return <AccessibleButton ref={ref} {...props} />;
  },
);

ButtonPrimitive.displayName = "ButtonPrimitive";

export type { AccessibleButtonProps as ButtonPrimitiveProps };
