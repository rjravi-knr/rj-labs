import { AuthAdapter, OtpSession, AuthConfig } from "../types";

export class OtpManager {
  constructor(
    private adapter: AuthAdapter,
    private config?: AuthConfig['loginMethods']
  ) {}

  private getConfig(identifier: string, channel: 'email' | 'sms' | 'whatsapp') {
    if (!this.config) {
      // Defaults if no config provided
      return { length: 6, expiry: 300, maxAttempts: 3 };
    }
    
    // Determine method based on channel/identifier type
    // This is a simplified lookup needed for Phase 2
    if (channel === 'email') return this.config.email.otp;
    if (channel === 'sms' || channel === 'whatsapp') return this.config.phone.otp;
    
    return { length: 6, expiry: 300, maxAttempts: 3 };
  }

  async generate(identifier: string, channel: 'email' | 'sms' | 'whatsapp', type: 'login' | 'verification' = 'login'): Promise<string> {
    const settings = this.getConfig(identifier, channel);
    if (settings && 'enabled' in settings && !settings.enabled) {
      throw new Error(`OTP logic disabled for ${channel}`);
    }

    const length = settings.length || 6;
    const expirySeconds = settings.expiry || 300;

    // Generate numeric code
    const code = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    
    const expiresAt = new Date(Date.now() + expirySeconds * 1000);

    const session: OtpSession = {
      identifier,
      code, // In production this should be hashed
      type,
      channel,
      expiresAt,
      attempts: 0
    };

    // Save to adapter (DB/Redis)
    await this.adapter.createOtp(session);

    return code;
  }

  async verify(identifier: string, code: string, type: 'login' | 'verification' = 'login'): Promise<{ isValid: boolean; error?: string }> {
     const session = await this.adapter.getOtp(identifier, type);

     if (!session) {
       return { isValid: false, error: 'INVALID_CODE' };
     }

     if (new Date() > new Date(session.expiresAt)) {
       await this.adapter.deleteOtp(identifier, type);
       return { isValid: false, error: 'EXPIRED' };
     }

     const settings = this.getConfig(identifier, session.channel);
     const maxAttempts = settings.maxAttempts || 3;

     if (session.attempts >= maxAttempts) {
       await this.adapter.deleteOtp(identifier, type);
       return { isValid: false, error: 'TOO_MANY_ATTEMPTS' };
     }

     if (session.code !== code) {
       await this.adapter.incrementOtpAttempts(identifier, type);
       return { isValid: false, error: 'INVALID_CODE' };
     }

     // Success - consume the OTP
     await this.adapter.deleteOtp(identifier, type);
     return { isValid: true };
  }
}
