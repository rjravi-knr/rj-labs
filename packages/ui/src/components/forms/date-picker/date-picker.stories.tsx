import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { DatePicker } from "./date-picker"

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return <DatePicker date={date} setDate={setDate} />
  },
}
