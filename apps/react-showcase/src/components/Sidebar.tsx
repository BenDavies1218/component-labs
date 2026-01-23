"use client";

import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  Folder,
  Box,
  Search,
  TestTubeDiagonal,
} from "lucide-react";
import type { Showcase } from "../showcase";

interface SidebarProps {
  showcaseGroups: Record<string, Showcase[]>;
  selectedShowcase: Showcase | null;
  onShowcaseSelect: (showcase: Showcase) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Sidebar({
  showcaseGroups,
  selectedShowcase,
  onShowcaseSelect,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () =>
      Object.keys(showcaseGroups).reduce(
        (acc, group) => ({ ...acc, [group]: true }),
        {},
      ),
  );

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  // Filter showcases based on search query
  const filteredGroups = Object.entries(showcaseGroups).reduce(
    (acc, [group, showcases]) => {
      const filtered = showcases.filter(
        (showcase) =>
          showcase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          showcase.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (filtered.length > 0) {
        acc[group] = filtered;
      }
      return acc;
    },
    {} as Record<string, Showcase[]>,
  );

  const totalComponents = Object.values(showcaseGroups).flat().length;

  return (
    <aside
      className="w-96 flex flex-col overflow-hidden border-r transition-colors duration-200"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderColor: "var(--sidebar-border)",
      }}
    >
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 mb-4">
          <TestTubeDiagonal
            size={24}
            style={{ color: "var(--color-primary)" }}
          />
          <div>
            <h1
              className="text-base font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Component Labs
            </h1>
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              React UI Testing Library
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--foreground-muted)" } as React.CSSProperties}
          />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-sm rounded-lg outline-none transition-all focus:ring-2"
            style={
              {
                backgroundColor: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--foreground)",
                "--tw-ring-color": "var(--ring)",
              } as React.CSSProperties
            }
          />
          <kbd
            className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded"
            style={{
              backgroundColor: "var(--background-tertiary)",
              color: "var(--foreground-muted)",
            }}
          >
            /
          </kbd>
        </div>
      </div>

      {/* Component count */}
      <div
        className="px-5 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--foreground-muted)" }}
          >
            Components
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--background-tertiary)",
              color: "var(--foreground-secondary)",
            }}
          >
            {totalComponents}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <div className="space-y-1">
          {Object.entries(filteredGroups).map(([group, showcases]) => {
            const isExpanded = expandedGroups[group];

            return (
              <div key={group}>
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors group"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                    style={
                      {
                        color: "var(--foreground-muted)",
                      } as React.CSSProperties
                    }
                  />
                  <Folder
                    size={16}
                    style={
                      {
                        color: "var(--foreground-secondary)",
                      } as React.CSSProperties
                    }
                  />
                  <span className="flex-1 text-left">{group}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--background-tertiary)",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {showcases.length}
                  </span>
                </button>

                {isExpanded && (
                  <ul className="mt-1 ml-4 space-y-0.5">
                    {showcases.map((showcase) => {
                      const isSelected = selectedShowcase?.id === showcase.id;

                      return (
                        <li key={showcase.id}>
                          <button
                            onClick={() => onShowcaseSelect(showcase)}
                            className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-all"
                            style={{
                              backgroundColor: isSelected
                                ? "var(--selected-bg)"
                                : "transparent",
                              color: isSelected
                                ? "var(--selected-text)"
                                : "var(--foreground-secondary)",
                              boxShadow: isSelected
                                ? "0 1px 3px rgba(59, 130, 246, 0.3)"
                                : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor =
                                  "var(--hover-bg)";
                                e.currentTarget.style.color =
                                  "var(--foreground)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.color =
                                  "var(--foreground-secondary)";
                              }
                            }}
                          >
                            <Box
                              size={14}
                              style={
                                {
                                  color: isSelected
                                    ? "rgba(255,255,255,0.7)"
                                    : "var(--foreground-muted)",
                                } as React.CSSProperties
                              }
                            />
                            <span className="truncate">{showcase.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}

          {Object.keys(filteredGroups).length === 0 && (
            <div className="text-center py-8">
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                No components found
              </p>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
