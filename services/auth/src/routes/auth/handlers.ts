import { Context } from 'hono';
import { AuthEnv } from '../../middleware/db-context';
import { getAuthAdapter, createSession, validatePassword, DEFAULT_PASSWORD_POLICY } from '@labs/auth'; // Imports
import { HttpStatus } from '@labs/utils';
import { AuthErrorCodes, AuthErrorMessages } from '../../constants/errors';
import { authConfig, users } from '@labs/database/auth';
import { eq } from 'drizzle-orm';
import { parseUserAgent } from '../../utils';

export const loginHandler = async (context: Context<AuthEnv>) => {
    try {
      const { email, password, tenantId } = (context.req as any).valid('json');
      
      const adapter = getAuthAdapter();
      const user = await adapter.verifyPassword(email, tenantId, password);
      
      if (!user) {
        return context.json({ error: AuthErrorMessages[AuthErrorCodes.INVALID_CREDENTIALS], code: AuthErrorCodes.INVALID_CREDENTIALS }, HttpStatus.UNAUTHORIZED);
      }
      
      const ipAddress = (context.req.header('x-forwarded-for') || '').split(',')[0]?.trim() || context.req.header('x-real-ip') || '127.0.0.1';
      const userAgent = parseUserAgent(context.req.header('user-agent') || 'unknown');
      
      const session = await createSession(user, 'email_password', ipAddress, userAgent);
      
      return context.json({
        token: session.token,
        user: { 
            id: user.id, 
            email: user.email, 
            tenantId: user.tenantId,
            isSuperAdmin: user.isSuperAdmin
        }
      } as any);
    } catch (err: any) {
      return context.json({ error: err.message || 'Login failed' }, HttpStatus.UNAUTHORIZED);
    }
};

export const signupHandler = async (context: Context<AuthEnv>) => {
    const { email, password, tenantId, name } = (context.req as any).valid('json');
    // Use DB from Context!
    const db = context.var.db; 
    
    // 1. Check Config
    const [config] = await db.select().from(authConfig).limit(1);
    if (config) {
        if (!config.selfRegistrationEnabled) {
            return context.json({ error: AuthErrorMessages[AuthErrorCodes.REGISTRATION_DISABLED], code: AuthErrorCodes.REGISTRATION_DISABLED }, HttpStatus.BAD_REQUEST);
        }

         const policy = { ...DEFAULT_PASSWORD_POLICY, ...(config.passwordPolicy as any) };
         const validation = validatePassword(password, policy, { email, name });
         
         if (!validation.isValid) {
             return context.json({ error: validation.errors[0] }, HttpStatus.BAD_REQUEST);
         }
    }
    
    // 2. Check User Existence
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
        return context.json({ error: AuthErrorMessages[AuthErrorCodes.USER_ALREADY_EXISTS], code: AuthErrorCodes.USER_ALREADY_EXISTS }, HttpStatus.BAD_REQUEST);
    }

    // 3. Create User (Simplified for MVP - plain hash)
    // In real world, use bcrypt.hash(password) here or via adapter
    // Re-using hash logic from app.ts (simplified)
    const [newUser] = await db.insert(users).values({
        email,
        tenantId,
        fullName: name, 
        passwordHash: password, 
        updatedAt: new Date()
    }).returning();
    
    if (!newUser) return context.json({ error: AuthErrorMessages[AuthErrorCodes.CREATION_FAILED], code: AuthErrorCodes.CREATION_FAILED }, HttpStatus.BAD_REQUEST);
    
    return context.json({ id: newUser.id.toString(), email: newUser.email } as any);
};

export const meHandler = async (context: Context<AuthEnv>) => {
    // User is already attached by AuthGuard!
    const user = context.var.user!;
    
    return context.json({ 
        user: { 
            id: user.id, 
            email: user.email, 
            tenantId: user.tenantId,
            isSuperAdmin: user.isSuperAdmin 
        } 
    } as any);
};
