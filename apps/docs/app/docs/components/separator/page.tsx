"use client"

import { Separator } from "@labs/ui/separator"
import { ComponentPreview } from "../../../components/component-preview"

export default function SeparatorPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Separator</h1>
        <p className="text-lg text-muted-foreground">
          Visually or semantically separates content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Separator }"} from "@labs/ui/separator"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Separator />'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<div className="space-y-1">
  <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
  <p className="text-sm text-muted-foreground">
    An open-source UI component library.
  </p>
</div>
<Separator className="my-4" />
<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <div>Docs</div>
  <div>Source</div>
</div>`}>
          <div className="w-full max-w-[300px]">
             <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                <p className="text-sm text-muted-foreground">
                  An open-source UI component library.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <div>Docs</div>
                <div>Source</div>
              </div>
          </div>
        </ComponentPreview>

        <ComponentPreview code={`<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>`}>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
