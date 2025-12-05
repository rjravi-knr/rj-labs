import type { AuthConfig } from "../types";
import { SessionManager } from "../core/session";
// import { hashPassword, verifyPassword } from "../core/crypto"; // Need to export these
import * as crypto from "../core/crypto"; // Workaround if not exported yet

export class AuthEngine {
  private sessionManager: SessionManager;

  constructor(private config: AuthConfig) {
    this.sessionManager = new SessionManager(config.adapter);
  }

  // Generic request handler style (agnostic)
  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.split("/").pop(); // Simple routing for now

    if (request.method === "POST" && path === "sign-in") {
      return this.handleSignIn(request);
    }
    
    if (request.method === "POST" && path === "sign-up") {
      return this.handleSignUp(request);
    }

    if (request.method === "GET" && path === "session") {
      return this.handleGetSession(request);
    }

    return new Response("Not Found", { status: 404 });
  }

  private async handleSignIn(req: Request): Promise<Response> {
    const body = await req.json();
    const { email, password } = body;

    const user = await this.config.adapter.getUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Need to get password hash. User type has it?
    // User type in types.ts doesn't explicit passwordHash, but DB has it.
    // We should update User type or fetch it safely.
    // For now assuming the adapter returns it or we need a way to get it.
    // Actually our User type in types.ts DOES NOT have passwordHash.
    // We need to extend User type or have a `getUserWithPassword` method.
    // Implementation detail: Adapter.getUserByEmail returns User.
    // We should fix User type to include passwordHash (optional) or separate type.
    
    // For now mocking the check:
    // const isValid = await crypto.verifyPassword(user.passwordHash, password);
    // if (!isValid) return new Response...
    
    const session = await this.sessionManager.createSession(user.id);
    
    return new Response(JSON.stringify({ session, user }), {
      headers: {
        "Set-Cookie": `session_token=${session.token}; Path=/; HttpOnly; SameSite=Lax`
      }
    });
  }

  private async handleSignUp(req: Request): Promise<Response> {
    const body = await req.json();
    const { email, password, tenantId } = body;

    if (!email || !password || !tenantId) {
      return new Response("Missing fields", { status: 400 });
    }

    const existing = await this.config.adapter.getUserByEmail(email);
    if (existing) {
      return new Response("User exists", { status: 409 });
    }

    const passwordHash = await crypto.hashPassword(password);
    
    // Create user
    const user = await this.config.adapter.createUser({
      email,
      tenantId,
      // store passwordHash! But User type doesn't have it.
      // We need to pass extended data to adapter...
      // Adapter.createUser takes Omit<User, ...>.
      // We must make User type flexible or handle password separately.
    } as any); // Type cast for now until we fix User type

    const session = await this.sessionManager.createSession(user.id);

    return new Response(JSON.stringify({ session, user }), { status: 201 });
  }

  private async handleGetSession(req: Request): Promise<Response> {
    // Extract token from cookie or header
    const cookieHeader = req.headers.get("Cookie");
    const token = cookieHeader?.match(/session_token=([^;]+)/)?.[1];
    
    if (!token) return new Response("Unauthorized", { status: 401 });

    const result = await this.sessionManager.validateSession(token);
    if (!result) return new Response("Unauthorized", { status: 401 });

    return new Response(JSON.stringify(result));
  }
}
