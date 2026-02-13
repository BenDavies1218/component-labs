import { useState } from "react";
import { Textarea } from "./Textarea";

export function TextareaShowcase() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Basic</h3>
        <Textarea placeholder="Enter your message..." />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">With Error</h3>
        <Textarea error="This field is required" placeholder="Required field" />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Auto Resize</h3>
        <Textarea
          autoResize
          minRows={3}
          maxRows={10}
          placeholder="Type to see auto-resize behavior..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Disabled</h3>
        <Textarea disabled placeholder="Cannot edit" value="Disabled content" />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">No Resize</h3>
        <Textarea resize="none" rows={5} placeholder="Cannot resize this" />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Large</h3>
        <Textarea rows={8} placeholder="Large textarea..." />
      </div>
    </div>
  );
}
