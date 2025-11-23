import * as React from "react"
import { cn } from "@labs/ui/lib/utils"

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex -space-x-px rounded-md shadow-sm",
      "[&>*:first-child]:rounded-r-none",
      "[&>*:last-child]:rounded-l-none",
      "[&>*:not(:first-child):not(:last-child)]:rounded-none",
      "[&>*:focus-visible]:z-10",
      className
    )}
    {...props}
  />
))
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
