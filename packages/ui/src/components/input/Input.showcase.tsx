import { Input } from "./Input";

export default {
  title: "Input",
  component: Input,
};

export const Default = () => <Input name="default" label="Default Input" />;

export const WithHelperText = () => (
  <Input
    name="with-helper-text"
    label="Input with Helper Text"
    helperText="This is some helper text."
  />
);

export const WithError = () => (
  <Input
    name="with-error"
    label="Input with Error"
    error="This is an error message."
  />
);
export const WithIcons = () => (
  <Input
    name="with-icons"
    label="Input with Icons"
    startIcon={<span>🔍</span>}
    endIcon={<span>✅</span>}
  />
);

export const Disabled = () => (
  <Input
    name="disabled"
    label="Disabled Input"
    helperText="This input is disabled."
    disabled
  />
);

export const PasswordInput = () => (
  <Input
    name="password"
    label="Password Input"
    type="password"
    helperText="Enter your password."
  />
);

export const LargeInput = () => (
  <Input
    name="large-input"
    label="Large Input"
    size="lg"
    helperText="This is a large input."
  />
);

export const SmallInput = () => (
  <Input
    name="small-input"
    label="Small Input"
    size="sm"
    helperText="This is a small input."
  />
);

export const PreFilledInput = () => (
  <Input
    name="pre-filled"
    label="Pre-filled Input"
    defaultValue="Hello, World!"
    helperText="This input is pre-filled."
  />
);

export const OutlineVariant = () => (
  <Input
    name="outline-variant"
    label="Outline Variant Input"
    variant="outline"
    helperText="This input uses the outline variant."
  />
);

export const ErrorVariant = () => (
  <Input
    name="error-variant"
    label="Error Variant Input"
    variant="error"
    helperText="This input uses the error variant."
  />
);

export const DarkMode = () => (
  <div className="dark bg-gray-900 p-6">
    <Input
      name="dark-mode"
      label="Dark Mode Input"
      helperText="This input is in dark mode."
    />
  </div>
);
export const DarkModeWithError = () => (
  <div className="dark bg-gray-900 p-6">
    <Input
      name="dark-mode-error"
      label="Dark Mode Input with Error"
      error="This is an error message."
    />
  </div>
);
