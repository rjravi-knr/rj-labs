
import { AuthProvider, User, AuthProviderType, AuthAdapter } from '../types';
import { createAuthError, AuthErrors } from '../core/errors';

export interface GitHubProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class GitHubProvider implements AuthProvider {
  id = 'github';
  name = 'GitHub';
  type: AuthProviderType = 'github';
  
  constructor(
    private adapter: AuthAdapter, 
    private config: GitHubProviderConfig
  ) {}

  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: 'read:user user:email',
    });
    
    if (state) {
      params.append('state', state);
    }

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  async verifyCode(code: string): Promise<{
    tokens: any;
    userProfile: any;
  }> {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error('GitHub Token Error:', error);
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Failed to exchange GitHub code');
    }

    const tokens = await tokenResponse.json();
    
    if (tokens.error) {
        console.error('GitHub OAuth Error:', tokens.error_description);
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, tokens.error_description || 'GitHub OAuth failed');
    }

    // 2. Get User Info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    });

    if (!userResponse.ok) {
        throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'Failed to fetch GitHub user info');
    }

    const userProfile = await userResponse.json();
    
    // 3. Get user emails (GitHub doesn't always include email in profile)
    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    });
    
    if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find((e: any) => e.primary);
        if (primaryEmail) {
            userProfile.email = primaryEmail.email;
            userProfile.email_verified = primaryEmail.verified;
        }
    }
    
    return { tokens, userProfile };
  }

  async signIn(credentials: { code: string; tenantId: string }): Promise<User> {
      const { code, tenantId } = credentials;
      
      const { userProfile } = await this.verifyCode(code);
      
      const email = userProfile.email;
      if (!email) {
          throw createAuthError(AuthErrors.INTERNAL_ERROR.code, 'GitHub account has no email');
      }

      // Check if user exists
      let user = await this.adapter.getUserByEmail(email, tenantId);
      
      if (!user) {
          // Create new user
          user = await this.adapter.createUser({
              email,
              username: userProfile.login, 
              fullName: userProfile.name || userProfile.login,
              displayName: userProfile.name || userProfile.login,
              firstName: null,
              lastName: null,
              emailVerified: !!userProfile.email_verified,
              emailVerifiedTimestamp: userProfile.email_verified ? new Date() : null,
              phoneVerified: false,
              userVerified: false,
              image: userProfile.avatar_url,
              tenantId,
              metadata: {
                  githubId: userProfile.id,
                  githubLogin: userProfile.login,
                  provider: 'github'
              }
          });
      } else {
          // Optional: Update existing user with GitHub info if needed
          if (!user.image && userProfile.avatar_url) {
             // await this.adapter.updateUser(user.id, tenantId, { image: userProfile.avatar_url });
          }
      }

      return user;
  }

  async signOut(): Promise<void> {
      // No-op for now
  }
}
