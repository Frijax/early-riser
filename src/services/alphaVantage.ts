import type {
  AlphaVantageGlobalQuote,
  AlphaVantageTimeSeriesDaily,
  MarketQuote,
} from '../types/api';

class AlphaVantageClient {
  private apiKey: string;
  private baseUrl = 'https://www.alphavantage.co/query';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_MARKET_DATA_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Alpha Vantage API key not configured');
    }
  }

  /**
   * Get real-time quote for a symbol
   */
  async getQuote(symbol: string): Promise<MarketQuote> {
    const params = new URLSearchParams({
      function: 'GLOBAL_QUOTE',
      symbol: symbol.toUpperCase(),
      apikey: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Alpha Vantage error: ${response.status} ${response.statusText}`);
      }

      const data: AlphaVantageGlobalQuote = await response.json();
      
      if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
        throw new Error(`No data returned for symbol: ${symbol}`);
      }

      return this.normalizeQuote(data['Global Quote']);
    } catch (error) {
      console.error(`Failed to fetch quote for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get daily time series data for a symbol
   */
  async getDailyTimeSeries(
    symbol: string,
    outputSize: 'compact' | 'full' = 'compact'
  ): Promise<AlphaVantageTimeSeriesDaily> {
    const params = new URLSearchParams({
      function: 'TIME_SERIES_DAILY',
      symbol: symbol.toUpperCase(),
      outputsize: outputSize,
      apikey: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Alpha Vantage error: ${response.status} ${response.statusText}`);
      }

      const data: AlphaVantageTimeSeriesDaily = await response.json();
      
      if (!data['Time Series (Daily)']) {
        throw new Error(`No time series data returned for symbol: ${symbol}`);
      }

      return data;
    } catch (error) {
      console.error(`Failed to fetch time series for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get intraday time series data
   */
  async getIntradayTimeSeries(
    symbol: string,
    interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min'
  ) {
    const params = new URLSearchParams({
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol.toUpperCase(),
      interval,
      apikey: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Alpha Vantage error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch intraday data for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Search for symbols
   */
  async searchSymbol(keywords: string) {
    const params = new URLSearchParams({
      function: 'SYMBOL_SEARCH',
      keywords,
      apikey: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Alpha Vantage error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to search symbols for "${keywords}":`, error);
      throw error;
    }
  }

  /**
   * Normalize Alpha Vantage quote to internal format
   */
  private normalizeQuote(quote: AlphaVantageGlobalQuote['Global Quote']): MarketQuote {
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      timestamp: quote['07. latest trading day'],
    };
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const alphaVantage = new AlphaVantageClient();
export default alphaVantage;
