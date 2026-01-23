"use client";

import { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Grid3x3,
  Eye,
  EyeOff,
  Info,
  Smartphone as DeviceIcon,
} from "lucide-react";
import type { Showcase } from "../showcase";
import { GlobalProvider } from "virtual:global-provider";
import { IPhoneFrame, IPadFrame, DesktopFrame } from "./DeviceContainers";
import { injectUserCss } from "virtual:user-global-css";
import { DotPattern } from "./DotPattern";

interface PreviewProps {
  showcase: Showcase | null;
  controlValues: Record<string, any>;
}

type ViewportSize = "responsive" | "mobile" | "tablet" | "desktop";

const viewportSizes: Record<ViewportSize, { width: string; label: string }> = {
  responsive: { width: "100%", label: "Responsive" },
  mobile: { width: "375px", label: "Mobile" },
  tablet: { width: "768px", label: "Tablet" },
  desktop: { width: "1580px", label: "Desktop" },
};

export function Preview({ showcase, controlValues }: PreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("responsive");
  const [zoom, setZoom] = useState(100);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showDeviceFrame, setShowDeviceFrame] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  // Inject user CSS once when component mounts
  useEffect(() => {
    injectUserCss();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = -e.deltaY;
        const zoomChange = delta * 0.4;
        setZoom((prev) => Math.min(200, Math.max(50, prev + zoomChange)));
      }
    };

    const previewElement = previewRef.current;
    if (previewElement) {
      previewElement.addEventListener("wheel", handleWheel, { passive: false });
      return () => previewElement.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [zoom, viewport]);

  if (!showcase) {
    return (
      <div className="flex-1 flex items-center justify-center relative">
        <DotPattern className="opacity-50 p-1" />
        <div className="text-center relative z-10">
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
    // Create a wrapper component that properly passes props to the showcase component
    const ComponentWrapper = () => {
      const Component = showcase.component;
      if (showcase.props && Object.keys(showcase.props).length > 0) {
        return Component(controlValues);
      }
      return Component();
    };

    return (
      <GlobalProvider>
        <ComponentWrapper
          key={`${showcase.id}-${JSON.stringify(controlValues)}`}
        />
      </GlobalProvider>
    );
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

          {/* Device frame toggle */}
          {viewport !== "responsive" && (
            <button
              onClick={() => setShowDeviceFrame(!showDeviceFrame)}
              className="ml-2 p-2.5 rounded-lg transition-colors flex items-center gap-1.5"
              style={{
                backgroundColor: showDeviceFrame
                  ? "var(--color-primary)"
                  : "var(--background-tertiary)",
                color: showDeviceFrame
                  ? "white"
                  : "var(--foreground-secondary)",
              }}
              title={
                showDeviceFrame ? "Hide device frame" : "Show device frame"
              }
            >
              <DeviceIcon size={16} />
            </button>
          )}
        </div>

        {/* Zoom control */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Info
              size={14}
              style={{ color: "var(--foreground-muted)" }}
              className="cursor-help"
            />
            <div
              className="absolute right-0 top-full mt-2 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground-secondary)",
              }}
            >
              <div className="text-xs space-y-1">
                <div>
                  <kbd
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      backgroundColor: "var(--background-tertiary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Ctrl/Cmd
                  </kbd>{" "}
                  + scroll to zoom
                </div>
                <div>Click and drag to pan</div>
              </div>
            </div>
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            Zoom
          </span>
          <input
            type="range"
            min="50"
            max="200"
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
            {Math.round(zoom)}%
          </span>
          <button
            onClick={() => setZoom(100)}
            className="px-2 py-1 rounded-md text-xs transition-colors"
            style={{
              backgroundColor: "var(--background-tertiary)",
              color: "var(--foreground-secondary)",
            }}
            title="Reset zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div
        ref={previewRef}
        className="flex-1 overflow-hidden p-6 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <DotPattern className="opacity-50" />
        <div
          className="mx-auto h-full flex items-center justify-center relative z-10"
          style={{
            maxWidth: showDeviceFrame ? "none" : viewportSizes[viewport].width,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          {showDeviceFrame ? (
            // Render with device frame
            <>
              {viewport === "mobile" && (
                <IPhoneFrame>{renderDemo()}</IPhoneFrame>
              )}
              {viewport === "tablet" && <IPadFrame>{renderDemo()}</IPadFrame>}
              {viewport === "desktop" && (
                <DesktopFrame>{renderDemo()}</DesktopFrame>
              )}
            </>
          ) : (
            // Render without device frame (original layout)
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
