/**
 * TypeScript utility types
 */

/**
 * Prettify - Flatten intersection types for better IntelliSense
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Deep partial - Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep required - Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Nullable - Make all properties nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * ValueOf - Extract value types from object
 */
export type ValueOf<T> = T[keyof T];

/**
 * KeysOfType - Get keys matching specific type
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * PromiseType - Extract promise type
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/**
 * ArrayElement - Extract array element type
 */
export type ArrayElement<T> = T extends (infer E)[] ? E : T;

/**
 * NonNullableFields - Make specific fields non-nullable
 */
export type NonNullableFields<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

/**
 * PartialBy - Make specific fields optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * RequiredBy - Make specific fields required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
