import { NextRequest, NextResponse } from "next/server";
import { authAdapter } from "../../../../lib/adapter";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
        return NextResponse.json({ error: "Tenant ID required" }, { status: 400 });
    }

    try {
        const config = await authAdapter.getAuthConfig(tenantId);
        
        if (!config) {
            return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
        }

        return NextResponse.json(config, { status: 200 });
    } catch (error) {
        console.error("Config Fetch Error:", error);
        return NextResponse.json({ 
            error: "Internal Server Error", 
            details: (error as Error).message,
            stack: (error as Error).stack 
        }, { status: 500 });
    }
}
