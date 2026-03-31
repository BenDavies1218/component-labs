import { useState } from "react";
import { DatePicker } from "./DatePicker";

export function DatePickerShowcase() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="space-y-8 p-8 max-w-sm">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <DatePicker placeholder="Pick a date" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Label</h3>
        <DatePicker label="Date of birth" placeholder="Select your birth date" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Default Value</h3>
        <DatePicker
          label="Pre-selected"
          defaultValue={new Date(2025, 0, 15)}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled</h3>
        <DatePicker
          label="Appointment"
          value={date}
          onChange={setDate}
          placeholder="Choose appointment date"
        />
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">
          Selected: {date ? date.toDateString() : "none"}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Error</h3>
        <DatePicker
          label="Required field"
          error="Please select a date"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled</h3>
        <DatePicker
          disabled
          label="Disabled picker"
          defaultValue={new Date()}
        />
      </div>
    </div>
  );
}
