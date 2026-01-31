"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ComponentShowcase } from "@/components/component-showcase";
import { CodePreview } from "@/components/code-preview";
import { Quickstart } from "@/components/quickstart";
import { ShowcaseSection } from "@/components/showcase-section";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"components" | "showcase">(
    "components",
  );

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Large Tab Navigation */}
      <div
        id="content-tabs"
        className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-8">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("components")}
              className={cn(
                "relative px-6 py-4 text-lg font-semibold transition-colors cursor-pointer",
                activeTab === "components"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Components
              {activeTab === "components" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-400 via-accent to-cyan-300" />
              )}
            </Button>
            <Button
              onClick={() => setActiveTab("showcase")}
              variant="ghost"
              className={cn(
                "relative px-6 py-4 text-lg font-semibold transition-colors cursor-pointer",
                activeTab === "showcase"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              React Showcase
              {activeTab === "showcase" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-400 via-accent to-cyan-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === "components" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComponentShowcase />
            <CodePreview />
          </div>
        )}
        {activeTab === "showcase" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ShowcaseSection />
            <Quickstart />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
