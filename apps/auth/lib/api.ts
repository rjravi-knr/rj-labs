import { ApiClient } from "@labs/utils";

const envUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
const cleanUrl = envUrl ? envUrl.replace(/\/$/, '') : '';
const baseUrl = cleanUrl ? `${cleanUrl}/api/auth` : '/api/auth';

export const api = new ApiClient({
    baseUrl,
    onError: (error) => {
        console.error(`[API Error] ${error.status} - ${error.message}`, error);
        
        if (error.status === 401) {
            // Optional: Redirect to login or clear token
            if (typeof window !== 'undefined') {
                 // window.location.href = '/sign-in'; // Uncomment if desired
            }
        }
    }
});
