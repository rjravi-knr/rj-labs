
import { Button } from "@labs/ui/button";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function Home() {
  // Use config or env for tenant ID
  const defaultTenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || 'acme-corp';
  const loginUrl = `http://localhost:3000/sign-in?tenantId=${defaultTenantId}`; // Hardcoded 3000/auth for now

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <LayoutDashboard className="h-5 w-5" />
            </div>
            RJ Platform
         </div>
         <nav className="flex gap-4">
             <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
                Documentation
             </Link>
         </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
                 <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight lg:text-7xl">
                    Unified Control <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                        Center
                    </span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mx-auto">
                    Manage your localized tenants, configure authentication policies, and monitor system health from one central dashboard.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={loginUrl}>
                    <Button size="lg" className="gap-2 h-12 px-8 text-lg">
                        <ShieldCheck className="h-5 w-5" />
                        Sign In to Console
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href="/docs">
                     <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                        Read Docs
                    </Button>
                </Link>
            </div>

             <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Multi-Tenant</h3>
                    <p className="text-sm text-muted-foreground">Manage multiple tenants with isolated configurations and data.</p>
                </div>
                 <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Auth Config</h3>
                    <p className="text-sm text-muted-foreground">Dynamic authentication policies updated in real-time.</p>
                </div>
                 <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Monitoring</h3>
                    <p className="text-sm text-muted-foreground">System-wide health checks and performance metrics.</p>
                </div>
            </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 RJ Labs. All rights reserved.</p>
      </footer>
    </div>
  );
}
