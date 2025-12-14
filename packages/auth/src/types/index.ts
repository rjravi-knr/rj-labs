export interface User {
  id: string;
  tenantId: string;

  email: string;
  name?: string;
  isSuperAdmin?: boolean;
  emailVerified: Date | null;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Session {
  id: string;
  tenantId: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
}

export type AuthProviderType = 'email_password' | 'google' | 'github' | 'twitter' | 'microsoft' | 'phone' | 'passwordless';

export interface AuthConfig {
  apiKey?: string;
  authDomain?: string;
  providers: AuthProviderType[];
  autoSignIn?: boolean;
  sessionDuration?: number; // in milliseconds
  persistence?: 'local' | 'session' | 'none';
  debug?: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

export interface AuthStartOptions {
  config: AuthConfig;
  adapter?: AuthAdapter;
}

// Interface for Database Adapters
export interface AuthAdapter {
  name: string;
  
  // User Management
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  getUser(id: string, tenantId: string): Promise<User | null>;
  getUserByEmail(email: string, tenantId: string): Promise<User | null>;
  updateUser(id: string, tenantId: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string, tenantId: string): Promise<void>;

  // Session Management
  createSession(session: Omit<Session, 'id' | 'createdAt'>): Promise<Session>;
  getSession(token: string): Promise<Session | null>;
  deleteSession(token: string): Promise<void>;
  deleteUserSessions(userId: string, tenantId: string): Promise<void>;
  
  // Verification
  createVerificationToken?(identifier: string, token: string, expires: Date): Promise<void>;
  useVerificationToken?(identifier: string, token: string): Promise<boolean>;

  // Password Management
  verifyPassword(email: string, tenantId: string, password: string): Promise<User | null>; // Returns User on success
}

export interface AuthProvider {
  id: string;
  name: string;
  type: AuthProviderType;
  signIn(credentials?: any): Promise<User>;
  signOut(): Promise<void>;
}
