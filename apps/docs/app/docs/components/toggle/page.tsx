"use client"

import { Toggle } from "@labs/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"
import { ComponentPreview } from "../../../components/component-preview"

export default function TogglePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Toggle</h1>
        <p className="text-lg text-muted-foreground">
          A two-state button that can be either on or off.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Toggle }"} from "@labs/ui/toggle"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Toggle>Toggle</Toggle>'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}>
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
        </ComponentPreview>

        <ComponentPreview code={`<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>`}>
          <Toggle variant="outline" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
        </ComponentPreview>

        <ComponentPreview code={`<Toggle aria-label="Toggle italic">
  <Italic className="mr-2 h-4 w-4" />
  Italic
</Toggle>`}>
          <Toggle aria-label="Toggle italic">
            <Italic className="mr-2 h-4 w-4" />
            Italic
          </Toggle>
        </ComponentPreview>

        <ComponentPreview code={`<Toggle size="sm" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>`}>
          <Toggle size="sm" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
        </ComponentPreview>

        <ComponentPreview code={`<Toggle size="lg" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>`}>
          <Toggle size="lg" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
        </ComponentPreview>

        <ComponentPreview code={`<Toggle disabled aria-label="Toggle italic">
  <Underline className="h-4 w-4" />
</Toggle>`}>
          <Toggle disabled aria-label="Toggle italic">
            <Underline className="h-4 w-4" />
          </Toggle>
        </ComponentPreview>
      </div>
    </div>
  )
}
