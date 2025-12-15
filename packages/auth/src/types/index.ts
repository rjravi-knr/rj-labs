export interface User {
  id: string;
  tenantId: string;

  email: string;
  name?: string;
  isSuperAdmin?: boolean;
  emailVerified: Date | null;
  image?: string;
  authMethod?: string; // Track which provider was used for authentication
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
  authMethod?: string; // Track which provider was used for this session
  ipAddress?: string;
  userAgent?: string;
}

export interface OtpSession {
  identifier: string; // email or phone
  code: string;       
  type: 'login' | 'verification' | 'reset';
  channel: 'email' | 'sms' | 'whatsapp';
  expiresAt: Date;
  attempts: number;
}

export type AuthProviderType = 'email_password' | 'google' | 'github' | 'twitter' | 'microsoft' | 'phone' | 'passwordless';

export interface FactorDetails {
  enabled: boolean;
  length?: number;      // e.g. 4, 6, 8
  expiry?: number;      // in seconds
  maxAttempts?: number; // Retry limit
}

export interface LoginMethodConfig {
  password: boolean;
  otp: FactorDetails;
  pin: FactorDetails; // Fixed numeric PIN
} 

export interface LoginMethods {
  email: LoginMethodConfig;
  phone: LoginMethodConfig;
}


export interface AuthConfig {
  apiKey?: string;
  authDomain?: string;
  providers: AuthProviderType[];
  loginMethods?: LoginMethods; 
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

  // OTP Management
  createOtp(session: OtpSession): Promise<void>;
  getOtp(identifier: string, type: string): Promise<OtpSession | null>;
  incrementOtpAttempts(identifier: string, type: string): Promise<void>;
  deleteOtp(identifier: string, type: string): Promise<void>;

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
