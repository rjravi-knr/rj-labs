"use client"

import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP, TypographyBlockquote, TypographyLead, TypographyLarge, TypographySmall, TypographyMuted } from "@labs/ui/typography"
import { ComponentPreview } from "../../../components/component-preview"

export default function TypographyPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Typography</h1>
        <p className="text-lg text-muted-foreground">
          Styles for headings, paragraphs, lists, etc.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ TypographyH1, TypographyP }"} from "@labs/ui/typography"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<TypographyH1>Heading</TypographyH1>'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<div className="space-y-2">
  <TypographyH1>Heading 1</TypographyH1>
  <TypographyH2>Heading 2</TypographyH2>
  <TypographyH3>Heading 3</TypographyH3>
  <TypographyH4>Heading 4</TypographyH4>
  <TypographyP>
    The King, seeing how much they were liked by his subjects, made them all Knights of the Garter.
  </TypographyP>
  <TypographyLead>
    A modal dialog that interrupts the user with important content and expects a response.
  </TypographyLead>
  <TypographyLarge>Are you sure absolutely sure?</TypographyLarge>
  <TypographySmall>Email address</TypographySmall>
  <TypographyMuted>Enter your email address.</TypographyMuted>
  <TypographyBlockquote>
    "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
  </TypographyBlockquote>
</div>`}>
          <div className="space-y-2">
            <TypographyH1>Heading 1</TypographyH1>
            <TypographyH2>Heading 2</TypographyH2>
            <TypographyH3>Heading 3</TypographyH3>
            <TypographyH4>Heading 4</TypographyH4>
            <TypographyP>
              The King, seeing how much they were liked by his subjects, made them all Knights of the Garter.
            </TypographyP>
            <TypographyLead>
              A modal dialog that interrupts the user with important content and expects a response.
            </TypographyLead>
            <TypographyLarge>Are you sure absolutely sure?</TypographyLarge>
            <TypographySmall>Email address</TypographySmall>
            <TypographyMuted>Enter your email address.</TypographyMuted>
            <TypographyBlockquote>
              "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            </TypographyBlockquote>
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
