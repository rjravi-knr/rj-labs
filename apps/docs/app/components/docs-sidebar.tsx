"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@labs/ui/lib/utils"

const items = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Components",
        href: "/docs/components",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Avatar",
        href: "/docs/components/avatar",
      },
      {
        title: "Badge",
        href: "/docs/components/badge",
      },
      {
        title: "Button",
        href: "/docs/components/button",
      },
      {
        title: "Separator",
        href: "/docs/components/separator",
      },
      {
        title: "Skeleton",
        href: "/docs/components/skeleton",
      },
      {
        title: "Spinner",
        href: "/docs/components/spinner",
      },
      {
        title: "Toggle",
        href: "/docs/components/toggle",
      },
      {
        title: "Typography",
        href: "/docs/components/typography",
      },
      {
        title: "Accordion",
        href: "/docs/components/accordion",
      },
      {
        title: "Alert",
        href: "/docs/components/alert",
      },
      {
        title: "Card",
        href: "/docs/components/card",
      },
      {
        title: "Collapsible",
        href: "/docs/components/collapsible",
      },
      {
        title: "Hover Card",
        href: "/docs/components/hover-card",
      },
      {
        title: "Popover",
        href: "/docs/components/popover",
      },
     {
        title: "Tooltip",
        href: "/docs/components/tooltip",
      },
      {
        title: "Alert Dialog",
        href: "/docs/components/alert-dialog",
      },
      {
        title: "Dialog",
        href: "/docs/components/dialog",
      },
      {
        title: "Progress",
        href: "/docs/components/progress",
      },
      {
        title: "Sonner",
        href: "/docs/components/sonner",
      },
      {
        title: "Combobox",
        href: "/docs/components/combobox",
      },
      {
        title: "Date Picker",
        href: "/docs/components/date-picker",
      },
      {
        title: "Form",
        href: "/docs/components/form",
      },
      {
        title: "Input OTP",
        href: "/docs/components/input-otp",
      },
      {
        title: "Select",
        href: "/docs/components/select",
      },
      {
        title: "Slider",
        href: "/docs/components/slider",
      },
      {
        title: "Switch",
        href: "/docs/components/switch",
      },
      {
        title: "Textarea",
        href: "/docs/components/textarea",
      },
      {
        title: "Toggle Group",
        href: "/docs/components/toggle-group",
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item.items?.length && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {item.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                    pathname === item.href
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
