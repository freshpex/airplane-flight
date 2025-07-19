


export const setWithExpiry = (key: string, value: any, ttl: number) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        console.warn('[setWithExpiry] localStorage not available (SSR or browser restriction)')
        return false
    }

    try {
        const now = new Date()
        const expiry = ttl * 3600000;

        const item = {
            value: value,
            expiry: now.getTime() + expiry,
        }
        const hashed = JSON.stringify(item)
        localStorage.setItem(key, hashed)
        console.debug(`[setWithExpiry] Successfully stored item for key: ${key}`)
        return true
    } catch (e) {
        console.error(`[setWithExpiry] Error storing item for key ${key}:`, e)
        return false
    }
}

export const removeWithExpiry = (key: string) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        console.warn('[removeWithExpiry] localStorage not available (SSR or browser restriction)')
        return false
    }

    try {
        localStorage.removeItem(key)
        console.debug(`[removeWithExpiry] Successfully removed item for key: ${key}`)
        return true
    } catch (e) {
        console.error(`[removeWithExpiry] Error removing item for key ${key}:`, e)
        return false
    }
}

export const getWithExpiry = (key: string) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        console.warn('[getWithExpiry] localStorage not available (SSR or browser restriction)')
        return null
    }

    try {
        const itemStr = localStorage.getItem(key)
        
        // Return null if item doesn't exist
        if (!itemStr) {
            console.debug(`[getWithExpiry] No item found for key: ${key}`)
            return null
        }

        const item = JSON.parse(itemStr)
        const now = new Date()
        
        // Compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, remove it from storage and return null
            console.debug(`[getWithExpiry] Item expired for key: ${key}`)
            localStorage.removeItem(key)
            return null
        }
        
        console.debug(`[getWithExpiry] Successfully retrieved item for key: ${key}`)
        return item.value
    } catch (e) {
        // If there's any error in parsing, remove the item and return null
        console.error(`[getWithExpiry] Error accessing localStorage for key ${key}:`, e)
        try {
            localStorage.removeItem(key)
        } catch (removeError) {
            console.error(`[getWithExpiry] Error removing invalid item for key ${key}:`, removeError)
        }
        return null
    }
}
