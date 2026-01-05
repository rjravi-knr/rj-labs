import Image from "next/image"

export default function WorkflowPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Workflow Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Visual representation of system dependencies and service workflows.
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">System Dependency Graph</h2>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-white">
               <img 
                src="/diagrams/dependency.svg" 
                alt="System Dependency Graph"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">High-level dependency map of workspace packages and apps.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Auth Service Workflow</h2>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-white">
              <img 
                src="/diagrams/auth-service-seq.svg" 
                alt="Auth Service Sequence"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Sequence diagram for authentication service operations.</p>
          </div>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Auth App Workflow</h2>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-white">
                <img 
                  src="/diagrams/auth-app-seq.svg" 
                  alt="Auth App Sequence"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Flow of the Next.js Auth Application.</p>
            </div>
          </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Platform Workflow</h2>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
             <div className="aspect-video w-full overflow-hidden rounded-md bg-white">
              <img 
                src="/diagrams/platform-seq.svg" 
                alt="Platform Sequence"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Platform service and interaction sequences.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
