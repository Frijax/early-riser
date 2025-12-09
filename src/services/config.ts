/**
 * API Configuration
 * Central configuration for all API clients
 */

export const API_CONFIG = {
  newsAPI: {
    key: import.meta.env.VITE_NEWS_API_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
  },
  alphaVantage: {
    key: import.meta.env.VITE_MARKET_DATA_API_KEY || '',
    baseUrl: 'https://www.alphavantage.co/query',
  },
  crypto: {
    key: import.meta.env.VITE_CRYPTO_API_KEY || '',
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || '',
  },
  app: {
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  },
  features: {
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    aiInsights: import.meta.env.VITE_ENABLE_AI_INSIGHTS === 'true',
  },
  intervals: {
    newsRefresh: parseInt(import.meta.env.VITE_NEWS_REFRESH_INTERVAL || '60000'),
    priceRefresh: parseInt(import.meta.env.VITE_PRICE_REFRESH_INTERVAL || '30000'),
  },
};

/**
 * Validate API configuration
 */
export function validateAPIConfig() {
  const warnings: string[] = [];

  if (!API_CONFIG.newsAPI.key) {
    warnings.push('NewsAPI key not configured');
  }

  if (!API_CONFIG.alphaVantage.key) {
    warnings.push('Alpha Vantage API key not configured');
  }

  if (!API_CONFIG.crypto.key) {
    warnings.push('Crypto API key not configured');
  }

  if (!API_CONFIG.websocket.url) {
    warnings.push('WebSocket URL not configured');
  }

  if (warnings.length > 0 && API_CONFIG.app.environment === 'production') {
    console.error('Missing required API configuration:', warnings);
  } else if (warnings.length > 0) {
    console.warn('API configuration warnings:', warnings);
  }

  return warnings;
}

export default API_CONFIG;
