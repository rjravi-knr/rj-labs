import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
      description: "Visual style of the alert",
      table: {
        type: { summary: '"default" | "destructive"' },
        defaultValue: { summary: "default" },
      },
    },
    className: { control: false },
    style: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "The **Alert** component displays important messages or feedback to the user. It supports variants and slots for title and description.",
          "",
          "**Import:**",
          "```tsx",
          "import { Alert, AlertTitle, AlertDescription } from '@labs/ui/components/molecules/alert/alert';",
          "```",
          "",
          "**Basic usage:**",
          "```tsx",
          "<Alert>This is an alert message.</Alert>",
          "```",
          "",
          "**With title and description:**",
          "```tsx",
          "<Alert>",
          "  <AlertTitle>Heads up!</AlertTitle>",
          "  <AlertDescription>This is an alert with a title and description.</AlertDescription>",
          "</Alert>",
          "```",
          "",
          "**Variants:**",
          "* `default` (neutral/info)",
          "* `destructive` (error/danger)",
          "",
          "You can also pass custom className and style props for further customization.",
        ].join("\n"),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: "This is an alert message.",
    variant: "default",
  },
  render: (args) => (
    <div style={{ width: "50vw", minHeight: 120 }}>
      <Alert {...args} style={{ ...args.style, width: "100%" }} />
    </div>
  ),
};

export const Destructive: Story = {
  args: {
    children: "This is a destructive alert.",
    variant: "destructive",
  },
  render: (args) => (
    <div style={{ width: "50vw", minHeight: 120 }}>
      <Alert {...args} />
    </div>
  ),
};

export const WithTitleAndDescription: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <div style={{ width: "50vw", minHeight: 120 }}>
      <Alert {...args} style={{ ...args.style, width: "100%" }}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is an alert with a title and description.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
export const Playground: Story = {
  args: {
    variant: "default",
    children: "This is a customizable alert.",
  },
  render: (args) => (
    <div style={{ width: "50vw", minHeight: 120 }}>
      <Alert {...args} style={{ ...args.style, width: "100%" }} />
    </div>
  ),
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story:
          "Use the controls to interactively change the alert variant and content.",
      },
    },
  },
};
