import { Context } from 'hono';
import { AuthEnv } from '../../middleware/db-context';
import { users, sessions } from '@labs/database/auth';
import { eq, desc, and } from 'drizzle-orm';
import { HttpStatus } from '@labs/utils';
import { AuthErrorCodes, AuthErrorMessages } from '../../constants/errors';
import bcrypt from 'bcryptjs';

export const listUsersHandler = async (...args: any[]) => {
    let context = args[0] as Context<AuthEnv>;
    // Hack: If used with zod-validator hook, context might be 2nd arg
    if ((!context || !context.req) && args.length > 1 && args[1].req) {
        context = args[1];
    }

    try {
        let tenantId = (args[0] as any)?.data?.tenantId;
        if (!tenantId && (context.req as any).valid) {
             try { tenantId = (context.req as any).valid('query').tenantId; } catch (e) { /* ignore */ }
        }
        
        // Fallback to query param if validation didn't extract it or if validation is bypassed
        if (!tenantId) {
             tenantId = context.req.query('tenantId');
        }
        
        const db = context.var.db;
        const user = context.var.user;

        if (!user) {
            return context.json({ error: 'User not authenticated' }, 500);
        }

        // Auth Check: Tenant Admin or Super Admin
        if (!user.isSuperAdmin && user.tenantId !== tenantId) {
             return context.json({ error: AuthErrorMessages[AuthErrorCodes.FORBIDDEN], code: AuthErrorCodes.FORBIDDEN }, HttpStatus.FORBIDDEN);
        }

        const tenantUsers = await db
            .select({
                id: users.id,
                email: users.email,
                fullName: users.fullName,
                username: users.username,
                displayName: users.displayName,
                isSuperAdmin: users.isSuperAdmin,
                isActive: users.isActive,
                createdAt: users.createdAt,
                emailVerified: users.emailVerified,
                phoneVerified: users.phoneVerified,
                userVerified: users.userVerified,
                provider: users.memberCode
            })
            .from(users)
            .where(eq(users.tenantId, tenantId))
            .orderBy(desc(users.createdAt));

        const formattedUsers = tenantUsers.map(u => ({
            ...u,
            id: u.id.toString(),
            createdAt: u.createdAt.toISOString()
        }));

        return context.json(formattedUsers as any);
    } catch (e: any) {
        console.error('[ListUsers] Error:', e);
        return context.json({ error: e.message, code: AuthErrorCodes.INTERNAL_SERVER_ERROR }, 500);
    }
};

export const getUserHandler = async (...args: any[]) => {
    let context = args[0] as Context<AuthEnv>;
    if ((!context || !context.req) && args.length > 1 && args[1].req) {
        context = args[1];
    }
    const { userId } = (context.req as any).valid('param');
    const { tenantId } = (context.req as any).valid('query');
    const db = context.var.db;
    const currentUser = context.var.user!;

    if (!currentUser.isSuperAdmin && currentUser.tenantId !== tenantId) {
         return context.json({ error: AuthErrorMessages[AuthErrorCodes.FORBIDDEN], code: AuthErrorCodes.FORBIDDEN }, HttpStatus.FORBIDDEN);
    }
    
    try {
        const user = await db
            .select()
            .from(users)
            .where(and(eq(users.tenantId, tenantId), eq(users.id, Number(userId))))
            .limit(1)
            .then(res => res[0]);

        if (!user) {
            return context.json({ error: AuthErrorMessages[AuthErrorCodes.USER_NOT_FOUND], code: AuthErrorCodes.USER_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
        
        const recentSessions = await db
            .select()
            .from(sessions)
            .where(eq(sessions.userId, user.id))
            .orderBy(desc(sessions.createdAt))
            .limit(10);
            
        return context.json({
            user: {
                ...user,
                id: user.id.toString(),
                createdAt: user.createdAt.toISOString(),
                emailVerifiedTimestamp: user.emailVerifiedTimestamp?.toISOString() || null,
                phoneVerifiedTimestamp: user.phoneVerifiedTimestamp?.toISOString() || null,
                userVerifiedTimestamp: user.userVerifiedTimestamp?.toISOString() || null
            },
            sessions: recentSessions.map(s => ({
                id: s.id,
                ipAddress: s.ipAddress,
                userAgent: s.userAgent,
                createdAt: s.createdAt.toISOString(),
                expiresAt: s.expiresAt.toISOString()
            }))
        } as any);

    } catch (e: any) {
         return context.json({ error: e.message, code: AuthErrorCodes.INTERNAL_SERVER_ERROR }, 500);
    }
};

export const createUserHandler = async (...args: any[]) => {
    let context = args[0] as Context<AuthEnv>;
    if ((!context || !context.req) && args.length > 1 && args[1].req) {
        context = args[1];
    }
    const { tenantId } = (context.req as any).valid('query');
    const { email, fullName, isSuperAdmin, password } = (context.req as any).valid('json');
    const db = context.var.db;
    const currentUser = context.var.user!;

    // Strict Super Admin check to create users via API? Or Tenant Admin?
    // app.ts Logic seemed to imply verifyAdmin(c, tenantId) which allows Tenant Admin.
    if (!currentUser.isSuperAdmin && currentUser.tenantId !== tenantId) {
        return context.json({ error: AuthErrorMessages[AuthErrorCodes.FORBIDDEN], code: AuthErrorCodes.FORBIDDEN }, HttpStatus.FORBIDDEN);
    }

    try {
        const [existing] = await db.select().from(users).where(eq(users.email, email));
        if (existing) return context.json({ error: AuthErrorMessages[AuthErrorCodes.USER_ALREADY_EXISTS], code: AuthErrorCodes.USER_ALREADY_EXISTS }, HttpStatus.BAD_REQUEST);

        const initialPassword = password || Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(initialPassword, 10);

        const [newUser] = await db.insert(users).values({
            email,
            fullName,
            tenantId,
            passwordHash: hashedPassword,
            isSuperAdmin: isSuperAdmin || false,
            updatedAt: new Date()
        }).returning();

        if (!newUser) return context.json({ error: AuthErrorMessages[AuthErrorCodes.CREATION_FAILED], code: AuthErrorCodes.CREATION_FAILED }, HttpStatus.INTERNAL_SERVER_ERROR);

        return context.json({ id: newUser.id.toString(), email: newUser.email } as any);
    } catch (e: any) {
        return context.json({ error: e.message, code: AuthErrorCodes.INTERNAL_SERVER_ERROR }, 500);
    }
};
