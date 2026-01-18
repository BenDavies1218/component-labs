import { useState } from "react";
import { DataTable } from "./data-table";

// Showcase Configuration
export default {
  title: "Table (Component Props)",
  component: DataTable,
};

// ============================================================================
// Mock Data Types
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// ============================================================================
// Mock Data
// ============================================================================

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "Editor",
    status: "active",
  },
  {
    id: 5,
    name: "Eve Davis",
    email: "eve@example.com",
    role: "User",
    status: "active",
  },
];

const mockProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics", stock: 15 },
  { id: 2, name: "Mouse", price: 25, category: "Electronics", stock: 50 },
  { id: 3, name: "Keyboard", price: 75, category: "Electronics", stock: 30 },
  { id: 4, name: "Monitor", price: 299, category: "Electronics", stock: 20 },
  { id: 5, name: "Webcam", price: 89, category: "Electronics", stock: 12 },
];

// ============================================================================
// Reusable Table Components
// ============================================================================

// User Table Components
function UserTableHeader() {
  return (
    <tr>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
        Name
      </th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
        Email
      </th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
        Role
      </th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
        Status
      </th>
    </tr>
  );
}

function UserTableRow({ user }: { user: User }) {
  return (
    <tr className="border-b border-black/10 last:border-0">
      <td className="px-4 py-3 text-sm text-black/80">{user.name}</td>
      <td className="px-4 py-3 text-sm text-black/80">{user.email}</td>
      <td className="px-4 py-3 text-sm text-black/80">{user.role}</td>
      <td className="px-4 py-3 text-sm text-black/80">
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs ${
            user.status === "active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {user.status}
        </span>
      </td>
    </tr>
  );
}

function UserSkeletonRow() {
  return (
    <tr className="border-b border-black/10">
      <td className="px-4 py-3">
        <div className="h-4 w-32 animate-pulse rounded bg-black/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-48 animate-pulse rounded bg-black/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 animate-pulse rounded bg-black/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 animate-pulse rounded bg-black/10" />
      </td>
    </tr>
  );
}

function UserEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 py-8">
      <div className="text-4xl">=�</div>
      <div className="font-semibold text-black">No users found</div>
      <div className="text-xs text-black/40">
        Try adding some users to get started
      </div>
    </div>
  );
}

function ProductTableRow({ product }: { product: Product }) {
  return (
    <tr className="border-b border-black/10 last:border-0">
      <td className="px-4 py-3 text-sm text-black/80">{product.name}</td>
      <td className="px-4 py-3 text-sm text-black/80">${product.price}</td>
      <td className="px-4 py-3 text-sm text-black/80">{product.category}</td>
      <td className="px-4 py-3 text-sm text-black/80">{product.stock}</td>
    </tr>
  );
}

function ProductSkeletonRow() {
  return (
    <tr className="border-b border-white/10">
      <td className="px-4 py-3">
        <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
      </td>
    </tr>
  );
}

// ============================================================================
// Basic Table Example
// ============================================================================

export function BasicTable() {
  return (
    <DataTable<User>
      data={mockUsers}
      label="User list"
      description="A list of all users in the system"
      tableHeader={<UserTableHeader />}
      tableRow={(user) => <UserTableRow key={user.id} user={user} />}
      loadingRow={<UserSkeletonRow />}
      emptyRow={<UserEmptyState />}
    />
  );
}

// ============================================================================
// Empty State Example
// ============================================================================

export function EmptyTable() {
  return (
    <DataTable<User>
      data={[]}
      label="Empty user list"
      tableHeader={<UserTableHeader />}
      tableRow={(user) => <UserTableRow key={user.id} user={user} />}
      emptyRow={<UserEmptyState />}
    />
  );
}

// ============================================================================
// Loading State Example
// ============================================================================

export function LoadingTable() {
  return (
    <DataTable<User>
      data={[]}
      label="Loading users"
      isLoading
      pageLimit={5}
      tableHeader={<UserTableHeader />}
      tableRow={(user) => <UserTableRow key={user.id} user={user} />}
      loadingRow={<UserSkeletonRow />}
      emptyRow={<UserEmptyState />}
    />
  );
}

// ============================================================================
// Interactive Rows Example
// ============================================================================

function InteractiveUserRow({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) {
  return (
    <tr
      className="cursor-pointer border-b border-black/10 last:border-0 hover:bg-black/5 focus-within:bg-black/5"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <td className="px-4 py-3 text-sm text-black/80">{user.name}</td>
      <td className="px-4 py-3 text-sm text-black/80">{user.email}</td>
      <td className="px-4 py-3 text-sm text-black/80">{user.role}</td>
    </tr>
  );
}

export function InteractiveTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-4">
      <DataTable<User>
        data={mockUsers}
        label="Interactive user list"
        className="w-128"
        tableHeader={
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60">
              Role
            </th>
          </tr>
        }
        tableRow={(user) => (
          <InteractiveUserRow
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        )}
        loadingRow={<UserSkeletonRow />}
        emptyRow={<UserEmptyState />}
      />

      {selectedUser && (
        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
          <h3 className="mb-2 font-semibold text-black">Selected User:</h3>
          <p className="text-sm text-black/80">
            {selectedUser.name} ({selectedUser.email})
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Sortable Table Example
// ============================================================================

type SortField = keyof Product;
type SortDirection = "asc" | "desc" | "none";

function SortableProductHeader({
  sortField,
  sortDirection,
  onSort,
}: {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) {
  const HeaderCell = ({
    field,
    children,
  }: {
    field: SortField;
    children: string;
  }) => {
    const isSortable = true;
    const isActive = sortField === field;
    const direction = isActive ? sortDirection : "none";

    return (
      <th
        className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60 ${
          isSortable ? "cursor-pointer select-none hover:text-black/80" : ""
        }`}
        onClick={() => onSort(field)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSort(field);
          }
        }}
        tabIndex={0}
        role="columnheader"
        aria-sort={
          direction === "asc"
            ? "ascending"
            : direction === "desc"
              ? "descending"
              : undefined
        }
      >
        <div className="flex items-center gap-2">
          {children}
          {direction !== "none" && (
            <span aria-hidden="true">{direction === "asc" ? "�" : "�"}</span>
          )}
        </div>
      </th>
    );
  };

  return (
    <tr>
      <HeaderCell field="name">Product</HeaderCell>
      <HeaderCell field="price">Price</HeaderCell>
      <HeaderCell field="category">Category</HeaderCell>
      <HeaderCell field="stock">Stock</HeaderCell>
    </tr>
  );
}

export function SortableTable() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortDirection === "none") return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "none" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <DataTable<Product>
      data={sortedProducts}
      label="Sortable product list"
      tableHeader={
        <SortableProductHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      }
      tableRow={(product) => (
        <ProductTableRow key={product.id} product={product} />
      )}
      loadingRow={<ProductSkeletonRow />}
      emptyRow={
        <div className="py-8 text-center text-black/60">No products found</div>
      }
    />
  );
}

// ============================================================================
// With Footer Example
// ============================================================================

export function TableWithFooter() {
  const totalStock = mockProducts.reduce(
    (sum, product) => sum + product.stock,
    0,
  );
  const averagePrice =
    mockProducts.reduce((sum, product) => sum + product.price, 0) /
    mockProducts.length;

  return (
    <DataTable<Product>
      data={mockProducts}
      label="Products with summary"
      tableHeader={
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
            Product
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
            Price
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
            Stock
          </th>
        </tr>
      }
      tableRow={(product) => (
        <tr key={product.id} className="border-b border-white/10 last:border-0">
          <td className="px-4 py-3 text-sm text-white/80">{product.name}</td>
          <td className="px-4 py-3 text-sm text-white/80">${product.price}</td>
          <td className="px-4 py-3 text-sm text-white/80">{product.stock}</td>
        </tr>
      )}
      tableFooter={
        <tr>
          <td className="px-4 py-3 text-sm font-semibold text-white/80">
            Summary
          </td>
          <td className="px-4 py-3 text-sm font-semibold text-white/80">
            Avg: ${averagePrice.toFixed(2)}
          </td>
          <td className="px-4 py-3 text-sm font-semibold text-white/80">
            Total: {totalStock}
          </td>
        </tr>
      }
      loadingRow={<ProductSkeletonRow />}
      emptyRow={
        <div className="py-8 text-center text-white/60">No products found</div>
      }
    />
  );
}

// ============================================================================
// Simulated Infinite Scroll Example
// ============================================================================

export function InfiniteScrollTable() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Simulate paginated data
  const allItems: User[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["Admin", "User", "Editor"][i % 3] as string,
    status: (i % 2 === 0 ? "active" : "inactive") as "active" | "inactive",
  }));

  const displayedData = allItems.slice(0, page * itemsPerPage);
  const hasMore = displayedData.length < allItems.length;

  const fetchNextPage = () => {
    setTimeout(() => {
      setPage((p) => p + 1);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <DataTable<User>
        data={displayedData}
        label="Infinite scroll user list"
        hasNextPage={hasMore}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={false}
        pageLimit={itemsPerPage}
        triggerOffset={1}
        tableHeader={
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
              Role
            </th>
          </tr>
        }
        tableRow={(user) => (
          <tr key={user.id} className="border-b border-white/10 last:border-0">
            <td className="px-4 py-3 text-sm text-white/80">{user.name}</td>
            <td className="px-4 py-3 text-sm text-white/80">{user.email}</td>
            <td className="px-4 py-3 text-sm text-white/80">{user.role}</td>
          </tr>
        )}
        loadingRow={
          <tr className="border-b border-white/10">
            <td className="px-4 py-3" colSpan={3}>
              <div className="h-8 animate-pulse rounded bg-white/10" />
            </td>
          </tr>
        }
        emptyRow={<UserEmptyState />}
      />

      <div className="text-center text-sm text-white/60">
        Showing {displayedData.length} of {allItems.length} items
        {hasMore && " (scroll to load more)"}
      </div>
    </div>
  );
}
