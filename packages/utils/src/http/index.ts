/**
 * Parse user agent string into readable format
 * Example: "Chrome 120 on macOS" or "Safari on iPhone"
 * 
 * @param userAgent - Raw user agent string from HTTP headers
 * @returns Human-readable browser and OS information
 * 
 * @example
 * ```ts
 * parseUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...');
 * // Returns: "Chrome 120 on macOS 10"
 * ```
 */
export function parseUserAgent(userAgent: string): string {
    if (!userAgent || userAgent === 'unknown') {
        return 'Unknown Browser';
    }

    // Extract browser
    let browser = 'Unknown';
    let version = '';
    
    if (userAgent.includes('Edg/')) {
        const match = userAgent.match(/Edg\/([\d.]+)/);
        browser = 'Edge';
        version = (match && match[1]) ? (match[1].split('.')[0] || '') : '';
    } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
        const match = userAgent.match(/Chrome\/([\d.]+)/);
        browser = 'Chrome';
        version = (match && match[1]) ? (match[1].split('.')[0] || '') : '';
    } else if (userAgent.includes('Firefox/')) {
        const match = userAgent.match(/Firefox\/([\d.]+)/);
        browser = 'Firefox';
        version = (match && match[1]) ? (match[1].split('.')[0] || '') : '';
    } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
        const match = userAgent.match(/Version\/([\d.]+)/);
        browser = 'Safari';
        version = (match && match[1]) ? (match[1].split('.')[0] || '') : '';
    } else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
        const match = userAgent.match(/(?:Opera|OPR)\/([\d.]+)/);
        browser = 'Opera';
        version = (match && match[1]) ? (match[1].split('.')[0] || '') : '';
    }

    // Extract OS/Platform
    let platform = 'Unknown OS';
    
    if (userAgent.includes('Windows NT 10.0')) {
        platform = 'Windows 10';
    } else if (userAgent.includes('Windows NT 11.0')) {
        platform = 'Windows 11';
    } else if (userAgent.includes('Windows NT')) {
        platform = 'Windows';
    } else if (userAgent.includes('Mac OS X')) {
        const match = userAgent.match(/Mac OS X ([\d_]+)/);
        platform = 'macOS';
        if (match && match[1]) {
            const osVersion = match[1].split('_')[0];
            platform = `macOS ${osVersion}`;
        }
    } else if (userAgent.includes('Linux')) {
        platform = 'Linux';
    } else if (userAgent.includes('Android')) {
        const match = userAgent.match(/Android ([\d.]+)/);
        platform = match && match[1] ? `Android ${match[1].split('.')[0]}` : 'Android';
    } else if (userAgent.includes('iPhone')) {
        platform = 'iPhone';
    } else if (userAgent.includes('iPad')) {
        platform = 'iPad';
    }

    // Combine into readable format
    const browserPart = version ? `${browser} ${version}` : browser;
    return `${browserPart} on ${platform}`;
}
