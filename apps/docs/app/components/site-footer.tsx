import Link from "next/link"
import { Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">RJ Suite</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered learning platform with comprehensive tools and components.
            </p>
          </div>

          {/* Documentation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Documentation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/components" className="text-muted-foreground hover:text-foreground transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/docs/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                  Auth Engine
                </Link>
              </li>
              <li>
                <Link href="/docs/development" className="text-muted-foreground hover:text-foreground transition-colors">
                  Development Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/utils" className="text-muted-foreground hover:text-foreground transition-colors">
                  Utilities
                </Link>
              </li>
              <li>
                <Link href="/docs/resources/workflow" className="text-muted-foreground hover:text-foreground transition-colors">
                  Workflow Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Utils Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Popular Utils</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/utils/string" className="text-muted-foreground hover:text-foreground transition-colors">
                  String Utilities
                </Link>
              </li>
              <li>
                <Link href="/docs/utils/date" className="text-muted-foreground hover:text-foreground transition-colors">
                  Date/Time
                </Link>
              </li>
              <li>
                <Link href="/docs/utils/validation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Validation
                </Link>
              </li>
              <li>
                <Link href="/docs/utils/array" className="text-muted-foreground hover:text-foreground transition-colors">
                  Array Utilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/rjravi-knr/rj-labs" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            Built by{" "}
            <a 
              href="https://github.com/rjravi-knr" 
              target="_blank" 
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Ravikiran
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/rjravi-knr/rj-labs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
