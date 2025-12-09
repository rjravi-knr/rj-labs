
import { AuthAdapter, User, Session } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';
import { getTenantDb, getCommonDb } from '@labs/database';
import { users } from '@labs/database/auth'; // Ensure this export exists
import { sessions } from '@labs/database/auth'; // Ensure this export exists
import { eq, and } from 'drizzle-orm';

/**
 * Parsing helper for smart tokens
 */
function parseToken(token: string): { tenantId: string, token: string } {
    const parts = token.split('.');
    if (parts.length < 2) {
        throw new Error('Invalid token format');
    }
    // Tenant ID is the first part
    return { tenantId: parts[0]!, token };
}

export class DrizzleAdapter implements AuthAdapter {
  name = 'drizzle';

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const db = getTenantDb(user.tenantId);
    
    // Check if email exists
    const existing = await db.select().from(users).where(and(eq(users.email, user.email), eq(users.tenantId, user.tenantId)));
    if (existing.length > 0) {
        throw createAuthError(AuthErrors.EMAIL_ALREADY_IN_USE.code);
    }

    const [newUser] = await db.insert(users).values({
        ...user,
        // Drizzle handles default values, but we might need to map types
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
    }).returning(); // Postgres supports returning

    // Convert keys/types if necessary (drizzle returns inferred types which should match User)
    // We cast or map
    return newUser as unknown as User; 
  }

  async getUser(id: string, tenantId: string): Promise<User | null> {
    const db = getTenantDb(tenantId);
    // id is number (bigint) in DB, but string in User interface
    const [user] = await db.select().from(users).where(and(eq(users.id, Number(id)), eq(users.tenantId, tenantId)));
    
    if (!user) return null;
    return { ...user, id: user.id.toString() } as unknown as User;
  }

  async getUserByEmail(email: string, tenantId: string): Promise<User | null> {
    const db = getTenantDb(tenantId);
    const [user] = await db.select().from(users).where(and(eq(users.email, email), eq(users.tenantId, tenantId)));
    
    if (!user) return null;
    return { ...user, id: user.id.toString() } as unknown as User;
  }

  async updateUser(id: string, tenantId: string, data: Partial<User>): Promise<User> {
     const db = getTenantDb(tenantId);
     // ... implementation
     const [updated] = await db.update(users)
        .set({ ...data, updatedAt: new Date() }) // Partial update
        .where(eq(users.id, Number(id)))
        .returning();
        
      if (!updated) throw createAuthError(AuthErrors.USER_NOT_FOUND.code);
      return { ...updated, id: updated.id.toString() } as unknown as User;
  }

  async deleteUser(id: string, tenantId: string): Promise<void> {
    const db = getTenantDb(tenantId);
    await db.delete(users).where(eq(users.id, Number(id)));
  }

  async createSession(session: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const db = getTenantDb(session.tenantId);
    
    const [newSession] = await db.insert(sessions).values({
        ...session,
        userId: Number(session.userId), // Convert string ID to Number
    }).returning();
    
    if (!newSession) throw new Error('Failed to create session');
    return { ...newSession, userId: newSession.userId.toString() } as unknown as Session;
  }

  async getSession(token: string): Promise<Session | null> {
      try {
        const { tenantId } = parseToken(token);
        const db = getTenantDb(tenantId);
        
        const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
        
        if (!session) return null;
        // manually inject tenantId as DB might not have it in sessions table? 
        // Wait, sessions table DOES have tenantId? No, sessions table in SQL usually has user_id.
        // But we need to return a Session object which HAS tenantId.
        // We know tenantId from the token parse.
        return { 
            ...session, 
            userId: session.userId.toString(),
            tenantId: tenantId 
        } as unknown as Session;
      } catch (e) {
          // Token parse failed or DB error
          return null;
      }
  }

  async deleteSession(token: string): Promise<void> {
       try {
        const { tenantId } = parseToken(token);
        const db = getTenantDb(tenantId);
        await db.delete(sessions).where(eq(sessions.token, token));
      } catch (e) {
          // ignore
      }
  }

  async deleteUserSessions(userId: string, tenantId: string): Promise<void> {
       const db = getTenantDb(tenantId);
       await db.delete(sessions).where(eq(sessions.userId, Number(userId)));
  }
}
