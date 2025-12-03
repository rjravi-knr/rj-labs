"use client"

import { Spinner } from "@labs/ui/spinner"
import { ComponentPreview } from "../../../components/component-preview"

export default function SpinnerPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Spinner</h1>
        <p className="text-lg text-muted-foreground">
          Displays an animated loading spinner.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Spinner }"} from "@labs/ui/spinner"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Spinner />'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Spinner />`}>
          <Spinner />
        </ComponentPreview>

        <ComponentPreview code={`<div className="flex items-center gap-4">
  <Spinner className="text-primary" />
  <Spinner className="text-destructive" />
  <Spinner className="text-blue-500" />
</div>`}>
          <div className="flex items-center gap-4">
            <Spinner className="text-primary" />
            <Spinner className="text-destructive" />
            <Spinner className="text-blue-500" />
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
