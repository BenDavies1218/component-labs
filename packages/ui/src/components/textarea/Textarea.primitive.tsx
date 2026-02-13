import { forwardRef } from "react";

export interface TextareaPrimitiveProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Whether the textarea is disabled */
  disabled?: boolean;
}

/**
 * TextareaPrimitive
 *
 * Base textarea element with proper accessibility attributes
 */
export const TextareaPrimitive = forwardRef<
  HTMLTextAreaElement,
  TextareaPrimitiveProps
>(({ disabled, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
});

TextareaPrimitive.displayName = "TextareaPrimitive";
