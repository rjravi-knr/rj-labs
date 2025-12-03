"use client"

import { Button } from "@labs/ui/button"
import { Input } from "@labs/ui/input"
import { Label } from "@labs/ui/label"
import { ComponentPreview } from "../../../components/component-preview"

export default function FormPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Form</h1>
        <p className="text-lg text-muted-foreground">
          Building forms with React Hook Form and Zod validation.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <pre className="text-sm whitespace-pre-wrap">
{`npm install react-hook-form zod @hookform/resolvers`}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <p className="text-sm">
            Use React Hook Form with Zod for type-safe form validation. Components should be used with form controls.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<form className="space-y-4 w-full max-w-md">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="m@example.com" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>
  <Button type="submit">Submit</Button>
</form>`}>
          <form className="space-y-4 w-full max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </ComponentPreview>
      </div>
    </div>
  )
}
