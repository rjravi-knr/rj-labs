import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ChevronsUpDown } from "lucide-react"
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

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Default: Story = {
  render: () => <CollapsibleDemo />,
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "A basic collapsible with a trigger button and content area.",
      },
    },
  },
}

const ControlledCollapsibleDemo = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button>
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
}

export const Controlled: Story = {
  render: () => <ControlledCollapsibleDemo />,
  name: "Controlled",
  parameters: {
    docs: {
      description: {
        story: "A controlled collapsible, with state managed by the parent.",
      },
    },
  },
}
