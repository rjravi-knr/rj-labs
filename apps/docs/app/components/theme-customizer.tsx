"use client"

import * as React from "react"
import { Check, Paintbrush, Moon, Sun, Monitor, Copy } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@labs/ui/button"
import { Card, CardContent } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Input } from "@labs/ui/input"
import { Separator } from "@labs/ui/separator"
import { Label } from "@labs/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@labs/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@labs/ui/tabs"
import { cn } from "@labs/ui/lib/utils"

const themes = [
  { name: "Zinc", class: "theme-zinc", color: "bg-zinc-500" },
  { name: "Slate", class: "theme-slate", color: "bg-slate-500" },
  { name: "Stone", class: "theme-stone", color: "bg-stone-500" },
  { name: "Gray", class: "theme-gray", color: "bg-gray-500" },
  { name: "Neutral", class: "theme-neutral", color: "bg-neutral-500" },
  { name: "Red", class: "theme-red", color: "bg-red-500" },
  { name: "Rose", class: "theme-rose", color: "bg-rose-500" },
  { name: "Orange", class: "theme-orange", color: "bg-orange-500" },
  { name: "Green", class: "theme-green", color: "bg-green-500" },
  { name: "Blue", class: "theme-blue", color: "bg-blue-500" },
  { name: "Yellow", class: "theme-yellow", color: "bg-yellow-500" },
  { name: "Violet", class: "theme-violet", color: "bg-violet-500" },
]

const dualThemes = [
  { name: "Blue-Purple", class: "theme-blue-purple", color: "bg-gradient-to-r from-blue-500 to-purple-500" },
  { name: "Red-Orange", class: "theme-red-orange", color: "bg-gradient-to-r from-red-500 to-orange-500" },
  { name: "Green-Teal", class: "theme-green-teal", color: "bg-gradient-to-r from-green-500 to-teal-500" },
  { name: "Purple-Pink", class: "theme-purple-pink", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Yellow-Orange", class: "theme-yellow-orange", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
  { name: "Cyan-Blue", class: "theme-cyan-blue", color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
]

const radiusOptions = [
  { name: "None", value: "0", class: "radius-0" },
  { name: "Small", value: "0.3rem", class: "radius-sm" },
  { name: "Medium", value: "0.5rem", class: "radius-md" },
  { name: "Large", value: "0.75rem", class: "radius-lg" },
  { name: "XL", value: "1rem", class: "radius-xl" },
  { name: "Full", value: "9999px", class: "radius-full" },
]

const fonts = [
  { name: "Inter", class: "font-inter" },
  { name: "Manrope", class: "font-manrope" },
  { name: "System", class: "font-system" },
  { name: "Geist", class: "font-geist" },
]

export function ThemeCustomizer() {
  const [mounted, setMounted] = React.useState(false)
  const [activeTheme, setActiveTheme] = React.useState("theme-zinc")
  const [activeRadius, setActiveRadius] = React.useState("radius-md")
  const [activeFont, setActiveFont] = React.useState("font-inter")
  const [copied, setCopied] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
    
    const savedTheme = localStorage.getItem("theme-color")
    if (savedTheme) {
      setActiveTheme(savedTheme)
      document.body.classList.add(savedTheme)
    } else {
      document.body.classList.add("theme-zinc")
    }

    const savedRadius = localStorage.getItem("theme-radius")
    if (savedRadius) {
      setActiveRadius(savedRadius)
      document.documentElement.classList.add(savedRadius)
    } else {
      document.documentElement.classList.add("radius-md")
    }

    const savedFont = localStorage.getItem("theme-font")
    if (savedFont) {
      setActiveFont(savedFont)
      document.body.classList.add(savedFont)
    } else {
      document.body.classList.add("font-inter")
    }
  }, [])

  const setAppTheme = (themeClass: string) => {
    themes.forEach((t) => document.body.classList.remove(t.class))
    dualThemes.forEach((t) => document.body.classList.remove(t.class))
    
    document.body.classList.add(themeClass)
    setActiveTheme(themeClass)
    localStorage.setItem("theme-color", themeClass)
  }

  const setAppRadius = (radiusClass: string) => {
    radiusOptions.forEach((r) => document.documentElement.classList.remove(r.class))
    document.documentElement.classList.add(radiusClass)
    setActiveRadius(radiusClass)
    localStorage.setItem("theme-radius", radiusClass)
  }

  const setAppFont = (fontClass: string) => {
    fonts.forEach((f) => document.body.classList.remove(f.class))
    document.body.classList.add(fontClass)
    setActiveFont(fontClass)
    localStorage.setItem("theme-font", fontClass)
  }

  const copyThemeConfig = () => {
    const config = {
      theme: activeTheme,
      radius: activeRadius,
      font: activeFont,
      mode: theme,
    }
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 hidden md:flex">
          <Paintbrush className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Theme Customizer</SheetTitle>
          <SheetDescription>
            Customize the appearance of components and the documentation.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="customize" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-6 mt-6">
            {/* Mode */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Mode</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={cn(theme === "light" && "border-2 border-primary")}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={cn(theme === "dark" && "border-2 border-primary")}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("system")}
                  className={cn(theme === "system" && "border-2 border-primary")}
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </Button>
              </div>
            </div>

            <Separator />

            {/* Color */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Primary Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setAppTheme(t.class)}
                    className={cn(
                      "group relative h-9 w-full rounded-md border-2 border-transparent hover:border-muted-foreground/50",
                      activeTheme === t.class && "border-primary"
                    )}
                    title={t.name}
                  >
                    <span className={cn("block h-full w-full rounded-sm", t.color)} />
                    {activeTheme === t.class && (
                      <Check className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dual Tone */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Gradient Themes</Label>
              <div className="grid grid-cols-3 gap-2">
                {dualThemes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setAppTheme(t.class)}
                    className={cn(
                      "relative h-9 rounded-md border-2 border-transparent hover:border-muted-foreground/50",
                      activeTheme === t.class && "border-primary"
                    )}
                    title={t.name}
                  >
                    <span className={cn("block h-full w-full rounded-sm", t.color)} />
                    {activeTheme === t.class && (
                      <Check className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Radius */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Border Radius</Label>
              <div className="grid grid-cols-3 gap-2">
                {radiusOptions.map((r) => (
                  <Button
                    key={r.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setAppRadius(r.class)}
                    className={cn(
                      "justify-start",
                      activeRadius === r.class && "border-2 border-primary"
                    )}
                  >
                    <span className="text-xs">{r.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Typography */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Font Family</Label>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((font) => (
                  <Button
                    key={font.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setAppFont(font.class)}
                    className={cn(
                      activeFont === font.class && "border-2 border-primary"
                    )}
                  >
                    <span className="text-xs">{font.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Copy Config */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Export Theme</Label>
              <Button
                variant="outline"
                className="w-full"
                onClick={copyThemeConfig}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Theme Config
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              See how components look with your theme customization
            </p>

            {/* Button Preview */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h4 className="text-sm font-semibold">Buttons</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                  <Button size="sm" variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badge Preview */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h4 className="text-sm font-semibold">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Input Preview */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h4 className="text-sm font-semibold">Form Elements</h4>
                <Input placeholder="Email address" />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="preview-check"
                    className="h-4 w-4 rounded border-primary"
                  />
                  <label
                    htmlFor="preview-check"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Card Preview */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold mb-2">Card Component</h4>
                <p className="text-sm text-muted-foreground">
                  This is a preview of how cards will look with your current theme settings.
                  Notice the border radius and color scheme.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
