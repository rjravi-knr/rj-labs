import { AuthProvider, User, AuthProviderType, AuthAdapter } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

export class EmailPasswordProvider implements AuthProvider {
  id = 'email_password';
  name = 'Email and Password';
  type: AuthProviderType = 'email_password';
  
  constructor(private adapter: AuthAdapter) {}

  async signIn(credentials: { identifier: string; password: string; tenantId: string }): Promise<User> {
      const { identifier, password, tenantId } = credentials;
      
      const user = await this.adapter.verifyPassword(identifier, tenantId, password);
      
      if (!user) {
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
          fullName: name,
          username: email.split('@')[0], // Basic default username
          firstName: null,
          lastName: null,
          displayName: name,
          phoneVerified: false,
          userVerified: false,

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
