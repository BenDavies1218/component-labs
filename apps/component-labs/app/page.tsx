import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ComponentShowcase } from "@/components/component-showcase";
import { CodePreview } from "@/components/code-preview";
import { Quickstart } from "@/components/quickstart";
import { ShowcaseSection } from "@/components/showcase-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ComponentShowcase />
      <CodePreview />
      <Quickstart />
      <ShowcaseSection />
      <Footer />
    </main>
  );
}
