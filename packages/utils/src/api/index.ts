import { storage } from '../storage';
import { HttpError } from './errors';

export interface ApiClientConfig {
    baseUrl?: string;
    getAuthToken?: () => string | null;
    /**
     * Optional global error handler.
     * Useful for logging or unauthorized redirects.
     */
    onError?: (error: HttpError) => void;
    /**
     * Optional request interceptor.
     * Useful for adding custom headers or logging.
     */
    onRequest?: (endpoint: string, options: RequestInit) => Promise<RequestInit> | RequestInit;
    /**
     * Optional response interceptor.
     * Useful for transform response data
     */
     onResponse?: (response: Response) => Promise<Response> | Response;
}

export class ApiClient {
    private config: ApiClientConfig;

    constructor(config: ApiClientConfig = {}) {
        this.config = {
            baseUrl: config.baseUrl || '',
            getAuthToken: config.getAuthToken || (() => {
                if (typeof window !== 'undefined') {
                    return storage.get('auth_token');
                }
                return null;
            }),
            onError: config.onError,
            onRequest: config.onRequest,
            onResponse: config.onResponse
        };
    }

    private async request<T>(endpoint: string, initOptions: RequestInit = {}): Promise<T> {
        let options = { ...initOptions };
        const url = `${this.config.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
        
        // 1. Prepare Headers
        const headers = new Headers(options.headers);
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        const token = this.config.getAuthToken?.();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        options.headers = headers;

        // 2. Request Interceptor
        if (this.config.onRequest) {
            options = await this.config.onRequest(endpoint, options);
        }

        try {
            let response = await fetch(url, options);

            // 3. Response Interceptor
            if (this.config.onResponse) {
                response = await this.config.onResponse(response);
            }

            const data = await response.json().catch(() => ({})); // Handle empty bodies safely

            if (!response.ok) {
                throw HttpError.fromResponse(data, response.status);
            }

            return data as T;
        } catch (error) {
            let httpError: HttpError;

            if (error instanceof HttpError) {
                httpError = error;
            } else {
                 // Network errors or other fetch failures
                httpError = new HttpError(0, error instanceof Error ? error.message : 'Network Error');
            }

            // 4. Global Error Handler
            if (this.config.onError) {
                this.config.onError(httpError);
            }

            throw httpError;
        }
    }

    public get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    public post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { 
            ...options, 
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined 
        });
    }

    public patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { 
            ...options, 
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined 
        });
    }

    public delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}


