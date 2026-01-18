"use client";

import { cloneElement, useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Grid3x3,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Showcase } from "../showcase";

interface PreviewProps {
  showcase: Showcase | null;
  controlValues: Record<string, any>;
}

type ViewportSize = "responsive" | "mobile" | "tablet" | "desktop";

const viewportSizes: Record<ViewportSize, { width: string; label: string }> = {
  responsive: { width: "100%", label: "Responsive" },
  mobile: { width: "375px", label: "Mobile" },
  tablet: { width: "768px", label: "Tablet" },
  desktop: { width: "1280px", label: "Desktop" },
};

export function Preview({ showcase, controlValues }: PreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("responsive");
  const [zoom, setZoom] = useState(100);
  const [showBackdrop, setShowBackdrop] = useState(true);

  if (!showcase) {
    return (
      <div className="flex-1 flex items-center justify-center preview-pattern">
        <div className="text-center">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--background-tertiary)" }}
          >
            <Grid3x3 size={32} style={{ color: "var(--color-primary)" }} />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Select a component
          </h3>
          <p
            className="text-sm max-w-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            Choose a component from the sidebar to preview and interact with its
            controls
          </p>
        </div>
      </div>
    );
  }

  const renderDemo = () => {
    const element = showcase.component();
    if (showcase.controls && Object.keys(controlValues).length > 0) {
      return cloneElement(element, controlValues);
    }
    return element;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-1">
          {/* Viewport buttons */}
          <div
            className="flex items-center rounded-lg p-1 gap-0.5"
            style={{ backgroundColor: "var(--background-tertiary)" }}
          >
            <button
              onClick={() => setViewport("responsive")}
              className="p-1.5 rounded-md transition-colors"
              style={{
                backgroundColor:
                  viewport === "responsive"
                    ? "var(--background)"
                    : "transparent",
                color:
                  viewport === "responsive"
                    ? "var(--foreground)"
                    : "var(--foreground-muted)",
                boxShadow:
                  viewport === "responsive"
                    ? "0 1px 2px rgba(0,0,0,0.1)"
                    : "none",
              }}
              title="Responsive"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => setViewport("desktop")}
              className="p-1.5 rounded-md transition-colors"
              style={{
                backgroundColor:
                  viewport === "desktop" ? "var(--background)" : "transparent",
                color:
                  viewport === "desktop"
                    ? "var(--foreground)"
                    : "var(--foreground-muted)",
                boxShadow:
                  viewport === "desktop" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}
              title="Desktop"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className="p-1.5 rounded-md transition-colors"
              style={{
                backgroundColor:
                  viewport === "tablet" ? "var(--background)" : "transparent",
                color:
                  viewport === "tablet"
                    ? "var(--foreground)"
                    : "var(--foreground-muted)",
                boxShadow:
                  viewport === "tablet" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}
              title="Tablet"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className="p-1.5 rounded-md transition-colors"
              style={{
                backgroundColor:
                  viewport === "mobile" ? "var(--background)" : "transparent",
                color:
                  viewport === "mobile"
                    ? "var(--foreground)"
                    : "var(--foreground-muted)",
                boxShadow:
                  viewport === "mobile" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}
              title="Mobile"
            >
              <Smartphone size={16} />
            </button>
          </div>

          {viewport !== "responsive" && (
            <span
              className="text-xs ml-2"
              style={{ color: "var(--foreground-muted)" }}
            >
              {viewportSizes[viewport].width}
            </span>
          )}

          {/* Backdrop toggle */}
          <button
            onClick={() => setShowBackdrop(!showBackdrop)}
            className="ml-2 p-2.5 rounded-lg transition-colors flex items-center gap-1.5"
            style={{
              backgroundColor: "var(--background-tertiary)",
              color: "var(--foreground-secondary)",
            }}
            title={showBackdrop ? "Hide backdrop" : "Show backdrop"}
          >
            {showBackdrop ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Zoom control */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            Zoom
          </span>
          <input
            type="range"
            min="50"
            max="150"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-20 h-1 rounded-full appearance-none cursor-pointer"
            style={{
              backgroundColor: "var(--background-tertiary)",
              accentColor: "var(--color-primary)",
            }}
          />
          <span
            className="text-xs w-8 text-right tabular-nums"
            style={{ color: "var(--foreground-secondary)" }}
          >
            {zoom}%
          </span>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-6 preview-pattern">
        <div
          className="mx-auto h-full flex items-center justify-center transition-all duration-300"
          style={{
            maxWidth: viewportSizes[viewport].width,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
          }}
        >
          {showBackdrop ? (
            <div
              className="rounded-xl p-8 shadow-sm min-w-50 flex items-center justify-center"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {renderDemo()}
            </div>
          ) : (
            renderDemo()
          )}
        </div>
      </div>
    </div>
  );
}
