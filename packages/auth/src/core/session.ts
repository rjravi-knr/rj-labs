import { AuthAdapter, Session, User } from '../types';
import { getAuthConfig } from './config';
import { createAuthError, AuthErrors } from './errors';

export class SessionManager {
  constructor(private adapter: AuthAdapter) {}

  async createSession(user: User, authMethod?: string, ipAddress?: string, userAgent?: string): Promise<Session> {
    const config = getAuthConfig();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (config.sessionDuration || 3600000));
    
    // Smart Token: tenantId.randomString
    // This allows identifying the tenant DB just from the token
    const randomPart = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const token = `${user.tenantId}.${randomPart}`;

    const session = await this.adapter.createSession({
      userId: user.id,
      tenantId: user.tenantId,
      expiresAt,
      token,
      authMethod: authMethod || user.authMethod,
      ipAddress,
      userAgent,
    });

    return session;
  }

  async validateSession(token: string): Promise<Session | null> {
    const session = await this.adapter.getSession(token);
    
    if (!session) return null;

    if (new Date() > session.expiresAt) {
      await this.adapter.deleteSession(token);
      return null;
    }

    return session;
  }

  async destroySession(token: string): Promise<void> {
    await this.adapter.deleteSession(token);
  }
}
