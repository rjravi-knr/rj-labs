"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Hash } from "lucide-react"

export default function NumberUtilsPage() {
  return (
    <div className="relative flex flex-col pb-10">
      <div className="border-b pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Hash className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Number Utilities</h1>
            <p className="text-muted-foreground">14 functions for formatting, statistics, and math operations</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Zero Dependencies</Badge>
          <Badge variant="secondary">14 Functions</Badge>
          <Badge variant="outline">@labs/utils/number</Badge>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Number Utilities</CardTitle>
            <CardDescription>Interactive demos coming soon!</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { 
  formatCurrency, formatBytes, formatPercentage,
  average, sum, median, clamp, round
} from '@labs/utils/number'

// Formatting
formatCurrency(99.99, 'USD')  // => '$99.99'
formatBytes(1536)              // => '1.5 KB'
formatPercentage(0.856)        // => '85.60%'

// Statistics
average([1, 2, 3, 4, 5])      // => 3
sum([1, 2, 3, 4, 5])          // => 15
median([1, 2, 3, 4, 5])       // => 3

// Math operations
clamp(150, 0, 100)            // => 100
round(3.14159, 2)             // => 3.14`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
