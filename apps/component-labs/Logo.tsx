import { FlickeringGrid } from "./FlickeringGrid";
import { MorphingText } from "./MorphingText";

export default function Logo() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-xl"
      style={{ width: "100%", height: "44px" }}
    >
      {/* Flickering grid background - behind everything */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={2}
        gridGap={4}
        color="rgb(59, 130, 246)"
        maxOpacity={0.5}
        flickerChance={0.2}
      />

      {/* Morphing gradient text */}
      <div className="relative z-50 flex items-center justify-center h-full w-full">
        <MorphingText
          texts={[
            "A Better Way to Build React Components",
            "Component-First Development",
            "Build and Test Components in Isolation",
            "Interactive Component Testing",
            "Hot Reloading for instant Feedback",
            "Focused UI Development",
            "Component Development Simplified",
            "A Developer-Friendly tool",
            "React Components in Isolation",
            "Create a Workspace for your Components",
            "Designed for Modern React",
            "Build UI With Confidence",
            "Reliable UI Development",
          ]}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "transparent",
            background: "var(--text-gradient)",
            textShadow: "0 0 20px rgba(6, 182, 212, 0.35)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            animation: "morph 10s infinite",
          }}
        />
      </div>
    </div>
  );
}
