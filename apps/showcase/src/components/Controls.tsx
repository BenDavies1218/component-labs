import { useState } from "react";
import type { Showcase, ControlConfig } from "../showcase";

interface ControlsProps {
  showcase: Showcase | null;
  controlValues: Record<string, any>;
  onControlChange: (key: string, value: any) => void;
}

export function Controls({
  showcase,
  controlValues,
  onControlChange,
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

  return (
    <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Controls</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isOpen ? "−" : "+"}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-4">
            {controlKeys.map((key) => {
              const config = controls[key];
              const value = controlValues[key] ?? config.default;

              return (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {key}
                  </label>
                  {renderControl(key, config, value, onControlChange)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

function renderControl(
  key: string,
  config: ControlConfig,
  value: any,
  onChange: (key: string, value: any) => void,
) {
  if (config.type === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(key, e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">
          {value ? "true" : "false"}
        </span>
      </label>
    );
  }

  if (config.type === "select") {
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(key, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }

  if (config.type === "number") {
    return (
      <input
        type="number"
        value={value || 0}
        onChange={(e) => onChange(key, parseFloat(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }

  return (
    <div className="text-xs text-gray-500 italic">Unsupported control type</div>
  );
}
