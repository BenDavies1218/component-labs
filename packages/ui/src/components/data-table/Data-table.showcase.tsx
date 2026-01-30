import { CompositeItem } from "@ariakit/react/composite";
import { DataTable } from "./data-table";
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react/dialog";
import { useMemo, useState } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Combobox } from "../combobox/Combobox";
import { Button } from "../button/Button";
import { Menu } from "../menu/Menu";

// Showcase Configuration
export default {
  title: "Table",
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

// ============================================================================
// Reusable Table Components
// ============================================================================

const userTableHeaderClassName =
  "px-4 py-3 font-semibold text-left text-black/70";

// User Table Components
function UserTableHeader() {
  return (
    <div
      role="row"
      className="bg-gray-50 dark:bg-gray-800 grid grid-cols-[auto_1fr_1fr_120px_120px_80px] gap-4 items-center border-b border-gray-200 dark:border-gray-700"
    >
      <div className="px-4 py-3"></div>
      <div className={userTableHeaderClassName}>Name</div>
      <div className={userTableHeaderClassName}>Email</div>
      <div className={userTableHeaderClassName}>Role</div>
      <div className={userTableHeaderClassName}>Status</div>
      <div className={userTableHeaderClassName}>Actions</div>
    </div>
  );
}

function UserDetailsDialog({
  user,
  open,
  setOpen,
}: {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      backdrop={<div className="fixed inset-0 bg-black/50" />}
      className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
    >
      <DialogHeading className="text-lg font-semibold mb-4">
        User Details
      </DialogHeading>
      <div className="space-y-2 mb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Status:</strong> {user.status}
        </p>
      </div>
      <DialogDismiss className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Close
      </DialogDismiss>
    </Dialog>
  );
}

function UserRowTwo({
  user,
  selectedRows,
  setSelectedRows,
}: {
  user: User;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  const [open, setOpen] = useState(false);

  const isSelected = selectedRows.has(user.id);

  const handleCheckboxChange = () => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(user.id)) {
        newSet.delete(user.id);
      } else {
        newSet.add(user.id);
      }
      return newSet;
    });
  };

  return (
    <>
      <CompositeItem
        render={
          <div
            role="row"
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 grid grid-cols-[auto_1fr_1fr_120px_120px_80px] gap-4 items-center data-active-item:bg-primary-50 dark:data-active-item:bg-primary-950/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          />
        }
      >
        <div className="px-4 py-3 flex items-center">
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxChange}
            size="sm"
          />
        </div>
        <div className="px-4 py-3">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {user.name}
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {user.email}
          </div>
        </div>
        <div className="px-4 py-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
            {user.role}
          </span>
        </div>
        <div className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.status === "active"
                ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {user.status}
          </span>
        </div>
        <div className="px-4 py-3 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label="View details"
          >
            View
          </Button>
          <Menu.Root>
            <Menu.Trigger variant="ghost" size="sm" showArrow={false}>
              •••
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item onClick={() => alert(`Edit ${user.name}`)}>
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => alert(`Share ${user.name}`)}>
                Share
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item onClick={() => alert(`Delete ${user.name}`)}>
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </div>
      </CompositeItem>
      {open && <UserDetailsDialog user={user} open={open} setOpen={setOpen} />}
    </>
  );
}

function UserSkeletonRow() {
  return (
    <div role="row" className="border-b border-black/10 last:border-0">
      <div role="cell" className="px-4 py-3">
        <div className="h-4 w-32 animate-pulse rounded bg-black/10" />
      </div>
      <div role="cell" className="px-4 py-3">
        <div className="h-4 w-48 animate-pulse rounded bg-black/10" />
      </div>
      <div role="cell" className="px-4 py-3">
        <div className="h-4 w-20 animate-pulse rounded bg-black/10" />
      </div>
      <div role="cell" className="px-4 py-3">
        <div className="h-4 w-16 animate-pulse rounded bg-black/10" />
      </div>
    </div>
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

// Filtering Component
function TableFilters({
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: {
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) {
  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "editor", label: "Editor" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-1 min-w-40">
        <Combobox
          placeholder="Search users..."
          onValueChange={onSearchChange}
          options={[]}
          showClear={true}
          size="sm"
        />
      </div>
      <div className="min-w-40">
        <Combobox
          placeholder="Filter by role"
          options={roleOptions}
          onSelectOption={onRoleChange}
          size="sm"
        />
      </div>
      <div className="min-w-40">
        <Combobox
          placeholder="Filter by status"
          options={statusOptions}
          onSelectOption={onStatusChange}
          size="sm"
        />
      </div>
    </div>
  );
}

export function BasicTable(props: {
  data: User[];
  label: string;
  description: string;
}) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return props.data.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [props.data, searchQuery, roleFilter, statusFilter]);

  return (
    <div className="space-y-0">
      <TableFilters
        onSearchChange={setSearchQuery}
        onRoleChange={(value) =>
          setRoleFilter(value === "All Roles" ? "all" : value)
        }
        onStatusChange={(value) =>
          setStatusFilter(value === "All Status" ? "all" : value)
        }
      />
      <DataTable<User>
        data={filteredData}
        label={props.label}
        description={props.description}
        tableHeader={<UserTableHeader />}
        tableRow={(user) => (
          <UserRowTwo
            key={user.id}
            user={user}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
        loadingRow={<UserSkeletonRow />}
        emptyRow={<UserEmptyState />}
      />
    </div>
  );
}

BasicTable.props = {
  label: { type: "string", default: "User Information Table" },
  description: {
    type: "string",
    default: "A simple data table displaying user information.",
  },
  data: { type: "array", default: mockUsers },
};
