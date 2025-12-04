"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Button } from "@labs/ui/button"
import { List } from "lucide-react"
import { 
  unique, uniqueBy, chunk, shuffle, sample,
  groupBy, sortBy, flatten, difference, intersection,
  compact
} from "@labs/utils/array"

export default function ArrayUtilsPage() {
  return (
    <div className="relative flex flex-col pb-10">
      {/* Header */}
      <div className="border-b pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <List className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Array Utilities</h1>
            <p className="text-muted-foreground">14 functions for array manipulation, grouping, and transformations</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Zero Dependencies</Badge>
          <Badge variant="secondary">14 Functions</Badge>
          <Badge variant="outline">@labs/utils/array</Badge>
        </div>
      </div>

      {/* Installation */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { unique, groupBy, shuffle, chunk } from '@labs/utils/array'

// Or import from main package
import { unique } from '@labs/utils'`}
        </pre>
      </div>

      {/* Interactive Demos */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Interactive Examples</h2>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <UniqueDemo />
          <ChunkDemo />
          <ShuffleDemo />
          <GroupByDemo />
          <SortByDemo />
          <SetOperationsDemo />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Common Use Cases</h2>
        <Card>
          <CardHeader>
            <CardTitle>Data Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { unique, groupBy, sortBy } from '@labs/utils/array'

const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'admin' }
]

// Remove duplicates
const uniqueIds = unique([1, 2, 2, 3, 1])
// => [1, 2, 3]

// Group by property
const byRole = groupBy(users, 'role')
// => { admin: [Alice, Charlie], user: [Bob] }

// Sort by property
const sorted = sortBy(users, 'name', 'asc')
// => [Alice, Bob, Charlie]`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UniqueDemo() {
  const [result, setResult] = useState("")
  
  const handleRun = () => {
    const array = [1, 2, 2, 3, 4, 4, 5]
    const uniqueArray = unique(array)
    setResult(JSON.stringify(uniqueArray))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">unique()</CardTitle>
        <CardDescription>Remove duplicate values from array</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground mb-1">Input:</p>
          <code className="text-sm">[1, 2, 2, 3, 4, 4, 5]</code>
        </div>
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Output:</p>
            <code className="text-sm text-foreground">{result}</code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ChunkDemo() {
  const [result, setResult] = useState("")
  
  const handleRun = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    const chunked = chunk(array, 3)
    setResult(JSON.stringify(chunked))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">chunk()</CardTitle>
        <CardDescription>Split array into chunks of specified size</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground mb-1">Input:</p>
          <code className="text-sm">[1, 2, 3, 4, 5, 6, 7, 8], size: 3</code>
        </div>
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Output:</p>
            <code className="text-sm text-foreground break-all">{result}</code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ShuffleDemo() {
  const [result, setResult] = useState("")
  
  const handleRun = () => {
    const array = [1, 2, 3, 4, 5]
    const shuffled = shuffle(array)
    setResult(JSON.stringify(shuffled))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">shuffle()</CardTitle>
        <CardDescription>Randomly shuffle array elements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground mb-1">Input:</p>
          <code className="text-sm">[1, 2, 3, 4, 5]</code>
        </div>
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Output (random):</p>
            <code className="text-sm text-foreground">{result}</code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GroupByDemo() {
  const [result, setResult] = useState("")
  
  const handleRun = () => {
    const users = [
      { name: 'Alice', role: 'admin' },
      { name: 'Bob', role: 'user' },
      { name: 'Charlie', role: 'admin' }
    ]
    const grouped = groupBy(users, 'role')
    setResult(JSON.stringify(grouped, null, 2))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">groupBy()</CardTitle>
        <CardDescription>Group array of objects by property</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Output:</p>
            <pre className="text-xs text-foreground overflow-x-auto">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SortByDemo() {
  const [result, setResult] = useState("")
  
  const handleRun = () => {
    const users = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 }
    ]
    const sorted = sortBy(users, 'name', 'asc')
    setResult(JSON.stringify(sorted, null, 2))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">sortBy()</CardTitle>
        <CardDescription>Sort array of objects by property</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Output (sorted by name):</p>
            <pre className="text-xs text-foreground overflow-x-auto">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SetOperationsDemo() {
  const [result, setResult] = useState<{ diff: number[], inter: number[] } | null>(null)
  
  const handleRun = () => {
    const arr1 = [1, 2, 3, 4]
    const arr2 = [3, 4, 5, 6]
    setResult({
      diff: difference(arr1, arr2),
      inter: intersection(arr1, arr2)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">Set Operations</CardTitle>
        <CardDescription>difference() and intersection()</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-muted p-3 space-y-1">
          <p className="text-xs text-muted-foreground">arr1: [1, 2, 3, 4]</p>
          <p className="text-xs text-muted-foreground">arr2: [3, 4, 5, 6]</p>
        </div>
        <Button onClick={handleRun} size="sm" className="w-full">Run Demo</Button>
        {result && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Difference:</p>
              <code className="text-sm">{JSON.stringify(result.diff)}</code>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Intersection:</p>
              <code className="text-sm">{JSON.stringify(result.inter)}</code>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
