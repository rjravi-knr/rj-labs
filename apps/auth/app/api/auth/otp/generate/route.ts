
import { NextResponse } from 'next/server';
import { requestOtp } from '@labs/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, channel, type, tenantId } = body;

    // TODO: Validate input with Zod

    const code = await requestOtp(identifier, channel, type, tenantId);

    // MOCK SENDING (In real app, call Email/SMS provider here)
    console.log(`[OTP] Generated for ${identifier}: ${code}`);
    
    // In dev mode, return code for testing convenience
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ success: true, debugCode: code });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('OTP Generate Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Error' }, 
      { status: 500 }
    );
  }
}
