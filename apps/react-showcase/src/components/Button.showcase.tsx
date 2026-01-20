import { Button as Component } from "../../../../packages/ui/src/components/button/Button";

export default {
  title: "Button",
  component: Component,
};

export const Button = (props: {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        flexDirection: "column",
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <Component key={i} {...props}>
          {props.children}
        </Component>
      ))}
    </div>
  );
};

Button.props = {
  size: {
    type: "select",
    options: ["sm", "md", "lg"],
  },
  variant: {
    type: "select",
    options: ["primary", "secondary"],
  },
  className: {
    type: "string",
    default: "",
  },
  children: {
    label: "Content",
    type: "string",
    default: "Click me",
  },
  key: {
    type: "string",
    default: "value",
  },
};
