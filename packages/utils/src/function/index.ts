/**
 * Memoize function - cache results based on arguments
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return function memoized(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

/**
 * Once - execute function only once
 * @param fn - Function to execute once
 * @returns Function that executes only once
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  
  return function onced(...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  } as T;
}

/**
 * No-operation function
 */
export function noop(): void {
  // Do nothing
}

/**
 * Function composition (right to left)
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<T>(...fns: Function[]): (arg: T) => any {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Function piping (left to right)
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<T>(...fns: Function[]): (arg: T) => any {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}
