import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { DatePicker } from "./date-picker" // This import might become unused if DatePickerDemo completely replaces its functionality.
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../../atoms/button/button"
import { Calendar } from "../../data-display/calendar/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../molecules/popover/popover"

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker, // The component prop here still points to the original DatePicker.
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export const Default: Story = {
  render: () => <DatePickerDemo />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: {} as any,
}
