export interface User {
  id: string;
  tenantId: string;
  username?: string | null; // Added
  email: string;
  name?: string;
  emailVerified: Date | null;
  image?: string;
  authMethod?: string;
  roles?: string[]; // Added
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
  passwordHash?: string;
  isSuperAdmin?: boolean;
}

export interface Session {
  id: string;
  userId: string;
  tenantId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
  authMethod?: string; // e.g., 'password', 'google', 'otp'
}

export interface OtpSession {
  tenantId: string;   // Scope by tenant
  identifier: string; // email or phone
  code: string;       
  type: 'login' | 'verification' | 'reset';
  channel: 'email' | 'sms' | 'whatsapp';
  expiresAt: Date;
  attempts: number;
}

export type AuthProviderType = 'email_password' | 'google' | 'github' | 'twitter' | 'microsoft' | 'phone' | 'passwordless';

export interface FactorPolicy {
  length: number;      // e.g. 4, 6, 8
  expiry: number;      // in seconds
  maxAttempts: number; // Retry limit
}

export interface LoginMethodEnablement {
  password?: boolean;
  otp?: boolean;
  pin?: boolean;
  magicLink?: boolean;
  webauthn?: boolean;
} 

export interface LoginMethods {
  email: LoginMethodEnablement;
  phone: LoginMethodEnablement;
}


export interface AuthConfig {
  id?: string;
  apiKey?: string;
  authDomain?: string;
  providers: AuthProviderType[];
  
  // Policies
  loginMethods?: LoginMethods; 
  otpPolicy?: FactorPolicy;
  pinPolicy?: FactorPolicy;
  passwordPolicy?: any; 
  
  autoSignIn?: boolean;
  sessionDuration?: number; // in milliseconds
  persistence?: 'local' | 'session' | 'none';
  debug?: boolean;

  // Added Fields
  selfRegistrationEnabled?: boolean;
  mfaEnabled?: boolean;
  requireMfa?: boolean; 
  name?: string; 
  termsUrl?: string;
  privacyUrl?: string;
  enabledProviders?: AuthProviderType[]; 
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
  getOtp(identifier: string, type: string, tenantId: string): Promise<OtpSession | null>;
  incrementOtpAttempts(identifier: string, type: string, tenantId: string): Promise<void>;
  deleteOtp(identifier: string, type: string, tenantId: string): Promise<void>;

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

  // Configuration Management
  getAuthConfig(tenantId: string): Promise<AuthConfig | null>;
  updateAuthConfig(tenantId: string, config: Partial<AuthConfig>): Promise<AuthConfig>;
}

export interface AuthProvider {
  id: string;
  name: string;
  type: AuthProviderType;
  signIn(credentials?: any): Promise<User>;
  signOut(): Promise<void>;
}
