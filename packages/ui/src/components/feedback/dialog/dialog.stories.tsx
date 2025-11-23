import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"
import { Button } from "@labs/ui/components/atoms/button/button"

const meta: Meta = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog component built on Radix UI. Supports header, footer, title, description, and close actions. Fully accessible and customizable.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        >
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a simple dialog. You can put any content here.
          </DialogDescription>
        </DialogHeader>
        <div style={{ margin: "16px 0" }}>
          Dialog body content goes here.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
            variant={'destructive'}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A basic dialog with header, description, body, and footer actions.",
      },
    },
  },
}
