"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Button } from "@labs/ui/button"
import { Calendar } from "lucide-react"
import { 
  formatDate, formatRelative, formatDuration,
  addDays, addHours, diffInDays, diffInHours,
  isToday, isTomorrow, isYesterday, isSameDay,
  startOfDay, endOfDay
} from "@labs/utils/date"

const functions = [
  {
    name: "formatDate",
    signature: "formatDate(date: Date, format: string): string",
    description: "Format date with custom format string (YYYY-MM-DD, etc.)",
    demo: () => formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")
  },
  {
    name: "formatRelative",
    signature: "formatRelative(date: Date): string",
    description: "Format date as relative time (e.g., '2 hours ago')",
    demo: () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      return formatRelative(twoHoursAgo)
    }
  },
  {
    name: "formatDuration",
    signature: "formatDuration(milliseconds: number): string",
    description: "Format duration to human-readable string",
    demo: () => formatDuration(7325000) // 2h 2m 5s
  },
  {
    name: "addDays",
    signature: "addDays(date: Date, days: number): Date",
    description: "Add or subtract days from a date",
    demo: () => addDays(new Date(), 7).toDateString()
  },
  {
    name: "addHours",
    signature: "addHours(date: Date, hours: number): Date",
    description: "Add or subtract hours from a date",
    demo: () => addHours(new Date(), 3).toLocaleTimeString()
  },
  {
    name: "diffInDays",
    signature: "diffInDays(date1: Date, date2: Date): number",
    description: "Get difference in days between two dates",
    demo: () => {
      const date1 = new Date('2024-12-10')
      const date2 = new Date('2024-12-04')
      return `${diffInDays(date1, date2)} days`
    }
  },
  {
    name: "diffInHours",
    signature: "diffInHours(date1: Date, date2: Date): number",
    description: "Get difference in hours between two dates",
    demo: () => {
      const now = new Date()
      const future = new Date(now.getTime() + 5 * 60 * 60 * 1000)
      return `${diffInHours(future, now)} hours`
    }
  },
  {
    name: "isToday",
    signature: "isToday(date: Date): boolean",
    description: "Check if date is today",
    demo: () => String(isToday(new Date()))
  },
  {
    name: "isTomorrow",
    signature: "isTomorrow(date: Date): boolean",
    description: "Check if date is tomorrow",
    demo: () => String(isTomorrow(addDays(new Date(), 1)))
  },
  {
    name: "isYesterday",
    signature: "isYesterday(date: Date): boolean",
    description: "Check if date is yesterday",
    demo: () => String(isYesterday(addDays(new Date(), -1)))
  },
  {
    name: "startOfDay",
    signature: "startOfDay(date: Date): Date",
    description: "Get start of day (00:00:00)",
    demo: () => startOfDay(new Date()).toLocaleString()
  },
  {
    name: "endOfDay",
    signature: "endOfDay(date: Date): Date",
    description: "Get end of day (23:59:59)",
    demo: () => endOfDay(new Date()).toLocaleString()
  }
]

function FunctionCard({ func }: { func: typeof functions[0] }) {
  const [result, setResult] = useState<string>("")

  const handleRun = () => {
    try {
      const output = func.demo()
      setResult(String(output))
    } catch (error) {
      setResult(`Error: ${error}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-mono">{func.name}()</CardTitle>
            <CardDescription className="mt-1 font-mono text-xs">{func.signature}</CardDescription>
          </div>
          <Badge variant="secondary">Date</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{func.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleRun} size="sm" className="w-full">
          Run Demo
        </Button>
        
        {result && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground mb-1">Result:</p>
            <code className="text-sm font-mono text-foreground">{result}</code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DateUtilsPage() {
  return (
    <div className="relative flex flex-col pb-10">
      {/* Header */}
      <div className="border-b pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Date/Time Utilities</h1>
            <p className="text-muted-foreground">20 functions for date formatting, arithmetic, and comparisons</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Zero Dependencies</Badge>
          <Badge variant="secondary">20 Functions</Badge>
          <Badge variant="outline">@labs/utils/date</Badge>
        </div>
      </div>

      {/* Installation */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { formatRelative, addDays, isToday } from '@labs/utils/date'

// Or import from main package
import { formatRelative } from '@labs/utils'`}
        </pre>
      </div>

      {/* Functions Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Interactive Examples</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {functions.map((func, index) => (
            <FunctionCard key={index} func={func} />
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Common Use Cases</h2>
        <Card>
          <CardHeader>
            <CardTitle>Format Timestamps</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { formatDate, formatRelative } from '@labs/utils/date'

// Custom format
const formatted = formatDate(new Date(), 'YYYY-MM-DD')
// => '2024-12-04'

// Relative time
const relative = formatRelative(new Date())
// => 'just now'`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
