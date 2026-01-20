"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  SlidersHorizontal,
  PanelBottom,
  PanelRight,
} from "lucide-react";
import type { Showcase, PropConfig } from "../showcase";

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

  if (!showcase || !showcase.props) {
    return null;
  }

  const controls = showcase.props;
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
        maxHeight: isBottom ? (isOpen ? "400px" : "48px") : "100%",
        minHeight: isBottom ? "250px" : "auto",
        minWidth: isBottom ? "100px" : "400px",
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
            className={`transition-transform duration-200 ${
              isBottom
                ? (isOpen ? "rotate-180" : "rotate-0")
                : (isOpen ? "rotate-0" : "-rotate-90")
            }`}
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
              const label = controls[key].label || key;
              const config = controls[key];
              const value = controlValues[key] ?? config.default;

              return (
                <div key={key} className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {label}
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
  config: PropConfig,
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

  if (config.type === "string") {
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

  if (config.type === "object" || config.type === "array") {
    return (
      <JsonEditor
        value={value}
        defaultValue={config.default}
        isArray={config.type === "array"}
        onChange={(newValue) => onChange(key, newValue)}
        inputStyles={inputStyles}
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

interface JsonEditorProps {
  value: any;
  defaultValue: any;
  isArray: boolean;
  onChange: (value: any) => void;
  inputStyles: React.CSSProperties;
}

function JsonEditor({
  value,
  defaultValue,
  isArray,
  onChange,
  inputStyles,
}: JsonEditorProps) {
  const [editingValue, setEditingValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  // Initialize and sync with external value changes
  useEffect(() => {
    const stringValue = JSON.stringify(
      value ?? defaultValue ?? (isArray ? [] : {}),
      null,
      2,
    );
    setEditingValue(stringValue);
    setIsValid(true);
  }, [value, defaultValue, isArray]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditingValue(newValue);

    try {
      const parsed = JSON.parse(newValue);
      setIsValid(true);
      onChange(parsed);
    } catch {
      setIsValid(false);
      // Don't update the parent while invalid
    }
  };

  const handleBlur = () => {
    if (!isValid) {
      // Reset to last valid value
      const stringValue = JSON.stringify(
        value ?? defaultValue ?? (isArray ? [] : {}),
        null,
        2,
      );
      setEditingValue(stringValue);
      setIsValid(true);
    } else {
      // Reformat for pretty printing
      try {
        const parsed = JSON.parse(editingValue);
        setEditingValue(JSON.stringify(parsed, null, 2));
      } catch {
        // Should not happen since isValid is true
      }
    }
  };

  return (
    <div className="relative">
      <textarea
        value={editingValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full min-h-52 px-3 py-2 text-sm rounded-lg outline-none transition-all focus:ring-2 font-mono ${
          !isValid ? "ring-2 ring-red-500" : ""
        }`}
        style={{
          ...inputStyles,
          ["--tw-ring-color" as string]: isValid
            ? "var(--ring)"
            : "rgb(239 68 68)",
        }}
        placeholder={isArray ? "[]" : "{}"}
      />
      {!isValid && (
        <div
          className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: "rgb(239 68 68)",
            color: "white",
          }}
        >
          Invalid JSON
        </div>
      )}
    </div>
  );
}
