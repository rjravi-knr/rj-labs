import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual style of the badge",
      table: {
        type: { summary: '"default" | "secondary" | "destructive" | "outline"' },
        defaultValue: { summary: "default" },
      },
    },
    className: { control: false },
    style: { control: false },
    asChild: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "The **Badge** component is used to highlight or label UI elements. It supports multiple variants and can be used as a span or as a child element.",
          "",
          "**Import:**",
          "```tsx",
          "import { Badge } from '@labs/ui/components/atoms/badge/badge';",
          "```",
          "",
          "**Basic usage:**",
          "```tsx",
          "<Badge>Default</Badge>",
          "```",
        ].join("\n"),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 100 }}>
      <Badge {...args} />
    </div>
  ),
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: "Use the controls to interactively change the badge variant and content.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", minHeight: 100 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All badge variants side by side for comparison.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", minHeight: 100 }}>
      <Badge variant="default">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
          <circle cx="12" cy="12" r="10" />
        </svg>
        With Icon
      </Badge>
      <Badge variant="destructive">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        Error
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with inline SVG icons.",
      },
    },
  },
};
