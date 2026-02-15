import { Sidebar } from "./sidebar"
import { SiteHeader } from "./site-header"
import { SidebarProvider } from "./sidebar-context"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar is now a direct child of the flex container, giving it full height */}
        <aside className="hidden flex-col border-r md:flex"> 
            <Sidebar className="h-full" />
        </aside>

        {/* Main content area takes remaining width */}
        <div className="flex flex-1 flex-col overflow-hidden">
            <SiteHeader />
            <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6 lg:p-8">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
