/**
 * Convert text to URL-friendly slug
 * @param text - Text to convert
 * @returns URL-friendly slug
 * @example slugify('Hello World!') => 'hello-world'
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}

/**
 * Truncate text to specified length with suffix
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to append (default: '...')
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert text to title case (capitalize each word)
 * @param text - Text to convert
 * @returns Title cased text
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Convert text to camelCase
 * @param text - Text to convert
 * @returns camelCase text
 */
export function camelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Convert text to PascalCase
 * @param text - Text to convert
 * @returns PascalCase text
 */
export function pascalCase(text: string): string {
  const camelCased = camelCase(text);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

/**
 * Convert text to snake_case
 * @param text - Text to convert
 * @returns snake_case text
 */
export function snakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Convert text to kebab-case
 * @param text - Text to convert
 * @returns kebab-case text
 */
export function kebabCase(text: string): string {
  return text
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Escape HTML special characters
 * @param text - Text to escape
 * @returns Escaped HTML text
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Unescape HTML entities
 * @param text - Text to unescape
 * @returns Unescaped text
 */
export function unescapeHtml(text: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return text.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => htmlUnescapes[entity] || entity);
}

/**
 * Strip all HTML tags from text
 * @param html - HTML text
 * @returns Plain text without HTML
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Mask sensitive data (e.g., credit cards, phones)
 * @param text - Text to mask
 * @param maskChar - Character to use for masking (default: '*')
 * @param visibleCount - Number of characters to leave visible at end (default: 4)
 * @returns Masked text
 */
export function mask(text: string, maskChar = '*', visibleCount = 4): string {
  if (text.length <= visibleCount) return text;
  const masked = maskChar.repeat(text.length - visibleCount);
  return masked + text.slice(-visibleCount);
}

/**
 * Remove diacritics/accents from text
 * @param text - Text with diacritics
 * @returns Text without diacritics
 */
export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Simple pluralize function
 * @param word - Word to pluralize
 * @param count - Count to determine plural
 * @returns Singular or plural form
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  
  // Simple English pluralization rules
  if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies';
  }
  if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x')) {
    return word + 'es';
  }
  return word + 's';
}

/**
 * Create excerpt from text by word count
 * @param text - Text to excerpt
 * @param maxWords - Maximum word count
 * @returns Excerpted text
 */
export function excerpt(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}
