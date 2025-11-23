import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Combobox } from "./combobox"

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export const Default: Story = {
  args: {
    options: frameworks,
  },
  render: (args) => {
    const [value, setValue] = React.useState("")

    return (
      <Combobox
        {...args}
        value={value}
        onSelect={setValue}
        placeholder="Select framework..."
      />
    )
  },
}
