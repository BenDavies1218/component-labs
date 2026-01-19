import { CompositeItem } from "@ariakit/react/composite";
import { DataTable } from "./data-table";
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react/dialog";
import { useState } from "react";
import { Checkbox } from "@ariakit/react";

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
    <div role="row" className="bg-black/5 grid grid-cols-4 gap-4">
      <div className={userTableHeaderClassName}>Name</div>
      <div className={userTableHeaderClassName}>Email</div>
      <div className={userTableHeaderClassName}>Role</div>
      <div className={userTableHeaderClassName}>Status</div>
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

  const handleRowClick = () => {
    setOpen(true);
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
            className="border-b border-black/10 last:border-0 grid grid-cols-2 md:grid-cols-4 gap-4 data-active-item:bg-black/5 cursor-pointer"
          />
        }
        onClick={() => handleRowClick()}
      >
        <Checkbox
          checked={selectedRows.has(user.id)}
          onChange={() => handleRowClick()}
        />
        <div className="px-4 py-3">{user.name}</div>
        <div className="px-4 py-3">{user.email}</div>
        <div className="px-4 py-3 hidden md:block">{user.role}</div>
        <div className="px-4 py-3 hidden md:block">{user.status}</div>
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

export function BasicTable(props: {
  data: User[];
  label: string;
  description: string;
}) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  return (
    <DataTable<User>
      data={props.data}
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
