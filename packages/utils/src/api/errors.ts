import { HttpStatusCode } from './status';

export interface ApiErrorResponse {
    status: number;
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
    timestamp?: string;
    path?: string;
}

export class HttpError extends Error {
    public readonly status: number;
    public readonly code?: string;
    public readonly data?: any;

    constructor(status: number, message: string, data?: any, code?: string) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.data = data;
        this.code = code;

        // Restore prototype chain for instanceof checks
        Object.setPrototypeOf(this, HttpError.prototype);
    }
    
    static fromResponse(data: any, status: number): HttpError {
        const message = data.message || data.error?.message || 'Unknown Error';
        return new HttpError(status, message, data, data.code);
    }
}
