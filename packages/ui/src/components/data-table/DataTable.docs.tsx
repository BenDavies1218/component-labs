
import type { ComponentDoc } from "../../types/docs";
import { DataTable } from "./DataTable";

export const dataTableDocs: ComponentDoc = {
  name: "Data Table",
  description: "Sortable, filterable data table with infinite scroll and TanStack Query integration, built on Ariakit for accessibility.",
  category: "Data Display",
  installation: `pnpm add @component-labs/ui`,
  usage: `import { DataTable } from "@component-labs/ui";

<DataTable
  data={items}
  label="Products"
  tableHeader={<tr><th>Name</th><th>Price</th></tr>}
  tableRow={(item) => <tr><td>{item.name}</td><td>{item.price}</td></tr>}
/>`,
  props: [
    {
      name: "data",
      type: "T[]",
      description: "Array of data items to display in the table",
      required: true,
    },
    {
      name: "label",
      type: "string",
      description: "Accessible label for the table",
      required: true,
    },
    {
      name: "tableHeader",
      type: "ReactElement",
      description: "Table header component",
      required: true,
    },
    {
      name: "tableRow",
      type: "(item: T, index: number) => ReactElement",
      description: "Function to render each table row",
      required: true,
    },
    {
      name: "description",
      type: "string",
      description: "Optional description for assistive technology",
    },
    {
      name: "loadingRow",
      type: "ReactElement",
      description: "Skeleton row component shown during loading",
    },
    {
      name: "emptyRow",
      type: "ReactElement",
      description: "Component shown when no data is available",
    },
    {
      name: "tableFooter",
      type: "ReactElement",
      description: "Optional table footer component",
    },
    {
      name: "pageLimit",
      type: "number",
      description: "Number of skeleton rows to show during loading",
      default: "10",
    },
    {
      name: "isLoading",
      type: "boolean",
      description: "Initial loading state",
      default: "false",
    },
    {
      name: "hasNextPage",
      type: "boolean",
      description: "Whether there are more pages to fetch",
      default: "false",
    },
    {
      name: "fetchNextPage",
      type: "() => void",
      description: "Callback to fetch the next page",
    },
    {
      name: "isFetchingNextPage",
      type: "boolean",
      description: "Whether currently fetching next page",
      default: "false",
    },
    {
      name: "isError",
      type: "boolean",
      description: "Error state - prevents infinite retry loops",
      default: "false",
    },
    {
      name: "triggerOffset",
      type: "number",
      description: "Number of rows from end to trigger fetchNextPage",
      default: "5",
    },
    {
      name: "rootMargin",
      type: "string",
      description: "IntersectionObserver rootMargin",
      default: "'200px'",
    },
  ],
  examples: [
    {
      title: "Basic Table",
      code: `const products = [
  { id: 1, name: "Product A", price: "$10" },
  { id: 2, name: "Product B", price: "$20" },
];

<DataTable
  data={products}
  label="Products"
  tableHeader={
    <tr>
      <th>Name</th>
      <th>Price</th>
    </tr>
  }
  tableRow={(product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )}
/>`,
      description: "Simple data table with static data",
    },
    {
      title: "With Infinite Scroll",
      code: `const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({ ... });

<DataTable
  data={data?.pages.flatMap(p => p.items) ?? []}
  label="Items"
  isLoading={isLoading}
  hasNextPage={hasNextPage}
  fetchNextPage={fetchNextPage}
  isFetchingNextPage={isFetchingNextPage}
  tableHeader={<tr><th>Name</th></tr>}
  tableRow={(item) => <tr><td>{item.name}</td></tr>}
  loadingRow={<tr><td><Skeleton /></td></tr>}
/>`,
      description: "Infinite scroll with TanStack Query",
    },
    {
      title: "With Empty State",
      code: `<DataTable
  data={[]}
  label="Users"
  tableHeader={<tr><th>Name</th><th>Email</th></tr>}
  tableRow={(user) => <tr><td>{user.name}</td><td>{user.email}</td></tr>}
  emptyRow={
    <div className="text-center py-8">
      <p>No users found</p>
      <Button onClick={addUser}>Add User</Button>
    </div>
  }
/>`,
      description: "Custom empty state when no data",
    },
  ],
  accessibility: [
    "Built on Ariakit's Composite component for keyboard navigation",
    "Proper ARIA table roles (table, row, cell, rowgroup)",
    "Screen reader announcements for loading states",
    "Accessible labels and descriptions",
    "Keyboard navigation between cells",
    "Live region announcements for data changes",
  ],
  relatedComponents: ["Carousel"],
  performance: {
    bundleSize: "~6kB gzipped",
    dependencies: ["@ariakit/react"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <DataTable
      data={[
        { id: 1, name: "Product A", price: "$10" },
        { id: 2, name: "Product B", price: "$20" },
      ]}
      label="Products"
      tableHeader={
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      }
      tableRow={(item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
      )}
    />
  ),
};
