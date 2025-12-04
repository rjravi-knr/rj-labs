/**
 * Pick specific properties from object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with picked properties
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Omit specific properties from object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted properties
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

/**
 * Check if object/array/string is empty
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clone object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * Deep merge multiple objects
 * @param objects - Objects to merge
 * @returns Merged object
 */
export function deepMerge<T>(...objects: Partial<T>[]): T {
  const result: any = {};
  
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const value = (obj as any)[key];
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = deepMerge(result[key] || {}, value);
      } else {
        result[key] = value;
      }
    });
  });
  
  return result;
}

/**
 * Flatten nested object to dot notation
 * @param obj - Object to flatten
 * @param prefix - Optional prefix for keys
 * @returns Flattened object
 */
export function flattenObject(obj: object, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};
  
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  });
  
  return result;
}

/**
 * Unflatten object from dot notation
 * @param obj - Flattened object
 * @returns Nested object
 */
export function unflattenObject(obj: Record<string, any>): object {
  const result: any = {};
  
  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split('.');
    let current = result;
    
    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        current[k] = value;
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  });
  
  return result;
}

/**
 * Get nested property value safely
 * @param obj - Object to get from
 * @param path - Dot notation path (e.g., 'user.address.city')
 * @returns Value at path or undefined
 */
export function getNestedValue(obj: object, path: string): any {
  return path.split('.').reduce((current: any, key) => current?.[key], obj);
}

/**
 * Set nested property value
 * @param obj - Object to set on (mutates)
 * @param path - Dot notation path
 * @param value - Value to set
 */
export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  
  const target = keys.reduce((current, key) => {
    if (!(key in current)) {
      current[key] = {};
    }
    return current[key];
  }, obj);
  
  target[lastKey] = value;
}

/**
 * Check if nested property exists
 * @param obj - Object to check
 * @param path - Dot notation path
 * @returns True if property exists
 */
export function hasNestedProperty(obj: object, path: string): boolean {
  return getNestedValue(obj, path) !== undefined;
}

/**
 * Transform object keys
 * @param obj - Object to transform
 * @param fn - Function to transform keys
 * @returns Object with transformed keys
 */
export function mapKeys<T>(obj: T, fn: (key: string) => string): T {
  const result: any = {};
  Object.entries(obj as any).forEach(([key, value]) => {
    result[fn(key)] = value;
  });
  return result;
}

/**
 * Transform object values
 * @param obj - Object to transform
 * @param fn - Function to transform values
 * @returns Object with transformed values
 */
export function mapValues<T>(obj: T, fn: (value: any) => any): T {
  const result: any = {};
  Object.entries(obj as any).forEach(([key, value]) => {
    result[key] = fn(value);
  });
  return result;
}

/**
 * Invert object (swap keys and values)
 * @param obj - Object to invert
 * @returns Inverted object
 */
export function invertObject(obj: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[String(value)] = key;
  });
  return result;
}
