import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email...",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const WithError: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Input with error",
  },
}

export const WithValue: Story = {
  args: {
    value: "Sample input value",
    placeholder: "Enter text...",
  },
}
