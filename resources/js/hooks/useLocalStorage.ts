import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with synchronization across components
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 * @returns [storedValue, setValue, clearValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            // Save state
            setStoredValue(valueToStore);
            
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            
            // Dispatch storage event to sync across components/tabs
            window.dispatchEvent(new StorageEvent('storage', {
                key,
                newValue: JSON.stringify(valueToStore),
                storageArea: localStorage
            }));
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    // Clear value from localStorage and state
    const clearValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            window.localStorage.removeItem(key);
            
            // Dispatch storage event
            window.dispatchEvent(new StorageEvent('storage', {
                key,
                newValue: null,
                storageArea: localStorage
            }));
        } catch (error) {
            console.log(error);
        }
    }, [key, initialValue]);

    // Listen for changes to this localStorage key from other tabs/components
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const newValue = JSON.parse(e.newValue);
                    setStoredValue(newValue);
                } catch (error) {
                    console.log('Error parsing localStorage value:', error);
                }
            }
        };

        // Listen for storage events (from other tabs or manual dispatches)
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    // Also listen for manual refresh of localStorage
    useEffect(() => {
        const handleRefresh = () => {
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    const newValue = JSON.parse(item);
                    setStoredValue(newValue);
                }
            } catch (error) {
                console.log('Error refreshing localStorage value:', error);
            }
        };

        // Custom event for manual refresh
        window.addEventListener('localStorage-refresh', handleRefresh);
        
        return () => {
            window.removeEventListener('localStorage-refresh', handleRefresh);
        };
    }, [key]);

    return [storedValue, setValue, clearValue] as const;
}

/**
 * Force refresh of localStorage values across all useLocalStorage hooks
 */
export function refreshLocalStorage() {
    window.dispatchEvent(new Event('localStorage-refresh'));
}
