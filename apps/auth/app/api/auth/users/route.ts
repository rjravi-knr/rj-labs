
import { NextResponse } from 'next/server';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const tenantId = url.searchParams.get("tenantId") || "default-tenant";

        const res = await fetch(`${AUTH_SERVICE_URL}/api/auth/users?tenantId=${tenantId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Forward authorization token from client request
                'Authorization': req.headers.get('Authorization') || '' 
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Service Error: ${error}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("[USERS_PROXY]", error);
        return NextResponse.json({ error: "Internal Error", details: String(error) }, { status: 500 });
    }
}
