import React from "react"
import { Meta, StoryObj } from "@storybook/react-vite"
import {
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings as SettingsIcon,
  Smile,
  User,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command"

const meta: Meta = {
  title: "Navigation/Command",
  component: CommandDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A command palette component (CMD+J menu) built on cmdk and Radix UI Dialog. Supports grouping, shortcuts, empty state, and full accessibility.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof CommandDialog>

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
    return (
      <div>
        <p style={{ color: "#6b7280", fontSize: 14 }}>
          Press{" "}
          <kbd
            style={{
              background: "#f3f4f6",
              color: "#6b7280",
              borderRadius: 4,
              padding: "2px 6px",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            ⌘J
          </kbd>{" "}
          to open the command palette.
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    )
  },
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A command palette with keyboard shortcut, icons, groups, items, and shortcuts, matching shadcn/ui best practices.",
      },
    },
  },
}
