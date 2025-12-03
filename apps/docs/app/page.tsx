import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Badge } from "@labs/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { ArrowRight, Boxes, Palette, Database, Lock, Zap, Code2, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-800" />
        
        <div className="container relative mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="mr-2 h-3 w-3" />
              Building the future of SaaS development
            </Badge>
            
            <h1 className="font-heading bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 sm:text-6xl md:text-7xl lg:text-8xl">
              Build faster with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                RJ Suite
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              A complete ecosystem of tools, components, and services for building production-ready SaaS applications. 
              From UI components to authentication and database management.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/docs">
                <Button size="lg" className="h-12 gap-2 px-8 text-base">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs/components">
                <Button variant="outline" size="lg" className="h-12 gap-2 px-8 text-base">
                  <Palette className="h-4 w-4" />
                  Explore Components
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-foreground">42+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Type-safe</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">Open</div>
                <div className="text-sm text-muted-foreground">Source</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="border-t py-20 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A comprehensive suite of packages to accelerate your development workflow
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* UI Package - Active */}
            <Card className="relative overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Palette className="h-8 w-8 text-primary" />
                  <Badge variant="default" className="bg-primary">Active</Badge>
                </div>
                <CardTitle className="mt-4">UI Components</CardTitle>
                <CardDescription>
                  42+ beautifully designed components built with Radix UI and Tailwind CSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs/components">
                  <Button variant="outline" className="w-full group">
                    View Components
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Database Package - Coming Soon */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Database className="h-8 w-8 text-muted-foreground/60" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-4 text-muted-foreground">Database</CardTitle>
                <CardDescription>
                  Type-safe database client with migrations, schema management, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation
                </Button>
              </CardContent>
            </Card>

            {/* Auth Package - Coming Soon */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Lock className="h-8 w-8 text-muted-foreground/60" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-4 text-muted-foreground">Authentication</CardTitle>
                <CardDescription>
                  Complete authentication solution with OAuth, magic links, and session management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation
                </Button>
              </CardContent>
            </Card>

            {/* API Package - Coming Soon */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Code2 className="h-8 w-8 text-muted-foreground/60" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-4 text-muted-foreground">API Utilities</CardTitle>
                <CardDescription>
                  Rate limiting, caching, validation, and other API development utilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation
                </Button>
              </CardContent>
            </Card>

            {/* Performance Package - Coming Soon */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Zap className="h-8 w-8 text-muted-foreground/60" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-4 text-muted-foreground">Performance</CardTitle>
                <CardDescription>
                  Analytics, monitoring, and optimization tools for production applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation
                </Button>
              </CardContent>
            </Card>

            {/* Tools Package - Coming Soon */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Boxes className="h-8 w-8 text-muted-foreground/60" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-4 text-muted-foreground">Developer Tools</CardTitle>
                <CardDescription>
                  CLI tools, code generators, and utilities to boost developer productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-20 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for developers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every package is designed with developer experience in mind
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">TypeScript First</h3>
              <p className="text-muted-foreground">
                Full type safety across all packages with excellent IDE support
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Performance Optimized</h3>
              <p className="text-muted-foreground">
                Built with performance in mind, from tree-shaking to lazy loading
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Boxes className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Composable</h3>
              <p className="text-muted-foreground">
                Use only what you need, packages work independently or together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to build something amazing?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Get started with RJ Suite today and ship your SaaS faster than ever
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/docs">
                <Button size="lg" variant="secondary" className="h-12 gap-2 px-8 text-base">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/rjravi-knr/rj-labs" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base border-white/20 bg-white/10 text-white hover:bg-white/20">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
