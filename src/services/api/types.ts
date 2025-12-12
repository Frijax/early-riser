// API error types and interfaces

export class ApiError extends Error {
  status?: number
  code?: string
  retryable: boolean

  constructor(
    message: string,
    options: { status?: number; code?: string; retryable?: boolean } = {}
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = options.status
    this.code = options.code
    this.retryable = options.retryable ?? false
  }
}

export class RateLimitError extends ApiError {
  retryAfter: number

  constructor(message: string, retryAfter: number) {
    super(message, { retryable: true, status: 429, code: 'RATE_LIMIT_EXCEEDED' })
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

export class NetworkError extends ApiError {
  constructor(message: string) {
    super(message, { retryable: true, code: 'NETWORK_ERROR' })
    this.name = 'NetworkError'
  }
}

export class TimeoutError extends ApiError {
  constructor(message: string) {
    super(message, { retryable: true, code: 'TIMEOUT' })
    this.name = 'TimeoutError'
  }
}

export interface ApiClientConfig {
  baseUrl: string
  apiKey?: string
  timeout?: number
  retries?: number
  headers?: Record<string, string>
}

export interface RequestOptions {
  params?: Record<string, string | number | boolean>
  headers?: Record<string, string>
  signal?: AbortSignal
  timeout?: number
}

export interface RateLimitInfo {
  remaining: number
  limit: number
  reset: Date
}

export interface RequestInterceptor {
  onRequest?: (url: string, options: RequestInit) => void
  onResponse?: (response: Response) => void
  onError?: (error: Error) => void
}
