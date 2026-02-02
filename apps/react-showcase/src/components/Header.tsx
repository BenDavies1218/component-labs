"use client";

import React from "react";
import { Sun, Moon, Monitor, Code } from "lucide-react";

import type { Showcase } from "../showcase";

type Theme = "light" | "dark" | "system";

interface HeaderProps {
  showcase: Showcase | null;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function Header({ showcase, theme, onThemeChange }: HeaderProps) {
  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <Sun size={18} />, label: "Light" },
    { value: "dark", icon: <Moon size={18} />, label: "Dark" },
    { value: "system", icon: <Monitor size={18} />, label: "System" },
  ];

  // Extract group from title (format: "Component / VariantName")
  const getGroup = (showcase: Showcase) => {
    const [group] = showcase.title.split(" / ");
    return group;
  };

  return (
    <header
      className="h-16 flex items-center justify-between w-full px-4 py-3 border-b"
      style={{
        backgroundColor: "var(--SC-background)",
        borderColor: "var(--SC-border)",
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Current component info */}
        {showcase && (
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ backgroundColor: "var(--SC-background-secondary)" }}
            >
              <Code size={18} style={{ color: "var(--SC-sidebar-primary)" }} />
            </div>
            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--SC-foreground)" }}
              >
                {showcase.title}
              </h2>
              <p
                className="text-xs"
                style={{ color: "var(--SC-foreground-muted)" }}
              >
                {getGroup(showcase)} / {showcase.name}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme switcher */}
        <div
          className="flex items-center rounded-lg p-1 gap-0.5"
          style={{ backgroundColor: "var(--SC-background-secondary)" }}
        >
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => onThemeChange(t.value)}
              className="p-2 rounded-md transition-all cursor-pointer hover:bg-var(--SC-background) hover:shadow-md"
              style={{
                backgroundColor:
                  theme === t.value ? "var(--SC-background)" : "transparent",
                color:
                  theme === t.value
                    ? "var(--SC-foreground)"
                    : "var(--SC-foreground-muted)",
                boxShadow:
                  theme === t.value ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
