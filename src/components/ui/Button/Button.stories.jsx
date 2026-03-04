import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    activeColor: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    $isSmall: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
};

export const Playground = {
  args: {
    activeColor: "primary",
    $isSmall: false,
    children: "Hello Roman",
  },
};
