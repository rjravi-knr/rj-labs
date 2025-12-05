"use client"

import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { 
  Code2, Zap, Package, Book, ArrowRight, 
  Github, CheckCircle, Sparkles
} from "lucide-react"

const toolkits = [
  {
    icon: Code2,
    title: "UI Components",
    count: "42 components",
    description: "Production-ready React components built with Radix UI and Tailwind CSS. Fully accessible and customizable.",
    href: "/docs/components",
    status: "Available",
    color: "from-blue-500 to-cyan-500",
    features: ["Radix UI primitives", "Dark mode", "Fully accessible", "TypeScript"]
  },
  {
    icon: Zap,
    title: "Utils Toolkit",
    count: "150+ functions",
    description: "Comprehensive TypeScript utilities for strings, dates, validation, arrays, and more. Zero dependencies.",
    href: "/docs/utils",
    status: "Available",
    color: "from-purple-500 to-pink-500",
    features: ["Zero dependencies", "Tree-shakeable", "Type-safe", "Production-ready"]
  },
  {
    icon: Package,
    title: "Database Package",
    count: "Multi-database",
    description: "Type-safe PostgreSQL with Drizzle ORM and built-in multi-tenancy. MongoDB and Redis coming in Phase 2 & 3.",
    href: "/docs/database",
    status: "Available",
    color: "from-green-500 to-emerald-500",
    features: ["Drizzle ORM", "Multi-tenancy", "Type-safe queries", "Phase 1 Complete"]
  },
  {
    icon: Package,
    title: "Auth System",
    count: "Coming Soon",
    description: "Complete authentication solution with social logins, JWT, and role-based access control.",
    href: "#",
    status: "Planned",
    color: "from-orange-500 to-red-500",
    features: ["NextAuth.js", "Social logins", "RBAC", "JWT tokens"]
  },
]

export default function IntroductionPage() {
  return (
    <div className="relative flex flex-col pb-10">
      {/* Hero Section */}
      <div className="border-b pb-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Introduction to RJ Suite</h1>
                <p className="text-muted-foreground mt-1">AI-powered learning platform with comprehensive development tools</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            RJ Suite is a comprehensive ecosystem of tools, components, and packages designed for modern web development.
            Built with TypeScript, React, and Next.js, it provides everything you need to build scalable applications.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/docs/components">
            <Button size="lg" className="gap-2">
              <Code2 className="h-4 w-4" />
              Explore Components
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/docs/utils">
            <Button size="lg" variant="outline" className="gap-2">
              <Zap className="h-4 w-4" />
              View Utilities
            </Button>
          </Link>
          <Link href="/docs/database">
            <Button size="lg" variant="outline" className="gap-2">
              <Package className="h4 w-4" />
              Database Package
            </Button>
          </Link>
          <a href="https://github.com/rjravi-knr/rj-labs" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-6">Why RJ Suite?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg">Production Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Battle-tested components and utilities ready for production use. Used in real-world applications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Type-Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with TypeScript from the ground up. Full type inference and IntelliSense support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Modular Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use individual packages independently or together. Tree-shakeable for optimal bundle size.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Available Toolkits */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-2">Available Toolkits</h2>
        <p className="text-muted-foreground mb-8">
          Comprehensive packages and tools for modern web development
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {toolkits.map((toolkit, index) => (
            <Card 
              key={index} 
              className={`group transition-all hover:shadow-lg ${toolkit.status === 'Available' ? 'hover:border-primary/50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${toolkit.color} text-white`}>
                    <toolkit.icon className="h-6 w-6" />
                  </div>
                  <Badge 
                    variant={toolkit.status === 'Available' ? 'default' : 'secondary'}
                    className={toolkit.status === 'Available' ? 'bg-green-600' : ''}
                  >
                    {toolkit.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{toolkit.title}</CardTitle>
                <CardDescription className="text-sm">{toolkit.count}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {toolkit.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {toolkit.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {toolkit.status === 'Available' && (
                  <Link href={toolkit.href}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore {toolkit.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div className="mt-16 border rounded-lg p-8 bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Install Components</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
              pnpm add @labs/ui
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Install Utilities</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
              pnpm add @labs/utils
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Start Building</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { Button } from '@labs/ui/button'
import { slugify, formatDate } from '@labs/utils'

export default function App() {
  return <Button>Get Started</Button>
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Community & Support</CardTitle>
            <CardDescription>Get help and connect with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Github className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">GitHub Repository</p>
                <a 
                  href="https://github.com/rjravi-knr/rj-labs" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  github.com/rjravi-knr/rj-labs
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Book className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Documentation</p>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides and API references for all packages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
