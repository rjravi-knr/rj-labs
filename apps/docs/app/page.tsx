"use client"

import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Badge } from "@labs/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { ArrowRight, Boxes, Palette, Database, Lock, Zap, Code2, Sparkles, Github, Star, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("npx create-rj-app@latest")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 animate-gradient" />
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 blur-3xl animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40">
        <div className="container relative mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            {/* Animated Badge */}
            <Badge className="animate-fade-in-up border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 opacity-0 [animation-delay:100ms]">
              <Sparkles className="mr-2 h-3 w-3 animate-pulse" />
              The Complete SaaS Development Ecosystem
            </Badge>
            
            {/* Main Heading with Gradient Animation */}
            <h1 className="animate-fade-in-up font-heading text-5xl font-bold opacity-0 [animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
                Build{" "}
              </span>
              <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Extraordinary
              </span>
              <br />
              <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
                Products
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="animate-fade-in-up max-w-2xl text-lg text-muted-foreground opacity-0 [animation-delay:300ms] md:text-xl">
              From stunning UI components to robust authentication and database solutions.
              Everything you need to ship your SaaS faster, better, and with confidence.
            </p>
            
            {/* Install Command */}
            <div className="animate-fade-in-up group relative w-full max-w-2xl opacity-0 [animation-delay:400ms]">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
              <div className="relative flex items-center gap-2 rounded-lg bg-background/95 p-4 backdrop-blur-sm">
                <code className="flex-1 text-left font-mono text-sm">
                  npx create-rj-app@latest
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyInstallCommand}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up flex flex-col gap-4 opacity-0 [animation-delay:500ms] sm:flex-row">
              <Link href="/docs">
                <Button size="lg" className="group h-12 gap-2 px-8 text-base shadow-lg transition-all hover:shadow-xl hover:shadow-primary/20">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/docs/components">
                <Button variant="outline" size="lg" className="h-12 gap-2 px-8 text-base backdrop-blur-sm">
                  <Palette className="h-4 w-4" />
                  42+ Components
                </Button>
              </Link>
              <Link href="https://github.com/rjravi-knr/rj-labs" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="h-12 gap-2 px-8 text-base backdrop-blur-sm">
                  <Github className="h-4 w-4" />
                  <Star className="h-3 w-3" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats with Counter Animation */}
            <div className="animate-fade-in-up mt-8 grid grid-cols-3 gap-8 text-center opacity-0 [animation-delay:600ms]">
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground transition-all group-hover:scale-110">
                  <CountUp end={42} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground transition-all group-hover:scale-110">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Type-safe</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] transition-all group-hover:scale-110">
                  Open
                </div>
                <div className="text-sm text-muted-foreground">Source</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Showcase with Stagger Animation */}
      <section className="relative border-t py-20 backdrop-blur-sm md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center mb-16 opacity-0 [animation-delay:100ms]">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Everything
              </span>
              {" "}you need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A comprehensive suite of packages to accelerate your development
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* UI Package - Active */}
            <div className="animate-fade-in-up opacity-0 [animation-delay:200ms]">
              <Card className="group relative overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:h-40 group-hover:w-40" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Palette className="h-8 w-8 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    <Badge variant="default" className="animate-pulse-slow bg-primary">Active</Badge>
                  </div>
                  <CardTitle className="mt-4">UI Components</CardTitle>
                  <CardDescription>
                    42+ beautifully designed, accessible components built with Radix UI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/components">
                    <Button variant="outline" className="w-full group/btn">
                      Explore Components
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Other Packages - Coming Soon with stagger */}
            {[
              { icon: Database, title: "Database", description: "Type-safe database client with migrations and schema management", delay: "300ms" },
              { icon: Lock, title: "Authentication", description: "Complete auth solution with OAuth, magic links, and sessions", delay: "400ms" },
              { icon: Code2, title: "API Utilities", description: "Rate limiting, caching, validation for robust APIs", delay: "500ms" },
              { icon: Zap, title: "Performance", description: "Analytics, monitoring, and optimization tools", delay: "600ms" },
              { icon: Boxes, title: "Developer Tools", description: "CLI tools and code generators for productivity", delay: "700ms" },
            ].map((pkg, i) => (
              <div key={i} className={`animate-fade-in-up opacity-0`} style={{ animationDelay: pkg.delay }}>
                <Card className="group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <pkg.icon className="h-8 w-8 text-muted-foreground/60 transition-all group-hover:text-primary group-hover:scale-110" />
                      <Badge variant="secondary" className="transition-all group-hover:bg-primary/10">
                        Coming Soon
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-muted-foreground group-hover:text-foreground transition-colors">
                      {pkg.title}
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" disabled>
                      Documentation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features with Icon Animations */}
      <section className="relative border-t bg-muted/30 py-20 backdrop-blur-sm md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center mb-16 opacity-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for developers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every detail crafted for the best developer experience
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              { icon: Code2, title: "TypeScript First", description: "Full type safety with excellent IDE support", delay: "100ms" },
              { icon: Zap, title: "Lightning Fast", description: "Optimized for performance from the ground up", delay: "200ms" },
              { icon: Boxes, title: "Composable", description: "Mix and match packages as you need", delay: "300ms" },
            ].map((feature, i) => (
              <div key={i} className={`animate-fade-in-up flex flex-col items-center text-center opacity-0`} style={{ animationDelay: feature.delay }}>
                <div className="group mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                  <feature.icon className="h-10 w-10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA */}
      <section className="relative border-t py-20 md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-4xl opacity-0">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl transition-all hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)]">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
              
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  Ready to ship faster?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Join developers building the next generation of SaaS products
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/docs">
                    <Button size="lg" variant="secondary" className="h-12 gap-2 px-8 text-base shadow-lg hover:scale-105 transition-transform">
                      Start Building
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://github.com/rjravi-knr/rj-labs" target="_blank" rel="noreferrer">
                    <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-transform">
                      <Github className="h-4 w-4" />
                      Star on GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return <>{count}{suffix}</>
}
