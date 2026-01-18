import { cloneElement } from "react";
import type { Showcase } from "../showcase";

interface PreviewProps {
  showcase: Showcase | null;
  controlValues: Record<string, any>;
}

export function Preview({ showcase, controlValues }: PreviewProps) {
  if (!showcase) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a demo to preview</p>
      </div>
    );
  }

  // Render the demo component
  const renderDemo = () => {
    const element = showcase.component();

    // If this demo has controls, we need to inject the control values
    if (showcase.controls && Object.keys(controlValues).length > 0) {
      // Clone the element and merge control values as props
      return cloneElement(element, controlValues);
    }

    return element;
  };

  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="preview-content">{renderDemo()}</div>
      </div>
    </div>
  );
}
