"use client"

import { Toaster } from "@labs/ui/sonner"
import { toast } from "sonner"
import { Button } from "@labs/ui/button"
import { ComponentPreview } from "../../../components/component-preview"

export default function SonnerPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Sonner</h1>
        <p className="text-lg text-muted-foreground">
          An opinionated toast component for React.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <pre className="text-sm whitespace-pre-wrap">
{`import { Toaster } from "@labs/ui/sonner"
import { toast } from "sonner"`}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <pre className="text-sm whitespace-pre-wrap">
{`// Add Toaster to your app
<Toaster />

// Show a toast
toast("Event has been created")`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Button
  variant="outline"
  onClick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
>
  Show Toast
</Button>`}>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => toast("Event has been created")}
            >
              Simple
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              With Description
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              With Action
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Event has been created")}
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Event has not been created")}
            >
              Error
            </Button>
          </div>
          <Toaster />
        </ComponentPreview>
      </div>
    </div>
  )
}
