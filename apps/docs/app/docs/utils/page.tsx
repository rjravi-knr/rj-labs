"use client"

import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { 
  Type, Calendar, CheckCircle, Hash, List, Box, 
  Zap, FunctionSquare, Link as LinkIcon, Palette, Lock
} from "lucide-react"

const utilsCategories = [
  {
    icon: Type,
    title: "String Utilities",
    count: "16 functions",
    description: "Case conversion, slugify, HTML escaping, text manipulation",
    examples: ["slugify()", "camelCase()", "truncate()", "mask()"],
    href: "/docs/utils/string",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Date/Time Utilities",
    count: "20 functions",
    description: "Formatting, relative time, date arithmetic, comparisons",
    examples: ["formatRelative()", "addDays()", "diffInDays()", "isToday()"],
    href: "/docs/utils/date",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: CheckCircle,
    title: "Validation Utilities",
    count: "15 functions",
    description: "Email, URL, phone, password strength, credit cards",
    examples: ["isEmail()", "isStrongPassword()", "isCreditCard()", "isUUID()"],
    href: "/docs/utils/validation",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Hash,
    title: "Number Utilities",
    count: "14 functions",
    description: "Formatting, statistics, math operations",
    examples: ["formatCurrency()", "formatBytes()", "average()", "clamp()"],
    href: "/docs/utils/number",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: List,
    title: "Array Utilities",
    count: "14 functions",
    description: "Unique, grouping, shuffling, set operations",
    examples: ["unique()", "groupBy()", "shuffle()", "chunk()"],
    href: "/docs/utils/array",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Box,
    title: "Object Utilities",
    count: "13 functions",
    description: "Pick/omit, deep clone/merge, nested access",
    examples: ["pick()", "deepClone()", "getNestedValue()", "flattenObject()"],
    href: "/docs/utils/object",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Async Utilities",
    count: "8 functions",
    description: "Retry, debounce, throttle, async operations",
    examples: ["retry()", "debounce()", "throttle()", "sleep()"],
    href: "/docs/utils/async",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: FunctionSquare,
    title: "Function Utilities",
    count: "5 functions",
    description: "Memoize, compose, pipe, functional programming",
    examples: ["memoize()", "compose()", "pipe()", "once()"],
    href: "/docs/utils/function",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: LinkIcon,
    title: "URL Utilities",
    count: "9 functions",
    description: "Query strings, URL building, parameter manipulation",
    examples: ["buildUrl()", "parseQueryString()", "addQueryParam()", "getDomain()"],
    href: "/docs/utils/url",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Lock,
    title: "Crypto Utilities",
    count: "7 functions",
    description: "ID generation, UUID, tokens, Base64 encoding",
    examples: ["generateUUID()", "generateId()", "encodeBase64()", "generateToken()"],
    href: "/docs/utils/crypto",
    color: "from-gray-500 to-slate-500"
  },
  {
    icon: Palette,
    title: "TypeScript Types",
    count: "11 types",
    description: "Utility types for advanced type manipulation",
    examples: ["Prettify<T>", "DeepPartial<T>", "ValueOf<T>", "PromiseType<T>"],
    href: "/docs/utils/types",
    color: "from-violet-500 to-purple-500"
  }
]

export default function UtilsPage() {
  return (
    <div className="relative flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
              @labs/utils
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Utils Toolkit
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              150+ production-ready TypeScript utilities with zero dependencies. 
              Type-safe, tree-shakeable, and thoroughly documented.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Zero Dependencies</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">100% TypeScript</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Tree-Shakeable</span>
              </div>
            </div>

            {/* Quick Install */}
            <div className="mt-8">
              <div className="mx-auto max-w-lg rounded-lg border bg-muted/50 p-4">
                <p className="mb-2 text-sm text-muted-foreground">Install in your project:</p>
                <code className="rounded bg-black px-3 py-2 text-sm text-green-400 dark:bg-white dark:text-green-600">
                  pnpm add @labs/utils
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">11 Utility Categories</h2>
            <p className="mt-2 text-muted-foreground">
              Explore our comprehensive collection of utilities
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {utilsCategories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="group h-full transition-all hover:scale-[1.02] hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription>
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Popular Functions:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.examples.map((example, i) => (
                          <code 
                            key={i}
                            className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground"
                          >
                            {example}
                          </code>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Why Use @labs/utils?</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Zero Dependencies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Completely standalone with no external dependencies. Keeps your bundle size minimal and avoids version conflicts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Type-Safe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Written in TypeScript with strict mode. Full type inference, IntelliSense support, and compile-time safety.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-blue-500" />
                    Tree-Shakeable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ESM exports allow bundlers to include only the functions you use. Import by category for optimal bundle size.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FunctionSquare className="h-5 w-5 text-purple-500" />
                    Production Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Battle-tested utilities with comprehensive JSDoc documentation. Used across all RJ Suite packages.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Quick Example</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Import and Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Import specific utilities:</p>
                    <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { slugify, formatRelative, isEmail } from '@labs/utils'

// String utilities
const slug = slugify('Hello World!')  // => 'hello-world'

// Date utilities
const time = formatRelative(new Date())  // => 'just now'

// Validation
const valid = isEmail('test@example.com')  // => true`}
                    </pre>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Or import by category for better tree-shaking:</p>
                    <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { slugify, camelCase } from '@labs/utils/string'
import { formatRelative } from '@labs/utils/date'
import { isEmail } from '@labs/utils/validation'`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
