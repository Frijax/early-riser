import { useState, useCallback } from 'react'

export interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export interface UseAsyncStateReturn<T> extends AsyncState<T> {
  execute: () => Promise<void>
  retry: () => Promise<void>
  reset: () => void
  setData: (data: T) => void
}

/**
 * Hook for managing async operation state
 */
export function useAsyncState<T>(
  asyncFn: () => Promise<T>
): UseAsyncStateReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsLoading(false)
    }
  }, [asyncFn])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    data,
    isLoading,
    error,
    execute,
    retry: execute,
    reset,
    setData,
  }
}
