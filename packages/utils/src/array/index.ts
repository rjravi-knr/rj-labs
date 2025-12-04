/**
 * Remove duplicate values from array
 * @param array - Array with potential duplicates
 * @returns Array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Remove duplicate objects by key
 * @param array - Array of objects
 * @param key - Key to check for uniqueness
 * @returns Array with unique objects
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Split array into chunks
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array randomly
 * @param array - Array to shuffle
 * @returns Shuffled array (new array)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Get random element from array
 * @param array - Array to sample from
 * @returns Random element
 */
export function sample<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get N random elements from array
 * @param array - Array to sample from
 * @param n - Number of elements to sample
 * @returns Array of random elements
 */
export function sampleSize<T>(array: T[], n: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(n, array.length));
}

/**
 * Group array of objects by key
 * @param array - Array of objects
 * @param key - Key to group by
 * @returns Object with grouped arrays
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Sort array of objects by key
 * @param array - Array of objects
 * @param key - Key to sort by
 * @param order - Sort order (default: 'asc')
 * @returns Sorted array
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Flatten nested arrays
 * @param array - Nested array
 * @returns Flattened array
 */
export function flatten<T>(array: any[]): T[] {
  return array.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val);
  }, []);
}

/**
 * Get difference between two arrays (items in arr1 but not in arr2)
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Difference array
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Get intersection of two arrays (items in both)
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Intersection array
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Remove falsy values from array
 * @param array - Array with potential falsy values
 * @returns Compacted array
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(Boolean) as T[];
}

/**
 * Partition array by predicate
 * @param array - Array to partition
 * @param predicate - Function to test each element
 * @returns Tuple of [matching, non-matching]
 */
export function partition<T>(
  array: T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  const matching: T[] = [];
  const nonMatching: T[] = [];
  
  array.forEach((item) => {
    if (predicate(item)) {
      matching.push(item);
    } else {
      nonMatching.push(item);
    }
  });
  
  return [matching, nonMatching];
}

/**
 * Get nth element (supports negative indices)
 * @param array - Array
 * @param index - Index (negative counts from end)
 * @returns Element at index or undefined
 */
export function nth<T>(array: T[], index: number): T | undefined {
  const actualIndex = index < 0 ? array.length + index : index;
  return array[actualIndex];
}
