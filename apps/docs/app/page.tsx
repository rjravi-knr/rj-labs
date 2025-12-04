"use client"

import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Badge } from "@labs/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { ArrowRight, Brain, GraduationCap, Sparkles, Code2, Book, Users, Zap, Lightbulb, Target, Rocket, Github } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 animate-gradient" />
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Floating Learning Elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 blur-3xl animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40">
        <div className="container relative mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            {/* Badge */}
            <Badge className="animate-fade-in-up border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 opacity-0 [animation-delay:100ms]">
              <Brain className="mr-2 h-3 w-3 animate-pulse" />
              AI-Powered Learning Platform for Next Generation Education
            </Badge>
            
            {/* Main Heading */}
            <h1 className="animate-fade-in-up font-heading text-5xl font-bold opacity-0 [animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
                Transform{" "}
              </span>
              <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Learning
              </span>
              <br />
              <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
                Experiences
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="animate-fade-in-up max-w-3xl text-lg text-muted-foreground opacity-0 [animation-delay:300ms] md:text-xl">
              Build intelligent, adaptive learning solutions with RJ Suite - a comprehensive ecosystem of AI-powered tools, 
              products, and services designed for the modern education industry.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up flex flex-col gap-4 opacity-0 [animation-delay:400ms] sm:flex-row">
              <Link href="/docs">
                <Button size="lg" className="group h-12 gap-2 px-8 text-base shadow-lg transition-all hover:shadow-xl hover:shadow-primary/20">
                  <GraduationCap className="h-5 w-5" />
                  Explore Documentation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/docs/components">
                <Button variant="outline" size="lg" className="h-12 gap-2 px-8 text-base backdrop-blur-sm">
                  <Code2 className="h-4 w-4" />
                  Developer Resources
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="animate-fade-in-up mt-8 grid grid-cols-3 gap-8 text-center opacity-0 [animation-delay:500ms]">
              <div className="group cursor-default">
                <div className="text-3xl font-bold animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                  AI
                </div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground transition-all group-hover:scale-110">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Customizable</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground transition-all group-hover:scale-110">
                  Next Gen
                </div>
                <div className="text-sm text-muted-foreground">Education</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services */}
      <section className="relative border-t py-20 backdrop-blur-sm md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center mb-16 opacity-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Comprehensive
              </span>
              {" "}Learning Ecosystem
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Multiple products, services, and tools to power your educational platform
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* UI Components for Learning Apps */}
            <div className="animate-fade-in-up opacity-0 [animation-delay:100ms]">
              <Card className="group relative overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 h-full">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:h-40 group-hover:w-40" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Code2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    <Badge variant="default" className="animate-pulse-slow bg-primary">Available</Badge>
                  </div>
                  <CardTitle className="mt-4">UI Design System</CardTitle>
                  <CardDescription>
                    42+ accessible, beautiful components to build modern learning applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/components">
                    <Button variant="outline" className="w-full group/btn">
                      View Components
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Utils Toolkit */}
            <div className="animate-fade-in-up opacity-0 [animation-delay:150ms]">
              <Card className="group relative overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 h-full">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition-all group-hover:h-40 group-hover:w-40" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    <Badge variant="default" className="animate-pulse-slow bg-purple-600">Available</Badge>
                  </div>
                  <CardTitle className="mt-4">Utils Toolkit</CardTitle>
                  <CardDescription>
                    150+ TypeScript utilities for strings, dates, validation, arrays, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/utils">
                    <Button variant="outline" className="w-full group/btn">
                      View Utilities
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Learning Products */}
            {[
              {
                icon: Brain,
                title: "AI Learning Assistant",
                description: "Intelligent tutoring system that adapts to each student's learning pace and style",
                status: "In Development"
              },
              {
                icon: Book,
                title: "Content Management",
                description: "Create, organize, and deliver educational content with AI-powered recommendations",
                status: "In Development"
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Real-time collaboration tools for students, teachers, and institutions",
                status: "In Development"
              },
              {
                icon: Target,
                title: "Assessment Engine",
                description: "Adaptive testing and evaluation with instant feedback and analytics",
                status: "In Development"
              },
              {
                icon: Lightbulb,
                title: "Learning Analytics",
                description: "Deep insights into learning patterns, progress, and outcomes",
                status: "In Development"
              },
            ].map((product, i) => (
              <div key={i} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <Card className="group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/20 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <product.icon className="h-8 w-8 text-muted-foreground/60 transition-all group-hover:text-primary group-hover:scale-110" />
                      <Badge variant="secondary" className="transition-all group-hover:bg-primary/10">
                        {product.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-muted-foreground group-hover:text-foreground transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Developers */}
      <section className="relative border-t bg-muted/30 py-20 backdrop-blur-sm md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center mb-16 opacity-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for Developers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive documentation, APIs, and resources to integrate RJ Suite into your projects
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="animate-fade-in-up flex flex-col items-center text-center opacity-0 [animation-delay:100ms]">
              <div className="group mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <Book className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Documentation</h3>
              <p className="text-muted-foreground">Complete guides, API references, and tutorials</p>
            </div>

            <div className="animate-fade-in-up flex flex-col items-center text-center opacity-0 [animation-delay:200ms]">
              <div className="group mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <Zap className="h-10 w-10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quick Integration</h3>
              <p className="text-muted-foreground">Simple APIs and SDKs for rapid development</p>
            </div>

            <div className="animate-fade-in-up flex flex-col items-center text-center opacity-0 [animation-delay:300ms]">
              <div className="group mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <Rocket className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Always Evolving</h3>
              <p className="text-muted-foreground">Regular updates with new features and improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t py-20 md:py-24">
        <div className="container mx-auto">
          <div className="animate-fade-in-up mx-auto max-w-4xl opacity-0">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl transition-all hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)]">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
              
              <div className="relative">
                <div className="mb-4 flex justify-center">
                  <GraduationCap className="h-16 w-16 text-white animate-pulse-slow" />
                </div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  Ready to build the future of learning?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Start exploring RJ Suite and create next-generation educational experiences
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/docs">
                    <Button size="lg" variant="secondary" className="h-12 gap-2 px-8 text-base shadow-lg hover:scale-105 transition-transform">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://github.com/rjravi-knr/rj-labs" target="_blank" rel="noreferrer">
                    <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-transform">
                      <Github className="h-4 w-4" />
                      View on GitHub
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
