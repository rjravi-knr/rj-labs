import Link from "next/link"
import { Button } from "@labs/ui/button"
import { ArrowRight, Book, Layout, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-14rem)]">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://twitter.com/ravikiran"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground pb-2">
            RJ Suite Documentation
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Your comprehensive guide to the RJ Suite SaaS System. Built with Turborepo, Next.js, and Tailwind CSS.
          </p>
          <div className="space-x-4">
            <Link href="/docs">
              <Button size="lg" className="h-11 px-8">
                Get Started
              </Button>
            </Link>
            <Link href="https://github.com/ravikiran/rj-suite" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" className="h-11 px-8">
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Layout className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Monorepo Structure</h3>
                <p className="text-sm text-muted-foreground">
                  Organized with Turborepo for efficient build and development workflows.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Zap className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Fast Development</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Next.js and Tailwind CSS for rapid UI development.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Book className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides and API references for all packages.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            RJ Suite is built on a modern stack to ensure scalability and maintainability.
          </p>
        </div>
      </section>
    </div>
  )
}
