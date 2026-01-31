import {
  Dialog as AriaDialog,
  DialogDismiss,
  DialogHeading,
  DialogDescription as AriaDialogDescription,
  useDialogStore,
  type DialogProps as AriaDialogProps,
  type DialogStore,
} from "@ariakit/react";
import { cva } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

const overlayVariants = cva([
  "fixed inset-0 z-50 bg-black/50",
  "data-enter:animate-in data-enter:fade-in-0",
  "data-leave:animate-out data-leave:fade-out-0",
]);

const dialogVariants = cva([
  "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
  "w-full max-w-lg",
  "rounded-lg border bg-white p-6 shadow-lg",
  "dark:bg-gray-900 dark:border-gray-700",
  "data-enter:animate-in data-enter:fade-in-0 data-enter:zoom-in-95",
  "data-leave:animate-out data-leave:fade-out-0 data-leave:zoom-out-95",
]);

// Dialog Root with Store
export interface DialogRootProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function DialogRoot({
  children,
  open,
  onOpenChange,
  defaultOpen,
}: DialogRootProps) {
  const dialog = useDialogStore({
    open,
    setOpen: onOpenChange,
    defaultOpen,
  });

  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;
}

// Context for dialog store
import { createContext, useContext } from "react";

const DialogContext = createContext<DialogStore | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within DialogRoot");
  }
  return context;
}

// Dialog Trigger
export interface DialogTriggerProps {
  children: ReactNode;
  className?: string;
}

export function DialogTrigger({ children, className }: DialogTriggerProps) {
  const dialog = useDialog();

  return (
    <button
      onClick={() => dialog.setOpen(true)}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

// Dialog Content
export interface DialogContentProps extends Omit<AriaDialogProps, "store"> {
  /** Whether to show the backdrop overlay */
  backdrop?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ backdrop = true, className, children, ...props }, ref) => {
    const dialog = useDialog();

    return (
      <>
        {backdrop && (
          <div
            className={overlayVariants()}
            onClick={() => dialog.setOpen(false)}
          />
        )}
        <AriaDialog
          ref={ref}
          store={dialog}
          className={cn(dialogVariants(), className)}
          {...props}
        >
          {children}
        </AriaDialog>
      </>
    );
  },
);

DialogContent.displayName = "DialogContent";

// Dialog Header
export interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn("mb-4 space-y-1.5", className)}>
      {children}
    </div>
  );
}

// Dialog Title
export interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className }, ref) => {
    return (
      <DialogHeading
        ref={ref}
        className={cn(
          "text-lg font-semibold text-gray-900 dark:text-gray-100",
          className,
        )}
      >
        {children}
      </DialogHeading>
    );
  },
);

DialogTitle.displayName = "DialogTitle";

// Dialog Description
export interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className }, ref) => {
  return (
    <AriaDialogDescription
      ref={ref}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    >
      {children}
    </AriaDialogDescription>
  );
});

DialogDescription.displayName = "DialogDescription";

// Dialog Footer
export interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)}>
      {children}
    </div>
  );
}

// Dialog Close
export interface DialogCloseProps {
  children: ReactNode;
  className?: string;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className }, ref) => {
    return (
      <DialogDismiss ref={ref} className={className}>
        {children}
      </DialogDismiss>
    );
  },
);

DialogClose.displayName = "DialogClose";

// Compound component export
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};
