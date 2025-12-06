"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Terminal, Globe, Server, Book, Layout } from "lucide-react"

export default function DevelopmentPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">Development Guide</h1>
        <p className="text-muted-foreground">
          Reference guide for running applications and services in the RJ Suite monorepo.
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Run the entire authentication stack with one command</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 border border-slate-800">
            <code className="text-green-400">pnpm dev:auth</code>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            This starts both the <strong>Auth App</strong> (UI) and the <strong>Auth Service</strong> (API).
          </p>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-indigo-500" />
              <CardTitle>Applications</CardTitle>
            </div>
            <CardDescription>Frontend User Interfaces</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Layout className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Auth App</div>
                <div className="text-xs text-muted-foreground">Login, Signup, Dashboard</div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1 block w-fit ml-auto">3000</Badge>
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded">pnpm dev:auth</code>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Book className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium">Documentation</div>
                <div className="text-xs text-muted-foreground">This documentation site</div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1 block w-fit ml-auto">3001</Badge>
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded">pnpm dev:docs</code>
              </div>
            </div>

             <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                <Globe className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="font-medium">Web Builder</div>
                <div className="text-xs text-muted-foreground">Website Builder SaaS</div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1 block w-fit ml-auto">3003</Badge>
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded">pnpm dev:web</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-500" />
              <CardTitle>Services</CardTitle>
            </div>
            <CardDescription>Backend APIs & Microservices</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-medium">Auth Service</div>
                <div className="text-xs text-muted-foreground">API Engine</div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1 block w-fit ml-auto">3002</Badge>
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded">pnpm dev:auth</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cheatsheet */}
       <Card>
        <CardHeader>
          <CardTitle>Command Cheatsheet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Command</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Run ALL apps (Turbo)</td>
                  <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded">pnpm dev</code></td>
                </tr>
                 <tr className="border-b">
                  <td className="px-4 py-3">Run Auth Stack only</td>
                  <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded">pnpm dev:auth</code></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Type Check</td>
                  <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded">pnpm check-types</code></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">LintCode</td>
                  <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded">pnpm lint</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
