/**
 * Services Index
 * Central export point for all API clients and services
 */

export { newsAPI, default as NewsAPIClient } from './newsAPI';
export { alphaVantage, default as AlphaVantageClient } from './alphaVantage';
export { API_CONFIG, validateAPIConfig } from './config';

// Initialize API validation on import
if (import.meta.env.DEV) {
  validateAPIConfig();
}
