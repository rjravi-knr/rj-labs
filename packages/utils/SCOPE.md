# @labs/utils - Scope & Features

## Overview
A comprehensive, type-safe utility library for TypeScript/JavaScript applications. This package provides production-ready utilities for common tasks across all RJ Suite packages and applications.

---

## Philosophy

1. **Zero Dependencies**: Standalone utilities with no external dependencies
2. **Type-Safe**: Full TypeScript support with strict typing
3. **Tree-Shakeable**: ESM modules for optimal bundle size
4. **Well-Tested**: 100% test coverage for all utilities
5. **Well-Documented**: JSDoc comments for excellent IntelliSense

---

## Utility Categories

### 1. String Utilities (`/string`)

#### Implemented ✅
- [ ] `slugify(text: string): string` - Convert text to URL-friendly slug
- [ ] `truncate(text: string, maxLength: number, suffix?: string): string` - Truncate with ellipsis
- [ ] `capitalize(text: string): string` - Capitalize first letter
- [ ] `capitalizeWords(text: string): string` - Title case
- [ ] `camelCase(text: string): string` - Convert to camelCase
- [ ] `pascalCase(text: string): string` - Convert to PascalCase
- [ ] `snakeCase(text: string): string` - Convert to snake_case
- [ ] `kebabCase(text: string): string` - Convert to kebab-case
- [ ] `sanitizeHtml(html: string): string` - Remove dangerous HTML
- [ ] `escapeHtml(text: string): string` - Escape HTML entities
- [ ] `unescapeHtml(text: string): string` - Unescape HTML entities
- [ ] `stripHtml(html: string): string` - Remove all HTML tags
- [ ] `mask(text: string, maskChar?: string, visibleCount?: number): string` - Mask sensitive data
- [ ] `removeDiacritics(text: string): string` - Remove accents/diacritics
- [ ] `pluralize(word: string, count: number): string` - Pluralize words
- [ ] `excerpt(text: string, maxWords: number): string` - Create excerpt by word count

---

### 2. Date/Time Utilities (`/date`)

#### Implemented ✅
- [ ] `formatDate(date: Date, format: string): string` - Custom date formatting
- [ ] `formatRelative(date: Date): string` - Relative time (e.g., "2 hours ago")
- [ ] `parseDate(dateString: string): Date` - Robust date parsing
- [ ] `isValidDate(date: any): boolean` - Date validation
- [ ] `addDays(date: Date, days: number): Date` - Add/subtract days
- [ ] `addHours(date: Date, hours: number): Date` - Add/subtract hours
- [ ] `diffInDays(date1: Date, date2: Date): number` - Difference in days
- [ ] `diffInHours(date1: Date, date2: Date): number` - Difference in hours
- [ ] `diffInMinutes(date1: Date, date2: Date): number` - Difference in minutes
- [ ] `startOfDay(date: Date): Date` - Get start of day
- [ ] `endOfDay(date: Date): Date` - Get end of day
- [ ] `startOfWeek(date: Date): Date` - Get start of week
- [ ] `endOfWeek(date: Date): Date` - Get end of week
- [ ] `startOfMonth(date: Date): Date` - Get start of month
- [ ] `endOfMonth(date: Date): Date` - Get end of month
- [ ] `isToday(date: Date): boolean` - Check if date is today
- [ ] `isTomorrow(date: Date): boolean` - Check if date is tomorrow
- [ ] `isYesterday(date: Date): boolean` - Check if date is yesterday
- [ ] `isSameDay(date1: Date, date2: Date): boolean` - Compare dates
- [ ] `formatDuration(milliseconds: number): string` - Format duration (e.g., "2h 30m")
- [ ] `getTimezone(): string` - Get current timezone
- [ ] `convertTimezone(date: Date, fromTz: string, toTz: string): Date` - Convert timezones

---

### 3. Validation Utilities (`/validation`)

#### Implemented ✅
- [ ] `isEmail(email: string): boolean` - Email validation
- [ ] `isUrl(url: string): boolean` - URL validation
- [ ] `isPhone(phone: string, country?: string): boolean` - Phone validation
- [ ] `isUUID(uuid: string): boolean` - UUID validation
- [ ] `isSlug(slug: string): boolean` - Slug validation
- [ ] `isCreditCard(number: string): boolean` - Credit card validation (Luhn algorithm)
- [ ] `isIPAddress(ip: string): boolean` - IP address validation
- [ ] `isHexColor(color: string): boolean` - Hex color validation
- [ ] `isStrongPassword(password: string): boolean` - Password strength check
- [ ] `validatePasswordStrength(password: string): PasswordStrength` - Detailed strength analysis
- [ ] `isAlphanumeric(text: string): boolean` - Alphanumeric check
- [ ] `isNumeric(text: string): boolean` - Numeric check
- [ ] `isJSON(text: string): boolean` - Valid JSON check
- [ ] `isBase64(text: string): boolean` - Base64 validation
- [ ] `isMimeType(type: string): boolean` - MIME type validation

---

### 4. Number Utilities (`/number`)

#### Implemented ✅
- [ ] `formatNumber(num: number, locale?: string): string` - Locale-aware formatting
- [ ] `formatCurrency(amount: number, currency: string, locale?: string): string` - Currency formatting
- [ ] `formatPercentage(value: number, decimals?: number): string` - Percentage formatting
- [ ] `formatBytes(bytes: number, decimals?: number): string` - File size formatting
- [ ] `clamp(value: number, min: number, max: number): number` - Clamp value between range
- [ ] `random(min: number, max: number): number` - Random integer
- [ ] `randomFloat(min: number, max: number, decimals?: number): number` - Random float
- [ ] `round(value: number, decimals?: number): number` - Precise rounding
- [ ] `average(numbers: number[]): number` - Calculate average
- [ ] `sum(numbers: number[]): number` - Calculate sum
- [ ] `median(numbers: number[]): number` - Calculate median
- [ ] `percentage(value: number, total: number): number` - Calculate percentage
- [ ] `lerp(start: number, end: number, t: number): number` - Linear interpolation
- [ ] `mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number` - Map value to new range

---

### 5. Array Utilities (`/array`)

#### Implemented ✅
- [ ] `unique<T>(array: T[]): T[]` - Remove duplicates
- [ ] `uniqueBy<T>(array: T[], key: keyof T): T[]` - Remove duplicates by key
- [ ] `chunk<T>(array: T[], size: number): T[][]` - Split into chunks
- [ ] `shuffle<T>(array: T[]): T[]` - Randomly shuffle array
- [ ] `sample<T>(array: T[]): T` - Get random element
- [ ] `sampleSize<T>(array: T[], n: number): T[]` - Get N random elements
- [ ] `groupBy<T>(array: T[], key: keyof T): Record<string, T[]>` - Group by property
- [ ] `sortBy<T>(array: T[], key: keyof T, order?: 'asc' | 'desc'): T[]` - Sort by property
- [ ] `flatten<T>(array: any[]): T[]` - Flatten nested arrays
- [ ] `difference<T>(arr1: T[], arr2: T[]): T[]` - Array difference
- [ ] `intersection<T>(arr1: T[], arr2: T[]): T[]` - Array intersection
- [ ] `compact<T>(array: (T | null | undefined)[]): T[]` - Remove falsy values
- [ ] `partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]]` - Split by condition
- [ ] `nth<T>(array: T[], index: number): T | undefined` - Get nth element (supports negative)

---

### 6. Object Utilities (`/object`)

#### Implemented ✅
- [ ] `pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>` - Pick properties
- [ ] `omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>` - Omit properties
- [ ] `isEmpty(obj: any): boolean` - Check if empty
- [ ] `deepClone<T>(obj: T): T` - Deep clone object
- [ ] `deepMerge<T>(...objects: Partial<T>[]): T` - Deep merge objects
- [ ] `flattenObject(obj: object, prefix?: string): Record<string, any>` - Flatten nested object
- [ ] `unflattenObject(obj: Record<string, any>): object` - Unflatten object
- [ ] `getNestedValue(obj: object, path: string): any` - Get nested property safely
- [ ] `setNestedValue(obj: object, path: string, value: any): void` - Set nested property
- [ ] `hasNestedProperty(obj: object, path: string): boolean` - Check nested property exists
- [ ] `mapKeys<T>(obj: T, fn: (key: string) => string): T` - Transform keys
- [ ] `mapValues<T>(obj: T, fn: (value: any) => any): T` - Transform values
- [ ] `invertObject(obj: Record<string, any>): Record<string, string>` - Swap keys/values

---

### 7. Async Utilities (`/async`)

#### Implemented ✅
- [ ] `sleep(ms: number): Promise<void>` - Async sleep/delay
- [ ] `retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>` - Retry with backoff
- [ ] `timeout<T>(promise: Promise<T>, ms: number): Promise<T>` - Promise with timeout
- [ ] `debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T` - Debounce function
- [ ] `throttle<T extends (...args: any[]) => any>(fn: T, limit: number): T` - Throttle function
- [ ] `asyncPool<T, R>(poolLimit: number, array: T[], fn: (item: T) => Promise<R>): Promise<R[]>` - Concurrent execution pool
- [ ] `race<T>(promises: Promise<T>[], timeoutMs?: number): Promise<T>` - Promise race with timeout
- [ ] `allSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]>` - All settled polyfill

---

### 8. Function Utilities (`/function`)

#### Implemented ✅
- [ ] `memoize<T extends (...args: any[]) => any>(fn: T): T` - Memoize function
- [ ] `once<T extends (...args: any[]) => any>(fn: T): T` - Execute only once
- [ ] `noop(): void` - No-operation function
- [ ] `compose<T>(...fns: Function[]): (arg: T) => any` - Function composition
- [ ] `pipe<T>(...fns: Function[]): (arg: T) => any` - Function piping
- [ ] `curry<T extends (...args: any[]) => any>(fn: T): any` - Curry function

---

### 9. URL Utilities (`/url`)

#### Implemented ✅
- [ ] `buildUrl(base: string, params: Record<string, any>): string` - Build URL with params
- [ ] `parseQueryString(query: string): Record<string, string>` - Parse query string
- [ ] `stringifyQueryString(params: Record<string, any>): string` - Stringify to query string
- [ ] `getQueryParam(url: string, param: string): string | null` - Get param from URL
- [ ] `addQueryParam(url: string, key: string, value: string): string` - Add query param
- [ ] `removeQueryParam(url: string, key: string): string` - Remove query param
- [ ] `getDomain(url: string): string` - Extract domain
- [ ] `isAbsoluteUrl(url: string): boolean` - Check if absolute URL
- [ ] `joinPaths(...paths: string[]): string` - Join URL paths safely

---

### 10. Color Utilities (`/color`)

#### Implemented ✅
- [ ] `hexToRgb(hex: string): { r: number; g: number; b: number }` - Convert hex to RGB
- [ ] `rgbToHex(r: number, g: number, b: number): string` - Convert RGB to hex
- [ ] `hexToHsl(hex: string): { h: number; s: number; l: number }` - Convert hex to HSL
- [ ] `hslToHex(h: number, s: number, l: number): string` - Convert HSL to hex
- [ ] `lighten(color: string, amount: number): string` - Lighten color
- [ ] `darken(color: string, amount: number): string` - Darken color
- [ ] `adjustAlpha(color: string, alpha: number): string` - Adjust opacity
- [ ] `getContrastColor(bgColor: string): string` - Get contrasting text color
- [ ] `randomColor(): string` - Generate random color

---

### 11. Crypto Utilities (`/crypto`)

#### Implemented ✅
- [ ] `generateId(length?: number): string` - Generate unique ID
- [ ] `generateUUID(): string` - Generate UUID v4
- [ ] `hashString(text: string): string` - Simple hash for non-crypto use
- [ ] `randomString(length: number, charset?: string): string` - Random string
- [ ] `generateToken(length?: number): string` - Generate secure token
- [ ] `encodeBase64(text: string): string` - Base64 encode
- [ ] `decodeBase64(encoded: string): string` - Base64 decode

---

### 12. Browser Utilities (`/browser`) - Client-Side Only

#### Implemented ✅
- [ ] `copyToClipboard(text: string): Promise<void>` - Copy to clipboard
- [ ] `downloadFile(data: any, filename: string, type?: string): void` - Trigger file download
- [ ] `getScrollPosition(): { x: number; y: number }` - Get scroll position
- [ ] `scrollToTop(smooth?: boolean): void` - Scroll to top
- [ ] `scrollToElement(element: HTMLElement, smooth?: boolean): void` - Scroll to element
- [ ] `isInViewport(element: HTMLElement): boolean` - Check if in viewport
- [ ] `getDeviceType(): 'mobile' | 'tablet' | 'desktop'` - Detect device type
- [ ] `isTouchDevice(): boolean` - Check if touch device
- [ ] `detectBrowser(): string` - Detect browser

---

### 13. Storage Utilities (`/storage`) - Client-Side Only

#### Implemented ✅
- [ ] `setLocalStorage<T>(key: string, value: T): void` - Set localStorage with JSON
- [ ] `getLocalStorage<T>(key: string): T | null` - Get from localStorage with JSON
- [ ] `removeLocalStorage(key: string): void` - Remove from localStorage
- [ ] `clearLocalStorage(): void` - Clear all localStorage
- [ ] `setSessionStorage<T>(key: string, value: T): void` - Set sessionStorage
- [ ] `getSessionStorage<T>(key: string): T | null` - Get from sessionStorage
- [ ] `setStorageWithExpiry<T>(key: string, value: T, ttl: number): void` - Storage with TTL
- [ ] `getStorageWithExpiry<T>(key: string): T | null` - Get storage with TTL check

---

### 14. Constants (`/constants`)

#### Implemented ✅
- [ ] HTTP status codes
- [ ] Common MIME types
- [ ] Country codes (ISO 3166)
- [ ] Currency codes (ISO 4217)
- [ ] Language codes (ISO 639)
- [ ] Regular expressions (email, URL, phone, etc.)
- [ ] Common error messages

---

### 15. TypeScript Types (`/types`)

#### Implemented ✅
- [ ] `Prettify<T>` - Flatten intersection types
- [ ] `DeepPartial<T>` - Deep partial type
- [ ] `DeepRequired<T>` - Deep required type
- [ ] `Nullable<T>` - Make properties nullable
- [ ] `ValueOf<T>` - Extract value types
- [ ] `KeysOfType<T, V>` - Keys matching type
- [ ] `PromiseType<T>` - Extract promise type
- [ ] `ArrayElement<T>` - Extract array element type

---

## Package Structure

```
packages/utils/
├── package.json
├── tsconfig.json
├── SCOPE.md (this file)
├── README.md
├── src/
│   ├── index.ts (main exports)
│   ├── string/
│   │   ├── index.ts
│   │   ├── slugify.ts
│   │   ├── truncate.ts
│   │   └── ... (other string utils)
│   ├── date/
│   │   ├── index.ts
│   │   ├── format.ts
│   │   └── ... (other date utils)
│   ├── validation/
│   ├── number/
│   ├── array/
│   ├── object/
│   ├── async/
│   ├── function/
│   ├── url/
│   ├── color/
│   ├── crypto/
│   ├── browser/
│   ├── storage/
│   ├── constants/
│   └── types/
└── tests/
    ├── string.test.ts
    ├── date.test.ts
    └── ... (test files)
```

---

## Usage Examples

```typescript
// String utilities
import { slugify, truncate } from '@labs/utils/string'
slugify('Hello World!') // 'hello-world'
truncate('Long text...', 10) // 'Long te...'

// Date utilities
import { formatRelative, addDays } from '@labs/utils/date'
formatRelative(new Date()) // '2 hours ago'
addDays(new Date(), 7) // Date 7 days from now

// Validation
import { isEmail, isStrongPassword } from '@labs/utils/validation'
isEmail('test@example.com') // true

// Array utilities
import { unique, groupBy } from '@labs/utils/array'
unique([1, 2, 2, 3]) // [1, 2, 3]

// Object utilities
import { pick, deepMerge } from '@labs/utils/object'
pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }

// Async utilities
import { sleep, retry, debounce } from '@labs/utils/async'
await sleep(1000) // Wait 1 second
```

---

## Implementation Checklist

- [ ] Set up package.json with proper exports
- [ ] Configure TypeScript with strict mode
- [ ] Implement string utilities
- [ ] Implement date utilities
- [ ] Implement validation utilities
- [ ] Implement number utilities
- [ ] Implement array utilities
- [ ] Implement object utilities
- [ ] Implement async utilities
- [ ] Implement function utilities
- [ ] Implement URL utilities
- [ ] Implement color utilities
- [ ] Implement crypto utilities
- [ ] Implement browser utilities (client-only)
- [ ] Implement storage utilities (client-only)
- [ ] Define constants
- [ ] Define TypeScript utility types
- [ ] Write comprehensive tests (100% coverage)
- [ ] Add JSDoc comments
- [ ] Create README with examples
- [ ] Set up CI/CD for testing

---

## Success Criteria

✅ Zero external dependencies
✅ Full TypeScript support with strict mode
✅ 100% test coverage
✅ Tree-shakeable ESM modules
✅ Comprehensive JSDoc documentation
✅ Works in Node.js and browser (with appropriate guards)
✅ Fast bundle size (< 50KB total, individual imports < 1KB)
