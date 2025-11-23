import type { Meta, StoryObj } from "@storybook/react"
import { cn } from "@labs/ui/lib/utils"
import { Slider } from "./slider"

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
  ),
}
