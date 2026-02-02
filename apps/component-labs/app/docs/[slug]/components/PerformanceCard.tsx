import { Zap, Package, TrendingUp } from "lucide-react";
import type { ComponentDoc } from "../../../../../../packages/ui/src/types/docs";

interface PerformanceCardProps {
  performance: ComponentDoc["performance"];
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Bundle Size */}
      {performance.bundleSize && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Bundle Size</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {performance.bundleSize}
          </p>
          <p className="text-sm text-muted-foreground">Minified and gzipped</p>
        </div>
      )}

      {/* Render Time */}
      {performance.renderTime && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-foreground">Render Time</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {performance.renderTime}
          </p>
          <p className="text-sm text-muted-foreground">
            Initial render performance
          </p>
        </div>
      )}
    </div>
  );
}
