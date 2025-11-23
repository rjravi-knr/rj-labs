import type { Meta, StoryObj } from "@storybook/react"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "./typography"

const meta: Meta = {
  title: "Atoms/Typography",
  tags: ["autodocs"],
}

export default meta

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
    </div>
  ),
}

export const Paragraphs: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <TypographyP>
        The king, seeing how much happier his subjects were, realized the error of
        his ways and repealed the joke tax.
      </TypographyP>
      <TypographyLead>
        A modal dialog that interrupts the user with important content and expects
        a response.
      </TypographyLead>
      <TypographyBlockquote>
        "After all," he said, "everyone enjoys a good joke, so it's only fair that
        they should pay for the privilege."
      </TypographyBlockquote>
    </div>
  ),
}

export const Helpers: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <TypographyLarge>Large Text</TypographyLarge>
      <TypographySmall>Small Text</TypographySmall>
      <TypographyMuted>Muted Text</TypographyMuted>
    </div>
  ),
}
