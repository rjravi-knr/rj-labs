
import { NextResponse } from 'next/server';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> } // Params are async in latest Next.js
) {
    try {
        const { userId } = await params;
        const url = new URL(req.url);
        const tenantId = url.searchParams.get("tenantId") || "default-tenant";

        console.log(`[API] Fetching detailed user ${userId} for tenant ${tenantId}`);

        const res = await fetch(`${AUTH_SERVICE_URL}/api/auth/users/${userId}?tenantId=${tenantId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.get('Authorization') || '' 
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.text();
             // Try to parse JSON error if possible
            try {
                const jsonError = JSON.parse(error);
                 return NextResponse.json(jsonError, { status: res.status });
            } catch {
                return NextResponse.json({ error: `Service Error: ${error}` }, { status: res.status });
            }
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("[USER_DETAIL_GET]", error);
        return NextResponse.json({ error: "Internal Error", details: String(error) }, { status: 500 });
    }
}
