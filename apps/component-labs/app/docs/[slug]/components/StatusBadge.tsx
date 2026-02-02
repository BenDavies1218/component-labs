interface StatusBadgeProps {
  status: "stable" | "beta" | "experimental" | "deprecated";
  version?: string;
}

const statusConfig = {
  stable: {
    label: "Stable",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  beta: {
    label: "Beta",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  experimental: {
    label: "Experimental",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function StatusBadge({ status, version }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
      {version && (
        <span className="text-sm text-muted-foreground">v{version}</span>
      )}
    </div>
  );
}
