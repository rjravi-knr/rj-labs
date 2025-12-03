"use client"

import * as React from "react"
import { Check, Paintbrush, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@labs/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@labs/ui/sheet"
import { cn } from "@labs/ui/lib/utils"

const themes = [
  { name: "Zinc", class: "theme-zinc", color: "bg-zinc-500" },
  { name: "Red", class: "theme-red", color: "bg-red-500" },
  { name: "Blue", class: "theme-blue", color: "bg-blue-500" },
  { name: "Green", class: "theme-green", color: "bg-green-500" },
  { name: "Orange", class: "theme-orange", color: "bg-orange-500" },
]

const dualThemes = [
  { name: "Blue-Purple", class: "theme-blue-purple", color: "bg-gradient-to-r from-blue-500 to-purple-500" },
  { name: "Red-Orange", class: "theme-red-orange", color: "bg-gradient-to-r from-red-500 to-orange-500" },
  { name: "Green-Teal", class: "theme-green-teal", color: "bg-gradient-to-r from-green-500 to-teal-500" },
  { name: "Purple-Pink", class: "theme-purple-pink", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Yellow-Orange", class: "theme-yellow-orange", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
]

const fonts = [
  { name: "Inter", class: "font-inter" },
  { name: "Manrope", class: "font-manrope" },
  { name: "System", class: "font-system" },
]

export function ThemeCustomizer() {
  const [mounted, setMounted] = React.useState(false)
  const [activeTheme, setActiveTheme] = React.useState("theme-zinc")
  const [activeFont, setActiveFont] = React.useState("font-inter")
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

    const savedFont = localStorage.getItem("theme-font")
    if (savedFont) {
        setActiveFont(savedFont)
        document.body.classList.add(savedFont)
    } else {
        document.body.classList.add("font-inter")
    }
  }, [])

  const setAppTheme = (themeClass: string) => {
    // Remove all theme classes
    themes.forEach((t) => document.body.classList.remove(t.class))
    dualThemes.forEach((t) => document.body.classList.remove(t.class))
    
    // Add new theme class
    document.body.classList.add(themeClass)
    setActiveTheme(themeClass)
    localStorage.setItem("theme-color", themeClass)
  }

  const setAppFont = (fontClass: string) => {
      fonts.forEach((f) => document.body.classList.remove(f.class))
      document.body.classList.add(fontClass)
      setActiveFont(fontClass)
      localStorage.setItem("theme-font", fontClass)
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
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Theme Customizer</SheetTitle>
          <SheetDescription>
            Customize the appearance of the documentation.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
                <div className="font-semibold leading-none tracking-tight">Mode</div>
                <div className="grid grid-cols-3 gap-2">
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className={cn(theme === "light" && "border-2 border-primary")}
                    >
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                    </Button>
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className={cn(theme === "dark" && "border-2 border-primary")}
                    >
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                    </Button>
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => setTheme("system")}
                        className={cn(theme === "system" && "border-2 border-primary")}
                    >
                        <Monitor className="mr-2 h-4 w-4" />
                        System
                    </Button>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="font-semibold leading-none tracking-tight">Color</div>
                <div className="grid grid-cols-3 gap-2">
                    {themes.map((theme) => (
                        <Button
                            key={theme.name}
                            variant={"outline"}
                            size="sm"
                            onClick={() => setAppTheme(theme.class)}
                            className={cn("justify-start", activeTheme === theme.class && "border-2 border-primary")}
                        >
                            <span className={cn("mr-2 h-4 w-4 rounded-full", theme.color)} />
                            {theme.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="font-semibold leading-none tracking-tight">Dual Tone</div>
                <div className="grid grid-cols-2 gap-2">
                    {dualThemes.map((theme) => (
                        <Button
                            key={theme.name}
                            variant={"outline"}
                            size="sm"
                            onClick={() => setAppTheme(theme.class)}
                            className={cn("justify-start", activeTheme === theme.class && "border-2 border-primary")}
                        >
                            <span className={cn("mr-2 h-4 w-4 rounded-full", theme.color)} />
                            {theme.name}
                        </Button>
                    ))}
                </div>
            </div>

             <div className="space-y-1.5">
                <div className="font-semibold leading-none tracking-tight">Typography</div>
                <div className="grid grid-cols-3 gap-2">
                    {fonts.map((font) => (
                        <Button
                            key={font.name}
                            variant={"outline"}
                            size="sm"
                            onClick={() => setAppFont(font.class)}
                            className={cn(activeFont === font.class && "border-2 border-primary")}
                        >
                            <span className="text-xs">{font.name}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
