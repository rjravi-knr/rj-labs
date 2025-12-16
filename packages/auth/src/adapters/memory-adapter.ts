import { AuthAdapter, User, Session } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

export class MemoryAdapter implements AuthAdapter {
  name = 'memory';
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = Math.floor(Math.random() * 1000000).toString();
    const now = new Date();
    const newUser: User = {
      ...user,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    // Check for duplicate email within the same tenant
    for (const u of this.users.values()) {
        if (u.email === user.email && u.tenantId === user.tenantId) {
             throw createAuthError(AuthErrors.EMAIL_ALREADY_IN_USE.code);
        }
    }

    this.users.set(id, newUser);
    return newUser;
  }

  async getUser(id: string, tenantId: string): Promise<User | null> {
    const user = this.users.get(id);
    if (user && user.tenantId === tenantId) return user;
    return null;
  }

  async getUserByEmail(email: string, tenantId: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email && user.tenantId === tenantId) return user;
    }
    return null;
  }

  async updateUser(id: string, tenantId: string, data: Partial<User>): Promise<User> {
    const user = await this.getUser(id, tenantId);
    if (!user) throw createAuthError(AuthErrors.USER_NOT_FOUND.code);

    const updatedUser = { ...user, ...data, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string, tenantId: string): Promise<void> {
    const user = await this.getUser(id, tenantId);
    if (user) {
        this.users.delete(id);
        this.deleteUserSessions(id, tenantId);
    }
  }

  async createSession(session: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const id = Math.random().toString(36).substring(7);
    const newSession: Session = {
      ...session,
      id,
      createdAt: new Date(),
    };
    this.sessions.set(newSession.token, newSession);
    return newSession;
  }

  async getSession(token: string): Promise<Session | null> {
      const session = this.sessions.get(token);
      if (!session) return null;
      if (session.expiresAt < new Date()) {
          this.sessions.delete(token);
          return null;
      }
      return session;
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async deleteUserSessions(userId: string, tenantId: string): Promise<void> {
    for (const [token, session] of this.sessions.entries()) {
      if (session.userId === userId && session.tenantId === tenantId) {
        this.sessions.delete(token);
      }
    }
  }

  async verifyPassword(email: string, tenantId: string, password: string): Promise<User | null> {
      // Mock implementation
      const user = await this.getUserByEmail(email, tenantId);
      if (user) return user;
      return null;
  }

  // OTP Management (In-Memory)
  private otps = new Map<string, any>(); 

  async getOtp(identifier: string, type: string, tenantId: string): Promise<any | null> {
    const key = `${tenantId}:${identifier}:${type}`;
    return this.otps.get(key) || null;
  }

  async incrementOtpAttempts(identifier: string, type: string, tenantId: string): Promise<void> {
    const key = `${tenantId}:${identifier}:${type}`;
    const otp = this.otps.get(key);
    if (otp) {
        otp.attempts += 1;
        this.otps.set(key, otp);
    }
  }

  async deleteOtp(identifier: string, type: string, tenantId: string): Promise<void> {
    const key = `${tenantId}:${identifier}:${type}`;
    this.otps.delete(key);
  }

  async createOtp(session: any): Promise<void> {
    const key = `${session.tenantId}:${session.identifier}:${session.type}`;
    this.otps.set(key, session);
  }

  async getAuthConfig(tenantId: string): Promise<any | null> {
      return null;
  }
  async updateAuthConfig(tenantId: string, config: any): Promise<any> {
      return config;
  }
}
