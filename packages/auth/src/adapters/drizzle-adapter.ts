import { AuthAdapter, User, Session, OtpSession, AuthConfig, LoginMethods, AuthProviderType } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

import { getTenantDb, eq, and, or } from '@labs/database';
import { users, sessions, otpSessions, authConfig } from '@labs/database/auth';

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
        // Map types explicitly if needed, but Omit<User...> should mostly match now
        emailVerified: user.emailVerified || false, // Boolean
        emailVerifiedTimestamp: user.emailVerifiedTimestamp,
        phoneVerified: user.phoneVerified || false,
        phoneVerifiedTimestamp: user.phoneVerifiedTimestamp,
        userVerified: user.userVerified || false,
        userVerifiedTimestamp: user.userVerifiedTimestamp,
        
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        displayName: user.displayName,
        memberCode: user.memberCode,
    } as any).returning(); // Postgres supports returning

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
        .set({ ...data, updatedAt: new Date() } as any) // Partial update, cast to avoid strict type mismatch on 'id' string vs number
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

  async verifyPassword(identifier: string, tenantId: string, plainPassword: string): Promise<User | null> {
    const db = getTenantDb(tenantId);
    // Check email OR username
    const [user] = await db.select().from(users).where(
        and(
            or(eq(users.email, identifier), eq(users.username, identifier)),
            eq(users.tenantId, tenantId)
        )
    );
    
    if (!user || !user.passwordHash) return null;

    // TODO: Implement real hashing (bcrypt/argon2)
    // For now, we compare plaintext if it matches, OR we check if it matches a 'mockhash_' pattern
    // If the DB stores "secret123", we expect "secret123"
    if (user.passwordHash === plainPassword) {
         return { ...user, id: user.id.toString() } as unknown as User;
    }
    
    return null;
  }

  async createOtp(session: OtpSession): Promise<void> {
      const db = getTenantDb(session.tenantId);
      // Clean up any existing OTPs for this identifier/type to prevent duplicates
      await this.deleteOtp(session.identifier, session.type, session.tenantId);
      
      await db.insert(otpSessions).values({
          tenantId: session.tenantId,
          identifier: session.identifier,
          code: session.code,
          type: session.type,
          channel: session.channel,
          expiresAt: session.expiresAt,
          attempts: session.attempts
      } as any);
  }

  async getOtp(identifier: string, type: string, tenantId: string): Promise<OtpSession | null> {
      const db = getTenantDb(tenantId);
      const [otp] = await db.select().from(otpSessions).where(
          and(
              eq(otpSessions.tenantId, tenantId),
              eq(otpSessions.identifier, identifier),
              eq(otpSessions.type, type)
          )
      );
      
      if (!otp) return null;
      
      // Map back to OtpSession (drizzle returns inferred types)
      return {
          tenantId: otp.tenantId,
          identifier: otp.identifier,
          code: otp.code,
          type: otp.type as any,
          channel: otp.channel as any,
          expiresAt: otp.expiresAt,
          attempts: otp.attempts
      };
  }

  async incrementOtpAttempts(identifier: string, type: string, tenantId: string): Promise<void> {
      const db = getTenantDb(tenantId);
      // We can't do a simple update with increment easily in generic way without raw sql, 
      // but fetch+update is safer for attempts logic anyway or sql ops.
      // Drizzle has sql template tag.
      
      // Let's use simple update for now, ideally SQL increment
      const otp = await this.getOtp(identifier, type, tenantId);
      if(otp) {
           await db.update(otpSessions)
            .set({ attempts: otp.attempts + 1 } as any)
            .where(
                and(
                    eq(otpSessions.tenantId, tenantId),
                    eq(otpSessions.identifier, identifier),
                    eq(otpSessions.type, type)
                )
            );
      }
  }

  async deleteOtp(identifier: string, type: string, tenantId: string): Promise<void> {
      const db = getTenantDb(tenantId);
      await db.delete(otpSessions).where(
          and(
              eq(otpSessions.tenantId, tenantId),
              eq(otpSessions.identifier, identifier),
              eq(otpSessions.type, type)
          )
      );
  }

  async getAuthConfig(tenantId: string): Promise<AuthConfig | null> {
      const db = getTenantDb(tenantId);
      const [config] = await db.select().from(authConfig).limit(1);
      
      if (!config) return null;
      
      return {
          ...config,
          loginMethods: config.loginMethods as unknown as LoginMethods,
          providers: config.enabledProviders as unknown as AuthProviderType[], 
      } as unknown as AuthConfig;
  }

  async updateAuthConfig(tenantId: string, data: Partial<AuthConfig>): Promise<AuthConfig> {
        const db = getTenantDb(tenantId);
        
        // Check if config exists
        const existing = await this.getAuthConfig(tenantId);
        
        if (existing) {
             const [row] = await db.select({ id: authConfig.id }).from(authConfig).limit(1);
                 
             if (row) {
                 await db.update(authConfig).set({
                    ...data,
                     loginMethods: data.loginMethods as any,
                    updatedAt: new Date()
                 } as any).where(eq(authConfig.id, row.id));
             }
        } else {
            // Insert
            await db.insert(authConfig).values({
                ...data,
                loginMethods: data.loginMethods as any, 
                enabledProviders: data.providers as any // Map prop names
            } as any);
        }
        
        const updated = await this.getAuthConfig(tenantId);
        if (!updated) throw new Error("Failed to update config");
        return updated;
  }
}
