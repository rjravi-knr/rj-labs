"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Button } from "@labs/ui/button"
import { Input } from "@labs/ui/input"
import { Type } from "lucide-react"
import { 
  slugify, camelCase, pascalCase, snakeCase, kebabCase,
  capitalize, capitalizeWords, truncate, mask, excerpt,
  escapeHtml, stripHtml, removeDiacritics, pluralize
} from "@labs/utils/string"

const functions = [
  {
    name: "slugify",
    signature: "slugify(text: string): string",
    description: "Convert text to URL-friendly slug",
    example: "slugify('Hello World!')",
    defaultInput: "Hello World!",
    fn: slugify
  },
  {
    name: "camelCase",
    signature: "camelCase(text: string): string",
    description: "Convert text to camelCase",
    example: "camelCase('hello-world')",
    defaultInput: "hello-world",
    fn: camelCase
  },
  {
    name: "pascalCase",
    signature: "pascalCase(text: string): string",
    description: "Convert text to PascalCase",
    example: "pascalCase('hello world')",
    defaultInput: "hello world",
    fn: pascalCase
  },
  {
    name: "snakeCase",
    signature: "snakeCase(text: string): string",
    description: "Convert text to snake_case",
    example: "snakeCase('helloWorld')",
    defaultInput: "helloWorld",
    fn: snakeCase
  },
  {
    name: "kebabCase",
    signature: "kebabCase(text: string): string",
    description: "Convert text to kebab-case",
    example: "kebabCase('helloWorld')",
    defaultInput: "helloWorld",
    fn: kebabCase
  },
  {
    name: "capitalize",
    signature: "capitalize(text: string): string",
    description: "Capitalize first letter",
    example: "capitalize('hello')",
    defaultInput: "hello",
    fn: capitalize
  },
  {
    name: "capitalizeWords",
    signature: "capitalizeWords(text: string): string",
    description: "Capitalize each word (title case)",
    example: "capitalizeWords('hello world')",
    defaultInput: "hello world",
    fn: capitalizeWords
  },
  {
    name: "truncate",
    signature: "truncate(text: string, maxLength: number, suffix?: string): string",
    description: "Truncate text with ellipsis",
    example: "truncate('Long text here', 10)",
    defaultInput: "This is a very long text that needs truncation",
    fn: (text: string) => truncate(text, 20)
  },
  {
    name: "mask",
    signature: "mask(text: string, maskChar?: string, visibleCount?: number): string",
    description: "Mask sensitive data (e.g., credit cards)",
    example: "mask('4532015112830366')",
    defaultInput: "4532015112830366",
    fn: mask
  },
  {
    name: "excerpt",
    signature: "excerpt(text: string, maxWords: number): string",
    description: "Create excerpt by word count",
    example: "excerpt('Many words here...', 3)",
    defaultInput: "This is a long paragraph with many words that we want to excerpt",
    fn: (text: string) => excerpt(text, 5)
  },
  {
    name: "escapeHtml",
    signature: "escapeHtml(text: string): string",
    description: "Escape HTML special characters",
    example: "escapeHtml('<div>Content</div>')",
    defaultInput: "<div>Hello & Welcome</div>",
    fn: escapeHtml
  },
  {
    name: "stripHtml",
    signature: "stripHtml(html: string): string",
    description: "Remove all HTML tags",
    example: "stripHtml('<p>Text</p>')",
    defaultInput: "<p>Hello <strong>World</strong></p>",
    fn: stripHtml
  },
  {
    name: "removeDiacritics",
    signature: "removeDiacritics(text: string): string",
    description: "Remove accents/diacritics",
    example: "removeDiacritics('café')",
    defaultInput: "café résumé",
    fn: removeDiacritics
  },
  {
    name: "pluralize",
    signature: "pluralize(word: string, count: number): string",
    description: "Simple pluralization",
    example: "pluralize('cat', 2)",
    defaultInput: "cat",
    fn: (word: string) => pluralize(word, 2)
  }
]

function FunctionDemo({ func }: { func: typeof functions[0] }) {
  const [input, setInput] = useState(func.defaultInput)
  const [output, setOutput] = useState("")

  const handleTest = () => {
    try {
      const result = func.fn(input)
      setOutput(String(result))
    } catch (error) {
      setOutput(`Error: ${error}`)
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
          <Badge variant="secondary">String</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{func.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Try it out:</label>
          <div className="mt-2 flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              className="font-mono text-sm"
            />
            <Button onClick={handleTest} size="sm">Run</Button>
          </div>
        </div>
        
        {output && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground mb-1">Output:</p>
            <code className="text-sm font-mono text-foreground break-all">{output}</code>
          </div>
        )}

        <div className="rounded-lg bg-slate-950 p-3 dark:bg-slate-900">
          <p className="text-xs text-slate-400 mb-1">Example:</p>
          <code className="text-sm font-mono text-green-400">{func.example}</code>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StringUtilsPage() {
  return (
    <div className="relative flex flex-col pb-10">
      {/* Header */}
      <div className="border-b pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Type className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">String Utilities</h1>
            <p className="text-muted-foreground">16 functions for text manipulation and transformation</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Zero Dependencies</Badge>
          <Badge variant="secondary">16 Functions</Badge>
          <Badge variant="outline">@labs/utils/string</Badge>
        </div>
      </div>

      {/* Installation */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { slugify, camelCase, truncate } from '@labs/utils/string'

// Or import from main package
import { slugify } from '@labs/utils'`}
        </pre>
      </div>

      {/* Functions Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Interactive Examples</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {functions.map((func, index) => (
            <FunctionDemo key={index} func={func} />
          ))}
        </div>
      </div>
    </div>
  )
}
