import type { ComponentDoc } from "../../types/docs";

export const carouselDocs: ComponentDoc = {
  name: "Carousel",
  description:
    "A fully-featured generic carousel built on Embla Carousel with support for autoplay, auto-scroll, wheel gestures, pagination dots, infinite loading, and multi-row/column layouts.",
  category: "Data Display",
  installation: `npx @component-labs/cli add carousel

This will:
- Install required dependencies (embla-carousel-react, embla-carousel-autoplay, embla-carousel-auto-scroll, embla-carousel-class-names, embla-carousel-wheel-gestures)
- Copy the Carousel component to your project

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\`

Then add the base styles to your globals.css:
\`\`\`css
@import "@component-labs/ui/base";
\`\`\``,
  usage: `import { Carousel } from "@component-labs/ui";

<Carousel
  items={products}
  renderItem={(item) => <ProductCard product={item} />}
  itemsPerView={3}
  navigation={{ show: true }}
/>`,
  props: [
    {
      name: "items",
      type: "T[]",
      required: true,
      description: "Array of data items to display in the carousel",
    },
    {
      name: "renderItem",
      type: "(item: T, index: number) => ReactNode",
      required: true,
      description: "Function to render each carousel item",
    },
    {
      name: "renderLoadingItem",
      type: "() => ReactNode",
      description: "Function to render skeleton items during loading state",
    },
    {
      name: "renderEmptyItem",
      type: "() => ReactNode",
      description: "Function to render empty state when no items are available",
    },
    {
      name: "isLoading",
      type: "boolean",
      default: "false",
      description: "Shows skeleton loading items when true",
    },
    {
      name: "loadingCount",
      type: "number",
      default: "4",
      description: "Number of skeleton items to show during loading",
    },
    {
      name: "itemsPerView",
      type: "number | 'auto'",
      default: "'auto'",
      description: "Number of items visible at once, or 'auto' for responsive sizing",
    },
    {
      name: "gap",
      type: "number",
      default: "16",
      description: "Gap between carousel items in pixels",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "Carousel scroll direction",
    },
    {
      name: "rows",
      type: "number",
      default: "1",
      description: "Number of rows for horizontal carousels (stacks items vertically)",
    },
    {
      name: "loop",
      type: "boolean",
      default: "false",
      description: "Enable infinite loop scrolling",
    },
    {
      name: "dragFree",
      type: "boolean",
      default: "true",
      description: "Enable free dragging (scrolls pixel by pixel, not snapping to items)",
    },
    {
      name: "align",
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description: "Item alignment within the viewport",
    },
    {
      name: "navigation",
      type: "NavigationConfig",
      description: "Configure prev/next navigation buttons: { show?, position?: 'default' | 'inside' | 'outside', className? }",
    },
    {
      name: "dots",
      type: "DotsConfig",
      description: "Configure pagination dots: { show?, position?: 'top' | 'bottom' | 'inside' | 'outside', className? }",
    },
    {
      name: "autoplay",
      type: "AutoplayConfig",
      description: "Continuous scrolling (ticker/banner): { enabled?, speed?, stopOnMouseEnter?, resumeDelay? }",
    },
    {
      name: "autoScroll",
      type: "AutoScrollConfig",
      description: "Automatic slide progression: { enabled?, interval?, speed?, stopOnMouseEnter? }",
    },
    {
      name: "wheelGestures",
      type: "WheelGesturesConfig",
      default: "{ enabled: true }",
      description: "Mouse wheel / trackpad scrolling: { enabled?, forceWheelAxis?: 'x' | 'y' }",
    },
    {
      name: "onSlideChange",
      type: "(index: number) => void",
      description: "Callback fired when active slide changes",
    },
    {
      name: "onApiReady",
      type: "(api: CarouselApi) => void",
      description: "Callback fired when Embla carousel API is ready",
    },
    {
      name: "hasNextPage",
      type: "boolean",
      default: "false",
      description: "Whether there are more pages to fetch for infinite loading",
    },
    {
      name: "fetchNextPage",
      type: "() => void",
      description: "Callback to fetch the next page of data for infinite loading",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the carousel container",
    },
    {
      name: "itemClassName",
      type: "string",
      description: "Additional CSS classes for each carousel item",
    },
  ],
  examples: [
    {
      title: "Basic Carousel",
      code: `<Carousel
  items={["Slide 1", "Slide 2", "Slide 3"]}
  renderItem={(item) => (
    <div className="h-40 flex items-center justify-center bg-muted rounded-lg">
      {item}
    </div>
  )}
  itemsPerView={1}
  navigation={{ show: true }}
/>`,
      description: "Simple carousel with navigation buttons",
    },
    {
      title: "Multi-Item with Dots",
      code: `<Carousel
  items={products}
  renderItem={(product) => <ProductCard product={product} />}
  itemsPerView={3}
  gap={16}
  dots={{ show: true, position: "bottom" }}
  navigation={{ show: true, position: "outside" }}
/>`,
      description: "Multiple items visible at once with pagination dots",
    },
    {
      title: "Auto-Scroll (Banner Ticker)",
      code: `<Carousel
  items={logos}
  renderItem={(logo) => <img src={logo.url} alt={logo.name} />}
  itemsPerView="auto"
  loop
  autoplay={{ enabled: true, speed: 1, stopOnMouseEnter: true, resumeDelay: 1000 }}
/>`,
      description: "Continuous scrolling ticker effect for logos or banners",
    },
    {
      title: "Auto-Advance Slideshow",
      code: `<Carousel
  items={slides}
  renderItem={(slide) => <SlideCard slide={slide} />}
  itemsPerView={1}
  loop
  autoScroll={{ enabled: true, interval: 4000, speed: 300 }}
  dots={{ show: true, position: "inside" }}
/>`,
      description: "Automatically advances to next slide every 4 seconds",
    },
    {
      title: "Infinite Loading",
      code: `<Carousel
  items={items}
  renderItem={(item) => <ItemCard item={item} />}
  isLoading={isLoading}
  renderLoadingItem={() => <SkeletonCard />}
  hasNextPage={hasNextPage}
  fetchNextPage={fetchNextPage}
  isFetchingNextPage={isFetchingNextPage}
  triggerOffset={3}
/>`,
      description: "Loads more items as user scrolls near the end",
    },
    {
      title: "Multi-Row Grid",
      code: `<Carousel
  items={items}
  renderItem={(item) => <ItemCard item={item} />}
  itemsPerView={4}
  rows={2}
  gap={12}
/>`,
      description: "Displays items in a 2-row grid per carousel page",
    },
  ],
  accessibility: [
    "Keyboard navigation via arrow keys through slides",
    "Navigation buttons are accessible button elements with aria-labels",
    "Pagination dots have aria-label attributes (e.g. 'Go to slide 3')",
    "Wheel gesture support for trackpad users",
    "Respects prefers-reduced-motion for autoplay/auto-scroll",
  ],
  status: "stable",
  version: "1.0.0",
  performance: {
    bundleSize: "~12 KB (gzipped, includes Embla plugins)",
    rerenderOptimization: [
      "Embla plugins memoized with useMemo to avoid re-initialization on every render",
      "Scroll position preserved during infinite loading with requestAnimationFrame",
      "Item chunking for multi-row layouts memoized",
    ],
    dependencies: [
      "embla-carousel-react",
      "embla-carousel-autoplay",
      "embla-carousel-auto-scroll",
      "embla-carousel-class-names",
      "embla-carousel-wheel-gestures",
    ],
  },
};
