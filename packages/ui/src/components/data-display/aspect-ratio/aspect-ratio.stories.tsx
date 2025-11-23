
import React from "react"
import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Data Display/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "The **AspectRatio** component constrains content to a specific width-to-height ratio. Useful for images, videos, or any content that should maintain a consistent aspect.",
          "",
          "**Import:**",
          "```tsx",
          "import { AspectRatio } from '@labs/ui/components/data-display/aspect-ratio/aspect-ratio';",
          "```",
          "",
          "**Basic usage:**",
          "```tsx",
          "<AspectRatio ratio={16 / 9}>",
          "  <img src='...' alt='...' />",
          "</AspectRatio>",
          "```",
        ].join("\n"),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Square: Story = {
  args: {
    ratio: 1,
    children: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
        alt="1:1 PNG Example"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
      />
    ),
  },
  render: (args: any) => (
    <div style={{ width: 400, border: '1px grey', borderRadius: 12, padding: 8, background: '#fafafa' }}>
      <AspectRatio {...args} />
    </div>
  )
};

export const FourByThree: Story = {
  args: {
    ratio: 4 / 3,
    children: (
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        style={{ width: "100%", height: "100%", borderRadius: 8, background: "#000" }}
      />
    ),
  },
  render: (args: any) => (
    <div style={{ width: 500, border: '1px grey', borderRadius: 12, padding: 8, background: '#fafafa' }}>
      <AspectRatio {...args} />
    </div>
  )
};
export const SixteenByNineExample: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="16:9 PNG Example"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
      />
    ),
  },
  render: (args) => (
    <div style={{ width: 600, border: '1px grey', borderRadius: 12, padding: 8, background: '#fafafa' }}>
      <AspectRatio {...args} />
    </div>
  )
};