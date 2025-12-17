
import { AuthProvider, User, AuthProviderType, AuthAdapter } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

export interface GoogleProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class GoogleProvider implements AuthProvider {
  id = 'google';
  name = 'Google';
  type: AuthProviderType = 'google';
  
  constructor(
    private adapter: AuthAdapter, 
    private config: GoogleProviderConfig
  ) {}

  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    if (state) {
      params.append('state', state);
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async verifyCode(code: string): Promise<{
    tokens: any;
    userProfile: any;
  }> {
    // 1. Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error('Google Token Error:', error);
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Failed to exchange Google code');
    }

    const tokens = await tokenResponse.json();

    // 2. Get User Info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Failed to fetch Google user info');
    }

    const userProfile = await userResponse.json();
    return { tokens, userProfile };
  }

  async signIn(credentials: { code: string; tenantId: string }): Promise<User> {
      const { code, tenantId } = credentials;
      
      const { userProfile } = await this.verifyCode(code);
      
      const email = userProfile.email;
      if (!email) {
          throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Google account has no email');
      }

      // Check if user exists
      let user = await this.adapter.getUserByEmail(email, tenantId);
      
      if (!user) {
          // Create new user
          user = await this.adapter.createUser({
              email,
              username: email.split('@')[0],
              fullName: userProfile.name,
              firstName: userProfile.given_name,
              lastName: userProfile.family_name,
              displayName: userProfile.name,
              emailVerified: !!userProfile.email_verified,
              emailVerifiedTimestamp: userProfile.email_verified ? new Date() : null,
              phoneVerified: false,
              userVerified: false,
              image: userProfile.picture,
              tenantId,
              metadata: {
                  googleId: userProfile.sub,
                  provider: 'google'
              }
          });
      } else {
          // Update existing user with Google info if needed (e.g. merge)
          if (!user.image && userProfile.picture) {
             // Optional: Update image
             // await this.adapter.updateUser(user.id, tenantId, { image: userProfile.picture });
          }
      }

      return user;
  }

  async signOut(): Promise<void> {
      // No-op for now
  }
}
