"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@labs/ui/tabs"
import { cn } from "@labs/ui/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  align?: "center" | "start" | "end"
}

export function ComponentPreview({
  children,
  code,
  align = "center",
  className,
  ...props
}: ComponentPreviewProps) {
  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md border bg-muted px-6 py-4">
              <pre className="overflow-x-auto p-4">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
