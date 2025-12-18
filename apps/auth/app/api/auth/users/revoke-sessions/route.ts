
import { NextResponse } from 'next/server';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const tenantId = searchParams.get("tenantId") || "default-tenant";
        const body = await req.json();

        const res = await fetch(`${AUTH_SERVICE_URL}/api/auth/users/actions/revoke-sessions?tenantId=${tenantId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.get('Authorization') || ''
            },
            body: JSON.stringify(body),
            cache: 'no-store'
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return NextResponse.json(errorData, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("[REVOKE_SESSIONS_PROXY]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
