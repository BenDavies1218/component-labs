import {
  Zap,
  Settings,
  RefreshCw,
  SlidersHorizontal,
  Shield,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Powered by Vite for near-instant startup times. No more waiting 30+ seconds for your component library to load.",
  },
  {
    icon: Settings,
    title: "Zero Config",
    description:
      "Works out of the box with automatic component detection. Just create *.showcase.tsx files and start developing.",
  },
  {
    icon: RefreshCw,
    title: "Hot Module Replacement",
    description:
      "See changes instantly as you code. Components update without losing state or requiring page refresh.",
  },
  {
    icon: SlidersHorizontal,
    title: "Interactive Props",
    description:
      "Auto-generated controls for component props. Test every variant and state combination in real-time.",
  },
  {
    icon: Shield,
    title: "Type-Safe",
    description:
      "Full TypeScript support with intelligent prop inference. Catch errors before they hit production.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Built-in theme switching for testing both light and dark appearances with a single click.",
  },
];

export function ShowcaseFeatures() {
  return (
    <section id="features" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why React Showcase?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to develop, test, and document your React
            components.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
