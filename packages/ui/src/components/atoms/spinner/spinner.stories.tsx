import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Colored: Story = {
  args: {
    className: "text-blue-500",
  },
}

export const Large: Story = {
  render: () => (
    <Spinner />
  ),
}
