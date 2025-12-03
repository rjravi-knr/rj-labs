"use client"

import { Button } from "@labs/ui/button"
import { Mail, Loader2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ComponentPreview } from "../../../components/component-preview"
import { useState } from "react"
import { Label } from "@labs/ui/label"
import { RadioGroup, RadioGroupItem } from "@labs/ui/radio-group"
import { Input } from "@labs/ui/input"
import { Checkbox } from "@labs/ui/checkbox"

export default function ButtonPage() {
  const [variant, setVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default")
  const [size, setSize] = useState<"default" | "sm" | "lg" | "icon">("default")
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState("Button")

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Button</h1>
        <p className="text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">import {"{ Button }"} from "@labs/ui/button"</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">{'<Button variant="outline">Button</Button>'}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
        
        <ComponentPreview code={`<Button>Button</Button>`}>
          <Button>Button</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="secondary">Secondary</Button>`}>
          <Button variant="secondary">Secondary</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="destructive">Destructive</Button>`}>
          <Button variant="destructive">Destructive</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="outline">Outline</Button>`}>
          <Button variant="outline">Outline</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="ghost">Ghost</Button>`}>
          <Button variant="ghost">Ghost</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="link">Link</Button>`}>
          <Button variant="link">Link</Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button variant="outline" size="icon">
  <ChevronRight className="h-4 w-4" />
</Button>`}>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>`}>
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`}>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </ComponentPreview>

        <ComponentPreview code={`<Button asChild>
  <Link href="/login">Login</Link>
</Button>`}>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </ComponentPreview>
      </div>

      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Playground</h2>
        <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex h-[400px] w-full items-center justify-center rounded-md border p-8 md:w-2/3">
                <Button variant={variant} size={size} disabled={disabled}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {label}
                </Button>
            </div>
            <div className="w-full space-y-4 md:w-1/3">
                <div className="space-y-2">
                    <Label>Variant</Label>
                    <RadioGroup value={variant} onValueChange={(v: any) => setVariant(v)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="default" />
                            <Label htmlFor="default">Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="secondary" id="secondary" />
                            <Label htmlFor="secondary">Secondary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="destructive" id="destructive" />
                            <Label htmlFor="destructive">Destructive</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outline" id="outline" />
                            <Label htmlFor="outline">Outline</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ghost" id="ghost" />
                            <Label htmlFor="ghost">Ghost</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="link" id="link" />
                            <Label htmlFor="link">Link</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label>Size</Label>
                    <RadioGroup value={size} onValueChange={(v: any) => setSize(v)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="size-default" />
                            <Label htmlFor="size-default">Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sm" id="size-sm" />
                            <Label htmlFor="size-sm">Small</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lg" id="size-lg" />
                            <Label htmlFor="size-lg">Large</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="icon" id="size-icon" />
                            <Label htmlFor="size-icon">Icon</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={label} onChange={(e) => setLabel(e.target.value)} />
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="disabled" checked={disabled} onCheckedChange={(c: any) => setDisabled(c)} />
                    <Label htmlFor="disabled">Disabled</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="loading" checked={loading} onCheckedChange={(c: any) => setLoading(c)} />
                    <Label htmlFor="loading">Loading</Label>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
