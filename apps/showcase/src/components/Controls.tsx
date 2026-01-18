"use client";

import React from "react";
import { useState } from "react";
import { ChevronDown, SlidersHorizontal, PanelBottom, PanelRight } from "lucide-react";
import type { Showcase, ControlConfig } from "../showcase";

type ControlsPosition = "bottom" | "right";

interface ControlsProps {
  showcase: Showcase | null;
  controlValues: Record<string, any>;
  onControlChange: (key: string, value: any) => void;
  position: ControlsPosition;
  onPositionChange: (position: ControlsPosition) => void;
}

export function Controls({
  showcase,
  controlValues,
  onControlChange,
  position,
  onPositionChange,
}: ControlsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!showcase || !showcase.controls) {
    return null;
  }

  const controls = showcase.controls;
  const controlKeys = Object.keys(controls);

  if (controlKeys.length === 0) {
    return null;
  }

  const isBottom = position === "bottom";

  return (
    <div
      className={`
        flex flex-col transition-all duration-300
        ${isBottom ? "border-t" : "border-l w-80"}
      `}
      style={{
        backgroundColor: "var(--controls-bg)",
        borderColor: "var(--border)",
        maxHeight: isBottom ? (isOpen ? "280px" : "48px") : "100%",
        minHeight: isBottom ? "48px" : "auto",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b cursor-pointer select-none"
        style={{ borderColor: "var(--border)" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            style={
              { color: "var(--foreground-secondary)" } as React.CSSProperties
            }
          />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Controls
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: "var(--background-tertiary)",
              color: "var(--foreground-muted)",
            }}
          >
            {controlKeys.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Position toggle */}
          <div
            className="flex items-center rounded-md p-0.5 mr-2"
            style={{ backgroundColor: "var(--background-tertiary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onPositionChange("bottom")}
              className="p-1 rounded transition-colors"
              style={{
                backgroundColor: isBottom ? "var(--background)" : "transparent",
                color: isBottom
                  ? "var(--foreground)"
                  : "var(--foreground-muted)",
              }}
              title="Bottom panel"
            >
              <PanelBottom size={16} />
            </button>
            <button
              onClick={() => onPositionChange("right")}
              className="p-1 rounded transition-colors"
              style={{
                backgroundColor: !isBottom
                  ? "var(--background)"
                  : "transparent",
                color: !isBottom
                  ? "var(--foreground)"
                  : "var(--foreground-muted)",
              }}
              title="Right panel"
            >
              <PanelRight size={16} />
            </button>
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-0" : isBottom ? "rotate-180" : "-rotate-90"}`}
            style={{ color: "var(--foreground-muted)" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Controls content */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4">
          <div
            className={`${isBottom ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4" : "space-y-4"}`}
          >
            {controlKeys.map((key) => {
              const config = controls[key];
              const value = controlValues[key] ?? config.default;

              return (
                <div key={key} className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {key}
                  </label>
                  {renderControl(key, config, value, onControlChange)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function renderControl(
  key: string,
  config: ControlConfig,
  value: any,
  onChange: (key: string, value: any) => void,
) {
  const inputStyles: React.CSSProperties = {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    color: "var(--foreground)",
  };

  if (config.type === "boolean") {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <button
          role="switch"
          aria-checked={value || false}
          onClick={() => onChange(key, !value)}
          className={`toggle-switch ${value ? "active" : ""}`}
        />
        <span
          className="text-sm"
          style={{ color: "var(--foreground-secondary)" }}
        >
          {value ? "On" : "Off"}
        </span>
      </label>
    );
  }

  if (config.type === "select") {
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(key, e.target.value)}
        className="w-full h-9 px-3 text-sm rounded-lg outline-none transition-all focus:ring-2 cursor-pointer"
        style={{
          ...inputStyles,
          ["--tw-ring-color" as string]: "var(--ring)",
        }}
      >
        {config.options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (config.type === "text") {
    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(key, e.target.value)}
        className="w-full h-9 px-3 text-sm rounded-lg outline-none transition-all focus:ring-2"
        style={{
          ...inputStyles,
          ["--tw-ring-color" as string]: "var(--ring)",
        }}
      />
    );
  }

  if (config.type === "number") {
    return (
      <input
        type="number"
        value={value || 0}
        onChange={(e) => onChange(key, parseFloat(e.target.value))}
        className="w-full h-9 px-3 text-sm rounded-lg outline-none transition-all focus:ring-2"
        style={{
          ...inputStyles,
          ["--tw-ring-color" as string]: "var(--ring)",
        }}
      />
    );
  }

  return (
    <div
      className="text-xs italic"
      style={{ color: "var(--foreground-muted)" }}
    >
      Unsupported control type
    </div>
  );
}
