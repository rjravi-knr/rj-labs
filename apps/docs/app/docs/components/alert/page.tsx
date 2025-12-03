"use client"

import { Alert, AlertDescription, AlertTitle } from "@labs/ui/alert"
import { Terminal, AlertCircle } from "lucide-react"
import { ComponentPreview } from "../../../components/component-preview"

export default function AlertPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Displays a callout for user attention.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Alert, AlertDescription, AlertTitle }"} from "@labs/ui/alert"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <pre className="text-sm whitespace-pre-wrap">
{`<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`}>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </ComponentPreview>

        <ComponentPreview code={`<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`}>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </div>
    </div>
  )
}
