"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@labs/ui/lib/utils"

interface SidebarItem {
  title: string
  href: string
  badge?: string
}

interface SidebarGroup {
  title: string
  items: SidebarItem[]
}


const items: SidebarGroup[] = [
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
      {
        title: "Utils",
        href: "/docs/utils",
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
      {
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
      },
      {
        title: "Command",
        href: "/docs/components/command",
      },
      {
        title: "Context Menu",
        href: "/docs/components/context-menu",
      },
      {
        title: "Drawer",
        href: "/docs/components/drawer",
      },
      {
        title: "Menubar",
        href: "/docs/components/menubar",
      },
      {
        title: "Navigation Menu",
        href: "/docs/components/navigation-menu",
      },
      {
        title: "Pagination",
        href: "/docs/components/pagination",
      },
    ],
  },
]

const utilsItems: SidebarGroup[] = [
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
      {
        title: "Utils Overview",
        href: "/docs/utils",
      },
    ],
  },
  {
    title: "Utilities",
    items: [
      {
        title: "String",
        href: "/docs/utils/string",
        badge: "16",
      },
      {
        title: "Date/Time",
        href: "/docs/utils/date",
        badge: "20",
      },
      {
        title: "Validation",
        href: "/docs/utils/validation",
        badge: "15",
      },
      {
        title: "Number",
        href: "/docs/utils/number",
        badge: "14",
      },
      {
        title: "Array",
        href: "/docs/utils/array",
        badge: "14",
      },
      {
        title: "Object",
        href: "/docs/utils/object",
        badge: "13",
      },
      {
        title: "Async",
        href: "/docs/utils/async",
        badge: "8",
      },
      {
        title: "Function",
        href: "/docs/utils/function",
        badge: "5",
      },
      {
        title: "URL",
        href: "/docs/utils/url",
        badge: "9",
      },
      {
        title: "Crypto",
        href: "/docs/utils/crypto",
        badge: "7",
      },
      {
        title: "Types",
        href: "/docs/utils/types",
        badge: "11",
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const isUtilsPage = pathname.startsWith('/docs/utils')
  const currentItems = isUtilsPage ? utilsItems : items

  return (
    <div className="w-full">
      {currentItems.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item.items?.length && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {item.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 hover:underline",
                    pathname === subItem.href
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <span>{subItem.title}</span>
                  {subItem.badge && (
                    <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
