import type { Meta, StoryObj } from "@storybook/react"
import { Bold } from "lucide-react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    "aria-label": "Toggle bold",
    children: <Bold className="h-4 w-4" />,
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle bold",
    children: <Bold className="h-4 w-4" />,
  },
}

export const WithText: Story = {
  args: {
    "aria-label": "Toggle italic",
    children: "Italic",
  },
}
