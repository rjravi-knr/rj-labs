export type IdentifierType = 'email' | 'phone' | 'username';

export function detectIdentifierType(identifier: string): IdentifierType {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(identifier)) {
        return 'email';
    }

    // Simple phone regex (allows +, -, spaces, digits)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneRegex.test(identifier)) {
        return 'phone';
    }

    return 'username';
}
