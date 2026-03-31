import { useState } from "react";
import { Slider } from "./Slider";

export function SliderShowcase() {
  const [volume, setVolume] = useState(50);

  return (
    <div className="space-y-8 p-8 max-w-sm">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Slider defaultValue={50} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Label & Value</h3>
        <Slider label="Volume" showValue defaultValue={75} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Custom Range (0–500, step 10)</h3>
        <Slider label="Price" min={0} max={500} step={10} defaultValue={150} showValue />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled</h3>
        <Slider
          label="Volume"
          showValue
          value={volume}
          onChange={setVolume}
        />
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">
          Value: {volume}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled</h3>
        <Slider label="Disabled" defaultValue={40} disabled />
      </div>
    </div>
  );
}
