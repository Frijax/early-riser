import { ApiError, RateLimitError, NetworkError, TimeoutError } from './types'

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Calculate exponential backoff delay
 */
export function calculateBackoff(attempt: number, baseDelay = 1000, maxDelay = 30000): number {
  const exponential = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
  const jitter = Math.random() * 100 // Add jitter to prevent thundering herd
  return exponential + jitter
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    baseDelay?: number
    maxDelay?: number
    shouldRetry?: (error: Error) => boolean
  } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 30000, shouldRetry } = options

  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      // Check if we should retry this error
      if (shouldRetry && !shouldRetry(lastError)) {
        throw lastError
      }

      // Check if error is retryable (if it's an ApiError)
      if (lastError instanceof ApiError && !lastError.retryable) {
        throw lastError
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw lastError
      }

      // Calculate delay and wait
      const delay = calculateBackoff(attempt, baseDelay, maxDelay)
      await sleep(delay)
    }
  }

  throw lastError!
}

/**
 * Create abort controller with timeout
 */
export function createTimeoutSignal(timeout: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeout)
  return controller.signal
}

/**
 * Parse rate limit headers
 */
export function parseRateLimitHeaders(headers: Headers): {
  remaining?: number
  limit?: number
  reset?: Date
} {
  const remaining = headers.get('x-ratelimit-remaining')
  const limit = headers.get('x-ratelimit-limit')
  const reset = headers.get('x-ratelimit-reset')

  return {
    remaining: remaining ? parseInt(remaining, 10) : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
    reset: reset ? new Date(parseInt(reset, 10) * 1000) : undefined,
  }
}

/**
 * Build query string from params
 */
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

/**
 * Handle fetch errors and convert to typed errors
 */
export function handleFetchError(error: unknown): never {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      throw new TimeoutError('Request timeout')
    }

    if (error.message.includes('fetch') || error.message.includes('network')) {
      throw new NetworkError('Network error occurred')
    }

    throw new ApiError(error.message, { retryable: false })
  }

  throw new ApiError('Unknown error occurred', { retryable: false })
}

/**
 * Handle HTTP response and convert errors
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  // Check for rate limit
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('retry-after') || '60', 10)
    throw new RateLimitError('Rate limit exceeded', retryAfter)
  }

  // Check for other errors
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // Ignore JSON parse errors
    }

    throw new ApiError(errorMessage, {
      status: response.status,
      retryable: response.status >= 500 || response.status === 408,
    })
  }

  try {
    return await response.json()
  } catch (error) {
    throw new ApiError('Failed to parse response', { retryable: false })
  }
}
