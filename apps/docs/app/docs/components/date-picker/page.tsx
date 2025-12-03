"use client"

import { DatePicker } from "@labs/ui/date-picker"
import { ComponentPreview } from "../../../components/component-preview"

export default function DatePickerPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Date Picker</h1>
        <p className="text-lg text-muted-foreground">
          A date picker component with range and single selection modes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ DatePicker }"} from "@labs/ui/date-picker"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<DatePicker />'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<DatePicker />`}>
          <DatePicker />
        </ComponentPreview>
      </div>
    </div>
  )
}
