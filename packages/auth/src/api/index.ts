import { storage } from '@labs/utils';
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
  otpManager = new OtpManager(authAdapter, finalConfig.loginMethods);
  
  // Check for stored session (mock implementation for 'local' persistence)
  if (finalConfig.persistence === 'local') {
      const token = storage.get('auth_token');
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
        storage.remove('auth_token');
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
    if (getAuthConfig().persistence === 'local') {
        storage.set('auth_token', session.token);
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
          if (getAuthConfig().persistence === 'local') {
             storage.set('auth_token', session.token);
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
    
    storage.remove('auth_token');
    
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



export async function createSession(user: User, authMethod?: string, ipAddress?: string, userAgent?: string): Promise<Session> {
    if (!sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    return sessionManager.createSession(user, authMethod, ipAddress, userAgent);
}

export async function validateSession(token: string): Promise<Session | null> {
    if (!sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    return sessionManager.validateSession(token);
}

export async function getUser(userId: string, tenantId: string): Promise<User | null> {
     if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
     return authAdapter.getUser(userId, tenantId);
}


// OTP Manager Instance
import { OtpManager } from '../core/otp';
let otpManager: OtpManager | null = null;

function notifyListeners() {
    listeners.forEach(cb => cb(currentUser));
}

export async function requestOtp(identifier: string, channel: 'email' | 'sms' | 'whatsapp', type: 'login' | 'verification', tenantId?: string): Promise<string> {
   if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
   if (!otpManager) {
       // Lazy init if config passed in initAuth
       // But initAuth initialized logic is simpler if we do it there.
       // However, we need config.
       const config = getAuthConfig();
       otpManager = new OtpManager(authAdapter, config?.loginMethods);
   }
   
   const effectiveTenantId = tenantId || 'default';
   return otpManager.generate(effectiveTenantId, identifier, channel, type);
}

export async function verifyOtp(identifier: string, code: string, type: 'login' | 'verification', tenantId?: string): Promise<{ isValid: boolean; error?: string }> {
   if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
   if (!otpManager) {
       const config = getAuthConfig();
       otpManager = new OtpManager(authAdapter, config?.loginMethods);
   }
   
   const effectiveTenantId = tenantId || 'default';
   return otpManager.verify(effectiveTenantId, identifier, code, type);
}

export async function signInWithOtp(identifier: string, code: string, type: 'login' | 'verification', tenantId?: string): Promise<{ user: User, session: Session }> {
   if (!authAdapter || !sessionManager) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
   
   // 1. Verify
   const result = await verifyOtp(identifier, code, type, tenantId);
   if (!result.isValid) throw createAuthError(AuthErrors.INVALID_OTP.code, result.error || 'Invalid OTP');

   const effectiveTenantId = tenantId || 'default';

   // 2. Get User
   // We assume identifier is email for now. 
   // TODO: Support phone number lookup
   const user = await authAdapter.getUserByEmail(identifier, effectiveTenantId);
   
   if (!user) throw createAuthError(AuthErrors.USER_NOT_FOUND.code, 'User not found');

   // 3. Create Session
   const session = await sessionManager.createSession(user, 'otp');
   
   currentUser = user;
   currentSession = session;
   
    if (getAuthConfig().persistence === 'local') {
        storage.set('auth_token', session.token);
    }
   notifyListeners();

   return { user, session };
}

export async function getConfig(tenantId?: string): Promise<AuthConfig | null> {
    if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    const effectiveTenantId = tenantId || 'default';
    return authAdapter.getAuthConfig(effectiveTenantId);
}

export async function updateConfig(config: Partial<AuthConfig>, tenantId?: string): Promise<AuthConfig> {
    if (!authAdapter) throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Auth SDK not initialized');
    const effectiveTenantId = tenantId || 'default';
    return authAdapter.updateAuthConfig(effectiveTenantId, config);
}
