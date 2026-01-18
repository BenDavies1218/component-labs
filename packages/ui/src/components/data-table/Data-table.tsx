"use client";

import {
  type ReactNode,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import {
  Composite,
  CompositeItem,
  useCompositeStore,
  type CompositeStoreProps,
} from "@ariakit/react";
import { IntersectionObserver } from "../../lib/IntersectionObserver";

/**
 * TPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW
 * Q                    ACCESSIBLE TABLE COMPONENT                             Q
 * `PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPc
 * Q                                                                           Q
 * Q  A fully accessible table component with component-based rendering        Q
 * Q  Built with Ariakit Composite for proper keyboard navigation              Q
 * Q                                                                           Q
 * Q  FEATURES:                                                                Q
 * Q  " Component props instead of render functions                           Q
 * Q  " Arrow key navigation through table rows (Up/Down)                      Q
 * Q  " Focus loop - press Up on first row goes to last row                    Q
 * Q  " Hover to focus support for mouse users                                 Q
 * Q  " ARIA attributes for screen readers                                     Q
 * Q  " aria-live regions for loading states                                   Q
 * Q  " Infinite scroll with IntersectionObserver                              Q
 * Q  " TanStack Query integration                                             Q
 * Q  " Loading, empty, and error states                                       Q
 * Q                                                                           Q
 * Q  KEYBOARD NAVIGATION:                                                     Q
 * Q  " Up Arrow - Navigate to previous row                                    Q
 * Q  " Down Arrow - Navigate to next row                                      Q
 * Q  " Tab - Focus first row (or leave table if already focused)              Q
 * Q  " Shift+Tab - Leave table                                                Q
 * Q                                                                           Q
 * Q  USAGE:                                                                   Q
 * Q  <Table                                                                   Q
 * Q    data={items}                                                           Q
 * Q    label="Products"                                                       Q
 * Q    tableHeader={<ProductTableHeader />}                                   Q
 * Q    tableRow={(item) => <ProductRow item={item} />}                        Q
 * Q    loadingRow={<ProductSkeletonRow />}                                    Q
 * Q    emptyRow={<EmptyState />}                                              Q
 * Q    enableKeyboardNavigation={true}                                        Q
 * Q  />                                                                       Q
 * Q                                                                           Q
 * ZPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP]
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface TableProps<T> {
  // ============================================================================
  // DATA & RENDERING
  // ============================================================================

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
  tableHeader: ReactNode;

  /**
   * Table row component - receives the data item as prop
   * @param item - The data item for this row
   * @param index - The index of this item in the data array
   * @example tableRow={(item) => <ProductRow product={item} />}
   * @example tableRow={(item) => <tr><td>{item.name}</td></tr>}
   */
  tableRow: (item: T, index: number) => ReactNode;

  /**
   * Loading skeleton row component
   * Rendered multiple times (pageLimit) during loading
   * @example loadingRow={<SkeletonRow />}
   * @example loadingRow={<tr><td><Skeleton /></td></tr>}
   */
  loadingRow?: ReactNode;

  /**
   * Empty state component
   * Shown when no data is available and not loading
   * @example emptyRow={<EmptyState message="No items found" />}
   * @example emptyRow={<tr><td>No data</td></tr>}
   */
  emptyRow?: ReactNode;

  /**
   * Optional table footer component
   * @example tableFooter={<TableFooter />}
   * @example tableFooter={<tfoot><tr><td>Total</td></tr></tfoot>}
   */
  tableFooter?: ReactNode;

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
  // KEYBOARD NAVIGATION (ARIAKIT COMPOSITE)
  // ============================================================================

  /**
   * Enable arrow key navigation through table rows
   * @default true
   */
  enableKeyboardNavigation?: boolean;

  /**
   * Composite store props for customizing keyboard navigation behavior
   * @see https://ariakit.org/reference/use-composite-store
   */
  compositeProps?: CompositeStoreProps;

  // ============================================================================
  // STYLING & MISC
  // ============================================================================

  /** Additional CSS classes for the table container */
  className?: string;

  /** Additional children to render inside table element (rare use case) */
  children?: ReactNode;
}

/**
 * Props for internal table sub-components (Header, Body, Footer)
 */
interface GenericTableComponentsProps {
  children: ReactNode;
  className?: string;
}

// ============================================================================
// Table Header Component
// ============================================================================

/**
 * TableHeader
 *
 * Renders the <thead> element with consistent styling
 * Used internally by the Table component
 */
function TableHeader({
  children,
  className = "",
}: GenericTableComponentsProps) {
  return (
    <thead
      className={`border-b border-black/10 bg-black/5 ${className}`}
      role="rowgroup"
    >
      {children}
    </thead>
  );
}

// ============================================================================
// Table Body Component
// ============================================================================

/**
 * TableBody
 *
 * Renders the <tbody> element
 * Contains all data rows, loading states, and empty states
 * Used internally by the Table component
 */
function TableBody({ children, className = "" }: GenericTableComponentsProps) {
  return (
    <tbody className={className} role="rowgroup">
      {children}
    </tbody>
  );
}

// ============================================================================
// Table Footer Component
// ============================================================================

/**
 * TableFooter
 *
 * Renders the <tfoot> element with consistent styling
 * Used internally by the Table component
 * Optional - only rendered if tableFooter prop is provided
 */
function TableFooter({
  children,
  className = "",
}: GenericTableComponentsProps) {
  return (
    <tfoot
      className={`border-t border-black/10 bg-black/5 ${className}`}
      role="rowgroup"
    >
      {children}
    </tfoot>
  );
}

// ============================================================================
// Main Table Component
// ============================================================================

/**
 * Table<T>
 *
 * A fully accessible table component with component-based rendering.
 *
 * FLOW DIAGRAM:
 * 1. INITIAL LOAD (isLoading = true)
 *     � Shows pageLimit skeleton rows (loadingRow component)
 *
 * 2. DATA LOADED (data.length > 0)
 *     � Renders actual data rows (tableRow component)
 *     � Places IntersectionObserver trigger at (length - triggerOffset)
 *
 * 3. USER SCROLLS NEAR END
 *     � IntersectionObserver fires
 *     � Calls fetchNextPage()
 *     � isFetchingNextPage = true
 *  4. FETCHING MORE (isFetchingNextPage = true)
 *     � Shows pageLimit skeleton rows below existing data
 *     � Existing data remains visible
 *
 *  5. MORE DATA LOADED
 *     � New data appended to existing data array
 *     � Trigger moves to new position (near new end)
 *     � Repeat from step 3 if hasNextPage = true
 *
 * ERROR HANDLING:
 * " isError = true � IntersectionObserver disabled
 * " Prevents infinite fetch loops on failed requests
 * " User can manually retry via UI controls
 *
 * @template T - Row data type
 */
export function DataTable<T>({
  data,
  label,
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
  fetchNextPage,
  isError = false,
  triggerOffset = 5,
  rootMargin = "200px",
  enableKeyboardNavigation = true,
  compositeProps,
  className = "",
  children,
}: TableProps<T>) {
  const isEmpty = !isLoading && data.length === 0;

  // Initialize Ariakit Composite store for keyboard navigation
  const composite = useCompositeStore({
    orientation: "vertical",
    focusLoop: true,
    focusWrap: true,
    virtualFocus: false,
    ...compositeProps,
  });

  const handleLoadMore = () => {
    if (isError || !hasNextPage || isFetchingNextPage || !fetchNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (triggerOffset < 0 || triggerOffset > pageLimit) {
    throw new Error(
      `triggerOffset (${triggerOffset}) must be between 0 and pageLimit (${pageLimit})`,
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-black/10 ${className}`}
      role="region"
      aria-label={label}
      aria-describedby={description ? `${label}-description` : undefined}
    >
      {description && (
        <div id={`${label}-description`} className="sr-only">
          {description}
        </div>
      )}

      <Composite
        store={composite}
        render={<table className="w-full" role="table" aria-label={label} />}
        disabled={!enableKeyboardNavigation}
      >
        <TableHeader>{tableHeader}</TableHeader>

        <TableBody>
          {/* Show loading skeletons during initial load */}
          {isLoading &&
            loadingRow &&
            Array.from({ length: pageLimit }).map((_, index) => {
              // Clone the element to add a unique key
              if (isValidElement(loadingRow)) {
                return cloneElement(loadingRow, { key: `loading-${index}` });
              }
              return <tr key={`loading-${index}`}>{loadingRow}</tr>;
            })}

          {/* Show empty state */}
          {isEmpty && emptyRow && (
            <tr role="row">
              <td
                colSpan={100}
                className="px-4 py-8 text-center text-sm text-black/60"
                role="cell"
              >
                {emptyRow}
              </td>
            </tr>
          )}

          {/* Render actual data rows with keyboard navigation */}
          {!isLoading &&
            !isEmpty &&
            data.map((item, index) => {
              const isNearEnd = index === data.length - triggerOffset;
              const shouldShowTrigger =
                isNearEnd && hasNextPage && !isFetchingNextPage && !isError;

              const row = tableRow(item, index);

              return (
                <>
                  {/* Render the actual data row wrapped in CompositeItem */}
                  {enableKeyboardNavigation && isValidElement(row) ? (
                    <CompositeItem
                      key={`row-${index}`}
                      render={(props) => {
                        const rowElement = row as ReactElement<
                          Record<string, unknown>
                        >;

                        // Merge event handlers to preserve both row and Ariakit behavior
                        const mergedProps = {
                          ...props,
                          onClick: (e: React.MouseEvent) => {
                            // Focus the element when clicked
                            (e.currentTarget as HTMLElement).focus();
                            props.onClick?.(e);
                            (rowElement.props.onClick as any)?.(e);
                          },
                          onKeyDown: (e: React.KeyboardEvent) => {
                            props.onKeyDown?.(e);
                            (rowElement.props.onKeyDown as any)?.(e);
                          },
                          style: {
                            outline: "2px solid transparent",
                            ...(rowElement.props.style as object),
                          },
                          className:
                            `${rowElement.props.className || ""} ${props.className || ""} cursor-pointer data-[active-item]:outline-blue-500 data-[active-item]:outline-2 data-[active-item]:bg-blue-50 focus:outline-blue-500 focus:outline-2 focus:bg-blue-50`.trim(),
                        };

                        return cloneElement(rowElement, mergedProps);
                      }}
                    />
                  ) : (
                    <>{row}</>
                  )}

                  {/* IntersectionObserver trigger row */}
                  {shouldShowTrigger && (
                    <tr key={`trigger-${index}`} role="row">
                      <td colSpan={100} className="p-0">
                        <IntersectionObserver
                          onIntersect={handleLoadMore}
                          enabled={!isFetchingNextPage && !isError}
                          rootMargin={rootMargin}
                          className="h-1"
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}

          {/* Show loading skeletons when fetching more */}
          {isFetchingNextPage &&
            loadingRow &&
            Array.from({ length: pageLimit }).map((_, index) => {
              // Clone the element to add a unique key
              if (isValidElement(loadingRow)) {
                return cloneElement(loadingRow, { key: `fetching-${index}` });
              }
              return <tr key={`fetching-${index}`}>{loadingRow}</tr>;
            })}
        </TableBody>

        {tableFooter && <TableFooter>{tableFooter}</TableFooter>}

        {children}
      </Composite>

      {/* Live region for loading announcements */}
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
  );
}

export default DataTable;
