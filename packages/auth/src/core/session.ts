import type { Adapter } from "../adapter";
import type { Session, User } from "../types";
import { generateSessionToken } from "./crypto";

const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export class SessionManager {
  constructor(private adapter: Adapter) {}

  /**
   * Creates a new session for a user
   */
  async createSession(userId: string): Promise<Session> {
    const token = generateSessionToken();
    const session: Session = {
      id: generateSessionToken(), // Using random ID for now, DB might auto-gen
      userId,
      token,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000),
    };

    return this.adapter.createSession(session);
  }

  /**
   * Validates a session token
   * - Checks if session exists
   * - Checks if expired
   * - Auto-extends expiry if sufficiently close to expiration (Sliding window)
   */
  async validateSession(token: string): Promise<{ session: Session; user: User } | null> {
    const result = await this.adapter.getSession(token);
    if (!result) return null;

    const { session, user } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.adapter.deleteSession(session.token);
      return null;
    }

    // Sliding window: Extend session if half of max age has passed
    const activePeriod = session.expiresAt.getTime() - Date.now();
    const halfMaxAge = (SESSION_MAX_AGE * 1000) / 2;
    
    if (activePeriod < halfMaxAge) {
      session.expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
      await this.adapter.updateSession(session.token, { expiresAt: session.expiresAt });
    }

    return { session, user };
  }

  async invalidateSession(token: string): Promise<void> {
    await this.adapter.deleteSession(token);
  }
}
