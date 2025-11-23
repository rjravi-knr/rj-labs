import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "../label"
import { Switch } from "./switch"

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}
