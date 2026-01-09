import { Context } from 'hono';
import { AuthEnv } from '../../middleware/db-context';
import { authConfig } from '@labs/database/auth';
import { HttpStatus } from '@labs/utils';
import { eq } from 'drizzle-orm';
import { AuthErrorCodes, AuthErrorMessages } from '../../constants/errors';

export const getConfigHandler = async (...args: any[]) => {
    let context = args[0] as Context<AuthEnv>;
    if ((!context || !context.req) && args.length > 1 && args[1].req) {
        context = args[1];
    }
    const { tenantId } = (context.req as any).valid('query');
    const db = context.var.db; // From Middleware

    try {
        const [config] = await db.select().from(authConfig).limit(1);

        if (!config) {
            // Default config
            return context.json({
                enabledProviders: ['email_password'],
                passwordPolicy: { minLength: 8 },
                selfRegistrationEnabled: true,
                providerConfig: {},
                mfaEnabled: false,
                name: tenantId
            });
        }

        return context.json({
            enabledProviders: config.enabledProviders as string[],
            passwordPolicy: config.passwordPolicy,
            selfRegistrationEnabled: config.selfRegistrationEnabled,
            providerConfig: config.providerConfig,
            name: config.name || tenantId,
            termsUrl: config.termsUrl || undefined,
            privacyUrl: config.privacyUrl || undefined,
            mfaEnabled: config.mfaEnabled,
            pinPolicy: config.pinPolicy,
            loginMethods: config.loginMethods,
            emailPolicy: config.emailPolicy,
            // @ts-ignore
            settings: config.settings
        } as any);
    } catch (e: any) {
        return context.json({ error: e.message || 'Failed to fetch config', code: AuthErrorCodes.CONFIG_NOT_FOUND }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const updateConfigHandler = async (...args: any[]) => {
    let context = args[0] as Context<AuthEnv>;
    if ((!context || !context.req) && args.length > 1 && args[1].req) {
        context = args[1];
    }
    const { tenantId } = (context.req as any).valid('query');
    const body = (context.req as any).valid('json');
    const db = context.var.db; 
    const user = context.var.user!; // From AuthGuard

    // Authorization Check
    // Reuse specific logic: Strict Super Admin OR Tenant Admin
    // Using 'true' (strict) was in original code, but 'false' is better for multitenancy unless specified.
    // Original code: await verifyAdmin(c, tenantId, true); // Strict Super Admin
    
    if (!user.isSuperAdmin) {
        return context.json({ error: AuthErrorMessages[AuthErrorCodes.FORBIDDEN], code: AuthErrorCodes.FORBIDDEN }, HttpStatus.FORBIDDEN);
    }

    try {
        const [existing] = await db.select().from(authConfig).limit(1);

        if (existing) {
             await db.update(authConfig)
            .set({
                ...body, 
                updatedAt: new Date()
            })
            .where(eq(authConfig.id, existing.id));
            return context.json({ success: true, id: existing.id } as any);
        } else {
             const [newConfig] = await db.insert(authConfig).values({
                enabledProviders: body.enabledProviders || ['email_password'],
                passwordPolicy: body.passwordPolicy,
                selfRegistrationEnabled: body.selfRegistrationEnabled ?? true,
                providerConfig: body.providerConfig,
                mfaEnabled: body.mfaEnabled,
                otpPolicy: body.otpPolicy,
                pinPolicy: body.pinPolicy,
                loginMethods: body.loginMethods,
                emailPolicy: body.emailPolicy,
                termsUrl: body.termsUrl,
            }).returning();
            
            if (!newConfig) return context.json({ error: AuthErrorMessages[AuthErrorCodes.CONFIG_UPDATE_FAILED], code: AuthErrorCodes.CONFIG_UPDATE_FAILED }, HttpStatus.INTERNAL_SERVER_ERROR);
            return context.json({ success: true, id: newConfig.id.toString() } as any);
        }
    } catch (e: any) {
        return context.json({ error: e.message, code: AuthErrorCodes.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
