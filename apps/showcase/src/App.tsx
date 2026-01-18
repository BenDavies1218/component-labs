import { useState } from "react";
import { demoGroups, type Showcase } from "./showcase";
import { Sidebar } from "./components/Sidebar";
import { Preview } from "./components/Preview";
import { Controls } from "./components/Controls";

export default function App() {
  const firstDemo = Object.values(demoGroups)[0]?.[0];
  const [selectedDemo, setSelectedDemo] = useState<Showcase | null>(
    firstDemo || null,
  );
  const [controlValues, setControlValues] = useState<Record<string, any>>({});

  const handleShowcaseSelect = (demo: Showcase) => {
    setSelectedDemo(demo);
    const initialValues: Record<string, any> = {};
    if (demo.controls) {
      Object.entries(demo.controls).forEach(([key, config]) => {
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
        demoGroups={demoGroups}
        selectedDemo={selectedDemo}
        onShowcaseSelect={handleShowcaseSelect}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Component Labs</h1>
          {selectedDemo && (
            <p className="text-sm text-gray-600 mt-1">{selectedDemo.title}</p>
          )}
        </header>
        <div className="flex-1 flex overflow-hidden">
          <Preview demo={selectedDemo} controlValues={controlValues} />
          <Controls
            demo={selectedDemo}
            controlValues={controlValues}
            onControlChange={handleControlChange}
          />
        </div>
      </div>
    </div>
  );
}
