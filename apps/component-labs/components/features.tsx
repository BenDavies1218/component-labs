import {
  Zap,
  Package,
  RefreshCw,
  Sliders,
  Shield,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Powered by Vite for instant startup and blazing fast hot module replacement.",
  },
  {
    icon: Package,
    title: "Zero Config",
    description:
      "Works out of the box with auto-detection. Just run and start showcasing.",
  },
  {
    icon: RefreshCw,
    title: "Hot Reload",
    description:
      "See your changes instantly as you code. No refresh needed.",
  },
  {
    icon: Sliders,
    title: "Interactive Props",
    description:
      "Control component props in real-time with built-in prop controls.",
  },
  {
    icon: Shield,
    title: "Type-Safe",
    description:
      "Full TypeScript support with intelligent prop inference.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Built-in theme switching for testing components in any context.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Build beautiful component documentation with modern tooling and developer experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-accent">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
