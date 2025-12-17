
import { NextResponse } from 'next/server';

// CACHE_BUST: {timestamp}
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

    } catch (error: any) {
        console.error("[USERS_GET]", error);
        return NextResponse.json({ error: "Internal Error", details: String(error) }, { status: 500 });
    }
}


export async function POST(req: Request) {
    return proxyRequest(req, 'POST');
}

export async function PATCH(req: Request) {
    return proxyRequest(req, 'PATCH');
}

export async function DELETE(req: Request) {
    console.log('[API] DELETE /api/auth/users called');
    return proxyRequest(req, 'DELETE');
}

async function proxyRequest(req: Request, method: string) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams; // Keep all params
        const tenantId = searchParams.get("tenantId") || "default-tenant";
        
        console.log(`[API] Proxying ${method} to ${AUTH_SERVICE_URL}/api/auth/users?${searchParams.toString()}`);

        // For GET/DELETE we rely on params, for POST/PATCH we might have body
        let body;
        if (method !== 'GET' && method !== 'DELETE') {
             body = await req.json();
        }

        const res = await fetch(`${AUTH_SERVICE_URL}/api/auth/users?${searchParams.toString()}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.get('Authorization') || ''
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store'
        });
        
        console.log(`[API] Service response status: ${res.status}`);

        if (!res.ok) {
            // Forward error from service
            try {
                const errorData = await res.json();
                console.error('[API] Service error:', errorData);
                return NextResponse.json(errorData, { status: res.status });
            } catch (e) {
                 console.error('[API] Service error (text):', await res.text());
                return NextResponse.json({ error: "Service Error", details: res.statusText }, { status: res.status });
            }
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("[USERS_PROXY]", error);
        return NextResponse.json({ error: "Internal Error", details: String(error) }, { status: 500 });
    }
}
