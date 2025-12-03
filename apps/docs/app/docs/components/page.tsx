import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

const categories = [
  {
    name: "Atoms",
    description: "Basic building blocks of the design system",
    status: "complete",
    components: [
      { name: "Avatar", href: "/docs/components/avatar", done: true },
      { name: "Badge", href: "/docs/components/badge", done: true },
      { name: "Button", href: "/docs/components/button", done: true },
      { name: "Separator", href: "/docs/components/separator", done: true },
      { name: "Skeleton", href: "/docs/components/skeleton", done: true },
      { name: "Spinner", href: "/docs/components/spinner", done: true },
      { name: "Toggle", href: "/docs/components/toggle", done: true },
      { name: "Typography", href: "/docs/components/typography", done: true },
    ],
  },
  {
    name: "Molecules",
    description: "Combinations of atoms working together",
    status: "complete",
    components: [
      { name: "Accordion", href: "/docs/components/accordion", done: true },
      { name: "Alert", href: "/docs/components/alert", done: true },
      { name: "Card", href: "/docs/components/card", done: true },
      { name: "Collapsible", href: "/docs/components/collapsible", done: true },
      { name: "Hover Card", href: "/docs/components/hover-card", done: true },
      { name: "Popover", href: "/docs/components/popover", done: true },
      { name: "Tooltip", href: "/docs/components/tooltip", done: true },
    ],
  },
  {
    name: "Feedback",
    description: "Components for user feedback and notifications",
    status: "in-progress",
    components: [
      { name: "Alert Dialog", href: "/docs/components/alert-dialog", done: false },
      { name: "Dialog", href: "/docs/components/dialog", done: false },
      { name: "Progress", href: "/docs/components/progress", done: false },
      { name: "Sheet", href: "/docs/components/sheet", done: false },
      { name: "Sonner", href: "/docs/components/sonner", done: false },
    ],
  },
  {
    name: "Forms",
    description: "Form inputs and controls",
    status: "pending",
    components: [
      { name: "Checkbox", href: "/docs/components/checkbox", done: false },
      { name: "Combobox", href: "/docs/components/combobox", done: false },
      { name: "Date Picker", href: "/docs/components/date-picker", done: false },
      { name: "Form", href: "/docs/components/form", done: false },
      { name: "Input", href: "/docs/components/input", done: false },
      { name: "Input OTP", href: "/docs/components/input-otp", done: false },
      { name: "Label", href: "/docs/components/label", done: false },
      { name: "Radio Group", href: "/docs/components/radio-group", done: false },
      { name: "Select", href: "/docs/components/select", done: false },
      { name: "Slider", href: "/docs/components/slider", done: false },
      { name: "Switch", href: "/docs/components/switch", done: false },
      { name: "Textarea", href: "/docs/components/textarea", done: false },
      { name: "Toggle Group", href: "/docs/components/toggle-group", done: false },
    ],
  },
  {
    name: "Navigation",
    description: "Navigation and menu components",
    status: "pending",
    components: [
      { name: "Breadcrumb", href: "/docs/components/breadcrumb", done: false },
      { name: "Command", href: "/docs/components/command", done: false },
      { name: "Context Menu", href: "/docs/components/context-menu", done: false },
      { name: "Drawer", href: "/docs/components/drawer", done: false },
      { name: "Dropdown Menu", href: "/docs/components/dropdown-menu", done: false },
      { name: "Menubar", href: "/docs/components/menubar", done: false },
      { name: "Navigation Menu", href: "/docs/components/navigation-menu", done: false },
      { name: "Pagination", href: "/docs/components/pagination", done: false },
      { name: "Tabs", href: "/docs/components/tabs", done: false },
    ],
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "complete":
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Complete</Badge>
    case "in-progress":
      return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">In Progress</Badge>
    case "pending":
      return <Badge variant="outline">Pending</Badge>
    default:
      return null
  }
}

export default function ComponentsPage() {
  const totalComponents = categories.reduce((acc, cat) => acc + cat.components.length, 0)
  const completedComponents = categories.reduce(
    (acc, cat) => acc + cat.components.filter((c) => c.done).length,
    0
  )

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground">
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline" className="text-base">
            {completedComponents} / {totalComponents} Complete
          </Badge>
          <span className="text-muted-foreground">
            {Math.round((completedComponents / totalComponents) * 100)}% Documentation Coverage
          </span>
        </div>
      </div>

      <div className="grid gap-8">
        {categories.map((category) => {
          const completed = category.components.filter((c) => c.done).length
          const total = category.components.length

          return (
            <Card key={category.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {completed}/{total}
                    </span>
                    {getStatusBadge(category.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.components.map((component) => (
                    <Link
                      key={component.name}
                      href={component.href}
                      className="group flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      {component.done ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={component.done ? "" : "text-muted-foreground"}>
                        {component.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
