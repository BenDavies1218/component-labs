import {
  Composite,
  useCompositeStore,
  type CompositeProps,
  type CompositeStoreProps,
} from "@ariakit/react";
import { forwardRef } from "react";

/**
 * Primitive data table components that wrap Ariakit's composite.
 * These are used internally - consumers should use the DataTable component instead.
 * @internal
 */

export const CompositePrimitive = forwardRef<HTMLDivElement, CompositeProps>(
  (props, ref) => <Composite ref={ref} {...props} />
);
CompositePrimitive.displayName = "CompositePrimitive";

export const useCompositeStorePrimitive = useCompositeStore;

export type { CompositeProps, CompositeStoreProps };
