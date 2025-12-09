# API Documentation

## Overview

Early Riser integrates with multiple external APIs to aggregate market intelligence. This document outlines the APIs used and their integration patterns.

## Required API Keys

You'll need to obtain API keys from the following providers:

### 1. News API
- **Provider**: NewsAPI, Alpha Vantage, or similar
- **Purpose**: Financial news aggregation
- **Endpoints Used**:
  - `/everything` - Search and retrieve articles
  - `/top-headlines` - Latest headlines by category

### 2. Market Data API
- **Provider**: Alpha Vantage, Polygon.io, or IEX Cloud
- **Purpose**: Stock, crypto, and commodity prices
- **Endpoints Used**:
  - `/quote` - Real-time quotes
  - `/historical` - Historical price data
  - `/indicators` - Technical indicators

### 3. Cryptocurrency API
- **Provider**: CoinGecko, CoinMarketCap, or Binance
- **Purpose**: Crypto market data
- **Endpoints Used**:
  - `/coins/markets` - Current prices and market caps
  - `/coins/[id]/market_chart` - Historical data

## API Service Structure

```typescript
// Example service structure
export class NewsService {
  async fetchLatestNews(params: NewsParams): Promise<NewsArticle[]>
  async searchNews(query: string): Promise<NewsArticle[]>
  async getArticle(id: string): Promise<NewsArticle>
}

export class MarketDataService {
  async getQuote(symbol: string): Promise<Quote>
  async getHistoricalData(symbol: string, range: string): Promise<OHLCV[]>
  async subscribeToRealtime(symbols: string[], callback: Function): void
}
```

## Rate Limits

- **News API**: 100 requests/day (free tier)
- **Market Data**: 500 requests/day (free tier)
- **Crypto API**: 50 calls/minute (free tier)

## Error Handling

All API calls should implement:
- Retry logic with exponential backoff
- Graceful degradation on failures
- User-friendly error messages
- Logging for debugging

## Caching Strategy

- News articles: 5-minute cache
- Market quotes: 30-second cache
- Historical data: 1-hour cache
- Static data: 24-hour cache

## WebSocket Connections

For real-time data:

```typescript
const ws = new WebSocket(WS_URL)
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  updateStore(data)
}
```

## API Response Types

See `src/types/api.ts` for complete TypeScript definitions of all API responses.