"use client";

import Link from "next/link";
import { useCompositeStore, Composite, CompositeItem } from "@ariakit/react";
import {
  RectangleHorizontal,
  BarChartBig as ChartBar,
  Square,
  Search,
  Terminal,
  GalleryHorizontal,
  Table,
  Baseline as ChartLine,
  TextCursorInput,
  MenuIcon,
  ChevronRight,
  ToggleLeft,
  Calendar,
  SlidersHorizontal,
  Bell,
  Layers,
  AlertCircle,
  Tag,
  CreditCard,
  Type,
  CircleDot,
  ListFilter,
  LayoutGrid,
  AlignLeft,
  MessageCircle,
} from "lucide-react";

const componentCategories = [
  {
    name: "Inputs",
    components: [
      {
        icon: RectangleHorizontal,
        name: "Button",
        description: "Interactive button with multiple variants and sizes.",
      },
      {
        icon: TextCursorInput,
        name: "Input",
        description: "Text input with validation and icon support.",
      },
      {
        icon: AlignLeft,
        name: "Textarea",
        description: "Multi-line text input with auto-resize support.",
      },
      {
        icon: Type,
        name: "Label",
        description: "Accessible form label with required indicator.",
      },
      {
        icon: Square,
        name: "Checkbox",
        description: "Accessible checkbox with indeterminate state.",
      },
      {
        icon: CircleDot,
        name: "Radio",
        description: "Radio button group for single selection.",
      },
      {
        icon: ToggleLeft,
        name: "Switch",
        description: "Toggle switch for boolean settings.",
      },
      {
        icon: Calendar,
        name: "Date Picker",
        description: "Calendar-based date selection component.",
      },
      {
        icon: ListFilter,
        name: "Select",
        description: "Dropdown select with search and multi-select.",
      },
      {
        icon: SlidersHorizontal,
        name: "Slider",
        description: "Range slider with single or dual handles.",
      },
    ],
  },
  {
    name: "Data Display",
    components: [
      {
        icon: ChartBar,
        name: "Charts",
        description: "Bar, line, pie, and area chart components.",
      },
      {
        icon: ChartLine,
        name: "Graphs",
        description: "Interactive data visualization graphs.",
      },
      {
        icon: Table,
        name: "Data Table",
        description: "Sortable, filterable data table with pagination.",
      },
      {
        icon: GalleryHorizontal,
        name: "Carousel",
        description: "Image and content carousel with auto-play.",
      },
      {
        icon: CreditCard,
        name: "Card",
        description: "Flexible container for grouping related content.",
      },
      {
        icon: Tag,
        name: "Badge",
        description: "Small status indicator or label component.",
      },
      {
        icon: LayoutGrid,
        name: "Tabs",
        description: "Tabbed interface for organizing content sections.",
      },
      {
        icon: MessageCircle,
        name: "Tooltip",
        description: "Contextual information on hover or focus.",
      },
    ],
  },
  {
    name: "Navigation",
    components: [
      {
        icon: MenuIcon,
        name: "Menu",
        description: "Dropdown menu with keyboard navigation.",
      },
      {
        icon: ChevronRight,
        name: "SubMenu",
        description: "Nested menu with hover and click triggers.",
      },
      {
        icon: Search,
        name: "Combobox",
        description: "Searchable select with autocomplete.",
      },
      {
        icon: Terminal,
        name: "Command",
        description: "Command palette with fuzzy search.",
      },
    ],
  },
  {
    name: "Feedback",
    components: [
      {
        icon: AlertCircle,
        name: "Alert",
        description: "Contextual feedback messages for user actions.",
      },
      {
        icon: Bell,
        name: "Toast",
        description: "Non-blocking notification messages.",
      },
      {
        icon: Layers,
        name: "Dialog",
        description: "Modal dialog with focus trap.",
      },
    ],
  },
];

export function ComponentShowcase() {
  const composite = useCompositeStore({
    defaultActiveId: "button", // Set first item as default active
  });

  return (
    <section id="components" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Component Library
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive set of accessible, customizable components built for
            modern React applications.
          </p>
        </div>

        <Composite store={composite} className="space-y-12">
          {componentCategories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category.name}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.components.map((component) => {
                  const componentId = component.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <CompositeItem
                      key={component.name}
                      id={componentId}
                      render={
                        <Link
                          href={`/docs/${componentId}`}
                        />
                      }
                      className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/50 hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 data-[active-item]:ring-2 data-[active-item]:ring-accent"
                    >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-background group-data-[active-item]:bg-accent group-data-[active-item]:text-background">
                      <component.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      {component.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {component.description}
                    </p>
                  </CompositeItem>
                  );
                })}
              </div>
            </div>
          ))}
        </Composite>

        <div className="mt-16 text-center">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-accent transition-colors hover:text-accent/80"
          >
            View full documentation
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
