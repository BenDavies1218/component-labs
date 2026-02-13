import type { RegistryEntry } from "../schema";

const primitiveContent = `import {
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
`;

const componentContent = `"use client";

import React, {
  type ReactNode,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import { IntersectionObserver } from "../../lib/IntersectionObserver";
import { cn } from "../../lib/utils";
import {
  CompositePrimitive,
  useCompositeStorePrimitive,
} from "./DataTable.primitive";

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface TableProps<T> {
  /** Array of data items to display in the table */
  data: T[];

  /** Accessible label for the table */
  label: string;

  /** Optional description for assistive technology */
  description?: string;

  /**
   * Table header component
   * Can be a React element or component
   * @example tableHeader={<TableHeader />}
   * @example tableHeader={<tr><th>Name</th></tr>}
   */
  tableHeader: ReactElement;

  /**
   * Table row component - receives the data item as prop
   * @param item - The data item for this row
   * @param index - The index of this item in the data array
   * @example tableRow={(item) => <ProductRow product={item} />}
   * @example tableRow={(item) => <tr><td>{item.name}</td></tr>}
   */
  tableRow: (item: T, index: number) => ReactElement;

  /**
   * Loading skeleton row component
   * Rendered multiple times (pageLimit) during loading
   * @example loadingRow={<SkeletonRow />}
   * @example loadingRow={<tr><td><Skeleton /></td></tr>}
   */
  loadingRow?: ReactElement;

  /**
   * Empty state component
   * Shown when no data is available and not loading
   * @example emptyRow={<EmptyState message="No items found" />}
   * @example emptyRow={<tr><td>No data</td></tr>}
   */
  emptyRow?: ReactElement;

  /**
   * Optional table footer component
   * @example tableFooter={<TableFooter />}
   * @example tableFooter={<tfoot><tr><td>Total</td></tr></tfoot>}
   */
  tableFooter?: ReactElement;

  // ============================================================================
  // TANSTACK QUERY INTEGRATION
  // ============================================================================

  /** Number of skeleton rows to show during loading states */
  pageLimit?: number;

  /** Initial loading state - shows skeleton rows for entire first page */
  isLoading?: boolean;

  /** Whether there are more pages to fetch (enables IntersectionObserver) */
  hasNextPage?: boolean;

  /** Callback to fetch the next page when user scrolls near the end */
  fetchNextPage?: () => void;

  /** Whether currently fetching next page - shows additional skeleton rows */
  isFetchingNextPage?: boolean;

  /**
   * Error state - disables IntersectionObserver to prevent infinite loops
   * IMPORTANT: Pass this to prevent continuous failed fetch attempts
   */
  isError?: boolean;

  // ============================================================================
  // INFINITE SCROLL CONFIGURATION
  // ============================================================================

  /**
   * Number of rows from the end to trigger fetchNextPage
   * @default 5
   * @example triggerOffset={10} - Trigger when user is 10 rows from bottom
   */
  triggerOffset?: number;

  /**
   * IntersectionObserver rootMargin (how far before trigger enters viewport)
   * @default "200px"
   * @example rootMargin="500px" - Start fetching 500px before trigger is visible
   */
  rootMargin?: string;

  // ============================================================================
  // STYLING & MISC
  // ============================================================================

  /** Additional CSS classes for the table container */
  className?: string;

  /** Additional children to render inside table element (rare use case) */
  children?: ReactNode;
}

/**
 * Table<T>
 *
 * A fully accessible table component with row-based rendering.
 *
 * @template T - Row data type
 */
export function DataTable<T>({
  data,
  label = "Data Table",
  description,
  tableHeader,
  tableRow,
  loadingRow,
  emptyRow,
  tableFooter,
  isLoading = false,
  pageLimit = 10,
  isFetchingNextPage = false,
  hasNextPage = false,
  fetchNextPage = undefined,
  isError = false,
  triggerOffset = 5,
  rootMargin = "200px",
  className = "",
  children,
}: TableProps<T>) {
  const isEmpty = !isLoading && data.length === 0;
  const store = useCompositeStorePrimitive({ defaultActiveId: null });

  const handleLoadMore = () => {
    if (isError || !hasNextPage || isFetchingNextPage || !fetchNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (triggerOffset < 0 || triggerOffset > pageLimit) {
    throw new Error(
      \`triggerOffset (\${triggerOffset}) must be between 0 and pageLimit (\${pageLimit})\`,
    );
  }

  return (
    <CompositePrimitive store={store}>
      <div
        className={cn("overflow-x-auto rounded-lg border border-black/10", className)}
        role="region"
        aria-label={label}
        aria-describedby={description ? \`\${label}-description\` : undefined}
      >
        {description && (
          <div id={\`\${label}-description\`} className="sr-only">
            {description}
          </div>
        )}

        {label}

        <div role="table" aria-label={label} className="w-full">
          <div role="rowgroup">{tableHeader}</div>

          <div role="rowgroup">
            {isLoading &&
              loadingRow &&
              Array.from({ length: pageLimit }).map((_, index) => {
                if (isValidElement(loadingRow)) {
                  return cloneElement(loadingRow, { key: \`loading-\${index}\` });
                }
                return (
                  <div key={\`loading-\${index}\`} role="row">
                    {loadingRow}
                  </div>
                );
              })}

            {isEmpty && emptyRow && (
              <div role="row">
                <div
                  role="cell"
                  className="px-4 py-8 text-center text-sm text-black/60"
                >
                  {emptyRow}
                </div>
              </div>
            )}

            {!isLoading &&
              !isEmpty &&
              data.map((item, index) => {
                const isNearEnd = index === data.length - triggerOffset;
                const shouldShowTrigger =
                  isNearEnd && hasNextPage && !isFetchingNextPage && !isError;

                return (
                  <React.Fragment key={\`row-\${index}\`}>
                    {tableRow(item, index)}

                    {shouldShowTrigger && (
                      <div role="row">
                        <div role="cell" className="p-0">
                          <IntersectionObserver
                            onIntersect={handleLoadMore}
                            enabled={!isFetchingNextPage && !isError}
                            rootMargin={rootMargin}
                            className="h-1"
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          {tableFooter && <div role="rowgroup">{tableFooter}</div>}

          {children}
        </div>

        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {isLoading && "Loading data..."}
          {isFetchingNextPage && "Loading more items..."}
          {isEmpty && "No items to display"}
        </div>
      </div>
    </CompositePrimitive>
  );
}

export default DataTable;
`;

const intersectionObserverContent = `"use client";

import { useEffect, useRef } from "react";

interface IntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable Intersection Observer component
 * Triggers a callback when the component enters the viewport
 *
 * @param onIntersect - Callback to trigger when element intersects
 * @param enabled - Whether the observer is active (default: true)
 * @param rootMargin - Margin around the root (default: "100px")
 * @param threshold - Intersection threshold 0-1 (default: 0.1)
 * @param children - Optional children to render
 * @param className - Optional CSS classes
 */
export function IntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = "100px",
  threshold = 0.1,
  children,
  className = "",
}: IntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, enabled, rootMargin, threshold]);

  return (
    <div ref={targetRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Simpler hook-based version if you want more control
 */
export function useIntersectionObserver(
  callback: () => void,
  options?: {
    enabled?: boolean;
    rootMargin?: string;
    threshold?: number;
  },
) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { enabled = true, rootMargin = "100px", threshold = 0.1 } = options ?? {};

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          callback();
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [callback, enabled, rootMargin, threshold]);

  return targetRef;
}
`;

const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export const dataTable: RegistryEntry = {
  name: "data-table",
  type: "components:ui",
  description: "DataTable component with infinite scroll",
  dependencies: ["@ariakit/react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/data-table.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/data-table.primitive.tsx"
    },
    {
      path: "components/ui/data-table.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/data-table.tsx"
    },
    {
      path: "lib/IntersectionObserver.tsx",
      content: intersectionObserverContent,
      type: "registry:lib",
      target: "lib/IntersectionObserver.tsx"
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts"
    }
  ],
  tailwind: {
    config: {
      theme: {
        extend: {}
      }
    }
  },
  meta: {
    importSpecifier: "DataTable",
    moduleSpecifier: "@/components/ui/data-table"
  }
};
