"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@labs/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const utilsPages = [
  { title: "Utils Overview", href: "/docs/utils" },
  { title: "String", href: "/docs/utils/string" },
  { title: "Date/Time", href: "/docs/utils/date" },
  { title: "Validation", href: "/docs/utils/validation" },
  { title: "Number", href: "/docs/utils/number" },
  { title: "Array", href: "/docs/utils/array" },
  { title: "Object", href: "/docs/utils/object" },
  { title: "Async", href: "/docs/utils/async" },
  { title: "Function", href: "/docs/utils/function" },
  { title: "URL", href: "/docs/utils/url" },
  { title: "Crypto", href: "/docs/utils/crypto" },
  { title: "Types", href: "/docs/utils/types" },
]

export function DocsNavigation() {
  const pathname = usePathname()
  
  const currentIndex = utilsPages.findIndex(page => page.href === pathname)
  
  if (currentIndex === -1) return null
  
  const prevPage = currentIndex > 0 ? utilsPages[currentIndex - 1] : null
  const nextPage = currentIndex < utilsPages.length - 1 ? utilsPages[currentIndex + 1] : null

  return (
    <div className="flex justify-between border-t pt-6 mt-12">
      <div className="flex-1">
        {prevPage && (
          <Link href={prevPage.href}>
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="font-medium">{prevPage.title}</span>
              </div>
            </Button>
          </Link>
        )}
      </div>
      
      <div className="flex-1 flex justify-end">
        {nextPage && (
          <Link href={nextPage.href}>
            <Button variant="outline" className="gap-2">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="font-medium">{nextPage.title}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
