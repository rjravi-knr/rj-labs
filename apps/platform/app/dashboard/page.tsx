
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium">Total Tenants</h3>
            <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium">Active Agents</h3>
            <div className="text-2xl font-bold">5</div>
        </div>
         <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium">System Health</h3>
            <div className="text-2xl font-bold text-green-500">98%</div>
        </div>
      </div>
      
      <div className="min-h-[400px] flex-1 rounded-xl border border-dashed p-8 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
            <h3 className="text-lg font-semibold">Welcome to the Platform Console</h3>
            <p>Select a module from the sidebar to get started.</p>
        </div>
      </div>
    </div>
  );
}
