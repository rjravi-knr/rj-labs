"use client"

import { Badge } from "@labs/ui/badge"
import { ComponentPreview } from "../../../components/component-preview"

export default function BadgePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Badge</h1>
        <p className="text-lg text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Badge }"} from "@labs/ui/badge"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Badge>Badge</Badge>'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Badge>Badge</Badge>`}>
          <Badge>Badge</Badge>
        </ComponentPreview>

        <ComponentPreview code={`<Badge variant="secondary">Secondary</Badge>`}>
          <Badge variant="secondary">Secondary</Badge>
        </ComponentPreview>

        <ComponentPreview code={`<Badge variant="outline">Outline</Badge>`}>
          <Badge variant="outline">Outline</Badge>
        </ComponentPreview>

        <ComponentPreview code={`<Badge variant="destructive">Destructive</Badge>`}>
          <Badge variant="destructive">Destructive</Badge>
        </ComponentPreview>
      </div>
    </div>
  )
}
