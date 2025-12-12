import type { ApiClientConfig, RequestOptions, RequestInterceptor, RateLimitInfo } from './types'
import {
  retryWithBackoff,
  createTimeoutSignal,
  parseRateLimitHeaders,
  buildQueryString,
  handleFetchError,
  handleResponse,
} from './utils'

export class ApiClient {
  private config: Required<ApiClientConfig>
  private rateLimitInfo: Map<string, RateLimitInfo> = new Map()
  private interceptors: RequestInterceptor = {}
  private pendingRequests: Map<string, Promise<any>> = new Map()

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      retries: 3,
      headers: {},
      ...config,
    }
  }

  /**
   * Set request/response interceptors
   */
  setInterceptors(interceptors: RequestInterceptor): void {
    this.interceptors = { ...this.interceptors, ...interceptors }
  }

  /**
   * Get rate limit info for a provider
   */
  getRateLimitInfo(provider: string): RateLimitInfo | undefined {
    return this.rateLimitInfo.get(provider)
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params)
    return this.request<T>(url, {
      method: 'GET',
      ...options,
    })
  }

  /**
   * Generic POST request
   */
  async post<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.params)
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  /**
   * Generic PUT request
   */
  async put<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.params)
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    })
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params)
    return this.request<T>(url, {
      method: 'DELETE',
      ...options,
    })
  }

  /**
   * Core request method with retry logic and deduplication
   */
  private async request<T>(
    url: string,
    options: RequestOptions & { method: string; body?: string }
  ): Promise<T> {
    const { method, body } = options

    // Request deduplication - if same request is in flight, return existing promise
    const requestKey = `${method}:${url}`
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)
    }

    // Create the request promise
    const requestPromise = this.executeRequest<T>(url, options)

    // Store pending request
    this.pendingRequests.set(requestKey, requestPromise)

    try {
      const result = await requestPromise
      return result
    } finally {
      // Clean up pending request
      this.pendingRequests.delete(requestKey)
    }
  }

  /**
   * Execute the actual fetch request with retry logic
   */
  private async executeRequest<T>(
    url: string,
    options: RequestOptions & { method: string; body?: string }
  ): Promise<T> {
    const timeout = options.timeout ?? this.config.timeout
    const signal = options.signal ?? createTimeoutSignal(timeout)

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: this.buildHeaders(options.headers),
      body: options.body,
      signal,
    }

    // Call onRequest interceptor
    this.interceptors.onRequest?.(url, fetchOptions)

    try {
      // Wrap fetch in retry logic
      const response = await retryWithBackoff(
        () => fetch(url, fetchOptions),
        {
          maxRetries: this.config.retries,
          shouldRetry: (error) => {
            // Only retry on network errors or 5xx errors
            return error.message.includes('fetch') || error.message.includes('500')
          },
        }
      )

      // Parse rate limit headers
      const rateLimitInfo = parseRateLimitHeaders(response.headers)
      if (rateLimitInfo.remaining !== undefined) {
        this.rateLimitInfo.set(this.config.baseUrl, {
          remaining: rateLimitInfo.remaining,
          limit: rateLimitInfo.limit || 0,
          reset: rateLimitInfo.reset || new Date(),
        })
      }

      // Call onResponse interceptor
      this.interceptors.onResponse?.(response)

      // Handle response
      const data = await handleResponse<T>(response)
      return data
    } catch (error) {
      // Call onError interceptor
      this.interceptors.onError?.(error as Error)

      // Re-throw the error
      handleFetchError(error)
    }
  }

  /**
   * Build full URL with query params
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const baseUrl = this.config.baseUrl.replace(/\/$/, '')
    const path = endpoint.replace(/^\//, '')
    const queryString = params ? buildQueryString(params) : ''

    return `${baseUrl}/${path}${queryString}`
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    }

    // Add API key if present
    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`
    }

    // Merge custom headers
    if (customHeaders) {
      Object.assign(headers, customHeaders)
    }

    return headers
  }
}

/**
 * Create a new API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config)
}
