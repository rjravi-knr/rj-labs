# @labs/utils

> Comprehensive, type-safe utility library for TypeScript/JavaScript applications with **zero dependencies**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Tree-shakeable](https://img.shields.io/badge/tree--shakeable-✓-success)](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)

## Features

✨ **150+ Utility Functions** across 11 categories  
🎯 **100% TypeScript** with strict typing  
📦 **Zero Dependencies** - completely standalone  
🌳 **Tree-Shakeable** - only bundle what you use  
🚀 **Production-Ready** - battle-tested utilities  
📝 **Well-Documented** - JSDoc for excellent IntelliSense  

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @labs/utils

# Using npm
npm install @labs/utils

# Using yarn
yarn add @labs/utils
```

---

## Quick Start

```typescript
// Import entire module
import { slugify, formatDate, isEmail } from '@labs/utils';

// Or import specific categories (better for tree-shaking)
import { slugify, capitalize } from '@labs/utils/string';
import { formatRelative } from '@labs/utils/date';
import { isEmail } from '@labs/utils/validation';

// Use the utilities
const slug = slugify('Hello World!'); // => 'hello-world'
const time = formatRelative(new Date()); // => '2 hours ago'
const valid = isEmail('test@example.com'); // => true
```

---

## Utility Categories

### 🔤 String Utilities

```typescript
import * as str from '@labs/utils/string';

// Case conversion
str.slugify('Hello World!')                 // => 'hello-world'
str.camelCase('hello-world')                // => 'helloWorld'
str.pascalCase('hello world')               // => 'HelloWorld'
str.snakeCase('helloWorld')                 // => 'hello_world'
str.kebabCase('helloWorld')                 // => 'hello-world'

// Text manipulation
str.truncate('Long text...', 10)            // => 'Long te...'
str.capitalize('hello')                     // => 'Hello'
str.capitalizeWords('hello world')          // => 'Hello World'
str.mask('1234567890', '*', 4)             // => '******7890'
str.excerpt('Many words here', 2)           // => 'Many words...'

// HTML utilities
str.escapeHtml('<div>Content</div>')        // => '&lt;div&gt;Content&lt;/div&gt;'
str.stripHtml('<p>Text</p>')               // => 'Text'
str.removeDiacritics('café')                // => 'cafe'
```

### 📅 Date/Time Utilities

```typescript
import * as date from '@labs/utils/date';

// Formatting
date.formatDate(new Date(), 'YYYY-MM-DD')   // => '2024-12-04'
date.formatRelative(new Date())             // => 'just now'
date.formatDuration(125000)                 // => '2m 5s'

// Date arithmetic
date.addDays(new Date(), 7)                 // => Date 7 days from now
date.addHours(new Date(), 2)                // => Date 2 hours from now
date.diffInDays(date1, date2)               // => 5

// Date comparisons
date.isToday(new Date())                    // => true
date.isTomorrow(tomorrow)                   // => true
date.isSameDay(date1, date2)                // => false

// Date ranges
date.startOfDay(new Date())                 // => Today at 00:00:00
date.endOfDay(new Date())                   // => Today at 23:59:59
```

### ✅ Validation Utilities

```typescript
import * as validation from '@labs/utils/validation';

// Format validation
validation.isEmail('test@example.com')              // => true
validation.isUrl('https://example.com')             // => true
validation.isPhone('+1 234 567 8900')              // => true
validation.isUUID('550e8400-e29b-41d4-a716-446655440000') // => true
validation.isIPAddress('192.168.1.1')              // => true
validation.isHexColor('#ff6b6b')                   // => true

// Content validation
validation.isCreditCard('4532015112830366')        // => true (Luhn)
validation.isStrongPassword('MyP@ssw0rd!')         // => true
validation.validatePasswordStrength('weak')         // => 'weak' | 'fair' | 'good' | 'strong'
validation.isJSON('{"key": "value"}')              // => true
validation.isBase64('SGVsbG8=')                    // => true
```

### 🔢 Number Utilities

```typescript
import * as num from '@labs/utils/number';

// Formatting
num.formatNumber(1234567)                   // => '1,234,567'
num.formatCurrency(99.99, 'USD')           // => '$99.99'
num.formatPercentage(0.856)                // => '85.60%'
num.formatBytes(1536)                      // => '1.5 KB'

// Math utilities
num.clamp(150, 0, 100)                     // => 100
num.random(1, 10)                          // => Random int 1-10
num.round(3.14159, 2)                      // => 3.14

// Statistics
num.average([1, 2, 3, 4, 5])               // => 3
num.sum([1, 2, 3, 4, 5])                   // => 15
num.median([1, 2, 3, 4, 5])                // => 3
num.percentage(25, 100)                    // => 25

// Interpolation
num.lerp(0, 100, 0.5)                      // => 50
num.mapRange(50, 0, 100, 0, 1)             // => 0.5
```

### 📋 Array Utilities

```typescript
import * as arr from '@labs/utils/array';

// Unique & filtering
arr.unique([1, 2, 2, 3])                   // => [1, 2, 3]
arr.uniqueBy(users, 'id')                  // => Unique users by ID
arr.compact([0, 1, false, 2, '', 3])       // => [1, 2, 3]

// Transformation
arr.chunk([1, 2, 3, 4, 5], 2)              // => [[1, 2], [3, 4], [5]]
arr.shuffle([1, 2, 3, 4, 5])               // => Randomly shuffled
arr.flatten([[1, 2], [3, 4]])              // => [1, 2, 3, 4]

// Sampling
arr.sample([1, 2, 3, 4, 5])                // => Random element
arr.sampleSize([1, 2, 3, 4, 5], 3)         // => 3 random elements

// Organization
arr.groupBy(users, 'role')                 // => { admin: [...], user: [...] }
arr.sortBy(users, 'age', 'desc')           // => Sorted by age descending
arr.partition(nums, n => n > 10)           // => [[>10], [<=10]]

// Set operations
arr.difference([1, 2, 3], [2, 3, 4])       // => [1]
arr.intersection([1, 2, 3], [2, 3, 4])     // => [2, 3]
```

### 🗂️ Object Utilities

```typescript
import * as obj from '@labs/utils/object';

// Property selection
obj.pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])         // => { a: 1, b: 2 }
obj.omit({ a: 1, b: 2, c: 3 }, ['c'])              // => { a: 1, b: 2 }

// Deep operations
obj.deepClone(complexObject)                        // => Deep copy
obj.deepMerge(obj1, obj2, obj3)                    // => Merged object
obj.isEmpty({})                                     // => true

// Nested access
obj.getNestedValue(user, 'address.city')            // => 'New York'
obj.setNestedValue(user, 'address.city', 'Boston')  // Sets nested value
obj.hasNestedProperty(user, 'address.city')         // => true

// Flattening
obj.flattenObject({ a: { b: { c: 1 } } })           // => { 'a.b.c': 1 }
obj.unflattenObject({ 'a.b.c': 1 })                 // => { a: { b: { c: 1 } } }

// Transformation
obj.mapKeys(obj, key => key.toUpperCase())          // => Keys uppercased
obj.mapValues(obj, val => val * 2)                  // => Values doubled
obj.invertObject({ a: '1', b: '2' })                // => { '1': 'a', '2': 'b' }
```

### ⚡ Async Utilities

```typescript
import * as async from '@labs/utils/async';

// Delays & timing
await async.sleep(1000);                    // Wait 1 second

// Retry with exponential backoff
const data = await async.retry(
  () => fetchData(),
  { maxAttempts: 3, delay: 1000, backoff: 2 }
);

// Timeout
const result = await async.timeout(
  slowPromise,
  5000  // Timeout after 5s
);

// Rate limiting
const debouncedFn = async.debounce(saveToDB, 500);
const throttledFn = async.throttle(trackEvent, 1000);

// Concurrent execution pool
const results = await async.asyncPool(
  3,  // Max 3 concurrent
  items,
  async (item) => processItem(item)
);
```

### 🔧 Function Utilities

```typescript
import * as fn from '@labs/utils/function';

// Memoization
const expensiveFn = fn.memoize((x, y) => {
  // Cached based on arguments
  return x + y;
});

// Execute once
const initFn = fn.once(() => {
  console.log('Only runs once');
});

// Function composition
const transform = fn.compose(
  (x) => x * 2,
  (x) => x + 1,
  (x) => x.toString()
);
transform(5); // => '11'

// Function piping
const process = fn.pipe(
  (x) => x + 1,
  (x) => x * 2,
  (x) => x.toString()
);
process(5); // => '12'
```

### 🔗 URL Utilities

```typescript
import * as url from '@labs/utils/url';

// URL building
url.buildUrl('https://api.com', { page: 1, limit: 10 });
// => 'https://api.com?page=1&limit=10'

// Query string parsing
url.parseQueryString('?page=1&limit=10');
// => { page: '1', limit: '10' }

url.stringifyQueryString({ page: 1, limit: 10 });
// => 'page=1&limit=10'

// URL manipulation
url.addQueryParam(url, 'sort', 'date');      // Add param
url.removeQueryParam(url, 'page');           // Remove param
url.getQueryParam(url, 'page');              // Get param

// URL inspection
url.getDomain('https://example.com/path');   // => 'example.com'
url.isAbsoluteUrl('https://example.com');    // => true
url.joinPaths('/api', 'users', '123');       // => '/api/users/123'
```

### 🔐 Crypto Utilities

```typescript
import * as crypto from '@labs/utils/crypto';

// ID generation
crypto.generateId()                          // => 'X7KpL2mN9qR4sT6vY8zB1'
crypto.generateUUID()                        // => '550e8400-e29b-41d4...'
crypto.generateToken(32)                     // => Secure 32-char token

// Random generation
crypto.randomString(16)                      // => 'aB3dE5fG7hJ9kL2m'
crypto.randomString(8, '0123456789')        // => '57382910'

// Hashing (non-crypto)
crypto.hashString('hello')                   // => Simple hash

// Base64
crypto.encodeBase64('Hello')                 // => 'SGVsbG8='
crypto.decodeBase64('SGVsbG8=')             // => 'Hello'
```

### 🎨 TypeScript Types

```typescript
import type { Prettify, DeepPartial, ValueOf } from '@labs/utils/types';

// Prettify - Flatten intersection types
type User = Prettify<UserBase & UserProfile>;

// Deep Partial - All properties optional recursively
type PartialConfig = DeepPartial<Config>;

// Deep Required - All properties required recursively
type RequiredConfig = DeepRequired<Config>;

// Nullable - Make all properties nullable
type NullableUser = Nullable<User>;

// ValueOf - Extract value types
type Status = ValueOf<typeof STATUS_MAP>;

// KeysOfType - Get keys matching type
type StringKeys = KeysOfType<User, string>;

// PromiseType - Extract promise type
type Data = PromiseType<typeof fetchData>;

// ArrayElement - Extract array element type
type Item = ArrayElement<typeof items>;
```

---

## Tree-Shaking

Import only what you need for optimal bundle size:

```typescript
// ❌ Imports entire library
import { slugify } from '@labs/utils';

// ✅ Better - imports only string utilities
import { slugify } from '@labs/utils/string';

// ✅ Best - direct import (if supported by bundler)
import { slugify } from '@labs/utils/string/slugify';
```

---

## TypeScript Support

Full TypeScript support with:
- **Strict type checking**
- **Generic type parameters**
- **Type guards** (e.g., `isValidDate`)
- **Utility types** for advanced type manipulation
- **JSDoc comments** for excellent IntelliSense

---

## Browser vs Node.js

Most utilities work in both environments. Some utilities are environment-specific:

**Node.js only:**
- Base64 encoding/decoding (uses Buffer)

**Browser only:**
- Browser utilities (`/browser`) - coming soon
- Storage utilities (`/storage`) - coming soon

---

## Performance

- **Zero dependencies** = minimal overhead
- **Tree-shakeable** = only bundle what you use
- **Optimized algorithms** = fast execution
- **Memoization** = cache expensive computations

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for development guidelines.

---

## License

MIT © RJ Labs

---

## API Documentation

For complete API documentation with all functions, see [SCOPE.md](./SCOPE.md).
