import { NextRequest, NextResponse } from "next/server";
import { authAdapter } from "../../../../lib/adapter";
import { validatePassword } from "@labs/auth/password-policy";
import { AuthErrors } from "@labs/auth/core/errors";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tenantId, email, password, name } = body;

        if (!tenantId || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const config = await authAdapter.getAuthConfig(tenantId);
        if (!config) {
            return NextResponse.json({ error: "Tenant configuration not found" }, { status: 404 });
        }

        if (!config.selfRegistrationEnabled) {
            return NextResponse.json({ error: "Registration is disabled for this tenant." }, { status: 403 });
        }

        if (config.passwordPolicy) {
            const passwordValidation = validatePassword(password, config.passwordPolicy as any);
            if (!passwordValidation.isValid) {
                return NextResponse.json({ 
                    error: "Password does not meet policy requirements.",
                    details: passwordValidation.errors 
                }, { status: 400 });
            }
        }

        const passwordHash = password; // In real app, hash this

        try {
            const newUser = await authAdapter.createUser({
                tenantId,
                email,
                username: email.split('@')[0],
                fullName: name,
                displayName: name,
                firstName: null,
                lastName: null,
                passwordHash,
                
                emailVerified: false,
                emailVerifiedTimestamp: null,
                phoneVerified: false,
                phoneVerifiedTimestamp: null,
                userVerified: false,
                userVerifiedTimestamp: null,
                
                roles: ["user"], 
            } as any);

            return NextResponse.json({ user: newUser }, { status: 201 });
        } catch (e: any) {
             if (e.code === AuthErrors.EMAIL_ALREADY_IN_USE.code) {
                 return NextResponse.json({ error: "Email already in use" }, { status: 409 });
             }
             throw e;
        }

    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
