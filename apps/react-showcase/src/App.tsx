"use client";

import { useState, useEffect, useRef } from "react";
import { showcaseGroups, type Showcase } from "./showcase";
import { Sidebar } from "./components/Sidebar";
import { Preview } from "./components/Preview";
import { Controls } from "./components/Controls";
import { Header } from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { GettingStarted } from "./components/GettingStarted";

type Theme = "light" | "dark" | "system";
type ControlsPosition = "bottom" | "right";

export default function App() {
  const firstShowcase = Object.values(showcaseGroups)[0]?.[0];
  const selectedIdRef = useRef<string | null>(null);

  // Initialize control values with defaults from first showcase
  const getInitialControlValues = (showcase: Showcase | null) => {
    if (!showcase?.props) return {};
    const values: Record<string, any> = {};
    Object.entries(showcase.props).forEach(([key, config]) => {
      values[key] = config.default;
    });
    return values;
  };

  // Get initial showcase from localStorage or use first showcase
  const getInitialShowcase = (): Showcase | null => {
    const storedId = localStorage.getItem("showcase-selected-id");
    if (storedId) {
      selectedIdRef.current = storedId;
      // Find the showcase by ID
      for (const showcases of Object.values(showcaseGroups)) {
        const found = showcases.find((s) => s.id === storedId);
        if (found) return found;
      }
    }
    const initial = firstShowcase || null;
    if (initial) {
      selectedIdRef.current = initial.id;
    }
    return initial;
  };

  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(
    getInitialShowcase,
  );
  const [controlValues, setControlValues] = useState<Record<string, any>>(
    getInitialControlValues(getInitialShowcase()),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("showcase-theme");
    return (stored as Theme) || "system";
  });
  const [controlsPosition, setControlsPosition] =
    useState<ControlsPosition>("bottom");
  const [showGettingStarted, setShowGettingStarted] = useState(false);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
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
    selectedIdRef.current = showcase.id;
    setSelectedShowcase(showcase);
    setShowGettingStarted(false); // Hide getting started when selecting a showcase
    // Save to localStorage
    localStorage.setItem("showcase-selected-id", showcase.id);
    const initialValues: Record<string, any> = {};
    if (showcase.props) {
      Object.entries(showcase.props).forEach(([key, config]) => {
        initialValues[key] = config.default;
      });
    }
    setControlValues(initialValues);
  };

  const handleGettingStartedClick = () => {
    setShowGettingStarted(true);
    setSelectedShowcase(null);
  };

  // Save selected showcase ID to localStorage whenever it changes
  useEffect(() => {
    if (selectedShowcase) {
      localStorage.setItem("showcase-selected-id", selectedShowcase.id);
      selectedIdRef.current = selectedShowcase.id;
    }
  }, [selectedShowcase]);

  // Update selected showcase when showcaseGroups changes (hot reload)
  useEffect(() => {
    // Always try to restore from the ref (which persists across renders)
    const currentId = selectedIdRef.current;
    if (!currentId) return;

    // Find the showcase with the stored ID
    for (const showcases of Object.values(showcaseGroups)) {
      const found = showcases.find((s) => s.id === currentId);
      if (found) {
        setSelectedShowcase(found);
        return;
      }
    }
  }, [showcaseGroups]);

  const handleControlChange = (key: string, value: any) => {
    setControlValues((prev) => ({ ...prev, [key]: value }));
  };

  const hasControls =
    selectedShowcase?.props && Object.keys(selectedShowcase.props).length > 0;

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: "var(--SC-background)" }}
    >
      <Sidebar
        showcaseGroups={showcaseGroups}
        selectedShowcase={selectedShowcase}
        onShowcaseSelect={handleShowcaseSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGettingStartedClick={handleGettingStartedClick}
        showGettingStarted={showGettingStarted}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          showcase={selectedShowcase}
          theme={theme}
          onThemeChange={setTheme}
        />

        {showGettingStarted ? (
          <GettingStarted />
        ) : (
          <div
            className={`flex-1 flex overflow-hidden ${controlsPosition === "bottom" ? "flex-col" : "flex-row"}`}
          >
            <ErrorBoundary>
              <Preview
                showcase={selectedShowcase}
                controlValues={controlValues}
              />
            </ErrorBoundary>

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
        )}
      </div>
    </div>
  );
}
