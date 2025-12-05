import { eq } from "drizzle-orm";
// We need to import the schema from @labs/database. 
// Assuming @labs/database exports these. verified via file inspection that index.ts exports ./schema which exports ./users and ./sessions
import { users, sessions, type User as DbUser, type Session as DbSession } from "@labs/database";
import type { Adapter } from "../adapter";
import type { User, Session, Account } from "../types";

// Type definition for the Drizzle Database instance
// We can't easily import the full type without generic issues, so we'll use 'any' or a simplified interface for the db prop
// But ideally we should import the type from drizzle-orm/postgres-js
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "@labs/database";

type DbClient = PostgresJsDatabase<typeof schema>;

export class DrizzleAdapter implements Adapter {
  constructor(private db: DbClient) {}

  async createSession(session: Session): Promise<Session> {
    await this.db.insert(sessions).values({
      id: session.id,
      userId: session.userId,
      token: session.token,
      expiresAt: session.expiresAt,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
    });
    return session;
  }

  async getSession(token: string): Promise<{ session: Session; user: User } | null> {
    const result = await this.db
      .select({
        session: sessions,
        user: users,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.token, token))
      .limit(1);

    const row = result[0];
    if (!row) return null;

    const { session, user } = row;

    return {
      session: {
        ...session,
        // Convert nulls to undefined to match Zod schema if needed, but schema allows nulls for optional fields
        // Our Session type has specific fields. Drizzle returns Date objects for timestamps which is good.
      },
      user: {
        ...user,
        // Map fields if necessary (snake_case from DB might be auto-mapped by Drizzle if configured, check schema)
        // Schema uses snake_case in DB but camelCase in standard Drizzle definition:
        // emailVerified: boolean('email_verified') -> accessing via .emailVerified works.
        // Need to ensure tenantId is present.
      },
    };
  }

  async deleteSession(token: string): Promise<void> {
    await this.db.delete(sessions).where(eq(sessions.token, token));
  }

  async updateSession(token: string, data: Partial<Session>): Promise<Session> {
    const [updated] = await this.db
      .update(sessions)
      .set(data)
      .where(eq(sessions.token, token))
      .returning();

    if (!updated) throw new Error("Session not found");
    return updated as Session;
  }

  async createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const { image, ...dbUser } = user;
    const [created] = await this.db
      .insert(users)
      .values({
        ...dbUser,
        // Ensure emailVerified is compatible (boolean)
        emailVerified: dbUser.emailVerified ?? false,
        // id is defaultRandom()
        // createdAt/updatedAt are defaultNow()
      })
      .returning();

    return created as User;
  }

  async getUser(id: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return (user as User) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return (user as User) || null;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [updated] = await this.db.update(users).set(data).where(eq(users.id, id)).returning();
    if (!updated) throw new Error("User not found");
    return updated as User;
  }

  // Account methods usually needed for OAuth, but we can implement basic skeletons if unused yet
  async createAccount(account: Account): Promise<Account> {
    // Requires 'accounts' table which we haven't verified yet.
    // Assuming it exists or we need to create it.
    // For now throwing not implemented to avoid compilation error if table missing
    throw new Error("Accounts table not yet implemented");
  }

  async getAccount(providerId: string, accountId: string): Promise<Account | null> {
    throw new Error("Accounts table not yet implemented");
  }
}
