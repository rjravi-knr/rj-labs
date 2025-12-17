"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Shield, Key, Lock, User, Terminal } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Auth Engine
              </span>
            </h1>
            <p className="text-muted-foreground">Modular, type-safe authentication for the RJ Suite</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge className="bg-indigo-500/10 text-indigo-600">Core</Badge>
          <Badge className="bg-green-500/10 text-green-600">Stable</Badge>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Why we built a custom auth engine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The <code>@labs/auth</code> package is a custom-built, framework-agnostic authentication library designed to give us full control over our security stack. 
            It is not a wrapper around NextAuth or Better-Auth, but a standalone engine powered by:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Lock className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Database Sessions</p>
                <p className="text-xs text-muted-foreground">Secure, revocable sessions stored in Postgres</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Key className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Scrypt Hashing</p>
                <p className="text-xs text-muted-foreground">Industry-standard password security</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Terminal className="h-5 w-5 text-slate-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Type-Safe API</p>
                <p className="text-xs text-muted-foreground">Full TypeScript support with Zod schemas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <User className="h-5 w-5 text-pink-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">React Hooks</p>
                <p className="text-xs text-muted-foreground"><code>useSession</code> and <code>useUser</code> hooks</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Multi-Tenancy</CardTitle>
                <CardDescription>Built-in isolation</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Data is logically isolated by <code>tenantId</code>. The engine automatically handles tenant resolution via URL or headers.
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                 <CardTitle className="text-base">Dynamic Config</CardTitle>
                 <CardDescription>Runtime customization</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">
                    Tenants can configure their own branding (name, logo) and authentication providers (Google, Email) without redeployment.
                 </p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                 <CardTitle className="text-base">Self-Service</CardTitle>
                 <CardDescription>Ready-to-use flows</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">
                    Pre-built APIs for Sign Up, Sign In, Forgot Password, and Profile Management.
                 </p>
            </CardContent>
        </Card>
      </div>

      {/* Usage: API */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Integration</CardTitle>
          <CardDescription>Setting up the Auth Engine in a route handler</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Initialize the engine with your database adapter and providers.
          </p>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { AuthEngine } from "@labs/auth";
import { DrizzleAdapter } from "@labs/auth/adapters";
import { createDatabase } from "@labs/database";

// 1. Initialize Database
const db = createDatabase();

// 2. Initialize Adapter
const adapter = new DrizzleAdapter(db.sql);

// 3. Initialize Engine
const auth = new AuthEngine({
  adapter,
  providers: [
    { id: "email", name: "Email", type: "email" },
    { id: "google", name: "Google", type: "oauth" }
  ]
});

// 4. Handle Requests (e.g., in Next.js Route Handler)
export async function POST(req: Request) {
  return auth.handleRequest(req);
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Usage: Client */}
      <Card>
        <CardHeader>
          <CardTitle>Client Integration</CardTitle>
          <CardDescription>Using hooks in React components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Provider Setup</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// layout.tsx
import { AuthProvider } from "@labs/auth/client";

export default function RootLayout({ children }) {
  return (
    <AuthProvider baseUrl="http://auth-service.local">
      {children}
    </AuthProvider>
  );
}`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Using Hooks</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`"use client";
import { useSession, useUser } from "@labs/auth/client";

export function UserProfile() {
  const { session, isLoading } = useSession();
  const user = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Tenant: {user?.tenantId}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
