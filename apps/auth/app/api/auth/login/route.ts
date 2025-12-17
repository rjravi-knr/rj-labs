import { NextRequest, NextResponse } from "next/server";
import { authAdapter } from "../../../../lib/adapter";
import { v4 as uuidv4 } from 'uuid';
import { OtpManager } from "@labs/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tenantId, action, identifier, password, code, strategy } = body;
        // action: 'verify_password' | 'request_otp' | 'verify_otp'

        if (!tenantId || !identifier) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const config = await authAdapter.getAuthConfig(tenantId);
        if (!config) {
            return NextResponse.json({ error: "Tenant configuration not found" }, { status: 404 });
        }

        if (action === 'verify_password') {
            if (!password) {
                return NextResponse.json({ error: "Password required" }, { status: 400 });
            }
            
            const user = await authAdapter.verifyPassword(identifier, tenantId, password);
            if (!user) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }
            
            // Construct granular method: e.g. email_password or username_password or phone_password
            // We can try to infer from identifier type or just use "password" and strategy.
            // Client sends "strategy" (email/sms) in body logic from login-form (I need to check if I updated login-form to send strategy for password? Yes, it sends strategy).
            // But if username is used, strategy might remain 'email' in my previous code? 
            // I should double check login-form.tsx logic for strategy.
            // For now, let's use `${strategy}_password` as a good approximation.
            const method = `${strategy || 'unknown'}_password`;
            
            return await createSession(user, tenantId, method);
        }

        if (action === 'request_otp') {
            const channel = strategy === 'sms' || strategy === 'whatsapp' ? strategy : 'email';
            const otpManager = new OtpManager(authAdapter, config.loginMethods);
            
            try {
                const code = await otpManager.generate(tenantId, identifier, channel, 'login');
                
                // Dev-only logger
                console.log(`[DEV OTP] Code for ${identifier}: ${code}`);
                
                return NextResponse.json({ 
                    message: "OTP sent",
                    devCode: process.env.NODE_ENV === 'development' ? code : undefined 
                });
            } catch (e: any) {
                return NextResponse.json({ error: e.message }, { status: 400 });
            }
        }

        if (action === 'verify_otp') {
             if (!code) {
                return NextResponse.json({ error: "OTP code required" }, { status: 400 });
            }
            
            const otpManager = new OtpManager(authAdapter, config.loginMethods);
            const result = await otpManager.verify(tenantId, identifier, code, 'login');
            
            if (!result.isValid) {
                return NextResponse.json({ error: result.error || "Invalid OTP" }, { status: 400 });
            }
            
            let user = await authAdapter.getUserByEmail(identifier, tenantId);
            
            if (!user) {
                 return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return await createSession(user, tenantId, `${strategy || 'email'}_otp`);
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error: any) {
        console.error("Login API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

async function createSession(user: any, tenantId: string, authMethod: string) {
    // Generate "Smart Token" format: tenantId.uuid
    // The "dot" separator is critical for DrizzleAdapter.getSession to parse the tenantId
    // This token is stored in localStorage/cookies, NOT in the URL bar.
    const token = `${tenantId}.${uuidv4()}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await authAdapter.createSession({
        userId: user.id,
        tenantId,
        token,
        expiresAt,
        authMethod,
    } as any);

    return NextResponse.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            tenantId: tenantId, // Critical: Return tenantId so client context knows it
            isSuperAdmin: user.isSuperAdmin,
            roles: user.roles
        }
    });
}
