
import { NextResponse } from 'next/server';
import { signInWithOtp } from '@labs/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, code, type, tenantId } = body;

    // 1. Verify & Sign In
    const { user, session } = await signInWithOtp(identifier, code, type, tenantId);

    return NextResponse.json({ success: true, user, session });
  } catch (error: any) {
    console.error('OTP Verify Error:', error);
    // Determine status code based on error code if possible
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Error' }, 
      { status: 400 } // Default to 400 for auth errors
    );
  }
}
