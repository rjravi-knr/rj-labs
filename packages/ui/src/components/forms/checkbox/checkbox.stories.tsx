import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A styled checkbox component built on Radix UI primitives. Supports checked, unchecked, and indeterminate states, with full accessibility.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Basic: Story = {
  render: () => (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="basic" />
      <span>Default (unchecked)</span>
    </label>
  ),
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A simple checkbox in its default (unchecked) state, with a label.",
      },
    },
  },
}

export const Checked: Story = {
  render: () => (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="checked" defaultChecked />
      <span>Checked</span>
    </label>
  ),
  name: "Checked",
  parameters: {
    docs: {
      description: {
        story: "A checkbox in the checked state, with a label.",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="disabled" disabled />
      <span>Disabled</span>
    </label>
  ),
  name: "Disabled",
  parameters: {
    docs: {
      description: {
        story: "A disabled checkbox, with a label.",
      },
    },
  },
}

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: {} as any,
  render: (args: any) => (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox {...args} id="playground" />
      <span>Playground</span>
    </label>
  ),
  name: "Playground",
  parameters: {
    docs: {
      description: {
        story: "Interactive playground for the Checkbox component, with a label.",
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="terms" />
      <span>Accept terms and conditions</span>
    </label>
  ),
  name: "With Label",
  parameters: {
    docs: {
      description: {
        story: "Checkbox with a label, as used for terms and conditions.",
      },
    },
  },
}
