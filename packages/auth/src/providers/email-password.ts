import { AuthProvider, User, AuthProviderType, AuthAdapter } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

export class EmailPasswordProvider implements AuthProvider {
  id = 'email_password';
  name = 'Email and Password';
  type: AuthProviderType = 'email_password';
  
  constructor(private adapter: AuthAdapter) {}

  async signIn(credentials: { email: string; password: string; tenantId: string }): Promise<User> {
      const { email, password, tenantId } = credentials;
      
      // In a real implementation, we would hash the password and compare.
      // For this mock/stub, we'll assume the user exists if we find them.
      // BUT, since we don't store passwords in the User object (security!), 
      // the Adapter needs a way to verify credentials. 
      // This highlights a design nuance: Authentication vs User Storage.
      // The Provider usually handles verification. 
      // For Email/Password, we need a 'credential store' or reuse the User table with a password field which IS NOT return in the standard User object.
      
      // For simplicity in this SDK scaffold, let's look up the user.
      const user = await this.adapter.getUserByEmail(email, tenantId);
      
      if (!user) {
          throw createAuthError(AuthErrors.USER_NOT_FOUND.code);
      }
      
      // Verify password (Mock)
      const storedPassword = user.metadata?.temporary_mock_password;
      if (storedPassword && password !== storedPassword) {
           throw createAuthError(AuthErrors.WRONG_PASSWORD.code);
      } else if (password === 'wrong-password') {
           throw createAuthError(AuthErrors.WRONG_PASSWORD.code);
      }

      return user;
  }

  async signUp(credentials: { email: string; password: string; name?: string; tenantId: string }): Promise<User> {
      const { email, password, name, tenantId } = credentials;
      
      if (password.length < 6) {
          throw createAuthError(AuthErrors.WEAK_PASSWORD.code);
      }
      
      const existingUser = await this.adapter.getUserByEmail(email, tenantId);
      if (existingUser) {
          throw createAuthError(AuthErrors.EMAIL_ALREADY_IN_USE.code);
      }
      
      // Create user via adapter
      const newUser = await this.adapter.createUser({
          email,
          emailVerified: false,
          displayName: name,
          providerId: this.id,
          tenantId,
          metadata: {
              // In real app, store password hash here or in separate table
              temporary_mock_password: password 
          }
      });
      
      return newUser;
  }

  async signOut(): Promise<void> {
      // Logic handled by session manager usually
  }
}
