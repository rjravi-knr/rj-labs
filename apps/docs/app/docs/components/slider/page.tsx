"use client"

import { Slider } from "@labs/ui/slider"
import { useState } from "react"
import { ComponentPreview } from "../../../components/component-preview"

export default function SliderPage() {
  const [value, setValue] = useState([50])

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Slider</h1>
        <p className="text-lg text-muted-foreground">
          An input where the user selects a value from within a given range.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Slider }"} from "@labs/ui/slider"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Slider defaultValue={[50]} max={100} step={1} />'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />`}>
          <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
        </ComponentPreview>

        <ComponentPreview code={`const [value, setValue] = useState([50])

<div className="space-y-4 w-[60%]">
  <Slider value={value} onValueChange={setValue} max={100} step={1} />
  <div className="text-center text-sm text-muted-foreground">
    Value: {value}
  </div>
</div>`}>
          <div className="space-y-4 w-[60%]">
            <Slider value={value} onValueChange={setValue} max={100} step={1} />
            <div className="text-center text-sm text-muted-foreground">
              Value: {value}
            </div>
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
