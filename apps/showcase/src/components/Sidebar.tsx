import type { Showcase } from "../showcase";

interface SidebarProps {
  showcaseGroups: Record<string, Showcase[]>;
  selectedShowcase: Showcase | null;
  onShowcaseSelect: (showcase: Showcase) => void;
}

export function Sidebar({
  showcaseGroups,
  selectedShowcase,
  onShowcaseSelect,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Components
        </h2>
        <nav className="space-y-1">
          {Object.entries(showcaseGroups).map(([group, showcases]) => (
            <div key={group} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {group}
              </h3>
              <ul className="space-y-1 ml-2">
                {showcases.map((showcase) => {
                  const isSelected = selectedShowcase?.id === showcase.id;

                  return (
                    <li key={showcase.id}>
                      <button
                        onClick={() => onShowcaseSelect(showcase)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          isSelected
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {showcase.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
