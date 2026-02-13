"use client";

import { cva } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle,
  Info,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// Toast Variants
// ============================================================================

export const toastVariants = cva(
  [
    "relative flex items-start gap-3 rounded-lg border p-4 shadow-lg",
    "transition-all duration-300",
    "animate-in slide-in-from-top-5",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/10 dark:border-white/10",
          "bg-white dark:bg-black",
          "text-black dark:text-white",
        ],
        success: [
          "border-green-200 dark:border-green-800",
          "bg-green-50 dark:bg-green-950",
          "text-green-900 dark:text-green-100",
        ],
        error: [
          "border-error-200 dark:border-error-800",
          "bg-error-50 dark:bg-error-950",
          "text-error-900 dark:text-error-100",
        ],
        warning: [
          "border-yellow-200 dark:border-yellow-800",
          "bg-yellow-50 dark:bg-yellow-950",
          "text-yellow-900 dark:text-yellow-100",
        ],
        info: [
          "border-blue-200 dark:border-blue-800",
          "bg-blue-50 dark:bg-blue-950",
          "text-blue-900 dark:text-blue-100",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Toast Context
// ============================================================================

export interface ToastData {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastItem extends Required<Pick<ToastData, "id">> {
  title?: ReactNode;
  description?: ReactNode;
  variant: ToastData["variant"];
  duration: number;
  action?: ToastData["action"];
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (data: ToastData) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("Toast components must be used within ToastProvider");
  }
  return context;
};

// ============================================================================
// Toast Provider
// ============================================================================

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((data: ToastData) => {
    const id = data.id || Math.random().toString(36).substring(7);
    const toast: ToastItem = {
      id,
      title: data.title,
      description: data.description,
      variant: data.variant || "default",
      duration: data.duration ?? 5000,
      action: data.action,
    };

    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            {...toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ============================================================================
// Toast Component (Internal)
// ============================================================================

interface ToastComponentProps {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration: number;
  action?: ToastData["action"];
  onRemove: () => void;
}

function ToastComponent({
  title,
  description,
  variant = "default",
  duration,
  action,
  onRemove,
}: ToastComponentProps) {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onRemove();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onRemove]);

  const icons: Record<string, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = variant && variant !== "default" ? icons[variant] : null;

  return (
    <div className={cn(toastVariants({ variant }))}>
      {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}

      <div className="flex-1 space-y-1">
        {title && <div className="font-semibold text-sm">{title}</div>}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline underline-offset-4 hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        onClick={onRemove}
        className="shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ============================================================================
// useToast Hook
// ============================================================================

export function useToast() {
  const { addToast, removeToast, toasts } = useToastContext();

  const toast = useCallback(
    (data: ToastData) => {
      return addToast(data);
    },
    [addToast],
  );

  const success = useCallback(
    (title: ReactNode, description?: ReactNode) => {
      return addToast({ title, description, variant: "success" });
    },
    [addToast],
  );

  const error = useCallback(
    (title: ReactNode, description?: ReactNode) => {
      return addToast({ title, description, variant: "error" });
    },
    [addToast],
  );

  const warning = useCallback(
    (title: ReactNode, description?: ReactNode) => {
      return addToast({ title, description, variant: "warning" });
    },
    [addToast],
  );

  const info = useCallback(
    (title: ReactNode, description?: ReactNode) => {
      return addToast({ title, description, variant: "info" });
    },
    [addToast],
  );

  const dismiss = useCallback(
    (id?: string) => {
      if (id) {
        removeToast(id);
      } else {
        // Dismiss all toasts
        toasts.forEach((t) => removeToast(t.id));
      }
    },
    [removeToast, toasts],
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
  };
}

// ============================================================================
// Toast (Main Export)
// ============================================================================

export const Toast = Object.assign(ToastProvider, {
  Provider: ToastProvider,
  useToast,
});
