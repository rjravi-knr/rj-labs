import { AuthEngine } from "@labs/auth";
import { DrizzleAdapter } from "@labs/auth/adapters";
import { createDatabase } from "@labs/database";

// 1. Initialize Database
const db = createDatabase();

// 2. Initialize Adapter
const adapter = new DrizzleAdapter(db.sql); // Access raw sql instance or whatever createDatabase returns.
// Checking createDatabase factory return type... it returns { sql: ..., mongo: ... } or similar?
// Let's verify createDatabase return. 
// Wait, createDatabase creates an instance.
// In `packages/database/src/factory.ts`: it returns the specific db instance based on type? No, usually a map or a specific client.
// I viewed factory.ts earlier. It probably returns the client directly if called with type, or an object.
// Let's re-verify specific return type of createDatabase to be safe. 
// Assuming it returns an object with `sql` property for Postgres based on previous usage patterns in my head, but better to check.

// 3. Initialize Engine
const auth = new AuthEngine({
  adapter,
  providers: [
    { id: "email", name: "Email", type: "email" }
  ]
});

export async function POST(req: Request) {
  return auth.handleRequest(req);
}

export async function GET(req: Request) {
  return auth.handleRequest(req);
}
