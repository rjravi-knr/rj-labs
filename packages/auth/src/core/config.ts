import { AuthConfig } from '../types';

const defaultConfig: AuthConfig = {
  providers: ['email_password'],
  autoSignIn: true,
  sessionDuration: 3600 * 1000 * 24, // 24 hours
  persistence: 'local',
  debug: false,
};

let currentConfig: AuthConfig = defaultConfig;

export function initializeAuth(config: Partial<AuthConfig>) {
  currentConfig = { ...defaultConfig, ...config };
  if (currentConfig.debug) {
    console.log('[AuthSDK] Initialized with config:', currentConfig);
  }
  return currentConfig;
}

export function getAuthConfig(): AuthConfig {
  return currentConfig;
}
