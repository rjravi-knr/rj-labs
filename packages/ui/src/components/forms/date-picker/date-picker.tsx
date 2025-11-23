import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@labs/ui/lib/utils"
import { Button } from "../../atoms/button"
import { Calendar } from "../../data-display/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../molecules/popover"

const DatePicker = React.forwardRef<
  HTMLDivElement,
  {
    date?: Date
    setDate?: (date?: Date) => void
    className?: string
    placeholder?: string
  }
>(({ date, setDate, className, placeholder = "Pick a date" }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" ref={ref}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
})
DatePicker.displayName = "DatePicker"

export { DatePicker }
