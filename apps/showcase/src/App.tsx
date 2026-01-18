"use client";

import { useState, useEffect } from "react";
import { showcaseGroups, type Showcase } from "./showcase";
import { Sidebar } from "./components/Sidebar";
import { Preview } from "./components/Preview";
import { Controls } from "./components/Controls";
import { Header } from "./components/Header";

type Theme = "light" | "dark" | "system";
type ControlsPosition = "bottom" | "right";

export default function App() {
  const firstShowcase = Object.values(showcaseGroups)[0]?.[0];
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(
    firstShowcase || null,
  );
  const [controlValues, setControlValues] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("showcase-theme");
    return (stored as Theme) || "system";
  });
  const [controlsPosition, setControlsPosition] =
    useState<ControlsPosition>("right");

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("showcase-theme", theme);
  }, [theme]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName !== "INPUT" &&
          activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          const searchInput = document.querySelector(
            'input[placeholder*="Search"]',
          ) as HTMLInputElement;
          searchInput?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleShowcaseSelect = (showcase: Showcase) => {
    setSelectedShowcase(showcase);
    const initialValues: Record<string, any> = {};
    if (showcase.controls) {
      Object.entries(showcase.controls).forEach(([key, config]) => {
        initialValues[key] = config.default;
      });
    }
    setControlValues(initialValues);
  };

  const handleControlChange = (key: string, value: any) => {
    setControlValues((prev) => ({ ...prev, [key]: value }));
  };

  const hasControls =
    selectedShowcase?.controls &&
    Object.keys(selectedShowcase.controls).length > 0;

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Sidebar
        showcaseGroups={showcaseGroups}
        selectedShowcase={selectedShowcase}
        onShowcaseSelect={handleShowcaseSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          showcase={selectedShowcase}
          theme={theme}
          onThemeChange={setTheme}
        />

        <div
          className={`flex-1 flex overflow-hidden ${controlsPosition === "bottom" ? "flex-col" : "flex-row"}`}
        >
          <Preview showcase={selectedShowcase} controlValues={controlValues} />

          {hasControls && (
            <Controls
              showcase={selectedShowcase}
              controlValues={controlValues}
              onControlChange={handleControlChange}
              position={controlsPosition}
              onPositionChange={setControlsPosition}
            />
          )}
        </div>
      </div>
    </div>
  );
}
