import { useState } from "react";
import { showcaseGroups, type Showcase } from "./showcase";
import { Sidebar } from "./components/Sidebar";
import { Preview } from "./components/Preview";
import { Controls } from "./components/Controls";

export default function App() {
  const firstShowcase = Object.values(showcaseGroups)[0]?.[0];
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(
    firstShowcase || null,
  );
  const [controlValues, setControlValues] = useState<Record<string, any>>({});

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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        showcaseGroups={showcaseGroups}
        selectedShowcase={selectedShowcase}
        onShowcaseSelect={handleShowcaseSelect}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Component Labs</h1>
          {selectedShowcase && (
            <p className="text-sm text-gray-600 mt-1">
              {selectedShowcase.title}
            </p>
          )}
        </header>
        <div className="flex-1 flex overflow-hidden">
          <Preview showcase={selectedShowcase} controlValues={controlValues} />
          <Controls
            showcase={selectedShowcase}
            controlValues={controlValues}
            onControlChange={handleControlChange}
          />
        </div>
      </div>
    </div>
  );
}
