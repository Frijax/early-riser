import type { CacheEntry } from '@/types'

export class StorageCache {
  private storage: Storage
  private prefix: string

  constructor(prefix = 'early-riser-cache') {
    this.storage = localStorage
    this.prefix = prefix
  }

  /**
   * Get value from localStorage
   */
  get<T>(key: string): T | null {
    try {
      const fullKey = this.getFullKey(key)
      const item = this.storage.getItem(fullKey)

      if (!item) {
        return null
      }

      const entry: CacheEntry<T> = JSON.parse(item)

      // Check if expired
      const now = Date.now()
      if (now > entry.timestamp + entry.ttl) {
        this.storage.removeItem(fullKey)
        return null
      }

      return entry.data
    } catch (error) {
      console.error('StorageCache.get error:', error)
      return null
    }
  }

  /**
   * Set value in localStorage with TTL
   */
  set<T>(key: string, data: T, ttl: number): void {
    try {
      const fullKey = this.getFullKey(key)
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      }

      this.storage.setItem(fullKey, JSON.stringify(entry))
    } catch (error) {
      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, clearing old entries')
        this.clearExpired()
        // Try again
        try {
          this.storage.setItem(this.getFullKey(key), JSON.stringify({ data, timestamp: Date.now(), ttl }))
        } catch {
          console.error('Failed to set cache after clearing')
        }
      }
    }
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Invalidate a specific key
   */
  invalidate(key: string): void {
    this.storage.removeItem(this.getFullKey(key))
  }

  /**
   * Invalidate all keys matching a pattern
   */
  invalidatePattern(pattern: RegExp): void {
    const keysToDelete: string[] = []

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix) && pattern.test(key)) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => this.storage.removeItem(key))
  }

  /**
   * Clear all cache entries with this prefix
   */
  clear(): void {
    const keysToDelete: string[] = []

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => this.storage.removeItem(key))
  }

  /**
   * Clear only expired entries
   */
  clearExpired(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        try {
          const item = this.storage.getItem(key)
          if (item) {
            const entry: CacheEntry<unknown> = JSON.parse(item)
            if (now > entry.timestamp + entry.ttl) {
              keysToDelete.push(key)
            }
          }
        } catch {
          // If parse fails, delete the entry
          keysToDelete.push(key)
        }
      }
    }

    keysToDelete.forEach((key) => this.storage.removeItem(key))
  }

  /**
   * Get full cache key with prefix
   */
  private getFullKey(key: string): string {
    return `${this.prefix}:${key}`
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    count: number
    sizeEstimate: number
  } {
    let count = 0
    let sizeEstimate = 0

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        count++
        const item = this.storage.getItem(key)
        if (item) {
          sizeEstimate += item.length
        }
      }
    }

    return { count, sizeEstimate }
  }
}
