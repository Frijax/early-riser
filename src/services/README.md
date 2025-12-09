# API Services

This directory contains all API client implementations for Early Riser.

## Available Clients

### NewsAPI Client (`newsAPI.ts`)

Fetches news articles from NewsAPI.org.

**Usage:**

```typescript
import { newsAPI } from '@/services';

// Get top headlines
const headlines = await newsAPI.getTopHeadlines({
  country: 'us',
  category: 'business',
  pageSize: 10,
});

// Search for specific news
const articles = await newsAPI.searchNews({
  q: 'stock market',
  language: 'en',
  sortBy: 'publishedAt',
});
```

### Alpha Vantage Client (`alphaVantage.ts`)

Provides stock market data from Alpha Vantage.

**Usage:**

```typescript
import { alphaVantage } from '@/services';

// Get real-time quote
const quote = await alphaVantage.getQuote('AAPL');

// Get daily time series
const timeSeries = await alphaVantage.getDailyTimeSeries('MSFT');

// Get intraday data
const intraday = await alphaVantage.getIntradayTimeSeries('GOOGL', '5min');

// Search for symbols
const results = await alphaVantage.searchSymbol('tesla');
```

## Configuration

All API clients read their configuration from environment variables. See `.env.example` for required variables.

Required environment variables:
- `VITE_NEWS_API_KEY` - NewsAPI.org API key
- `VITE_MARKET_DATA_API_KEY` - Alpha Vantage API key
- `VITE_CRYPTO_API_KEY` - Cryptocurrency API key (for future use)
- `VITE_WS_URL` - WebSocket URL (for future real-time data)

## Error Handling

All API clients include:
- Automatic error logging
- Descriptive error messages
- Type-safe responses
- Configuration validation

## Testing

To test if your API keys are configured:

```typescript
import { newsAPI, alphaVantage } from '@/services';

console.log('NewsAPI configured:', newsAPI.isConfigured());
console.log('Alpha Vantage configured:', alphaVantage.isConfigured());
```

## Rate Limits

Be aware of API rate limits:
- NewsAPI: 100 requests per day (free tier)
- Alpha Vantage: 5 API requests per minute and 500 requests per day (free tier)

Consider implementing caching to avoid hitting rate limits.
