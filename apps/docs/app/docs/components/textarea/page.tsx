"use client"

import { Textarea } from "@labs/ui/textarea"
import { ComponentPreview } from "../../../components/component-preview"

export default function TextareaPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Textarea</h1>
        <p className="text-lg text-muted-foreground">
          Displays a form textarea or a component that looks like a textarea.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Textarea }"} from "@labs/ui/textarea"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Textarea placeholder="Type your message here." />'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Textarea placeholder="Type your message here." />`}>
          <Textarea placeholder="Type your message here." className="w-full max-w-md" />
        </ComponentPreview>

        <ComponentPreview code={`<Textarea placeholder="Type your message here." disabled />`}>
          <Textarea placeholder="Type your message here." disabled className="w-full max-w-md" />
        </ComponentPreview>
      </div>
    </div>
  )
}
