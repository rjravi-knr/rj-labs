/**
 * Storage Utility
 * Wrapper around localStorage to provide centralized management, type safety, 
 * and future extensibility (e.g. encryption).
 */

/**
 * Storage Utility
 * Wrapper around localStorage/sessionStorage to provide centralized management, type safety,
 * and future extensibility (e.g. encryption).
 */

type StorageType = 'localStorage' | 'sessionStorage';

interface StorageItem<T> {
    value: T;
    expiry?: number;
}

class StorageManager {
    private type: StorageType;

    constructor(type: StorageType = 'localStorage') {
        this.type = type;
    }

    private get storage(): Storage | null {
        if (typeof window !== 'undefined') {
            return window[this.type];
        }
        return null; // Handle SSR
    }

    /**
     * Get a value from storage
     * @param key The key to retrieve
     * @returns The value or null if not found
     */
    get(key: string): string | null {
        return this.storage?.getItem(key) ?? null;
    }

    /**
     * Set a value in storage
     * @param key The key to set
     * @param value The value to store
     */
    set(key: string, value: string): void {
        this.storage?.setItem(key, value);
    }

    /**
     * Set multiple values in storage at once
     * @param items Array of key-value pairs to store
     */
    setMultiple(items: { key: string; value: string }[]): void {
        const store = this.storage;
        if (!store) return;
        
        items.forEach(({ key, value }) => {
            store.setItem(key, value);
        });
    }

    /**
     * Remove a value from storage
     * @param key The key to remove
     */
    remove(key: string): void {
        this.storage?.removeItem(key);
    }

    /**
     * Clear all data from storage
     */
    clear(): void {
        this.storage?.clear();
    }
    
    /**
     * Get a JSON object from storage
     * @param key The key to retrieve
     * @returns The parsed object or null if not found/invalid
     */
    getJSON<T>(key: string): T | null {
        const item = this.get(key);
        if (!item) return null;
        try {
            return JSON.parse(item) as T;
        } catch (e) {
            console.error(`Error parsing storage key "${key}":`, e);
            return null;
        }
    }

    /**
     * Set a JSON object in storage
     * @param key The key to set
     * @param value The object to store
     */
    setJSON(key: string, value: any): void {
        this.set(key, JSON.stringify(value));
    }

    /**
     * Set a value with a Time-To-Live (expiry)
     * @param key The key to set
     * @param value The value to store
     * @param ttl Time to live in milliseconds
     */
    setWithExpiry<T>(key: string, value: T, ttl: number): void {
        const now = new Date();
        const item: StorageItem<T> = {
            value: value,
            expiry: now.getTime() + ttl,
        };
        this.setJSON(key, item);
    }

    /**
     * Get a value that was set with expiry
     * @param key The key to retrieve
     * @returns The value or null if expired/not found
     */
    getWithExpiry<T>(key: string): T | null {
        const item = this.getJSON<StorageItem<T>>(key);
        if (!item) return null;

        if (item.expiry && new Date().getTime() > item.expiry) {
            this.remove(key);
            return null;
        }
        return item.value;
    }
}

// Export instances
export const storage = new StorageManager('localStorage');
export const session = new StorageManager('sessionStorage');

// --- Functional Aliases (as per SCOPE.md) ---

/** Set localStorage with JSON */
export function setLocalStorage<T>(key: string, value: T): void {
    storage.setJSON(key, value);
}

/** Get from localStorage with JSON */
export function getLocalStorage<T>(key: string): T | null {
    return storage.getJSON<T>(key);
}

/** Remove from localStorage */
export function removeLocalStorage(key: string): void {
    storage.remove(key);
}

/** Clear all localStorage */
export function clearLocalStorage(): void {
    storage.clear();
}

/** Set sessionStorage */
export function setSessionStorage<T>(key: string, value: T): void {
    session.setJSON(key, value);
}

/** Get from sessionStorage */
export function getSessionStorage<T>(key: string): T | null {
    return session.getJSON<T>(key);
}

/** Storage with TTL (defaults to localStorage) */
export function setStorageWithExpiry<T>(key: string, value: T, ttl: number): void {
    storage.setWithExpiry(key, value, ttl);
}

/** Get storage with TTL check (defaults to localStorage) */
export function getStorageWithExpiry<T>(key: string): T | null {
    return storage.getWithExpiry<T>(key);
}
