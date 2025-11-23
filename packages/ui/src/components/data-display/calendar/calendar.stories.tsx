import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "./calendar"

const meta: Meta = {
  title: "Data Display/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible and accessible calendar component built on react-day-picker. Supports single, multiple, and range selection, custom navigation, and full styling control.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Calendar>

export const Basic: Story = {
  render: () => <Calendar mode="single" />,
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A simple calendar with default settings.",
      },
    },
  },
}

export const WithRangeSelection: Story = {
  render: () => <Calendar mode="range" />, // mode prop from react-day-picker
  name: "Range Selection",
  parameters: {
    docs: {
      description: {
        story: "Calendar with range selection enabled.",
      },
    },
  },
}

export const WithMultipleSelection: Story = {
  render: () => <Calendar mode="multiple" />, // mode prop from react-day-picker
  name: "Multiple Selection",
  parameters: {
    docs: {
      description: {
        story: "Calendar with multiple date selection enabled.",
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <div style={{ maxWidth: 320 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
        <div style={{ marginTop: 8, fontSize: 14 }}>
          Selected: {date ? date.toLocaleDateString() : "None"}
        </div>
      </div>
    )
  },
  name: "Controlled (Single Selection)",
  parameters: {
    docs: {
      description: {
        story: "A controlled calendar with single date selection, showing the selected date below.",
      },
    },
  },
}

export const Playground: Story = {
  args: {},
  render: (_args: any) => <Calendar />,
  name: "Playground",
  parameters: {
    docs: {
      description: {
        story: "Interactive playground for the Calendar component.",
      },
    },
  },
}
