import { AuthConfig, User, Session, AuthAdapter, AuthProvider } from '../types';
import { initializeAuth as initConfig, getAuthConfig } from '../core/config';
import { SessionManager } from '../core/session';
import { MemoryAdapter } from '../adapters/memory-adapter';
import { EmailPasswordProvider } from '../providers/email-password';
import { createAuthError, AuthErrors } from '../core/errors';

// Global State
let authAdapter: AuthAdapter | null = null;
let sessionManager: SessionManager | null = null;
let currentUser: User | null = null;
let currentSession: Session | null = null;
const listeners: Array<(user: User | null) => void> = [];

export function initializeAuth(config: Partial<AuthConfig>, adapter?: AuthAdapter) {
  const finalConfig = initConfig(config);
  
  // Use provided adapter or default to Memory (or throw in strict mode)
  authAdapter = adapter || new MemoryAdapter();
  sessionManager = new SessionManager(authAdapter);
  
  // Check for stored session (mock implementation for 'local' persistence)
  if (typeof window !== 'undefined' && finalConfig.persistence === 'local') {
      const token = localStorage.getItem('auth_token');
      if (token) {
          validateAndRestoreSession(token);
      }
  }

  return {
    config: finalConfig,
    adapter: authAdapter
  };
}

async function validateAndRestoreSession(token: string) {
    if (!sessionManager || !authAdapter) return;
    const session = await sessionManager.validateSession(token);
    if (session) {
        currentSession = session;
        currentUser = await authAdapter.getUser(session.userId, session.tenantId);
        notifyListeners();
    } else {
        // Invalid session, clear local storage
        if (typeof window !== 'undefined') {
             localStorage.removeItem('auth_token');
        }
    }
}

export function getAuthAdapter(): AuthAdapter {
    if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    return authAdapter;
}

export async function signIn(providerId: string, credentials: any, tenantId?: string): Promise<{ user: User, session: Session }> {
    if (!authAdapter || !sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');

    // Default tenant if none provided (optional: or throw error if multi-tenancy is strict)
    const effectiveTenantId = tenantId || 'default';

    let provider: AuthProvider;
    
    // Resolve Provider
    if (providerId === 'email_password') {
        provider = new EmailPasswordProvider(authAdapter);
    } else {
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, `Provider ${providerId} not implemented`);
    }

    // Inject tenantId into credentials for the provider
    const enhancedCredentials = { ...credentials, tenantId: effectiveTenantId };

    const user = await provider.signIn(enhancedCredentials);
    const session = await sessionManager.createSession(user, providerId); // Pass providerId as authMethod

    currentUser = user;
    currentSession = session;
    
    // Persist token
    if (getAuthConfig().persistence === 'local' && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', session.token);
    }

    notifyListeners();
    return { user, session };
}

export async function signUp(providerId: string, credentials: any, tenantId?: string): Promise<{ user: User, session: Session }> {
     if (!authAdapter || !sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');

    // Default tenant if none provided
    const effectiveTenantId = tenantId || 'default';

    let provider: AuthProvider;
     if (providerId === 'email_password') {
        provider = new EmailPasswordProvider(authAdapter as any); // Cast for scaffold
     } else {
         throw createAuthError(AuthErrors.INTERNAL_ERROR.code, `Provider ${providerId} not implemented`);
     }
     
     // Hack: The generic AuthProvider interface doesn't have signUp, but specific ones do.
     // In a full implementation, we'd have a specific type for EmailPasswordProvider or a generic SignUp capability.
     if ('signUp' in provider) {
         const emailProvider = provider as EmailPasswordProvider;
         // Inject tenantId
         const enhancedCredentials = { ...credentials, tenantId: effectiveTenantId };
         
         const user = await emailProvider.signUp(enhancedCredentials);
         const session = await sessionManager.createSession(user, providerId); // Pass providerId as authMethod
         
         currentUser = user;
         currentSession = session;
          if (getAuthConfig().persistence === 'local' && typeof window !== 'undefined') {
            localStorage.setItem('auth_token', session.token);
          }
         notifyListeners();
         return { user, session };
     } else {
          throw createAuthError(AuthErrors.INTERNAL_ERROR.code, `Provider ${providerId} does not support sign up`);
     }
}

export async function signOut(): Promise<void> {
    if (!sessionManager || !currentSession) return;
    
    await sessionManager.destroySession(currentSession.token);
    currentUser = null;
    currentSession = null;
    
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
    
    notifyListeners();
}

export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
    listeners.push(callback);
    // Immediate callback with current state
    callback(currentUser);
    
    return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
}

export function getCurrentUser(): User | null {
    return currentUser;
}



export async function createSession(user: User, authMethod?: string): Promise<Session> {
    if (!sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    return sessionManager.createSession(user, authMethod);
}

export async function validateSession(token: string): Promise<Session | null> {
    if (!sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    return sessionManager.validateSession(token);
}

export async function getUser(userId: string, tenantId: string): Promise<User | null> {
     if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
     return authAdapter.getUser(userId, tenantId);
}

function notifyListeners() {
    listeners.forEach(cb => cb(currentUser));
}
