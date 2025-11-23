import React from "react"
import { Meta, StoryObj } from "@storybook/react-vite"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible"
import { Button } from "../../atoms/button/button"

const meta: Meta = {
  title: "Molecules/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A simple, accessible collapsible component built on Radix UI. Supports controlled and uncontrolled usage, and can be used for accordions, disclosure widgets, and more.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Collapsible>

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
          >
            {open ? "Hide content" : "Show content"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            style={{
              marginTop: 12,
              padding: 16,
              background: "#f9fafb",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
            }}
          >
            Collapsible content goes here. You can put any React node here.
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A basic collapsible with a trigger button and content area.",
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
          >
            {open ? "Collapse" : "Expand"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            style={{
              marginTop: 12,
              padding: 16,
              background: "#f9fafb",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
            }}
          >
            This is a controlled collapsible. State is managed by the parent.
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
  name: "Controlled",
  parameters: {
    docs: {
      description: {
        story: "A controlled collapsible, with state managed by the parent.",
      },
    },
  },
}
