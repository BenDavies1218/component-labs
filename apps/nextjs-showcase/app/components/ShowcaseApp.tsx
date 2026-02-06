"use client";

import { useState, useEffect } from "react";
import {
  type Theme,
  type ControlsPosition,
  type Showcase,
  type ShowcaseGroups,
} from "../../types";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Controls } from "./Controls";
import { GettingStarted } from "./GettingStarted";
import { Preview } from "./Preview";

interface ShowcaseAppProps {
  showcases: Showcase[];
  title?: string;
}

export function ShowcaseApp({
  showcases,
  title = "Component Showcase",
}: ShowcaseAppProps) {
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(
    null,
  );
  const [theme, setTheme] = useState<Theme>("system");
  const [controlValues, setControlValues] = useState<Record<string, any>>({});
  const [controlsPosition, setControlsPosition] =
    useState<ControlsPosition>("bottom");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGettingStarted, setShowGettingStarted] = useState(true);

  // Initialize control values when showcase changes
  useEffect(() => {
    if (selectedShowcase?.props) {
      const initialValues: Record<string, any> = {};
      Object.entries(selectedShowcase.props).forEach(([key, config]) => {
        initialValues[key] = config.default;
      });
      setControlValues(initialValues);
    } else {
      setControlValues({});
    }
  }, [selectedShowcase]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  const showcaseGroups: ShowcaseGroups = showcases.reduce((acc, showcase) => {
    const group = showcase.metadata?.group || "Components";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(showcase);
    return acc;
  }, {} as ShowcaseGroups);

  const handleControlChange = (key: string, value: any) => {
    setControlValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--SC-background)" }}
    >
      <Sidebar
        showcaseGroups={showcaseGroups}
        selectedShowcase={selectedShowcase}
        onShowcaseSelect={(showcase) => {
          setSelectedShowcase(showcase);
          setShowGettingStarted(false);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGettingStartedClick={() => {
          setSelectedShowcase(null);
          setShowGettingStarted(true);
        }}
        showGettingStarted={showGettingStarted}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          showcase={selectedShowcase}
          theme={theme}
          onThemeChange={setTheme}
        />
        <div className="flex-1 flex overflow-hidden">
          {showGettingStarted || !selectedShowcase ? (
            <GettingStarted />
          ) : controlsPosition === "right" ? (
            <>
              <Preview
                showcase={selectedShowcase}
                controlValues={controlValues}
              />
              <Controls
                showcase={selectedShowcase}
                controlValues={controlValues}
                onControlChange={handleControlChange}
                position="right"
                onPositionChange={setControlsPosition}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <Preview
                showcase={selectedShowcase}
                controlValues={controlValues}
              />
              <Controls
                showcase={selectedShowcase}
                controlValues={controlValues}
                onControlChange={handleControlChange}
                position="bottom"
                onPositionChange={setControlsPosition}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
