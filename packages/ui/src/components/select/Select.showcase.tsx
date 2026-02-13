import { useState } from "react";
import { Select } from "./Select";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
];

const priorityOptions = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent", disabled: true },
];

export function SelectShowcase() {
  const [fruit, setFruit] = useState("");

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Select options={fruitOptions} placeholder="Select a fruit" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Label</h3>
        <Select
          options={countryOptions}
          label="Country"
          placeholder="Choose your country"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Default Value</h3>
        <Select
          options={fruitOptions}
          label="Favorite Fruit"
          defaultValue="banana"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Error</h3>
        <Select
          options={countryOptions}
          label="Required field"
          error="Please select a country"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled</h3>
        <Select
          options={fruitOptions}
          value={fruit}
          onChange={setFruit}
          label="Controlled Select"
          placeholder="Pick one..."
        />
        <p className="mt-2 text-sm text-black/60">
          Selected value: {fruit || "none"}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Disabled Options</h3>
        <Select
          options={priorityOptions}
          label="Priority Level"
          placeholder="Select priority"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled</h3>
        <Select
          options={fruitOptions}
          disabled
          defaultValue="apple"
          label="Disabled Select"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Long List</h3>
        <Select
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
            { value: "4", label: "Option 4" },
            { value: "5", label: "Option 5" },
            { value: "6", label: "Option 6" },
            { value: "7", label: "Option 7" },
            { value: "8", label: "Option 8" },
            { value: "9", label: "Option 9" },
            { value: "10", label: "Option 10" },
            { value: "11", label: "Option 11" },
            { value: "12", label: "Option 12" },
          ]}
          label="Scrollable List"
          placeholder="Choose an option"
        />
      </div>
    </div>
  );
}
