import { ReactNode } from "react";
import { cn } from "../lib/utils";

export const AnimatedGradientText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex max-w-fit flex-row items-start justify-start",
        className,
      )}
    >
      {children}
    </div>
  );
};
