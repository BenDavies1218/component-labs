import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <div style={{ padding: "1rem", border: "2px solid blue" }}>
      <p style={{ marginBottom: "1rem", color: "blue", fontWeight: "bold" }}>
        🎨 Global Provider Active
      </p>
      {children}
    </div>
  );
}
