import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

export function RadioShowcase() {
  const [size, setSize] = useState("medium");

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <RadioGroup label="Choose a size" defaultValue="medium">
          <Radio value="small" label="Small" />
          <Radio value="medium" label="Medium" />
          <Radio value="large" label="Large" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Descriptions</h3>
        <RadioGroup label="Select a plan" defaultValue="pro">
          <Radio
            value="free"
            label="Free"
            description="Perfect for trying out the platform"
          />
          <Radio
            value="pro"
            label="Pro"
            description="For professionals and small teams"
          />
          <Radio
            value="enterprise"
            label="Enterprise"
            description="For large organizations with advanced needs"
          />
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Error</h3>
        <RadioGroup
          label="Required selection"
          error="Please select an option to continue"
        >
          <Radio value="yes" label="Yes" error />
          <Radio value="no" label="No" error />
          <Radio value="maybe" label="Maybe" error />
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled</h3>
        <RadioGroup
          label="T-shirt size"
          value={size}
          onChange={(value) => setSize(value as string)}
        >
          <Radio value="xs" label="Extra Small" />
          <Radio value="small" label="Small" />
          <Radio value="medium" label="Medium" />
          <Radio value="large" label="Large" />
          <Radio value="xl" label="Extra Large" />
        </RadioGroup>
        <p className="mt-2 text-sm text-black/60">Selected: {size}</p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Disabled Options</h3>
        <RadioGroup label="Choose your preference" defaultValue="enabled">
          <Radio value="enabled" label="Enabled option" />
          <Radio value="disabled1" label="Disabled option" disabled />
          <Radio value="another" label="Another enabled option" />
          <Radio value="disabled2" label="Also disabled" disabled />
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Horizontal Layout</h3>
        <RadioGroup label="Alignment">
          <div className="flex gap-4">
            <Radio value="left" label="Left" />
            <Radio value="center" label="Center" />
            <Radio value="right" label="Right" />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
