import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Avatar size",
      table: { type: { summary: '"sm" | "md" | "lg" | "xl"' }, defaultValue: { summary: "md" } },
    },
    className: { control: false },
    style: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "The **Avatar** component displays a user profile image, initials, or a fallback icon. It supports images, fallback text, emoji, and custom sizes.",
          "",
          "**Import:**",
          "```tsx",
          "import { Avatar, AvatarImage, AvatarFallback } from '@labs/ui/components/atoms/avatar/avatar';",
          "```",
          "",
          "**Basic usage:**",
          "```tsx",
          "<Avatar size='md'>",
          "  <AvatarImage src='...' alt='User' />",
          "  <AvatarFallback>AB</AvatarFallback>",
          "</Avatar>",
          "```",
        ].join("\n"),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

// Grouped Avatars: all sizes and variants
export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center", justifyContent: "center", padding: 24 }}>
      {/* Small */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="sm">
          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>Small</span>
      </div>
      {/* Medium (default) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="md">
          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>Medium</span>
      </div>
      {/* Large */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="lg">
          <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>Large</span>
      </div>
      {/* Extra Large */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="xl">
          <AvatarImage src="https://randomuser.me/api/portraits/women/46.jpg" alt="User" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>XLarge</span>
      </div>
      {/* Only fallback */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="md">
          <AvatarFallback>XY</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>Only Fallback</span>
      </div>
      {/* Emoji fallback */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar size="md">
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 12 }}>Emoji</span>
      </div>
    </div>
  ),
};

// Playground story for controls
export const Playground: Story = {
  args: {} as any,
  render: (args: any) => {
    const fallback = "AB";
    return (
      <div style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Avatar size={args.size}>
          <AvatarImage src={args.src} alt={args.alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
    );
  },
  argTypes: {
    // Removed 'src' as it is not recognized in the Avatar component's argTypes
    // fallback removed from argTypes
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Avatar size",
      table: { category: "Avatar" },
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: "Use the controls to interactively change the avatar image, alt text, fallback, and size.",
      },
    },
  },
};