import { MemoryCache } from './memoryCache'
import { StorageCache } from './storageCache'

// TTL constants (in milliseconds)
export const TTL = {
  NEWS: 5 * 60 * 1000, // 5 minutes
  MARKET_QUOTE: 30 * 1000, // 30 seconds
  HISTORICAL_DATA: 60 * 60 * 1000, // 1 hour
  STATIC_DATA: 24 * 60 * 60 * 1000, // 24 hours
  USER_DATA: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const

// Cache interface
export interface Cache {
  get<T>(key: string): T | null
  set<T>(key: string, data: T, ttl: number): void
  has(key: string): boolean
  invalidate(key: string): void
  invalidatePattern(pattern: RegExp): void
  clear(): void
}

/**
 * Unified cache that uses both memory and storage
 */
export class HybridCache implements Cache {
  private memoryCache: MemoryCache
  private storageCache: StorageCache

  constructor() {
    this.memoryCache = new MemoryCache({ maxSize: 100 })
    this.storageCache = new StorageCache()
  }

  /**
   * Get from memory first, then storage
   */
  get<T>(key: string): T | null {
    // Try memory cache first
    const memoryValue = this.memoryCache.get<T>(key)
    if (memoryValue !== null) {
      return memoryValue
    }

    // Fall back to storage cache
    const storageValue = this.storageCache.get<T>(key)
    if (storageValue !== null) {
      // Warm up memory cache
      this.memoryCache.set(key, storageValue, TTL.NEWS) // Use default TTL
      return storageValue
    }

    return null
  }

  /**
   * Set in both memory and storage (for important data)
   * Use memory-only for high-frequency, short-lived data
   */
  set<T>(key: string, data: T, ttl: number, persistToStorage = false): void {
    this.memoryCache.set(key, data, ttl)

    if (persistToStorage) {
      this.storageCache.set(key, data, ttl)
    }
  }

  /**
   * Set only in memory (for volatile data)
   */
  setMemory<T>(key: string, data: T, ttl: number): void {
    this.memoryCache.set(key, data, ttl)
  }

  /**
   * Set only in storage (for persistent data)
   */
  setStorage<T>(key: string, data: T, ttl: number): void {
    this.storageCache.set(key, data, ttl)
  }

  /**
   * Check if key exists in either cache
   */
  has(key: string): boolean {
    return this.memoryCache.has(key) || this.storageCache.has(key)
  }

  /**
   * Invalidate from both caches
   */
  invalidate(key: string): void {
    this.memoryCache.invalidate(key)
    this.storageCache.invalidate(key)
  }

  /**
   * Invalidate pattern from both caches
   */
  invalidatePattern(pattern: RegExp): void {
    this.memoryCache.invalidatePattern(pattern)
    this.storageCache.invalidatePattern(pattern)
  }

  /**
   * Clear both caches
   */
  clear(): void {
    this.memoryCache.clear()
    this.storageCache.clear()
  }

  /**
   * Clear only memory cache
   */
  clearMemory(): void {
    this.memoryCache.clear()
  }

  /**
   * Clear only storage cache
   */
  clearStorage(): void {
    this.storageCache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memory: this.memoryCache.getStats(),
      storage: this.storageCache.getStats(),
    }
  }

  /**
   * Stop cleanup timers
   */
  destroy(): void {
    this.memoryCache.stopCleanup()
  }
}

// Export singleton instance
export const cache = new HybridCache()

// Export individual cache classes
export { MemoryCache, StorageCache }

// Export types
export type { Cache, CacheEntry } from '@/types'
