import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../atoms/button"
import { ButtonGroup } from "./button-group"

const meta = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
}

export const WithPrimary: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </ButtonGroup>
  ),
}
