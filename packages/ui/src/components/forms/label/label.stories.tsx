import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "../checkbox"
import { Label } from "./label"

const meta = {
  title: "Forms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Your email address",
  },
}

export const WithControl: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}
