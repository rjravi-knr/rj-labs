/**
 * Build URL with query parameters
 * @param base - Base URL
 * @param params - Query parameters
 * @returns Complete URL with query string
 */
export function buildUrl(base: string, params: Record<string, any>): string {
  const query = stringifyQueryString(params);
  return query ? `${base}?${query}` : base;
}

/**
 * Parse query string to object
 * @param query - Query string (with or without leading '?')
 * @returns Object with parsed parameters
 */
export function parseQueryString(query: string): Record<string, string> {
  const cleanQuery = query.startsWith('?') ? query.slice(1) : query;
  const params: Record<string, string> = {};
  
  if (!cleanQuery) return params;
  
  cleanQuery.split('&').forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
}

/**
 * Stringify object to query string
 * @param params - Parameters object
 * @returns Query string (without leading '?')
 */
export function stringifyQueryString(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value != null)
    .map(([key, value]) => 
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&');
}

/**
 * Get query parameter from URL
 * @param url - URL string
 * @param param - Parameter name
 * @returns Parameter value or null
 */
export function getQueryParam(url: string, param: string): string | null {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
}

/**
 * Add query parameter to URL
 * @param url - URL string
 * @param key - Parameter key
 * @param value - Parameter value
 * @returns URL with added parameter
 */
export function addQueryParam(url: string, key: string, value: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.set(key, value);
  return urlObj.toString();
}

/**
 * Remove query parameter from URL
 * @param url - URL string
 * @param key - Parameter key to remove
 * @returns URL without parameter
 */
export function removeQueryParam(url: string, key: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(key);
  return urlObj.toString();
}

/**
 * Extract domain from URL
 * @param url - URL string
 * @returns Domain (hostname)
 */
export function getDomain(url: string): string {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

/**
 * Check if URL is absolute
 * @param url - URL string
 * @returns True if absolute URL
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Join URL paths safely
 * @param paths - Path segments
 * @returns Joined path
 */
export function joinPaths(...paths: string[]): string {
  return paths
    .map((path, index) => {
      // Remove leading slash from all but first
      if (index > 0 && path.startsWith('/')) {
        path = path.slice(1);
      }
      // Remove trailing slash from all but last
      if (index < paths.length - 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      return path;
    })
    .join('/');
}
